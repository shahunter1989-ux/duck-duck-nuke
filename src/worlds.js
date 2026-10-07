export const GATES_PER_WORLD = 8;
export const WORLDS = Object.freeze([
  { id: 'cinder-junction', name: 'Cinder Junction', subtitle: 'Where the last train never left.', terrain: 'THE ASHLINE', weather: 'dust', accent: '#ffba72', shadow: '#372b27', sky: '#6e9294', asset: 'worlds/cinder-junction.webp' },
  { id: 'glowfen-marsh', name: 'Glowfen Marsh', subtitle: 'Follow the lights. Not the voices.', terrain: 'THE LOWLANDS', weather: 'fireflies', accent: '#a6f1af', shadow: '#112c2e', sky: '#376b76', asset: 'worlds/glowfen-marsh.webp' },
  { id: 'frostbite-relay', name: 'Frostbite Relay', subtitle: 'A lost signal at the edge of winter.', terrain: 'THE NORTH REACH', weather: 'snow', accent: '#a7def6', shadow: '#26304b', sky: '#1d2e58', asset: 'worlds/frostbite-relay.webp' },
  { id: 'neon-spillway', name: 'Neon Spillway', subtitle: 'The power is out. The city isn’t.', terrain: 'THE AFTERLIGHT', weather: 'rain', accent: '#e9a1df', shadow: '#201d34', sky: '#25223c', asset: 'worlds/neon-spillway.webp' },
]);
export function worldAt(gates = 0) {
  gates = Number.isFinite(gates) ? Math.max(0, gates) : 0;
  const stage = Math.floor(Math.max(0, Number.isFinite(gates) ? gates : 0) / GATES_PER_WORLD);
  return { ...WORLDS[stage % WORLDS.length], index: stage % WORLDS.length, stage, lap: Math.floor(stage / WORLDS.length) + 1, progress: Math.max(0, gates % GATES_PER_WORLD) / GATES_PER_WORLD };
}
export const assetUrl = path => new URL(`../assets/${path}`, import.meta.url).href;
