import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { WORLDS, worldAt, assetUrl } from '../src/worlds.js';
import { PILOTS } from '../src/pilots.js';
import { pilotVisual, animationFrame } from '../src/pilot-visuals.js';
import { readBoard, postScore } from '../src/leaderboard.js';
import { PilotRenderer } from '../src/pilot-renderer.js';
test('locations change every eight gates and repeat after a complete route', () => {
  assert.equal(worldAt(7).name, 'Cinder Junction');
  assert.equal(WORLDS.length, 24);
  assert.equal(worldAt(8).name, 'Area Quack-51');
  assert.equal(worldAt(16).name, 'Pumpkin Hollow');
  assert.equal(worldAt(24).name, 'Neon Spore Jungle');
  assert.equal(new Set(WORLDS.map(w => w.id)).size, 24);
  for (let i = 0; i < WORLDS.length; i++) {
    assert.equal(worldAt(i * 8).id, WORLDS[i].id);
    assert.equal(worldAt(i * 8 + 7).id, WORLDS[i].id);
  }
  assert.equal(worldAt(192).lap, 2);
  assert.equal(worldAt(192).id, WORLDS[0].id);
  for (const input of [-1,NaN,Infinity]) assert.equal(worldAt(input).index,0);
});
test('all 51 pilots, animation frames, and world artwork ship locally', () => {
  assert.equal(PILOTS.length,51);
  for (const pilot of PILOTS) {
    const visual=pilotVisual(pilot);
    for (const path of [visual.art,...visual.frames||[]]) assert.ok(existsSync(new URL(assetUrl(path))),path);
  }
  for (const world of WORLDS) assert.ok(existsSync(new URL(assetUrl(world.asset))));
  assert.deepEqual(new Set(Array.from({length:60},(_,i)=>animationFrame(i/30))),new Set([0,1,2,3]));
});
test('preview cannot read or post public leaderboard records', async () => {
  assert.deepEqual(await readBoard('easy'),[]);
  await assert.rejects(postScore({}, {}, 'TEST', 'test'),/disabled/);
});
test('pilot pitch and boost animation freeze while paused', () => {
  const renderer=new PilotRenderer();renderer.boost();renderer.pitch=.2;
  renderer.load=()=>({complete:false});
  renderer.draw({}, {phase:'paused',player:{vy:500}}, PILOTS[0], .1, 1, true);
  assert.equal(renderer.pitch,.2);assert.equal(renderer.impulse,1);
});

test('JAG joins the Nuke Crew directly between Big ZX and WyldWolf', () => {
  const index=PILOTS.findIndex(p=>p.id==='jag');
  assert.equal(PILOTS[index].name,'JAG');
  assert.equal(PILOTS[index].group,'crew');
  assert.equal(PILOTS[index-1].id,'bigzx');
  assert.equal(PILOTS[index+1].id,'wyldwolf');
});
