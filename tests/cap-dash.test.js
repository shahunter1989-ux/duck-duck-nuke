import test from 'node:test';
import assert from 'node:assert/strict';
import {createRun,boost,step} from '../src/simulation.js';
import {readBoard,postScore} from '../src/leaderboard.js';
import {loadSave} from '../src/storage.js';

test('Cap Dash survives impacts, pauses its clock, and completes exactly once',()=>{
 const run=createRun('dash',()=>.5);boost(run);run.player.y=620;step(run,1/120);
 assert.equal(run.phase,'running');assert.ok(run.invulnerable>0);assert.equal(run.streak,0);
 assert.equal(run.events.filter(e=>e.type==='bump').length,1);
 run.phase='paused';const remaining=run.remaining;step(run,5);assert.equal(run.remaining,remaining);
 run.phase='running';run.time=59.999;step(run,.01);
 assert.equal(run.phase,'over');assert.equal(run.remaining,0);assert.equal(run.cause,'timer');
 step(run,1);assert.equal(run.events.filter(e=>e.type==='complete').length,1);
});
test('Cap Dash awards capped combo points and never collects a cap twice',()=>{
 const run=createRun('dash',()=>.5);boost(run);
 for(let n=1;n<=6;n++) {
  run.player.y=310;run.player.vy=0;
  run.obstacles=[{x:168,width:68,center:310,gap:240,passed:false,taken:false}];
  step(run,.001,false);
 }
 assert.equal(run.caps,6);assert.equal(run.score,200);assert.equal(run.bestStreak,6);
 const score=run.score;step(run,.001,false);assert.equal(run.score,score);
 run.player.y=620;step(run,.001);assert.equal(run.streak,0);assert.equal(run.score,score);
});
test('Cap Dash records migrate independently and never enter survival boards',async()=>{
 const previous=globalThis.localStorage;
 try {
  globalThis.localStorage={getItem:()=>JSON.stringify({mode:'dash',best:{easy:12,hard:9,dash:150}})};
  assert.deepEqual(loadSave().best,{easy:12,hard:9,dash:150});assert.equal(loadSave().mode,'dash');
  globalThis.localStorage={getItem:()=>JSON.stringify({best:{easy:12,hard:9}})};
  assert.deepEqual(loadSave().best,{easy:12,hard:9,dash:0});
 } finally {globalThis.localStorage=previous;}
 assert.deepEqual(await readBoard('dash'),[]);
 await assert.rejects(postScore({mode:'dash'},{},'TEST','test'),/personal records/);
});
