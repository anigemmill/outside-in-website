# Outside In website: project brief and handover

Read this first. It records what has been built, the decisions behind it, and the rules for working on the site. The README covers setup, deployment and content editing in more detail.

## The business

Outside In is Ani Gemmill's creative, marketing and AI studio, based in Aotearoa New Zealand. It is positioned as one integrated partner across three disciplines, not a design studio with AI bolted on:

1. **Design & Creative**: brand, web, campaign and event creative.
2. **Marketing & Growth**: strategy, campaigns, content, search, performance.
3. **AI & Systems**: practical AI audits, agents, workflow automation, marketing intelligence.

The core idea comes from the name and the logo: see a business from the outside, then build what it needs on the inside.

- **Domain:** https://theoutsidein.nz (built in as the default)
- **Contact email:** anigemmill@theoutsidein.nz
- **Booking:** https://cal.com/ani-gemmill-yg4gmo (all "Book a discovery call" buttons)
- **Behance:** https://www.behance.net/anigemmill99 (content source for projects only; not linked anywhere on the site, and removed from `site.ts`)
- **Repo:** https://github.com/anigemmill/outside-in-website (branch `main`, public)
- **Hosting:** Netlify, connected to the GitHub repo. Not yet connected or live as of 14 Oct 2026.

## Stack

- Astro 5, static output. No backend, no CMS, no client framework.
- Fonts self-hosted via Fontsource: League Spartan 800 (headings and wordmarks, in capitals) and Instrument Sans (all copy and labels). Findable's pages keep Inter Tight, Inter and JetBrains Mono.
- Netlify Forms for the contact form (honeypot spam trap). Config in `netlify.toml`.
- Node 20.3+. Commands: `npm run dev`, `npm run build`, `npm run preview`, `npm run check` (launch checklist), `npm run og` (regenerates logo files, favicons and social image).

## Where things live

| What | File |
| --- | --- |
| Business details, links, SEO defaults | `src/config/site.ts` |
| Homepage copy | `src/data/home.ts` |
| Services, combinations, partnership | `src/data/services.ts` |
| About copy, team (empty) | `src/data/about.ts` |
| Approach stages | top of `src/pages/approach.astro` |
| Portfolio (shown at `/projects/`; `/work/*` redirects there) | `src/content/work/<slug>/index.md` + images in the same folder |
| Findable pages (own brand, from the mockups) | `src/pages/findable/`, `src/layouts/FindableLayout.astro`, `src/styles/findable.css`, `src/scripts/findable-form.ts` |
| Findable feature card on the Outside In pages | `src/components/FindableFeature.astro` |
| Findable app address (Sign in links) | `findableAppUrl` in `src/config/site.ts` |
| Work tile (Work page and homepage) | `src/components/WorkTile.astro` |
| Work page tiles, hero copy, marquee | `src/data/workPage.ts` (images in `src/assets/work-page/`; behaviour in `src/scripts/work.ts`) |
| Looping films (pause button, WebM fallback) | `src/components/LoopVideo.astro`; files in `public/media/` |
| Portfolio field rules | `src/content.config.ts` |
| Published-work loader (excludes drafts) | `src/data/work.ts` |
| Design tokens and shared styles | `src/styles/global.css` |
| Site behaviour (menu, logo, hero cycle, reveals) | `src/scripts/site.ts` |
| Logo (live SVG + animation) | `src/components/Logo.astro` |


## Design decisions (settled; don't change without Ani asking)

These were reached over several rounds with Ani. Treat them as decided. **Homepage v3 (24 Oct 2026, `HOMEPAGE-V3-SPEC.md`) supersedes the earlier direction where they differ:** an editorial site, white and ink everywhere (about 70% white, 18% ink), big type and images, one strong motion per section. Colour roles: red is the studio (hero, logo, closing card); pink, green and purple only ever mean Design, Marketing and AI; at most one colour field per screen (the hero cycle excepted); text on colour is always ink. Content sits in a centred column of about 1080px (`.col`), with about 240px between sections on desktop and 120px on phones; the work grid and drift field break out to full width.

