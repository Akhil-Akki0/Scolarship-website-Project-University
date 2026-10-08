# Student Scholarship Eligibility Checker — implementation plan

## Product approach

Build a static-first React experience that is useful immediately with representative scholarship records and can later swap the local data module for a real database/API. The main page is a focused landing page; the same application state opens a five-step eligibility flow, a personalized results dashboard, and an accessible scholarship details dialog. Scholarship status is derived from each record's `application_deadline` at runtime, and match explanations are calculated from the submitted profile against explicit criteria.

## Design direction

- **Design movement:** editorial government-service clarity with modern civic SaaS usability.
- **Core principles:** calm and trustworthy, information-first hierarchy, low-friction student guidance, and transparent eligibility reasoning.
- **Color philosophy:** warm sand `#F3EEE7`, paper `#FFFDF9`, and charcoal `#2D2924` echo the supplied video while keeping the information readable. `#A26040` is the ownable terracotta action color for links, focus, and primary actions. Green, amber, and gray remain reserved for status meaning and are never the only signal.
- **Layout paradigm:** a left-anchored reading column with a narrow “what to do next” rail, followed by scannable sections. The results area uses a persistent filter rail on desktop and a stacked control bar on mobile rather than a centered marketing grid.
- **Signature elements:** a small book-check wordmark, blue section rules, and compact metadata rows that make deadlines, amounts, and verification dates easy to scan.
- **Interaction philosophy:** every action answers a clear student question. The form uses one decision group at a time; result cards expose “Why am I eligible?” inline; details stay in context in a dialog rather than sending the user away from the list.
- **Animation:** the opening scene uses the supplied cinematic video as a full-viewport, muted inline video layer over the existing landing page. A sticky overlay reads scroll position with `requestAnimationFrame`, translating the video upward and fading it out so the real site is revealed underneath; the page remains a normal document throughout. Reduced-motion users skip the overlay entirely. Other interactions remain restrained 150–200ms color/border transitions only; no gradients, glow, or decorative movement.
- **Typography system:** Inter for all UI; large 48–64px desktop headings, 32–40px section headings, 15–16px body copy with 1.55 line-height, and compact 12–13px metadata labels.
- **Brand essence:** a clear scholarship starting point for Indian students, with plain-language matching and official-provider handoff. Personality: practical, reassuring, transparent.
- **Brand voice:** direct, warm, and specific. Example lines: “See which opportunities fit your profile.” and “We show the criteria that matched, so you can check the details yourself.”
- **Wordmark & logo:** a book outline with a check mark in the negative space, paired with a two-line wordmark that keeps “Student Scholarship” visually primary.
- **Signature brand color:** `#A26040`, a muted terracotta drawn from the warm paper-and-sand video palette.

## Implementation structure

- `client/src/pages/Home.tsx` — reusable page sections, five-step flow, results dashboard, match scoring, filters, and scholarship details view.
- `client/src/pages/Home.tsx` — reusable page sections, scroll-linked intro overlay, five-step flow, results dashboard, match scoring, filters, and scholarship details view.
- `client/src/index.css` — flat palette, spacing rhythm, responsive layout, form/card states, and accessibility defaults.
- `/manus-storage/185092-874643408_medium_e26a1af1.mp4` — supplied cinematic opening asset, muted/autoplay/inline with no controls.
- `client/public/manus-routes.json` — declared public route set for the static preview/publisher.
- `client/index.html` — Inter font loading and page metadata shell.
- `app.config.ts` — durable project logo metadata.
- `plan.md` and `TODO.md` — durable implementation decisions and outcome criteria.

## Data and serving

Use a typed `Scholarship` record that mirrors the future API shape: identity, provider, amount, education/course rules, academic and income thresholds, location/category requirements, dates, documents, application URLs, and verification metadata. Keep the current demo records in the page module so the UI is immediately usable without server/database resources. The initialized static build uses `pnpm build:static` and publishes `dist/public`; no login, private data, or backend service is required for this first version.
