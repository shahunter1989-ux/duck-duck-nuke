import { WORLD } from './simulation.js';
import { WORLDS, worldAt, assetUrl } from './worlds.js';
const wrap = (x, period) => ((x % period) + period) % period;
export class WorldRenderer {
  constructor() { this.images = new Map(); this.current = 0; this.previous = 0; this.fade = 1; this.load(0); }
  load(index) {
    if (!this.images.has(index)) { const image = new Image(); image.src = assetUrl(WORLDS[index].asset); this.images.set(index, image); }
    return this.images.get(index);
  }
  reset() { this.current = 0; this.previous = 0; this.fade = 1; }
  draw(ctx, width, run, dt, time, motion) {
    const world = worldAt(run.gates), image = this.load(world.index);
    this.load((world.index + 1) % WORLDS.length);
    if (image.complete && image.naturalWidth && this.current !== world.index) {
      this.previous = this.current; this.current = world.index; this.fade = motion ? 0 : 1;
    }
    if (run.phase !== 'paused') this.fade = Math.min(1, this.fade + dt / 1.8);
    if (!motion) this.fade = 1;
    if (this.fade < 1) this.layer(ctx, width, WORLDS[this.previous], this.images.get(this.previous), run, time, motion);
    ctx.save(); ctx.globalAlpha = this.fade;
    this.layer(ctx, width, WORLDS[this.current], this.images.get(this.current), run, time, motion); ctx.restore();
  }
  layer(ctx, width, world, image, run, time, motion) {
    ctx.fillStyle = world.sky; ctx.fillRect(0, 0, width, WORLD.height);
    // A slow, bounded camera pan keeps a non-tileable painting seamless.
    // Independent foreground and weather layers provide continuous parallax.
    if (image?.complete && image.naturalWidth) {
      const scale = Math.max(width / image.naturalWidth, WORLD.height / image.naturalHeight) * 1.13;
      const iw = image.naturalWidth * scale, ih = image.naturalHeight * scale;
      const pan = motion ? Math.sin(time * .025) * (iw - width) * .42 : 0;
      ctx.drawImage(image, (width - iw) / 2 + pan, (WORLD.height - ih) * .6, iw, ih);
    }
    if (motion) {
      this.atmosphere(ctx, width, world, time);
      this.foreground(ctx, width, world, time);
    }
    const shade = ctx.createLinearGradient(0, 0, 0, WORLD.height);
    shade.addColorStop(0, '#08100fb0'); shade.addColorStop(.22, '#08100f00'); shade.addColorStop(.8, '#08100f00'); shade.addColorStop(1, '#08100f70');
    ctx.fillStyle = shade; ctx.fillRect(0, 0, width, WORLD.height);
  }
  atmosphere(ctx, width, world, time) {
    if (world.weather === 'stars') {
      ctx.save(); const opacity = ctx.globalAlpha;
      ctx.fillStyle = world.accent;
      for (let i = 0; i < 32; i++) {
        ctx.globalAlpha = opacity * (.16 + (Math.sin(time * 1.2 + i * 2.3) + 1) * .13);
        const x = wrap(i * 137.51 - time * (2 + i % 3), width + 20) - 10;
        ctx.beginPath(); ctx.arc(x, (i * 83.17) % 540, .6 + (i % 3) * .3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore(); return;
    }
    ctx.save();
    const opacity = ctx.globalAlpha;
    const period = width + 100;
    // Low drifting haze is visually separate from the distant artwork.
    const haze = ctx.createLinearGradient(0, 420, 0, 580);
    haze.addColorStop(0, 'transparent'); haze.addColorStop(.55, world.weather === 'dust' ? '#f9c89913' : '#99d8cd13'); haze.addColorStop(1, 'transparent');
    ctx.fillStyle = haze;
    for (let i = 0; i < 3; i++) { const x = wrap(i * period / 3 - time * (8 + i * 2), period) - 150; ctx.beginPath(); ctx.ellipse(x, 495 + i * 21 + Math.sin(time * .25 + i) * 7, 210, 34, 0, 0, Math.PI * 2); ctx.fill(); }
    if (world.weather === 'snow') {
      ctx.strokeStyle = '#9ff5db'; ctx.lineWidth = 17;
      for (let ribbon = 0; ribbon < 3; ribbon++) { ctx.globalAlpha = opacity * (.025 + Math.sin(time * .3 + ribbon) * .012); ctx.beginPath(); for (let x = -10; x <= width + 10; x += 15) { const y = 120 + ribbon * 19 + Math.sin(x / 160 + time * .1 + ribbon * .3) * 34; x === -10 ? ctx.moveTo(x,y) : ctx.lineTo(x,y); } ctx.stroke(); }
    }
    const count = world.weather === 'rain' ? 68 : world.weather === 'snow' ? 45 : 24;
    for (let i = 0; i < count; i++) {
      const seed = i * 137.51, z = .4 + (i % 5) / 5;
      const x = wrap(seed - time * (world.weather === 'rain' ? 58 : 10) * z, period) - 50;
      const y = wrap(i * 83.17 + time * (world.weather === 'rain' ? 310 : world.weather === 'snow' ? 27 : -5) * z, 600);
      if (world.weather === 'leaves') {
        ctx.save(); ctx.globalAlpha = opacity * .55;
        ctx.translate(x + Math.sin(time * .7 + i) * 20, wrap(i * 83.17 + time * 20 * z, 620));
        ctx.rotate(time * .7 + i); ctx.fillStyle = ['#df793e', '#e9b654', '#b75635'][i % 3];
        ctx.beginPath(); ctx.ellipse(0, 0, 4 * z, 2 * z, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
      else if (world.weather === 'rain') { ctx.strokeStyle = '#b9cae1'; ctx.globalAlpha = opacity * (.10 + z * .09); ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-4,y+15*z); ctx.stroke(); }
      else { ctx.fillStyle = world.weather === 'snow' ? '#e2f1ff' : world.accent; ctx.globalAlpha = opacity * (world.weather === 'fireflies' ? .25 + (Math.sin(time*1.6+i)+1)*.2 : .25); ctx.beginPath(); ctx.arc(x + Math.sin(time*.6+i)*8, world.weather === 'fireflies' ? 340+y*.4 : y, world.weather === 'fireflies' ? 1.6 : z*1.9, 0, Math.PI*2); ctx.fill(); }
    }
    if (world.weather === 'rain' || world.weather === 'fireflies') {
      ctx.strokeStyle = world.accent;
      for (let i=0;i<14;i++) { ctx.globalAlpha=opacity * (.05+(Math.sin(time*1.4+i)+1)*.035); const x=wrap(i*103-time*9,period)-50; ctx.beginPath(); ctx.ellipse(x,548+(i%4)*12,12+(Math.sin(time+i)+1)*12,1.5,0,0,Math.PI*2);ctx.stroke(); }
    }
    ctx.restore();
  }
  foreground(ctx, width, world, time) {
    if (world.weather === 'stars') return;
    ctx.save(); const opacity = ctx.globalAlpha; ctx.fillStyle = world.shadow;
    // Two bounded layers move at different speeds; decoration never enters a gate.
    for (let layer = 0; layer < 2; layer++) {
      const spacing = layer ? 180 : 260, offset = wrap(time * (layer ? 35 : 13), spacing);
      ctx.globalAlpha = opacity * (layer ? .88 : .42);
      for (let x = -spacing; x < width + spacing; x += spacing) {
        const px = x - offset, base = layer ? 609 : 594;
        if (world.weather === 'fireflies' || world.weather === 'breeze') {
          ctx.lineWidth = 3; ctx.strokeStyle = world.shadow;
          for (let reed=0;reed<5;reed++) { ctx.beginPath();ctx.moveTo(px+reed*7,base+18);ctx.quadraticCurveTo(px+reed*6+Math.sin(time+reed)*4,base-14,px+reed*7-7,base-30-reed*2);ctx.stroke(); }
        } else {
          ctx.beginPath(); ctx.moveTo(px,base+20); ctx.lineTo(px+14,base-4); ctx.lineTo(px+40,base-12); ctx.lineTo(px+65,base+6); ctx.lineTo(px+87,base+20); ctx.fill();
          if (world.weather === 'dust') { ctx.fillRect(px+110,base-17,4,37);ctx.fillRect(px+105,base-11,25,3); }
          if (world.weather === 'rain') { ctx.fillRect(px+115,base-18,7,38);ctx.fillRect(px+109,base-20,19,4); }
        }
      }
    }
    ctx.restore();
  }
}
