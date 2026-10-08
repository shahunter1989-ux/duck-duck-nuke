import test from "node:test";
import assert from "node:assert/strict";
import {
  createRun,
  boost,
  step,
  circleRect,
  MODES,
} from "../src/simulation.js";
import { loadSave, writeSave } from "../src/storage.js";
import { boardKey, cleanCallsign } from "../src/leaderboard.js";
import { PILOTS } from "../src/pilots.js";
import { existsSync } from "node:fs";
test("all available pilots have shipping art and unique identities", () => {
  assert.equal(PILOTS.length, 102);
  assert.equal(new Set(PILOTS.map((p) => p.id)).size, 102);
  for (const p of PILOTS)
    assert.ok(existsSync(`assets/optimized/${p.asset}.webp`), p.asset);
});
test("launch, pause, crash and retry keep explicit state boundaries", () => {
  const run = createRun("easy", () => 0.5);
  assert.equal(run.phase, "ready");
  step(run, 1);
  assert.equal(run.distance, 0);
  assert.equal(boost(run), true);
  assert.equal(run.phase, "running");
  step(run, 0.1);
  assert.ok(run.distance > 0);
  run.phase = "paused";
  const y = run.player.y;
  step(run, 0.1);
  assert.equal(run.player.y, y);
  assert.equal(boost(run), false);
  run.phase = "running";
  run.player.y = 606;
  step(run, 1 / 120);
  assert.equal(run.phase, "over");
  assert.equal(run.cause, "ground");
  const distance = run.distance;
  step(run, 0.1);
  assert.equal(run.distance, distance);
  assert.equal(boost(run), false);
  assert.equal(createRun().score, 0);
});
test("survivor fuel never becomes negative, recharges, and caps restore charge", () => {
  const run = createRun("hard", () => 0.5);
  for (let i = 0; i < 5; i++) assert.equal(boost(run), true);
  assert.equal(boost(run), false);
  assert.ok(run.player.charge >= 0);
  const before = run.player.charge;
  step(run, 1 / 120);
  assert.ok(run.player.charge > before);
  const o = run.obstacles[0];
  o.x = run.player.x - o.width / 2;
  o.center = run.player.y;
  step(run, 1 / 120);
  assert.equal(run.caps, 1);
  assert.ok(run.player.charge >= 0.16);
  assert.equal(run.score, 2);
});
test("rookie boost is unlimited", () => {
  const run = createRun();
  for (let i = 0; i < 100; i++) assert.ok(boost(run));
  assert.equal(run.player.charge, 1);
});
test("caps cannot be collected twice and missed caps break a streak", () => {
  const run = createRun("easy", () => 0.5);
  boost(run);
  const o = run.obstacles[0];
  o.x = run.player.x - o.width / 2;
  o.center = run.player.y;
  step(run, 1 / 120);
  step(run, 1 / 120);
  assert.equal(run.caps, 1);
  assert.equal(run.streak, 1);
  o.x = -80;
  o.passed = true;
  const next = run.obstacles[1];
  next.x = run.player.x - next.width - 20;
  next.center = run.player.y;
  step(run, 1 / 120);
  assert.equal(run.streak, 0);
  assert.equal(run.bestStreak, 1);
});
test("circle collision distinguishes safe gaps from actual overlap", () => {
  assert.equal(circleRect(5, 5, 2, 10, 0, 20, 20), false);
  assert.equal(circleRect(9, 5, 2, 10, 0, 20, 20), true);
});
test("both modes remain navigable for extended seeded runs", () => {
  for (const mode of Object.keys(MODES)) {
    let seed = 12345;
    const rng = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const run = createRun(mode, rng);
    boost(run);
    let cooldown = 0;
    for (let i = 0; i < 120 * 90 && run.phase === "running"; i++) {
      const next = run.obstacles.find(
        (o) => o.x + o.width > run.player.x - run.player.radius,
      );
      const target = next?.center ?? 310;
      cooldown -= 1 / 120;
      if (run.player.y > target + 8 && run.player.vy > 0 && cooldown <= 0) {
        boost(run);
        cooldown = 0.16;
      }
      step(run, 1 / 120);
      run.events = [];
    }
    assert.ok(
      run.gates >= 30,
      `${mode}: ${run.gates} gates, ended by ${run.cause}`,
    );
    assert.ok(run.bestStreak > 0);
    assert.ok(run.player.charge >= 0 && run.player.charge <= 1);
  }
});
test("malformed or unavailable device storage cannot prevent boot", () => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: () => "{broken",
      setItem: () => {
        throw Error("denied");
      },
    },
  });
  assert.equal(loadSave().mode, "easy");
  assert.equal(writeSave({}), false);
  globalThis.localStorage.getItem = () =>
    JSON.stringify({
      best: { easy: -5, hard: "NaN" },
      mode: "bad",
      runs: Infinity,
    });
  assert.deepEqual(loadSave().best, { easy: 0, hard: 0, dash: 0 });
  assert.equal(loadSave().runs, 0);
  delete globalThis.localStorage;
});
test("v2 leaderboard partitions difficulty and UTC date, callsigns are bounded", () => {
  assert.equal(
    boardKey("hard", new Date("2026-10-06T23:59:59Z")),
    "duck-duck-nuke-v2-hard-2026-10-06",
  );
  assert.notEqual(boardKey("hard"), boardKey("easy"));
  assert.equal(cleanCallsign("<x> hello! 1234567"), "XHELLO1234");
});
