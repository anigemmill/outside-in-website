# Outside In homepage v2 ("Showcase"): build spec

Read this alongside `claude/outside-in-website-handover.md` (in the repo or the project). This spec replaces one decision in that handover; everything else in it still applies.

## What changed and why

On 16 Oct 2026 Ani changed the homepage direction. The old rule was a calm homepage with one show-stopping moment ("keep it this simple"). The new brief is a homepage that is as show-stopping as possible, with many effects that show the studio's range.

**Still in force from the handover:** palette and contrast rule, logo geometry and animation rules, Inside view, content and honesty rules, NZ English voice, and the quality bar (build passes, no horizontal scroll 320–1440px, axe AA clean in Outside and Inside views, no console errors).

**Pacing rule (new, keep it):** loud sections alternate with quieter ones, and only one effect animates on screen at a time. If two loud sections end up next to each other, flag it to Ani; don't silently reorder.

## Deploy note

The page uses placeholder images and some placeholder copy (in square brackets). **Build on a branch (`homepage-v2`) and share the Netlify deploy preview.** Deploy previews are already `noindex`. Don't merge to `main` while placeholders remain unless Ani says so.

## Global rules for every effect

- **Reduced motion** (`prefers-reduced-motion: reduce`): show the finished state with no animation. Each effect below lists its fallback.
- **No JavaScript:** content is visible and usable. Effects are switched on by script adding a class.
- **Scrolling:** native scroll only, with no smooth-scroll libraries and no scroll-jacking. Pinning uses `position: sticky`. Scroll-linked motion uses CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`), with a small `requestAnimationFrame` fallback where they aren't supported.
- **Animation:** transform and opacity only; never animate top, left, width or height. No WebGL, no canvas, no custom cursor.
- **Flash safety:** fewer than 3 colour changes per second anywhere.
- **Pointer-follow:** only the hero logo (01) and the work lens (03) follow the pointer, and the tag trail (08) follows it within its own section. They must never be active at the same time; stop each one when its section is out of view (IntersectionObserver).
- **Fine pointer only:** hover effects run only under `@media (hover: hover) and (pointer: fine)`. Every hover state must also work on keyboard `:focus-visible`.
- **Images:** use `astro:assets` `<Image>` with explicit `widths`/`sizes`, lazy-load everything below the hero, and serve WebP/AVIF.
- **Phone check:** test on a mid-range phone. If a section stutters, use the lighter mobile version described for that effect.

## Page order

| # | Section | Effect | Pace |
| --- | --- | --- | --- |
| 1 | Hero | 01 Logo glide | Loud |
| 2 | Statement | 02 Slice-wipe (red) | Quiet |
| 3 | Work index | 04 Project stack | Loud |
| 4 | Featured work (2 projects) | 03 Outside/Inside lens + 02 heading wipe (pink) | Medium |
| 5 | How we work | 05 Drift field | Loud |
| 6 | Services | 06 Notched cards + 02 heading wipe (purple) | Medium |
| 7 | How we think | 07 Colour card strip | Medium |
| 8 | What we do | 08 Line-by-line statements + tag trail | Quiet |
| 9 | Social | 09 Social fan | Loud |
| 10 | Call to action | 10 Corner-square card | Medium |
| 11 | Footer (slimmer) | none | Quiet |

The footer keeps its links, Behance, email and the Outside/Inside switch. Its large call to action moves to section 10.

## Effects

### 01 Logo glide (hero → header)
- **Behaviour:** as the hero scrolls away, the hero logo shrinks and travels in a straight line to the header logo slot, and its slices close up on the way. At the end it hands off to the real header logo link with no jump. Scrolling back up reverses it.
- **Trigger:** scroll-linked from hero 0% to 60% scrolled.
  - 0–30%: the hero line fades out.
  - 0–70%: the slices close.
  - 0–100%: the logo scales to 42px tall (24px on mobile), eased in-out.
  - 80–100%: the logo colour shifts to ink and the header's white background fades in.
- **Colour cycle:** the hero colour cycle stops on the first scroll and resumes 2s after the page is back at the top.
- **Reduced motion:** the header logo is shown from first load, with no travel, cycling or pointer-follow.
- **Open question:** the handover says the hero cycles every 1.6s; Ani's wireframe brief said 0.4s. Keep the current 1.6s until Ani confirms.

### 02 Slice-wipe headline reveal
- **Behaviour:** one band per line of text, the height of the line, with its middle 20% slice offset right by about 0.33em (the logo's language). The band grows in from the left, holds, then leaves to the right and uncovers the text. Text stays in the DOM throughout and only its paint is hidden, so there's no layout shift.
- **Trigger:** the heading's top crosses 85% of the viewport. Plays once per page load. A heading already on screen at load shows as finished.
- **Timing:** in 260ms (ease-out), hold 60ms, out 300ms (ease-in-out). Lines are staggered 80ms on desktop and 60ms on mobile.
- **Colours:** statement red, Featured heading pink, Services heading purple. Text is always ink.
- **Reduced motion:** no band.

### 03 Outside/Inside lens (featured work)
- **Behaviour:** a 220px circle with a 24px feathered edge (`mask-image: radial-gradient`) follows the pointer and reveals the "inside" image, aligned exactly under the "outside" image (a window, not a zoom).
- **Desktop timing:** grows in 200ms on enter and shrinks in 160ms on leave. It eases after the pointer with about 80ms lag.
- **Caption:** gains the line "Inside: [what it is]".
- **Click:** a click still opens the project; the lens never blocks it.
- **Touch:** a slice-shaped band (three strips, middle offset) reveals the inside layer as it travels top to bottom across the image. It runs while the image centre moves from 85% to 25% of the viewport, and reverses on scroll-up.
- **Outside/Inside switch:** a small switch under each image swaps the whole layer instantly. It shows on keyboard focus and on touch, and is the only behaviour when motion is reduced.
- **Assets:** `featured/feature-0N-outside.jpg` and `featured/feature-0N-inside.jpg`. If the two featured projects already have real covers in `src/content/work`, use those covers as the outside layer and keep only the inside placeholders.

### 04 Project stack (work index)
- **Behaviour:** website screenshots in a stack tilted back about 55° (CSS `perspective` + `rotateX`). Mono labels sit either side: "Selected work" and the project count.
- **Pinning:** the section pins with `position: sticky` for about half a viewport of scroll per project.
- **Per project:**
  - First 60% of its scroll: tilt 55°→0°, scale 0.7→1, rise to centre.
  - Last 40%: fly up and out while the next card rises.
  - Labels (counter, client, type) swap with a 150ms fade.
  - Only the flat card is a link.
- **Mobile:** 35° tilt and 5 cards.
- **Reduced motion and no-JS:** a flat two-column grid of links.
- **Assets:** `stack/stack-01…10.jpg` (1600×1000, 16:10). Lazy-load all but the first 3.
- **Real-content fallback:** with fewer than 6 real projects, shorten the stack rather than padding it.

### 05 Drift field (inside → outside)
- **Behaviour:** a section about two viewports tall. One centre line of text is sticky. Process photos drift past at three speeds: back 0.3×, middle 0.6×, front 1× scroll speed.
- **Background:** faint contour lines (inline SVG) drift at 0.1×. The background goes from `#1F1A29` to white over the middle 60% of the section, eased steeply through the mid-greys.
- **Text contrast:** the text is white, then ink. It sits on a solid backing strip from 40% to 60% so contrast never drops below 4.5:1.
- **Mobile:** 4 photos at 2 speeds.
- **Reduced motion:** a still collage on white.
- **Assets:** `drift/drift-01…08.jpg` (a mix of 4:3 and 3:4). Ani needs real process photos before this ships.

