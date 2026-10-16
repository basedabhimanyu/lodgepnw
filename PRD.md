# LodgePNW Website PRD

Adapted from the Frogworks PRD. Build the website described here. Do not generate or download any images: every Bandit spot is a labelled placeholder for now. Follow the build order in section 9 and check each pass in the browser before the next.

## 1. Overview

LodgePNW helps independent cabins, lodges, glamping stays and small vacation-rental portfolios in the Pacific Northwest get more bookings direct, so less of every stay goes to Airbnb and VRBO. Its mascot is Bandit, a raccoon in trail gear who steals guests back from the OTAs. The website has one job: get owners to request a free Direct Booking Teardown.

- Type: a one-page website, built and run on your own computer first.
- Stack: Vite, React, TypeScript, Tailwind CSS, GSAP with ScrollTrigger, Lenis for smooth scrolling. The production build is pre-rendered to static HTML so Google and AI search can read every word without JavaScript.
- Run: `npm run dev`, then open localhost:5173. `npm run build` produces pre-rendered HTML in `dist/`.
- Main action: a free teardown form (property website and booking engine).
- Second action: a "Get a teardown" button, pinned to the bottom on phones.
- Rules: original content only. No third-party logos or stock photos. Platform names (Airbnb, VRBO, OwnerRez, Lodgify and so on) appear only as plain text where they're factual. No invented testimonials, client counts or results. The phone number is a placeholder.

## 2. Brand

Voice: short sentences, hospitality trade words (OTA, direct share, booking path, ADR), a little cheeky. Numbers beat adjectives ("15.5% host fee", "10 business days", "fixed price").

Taglines: Book direct. Keep the fee. / We steal your guests back. / Your guests. Your booking page.

| Bandit | Always the same |
| --- | --- |
| Build | Stout raccoon standing upright, round belly, short legs, calm sly half-smile |
| Style | Flat vector illustration with bold 3px ink outlines, drawn in code (`src/components/bandit`) |
| Fur | Warm grey with a black bandit mask, cream muzzle, ringed tail (5 dark rings) |
| Eyes | Large, amber, relaxed heavy lids |
| Outfit | Forest-green beanie, red-and-black buffalo-check flannel, ember-orange fleece vest with a blank name patch, tan canvas trousers, brown hiking boots with lime laces, a burlap loot sack with a lichen tie |
| Personality | Deadpan innkeeper, never rushed, one slow blink before every swipe |
| Signature move | Swipe & Swap: throws his loot sack over a broken leak, bags it, yanks it back and leaves the fixed version behind |

## 3. Look and feel

Ranger station meets trail map: routed-wood park signs, a guest folio on a clipboard, topographic contour lines. Square corners everywhere. Hard 4px offset shadows, never soft ones.

| Colour | Hex | Used for |
| --- | --- | --- |
| Basalt | #141A17 | Dark bands, main text on light |
| Fir | #1F4D3A | Brand colour, section fills |
| Lichen | #CFE36B | Highlights, underlines, hover states |
| Ember | #E8642C | Buttons, the destination name, warnings |
| Kraft | #E9DFC7 | Guest-folio paper |
| Paper | #F6F1E7 | Light background |
| Slate | #5E6A66 | Secondary text, lines, icons |
| Sunset | #F2B33D | Trailhead stripes, leak accents |

- Headings: Barlow Condensed 800 to 900, uppercase, tight line height.
- Body: Inter, 17px, comfortable line spacing.
- Small labels and numbers: JetBrains Mono, uppercase.
- Self-host all three fonts with Fontsource so the site works offline.
- Details: 45-degree trailhead stripes (sunset and basalt), kraft guest-folio paper with a perforated top edge and a folio number like LP-0417, rubber-stamp labels with a rough inked edge, brush-stroke underlines that draw in on scroll, faint topographic contour lines and light film grain on dark sections.
- Icons: 8 simple booking-leak icons drawn as inline SVG (slow mobile, hidden book button, no book-direct offer, no Google booking link, no email capture, slow inquiry replies, weak story and photos, no past-guest emails), one stroke weight.
- Buttons: ember orange, square, with a hard shadow that collapses when pressed.

## 4. Page structure

