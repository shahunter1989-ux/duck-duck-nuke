# Duck Duck Nuke

A little duck. A big apocalypse. A browser arcade game by **Wulfzx.Underground**.

## Play and develop

- Live: https://shahunter1989-ux.github.io/duck-duck-nuke/
- Source: https://github.com/shahunter1989-ux/duck-duck-nuke
- Run locally: `npm run dev`, then open http://127.0.0.1:4173.
- Validate: `npm test` and `npm run check` (Node 22 or later).
- Build a portable static site: `npm run build`; output is `dist/`.

Use an HTTP server; browser module imports do not support opening `index.html` directly as a file.

## Wasteland Edition / v2

The original 37 playable pilots and world artwork return in a rebuilt hangar and flight experience. Menus are semantic HTML with keyboard navigation, pilot search, responsive dialogs, and device-saved preferences. The Canvas 2D renderer uses optimized WebP art and loads additional worlds as needed. Fonts and their open-font licenses are bundled locally.

The simulation uses a 960 × 640 logical world and a fixed 120 Hz update step. Rendering adapts to the screen; gameplay speed, fuel, scoring, and collision rules remain independent of CSS viewport size. Portrait view follows a fixed horizontal framing with the pilot at 23% of the visible width. It does not rescale the physics.

### Controls

| Action               | Input                                                 |
| -------------------- | ----------------------------------------------------- |
| Boost                | Space, ↑, tap the flight area, or mobile Boost button |
| Pause / resume       | P, Escape, or the pause menu                          |
| New run              | R during flight, or the result / pause buttons        |
| Pilot and difficulty | Flight setup in the hangar                            |

Switching browser tabs or losing window focus pauses an active flight automatically. Reduced-motion preferences disable extra animation and screen shake. Sound can be muted and persists across sessions.

### Rules

- **Rookie:** unlimited boost, wider gaps, gentler starting speed.
- **Survivor:** each boost costs 20% charge. Fuel recovers at 29% per second; each red cap restores 16%.
- Every 100 meters earns 1 point. Every cap earns 2 points.
- Consecutive caps build a streak. A missed cap breaks it; streaks do not inflate leaderboard points.
- Gates gradually raise speed and narrow the gap within bounded limits. A new visual sector starts every 8 gates.
- Pilots are cosmetic; every pilot uses the same collision radius and physics.

## Project layout

- `src/simulation.js`: pure flight rules, collision detection, scoring, and obstacle generation.
- `src/renderer.js`: canvas presentation, sprites, effects, and viewport framing.
- `src/main.js`: UI state, input, dialogs, and orchestration.
- `src/leaderboard.js`: public daily Firestore scoreboard, deduplication, timeouts, submission retry identity.
- `src/storage.js`: defensive local persistence. Invalid or blocked storage cannot prevent play.
- `src/pilots.js`: the complete pilot roster.
- `assets/optimized/`: WebP derivatives for shipping. Original artwork remains in `assets/`.
- `assets/fonts/`: self-hosted fonts and SIL Open Font Licenses.
- `scripts/optimize-assets.py`: optional artwork rebuild; requires Python and Pillow.

## Daily leaderboard

The existing Firebase project is `pip-boy-jetpack-run`. No new account or paid plan is required. Version 2 writes to `leaderboards/duck-duck-nuke-v2-{easy|hard}-{YYYY-MM-DD}/scores`. The date is UTC. Old boards and their scores remain untouched because the v2 fuel economy and physics differ.

The board retrieves the top 100 score entries, shows the best entry per callsign, and displays five unique callsigns. Posting is explicit. A stable document ID per completed run prevents repeated clicks or uncertain-response retries from creating duplicate entries. Callsigns are limited to 10 letters or digits. Network failure does not interrupt gameplay or device records. Flights completed before a UTC date rollover must be replayed to enter the new day's board.

This is a casual, client-submitted board, not an authoritative competitive service: a determined user can forge client scores. Server-side run verification would be required for prize-bearing or trusted competition. Existing create-only Firestore rules remain compatible:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboards/{day}/scores/{scoreId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['initials', 'score', 'characterId', 'characterName', 'createdAt'])
        && request.resource.data.initials is string
        && request.resource.data.initials.size() > 0
        && request.resource.data.initials.size() <= 10
        && request.resource.data.score is number
        && request.resource.data.score >= 0
        && request.resource.data.characterId is string
        && request.resource.data.characterId.size() > 0
        && request.resource.data.characterName is string
        && request.resource.data.characterName.size() > 0
        && request.resource.data.createdAt == request.time;
      allow update, delete: if false;
    }
  }
}
```

Personal bests are split by v2 mode. The original `pipBoyJetpackBest` record is left intact rather than being mixed with the new rules. Clearing browser storage removes local v2 preferences and records.

## Hosting and rollback

GitHub Pages currently publishes **`main`, repository root**. The application has no runtime package dependency and uses relative URLs, so both the GitHub project subpath and a domain root work. `.nojekyll` disables unnecessary Jekyll processing.

For Vercel, `vercel.json` builds and publishes `dist/`, containing only the shipping HTML, modules, optimized art, and fonts. Original PNGs, tests, and development files are excluded from that output.

Deploy a reviewed commit to `main` to update the existing Pages site. To roll back, revert the overhaul commit and let Pages rebuild; no historical leaderboard data is removed by this release.