### 06 Notched service cards
- **Layout:** three columns (Design & Creative pink, Marketing & Growth green, AI & Systems purple), three cards each. Each card is light grey (`#F4F2F7`) with its top-right corner cut using `clip-path`, a small sketch bottom-right and a name.
- **Hover/focus:**
  - Photo fades in (180ms), with a 2px inset border in the discipline colour.
  - A discipline-colour square appears in the cut corner.
  - A short mono note appears.
  - Other cards dim to 55% (200ms). Leaving reverses in 150ms.
- **Touch:** the row crossing the screen centre shows its hover state.
- **Reduced motion:** instant swap, no dimming.
- **Labels:** use the service names from `src/data/services.ts` where they exist. The nine draft labels (Brand identity, Campaign creative, Web design / Social media, Search + AI visibility, Content / AI agents, Automation, Reporting) need Ani's confirmation.
- **Assets:** `services/service-<slug>-sketch.jpg` (rest state) and `services/service-<slug>-photo.jpg` (hover state).

### 07 Colour card strip
- **Content:** a row alternating colour cards (pink → green → purple → red, ink text, one short belief statement each) with images.
- **Desktop:** scroll-linked and not pinned. As the section crosses the viewport, the row translates left by its overflow width.
- **Touch:** a native horizontal scroll box inside the row with `scroll-snap`, plus dots. The page itself must never scroll sideways.
- **Reduced motion:** cards wrap into a grid.
- **Assets:** `strip/strip-01…06.jpg` (3:4). The belief statements are `[placeholders]` for Ani to write; don't invent them.

