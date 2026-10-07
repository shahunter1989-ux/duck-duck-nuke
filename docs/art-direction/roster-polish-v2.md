# Roster polish — local revision

All 30 previously untouched pilots received a modest artwork polish using the built-in image generation tool. Ducky, Amy, JAG, PettyWiselol, Coffee and MM777 retain their previously revised artwork. Original optimized assets remain available for rollback.

Runtime images are alpha-preserving WebP files, cropped to visible artwork with transparent padding and a maximum dimension of 720 px. Source PNGs are retained beside them. No image generation CLI or API fallback was used. Painted exhaust was removed in the image edits; nozzle-specific procedural exhaust is configured in `src/exhaust.js`. Barkhawk retains its propeller and has no jet plume. Gameplay collision geometry and roster order are unchanged.

## Files and exact prompts

### painter

- Edit target: `assets/optimized/the-painter.webp`
- Saved source: `assets/polished/painter-v2-source.png`
- Runtime: `assets/polished/painter-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the purple wizard character, starry hat, staff and colorful magical notes, her named purple/gold rocket and red nose. Keep magical notes small and separate from the clean rear engine.
```

### bigzx

- Edit target: `assets/optimized/bigzx.webp`
- Saved source: `assets/polished/bigzx-v2-source.png`
- Runtime: `assets/polished/bigzx-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the bald bearded man with black sunglasses, blue/gold suit, brown gear and olive WULFZX shark-mouth rocket.
```

### wyldwolf

- Edit target: `assets/optimized/wyldwolf.webp`
- Saved source: `assets/polished/wyldwolf-v2-source.png`
- Runtime: `assets/polished/wyldwolf-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the gray anthropomorphic wolf, rugged brown adventurer gear and dark olive/brass WYLDWOLF rocket.
```

### mayra

- Edit target: `assets/optimized/mayra-del-yermo.webp`
- Saved source: `assets/polished/mayra-v2-source.png`
- Runtime: `assets/polished/mayra-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the brown-haired aviator woman in burgundy/leather gear, aviator headwear and cherry-cola bottle rocket with Mayra/cherry labeling.
```

### youyosong

- Edit target: `assets/optimized/youyosong.webp`
- Saved source: `assets/polished/youyosong-v2-source.png`
- Runtime: `assets/polished/youyosong-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the low-profile weathered military aircraft/rocket, tiny cockpit pilot, cream US star insignia, 76 tail and riveted olive/brown metal.
```

Targeted follow-up on the generated sprite:

```text
Edit target: supplied transparent game sprite. Correct ONLY the lettering on the side of the aircraft from YOUTOSONG to the exact text YOUYOSONG. It must read Y O U Y O S O N G. Preserve all other character, aircraft, markings, colors, textures, pose, silhouette, alpha transparency and composition exactly. No new elements. No flames. Transparent background.
```

### coconut

- Edit target: `assets/optimized/coconut.webp`
- Saved source: `assets/polished/coconut-v2-source.png`
- Runtime: `assets/polished/coconut-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the red-haired green-outfit woman, black/green coconut-themed rocket, neon green details and Coconut lettering.
```

### bigndn1988

- Edit target: `assets/optimized/bigndn1988.webp`
- Saved source: `assets/polished/bigndn1988-v2-source.png`
- Runtime: `assets/polished/bigndn1988-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the weathered white/red medical-themed small aircraft rocket with red crosses, numbered markings and cockpit pilot.
```

### retrochick24

- Edit target: `assets/optimized/retrochick24.webp`
- Saved source: `assets/polished/retrochick24-v2-source.png`
- Runtime: `assets/polished/retrochick24-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. Preserve the long black-haired goth woman with tattoos and black clothing, her pose, dark retro rocket with red nose and Retro Chick 24 lettering.
```

### sharkbite07

- Edit target: `assets/optimized/sharkbite-07.webp`
- Saved source: `assets/polished/sharkbite07-v2-source.png`
- Runtime: `assets/polished/sharkbite07-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Silver red shark-mouth rocket jet 07.
```

### dukequackem

- Edit target: `assets/optimized/duke-quackem.webp`
- Saved source: `assets/polished/dukequackem-v2-source.png`
- Runtime: `assets/polished/dukequackem-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Green duck pilot in bubble canopy, cream/red chunky DUKE QUACKEM rocket.
```

### quackshot01

- Edit target: `assets/optimized/quackshot-01.webp`
- Saved source: `assets/polished/quackshot01-v2-source.png`
- Runtime: `assets/polished/quackshot01-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Black yellow stealth duck-shaped craft 01 with blue canopy.
```

### thunderbill02

- Edit target: `assets/optimized/thunderbill-02.webp`
- Saved source: `assets/polished/thunderbill02-v2-source.png`
- Runtime: `assets/polished/thunderbill02-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Blue orange duck-shaped craft 02, two separate left rear engine nozzles.
```

### dustdart03

- Edit target: `assets/optimized/dust-dart-03.webp`
- Saved source: `assets/polished/dustdart03-v2-source.png`
- Runtime: `assets/polished/dustdart03-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Cream tan duck-shaped craft 03 with long gold beak.
```

### mallardstorm04

- Edit target: `assets/optimized/mallardstorm-04.webp`
- Saved source: `assets/polished/mallardstorm04-v2-source.png`
- Runtime: `assets/polished/mallardstorm04-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Olive gray duck-shaped military craft 04, three existing left rear engine nozzles.
```

