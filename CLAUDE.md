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
- **Behance:** https://www.behance.net/anigemmill99 (in the footer)
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
- **Homepage:** full-screen hero (logo animation and one line) → one statement → two large work images → Findable feature → three services in a row → footer call to action. Keep it this simple; Ani found earlier versions too busy.
- **Header:** logo on the left (hidden on the homepage until you scroll past the hero), plain text links, and one ink "Let's talk" pill.
- **Footer:** ink background with pink text, call to action, links, email, Behance, and the Outside/Inside switch.
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

- **6 concept projects (published):** After Steam (tourism after-dark experience), Field Notes (AI marketing intelligence brief), Quiet Machine (AI enquiry triage, with an interactive in-browser demo), Loud Weekend (festival campaign), Off Season (winter accommodation campaign), Tidewater (agritech startup brand). Covers are generated SVG art in the palette.
- **8 real Behance projects (hidden drafts, `draft: true`):** Flavours of Plenty 2025, NZ CrossFit Nationals merch, Rotorua Walking Tours, Empty Plate Club branding, Sunseeker beer label, Run for Reido 2025 tee, Wings for Life World Run team logo (renamed from "Red Bull Wings for Life"), NSC wheel design. Each has a placeholder cover and `# CONFIRM` comments. Behance blocks automated downloads, so images must come from Ani.
- **To publish a draft:** add a real cover and gallery images, confirm the client name, sector and summary, write 2–3 sentences, get Ani's permission confirmed, then delete `draft: true`.
- **Recommended next:** publish the 3–4 strongest real projects first (Rotorua Walking Tours, Flavours of Plenty, NZ CrossFit Nationals, Empty Plate Club), then cut the concepts down to Quiet Machine and Field Notes, which carry the AI story. Ride Retreat (Ani's own MTB retreat business in Rotorua) is a strong future case study.

## Findable

Findable is Outside In's own tourism product. The app lives in a separate repo and Vercel project (`anigemmill/Tourism-AI-Growth-Platform`). This site carries Findable's public pages under `/findable/` in Findable's own brand (lavender, forest, lime; Inter Tight and Inter), built from Ani's "Findable — Website Mockups" canvas: landing page, How it works, Pricing, About (with contact form) and Free check. Forms are Netlify Forms named `findable-check` and `findable-contact`; both land on `/findable/thanks/` without JavaScript. Sign in links go to the app; there is no sign-up page because the app has no self-service sign-up.

**Copy rules (from Ani's Findable working brief, 22 Oct 2026).** Facts, sources and offers live in `src/data/findable.ts`.
- Lead statistic: 62% of travellers are using AI to help decide where to go and what to do (Tourism New Zealand research as reported by TRAVELinc, 7 Aug 2026). It is not about bookings and not NZ-domestic only. The Booking.com 81% / 92% figures (IT Brief NZ, July 2025) are only for the trust and accuracy point. Every statistic links to its source.
- The GuideGeek 200,000-user figure is left out until an official Tourism New Zealand source is found.
- Three separate offers: the free one-off check (3 traveller-style questions, one per business, branded mini-report), the monthly subscription (no price until Ani confirms one; month to month, cancel any time; describe only what the app delivers today) and done-for-you work ("Quote on request").
- Findable is not GST-registered, so no GST is added.
- The sample report is illustrative and labelled as such. There is no score, because there is no defined scoring method yet.
- Findable is in pilot with Rotorua operators and not all audits are done. Don't publish pilot numbers, error rates, "2–3 businesses per answer", testimonials or case studies without documented results.
- Founder: Ani Gemmill. No photo for now. The founding story is tourism and digital marketing experience plus AI research; don't claim observed visitor behaviour.
- Contact: anigemmill@theoutsidein.nz, reply within two working days (confirmed).
- Still to confirm before launch: the "within one working day" delivery target, which AI assistants the check uses, what the subscription includes, and the GST wording.

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
