import test from 'node:test';
import assert from 'node:assert/strict';
import { PILOTS } from '../src/pilots.js';
import { ENGINES, exhaustState } from '../src/exhaust.js';

test('every active pilot has an explicit engine setup with valid sprite regions', () => {
  assert.deepEqual(Object.keys(ENGINES).sort(), PILOTS.map(p=>p.id).sort());
  for (const [id, engines] of Object.entries(ENGINES)) {
    if (['ducky','barkhawk02'].includes(id) || PILOTS.some(p => p.id === id && ['quack','honk'].includes(p.group))) { assert.equal(engines.length,0);continue; }
    assert.ok(engines.length>0,id);
    for (const engine of engines) {
      assert.ok(engine.x>=0 && engine.x<=1 && engine.y>=0 && engine.y<=1,id);
      if (engine.box) {
        const [l,t,r,b]=engine.box;
        assert.ok(l>=0 && t>=0 && r<=1 && b<=1 && l<r && t<b,id);
      }
    }
  }
});
test('boost strengthens exhaust, while flicker stays bounded and repeatable', () => {
  for (let i=0;i<600;i++) {
    const t=i/60,idle=exhaustState(t,0),boosted=exhaustState(t,1);
    assert.ok(boosted.stretch>idle.stretch);
    assert.ok(idle.stretch>=.78 && boosted.stretch<=1.67);
    assert.deepEqual(exhaustState(t,1),boosted);
  }
  assert.notEqual(exhaustState(0,0).stretch,exhaustState(.1,0).stretch);
});
test('reduced motion leaves painted exhaust undistorted at every time and charge', () => {
  assert.deepEqual(exhaustState(0,0,false),{stretch:1,width:1,wave:0});
  assert.deepEqual(exhaustState(100,1,false),exhaustState(0,0,false));
});
