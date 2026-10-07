import { ExhaustRenderer } from "./exhaust.js";
import { clamp } from './simulation.js';
import { pilotVisual, animationFrame } from './pilot-visuals.js';
import { assetUrl } from './worlds.js';
export class PilotRenderer {
  constructor() { this.images = new Map(); this.exhaust = new ExhaustRenderer(); this.reset(); }
  reset() { this.pitch = 0; this.impulse = 0; }
  boost() { this.impulse = 1; }
  load(path) {
    if (!this.images.has(path)) { const image = new Image(); image.src = assetUrl(path); this.images.set(path, image); }
    return this.images.get(path);
  }
  draw(ctx, run, pilot, dt, time, motion) {
    const v = pilotVisual(pilot), p = run.player;
    for (const frame of v.frames || []) this.load(frame);
    if (run.phase !== 'paused') {
      this.impulse = Math.max(0, this.impulse - dt * 2.7);
      const target = run.phase === 'ready' ? -.06 : clamp(p.vy / 1100, -.26, .42);
      this.pitch += (target - this.pitch) * (1 - Math.exp(-dt * 12));
    }
    const frame = motion ? animationFrame(time, this.impulse > .3) : 0;
    const image = this.load(v.frames?.[frame] || v.art);
    if (!image.complete || !image.naturalWidth) return;
    const scale = Math.min(v.width / image.naturalWidth, v.height / image.naturalHeight);
    const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
    ctx.save(); ctx.translate(p.x, p.y + v.offsetY + (motion && run.phase === 'ready' ? Math.sin(time * 2) * 4 : 0));
    ctx.rotate(this.pitch);
    if (motion) ctx.scale(1 + this.impulse * .025, 1 - this.impulse * .015);
    if (v.frames || v.propulsion === 'propeller') ctx.drawImage(image,-w/2,-h/2,w,h);
    else this.exhaust.draw(ctx,image,pilot.id,w,h,time,this.impulse,motion,run.phase !== 'over');
    ctx.restore();
  }
}