**Overall feel.** Calm, white and spacious, with one show-stopping moment at the door. The references Ani wants pages to keep following:
- **Together** (wearetogether.co.nz): white space, calm stacked sections, big images with little text.
- **Outside In Sydney** (outsidein.agency): headline-led pages, portrait work cards, numbered service lists. Use its structure only, never its copy. Note: it is a different agency with the same name (possible trademark or search confusion, flagged to Ani).
- **Truus** (truus.co): playful moments used sparingly. The live site could not be fetched; only its showcase tags were seen.

**Logo.** The supplied mark: an O (ring) and an I (bar), each cut by one horizontal slice shifted right. On the O, the slice pushes in on the left and out on the right. `Logo.astro` rebuilds it from measured geometry (viewBox `110 128 887 522`; O centre 369.5,387, R 259.5, r 193.5; O band y 376–433, shift 73; I bar x 842 w 76, band y 377–437, shift 77). Its resting state must always be the exact logo. Animation only moves the real parts and never distorts them.

**Logo animation (homepage hero).**
1. Intro: the top halves drop in, the bottom halves rise, then both slices fly in from the left and lock into place.
2. The slices follow the pointer (or finger) across the hero.
3. Idle: every 0.4 s the slices snap whole and the hero cuts to the next colour pair, with a 0.06 s colour transition. Ani asked for this to be super quick. Keep it under 3 changes per second (flash safety). It pauses while off screen, during pointer movement and for reduced-motion users.

**Palette: final, chosen by Ani.** Four colours that swap roles in the hero (background / logo):

| Pair | Background | Logo |
| --- | --- | --- |
| 0 | Red `#EB4213` | Light green `#D8F382` |
| 1 | Pink `#FF99DC` | Red `#EB4213` |
| 2 | Purple `#826DEE` | Pink `#FF99DC` |
| 3 | Light green `#D8F382` | Purple `#826DEE` |

Everything else: white `#FFFFFF` background, ink `#17131F` text, ink-soft `#4B4556` secondary text, purple-ink `#4F3ACB` links, lilac `#E6E0FC` hover fills, ink-deep `#1F1A29` Inside view.
- **Discipline colours:** Design = pink, Marketing = green, AI = purple.
- **Contrast rule:** ink reads on all four colours (4.6:1 or better). The colour pairs themselves are only 2–3:1, so use them for the logo and large colour fields only, never for text.