| # | Section | Its job | Where Bandit is |
| --- | --- | --- | --- |
| 0 | Top bar | "Free teardowns this week for [destination] owners", email | None |
| 1 | Nav | Logo, 4 links, Get a teardown | Small head badge by the logo |
| 2 | Hero | Destination headline, teardown form, proof chips | Video card, plus Bandit peeking over its corner |
| 3 | Destination ticker | All 30 destinations on a trailhead-stripe band | Hops along the top |
| 4 | Leaks | 8 booking-leak cards | Sits on the grid corner, casts and reels leaks off cards |
| 5 | How it works | Teardown, Fix, Grow guest folio | One pose beside each step |
| 6 | Plans | 3 price clipboards | Leans on the "Start here" plan |
| 7 | The math | Fee calculator, split-flap savings board, PNW map | Video of Bandit paddling a canoe |
| 8 | Meet Bandit | Mascot showcase, plus a founder note | Big video plus 4 outfit tiles |
| 9 | Guarantee | "Clearer path, or we keep working" | Holding a rubber stamp |
| 10 | FAQ | 6 questions | Peeking over the top |
| 11 | Final call to action | Full form | Video of a cast-and-reel |
| 12 | Footer | Destinations, links, contact | Asleep on the giant logo |

## 5. Hero and the destination rotator

- Eyebrow: PNW ONLY · FIXED PRICE · OWNER-RUN.
- Headline: "More direct bookings for stays in [Destination]". The destination changes every 2.4 seconds.
- Change animation: the old destination slides up with a little blur, the new one rises in with a slight bounce, the line width animates so nothing jumps, and a lichen brush underline redraws under the new destination.
- Pause the rotation on hover and when the tab is hidden. Adding `?city=Leavenworth` to the address pins one destination and changes the button to "Get my Leavenworth teardown".
- Subline: "Guests find you on Google, then book on Airbnb. We fix the leak so you keep the 15.5%."
- Form: property website, booking engine (OwnerRez, Lodgify, Hostaway, Guesty, Hospitable, Cloudbeds, Other / none), and a "Get my free teardown" button. On submit, show "Bandit's on it. Your teardown video lands within 2 business days." (no backend yet).
- Proof chips: 15.5% Airbnb host fee, 10-day fix, Fixed price.
- Screen readers hear "More direct bookings for stays across the Pacific Northwest" instead of the moving word.
- Destinations: Lake Chelan, Leavenworth, Winthrop, Mazama, Manson, Wenatchee, Cle Elum, Roslyn, Packwood, Ashford, Index, Glacier, Friday Harbor, Orcas Island, Whidbey Island, Port Townsend, Ocean Shores, Long Beach, Cannon Beach, Manzanita, Lincoln City, Depoe Bay, Hood River, Government Camp, Sisters, Bend, Sunriver, Joseph, Sandpoint, Coeur d'Alene. Keep them in one config file, each with map coordinates.

## 6. Section details

- Nav: hides when scrolling down, comes back when scrolling up.
- Destination ticker: scrolls sideways forever and speeds up when the visitor scrolls fast.
- Leaks: cards deal in one after another. Copy: Slow mobile "4+ seconds and they're back on Airbnb", Hidden book button "3 taps to see dates is 2 too many", No reason to book direct "Give them one they can feel", No Google booking link "Maps sends them to the OTA", No email capture "Every past guest, gone", Slow inquiry replies "First answer wins the booking", Weak story "Your place is better than your page", No past-guest emails "Repeat guests rebook through Airbnb".
- How it works: one kraft guest folio with rows 01 TEARDOWN "A 5-minute video of your Google-to-checkout path, on a phone", 02 FIX "10 business days of fixes on your current site and booking engine", 03 GROW "Monthly past-guest emails and local pages keep guests coming direct". The section pins while you scroll, an ember line draws down, and each row gets a stamped tick.
- Plans: Direct Booking Fix from $1,500 (raised, with a START HERE stamp), Direct Booking Website from $3,500, Direct Growth from $600/mo. Clipboards swing in from their clips and prices count up. A note under them: "Pilot pricing: the first 2 owners this season get the Fix for $750 in exchange for a case study."
- The math: a dark band. Two sliders (annual booking revenue, share moved direct) feed a split-flap board showing "fees you keep per year" (15.5% fee minus about 3% card processing). A simple PNW map with a dot per destination, and "30 DESTINATIONS · 1 CREW · 0% COMMISSION".
- Meet Bandit: a big 9:16 video in a phone frame, "Meet Bandit. Head of Guest Recovery.", three typed-out field notes, and 4 outfit tiles that swap the main video or photo. A short founder note: Bandit is the mascot; Abhimanyu builds the work.
- Guarantee: a full-width ember band, "CLEARER PATH, OR WE KEEP WORKING.", with a GUARANTEED stamp that slams in. Small print: we guarantee the work we control (speed, taps to dates, a working book-direct offer), not booking numbers.
- FAQ: Do I have to leave Airbnb? Will you replace my booking engine or PMS? How fast is it? What do you need from me? What does it cost? Which areas do you cover? Two sentences per answer.
- Final call to action: "Booking guests in [rotating destination]? Bandit's free this week." with the full form (website, booking engine, name, email).
- Footer: all 30 destinations, links, email, "Phone (555) 010-0417 (placeholder)", and a giant LODGEPNW wordmark cropped at the bottom.

