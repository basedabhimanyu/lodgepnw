# LodgePNW website (v2)

One-page site for LodgePNW. Its one job is to get owners to request a free Direct Booking Teardown. The spec is in `PRD.md`.

## Run

```
npm install
npm run dev        # http://localhost:5173  (add ?city=Leavenworth to pin a destination)
npm run build      # pre-rendered static site in dist/
npm run preview    # serve dist/ on http://localhost:4173
```

## Where things live

| What | File |
| --- | --- |
| Destinations (rotator, ticker, map, footer) | `src/config/destinations.ts` |
| Every animation timing | `src/config/motion.ts` |
| Bandit spots (sizes, files, rod-tip positions) | `src/config/mascot.ts` |
| Leak cards | `src/config/leaks.ts` |
| Colours, fonts, textures, buttons, stamps | `src/styles/index.css` |
| Scroll animations | `src/lib/useSiteMotion.ts` |
| Bandit's drawing, poses and outfits | `src/components/bandit/Figure.tsx`, `Bandit.tsx` |
| Bandit's animated scenes (desk, canoe, portrait, heist) | `src/components/bandit/Scenes.tsx` |
| Swipe & Swap on the leak cards | `src/lib/bandit.ts` |
| Sections | `src/sections/*.tsx` |

## Bandit

Bandit is drawn in code as SVG, so every spot already has finished art. Each slot in `src/config/mascot.ts` picks a pose or an animated scene. Review them all at http://localhost:5173/lab.html (dev only).

To replace a drawing with a rendered file later (for example a 3D version), put it in `public/mascot/` named after its slot (`leaks-perch.png`, `hero-loop.mp4`) and set `ready: true` for that slot. Keep the `leaks-perch` drawing unless the new art also has a separate sack: Swipe & Swap animates the sack in the SVG.

## Checks

With the dev server or preview running:

```
node scripts/verify.mjs http://localhost:5173/   # PRD done-list checks
node scripts/shoot.mjs  http://localhost:5173/ pass   # screenshots into shots/
```

## Before launch

- The teardown form has no backend yet: connect it to Formspree, Netlify Forms or a small serverless function in `src/components/TeardownForm.tsx`.
- Replace the placeholder phone number in `src/sections/Footer.tsx` and the founder photo in `src/sections/MeetBandit.tsx`.
