export class Sound {
  constructor(enabled) {
    this.enabled = enabled;
    this.context = null;
  }
  unlock() {
    if (!this.enabled) return;
    try {
      this.context ??= new (window.AudioContext || window.webkitAudioContext)();
      this.context.resume().catch(() => {});
    } catch {}
  }
  play(type) {
    if (!this.enabled || !this.context || this.context.state !== "running")
      return;
    const settings = {
      boost: [130, 360, 0.12, 0.035, "sawtooth"],
      cap: [720, 1250, 0.16, 0.065, "sine"],
      gate: [360, 520, 0.09, 0.03, "triangle"],
      crash: [110, 30, 0.4, 0.08, "sawtooth"],
      click: [440, 650, 0.06, 0.025, "sine"],
      empty: [90, 70, 0.09, 0.035, "triangle"],
    }[type];
    if (!settings) return;
    const [from, to, duration, volume, wave] = settings,
      ctx = this.context,
      now = ctx.currentTime;
    const osc = ctx.createOscillator(),
      gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(to, now + duration);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(now + duration + 0.02);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
}
