import { pilotVisual, animationFrame } from './pilot-visuals.js';
import { assetUrl } from './worlds.js';
import { ExhaustRenderer } from './exhaust.js';

// One shared animation clock and image cache for the hangar and roster.
export class PilotPreviews {
  constructor() { this.items = new Map(); this.images = new Map(); this.exhaust = new ExhaustRenderer(); }
  attach(element, pilot) {
    let canvas = element;
    if (element.tagName !== 'CANVAS') {
      canvas = document.createElement('canvas');
      canvas.id = element.id; canvas.className = element.className;
      element.replaceWith(canvas);
    }
    canvas.width = 320; canvas.height = 220;
    canvas.setAttribute('aria-hidden', 'true');
    this.items.set(canvas, pilot);
    return canvas;
  }
  load(path) {
    if (!this.images.has(path)) { const image = new Image(); image.src = assetUrl(path); this.images.set(path, image); }
    return this.images.get(path);
  }
  draw(time, motion) {
    if (document.hidden) return;
    const dialog = document.querySelector('dialog[open]');
    for (const [canvas, pilot] of this.items) {
      if (!canvas.isConnected) { this.items.delete(canvas); continue; }
      if (dialog && !dialog.contains(canvas)) continue;
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height || box.bottom < 0 || box.top > innerHeight) continue;
      const v = pilotVisual(pilot);
      for (const frame of v.frames || []) this.load(frame);
      const image = this.load(v.frames?.[motion ? animationFrame(time) : 0] || v.art);
      if (!image.complete || !image.naturalWidth) continue;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 320, 220);
      ctx.save();
      const naturalBird = ['quack', 'honk'].includes(pilot.group);
      ctx.translate(naturalBird ? 160 : 182, 110 + (motion ? Math.sin(time * 2 + pilot.id.length) * 3 : 0));
      ctx.scale(2.3, 2.3);
      const scale = Math.min(104 / image.naturalWidth, 84 / image.naturalHeight) * (naturalBird ? 1.25 : 1);
      const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
      if (v.frames || v.propulsion === 'propeller') ctx.drawImage(image, -w/2, -h/2, w, h);
      else this.exhaust.draw(ctx, image, pilot.id, w, h, motion ? time : 0, .12, motion);
      ctx.restore();
    }
  }
}
