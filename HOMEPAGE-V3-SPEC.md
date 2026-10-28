# Outside In homepage v3 ("Editorial"): build spec

Read this alongside `claude/outside-in-website-handover.md`. **This spec replaces the v2 ("Showcase") spec completely.** If v2 has been started, stop and build this version instead, on the same branch (`homepage-v2` is fine, or rename it `homepage-v3`).

Everything in the handover still applies unless this spec says otherwise: the logo rules, the Inside view, the content and honesty rules, NZ English, and the quality bar (build passes, no horizontal scroll from 320 to 1440px, axe AA clean in both views, no console errors).

## What changed since the handover

- **Direction:** an editorial homepage. White and ink everywhere, big type and big images, one strong motion per section. The four palette colours appear in only three places: the hero, the logo and the closing card. The references were Linear Studio (white space and section rhythm), Noah Miles and Carme (work grid), Ekon (numbered service rows), Studio Gallery (curved gallery) and Kilimanjaro Sans (heading style).
- **Type (site-wide):**
  - **Headings and wordmarks:** League Spartan 800, uppercase, tracking −2%, line height about 0.9. Self-host it via `@fontsource/league-spartan`. It's a free stand-in for Kilimanjaro Sans, and Ani has approved it.
  - **All copy and all labels:** Instrument Sans. Labels use weight 600, small caps size, uppercase, tracking +6%.
  - **Remove** Bricolage Grotesque and JetBrains Mono from the site. Update the type tokens in `global.css` so inner pages match. `Logo.astro` draws the mark as SVG, so it's unaffected.
- **Colour roles (site-wide):**
  - Red `#EB4213` is the studio: hero, logo, closing card.
  - Pink, green and purple only ever mean their discipline: Design, Marketing and AI.
  - White makes up about 70% of a page and ink about 18%.
  - At most one colour field per screen; the hero cycle is the exception.
  - Text on colour is always ink, never the other way round.
  - Optional light grain (CSS or SVG noise at low opacity) on big colour fields only, never on text or photos.
- **Outside/Inside switch:** moves to the header (desktop and mobile) and is removed from the footer.
- **Behance:** remove it from the footer and from `site.ts`. Show the Instagram and LinkedIn links only if their URLs are set in `site.ts`; don't invent them.
- **Spacing (from Linear Studio):** content sits in a centred column about 1080px wide. Leave about 240px between sections on desktop and 120px on mobile. Each section opens with a small label, then the headline, then at most one short line. The work grid and the drift field break out of the column to full width, on purpose.

## Deploy note

Build on the branch and share the Netlify deploy preview, which is already `noindex`. Placeholder images and `[bracketed]` copy remain, so don't merge to `main` until Ani says so.

## Global rules for every effect

- **Reduced motion** (`prefers-reduced-motion: reduce`): show the finished state with no animation. Each effect lists its fallback.
- **No JavaScript:** everything is visible and usable. Effects switch on when a script adds a class.
- **Scrolling:** native scroll only, with no smooth-scroll libraries and no scroll-jacking. Pinning uses `position: sticky`. Scroll-linked motion uses CSS scroll-driven animations with a small `requestAnimationFrame` fallback.
- **Animation:** transform and opacity only. No WebGL, no canvas, no custom cursor.
- **Flash safety:** fewer than 3 colour changes per second.
- **Pointer-follow:** only the hero logo and the work lens follow the pointer, and they're never active at the same time. Stop each one when it's off screen.
- **Hover:** hover effects run only under `(hover: hover) and (pointer: fine)`, and every hover state also works on `:focus-visible`.
- **Auto-moving content:** anything that moves on its own for more than 5 seconds gets a visible pause button (WCAG 2.2.2).
- **Images:** use `astro:assets` `<Image>` with `widths`/`sizes`, lazy-load everything below the hero, and serve AVIF/WebP.

## Page order and pacing

| # | Section | Effect | Pace |
| --- | --- | --- | --- |
| 1 | Hero | 01 Logo glide | Loud |
| 2 | Introduction | 11 Scroll-filled statement | Quiet |
| 3 | Selected work | 12 Work grid + 03 Lens + 02 heading wipe (pink) | Medium |
| 4 | How we work | 05 Drift field | Loud |
| 5 | Services | Numbered rows + 02 heading wipe (purple) | Quiet |
| 6 | Approach | Sticky stage image | Quiet |
| 7 | Social | 13 Curved gallery | Loud |
| 8 | Call to action | 10 Corner-square card | Medium |
| 9 | Footer | Scroll-linked wordmark | Medium |

