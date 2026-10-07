import test from 'node:test';
import assert from 'node:assert/strict';
import { capY, createRun, step } from '../src/simulation.js';

test('coin bob stays inside a gentle nine-pixel range and supports reduced motion', () => {
  const o = { center: 310 };
  const positions = Array.from({length: 180}, (_, i) => capY(o, i / 60));
  assert.ok(Math.max(...positions) - Math.min(...positions) > 17);
  assert.ok(positions.every(y => y >= 301 && y <= 319));
  assert.equal(capY(o, 10, false), 310);
});

test('coin pickup and burst use the displayed bob position, and pause freezes time', () => {
  const run = createRun('easy', () => .5);
  run.phase = 'running'; run.time = 1;
  const o = run.obstacles[0];
  o.x = run.player.x - o.width / 2;
  run.player.y = capY(o, run.time);
  step(run, 0);
  assert.equal(run.caps, 1);
  assert.equal(run.events.find(e => e.type === 'cap').y, capY(o, run.time));
  run.phase = 'paused';
  step(run, 1);
  assert.equal(run.time, 1);
});