## 7. Motion

Fast and physical: things are stamped, dealt, swung and reeled, never floated. Keep every timing in one file.

| Move | Timing | Used for |
| --- | --- | --- |
| Snap | 180ms | Throw, button press, stamps |
| Deal | 420ms, 60ms apart | Cards and chips arriving |
| Swing | 900ms, springy | Clipboards and hanging signs |
| Wipe | 360ms | Brush underlines, text reveals |
| Roll | 280ms out, 420ms in | Destination rotator |

- Swipe & Swap: one slow blink, Bandit winds up and throws his loot sack on an arc (220ms) onto the broken icon. The sack cinches and the icon vanishes into it, the sack flies back to his paw (220ms) bulging, he grins, and the fixed version of the icon (lichen tile with a check badge) drops into the card, then FIXED is stamped.
- On the leak grid, hovering or tapping a card triggers a swipe. He has one sack, so swipes queue. Each card is fixed once. Fixing all 8 earns a thumbs-up and an "All 8 fixed. Now do yours" link to the form.
- Videos load only when needed, play muted and looping, and only play while on screen.
- For visitors who prefer less motion: no pinning, hops, swipes or shakes, just quick fades. Hovering a leak swaps in the fixed icon directly.
- No sideways scrolling on a 390px-wide phone.

## 8. Bandit spots

- Every place Bandit appears is a reusable "mascot slot" listed in one manifest file, with its file name, type (image or video), size, position and whether it's ready.
- Each slot names its art in the manifest: a pose (stand, hop, perch, peek, eyes, head, phone, hammer, wave, lean, stamp, bust, sleep) with an outfit, or an animated scene (desk, canoe, portrait, heist). Scenes replace the MP4s, loop only on screen, and stay still for reduced motion.
- A rendered PNG or MP4 can replace any drawing later: drop it in public/mascot and set `ready: true`.
- Slots: nav-badge, hero-loop, hero-peek, marquee-hop, leaks-perch, step-1, step-2, step-3, plans-lean, math-canoe, bandit-hero, bandit-var-1 to bandit-var-4, guarantee-stamp, faq-peek, cta-cast, footer-sleep.
- Images are transparent PNGs, so Bandit can sit on corners and lean on things. Videos are MP4s inside framed cards.
- The sack's throw starts from wherever the sack actually is in the perch drawing, measured at runtime.
- Files live in `public/mascot` and are named after their slot.

## 9. Build order and done list

1. Set up the project, fonts and colour file.
2. Lay out every section with empty Bandit boxes.
3. Build the hero and the destination rotator.
4. Add the section animations.
5. Add Bandit's mechanics (hop, cast, pocket) using the empty boxes.
6. Polish: textures, mobile layout, reduced motion, speed, pre-rendered build.

Done when: the destination rotates through all 30 without jumping, every Bandit box shows at its final size, Swipe & Swap works on all 8 leak cards, phones have no sideways scroll, the built HTML contains the page copy without JavaScript, and nothing on the page uses a third-party logo or invented claim.