### eggburner05

- Edit target: `assets/optimized/eggburner-05.webp`
- Saved source: `assets/polished/eggburner05-v2-source.png`
- Runtime: `assets/polished/eggburner05-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White orange rounded duck-shaped craft 05 with the two existing main rear exhaust ports.
```

### nightbeak06

- Edit target: `assets/optimized/nightbeak-06.webp`
- Saved source: `assets/polished/nightbeak06-v2-source.png`
- Runtime: `assets/polished/nightbeak06-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Dark stealth duck-shaped craft 06, blue accents.
```

### sunfin07

- Edit target: `assets/optimized/sunfin-07.webp`
- Saved source: `assets/polished/sunfin07-v2-source.png`
- Runtime: `assets/polished/sunfin07-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White orange duck-shaped craft 07.
```

### buzzbill08

- Edit target: `assets/optimized/buzzbill-08.webp`
- Saved source: `assets/polished/buzzbill08-v2-source.png`
- Runtime: `assets/polished/buzzbill08-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Black yellow duck-shaped craft 08.
```

### warwaddler09

- Edit target: `assets/optimized/war-waddler-09.webp`
- Saved source: `assets/polished/warwaddler09-v2-source.png`
- Runtime: `assets/polished/warwaddler09-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Olive military duck-shaped flying tank craft 09 with tread tracks. Keep weapon barrels distinct from engines.
```

### novaquack10

- Edit target: `assets/optimized/nova-quack-10.webp`
- Saved source: `assets/polished/novaquack10-v2-source.png`
- Runtime: `assets/polished/novaquack10-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Purple gold duck-shaped sleek craft 10, twin existing rear nozzles.
```

### ace01

- Edit target: `assets/optimized/ace-01.webp`
- Saved source: `assets/polished/ace01-v2-source.png`
- Runtime: `assets/polished/ace01-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Gray white jet 01 with brown dog pilot.
```

### barkhawk02

- Edit target: `assets/optimized/barkhawk-02.webp`
- Saved source: `assets/polished/barkhawk02-v2-source.png`
- Runtime: `assets/polished/barkhawk02-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Olive WWII-style propeller plane 02 with brown dog pilot. Preserve front propeller, no jet exhaust or new engines.
```

### spark03

- Edit target: `assets/optimized/spark-03.webp`
- Saved source: `assets/polished/spark03-v2-source.png`
- Runtime: `assets/polished/spark03-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White orange rocket plane 03 with tan dog pilot and lightning emblem.
```

### copilot04

- Edit target: `assets/optimized/copilot-04.webp`
- Saved source: `assets/polished/copilot04-v2-source.png`
- Runtime: `assets/polished/copilot04-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White blue jet 04 with black-white dog pilot.
```

### howler05

- Edit target: `assets/optimized/howler-05.webp`
- Saved source: `assets/polished/howler05-v2-source.png`
- Runtime: `assets/polished/howler05-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Dark purple stealth jet 05 with dark dog pilot.
```

### rocket06

- Edit target: `assets/optimized/rocket-06.webp`
- Saved source: `assets/polished/rocket06-v2-source.png`
- Runtime: `assets/polished/rocket06-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White red rocket plane 06 with the original white, black-spotted Dalmatian pilot.
```

### astro07

- Edit target: `assets/optimized/astro-07.webp`
- Saved source: `assets/polished/astro07-v2-source.png`
- Runtime: `assets/polished/astro07-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White blue weathered rocket plane 07 with brown-white dog pilot.
```

### scrappy08

- Edit target: `assets/optimized/scrappy-08.webp`
- Saved source: `assets/polished/scrappy08-v2-source.png`
- Runtime: `assets/polished/scrappy08-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Yellow black industrial weathered craft 08 with scruffy terrier pilot.
```

### peanut09

- Edit target: `assets/optimized/peanut-09.webp`
- Saved source: `assets/polished/peanut09-v2-source.png`
- Runtime: `assets/polished/peanut09-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: White pink rounded rocket plane 09 with the original curly-haired cream poodle, pink goggles, and paw-print emblem.
```

### nitro10

- Edit target: `assets/optimized/nitro-10.webp`
- Saved source: `assets/polished/nitro10-v2-source.png`
- Runtime: `assets/polished/nitro10-v2.webp`

```text
Use case: identity-preserve / game sprite cleanup. The supplied image is the edit target. Create a faithful polished production version of THIS EXACT character/vehicle, keeping the existing identity, face, outfit, palette, silhouette, pose, direction (right), markings and number. Improve crisp illustrated linework, material shading and small detail readability; repair cutout holes, jagged edges, stray white pixels and halos. This is a modest touch-up, NOT a redesign. One complete sprite only, with real alpha transparency, solid opaque interiors and clean dark outlines. No background, aura, glow, cast shadow, scene, border or extra text. Remove baked flame/smoke completely and leave all existing engine nozzles clear for runtime exhaust. Retain entire hair, limbs, accessories, wings and fins within transparent margins. Do not add engines or change engine arrangement. 
Character invariants: Black orange sleek jet 10 with the original black-and-tan Doberman pilot.
```

## Validation

- Inspected all generated sprites on a contrasting contact sheet.
- Checked every rocket's animated exhaust in the local engine review, including boosted multi-engine craft.
- Verified all 36 roster assets load in the browser and checked character selection in the local game.
- `npm test`, `npm run check`, and `npm run build`.
- This revision is local; it has not been deployed.
