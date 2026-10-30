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
- **Instagram:** https://www.instagram.com/theoutsidein.nz/

## Stack

- Astro 5, static output. No backend, no CMS, no client framework.
- Fonts self-hosted via Fontsource: **Inter Tight** (variable, 400 to 700) for everything, plus **Instrument Serif** italic for emphasis words. Findable's pages keep their own Inter Tight, Inter and JetBrains Mono.
- Images go through `astro:assets` (AVIF/WebP with srcset). Videos are plain MP4s in `public/media/`.
- Netlify Forms for the contact form (honeypot spam trap). Config in `netlify.toml`.
- Node 20.3+. Commands: `npm run dev`, `npm run build`, `npm run preview`, `npm run check` (launch checklist, including case-study gaps), `npm run og` (regenerates logo files, favicons and the social image in the new palette; the favicon is the whole OI mark, cream on orange, since 30 Oct 2026).

## Where things live

| What | File |
| --- | --- |
| Business details, links, nav, SEO defaults | `src/config/site.ts` |
| Design tokens and shared styles | `src/styles/global.css` (imports `base.css`) |
| Palette-free reset shared with Findable | `src/styles/base.css` |
| Logo (live SVG + all its motion variants) | `src/components/Logo.astro` |
| Header (hero, dark and light looks) / footer (with or without the CTA band) | `src/components/Header.astro`, `src/components/Footer.astro` |
| Page copy | In each page under `src/pages/` (copied from the approved mockups) |
| Work page cards (order, filters, covers, desktop column, image height) | `src/data/work-grid.json` |
| Case studies (copy, images, alt text, gallery, next project) | `src/data/case-studies.json` |
| Types and helpers for both | `src/data/work.ts` |
| Image and video path resolver | `src/lib/media.ts` |
| Portfolio images | `src/assets/work/<project>/`; studio photos in `src/assets/studio/` |
| Videos | `public/media/<project>/` |
| Work page (masonry, filters) | `src/pages/work/index.astro` |
| Case-study template | `src/pages/work/[slug].astro` |
| Contact form | `src/components/ContactForm.astro` |
| Old case studies, kept unpublished | `archive/work/` (see its README) |
| Findable pages (own brand) | `src/pages/findable/`, `src/layouts/FindableLayout.astro`, `src/styles/findable.css`, `src/scripts/findable-form.ts` |
| Findable app address (Sign in links) | `findableAppUrl` in `src/config/site.ts` |

## Design: Terracotta Rose (Oct 2026, approved by Ani)

The site was rebuilt in October 2026 from Ani's approved mockups ("Outside In Website Handoff", design sessions Oct 2026). **This replaces the old design completely.** The earlier red / pink / purple / green palette, League Spartan, Bricolage Grotesque, Instrument Sans, the white-and-ink editorial look, the Outside/Inside view switch and the Approach page are all gone on purpose. Don't bring any of them back.

**Colour** (Terracotta Rose, also called Hybrid B):

| Token | Hex | Use |
| --- | --- | --- |
| `--orange` | `#E0421E` | Hero, accents, the Work CTA card, the Contact panel, "Next project" band |
| `--cream` | `#FBF7F2` | Text on orange or maroon, input fields, small pills on orange |
| `--maroon` | `#6D0101` | Nav bands, intro band, CTA band, footer, primary pills on light grounds |
| `--pink` | `#F9B8CD` | Text on maroon, tags, stickers, pills on maroon |
| `--brown` | `#3B1E19` | Body text |
| `--brown-soft` | `#5A3A32` | Secondary text |
| `--blue` | `#D7E6F2` | About band, social section, contact form panel |
| `--paper` | `#F4EFE8` | Page background |
| `--line` | `#E5D3C6` | Hairlines |

**Contrast rules.** Pink on maroon 7.7, brown on paper 13.2, brown on blue 11.9, cream on maroon 11.9 are fine for any text. **Cream on orange (4.0) and orange on paper (3.7) are large text only** (24px+, or 19px+ bold), plus accents and the logo. Nothing in the palette passes for small text on orange, so:
- small labels on orange sit in a cream pill (`.tag--cream`): the hero corner labels, the Work CTA label, "Next project", "The name", "[ Contact ]", and the tiny labels on the orange social-ring tiles;
- the hero nav sits on a cream pill, because the hero cycles through four backgrounds;
- body copy on orange runs at 24px (About "Outside" panel, Contact details; 20px bold on phones);
- primary pills are maroon/pink (or pink/maroon on maroon), never cream on orange;
- small orange labels on paper (e.g. "[ 01 ]", "The brief") are maroon instead;
- the "Ongoing partnership" card on Services is maroon, not orange;
- the Work page service-row numbers are 19px bold so they still pass on the orange hover.
These were the only deviations from the mockups, all for WCAG 2.1 AA.

