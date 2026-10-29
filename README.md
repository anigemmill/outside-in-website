# Outside In website

The website for Outside In, a creative, marketing and AI studio in Aotearoa New Zealand.

Built with [Astro](https://astro.build) as a fast static site. No database, no CMS, no backend to maintain. Content lives in plain files you can edit, and the site deploys to Netlify (or any static host) in a few minutes.

---

## Quick start

You need [Node.js](https://nodejs.org) 20.3 or newer.

```bash
npm install          # once
npm run dev          # local site at http://localhost:4321 (auto-reloads as you edit)
npm run build        # production build into /dist
npm run preview      # serve the production build locally
npm run check        # list placeholders still to replace before launch
npm run og           # regenerate logo files, favicons and the social share image
```

In `npm run dev` a yellow bar at the top of every page lists anything still to supply. It never appears on the live site.

---

## Where to change things

The design is **Terracotta Rose** (Oct 2026). `CLAUDE.md` has the full design and content rules.

| To change… | Edit |
| --- | --- |
| Email, booking link, domain, social links, reply time | `src/config/site.ts` (or `.env`, see below) |
| Navigation | `nav` in `src/config/site.ts` |
| Page copy | the page itself in `src/pages/` (`index.astro`, `services.astro`, `about.astro`, `contact/index.astro`) |
| Work page cards | `src/data/work-grid.json` |
| Case studies | `src/data/case-studies.json` (images in `src/assets/work/<project>/`, videos in `public/media/<project>/`) |
| Privacy notice | `src/pages/privacy.astro` |
| Default SEO title and description | `seo` in `src/config/site.ts` |
| Page-specific SEO | the `title` and `description` on `<Base>` at the top of each page in `src/pages/` |
| Colours, fonts, shared styles | the `:root` block at the top of `src/styles/global.css` |
| Logo files, favicons, social image | `npm run og` (from `scripts/make-og.mjs`) |

### Fill in a case-study gap

Anything Ani hasn't supplied yet is written as `"TO ADD"` in `src/data/case-studies.json`, or as a gallery item with a `placeholder`. Those never appear on the site. Replace the value (or swap the placeholder for `{ "src", "alt", "fit", "background", "minHeight" }` with the image in `src/assets/work/<project>/`) and it shows up. A `result` of `null` hides the result paragraph. `npm run check` lists what's still missing.

### Add a project

1. Put its images in `src/assets/work/<slug>/` (about 1800px on the long edge, JPEG).
2. Add a case study to `src/data/case-studies.json` (copy an existing one; every image needs alt text) and set `next` so the "Next project" loop still runs through every case study.
3. Add a card to `src/data/work-grid.json`: `filters` (Brand, Campaign, Digital, AI), `desktopColumn` (0–2) and `imageHeight` for the desktop layout, and `href` `/work/<slug>/`.
4. Only publish copy, results and images Ani has approved and has permission to show.

Older case studies are kept, unpublished, in `archive/work/`.

---

## Environment variables

Copy `.env.example` to `.env` for local work, and add the same variables in Netlify (**Site configuration → Environment variables**). All are public values; there are no secrets in this project.

| Variable | Purpose | If empty |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Only to override the domain (e.g. a staging copy) | Uses the built-in domain, `https://theoutsidein.nz` |
| `PUBLIC_CONTACT_EMAIL` | Only to override the contact email | Uses the built-in address, `anigemmill@theoutsidein.nz` |
| `PUBLIC_BOOKING_URL` | Only to override the booking link | Uses the built-in Cal.com link, `https://cal.com/ani-gemmill-yg4gmo` |
| `PUBLIC_FORM_ENDPOINT` | Only if not using Netlify Forms | Form uses Netlify Forms |

After changing environment variables in Netlify, trigger a new deploy (**Deploys → Trigger deploy**).

---

## Deploy to Netlify (recommended)

Netlify hosts the site, handles the contact form and gives you free HTTPS. The free tier is enough to launch.

1. Put this folder in a GitHub repository (`git init`, commit, push), or use Netlify’s drag-and-drop for a one-off.
2. In Netlify: **Add new site → Import an existing project →** choose the repo. Build settings are read from `netlify.toml` (build `npm run build`, publish `dist`).
3. Add the environment variables above. The domain is already built in, so `PUBLIC_SITE_URL` can stay empty.
4. Deploy. You’ll get a `*.netlify.app` address to check first.

### Connect your domain

1. Netlify: **Domain management → Add a domain** → enter your domain.
2. Either point your domain’s nameservers to Netlify (simplest, Netlify manages DNS), **or** at your current registrar add:
   - an `A` record for the root domain (`@`) to Netlify’s load balancer IP shown in the Netlify dashboard;
   - a `CNAME` record for `www` to your `*.netlify.app` address.
3. Netlify issues the HTTPS certificate automatically once DNS resolves (usually minutes, sometimes up to a day).
4. Set `theoutsidein.nz` (no `www`) as the **primary domain** in Netlify. `netlify.toml` already redirects `www.theoutsidein.nz` to it.
5. Deploy previews and branch deploys automatically tell search engines not to index them, so only the live site appears in Google.

Check Netlify’s current docs for the exact IP and steps, as these can change.

---

## Contact form

**Netlify Forms (default):** nothing to configure in code. The form is detected at build time.

1. After the first deploy, open **Forms** in Netlify and confirm a form called `contact` appears. (If not: **Forms → Enable form detection**, then redeploy.)
2. **Forms → Form notifications → Add notification → Email notification** → your address. Without this, submissions are stored in Netlify but not emailed.
3. Send a test enquiry from the live site.

Spam protection: a hidden honeypot field. Netlify also runs its own spam filtering.

The form has validation, a sending state, a success message and an error message that offers your email address. Without JavaScript it still submits and lands on `/contact/thanks/`.

**Testing locally:** `npm run dev` can’t receive submissions (you’ll see the error state, which is expected). Use `npx netlify dev` or test on a deploy preview.

**Other hosts:** create a form at [Formspree](https://formspree.io) (or similar), set `PUBLIC_FORM_ENDPOINT` to its URL and redeploy.

## Discovery-call booking

Bookings use Cal.com: https://cal.com/ani-gemmill-yg4gmo. Every “Book a discovery call” button opens it in a new tab. To change it, edit `bookingUrl` in `src/config/site.ts` (or set `PUBLIC_BOOKING_URL`). If you create a dedicated discovery-call event type, use that event’s link so people land straight on the right booking.

---

## The brand system

**Terracotta Rose** (Oct 2026). Full rules, including the contrast workarounds, are in `CLAUDE.md`.

| Token | Hex | Use |
| --- | --- | --- |
| Orange | `#E0421E` | Hero, accents, large text only |
| Cream | `#FBF7F2` | Text on orange or maroon, inputs |
| Maroon | `#6D0101` | Nav bands, CTA band, footer, primary pills |
| Pink | `#F9B8CD` | Text on maroon, tags, stickers |
| Brown | `#3B1E19` | Body text |
| Brown soft | `#5A3A32` | Secondary text |
| Blue | `#D7E6F2` | About band, social section, form panel |
| Paper | `#F4EFE8` | Page background |
| Line | `#E5D3C6` | Hairlines |

**Type.** Inter Tight for everything, Instrument Serif italic for emphasis words. Self-hosted via Fontsource; no requests to Google.

**Logo.** `src/components/Logo.astro` rebuilds the mark as live SVG from its measured geometry; the resting state is always the exact logo. Files in maroon, cream, orange and brown are in `public/brand/` (regenerate with `npm run og`).

**Motion.** Hero entrance and slice blink, the four-pair hero colour cycle, the spinning social ring, card and row hovers, the Contact headline and case-study titles. Every animation turns off for reduced motion.

---

## Project structure

```
src/
  config/site.ts          business details, links, nav, SEO defaults
  data/                   work-grid.json, case-studies.json (+ work.ts types/helpers), findable.ts
  lib/media.ts            resolves image/video paths from the JSON
  assets/work/, studio/   portfolio and studio images (optimised at build)
  components/             Logo, Header, Footer, BookCall, ContactForm, FindableSource
  layouts/                Base.astro (Outside In), FindableLayout.astro
  pages/                  one file per route; work/[slug].astro is the case-study template
  styles/                 global.css (tokens), base.css (shared reset), findable.css
public/                   favicons, logo files, social image, media/ (videos)
archive/work/             old case studies, unpublished
scripts/                  brand-file generator, launch checklist
netlify.toml              build settings, headers, redirects
```

## Accessibility and performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus states, 44px minimum targets, keyboard-operable filters and form chips (`aria-pressed`, with a live status message for filter results).
- Reduced-motion preference turns off every animation and transition; the logo shows its exact resting state.
- Tested with axe-core (WCAG 2.1 AA) at 320–1440px, including each hero colour frame: no violations at handover (Oct 2026).
- No tracking, no third-party scripts, fonts self-hosted, images optimised at build, JavaScript kept small and page-specific.
