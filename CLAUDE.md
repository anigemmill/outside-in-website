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
- **Behance:** https://www.behance.net/anigemmill99 (content source for projects only; not linked in the footer, at Ani's request)
- **Repo:** https://github.com/anigemmill/outside-in-website (branch `main`, public)
- **Hosting:** Netlify, connected to the GitHub repo. Not yet connected or live as of 14 Oct 2026.

## Stack

- Astro 5, static output. No backend, no CMS, no client framework.
- Fonts self-hosted via Fontsource: Bricolage Grotesque (display), Instrument Sans (body), JetBrains Mono (small labels).
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
| Portfolio field rules | `src/content.config.ts` |
| Published-work loader (excludes drafts) | `src/data/work.ts` |
| Design tokens and shared styles | `src/styles/global.css` |
| Site behaviour (menu, logo, hero cycle, reveals) | `src/scripts/site.ts` |
| Logo (live SVG + animation) | `src/components/Logo.astro` |

**Font trial (temporary, 22 Oct 2026):** `/fonts/` compares type options, and `?font=host|geist|inter|archivo|current` switches the whole preview site (previews only). When Ani chooses, set `--font-display`/`--font-body` in `global.css`, update the preloads in `Base.astro`, then delete `src/pages/fonts.astro`, `src/styles/font-trial.css`, the trial script in `Base.astro` and the unused font packages.

## Design decisions (settled; don't change without Ani asking)

These were reached over several rounds with Ani. Treat them as decided.

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
- **Homepage (the "Showcase" effects version, which Ani asked to keep on 22 Oct 2026):** the hero logo glides into the header → statement with a colour wipe → project stack (pinned scroll, real project covers; Explore Bay of Plenty and the kiosks are excluded via `home.stack.exclude`) → Featured work as a fan of project cards (hover or tap lifts and grows a card; set in `home.featured.cards`, each project needs a 4:5 `card.jpg`) → Findable feature (in Findable's own brand) → drift field → notched service cards → line-by-line statements → call-to-action card → slim footer. The section list and spec are at the top of `src/pages/index.astro` and in `docs/homepage-v2-spec.md`. The "How we think" strip and the social fan are hidden (`show: false` in `src/data/home.ts`) until Ani writes the beliefs and supplies posts. Some homepage images (drift, service cards) are still labelled placeholders listed in `src/assets/home/manifest.json`.
- **Header:** logo on the left (hidden on the homepage until you scroll past the hero), plain text links, and one ink "Let's talk" pill.
- **Footer:** ink background with pink text, call to action, links, email and the Outside/Inside switch. No Behance link (Ani doesn't want visitors sent off the site).
- **Inner pages:** quiet page headers; two-column rows (label left, content right); one colour moment per page.
- **Case studies:** one big cover, short rows, and an Outside/Inside map (pink and green) for concepts.

**Inside view.** A switch in the footer flips the site to a dark blueprint version in which `<Note>` blocks explain why each section exists. It's kept as proof of thinking.

## Content and honesty rules (strict)

- **Never invent** clients, testimonials, results, statistics, founding stories, bios, qualifications, pricing or guarantees.
- **Concepts are labelled.** Concept projects say "Concept" everywhere, list objectives and never results; the schema enforces this.
- **Client work needs permission.** Only publish client work Ani has confirmed she has permission to show.
- **Voice:** sharp, human, commercially intelligent, NZ English. Avoid agency clichés ("next level", "cutting-edge", "unlock potential"), the words "delve" and "tapestry", the "it's not just X, it's Y" formula, and reflexive em dashes.
- **Pricing:** not published. The site explains that a discovery call leads to a written proposal.

## Portfolio status

- **16 selected projects (published, `status: client`)** from Ani's portfolio brief of 22 Oct 2026, in her order: Ride Retreat, Ride Retreat | The Journey, Explore Bay of Plenty, Digital Visitor Information Kiosks (Tourism Bay of Plenty), Flavours of Plenty 2025, Te Puia Digital Marketing & Growth, Te Puia China-Facing Website, Rotorua Walking Tours, Empty Plate Club, CrossFit Nationals, Run for Reido 2025, Wings for Life World Run, Negative Split Carbon, Our Tauranga Region, Grassroots Trust Velodrome, Athlete Experience (Nduro Events). The copy is Ani's own; don't add to it.
- These include in-house roles, collaborations and her own venture, so pages say "Selected work", not "Client work".
- **Images (22 Oct 2026):** real covers and galleries for The Journey, Explore Bay of Plenty, Kiosks, Flavours of Plenty (includes the Sunseeker can, a festival collaboration), Rotorua Walking Tours, Empty Plate Club, Run for Reido, Wings for Life and Negative Split Carbon. Covers are 1600×1000 JPGs (cropped, or padded with the image's own background). Still placeholders ("Image to come"): Ride Retreat, both Te Puia projects, CrossFit Nationals, Our Tauranga Region, Grassroots Trust Velodrome, Nduro.
- **Te Puia results** are held behind `resultsConfirmed: false`. They show on previews only, flagged, until Ani confirms the measurement periods and attribution.
- **Concepts:** Quiet Machine and Field Notes stay published (they carry the AI story). After Steam, Loud Weekend, Off Season and Tidewater are `draft: true`. Sunseeker beer label stays a draft; it wasn't in the brief.
- Homepage featured work: Flavours of Plenty and Rotorua Walking Tours. The homepage project stack shows only projects with real covers.

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
5. Optional: add Instagram and LinkedIn links in `site.ts`, review the privacy notice, and add Ani's bio to `about.ts` (the People section appears automatically once filled).

## Quality bar

Before pushing, check that:
- `npm run build` passes.
- There's no horizontal scroll from 320 px to 1440 px.
- axe reports no WCAG 2.1 AA violations in both the Outside and Inside views.
- The mobile menu, filters, form validation, success and error states, and reduced-motion behaviour work.
- There are no console errors.

The previous session ran a 186-check Playwright and axe suite that covered all of this; it passed with zero failures at handover.

Commit messages are short and descriptive. Push to `main`; Netlify deploys automatically once connected.