Pacing rule: loud and quiet alternate, and only one effect animates on screen at a time.

## Sections and effects

### 1 · Hero (01 Logo glide)
- **Layout:** full-screen colour field from the hero cycle, with light grain. Header: logo slot, links (Work, Services, Approach, About), the Outside/Inside switch, and the ink "Let's talk" pill. Below it, the existing logo animation and the hero line. There's no wordmark and no clock in the hero.
- **01 glide:** as the hero scrolls away, the logo shrinks and travels to the header slot, and its slices close up. The motion is scroll-linked over the first 60% of the hero:
  - 0–30%: the line fades.
  - 0–70%: the slices close.
  - 0–100%: the logo scales to 42px tall (24px on mobile).
  - 80–100%: the logo turns ink and the header's white background fades in.
  - At the end it hands off to the real header link. Scrolling back up reverses it.
- **Colour cycle:** stops on the first scroll and resumes 2 seconds after the page is back at the top.
- **Reduced motion:** the header logo is shown from the start, with no travel, cycle or pointer-follow.
- **Open question for Ani:** the hero cycle runs every 1.6s on the live site, but her first brief said 0.4s. Keep 1.6s until she confirms.

### 2 · Introduction (11 Scroll-filled statement)
- **Layout:** a small label on the left ("Introduction"), the statement on the right in Instrument Sans 500 at large size. The copy is `[placeholder]` for Ani to write.
- **Fill:** words go from `#8C8696` (about 3.4:1 contrast) to ink, word by word, as the block scrolls from its top at 80% of the screen to its bottom at 40%. The two words at the leading edge use `#4B4556`. Not pinned, and reversible.
- **Inside view:** the fill runs from grey to white on `#1F1A29`.
- **Build:** wrap each word in a span at build time. Screen readers get the plain sentence.
- **Reduced motion:** all ink.

### 3 · Selected work (12 Work grid + 03 Lens)
- **Layout:** full width with 8px gaps (4px on mobile) and square corners. Rows run two, one, two, one, for six projects. Each tile shows "N° 01" top left, the name bottom left in League Spartan, and its disciplines bottom right, over a dark gradient so white text passes contrast. "All work →" link above the grid. The heading "Selected work" gets the pink slice-wipe (02).
- **Rise:** when a row's top reaches 90% of the screen, its images rise from 12% below their frames over 600ms (ease-out), the second tile 100ms after the first. Once only.
- **Drift:** each image is 10% taller than its frame and moves from −5% to +5% as the row crosses the screen.
- **03 Lens (hover):**
  - A 220px circle with a 24px feathered edge (`mask-image: radial-gradient`) follows the pointer with about 80ms lag. It reveals the tile's inside image, aligned exactly under it.
  - It grows in 200ms and shrinks in 160ms.
  - The tile's caption adds "Inside: [what it is]".
  - The click still opens the case study.
- **Touch:** a slice-shaped band (three strips, middle one offset right) reveals the inside image as the tile crosses the screen.
- **Outside/Inside toggle:** a small toggle under each tile swaps the whole layer instantly. It shows on focus and on touch, and is the only behaviour with reduced motion.
- **Content:** use the strongest real projects first. Concepts stay labelled "Concept". Six tiles on the homepage.
- **Reduced motion:** a static grid.

### 4 · How we work (05 Drift field)
- **Layout:** full width, about two screens tall. One centre line of copy is sticky (`[placeholder]`). Process photos drift past at three speeds: 0.3×, 0.6× and 1× scroll speed. Contour lines (inline SVG) move at 0.1×.
- **Background:** fades from `#1F1A29` to white over the middle 60% of the section, eased steeply through the mid-greys.
- **Text contrast:** the text is white, then ink, on a solid backing strip from 40% to 60% of the section so contrast never drops below 4.5:1.
- **Mobile:** 4 photos at 2 speeds.
- **Reduced motion:** a still collage on white.

