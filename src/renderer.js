import { WORLD, clamp } from "./simulation.js";
import { WorldRenderer } from "./world-renderer.js";
import { PilotRenderer } from "./pilot-renderer.js";
const asset = (name) =>
  new URL(`../assets/optimized/${name}.webp`, import.meta.url).href;
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.images = new Map();
    this.particles = [];
    this.labels = [];
    this.shake = 0;
    this.motion = true;
    this.worlds = new WorldRenderer();
    this.pilotRenderer = new PilotRenderer();
    this.load("wzx-radiation-barrel");
    this.load("wzx-tnt-barrel");
    this.load("wzx-red-cap");
    this.resize();
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
  }
  load(name) {
    if (!this.images.has(name)) {
      const image = new Image();
      image.src = asset(name);
      this.images.set(name, image);
    }
    return this.images.get(name);
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect(),
      dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.round(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.round(rect.height * dpr));
  }
  burst(x, y, color, count = 12) {
    for (let i = 0; i < count; i++)
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.65) * 160,
        vy: (Math.random() - 0.5) * 180,
        life: 0.3 + Math.random() * 0.3,
        color,
        size: 2 + Math.random() * 4,
      });
    if (this.particles.length > 160)
      this.particles.splice(0, this.particles.length - 160);
  }
  event(e, run) {
    if (e.type === "boost") this.pilotRenderer.boost();
    if (e.type === "cap") {
      this.burst(e.x, e.y, "#e8ed9c", 15);
      this.labels.push({
        x: e.x,
        y: e.y - 22,
        life: 1,
        text: run.streak > 1 ? `+2 / ${run.streak} STREAK` : "+2 CAPS",
      });
    }
    if (e.type === "crash") {
      this.burst(run.player.x, run.player.y, "#ff6738", 36);
      this.shake = 0.28;
    }
    if (e.type === "empty")
      this.labels.push({
        x: run.player.x,
        y: run.player.y - 45,
        life: 0.6,
        text: "RECHARGING",
      });
  }
  reset() {
    this.particles = [];
    this.labels = [];
    this.shake = 0;
    this.worlds.reset();
    this.pilotRenderer.reset();
  }
  draw(run, pilot, dt, ambient) {
    const ctx = this.ctx,
      w = this.canvas.width,
      h = this.canvas.height;
    if (!w || !h) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#1c2925";
    ctx.fillRect(0, 0, w, h);
    const scale = h / WORLD.height,
      visibleW = w / scale;
    // Portrait keeps a useful look-ahead without changing the simulation or its difficulty.
    const offsetX =
      visibleW < WORLD.width
        ? -(run.player.x - visibleW * 0.23)
        : (visibleW - WORLD.width) / 2;
    ctx.scale(scale, scale);
    this.worlds.draw(ctx, visibleW, run, dt, ambient, this.motion);
    ctx.save();
    ctx.translate(offsetX, 0);
    if (this.motion && this.shake > 0)
      ctx.translate(
        (Math.random() - 0.5) * this.shake * 22,
        (Math.random() - 0.5) * this.shake * 22,
      );
    for (const o of run.obstacles) {
      const top = o.center - o.gap / 2,
        bottom = o.center + o.gap / 2;
      this.stack(o.x, 0, o.width, top, true, o.type);
      this.stack(
        o.x,
        bottom,
        o.width,
        WORLD.floor - bottom + 18,
        false,
        o.type,
      );
      if (!o.taken) {
        const x = o.x + o.width / 2,
          y = o.center,
          pulse = this.motion ? Math.sin(ambient * 3) * 2 : 0;
        ctx.save();
        ctx.shadowColor = "#ffd561";
        ctx.shadowBlur = 15;
        ctx.strokeStyle = "#fae29755";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 23 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        const cap = this.images.get("wzx-red-cap");
        if (cap?.complete && cap.naturalWidth)
          this.contain(cap, x - 16, y - 16, 32, 32);
        else {
          ctx.fillStyle = "#fc6944";
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }
    this.pilotRenderer.draw(ctx, run, pilot, dt, ambient, this.motion);
    for (const particle of this.particles) {
      if (run.phase !== "paused") {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vy += 110 * dt;
        particle.life -= dt;
      }
      ctx.globalAlpha = clamp(particle.life * 2, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    }
    ctx.globalAlpha = 1;
    this.particles = this.particles.filter((p) => p.life > 0);
    for (const label of this.labels) {
      if (run.phase !== "paused") {
        label.life -= dt;
        label.y -= dt * 24;
      }
      ctx.globalAlpha = clamp(label.life * 2, 0, 1);
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "#f3edbe";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 5;
      ctx.fillText(label.text, label.x, label.y);
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
    this.labels = this.labels.filter((l) => l.life > 0);
    this.shake = Math.max(0, this.shake - dt);
    ctx.restore();
    ctx.fillStyle = "#1a241dea";
    ctx.fillRect(0, WORLD.floor, visibleW, WORLD.height - WORLD.floor);
    ctx.fillStyle = "#d6e5a37a";
    ctx.fillRect(0, WORLD.floor, visibleW, 2);
    if (run.phase === "running") {
      ctx.fillStyle = "#e0bd6b70";
      for (let x = -30; x < visibleW + 30; x += 45)
        ctx.fillRect(x - ((run.distance * 3) % 45), WORLD.floor + 3, 18, 3);
    }
  }
  cover(image, x, y, w, h) {
    if (!image?.complete || !image.naturalWidth) return;
    const s = Math.max(w / image.naturalWidth, h / image.naturalHeight);
    this.ctx.drawImage(
      image,
      x + (w - image.naturalWidth * s) / 2,
      y + (h - image.naturalHeight * s) / 2,
      image.naturalWidth * s,
      image.naturalHeight * s,
    );
  }
  contain(image, x, y, w, h) {
    const s = Math.min(w / image.naturalWidth, h / image.naturalHeight);
    this.ctx.drawImage(
      image,
      x + (w - image.naturalWidth * s) / 2,
      y + (h - image.naturalHeight * s) / 2,
      image.naturalWidth * s,
      image.naturalHeight * s,
    );
  }
  stack(x, y, w, h, top, type) {
    const ctx = this.ctx,
      image = this.images.get(type ? "wzx-tnt-barrel" : "wzx-radiation-barrel");
    ctx.save();
    ctx.beginPath();
    ctx.rect(x - 4, y, w + 8, h);
    ctx.clip();
    if (image?.complete && image.naturalWidth) {
      const segment = (w * image.naturalHeight) / image.naturalWidth;
      for (
        let sy = top ? y + h - segment : y;
        top ? sy > y - segment : sy < y + h;
        sy += (top ? -1 : 1) * segment * 0.88
      )
        ctx.drawImage(image, x - 3, sy, w + 6, segment);
    } else {
      ctx.fillStyle = type ? "#8f4d33" : "#708646";
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#252d20";
      for (let sy = y; sy < y + h; sy += 65) ctx.fillRect(x, sy, w, 6);
    }
    ctx.restore();
  }
}
