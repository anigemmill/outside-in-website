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

| To change… | Edit |
| --- | --- |
| Email, booking link, domain, social links, reply time | `src/config/site.ts` (or `.env`, see below) |
| Navigation | `nav` in `src/config/site.ts` |
| Homepage copy | `src/data/home.ts` |
| Services, combined engagements, partnership | `src/data/services.ts` |
| About page copy, team members | `src/data/about.ts` |
| Approach stages | top of `src/pages/approach.astro` |
| Portfolio projects | `src/content/work/<project>/index.md` |
| Privacy notice | `src/pages/privacy.astro` |
| Default SEO title and description | `seo` in `src/config/site.ts` |
| Page-specific SEO | the `title` and `description` on `<Base>` at the top of each page in `src/pages/` |
| Colours, fonts, spacing | the `:root` block at the top of `src/styles/global.css` |
| Inside-view notes | the `<Note>` elements in each page |

### Add a portfolio project

1. Copy an existing folder in `src/content/work/`, e.g. `off-season`, and rename it. The folder name becomes the URL: `src/content/work/harbour-hotel/` → `/work/harbour-hotel/`.
2. Replace `cover.svg` with your image (`cover.jpg`, `cover.png` or `cover.webp` all work; around 2400×1500px is ideal). Astro converts it to modern formats and sizes automatically.
3. Edit `index.md`. The fields between the `---` lines are required (the build tells you if one is missing):
   - `status: client` for real work (needs a `client:` name) or `status: concept` for proof-of-concept work.
   - `categories:` any of `design-creative`, `marketing-growth`, `ai-systems`. These drive the filters.
   - `featured: true` puts it on the homepage (the first four by `order` are shown).
   - `results:` **only for client work, and only verified facts.** Concept projects use `objectives:` instead; the build refuses a concept that lists results.
   - `gallery:` optional extra images, each with `src`, `alt` and an optional `caption`. Put the image files in the same folder.
   - Any text below the second `---` appears as notes on the project page.
4. Save. The site rebuilds; the project appears on `/work/`, gets its own page and joins the “Next project” loop.

To retire a concept, delete its folder.

### Turn a concept into client work

Change `status: concept` to `status: client`, add `client: Name`, swap the cover for real imagery, rewrite the copy as past tense, and add `results:` only where you have numbers or outcomes you can stand behind.

### Add yourself or your team

Fill in `people` in `src/data/about.ts`. The People section appears on the About page automatically when the list isn’t empty.

---

## Environment variables

Copy `.env.example` to `.env` for local work, and add the same variables in Netlify (**Site configuration → Environment variables**). All are public values; there are no secrets in this project.

| Variable | Purpose | If empty |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Your domain with `https://` | No canonical URLs or sitemap; site asks search engines **not** to index (safe for previews) |
| `PUBLIC_CONTACT_EMAIL` | Email shown on the site | Shows the placeholder `hello@your-domain.co.nz` |
| `PUBLIC_BOOKING_URL` | Discovery-call booking page | “Book a discovery call” opens the contact form with “Discovery call” preselected |
| `PUBLIC_FORM_ENDPOINT` | Only if not using Netlify Forms | Form uses Netlify Forms |

After changing environment variables in Netlify, trigger a new deploy (**Deploys → Trigger deploy**).

---

## Deploy to Netlify (recommended)

Netlify hosts the site, handles the contact form and gives you free HTTPS. The free tier is enough to launch.

1. Put this folder in a GitHub repository (`git init`, commit, push), or use Netlify’s drag-and-drop for a one-off.
2. In Netlify: **Add new site → Import an existing project →** choose the repo. Build settings are read from `netlify.toml` (build `npm run build`, publish `dist`).
3. Add the environment variables above. Set `PUBLIC_SITE_URL` to your real domain.
4. Deploy. You’ll get a `*.netlify.app` address to check first.

### Connect your domain

1. Netlify: **Domain management → Add a domain** → enter your domain.
2. Either point your domain’s nameservers to Netlify (simplest, Netlify manages DNS), **or** at your current registrar add:
   - an `A` record for the root domain (`@`) to Netlify’s load balancer IP shown in the Netlify dashboard;
   - a `CNAME` record for `www` to your `*.netlify.app` address.
3. Netlify issues the HTTPS certificate automatically once DNS resolves (usually minutes, sometimes up to a day).
4. Make sure `PUBLIC_SITE_URL` matches the version you want as primary (with or without `www`) and redeploy.

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

