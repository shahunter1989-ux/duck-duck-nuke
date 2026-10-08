// Render-only calibration. Collision geometry is identical for every pilot.
const polishedPilots = new Set(["painter","bigzx","wyldwolf","mayra","youyosong","coconut","bigndn1988","retrochick24","sharkbite07","dukequackem","quackshot01","thunderbill02","dustdart03","mallardstorm04","eggburner05","nightbeak06","sunfin07","buzzbill08","warwaddler09","novaquack10","ace01","barkhawk02","spark03","copilot04","howler05","rocket06","astro07","scrappy08","peanut09","nitro10"]);
const overrides = {
  mm777: { art: 'polished/mm777-v2.webp', width: 105, height: 72, propulsion: 'clean', color: '#ffad4f' },
  jag: { art: 'polished/jag-label.webp', width: 100, height: 84, propulsion: 'clean', color: '#ff8dc9' },
  ducky: { art: 'animation/ducky/01.webp', frames: ['01', '02', '03', '04'].map(n => `animation/ducky/${n}.webp`), width: 90, height: 90, offsetY: -11, propulsion: 'wings', nozzle: [-.29, .12] },
  amy: { art: 'polished/amy.webp', width: 90, height: 78, nozzle: [-.37, .28], propulsion: 'clean' },
  painter: { width: 94, height: 82, nozzle: [-.27, .27], color: '#d8a0ff' },
  coffee: { art: 'polished/coffee-v2.webp', width: 94, height: 76, propulsion: 'clean', color: '#eeb0e0' },
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
  const visual = { art: `optimized/${pilot.asset}.webp`, width: pilot.group === 'squad' ? 100 : 94, height: pilot.group === 'squad' ? 60 : 76, offsetY: 0, nozzle: [-.32, .14], color: '#ffae62', propulsion: 'baked', ...overrides[pilot.id] };
  if (polishedPilots.has(pilot.id)) {
    visual.art = `polished/${pilot.id}-v2.webp`;
    visual.propulsion = pilot.id === 'barkhawk02' ? 'propeller' : 'clean';
  }
  if (['alien', 'halloween', 'holiday', 'newyear', 'grounded'].includes(pilot.group)) {
    visual.width = 104;
    visual.height = 82;
    visual.propulsion = 'clean';
  }
  if (['quack', 'honk'].includes(pilot.group)) {
    visual.frames = ['01','02','03','04'].map(n => `animation/${pilot.id}/${n}.webp`);
    visual.art = visual.frames[0];
    visual.width = pilot.group === 'honk' ? 108 : 98;
    visual.height = 94;
    visual.propulsion = 'wings';
  }
  if (pilot.id === 'nitro10') visual.art = 'polished/nitro10-v3.webp';
  if (pilot.group === 'jets') { visual.width = 112; visual.height = 72; visual.propulsion = 'clean'; }
  if (pilot.group === 'critters') { visual.width = 98; visual.height = 88; visual.propulsion = 'clean'; }
  return visual;
}
export function animationFrame(time, boosted = false) {
  // Hold mid-stroke frames slightly longer for a natural downstroke/recovery.
  const cycle = [0, 1, 2, 2, 3, 0];
  return cycle[Math.floor(Math.max(0, time) * (boosted ? 15 : 9)) % cycle.length];
}