### 5 · Services (numbered rows)
- **Layout:** the heading "Services" with the purple slice-wipe (02). Three rows, divided by hairlines:
  - **Number and title:** in League Spartan, large (about 76px desktop, 38px mobile): "01 Design & Creative", "02 Marketing & Growth", "03 AI & Systems".
  - **Capability tags:** in Instrument Sans labels. Take them from `src/data/services.ts`: Design gets brand, web, campaign creative, event creative; Marketing gets strategy, campaigns, content, search, performance; AI gets AI audits, agents, workflow automation, marketing intelligence.
  - **Short description.**
- **Hover/focus:** the row tints `#F7F6F9` and the discipline image slides in at the right (200ms), with a small square in the discipline colour on its corner. Each row links to its service.
- **Mobile:** stacked rows, no image.
- **Reduced motion:** instant.

### 6 · Approach (sticky stage image)
- **Layout:** the image on the left is sticky. The four stages from `src/pages/approach.astro` sit on the right as numbered rows. The current stage is at full strength and the others at 45%. As each stage reaches the middle of the screen, the image crossfades (300ms). A "Book a discovery call" button links to Cal.com.
- **Mobile:** the image sits on top, with the stages listed below it.
- **Reduced motion:** no crossfade; each stage shows its own image inline.

### 7 · Social (13 Curved gallery)
- **Layout:** 9–12 posts at 4:5, curved as if around the viewer. Each post is rotated about 16° per step from centre and scaled up toward the edges (CSS `perspective` + `rotateY`). Seven visible on desktop, five on mobile. Instagram and LinkedIn links sit underneath, if their URLs are set.
- **Motion:**
  - It turns slowly on its own, about one post every 4s, but only while in view.
  - Drag or horizontal wheel turns it directly, with a short glide. Vertical page scroll is never captured.
  - Hover pauses it and lifts the post, with client and campaign shown below.
  - Pause button bottom right.
- **Keyboard and reduced motion:** previous/next buttons and arrow keys. No auto-turn with reduced motion.

### 8 · Call to action (10 Corner-square card)
- **Card:** an ink card on white. "GOT AN IDEA? LET'S MAKE IT REAL." in League Spartan, the email `anigemmill@theoutsidein.nz`, and a "Book a discovery call →" button linking to Cal.com. The whole card is one link.
- **Arrival:** when the card reaches 75% of the screen, four squares fly in from the section corners and lock half over the card's corners, with a quarter-turn spin. Top left pink, top right green, bottom left purple, bottom right red. 700ms, 70ms stagger, once.
- **Hover/focus:** the squares spring out about 24px (220ms).
- **Reduced motion:** settled.

### 9 · Footer
- **Layout:** ink background, pink text. Links: Work, Services, Approach, About, plus Instagram and LinkedIn if set. On the right, "ROTORUA, AOTEAROA · [live NZ time]" and the email. No Behance, and no Outside/Inside switch (it's in the header now).
- **Wordmark:** a huge "OUTSIDE IN · OUTSIDE IN" in League Spartan, pink, that slides sideways as you scroll into the footer. It's scroll-linked so it never moves on its own and needs no pause button.
- **Clock:** a `<time>` element, updated once a minute, in `Pacific/Auckland`.
- **Reduced motion:** the wordmark is static.

## Placeholder images

- **Location:** `src/assets/home/`, 37 JPGs in total:
  - `work/`: 6 outside images plus 6 matching `-inside` images. Half-width tiles are 1600×1130 and full-width tiles 2400×760.
  - `drift/`: 8 images.
  - `services/`: 3 images, one per discipline.
  - `approach/`: 4 images.
  - `social/`: 10 images at 1080×1350.
- **Labels:** each image is labelled "PLACEHOLDER" with its size and what should replace it.
- **Manifest:** `src/assets/home/manifest.json` lists every file with `"placeholder": true`. Use its alt text until the real images arrive.
- **Remove v2 placeholders:** if the v2 package was unzipped, delete `src/assets/home/stack/`, `featured/` and `strip/`, plus the old `services/service-*-sketch.jpg` and `-photo.jpg` and the old 9:16 social files.
- **Launch check:** extend `npm run check` to list every manifest entry still marked placeholder, and to fail when `CONTEXT=production`.

## Reference

Ani's canvas "Outside In — Homepage Motion Wireframes" on claude.ai has these boards:
- **"Homepage v3 — Editorial":** the page this spec describes.
- **Effect boards 01, 02, 03, 05, 10, 11, 12 and 13.**
- **"Type + colour directions".**

The canvas is private to Ani, so this spec is the source of truth.