### 08 Line-by-line statements + tag trail
- **Statements:** 3–4 statements, each with a small coloured label. Lines fade and rise 8px, 400ms each, 120ms apart, when the block reaches 70% of the viewport.
- **Trail:** runs inside this section only, on fine pointers. A tag spawns every 60px of pointer travel, with at most 8 visible. Each fades and shrinks over 700ms. It stops when the pointer stops.
- **Tags:** words are real capabilities (Brand, Social, Search, AI, Web, Content, Systems), each with a fixed palette colour and ink text.
- **Touch:** no trail. 2–3 tags drop in beside each statement once.
- **Reduced motion:** all text visible, tags as a static row.

### 09 Social fan
- **Deal:** 5–7 cards at 9:16, shown as a neat pile. When the pile reaches 70% of the viewport, the cards fan out (about 600ms, 60ms apart, slight overshoot) and stay fanned.
- **Hover/focus:** the card lifts about 40px, rotates to 0° and scales to 1.08 in 200ms. Its neighbours lean away, and client and campaign names show alongside.
- **Touch:** tapping or swiping the top card flicks it to the back.
- **Reduced motion:** already fanned, no lift.
- **Assets:** `social/social-01…07.jpg` (1080×1920). Use only posts Ani has rights to show.

### 10 Corner-square CTA card
- **Placement:** an ink card in its own white section above the footer. Copy: "Got an idea? Let's make it real." plus email and a "Let's talk →" button (Cal.com link). The whole card is one link.
- **Arrival:** four squares (top-left pink, top-right green, bottom-left purple, bottom-right red) fly in from the section corners. Each spins a quarter turn and locks half over a card corner, taking 700ms with 70ms stagger, when the card reaches 75% of the viewport. Plays once.
- **Hover/focus:** squares spring out diagonally about 24px (220ms) and the arrow nudges right.
- **Reduced motion:** settled state, no spring.

## Placeholder images

- **Location:** `src/assets/home/` with the subfolders `stack/`, `featured/`, `drift/`, `services/`, `strip/` and `social/`. There are 53 JPGs, all on-brand, each labelled "PLACEHOLDER" with its size and what should replace it.
- **Manifest:** `src/assets/home/manifest.json` lists every file with its size, where it's used, what should replace it and placeholder alt text. Each entry has `"placeholder": true`.
- **Alt text:** take it from the manifest until real images arrive, then rewrite it per image.
- **Swapping:** replace the file at the same path and ratio, update its alt text and set `"placeholder": false`.
- **Launch check:** extend `npm run check` to list every manifest entry still marked `placeholder: true`, and to fail when `CONTEXT=production`.

## Reference

Ani's wireframe canvas, "Outside In — Homepage Motion Wireframes" on claude.ai, holds frame-by-frame boards for every effect. It's private to Ani, so this spec is the source of truth for the build.
