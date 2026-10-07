// Render-only calibration. Collision geometry is identical for every pilot.
const overrides = {
  jag: { width: 100, height: 84, propulsion: 'clean', color: '#ff8dc9' },
  ducky: { art: 'animation/ducky/01.webp', frames: ['01', '02', '03', '04'].map(n => `animation/ducky/${n}.webp`), width: 90, height: 90, offsetY: -11, propulsion: 'wings', nozzle: [-.29, .12] },
  amy: { art: 'polished/amy.webp', width: 90, height: 78, nozzle: [-.37, .28], propulsion: 'clean' },
  painter: { width: 94, height: 82, nozzle: [-.27, .27], color: '#d8a0ff' },
  coffee: { width: 89, height: 74, nozzle: [-.35, -.04], color: '#eeb0e0' },
  pettywiselol: { art: 'polished/pettywiselol-v2.webp', width: 101, height: 84, propulsion: 'clean', color: '#d8a0ff' },
  youyosong: { width: 107, height: 58, nozzle: [-.29, .08] },
  bigndn1988: { width: 108, height: 56, nozzle: [-.27, .02] },
  coconut: { width: 101, height: 69, nozzle: [-.31, .28], color: '#b3ee75' },
  retrochick24: { width: 93, height: 76, nozzle: [-.31, .29] },
  quackshot01: { propulsion: 'clean', nozzle: [-.45, .16], color: '#80dbff' },
  dustdart03: { propulsion: 'clean', nozzle: [-.45, .04] },
  nightbeak06: { propulsion: 'clean', nozzle: [-.45, .10], color: '#a0b8ff' },
  barkhawk02: { propulsion: 'propeller', nozzle: [-.46, .08] },
  warwaddler09: { width: 101, height: 67, propulsion: 'clean', nozzle: [-.44, .02] },
  novaquack10: { color: '#c898ff' },
  copilot04: { color: '#86e5ff' },
  howler05: { color: '#c198ff' },
  astro07: { color: '#86e5ff' },
};
export function pilotVisual(pilot) {
  return { art: `optimized/${pilot.asset}.webp`, width: pilot.group === 'squad' ? 100 : 94, height: pilot.group === 'squad' ? 60 : 76, offsetY: 0, nozzle: [-.32, .14], color: '#ffae62', propulsion: 'baked', ...overrides[pilot.id] };
}
export function animationFrame(time, boosted = false) {
  // Hold mid-stroke frames slightly longer for a natural downstroke/recovery.
  const cycle = [0, 1, 2, 2, 3, 0];
  return cycle[Math.floor(Math.max(0, time) * (boosted ? 15 : 9)) % cycle.length];
}