**Layout.**
- **Homepage (v3, "Editorial", simplified 27 Oct 2026):** hero (01 logo glide; the logo alone) → introduction (11 scroll-filled statement: Ani's studio line, smaller type, 24px minimum so the grey words keep contrast) → selected work (three tiles from the Work page, same `WorkTile` component in its compact form, in a 1200px column with wide margins; pink heading wipe) → how we work (05 drift, now real project images) → services (numbered rows, purple wipe) → approach (sticky stage image) → social (13 curved gallery) → call to action (10 corner squares) → footer (scroll-linked wordmark). Copy and tile choices: `src/data/home.ts`. Images: `src/assets/home/` + `manifest.json`; the drift images are real project images; the service, approach and social images are still labelled placeholders. Placeholders show on previews only: on the live site the service hover images are left out, the approach shows its stages without images, and the social section shrinks to its heading and the Instagram link, each until real images replace them (`isLive` in `src/data/homeAssets.ts`). The spec has no Findable section on the homepage; Findable stays in the nav and on /projects.
- **Header:** logo on the left (hidden on the homepage until you scroll past the hero), plain text links (Work, Findable, Services, Approach, About), the Outside/Inside switch, and one ink "Let's talk" pill.
- **Footer:** ink background with pink text: links, "Rotorua, Aotearoa · live NZ time" and the email, then a huge scroll-linked "OUTSIDE IN" wordmark. No Behance and no Outside/Inside switch (it's in the header). Instagram and LinkedIn appear only once their URLs are set in `site.ts`.
- **Inner pages:** quiet page headers; two-column rows (label left, content right); one colour moment per page.
- **Work page (Ani's design, 26 Oct 2026):** big headline with a red "impossible" pill, discipline filter chips, a services marquee, eight hand-picked tiles on a 12-column grid (rounded 28px media, numbered captions with discipline dots), a purple "Yours could sit right here" card as the next tile, then every other published project under "More work", then Findable. One "Pause motion" button stops the marquee, the spinning NSC wheel, films and the Wings for Life flight; nothing moves with reduced motion.
- **Case studies (Ani's Ride Retreat template):** badge + "Case study", huge title, big intro, four facts (Client, What we did, Built with or Services, Where or Sector), big cover (or the phones-and-film band), "The idea" in display type, then optional purple stat tiles (feature facts, not results), a green brand band, the three-screen feature row, "What we made", the result and the live link, and a next-case-study card in the next project's discipline colour. All extras are optional fields in `content.config.ts`, so every project uses the same template.

**Inside view.** A switch in the header flips the site to a dark blueprint version in which `<Note>` blocks explain why each section exists. It's kept as proof of thinking.

## Content and honesty rules (strict)

- **Never invent** clients, testimonials, results, statistics, founding stories, bios, qualifications, pricing or guarantees.
- **Concepts are labelled.** Concept projects say "Concept" everywhere, list objectives and never results; the schema enforces this.
- **Client work needs permission.** Only publish client work Ani has confirmed she has permission to show.
- **Voice:** sharp, human, commercially intelligent, NZ English. Avoid agency clichés ("next level", "cutting-edge", "unlock potential"), the words "delve" and "tapestry", the "it's not just X, it's Y" formula, and reflexive em dashes.
- **Pricing:** not published. The site explains that a discovery call leads to a written proposal.

## Portfolio status

- **16 selected projects (published, `status: client`)** from Ani's portfolio brief of 22 Oct 2026, in her order: Ride Retreat, Ride Retreat | The Journey, Explore Bay of Plenty, Digital Visitor Information Kiosks (Tourism Bay of Plenty), Flavours of Plenty 2025, Te Puia Digital Marketing & Growth, Te Puia China-Facing Website, Rotorua Walking Tours, Empty Plate Club, CrossFit Nationals, Run for Reido 2025, Wings for Life World Run, Negative Split Carbon, Our Tauranga Region, Grassroots Trust Velodrome, Athlete Experience (Nduro Events). The copy is Ani's own; don't add to it.
- These include in-house roles, collaborations and her own venture, so pages say "Selected work", not "Client work".
- **Images (22 Oct 2026):** real covers and galleries for The Journey, Explore Bay of Plenty, Kiosks, Flavours of Plenty (includes the Sunseeker can, a festival collaboration), Rotorua Walking Tours, Empty Plate Club, Run for Reido, Wings for Life and Negative Split Carbon. Covers are 1600×1000 JPGs (cropped, or padded with the image's own background). Ride Retreat's cover and screens came with the Work page design (26 Oct). Still placeholders ("Image to come"): both Te Puia projects, CrossFit Nationals, Our Tauranga Region, Grassroots Trust Velodrome, Nduro.
- **Te Puia results** are held behind `resultsConfirmed: false`. They show on previews only, flagged, until Ani confirms the measurement periods and attribution.
- **Concepts:** Quiet Machine and Field Notes stay published (they carry the AI story). After Steam, Loud Weekend, Off Season and Tidewater are `draft: true`. Sunseeker beer label stays a draft; it wasn't in the brief.
- **Ride Retreat (27 Oct 2026)** is two case studies from Ani's designs. `/projects/ride-retreat/` is Brand & Website (headline "A brand built for riders, by riders.", built from `blocks`: brief, idea band, identity, website, outcome; related card to The Journey). `/projects/ride-retreat-the-journey/` is the guest app (four labelled photos, the film band, stats, brand band, three screens). Placeholders (outcome numbers, pull quote, The Journey's result) show on previews only, flagged. The Brand & Website type card uses Poppins and Epilogue, self-hosted via Fontsource and loaded only on that page.
- **Work page tiles:** Flavours, Ride Retreat, Butter Dog Supply Co. (Ani's venture), Wings for Life, Empty Plate Club (three reels fanned like phones; links to its Instagram), Run for Reido, Rotorua Walking Tours, Negative Split Carbon. Butter Dog is `previewOnly` until Ani confirms rights to the rider photo (a Red Bull athlete); production builds also delete its image files. The Wings for Life tile is labelled Concept per Ani's note, but its case study still describes a team logo for a real team: to confirm with Ani.
- **Marketing & campaigns (Work page, 27 Oct 2026):** Ani's stats and eight campaign rows, in `marketing` in `src/data/workPage.ts`. The first three stats and row 01's result are the Te Puia figures, so they follow te-puia-digital-marketing's `resultsConfirmed` (previews only until true). The Ebbett row has a placeholder result and Ebbett hasn't confirmed it can be named, so it's `previewOnly`. The attraction in rows 01–02 is deliberately unnamed.
- Homepage selected work: Flavours (the Sunseeker can, also its Work page tile, from Ani's 27 Oct note), Ride Retreat, Run for Reido; set by key in `home.work.tiles`. The old full-width lens grid is gone.

## Findable

Findable is Outside In's own tourism product. The app lives in a separate repo and Vercel project (`anigemmill/Tourism-AI-Growth-Platform`). This site carries Findable's public pages under `/findable/` in Findable's own brand (lavender, forest, lime; Inter Tight and Inter), built from Ani's "Findable — Website Mockups" canvas: landing page, How it works, Pricing, About (with contact form) and Free check. Forms are Netlify Forms named `findable-check` and `findable-contact`; both land on `/findable/thanks/` without JavaScript. Sign in links go to the app; there is no sign-up page because the app has no self-service sign-up.

**Copy rules (from Ani's Findable working brief, 22 Oct 2026).** Facts, sources and offers live in `src/data/findable.ts`.
- Lead statistic: 62% of travellers are using AI to help decide where to go and what to do (Tourism New Zealand research as reported by TRAVELinc, 7 Aug 2026). It is not about bookings and not NZ-domestic only. The Booking.com 81% / 92% figures (IT Brief NZ, July 2025) are only for the trust and accuracy point. Every statistic links to its source.
- GuideGeek (200,000+ unique users, July 2026 research summary) is supporting context only, attributed to its source; not evidence of bookings. Swap in an official Tourism New Zealand source if one appears.
- Three separate offers: the free one-off check (3 traveller-style questions, one per business, branded report within one working day, confirmed by Ani), the monthly subscription ("Pricing on request" until Ani sets a price; month to month, cancel any time; describe only what the app delivers today) and done-for-you work ("Quote on request").
- Findable is not GST-registered, so no GST is added.
- The sample report is illustrative and labelled as such. There is no score, because there is no defined scoring method yet.
- Findable is in an ongoing pilot with 10 Rotorua operators; audits are still under way. Don't publish pilot numbers, error rates, "2–3 businesses per answer", testimonials or case studies without documented results.
- Founder: Ani Gemmill. No photo for now. The founding story is tourism and digital marketing experience plus AI research; don't claim observed visitor behaviour.
- Contact: anigemmill@theoutsidein.nz, reply within two working days (confirmed).
- Still open: which AI assistants the check names, and exactly what the subscription includes (currently described with the app's real features).

Sign in links point at the Vercel address until `app.theoutsidein.nz` is live, then switch `findableAppUrl`.

## SEO and launch

- Canonical URLs, Open Graph, sitemap, robots.txt and Organization schema all use theoutsidein.nz.
- Netlify deploy previews and branch deploys set `noindex` automatically (via the `CONTEXT` variable); only production is indexed.
- `netlify.toml` redirects www to the bare domain and sets security headers.

**Still to do (Ani):**
1. Connect the repo in Netlify.
2. Add theoutsidein.nz as the primary domain and point DNS to Netlify.
3. Turn on Forms email notifications to anigemmill@theoutsidein.nz.
4. Test the form and the Cal.com link live.
5. Optional: add the LinkedIn link in `site.ts` (Instagram is linked: @theoutsidein.nz), review the privacy notice, and add Ani's bio to `about.ts` (the People section appears automatically once filled).

## Quality bar

Before pushing, check that:
- `npm run build` passes.
- There's no horizontal scroll from 320 px to 1440 px.
- axe reports no WCAG 2.1 AA violations in both the Outside and Inside views.
- The mobile menu, filters, form validation, success and error states, and reduced-motion behaviour work.
- There are no console errors.

The previous session ran a 186-check Playwright and axe suite that covered all of this; it passed with zero failures at handover.

Commit messages are short and descriptive. Push to `main`; Netlify deploys automatically once connected.