**Type.** Inter Tight for everything; Instrument Serif italic (`.em`) for the emphasis words (*then build it.*, *Let's make it real.*). Labels are 12px, weight 500, 0.1em tracking, uppercase, in square brackets in the copy: `[ Selected work ]` (`.label`).

**Shape.** Pills (`999px`) for buttons, chips and tags. 12px radius on image cards, 14px on case-study heroes. Minimum 44px touch targets.

**Logo.** Geometry unchanged: viewBox `110 128 887 522`; O centre 369.5,387, R 259.5, r 193.5; O band y 376–433 shifted 73; I bar x 842 w 76, band y 377–437 shifted 77. Its resting state is always the exact logo: each slice sits in a group translated to its real offset, and animation only moves an inner group. Variants in `Logo.astro`: `hero`, `nav`, `sticker`, `shift`, `static`.

**Motion.**
- Homepage hero: the top halves drop in, the bottom halves rise, the slices fly in from the left with a slight overshoot; then the slices blink left and back every 0.8s. The hero cycles colour pairs (background / logo) as step changes, 0.4s each, 1.6s a cycle (sped up at Ani's request, 30 Oct 2026): orange/cream, cream/orange, maroon/pink, blue/orange. That's 2.5 changes a second: keep it under 3 (flash safety). Reduced motion stops it. Pointer-follow was not carried over.
- Nav mark: the slices shift left on hover. Work sticker: blink every 2s. About mark: shifts left and back every 4s, with pink slices.
- "Made for the feed": 10 tiles in a 3D ring (`rotateY`, `translateZ(560px)`), one turn every 48s, paused on hover. Four tiles are photos (billboard, rider, Findable, Ani).
- Work cards scale up slightly on hover; selected-work images nudge right; service rows fill orange; the Contact headline rises in word by word; case-study titles rise in; the Services headline's slice slides into place.
- **No slice effect on photography** (Ani removed it from the About portrait and case-study heroes).
- **Reduced motion:** every animation and transition is off (`global.css` and `base.css`).

**Pages.**
- `/`: hero logo → maroon intro with the drone photo → blue about band (3 / 5 / 1) → services grid with the maroon "Not sure where to start?" card → selected work (Flavours airport screen, Ride Retreat film, Findable) → social ring → maroon CTA and footer.
- `/work/`: maroon hero with a scrolling image strip, giant pink PORTFOLIO and the OI sticker → filter chips (All, Brand, Campaign, Digital, AI, with counts) → three-column masonry with no row gaps → numbered service rows → blue CTA with three tilted photos. Desktop "All": left Flavours (500), Empty Plate Club (520), Walking Tours (360); middle Ride Retreat (400, video), Wings for Life (1:1), Run for Reido (560); right Findable (400, contain on #7FB3E0), Negative Split (540, contain on #DADAD7), then the orange "Your work could sit right here" card. Columns end level: the CTA fills its column and a short column's last image grows by the difference. Filtered views hide the CTA and pack cards into the shortest column. Two columns under 1100px, one on phones. Without JavaScript the filters are hidden and the desktop columns show.
- `/work/<slug>/`: the case-study template (below).
- `/services/`, `/about/`, `/contact/`: copy exactly as the mockups. Pricing is not published.
- Contact: orange panel (Cal.com button, email, place) + blue Netlify form. "What do you need?" chips (Brand, Website, Campaign, Marketing, AI & automation, Findable, Not sure yet) are toggle buttons; the selection is sent in the hidden `needs` field. `?need=findable` preselects a chip.
- Nav: Work, Findable, Services, About, and a "Let's talk" pill. Hero look on the homepage, maroon on Work and case studies, paper elsewhere. Links wrap on phones (no hamburger), as designed.

**Case-study template** (`src/pages/work/[slug].astro`): maroon nav → "← All work" → huge title with the tagline in pink serif italic → meta strip (Client, Year, What we did, Where) → hero image overlapping from maroon onto paper → intro in large type with The brief and The idea beside it → two-column gallery (`fullWidth` items span both; so does the first item when the count is odd; videos autoplay muted) → optional note → maroon band with The result and What we made → orange "Next project" → footer.
- Next-project loop: Flavours → Ride Retreat → Negative Split → Empty Plate Club → Run for Reido → Walking Tours → Wings for Life → Flavours.
- **Gaps never publish.** Values written `TO ADD…` and gallery items with a `placeholder` are left out (row, field or image). A null `result` drops the result paragraph but keeps What we made. A case study with no publishable gallery skips the gallery. `npm run check` lists every gap.

## Content and honesty rules (strict)

- **Never invent** clients, results, statistics, testimonials, bios, founding stories, qualifications, pricing or guarantees. The copy from the Oct 2026 handoff is approved; anything beyond it needs Ani.
- **Voice:** NZ English; sharp and human; no agency clichés ("next level", "cutting-edge", "unlock potential"); no "delve" or "tapestry"; no "it's not just X, it's Y"; avoid reflexive em dashes in new copy (the approved copy keeps the ones it has).
- **"Our own":** Ride Retreat, Empty Plate Club and Findable are Ani's own ventures. Label them that way.
- **Wings for Life:** say "for a Red Bull athlete". Don't name the athlete and don't imply Red Bull was the client.
- **Rotorua Walking Tours:** the client has since changed their live site. Keep "Website shown as we designed and launched it" and **don't link to their live site**.
- **`studio/beer-texture.jpg`** (in the handoff, not in the repo) is a royalty-free texture for social and quote-post backgrounds only. Never present it as client work.
- **Permissions:** Ani confirmed permission for all eight projects, including the Secret Spot hot tub and Poco dinner photos on Ride Retreat.

## Portfolio status (29 Oct 2026)

- **Eight published projects, in this order:** Flavours of Plenty, Ride Retreat, Findable, Empty Plate Club, Wings for Life, Negative Split, Rotorua Walking Tours, Run for Reido. Seven have case studies; **Findable's card links to `/findable/`** (its own landing page).
- **Removed:** the six concepts (After Steam, Field Notes, Quiet Machine, Loud Weekend, Off Season, Tidewater) and the concept machinery (Quiet Machine's triage demo, the concept/objectives schema). The Butter Dog tile and the Marketing & Campaigns rows from the old Work page are gone too.
- **Archived, unpublished** (`archive/work/`, Ani's choice): Explore Bay of Plenty, Visitor Information Kiosks, Ride Retreat: The Journey, Te Puia Digital Marketing, Te Puia China Website, Our Tauranga Region, Grassroots Trust Velodrome, Nduro, plus the two older hidden drafts NZ CrossFit Nationals and Sunseeker beer label (the Sunseeker can now appears inside the Flavours case study). To bring one back, give it an entry in `case-studies.json` and `work-grid.json` with approved copy and images.
- **Still to supply (Ani):** years for Ride Retreat, Negative Split, Empty Plate Club, Walking Tours and Wings for Life; a result line for most projects; Wings for Life Instagram screenshots; a Run for Reido photo of the tee being worn, plus the event details (brief and where). Add them to `case-studies.json` and they appear.
- **Redirects** (`netlify.toml`): `/projects/*` → `/work/` (with the renamed slugs mapped: `nsc-wheel-design` → `negative-split`, `wings-for-life-team-logo` → `wings-for-life`), `/approach/` → `/services/`.

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
5. Optional: add the LinkedIn link in `site.ts` (Instagram is linked: @theoutsidein.nz) and review the privacy notice.
6. Supply the case-study gaps listed under Portfolio status.

## Quality bar

Before pushing, check that:
- `npm run build` and `npm run check` pass.
- Every route renders with real content and no placeholder text.
- axe reports no WCAG 2.1 AA violations (including each of the four hero colour frames).
- There's no horizontal scroll from 320px to 1440px.
- Filters (counts, column levelling, CTA hidden when filtered), the form (validation, chips → `needs`, success and error states), video posters and reduced motion all work.
- There are no console errors.
- Findable pages are unchanged unless the task is about Findable.

The Oct 2026 rebuild was checked with a Playwright + axe suite (828 checks across 15 routes, 6 widths, both motion settings, plus filters, form and hero frames): zero failures. Findable pages were pixel-identical before and after.

Commit messages are short and descriptive. Work on a branch and send Ani a Netlify deploy preview before merging to `main`.
