# Local worlds and pilot polish

This revision remains local on codex/local-worlds-and-pilot-polish. Nothing has been pushed or deployed. Public leaderboard reads and writes are disabled by src/release.js for this review build.

## Art generation briefs

Built-in image generation produced the following original paintings and reference-based character edits. These are concise records of the direction used, not verbatim tool transcripts. Original source PNGs are retained alongside optimized WebP delivery files.

- Cinder Junction: abandoned desert railway town, sunset copper and teal, low landmarks and open readable sky, no text or gameplay objects.
- Glowfen Marsh: bioluminescent emerald-blue wetland, ruined flooded observatory, moonlit sky, low silhouettes, no UI.
- Frostbite Relay: lost arctic communications station, snowfields, indigo sky and aurora, open central flight corridor.
- Neon Spillway: abandoned hydroelectric industrial district, plum/cyan/magenta rainy night, illuminated water and low industrial landmarks.
- Amy: preserve green braids, blue outfit, olive/red named rocket; repair pale edge halo and outline gaps, remove baked exhaust.
- Ducky: preserve cap 76, goggles, blue WZX clothing and expressive duck identity; repair transparency defects; generate four wing poses as one strip, then refine tip clearance and padding.

## Files and runtime

- assets/worlds: four paintings with original source PNGs and shipping WebPs.
- assets/polished: Amy source and optimized cutouts.
- assets/animation: original Ducky strip and four normalized 384px frames. Sprite packing removes disconnected neighboring-frame fragments; shared scaling preserves relative proportions.
- src/world-renderer.js: bounded camera pan, two foreground speeds, dust/fireflies/snow/rain, aurora and ripples, 1.8-second location transitions.
- src/pilot-renderer.js: smooth banking, boost response, four-pose wing cycle, calibrated runtime flames for clean rocket sprites. Other pilots retain their original artwork and baked exhaust.
- The roster now contains 35 pilots; simulation rules remain unchanged. World names change every eight gates. The atlas offers a score-free scenic preview and pilot switching.
- Extra motion respects the saved setting and operating-system reduced-motion preference. Pausing freezes world time and character animation.

## Verification

13 automated tests cover original physics/storage, all pilot and world assets, route boundaries, local posting guard, and paused pilot state. Syntax check and static build pass. Browser checks cover all four locations, pilot switching, reduced motion, settings pause/resume, and a 390x844 phone layout.

Full-resolution source PNGs are excluded from the static build. This build is a local review candidate, not a production release.

## Exhaust animation pass

All 33 rocket/jetpack pilots now have explicit engine coordinates in src/exhaust.js. Ducky and the propeller aircraft have no rocket plume. Existing painted flame regions are separated into cached offscreen canvas layers at runtime and animated with pinned attachment points, travelling distortion, independent multi-engine phases, and boost expansion. The original source images remain unchanged. Clean engines use layered procedural cores and soft glow. Bounded ember trails fade downstream. Coffee has angled jetpack drift and PettyWiselol uses a shaped mask to avoid moving the rider or rocket body. Reduced motion preserves painted exhaust geometry; pause freezes the shared simulation animation clock.

The local diagnostic gallery is artifacts/exhaust-review.html (excluded from builds); its Boost all engines button toggles sustained boost for inspection. All 16 tests, syntax checks, and the static build pass. Full-roster gallery and in-game scenic checks completed without console errors.
