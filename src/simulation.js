export const WORLD = { width: 960, height: 640, ceiling: 24, floor: 604 };
export const MODES = {
  easy: {
    name: "ROOKIE",
    speed: 218,
    gap: 228,
    gravity: 820,
    boost: -322,
    cost: 0,
  },
  hard: {
    name: "SURVIVOR",
    speed: 242,
    gap: 202,
    gravity: 850,
    boost: -334,
    cost: 0.2,
  },
};
export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
export function createRun(mode = "easy", random = Math.random) {
  const run = {
    mode: MODES[mode] ? mode : "easy",
    random,
    phase: "ready",
    time: 0,
    distance: 0,
    score: 0,
    caps: 0,
    gates: 0,
    streak: 0,
    bestStreak: 0,
    player: { x: 200, y: 310, vy: 0, radius: 16, charge: 1 },
    obstacles: [],
    events: [],
    cause: "",
  };
  for (let i = 0; i < 5; i++) spawn(run, 700 + i * 305);
  return run;
}
function spawn(run, x) {
  const config = MODES[run.mode];
  const last = run.obstacles.at(-1);
  const gap = config.gap - Math.min(30, run.gates * 1.1);
  const center = clamp(
    (last?.center ?? 312) + (run.random() - 0.5) * 180,
    170,
    456,
  );
  run.obstacles.push({
    x,
    width: 68,
    center,
    gap,
    passed: false,
    taken: false,
    type: run.obstacles.length % 2,
  });
}
export function boost(run) {
  if (!["ready", "running"].includes(run.phase)) return false;
  const config = MODES[run.mode];
  if (run.player.charge + 1e-8 < config.cost) {
    run.events.push({ type: "empty" });
    return false;
  }
  run.phase = "running";
  run.player.vy = config.boost;
  run.player.charge = Math.max(0, run.player.charge - config.cost);
  run.events.push({ type: "boost" });
  return true;
}
export function circleRect(x, y, r, rx, ry, w, h) {
  return (
    (x - clamp(x, rx, rx + w)) ** 2 + (y - clamp(y, ry, ry + h)) ** 2 < r * r
  );
}
export function capY(obstacle, time, motion = true) {
  return obstacle.center + (motion ? Math.sin(time * 2.5 + obstacle.center * .017) * 9 : 0);
}
export function step(run, dt, motion = true) {
  if (run.phase !== "running") return;
  const config = MODES[run.mode],
    p = run.player;
  run.time += dt;
  p.vy += config.gravity * dt;
  p.y += p.vy * dt;
  p.charge = config.cost ? clamp(p.charge + dt * 0.29, 0, 1) : 1;
  const speed = config.speed + Math.min(110, run.gates * 3.5);
  run.distance += speed * dt * 0.28;
  for (const o of run.obstacles) {
    o.x -= speed * dt;
    if (
      !o.taken &&
      Math.hypot(o.x + o.width / 2 - p.x, capY(o, run.time, motion) - p.y) < p.radius + 20
    ) {
      o.taken = true;
      run.caps++;
      run.streak++;
      run.bestStreak = Math.max(run.bestStreak, run.streak);
      p.charge = clamp(p.charge + 0.16, 0, 1);
      run.events.push({ type: "cap", x: o.x + o.width / 2, y: capY(o, run.time, motion) });
    }
    if (!o.passed && o.x + o.width < p.x - p.radius) {
      o.passed = true;
      run.gates++;
      if (!o.taken) run.streak = 0;
      run.events.push({ type: "gate" });
    }
  }
  run.score = Math.floor(run.distance / 100) + run.caps * 2;
  let cause =
    p.y - p.radius < WORLD.ceiling
      ? "ceiling"
      : p.y + p.radius > WORLD.floor
        ? "ground"
        : "";
  for (const o of run.obstacles) {
    if (
      circleRect(
        p.x,
        p.y,
        p.radius,
        o.x + 7,
        0,
        o.width - 14,
        o.center - o.gap / 2 - 6,
      ) ||
      circleRect(
        p.x,
        p.y,
        p.radius,
        o.x + 7,
        o.center + o.gap / 2 + 6,
        o.width - 14,
        WORLD.height,
      )
    )
      cause = "barrel";
  }
  if (cause) {
    run.phase = "over";
    run.cause = cause;
    run.events.push({ type: "crash" });
  }
  run.obstacles = run.obstacles.filter((o) => o.x > -100);
  while (run.obstacles.length < 5)
    spawn(run, (run.obstacles.at(-1)?.x ?? WORLD.width) + 305);
}
