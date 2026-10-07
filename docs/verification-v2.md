# Wasteland Edition verification

Verified locally on October 6, 2026 (America/Los_Angeles).

## Automated checks

- `npm run check`: passes JavaScript syntax checks.
- `npm test`: 9 passing tests, including all 37 pilot assets, launch/pause/crash boundaries, fuel spending and recharge, cap scoring and streak reset, collision geometry, defensive storage, UTC board partitioning, and 90-second seeded autopilot runs in both modes.
- `npm run build`: produces a standalone static `dist/` site.
- `git diff --check`: no whitespace errors.

## Chrome browser checks

- Desktop: new hangar, selected pilot, launch, Space boost, P pause, resume, crash summary, immediate retry controls.
- 390 × 844 portrait: responsive hangar, pilot search, Duke Quackem selection, Survivor mode, fuel HUD, mobile Boost, pause.
- 844 × 390 landscape: centered flight viewport, visible HUD, available controls, no clipped dialog controls.
- Settings during flight pause simulation. Closing settings returns to the pause dialog. Sound and motion preferences survive a reload.
- Pilot and difficulty selections survive reload.
- Both `/` and `/duck-duck-nuke/` serve working assets and browser modules.
- Firebase read succeeded for the new daily board, displaying a valid empty board. No test scores were posted to the production database.
- Browser console showed no warnings or errors in the exercised flows.

## Scope of evidence

Browser layout testing uses Chrome viewport emulation, not a physical iPhone or Safari. Automated sustained flight tests exercise the simulation, while browser checks exercise actual UI and rendering. The public score-write path preserves the existing Firestore schema but was not exercised against production to avoid adding test entries. Client-supplied scores remain appropriate for a casual leaderboard, not authoritative competition.
