import { WORLDS, worldAt, assetUrl } from "./worlds.js";
import { pilotVisual } from "./pilot-visuals.js";
import { PilotPreviews } from './pilot-preview.js';
import { LOCAL_PREVIEW } from "./release.js";
import { PILOTS } from "./pilots.js";
import { createRun, boost, step, MODES } from "./simulation.js";
import { loadSave, writeSave } from "./storage.js";
import { Renderer } from "./renderer.js";
import { Sound } from "./audio.js";
import {
  readBoard,
  postScore,
  cleanCallsign,
  boardKey,
} from "./leaderboard.js";
const $ = (id) => document.getElementById(id);
const save = loadSave(),
  sound = new Sound(save.sound);
let pilot =
  PILOTS.find((p) => p.id === save.pilot) ||
  PILOTS.find((p) => p.id === "ducky");
let run = createRun(save.mode),
  lastRun = null,
  screen = "hangar",
  roster = "all",
  boardMode = save.mode,
  boardRequest = 0,
  previousFocus = null;
let renderer,
  lastTime = performance.now(),
  accumulator = 0,
  ambient = 0,
  resultTimer,
  toastTimer,
  lastGateSector = 0;
const mediaMotion = matchMedia("(prefers-reduced-motion: reduce)");
const previews = new PilotPreviews();
function persist() {
  return writeSave(save);
}
function setText(id, text) {
  const el = $(id);
  if (el.textContent !== String(text)) el.textContent = text;
}
const padded = (n) => String(n).padStart(3, "0");
function syncHome() {
  setText("home-best", padded(save.best[save.mode]));
  setText("home-runs", padded(save.runs));
  setText("home-caps", padded(save.totalCaps));
  setText("selected-name", pilot.name);
  setText("hero-pilot-name", pilot.name.toUpperCase());
  for (const id of ["hero-pilot", "selected-avatar"])
    previews.attach($(id), pilot);
  document.querySelectorAll("[data-mode]").forEach((b) => {
    const active = b.dataset.mode === save.mode;
    b.classList.toggle("selected", active);
    b.setAttribute("aria-pressed", String(active));
  });
}
function syncSettings() {
  sound.enabled = save.sound;
  setText("sound", save.sound ? "SOUND ON" : "SOUND OFF");
  $("sound").setAttribute(
    "aria-label",
    save.sound ? "Mute sound" : "Enable sound",
  );
  $("sound").setAttribute("aria-pressed", String(!save.sound));
  $("sound-setting").checked = save.sound;
  $("motion-setting").checked = save.motion;
  const motion = save.motion && !mediaMotion.matches;
  document.body.classList.toggle("reduced-motion", !motion);
  if (renderer) renderer.motion = motion;
}
function openDialog(id) {
  previousFocus = document.activeElement;
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  $(id).showModal();
}
function closeDialog(dialog) {
  dialog.close();
  if (screen === "flight" && run.phase !== "over")
    $("game").focus({ preventScroll: true });
  else previousFocus?.focus?.({ preventScroll: true });
}
function returnToResultOrClose() {
  if (screen === "flight" && run.phase === "over") openDialog("result-dialog");
  else closeDialog($("board-dialog"));
}
for (const button of document.querySelectorAll("[data-close]"))
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    if (dialog.id === "board-dialog") returnToResultOrClose();
    else closeDialog(dialog);
  });
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    if (dialog.id === "pause-dialog") resume();
    else if (dialog.id === 'crash-dialog') showResults();
    else if (dialog.id === "result-dialog") home();
    else if (dialog.id === "board-dialog") returnToResultOrClose();
    else closeDialog(dialog);
  });
}
function home() {
  clearTimeout(resultTimer);
  run.phase = "ready";
  screen = "hangar";
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  $("app").dataset.screen = "hangar";
  $("hangar").hidden = false;
  $("flight-deck").hidden = false;
  $("play-screen").hidden = true;
  syncHome();
  $("launch").focus({ preventScroll: true });
  window.scrollTo(0, 0);
}
function launch() {
  clearTimeout(resultTimer);
  clearTimeout(toastTimer);
  setText("sector-toast", "");
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  sound.unlock();
  screen = "flight";
  run = createRun(save.mode);
  document.querySelector('.ready-tip').textContent = run.mode === 'dash' ? '60 seconds. Caps earn 10–50 points. Hits break your combo, not your run.' : 'Fly through the gaps. Red caps are worth +2.';
  lastRun = null;
  lastGateSector = 0;
  $("app").dataset.screen = "flight";
  $("hangar").hidden = true;
  $("flight-deck").hidden = true;
  $("play-screen").hidden = false;
  $("ready-overlay").hidden = false;
  $("hud").hidden = false;
  $("tour-controls").hidden = true;
  renderer ??= new Renderer($("game"));
  renderer.resize();
  renderer.reset();
  renderer.load(pilot.asset);
  syncSettings();
  accumulator = 0;
  lastTime = performance.now();
  syncHud();
  window.scrollTo(0, 0);
  $("game").focus({ preventScroll: true });
}
function thrust() {
  if (screen !== "flight" || document.querySelector("dialog[open]")) return;
  sound.unlock();
  if (run.phase === "tour") { renderer.pilotRenderer.boost(); sound.play("boost"); return; }
  if (boost(run)) $("ready-overlay").hidden = true;
  consumeEvents();
}
function pause() {
  if (run.phase !== "running" && run.phase !== "ready" && run.phase !== "tour") return;
  run.resumePhase = run.phase;
  run.phase = "paused";
  openDialog("pause-dialog");
}
function resume() {
  if (run.phase !== "paused") return;
  run.phase = run.resumePhase || "running";
  $("pause-dialog").close();
  accumulator = 0;
  lastTime = performance.now();
  $("game").focus({ preventScroll: true });
}
function finish() {
  const previousBest = save.best[run.mode];
  save.best[run.mode] = Math.max(previousBest, run.score);
  save.runs++;
  save.totalCaps += run.caps;
  const saved = persist();
  lastRun = {
    mode: run.mode,
    score: run.score,
    boardKey: boardKey(run.mode),
    pilot: { ...pilot },
    submissionId: crypto.randomUUID(),
    submitted: false,
    submitting: false,
  };
  setText(
    "result-eyebrow",
    run.score > previousBest
      ? "NEW PERSONAL BEST / NICELY FLOWN"
      : "FLIGHT RECORDER / RUN COMPLETE",
  );
  setText(
    "result-title",
    run.score > previousBest ? "YOUR BEST FLIGHT YET." : "WHAT A RIDE.",
  );
  setText(
    "result-tip",
    {
      ground: "The ground won this round. Boost a little earlier.",
      ceiling: "Too much altitude. Let gravity do a little work.",
      barrel: "A barrel got the last word. Aim for the middle of each gap.",
      timer: 'Time’s up! Chain caps for up to x5 points. Try to beat your personal best.',
    }[run.cause],
  );
  setText("result-score", run.score);
  setText("result-distance", `${Math.floor(run.distance)} m`);
  setText("result-caps", run.caps);
  setText("result-streak", run.bestStreak);
  $("save-notice").hidden = saved;
  $('result-board').hidden = run.mode === 'dash';
  if (run.cause === 'timer') {
    setText('result-title', 'DASH COMPLETE!');
    openDialog('result-dialog');
  } else {
    $('crash-pilot').src = assetUrl(pilotVisual(pilot).art);
    $('crash-pilot').alt = `${pilot.name} floating safely under a parachute`;
    openDialog('crash-dialog');
    resultTimer = setTimeout(showResults, save.motion && !mediaMotion.matches ? 2300 : 1400);
  }
}
function showResults() {
  clearTimeout(resultTimer);
  if (screen === 'flight' && run.phase === 'over') openDialog('result-dialog');
}
$('crash-skip').addEventListener('click', showResults);
function consumeEvents() {
  for (const event of run.events.splice(0)) {
    sound.play(event.type);
    renderer?.event(event, run);
    if (event.type === "crash" || event.type === 'complete') finish();
  }
}
function syncHud() {
  setText("score", padded(run.score));
  setText("caps", String(run.caps).padStart(2, "0"));
  setText("distance", run.mode === 'dash' ? `${Math.ceil(run.remaining)}s LEFT` : `${Math.floor(run.distance)} m`);
  setText("flight-best", `BEST ${padded(save.best[run.mode])}`);
  const location = worldAt(run.gates), sector = location.stage + 1;
  setText("flight-mode", `${run.phase === 'tour' || run.resumePhase === 'tour' && run.phase === 'paused' ? 'SCENIC FLIGHT' : MODES[run.mode].name} / ${location.name.toUpperCase()}`);
  setText("streak", run.streak > 1 ? `${run.streak} CAP STREAK` : location.terrain);
  const fuel = Math.round(run.player.charge * 100);
  setText(
    "fuel-label",
    run.mode === 'dash' ? `${Math.ceil(run.remaining)}s / UNLIMITED BOOST` : run.mode === 'easy' ? 'BOOST / UNLIMITED' : `CORE CHARGE / ${fuel}%`,
  );
  $("fuel-fill").style.width = `${fuel}%`;
  $("fuel-fill").style.backgroundColor = fuel < 20 ? "#ff6738" : "#d6e5a3";
  if (sector > lastGateSector + 1) {
    lastGateSector = sector - 1;
    setText(
      "sector-toast",
      `${location.name.toUpperCase()} - ${location.subtitle}`,
    );
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setText("sector-toast", ""), 2200);
  }
}
function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;
  if (screen === "flight") {
    if (run.phase !== "paused") ambient += dt;
    if (run.phase === "running") {
      accumulator += dt;
      while (accumulator >= 1 / 120) {
        step(run, 1 / 120, renderer.motion);
        accumulator -= 1 / 120;
        consumeEvents();
      }
    } else accumulator = 0;
    if (run.phase === "tour") { run.player.y = 310 + (renderer.motion ? Math.sin(ambient * 1.5) * 16 : 0); run.player.vy = renderer.motion ? Math.cos(ambient * 1.5) * 24 : 0; }
    renderer.draw(run, pilot, dt, ambient);
    syncHud();
  }
  previews.draw(now / 1000, save.motion && !mediaMotion.matches);
  requestAnimationFrame(loop);
}
function renderPilots() {
  const term = $("pilot-search").value.toLowerCase().trim();
  const list = PILOTS.filter(
    (p) =>
      (roster === "all" || p.group === roster) &&
      p.name.toLowerCase().includes(term),
  );
  $("pilot-grid").replaceChildren();
  for (const item of list) {
    const button = document.createElement("button");
    button.className = "pilot-card";
    button.setAttribute("aria-pressed", String(item.id === pilot.id));
    button.setAttribute("aria-label", `Select ${item.name}`);
    const img = document.createElement("img");
    img.src = assetUrl(pilotVisual(item).art);
    img.alt = "";
    img.loading = "lazy";
    img.width = 140;
    img.height = 95;
    const name = document.createElement("span");
    name.textContent = item.name;
    button.append(img, name);
    previews.attach(img, item);
    button.addEventListener("click", () => {
      pilot = item;
      save.pilot = item.id;
      persist();
      syncHome();
      sound.unlock();
      sound.play("click");
      closeDialog($("pilots-dialog"));
    });
    $("pilot-grid").append(button);
  }
  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No pilots found. Try another callsign.";
    $("pilot-grid").append(empty);
  }
}
async function loadBoard() {
  if (boardMode === 'dash') {
    $('score-form').hidden = true; $('board-list').replaceChildren();
    setText('board-status', `CAP DASH PERSONAL BEST: ${save.best.dash} POINTS. Saved on this device.`);
    setText('board-reset', 'CAP DASH / PERSONAL RECORD');
    document.querySelectorAll('[data-board-mode]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    return;
  }
  if (LOCAL_PREVIEW) { $("score-form").hidden = true; setText("board-status", "Local preview. Public score posting is disabled; personal records stay on this device."); setText("board-reset", "LOCAL FLIGHT LOG"); return; }
  const request = ++boardRequest;
  document
    .querySelectorAll("[data-board-mode]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.boardMode === boardMode)),
    );
  setText("board-status", "Connecting to the flight log…");
  $("board-list").replaceChildren();
  $("score-form").hidden =
    !lastRun || lastRun.mode !== boardMode || lastRun.submitted;
  if (!$("score-form").hidden) {
    $("initials").value = save.initials;
    setText("submit-score", `${lastRun.score} POINTS`);
    $("submit").disabled = lastRun.submitting;
  }
  setText(
    "board-reset",
    `${new Date().toISOString().slice(0, 10)} UTC · RESETS AT 00:00 UTC · V2 RULES`,
  );
  try {
    const rows = await readBoard(boardMode);
    if (request !== boardRequest) return;
    for (const [index, row] of rows.entries()) {
      const li = document.createElement("li"),
        rank = document.createElement("span"),
        detail = document.createElement("div"),
        name = document.createElement("strong"),
        character = document.createElement("small"),
        score = document.createElement("b");
      rank.textContent = String(index + 1).padStart(2, "0");
      name.textContent = row.initials;
      character.textContent = row.pilot;
      score.textContent = row.score;
      detail.append(name, character);
      li.append(rank, detail, score);
      $("board-list").append(li);
    }
    setText(
      "board-status",
      rows.length
        ? "Best flight per callsign. Make yours count."
        : "Fresh skies. No flights logged yet today.",
    );
  } catch {
    if (request === boardRequest)
      setText(
        "board-status",
        "The flight log is offline. Your personal best is still saved here. Reopen to try again.",
      );
  }
}
function openBoard() {
  boardMode = lastRun?.mode || save.mode;
  openDialog("board-dialog");
  loadBoard();
}
$("score-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const record = lastRun;
  if (!record || record.submitted || record.submitting) return;
  const initials = cleanCallsign($("initials").value);
  if (!initials) {
    $("initials").focus();
    return;
  }
  if (record.boardKey !== boardKey(record.mode)) {
    setText(
      "board-status",
      "A new UTC day has started. Fly again to enter today’s board.",
    );
    $("score-form").hidden = true;
    return;
  }
  record.submitting = true;
  $("submit").disabled = true;
  setText("board-status", "Posting your flight…");
  save.initials = initials;
  persist();
  const request = ++boardRequest;
  try {
    await postScore(record, record.pilot, initials, record.submissionId);
    record.submitted = true;
    if (
      lastRun === record &&
      request === boardRequest &&
      $("board-dialog").open
    ) {
      await loadBoard();
      setText("board-status", "Flight logged. See you in the skies.");
    }
  } catch {
    if (request === boardRequest)
      setText(
        "board-status",
        "Could not confirm this flight. Check your connection and try again.",
      );
  } finally {
    record.submitting = false;
    if (lastRun === record) $("submit").disabled = false;
  }
});
$("initials").addEventListener("input", () => {
  $("initials").value = cleanCallsign($("initials").value);
});
$("launch").addEventListener("click", launch);
$("retry").addEventListener("click", launch);
$("pause-retry").addEventListener("click", launch);
$("exit-flight").addEventListener("click", home);
$("pause-home").addEventListener("click", home);
$("result-home").addEventListener("click", home);
$("pause").addEventListener("click", pause);
$("resume").addEventListener("click", resume);
$("game").addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  $("game").focus({ preventScroll: true });
  thrust();
});
$("boost").addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  thrust();
});
$("boost").addEventListener("click", (event) => {
  if (event.detail === 0) thrust();
});
$("sound").addEventListener("click", () => {
  save.sound = !save.sound;
  syncSettings();
  sound.unlock();
  sound.play("click");
  persist();
});
$("sound-setting").addEventListener("change", (e) => {
  save.sound = e.target.checked;
  syncSettings();
  sound.unlock();
  persist();
});
$("motion-setting").addEventListener("change", (e) => {
  save.motion = e.target.checked;
  syncSettings();
  persist();
});
mediaMotion.addEventListener("change", syncSettings);
$("settings-open").addEventListener("click", () => {
  if (screen === "flight" && ["running", "ready", "tour"].includes(run.phase)) {
    run.resumePhase = run.phase;
    run.phase = "paused";
  }
  openDialog("settings-dialog");
});
$("settings-dialog").addEventListener("close", () => {
  if (
    screen === "flight" &&
    run.phase === "paused" &&
    !document.querySelector("dialog[open]")
  )
    openDialog("pause-dialog");
});
$("how-open").addEventListener("click", () => openDialog("how-dialog"));
$("pilots-open").addEventListener("click", () => {
  renderPilots();
  openDialog("pilots-dialog");
});
$("pilot-search").addEventListener("input", renderPilots);
document.querySelectorAll("[data-roster]").forEach((button) =>
  button.addEventListener("click", () => {
    roster = button.dataset.roster;
    document
      .querySelectorAll("[data-roster]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    renderPilots();
  }),
);
document.querySelectorAll("[data-mode]").forEach((button) =>
  button.addEventListener("click", () => {
    save.mode = button.dataset.mode;
    persist();
    syncHome();
    sound.unlock();
    sound.play("click");
  }),
);
document.querySelectorAll("[data-board-mode]").forEach((button) =>
  button.addEventListener("click", () => {
    boardMode = button.dataset.boardMode;
    loadBoard();
  }),
);
$("board-open").addEventListener("click", openBoard);
$("result-board").addEventListener("click", openBoard);
document.addEventListener("keydown", (event) => {
  if (
    event.repeat ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)
  )
    return;
  if (screen !== "flight") return;
  const dialog = document.querySelector("dialog[open]");
  if (dialog) {
    if (dialog.id === "pause-dialog" && event.code === "KeyP") {
      event.preventDefault();
      resume();
    }
    return;
  }
  if (
    ["Space", "ArrowUp"].includes(event.code) &&
    !event.target.closest("button,a")
  ) {
    event.preventDefault();
    thrust();
  }
  if (["KeyP", "Escape"].includes(event.code)) {
    event.preventDefault();
    pause();
  }
  if (event.code === "KeyR") {
    event.preventDefault();
    launch();
  }
});
function autoPause() {
  if (screen === "flight" && run.phase === "running") pause();
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) autoPause();
});
window.addEventListener("blur", autoPause);
syncHome();
syncSettings();
requestAnimationFrame(loop);

function tour(index) {
  launch(); run.phase = 'tour'; run.gates = index * 8; run.obstacles = [];
  $("ready-overlay").hidden = true; $("hud").hidden = true;
  $("tour-controls").hidden = false; syncHud();
}
$("atlas-open").addEventListener('click', () => openDialog('atlas-dialog'));
for (const [index, world] of WORLDS.entries()) {
  const card = document.createElement('button'); card.className = 'world-card';
  const image = document.createElement('img'); image.src = assetUrl(world.asset); image.alt = ''; image.loading = 'lazy';
  const name = document.createElement('strong'); name.textContent = world.name;
  const description = document.createElement('span'); description.textContent = world.subtitle;
  const action = document.createElement('small'); action.textContent = 'PREVIEW LOCATION';
  card.append(image, name, description, action); card.addEventListener('click', () => tour(index));
  $("world-grid").append(card);
}
$("tour-next").addEventListener('click', () => { run.gates = ((worldAt(run.gates).index + 1) % WORLDS.length) * 8; lastGateSector = -1; });
$("tour-pilot").addEventListener('click', () => { renderPilots(); openDialog('pilots-dialog'); });
