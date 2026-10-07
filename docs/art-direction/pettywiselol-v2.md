# PettyWiselol redesign

Built-in image edit based on assets/optimized/pettywiselol.webp. Direction: preserve the adult character identity, long vivid purple hair, cream/purple ruffled carnival outfit, star stockings, burgundy and gold accents; change to a seated forward-pointing pose on a horizontal purple rocket with gold bands, burgundy fins, stars, named sideplate, and jester-face nose emblem. Crisp outlined illustrated art, transparent background, no baked flame; leave a clean nozzle for animated exhaust.

Selected original output: assets/polished/pettywiselol-v2-source.png. Shipping asset: assets/polished/pettywiselol-v2.webp (alpha-preserving, max 720 pixels). Old artwork retained as a reversible source version. src/pilot-visuals.js selects the new art throughout the hangar, roster and flight. src/exhaust.js uses a purple procedural plume at (.025,.75), replacing the old painted-flame mask.

Verified hangar transparency, in-flight scale and nozzle alignment, boost input and browser console. All 17 tests and the static build pass. Local only; not published.