Create a booking page in Cal.com, Calendly or Google Calendar appointment scheduling, then set `PUBLIC_BOOKING_URL`. Every “Book a discovery call” button switches to it and opens in a new tab. Until then the buttons go to the contact form, so none are dead.

---

## The brand system

**Logo.** `src/components/Logo.astro` rebuilds the supplied mark as live SVG from measured geometry: a ring and a bar, each cut by one horizontal slice shifted right. On screen it is plum (or mint on dark), always one colour. Black, white, plum and mint files for other uses are in `public/brand/`. Regenerate with `npm run og`.

**Logo animation.** Built only from the mark's real parts, so the resting state is always the exact logo:
1. Intro: the top halves of the O and I drop in, the bottom halves rise, then both slices fly in from outside the frame (the left) and lock into their offsets.
2. Hover (header and footer logo links): the slices snap back to whole, then shift out again.
3. Hero only: the slices follow the pointer (or a finger on touch screens), and every six seconds while idle and on screen the slices give a short blink.
Reduced-motion users see the finished logo with no movement. Timings are in the `<style>` block of `Logo.astro`; the idle interval is in `src/scripts/site.ts`.

**Homepage.** Deliberately minimal, with lots of white space: a full-screen hero that is only the animated plum logo and one line, then one statement, two large work images, three services in a row, and the footer call to action. Homepage copy lives in `src/data/home.ts`.

**Header.** Logo on the left, plain text links and one plum “Let’s talk” button on the right. On the homepage the header logo appears once you scroll past the hero logo.

**Inside view switch.** Lives in the footer (“See the thinking behind every page”).

**The slice.** The logo’s cut runs through the whole site: headline text, card hovers, rules and the eyebrow markers.

**Colour.** Nine colours, used with restraint. The page is white and plum is the ink; the brights live mostly in the work imagery and the three service colours.

| Colour | Hex | Role |
| --- | --- | --- |
| Plum Purple | `#6B104D` | Text, logo, buttons, footer, AI & Systems |
| Petal (teal) | `#225266` | Secondary text; Inside view |
| Ballet Pink | `#FFE2E1` | Design & Creative; soft surfaces |
| Powder Blue | `#CBE7FE` | Marketing & Growth |
| Lavender Purple | `#E0CDFD` | Hover fills, pills |
| Amethyst Purple | `#821EFF` | Links and highlights |
| Chartreuse Green | `#B7E255` | Small accents, artwork |
| Tangerine Orange | `#FD792D` | Artwork only |
| Coral Red | `#FC3F32` | Artwork only |

**Contrast.** Plum reads on every light colour (7.8:1 or more, 11.6:1 on white). Petal is 8.5:1 and Amethyst 5.9:1 on white. Coral and tangerine are under 4.5:1 with text, so keep them to artwork, dots and fills.

**Shapes.** Buttons, tags, filters and stickers are pills (`--pill`); cards and panels use a 16px radius (`--radius`).

**Type.** Bricolage Grotesque (display), Instrument Sans (body), JetBrains Mono (labels and Inside-view notes). All self-hosted; no requests to Google.

**Inside view.** The toggle in the header flips the site into a blueprint layer that explains the thinking behind each section. The visitor’s choice is remembered in their browser only.

---

## Project structure

```
src/
  config/site.ts          business details, links, SEO defaults
  data/                   editable copy (home, services, about)
  content/work/           portfolio: one folder per project
  content.config.ts       portfolio field rules
  components/             Logo, Header, Footer, ProjectCard, ContactForm, TriageDemo…
  layouts/Base.astro      <head>, SEO, header/footer shell
  pages/                  one file per route
  scripts/site.ts         menu, Inside view, reveals, logo interaction
  styles/global.css       design tokens and shared styles
public/                   favicons, logo files, social image
scripts/                  brand-file generator, launch checklist
netlify.toml              build settings and headers
```

## Accessibility and performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus states, keyboard-operable menu (Escape closes, focus is kept inside), filters, toggle and demo.
- Reduced-motion preference turns off the ticker, reveals, logo animation and page transitions; the logo shows its final state immediately.
- Tested with axe-core (WCAG 2.1 AA rules) in both views: no violations at handover.
- No tracking, no third-party scripts, fonts self-hosted, images optimised at build, JavaScript kept small and page-specific.
