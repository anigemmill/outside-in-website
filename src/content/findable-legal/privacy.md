# Findable Privacy Policy

> **DRAFT 0.3. Not in force. Not published. For legal review.**
> Checked against `main` at `10432ae` (9 Nov 2026). Google connections are built and merged but switched off for every business: keep section 6 only if they're on when this is published.

**Version:** 0.3-draft · **Effective:** Not in force

This policy explains how The Outside In Limited (NZBN 9429048708357), a New Zealand company trading as The Outside In and Findable ("we"), of [[PLACEHOLDER: contact address. Not the home address: use a PO Box or other address the company chooses. LAWYER: IPP 3 asks for the agency's address; confirm a PO Box is enough]], handles personal information under the Privacy Act 2020.

**Privacy officer:** Ani Gemmill, anigemmill@theoutsidein.nz.

It covers the Findable app, the Findable free check and contact forms on theoutsidein.nz, and the emails we send about them.

## 1. Two roles

**When it's our information.** For the people who use Findable, ask us for a free check or contact us, we decide how personal information is used. This policy covers that.

**When it's our customer's information.** Businesses put information into Findable, or connect accounts, and some of that can be about people. We hold it on their behalf, as their agent. Our [Data Processing Agreement](06-data-processing-agreement.md) covers that, and the business is your first contact. This policy explains what happens to it too.

**Business information isn't personal information.** Most of what Findable holds is about businesses: rankings, analytics totals, competitor names. Privacy law covers information about identifiable people. But we treat all customer data as confidential.

## 2. What we collect and why

| What | From | Why |
|---|---|---|
| Name, email, role, business | You, your business, or the Findable staff member who invited you | Create and manage your account |
| Password | You | Sign-in. We store only a scrambled (hashed) version. |
| IP address, device and browser, sign-in times, email addresses typed into the sign-in and password reset forms, actions in the app | Automatically | Keep accounts secure, limit abuse, investigate problems, keep an audit trail |
| Business contacts: name, email, phone, role | You, your business, or public sources such as your website | Run the service, contact you |
| Consent records: who agreed, their role and email, when, how, what to | You or your business | Show we had permission |
| Free check and contact form details: name, email, business, website, region, message | You, through theoutsidein.nz | Run your free check, send your report, reply to you |
| Billing contact and subscription details | You [[REQ-5: and Stripe, once payments are live]] | Bill you. We don't see or store card numbers. |
| Messages to us | You | Help you, and keep a record |
| Website pages | Your business's public website | Website assessment. Pages can include names, email addresses and phone numbers of staff shown there. [[REQ-24: store only what the assessment needs; redact contact details]] |
| Search queries and page data from Search Console; traffic totals from Google Analytics | Google, if your business connects it | Show your business's performance. See section 6. |
| AI answers and search results | AI and search providers | Measure how your business appears. These can mention people by name, such as owners, guides or reviewers, and can be wrong about them. |

If you don't give us your name and email you can't have an account. If a business doesn't give consent, we can't run analyses or website assessments for it. [[REQ-24]]

**Please don't put sensitive information into Findable.** That means health, ethnicity, religion, guest records or customer lists. It isn't needed. See the [Acceptable Use Policy](05-acceptable-use-policy.md).

## 3. Information we get from someone else

Some personal information reaches us from someone other than the person it's about. When it does, we'll tell that person, as the Privacy Act requires (information privacy principle 3A), unless an exception applies. [[LAWYER: confirm which IPP 3A exceptions, if any, cover people named on public websites and in AI answers; see 09]]

| Who | What we get, and from whom | How we tell them |
|---|---|---|
| People invited to Findable | Name, email and role, from the business or our staff | In the invitation email, with a link to this policy [[REQ-15]] |
| A business's contact person | Name, email, phone, from the business, our staff or the business's website | The first time we contact them [[REQ-15]] |
| The person who gives consent for a business | Name, role, email, from the business | When consent is recorded [[REQ-15]] |
| People named on a business's website or in AI answers | Whatever the page or answer says | [[LAWYER / DECISION: rely on an exception, or avoid storing it (REQ-24)]] |

## 4. How we use it

We use personal information to:

- provide, support and secure Findable, and run free checks;
- send account emails, such as invitations, password resets and notices about your plan;
- bill you and keep financial records;
- understand and fix faults and improve the service, using as little personal information as we can;
- meet legal obligations.

We don't sell personal information. We don't use it, or customer data, to train AI models. [[REQ-18]]

**Marketing email.** We don't send any today. If we do, it'll be only with your consent, it'll say who it's from, and every message will have a working unsubscribe that we act on within 5 working days, as the Unsolicited Electronic Messages Act 2007 requires.

**Automated reports.** Findable's analyses and recommendations are about businesses, not individuals. We don't use them to make decisions about a person. [[DECISION: after a business's first report is approved, later reports are shared with it automatically, without a person checking them first. Keep, or require review? See 04 and REQ-16]]

## 5. Who we share it with

These providers help us run Findable. Most are outside New Zealand.

| Provider | What for | What they get | Where |
|---|---|---|---|
| Supabase | Database | All data we hold | [[REQ-18: confirm the Production project's region; documents say Sydney, Australia]]. Support and logs can be elsewhere. |
| Vercel | Hosting | Requests and server logs | Servers in Sydney, Australia. Vercel's main processing is in the US, and can be elsewhere. |
| Resend | Sending account email | Your email address, name and the message | [[REQ-18: confirm; expected US]] |
| Netlify | Website forms for the free check and contact | What you type in the form | [[REQ-18: confirm; expected US]] |
| OpenAI | AI answers | The question and an approximate New Zealand location | [[REQ-18: confirm; expected US]] |
| Perplexity | AI answers | The question and an approximate location | [[REQ-18: confirm; expected US]] |
| SerpApi | Google search results, including AI Overviews | The question and an approximate location | [[REQ-18: confirm; expected US]] |
| Anthropic, Google (Gemini) | AI answers, only if we switch them on | The question | [[DECISION: list only if switched on in Production; confirm location]] |
| Google | Analytics and Search Console, only if your business connects them | Read-only access to the connected account | US and elsewhere |
| Stripe | Payments, once live | Business name, billing email and payment details | Stripe New Zealand Limited, with Stripe's group overseas [[REQ-5]] |

The current list is at [[PLACEHOLDER: subprocessor URL]]. [[REQ-17]]

**What goes to AI and search providers is limited.** We send the traveller question being tested (at most 300 characters), such as "best geothermal attractions in Rotorua", and a general New Zealand location. Questions can name your business or a competitor. We don't send your users' details, your Google data, your uploads or your reports. [[REQ-18]]

**Whether they keep or train on it.**
[[REQ-18: don't publish this paragraph until each account's settings are checked]]
We ask OpenAI not to store our requests. OpenAI's documentation says API data isn't used to train its models unless the account opts in, and we haven't opted in. Perplexity's documentation says it doesn't use API customer content to train generative AI models. SerpApi is a search data service, not an AI model. These statements are the providers' own, and could change. Providers may keep what we send for a limited period for abuse monitoring: [[PLACEHOLDER: confirm each provider's period]].

**We may also share personal information** with professional advisers; with a buyer of the business, under a duty of confidence; with your own business's users, within your account; and where the law requires.

**Findable staff** can see customer data, including connected Google data, to run the service and give support. [[REQ-27: today every staff role can see every business; limit this]] Super Admins can use a read-only "view as client" mode for up to 60 minutes at a time, and each use is logged.

**Overseas.** When a provider only stores or processes information for us, New Zealand law treats us as holding it and we stay responsible. A provider that uses information for its own purposes receives a disclosure, and we'll only make that disclosure where the Privacy Act allows it. [[LAWYER: confirm the IPP 12 analysis provider by provider, particularly AI providers and Stripe]]

## 6. Google data

This section applies only if your business connects Google Analytics or Search Console.

- **Access.** Read-only. Each is connected separately, by someone authorised at your business, and is optional.
- **What we import.** Google Analytics: daily traffic totals by landing page, channel and source, and key events. No information about individual visitors. Search Console: search queries, pages, clicks, impressions, click-through rate and position, for the last 90 days, updated nightly. Search queries are typed by the public, so a query could include a name.
- **What we use it for.** Only to show your business's performance in Findable reports and recommendations.
- **What we don't do.** We don't sell Google data, use it for advertising, use it to train AI models, or send it to AI providers.
- **Who sees it.** Your users, and Findable staff where needed to run the service or give support.
- **Disconnecting.** You can disconnect at any time. That deletes our stored credential, stops imports and removes Findable's access in your Google account. [[REQ-12: today access is only revoked at Google in limited cases; build revocation before publishing this sentence]]
- **Deleting imported data.** Imported data stays until you ask us to delete it, or until [[DECISION: period after disconnecting]]. Deleting it removes the imported rows and the copies in reports and recommendations. [[REQ-12: copies in report snapshots and recommendations aren't deleted today]]

Findable's use of information received from Google APIs follows the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including its Limited Use requirements.

## 7. How long we keep it

[[REQ-9: no period can be published until it's decided and the code deletes on schedule. Today nothing is deleted automatically.]]

| What | How long |
|---|---|
| Account details | [[DECISION: period after the account closes]] |
| Customer data, including reports, AI answers and imported data | [[DECISION: period after the subscription ends]] |
| Website pages collected for an assessment | [[DECISION: suggested 90 days, keeping the assessment results]] |
| Security records: IP addresses, sign-in attempts, rate-limit records | [[DECISION: suggested 90 days]] |
| Audit log | [[DECISION: suggested 2 years, with names removed when a user is deleted]] |
| Free check and contact form requests | [[DECISION: period]] |
| Billing and tax records | 7 years, as New Zealand tax law requires [[PLACEHOLDER: confirm with accountant]] |
| Consent records | [[DECISION: while relied on, then a period]] |
| Backups | Deleted data can stay in backups until they expire: [[REQ-18: confirm; documents say about 7 days]] |

## 8. Your rights

You can ask for the personal information we hold about you, and ask us to correct it. Email the privacy officer. We'll respond as soon as we reasonably can and within 20 working days. We may need to confirm who you are. [[REQ-10]]

You can ask us to delete your account or your free check request. We'll tell you if we need to keep anything, such as billing records or audit logs with your name removed. [[REQ-8]]

If the information is held for a business, such as a Search Console query containing your name, we'll usually refer you to that business, and help it respond.

You can change your password and sign out devices yourself. To change your name or email, ask us. [[REQ-10]]

**Complaints.** Tell our privacy officer first. If you're not happy with the result, you can complain to the [Privacy Commissioner](https://www.privacy.org.nz).

## 9. Security

We use technical and organisational measures to protect information, including hashed passwords and session tokens, encrypted Google credentials, encrypted connections, access limited by role, separated customer data, and logging of sensitive actions. [[REQ-25: staff two-factor sign-in, idle session timeout and security headers]] No system is perfectly secure. Report a security concern to [[PLACEHOLDER: security contact]]. [[REQ-19]]

If a privacy breach is likely to cause serious harm, we'll tell the Privacy Commissioner and the people affected as soon as practicable, as the Privacy Act requires. [[REQ-13]]

## 10. Cookies

The Findable app uses only the cookies it needs to work. It has no analytics or advertising trackers.

| Cookie | What it does | Lasts |
|---|---|---|
| `gos_session` | Keeps you signed in | Up to 14 days, or until you sign out |
| `findable_google_oauth` | Links a Google connection to your session while you connect | 10 minutes |

You can't turn these off and use the app, because you couldn't sign in. You can clear them in your browser. They aren't used for advertising or shared with anyone. If your business connects Google Analytics, we import its traffic totals; that adds nothing to the Findable app or your website. The theoutsidein.nz website uses no advertising or analytics cookies.

## 11. Changes

We'll update this policy when our practices change, and tell you if a change is significant. [[REQ-6]]

## Change log

| Version | Date | Change |
|---|---|---|
| 0.3-draft | 9 Nov 2026 | Entity and privacy officer named. Address kept off the page; contact address placeholder. |
| 0.2-draft | 9 Nov 2026 | Rechecked against `main` at `10432ae`. Entity and privacy contact updated. Covers the free check. New section 3 (IPP 3A). Providers: Netlify, optional Anthropic and Gemini. Google built but off; revocation and copies flagged. Retention suggestions. Cookie notice folded in. |
| 0.1-draft | 3 Nov 2026 | First draft for review |
