# Handoff — TechWebsite.github.io

Last updated: 2026-07-02 | Last pushed: `update#22` | Next commit: `update#23` | CSS cache: `?v=19`

> Quick-start companion to `CLAUDE.md`. Read `CLAUDE.md` first for the hard rules
> (CSS goes in theme.css only, cache-bust on every CSS change, Git Bash for sed,
> commit format `website update#N`). This file describes the **current state** so a
> new chat can orient fast. The full per-commit history lives in `CLAUDE.md`.

---

## What the site is

Personal cybersecurity portfolio for **Lorenzo Bertini** (GitHub: Wolanet), hosted at
`TechWebsite.github.io` via GitHub Pages. Base template: HTML5 UP "Massively" —
static HTML, **no build pipeline** (no Node/SASS/bundler). Edits are hand-written
HTML + a single override stylesheet.

---

## Current state (as of update#19)

### Fonts
- **DM Sans** — headings + hero headline/typewriter/badge (`--font-heading`)
- **Inter** — all body, project descriptions and write-up text (`--font-body`; swapped from Source Serif 4 in update#18)
- **JetBrains Mono** — mono accents only: section labels, role-meta, scroll cue (`--font-mono`)
- **Klee One / Shippori Mincho** — Japanese footer quote (`--font-jp`)
- All loaded via two `@import` lines at the top of `theme.css`.

### Hero (`index.html #intro`) — theme.css §7
- Backdrop: diagonal dark gradient (`#111827` → `#080c12`).
- **Animated contour field**: `.hero-contours` → two `.hero-contour-layer` spans (hcA/hcB) drifting opposite directions (`hero-contours.svg` tiled).
- **Wave band** below the nav (`top:84px`): 3 layered SVG paths `.hero-wave-layer hw1/hw2/hw3`. hw1 (top, most coloured) has organic varied amplitude/wavelength; hw2 drifts the opposite way (cross-parallax).
- **Headline** `Cybersecurity / Lorenzo` (h1, 2.75rem) — plain on the backdrop, **no frosted panel**. Slash in accent. Left as-is (no letter-substitution mark).
- Divider: 90px gradient line. **Typewriter** sub-line (1.45rem, DM Sans, solid `#58a6ff` — matches the Rapid7 highlight) cycling 4 roles.
- **Role badge** `.hero-now`: plain text "MDR Analyst – Rapid7" (no pill/border), white label + accent company name, absolutely positioned in the lower third (~`bottom:17%`), links to experience.html.
- **Scroll cue** `.hero-scroll`: animated chevron only (the "View my work" text was removed).
- Reveal: opacity-0 scoped to `body.is-preload`; `fadeIn`/`revealUp` with `fill-mode:both`. `prefers-reduced-motion` fully handled.

### Nav (all pages)
- Brand `images/logo-tek.svg` (27×27 rounded-rect wave mark) + "Tek Tsunami" wordmark, centered in normal flow.
- Links Home / Experience / About — **weight 600, `--text` colour, 0.86rem** (bolder/brighter so they stand out); active link gets an accent underline.
- Icons LinkedIn + GitHub pinned far right.

### Footer (all pages) — theme.css §9
- Left: Japanese quote `千里の道も一歩から ― 老子`. Attribution is the **same size** as the quote (1.22rem).
- Right: **Hokusai line-art cresting wave** `images/wave-footer-jp.svg` via `#footer::after` (opacity 0.62, right ~38%). No spray dots — nested contours, a fanned rake of strokes, and foam curls at the breaking lip.
- Social icons (LinkedIn, GitHub).

### Project list (`index.html`) — theme.css §4
- **Work projects**: DFIR Work (primary label, accent-blue glowing dot).
- **Personal projects & labs 2023–2024**: 9 entries with Font Awesome icon thumbs.
- Section labels enlarged to 0.8rem; year badge at 1em.

### About (`elements.html`) / Experience (`experience.html`)
- About: `/About` label, `.about-grid` (photo `aboutme3.jpg` left, text right).
- Experience: `Career timeline`, 3 roles. Rapid7 entry has **no bullets yet** (pending — user adds when role matures).

### Article / write-up pages (9 files, `body.page-article`) — theme.css §10
- Single `max-width: 52rem` column, **justified** body text, title-aligned.
- Images never upscale (`width:auto; max-width:100%; max-height:80vh`); captions `<p class="img-caption">` (italic, muted).
- `dfirwork.html` is an intentional stub ("Cases coming soon" — professional cases pending).

### Favicon
- `images/logo-tek-favicon.svg` — **full-bleed square** variant (no rounded corners → no transparent tab "tips"). Plus regenerated `favvicon/favicon.ico` + 16/32 PNGs from the same square design. All favicon links carry `?v=12`.
- Nav still uses the rounded `logo-tek.svg`.

### Accessibility / hygiene (update#19)
- `<html lang="en">` on all 12 pages.
- Every external `target="_blank"` link carries `rel="noopener"`.
- `prefers-reduced-motion` respected throughout the hero.
- Known leftover from the template (not yet changed): `<meta viewport ... user-scalable=no>` disables mobile pinch-zoom — flag for the user if accessibility is a priority.

---

## File inventory (active files)

```
12 HTML pages: index, elements (About), experience, + 9 page-article write-ups
  (ablueteamwire, adhomelab, alabnessus, alabsentinel, ankistudy,
   athmwonderland, commontroubles, dfirwork, workinprogress)

assets/css/theme.css      ← ONLY css file to edit (override layer, loaded after main.css)
assets/css/main.css       ← template base, DO NOT edit
assets/css/noscript.css, fontawesome-all.min.css
assets/js/                ← 7 template JS files, all in use

images/logo-tek.svg              ← nav logo (rounded card)
images/logo-tek-favicon.svg      ← square favicon source
images/logo-tek-original.svg     ← backup of original logo (kept, not deployed)
images/hero-contours.svg         ← animated hero background (via theme.css)
images/wave-footer-jp.svg        ← Hokusai footer wave (via theme.css)
images/overlay.png               ← template overlay texture (via main.css)
images/background-IMG/bg46.jpg   ← template #bg photo (referenced by main.css, overridden by theme.css gradient)
images/aboutme3.jpg              ← About photo
images/anki1.jpg anki2.jpg       ← Anki article images
images/favvicon/                 ← favicon.ico + 16/32 PNGs (double-v typo in folder name — don't rename)
images/{activedlab,labnessus,labsentinel,troubleshoot,wonderland,zwire}/  ← write-up screenshots
```

---

## Pending / deferred (do NOT do without explicit ask)

| Priority | Item | Notes |
|----------|------|-------|
| Eventual | Rapid7 role bullets | Add to experience.html once the role matures |
| Eventual | DFIR Work page | dfirwork.html is a "Cases coming soon" stub; now the headline project + featured on the GitHub README — fill when cases are ready |
| Future/fun | "B64" easter-egg button | Small near-hidden button by nav "About"; click → Base64-encode all homepage text in place (skip footer + JP quote); refresh restores it. Client-side only, no storage. Not yet approved to build. |
| Optional | `user-scalable=no` | Template viewport disables mobile pinch-zoom; remove if a11y matters to the user |

(Font overhaul — DONE in update#18, body font is now Inter.)

---

## Working notes for a new chat

- **Verify visually via the localhost preview, not screenshots** — the screenshot tool wedges after ~1 shot per server (restart the server for a fresh one). For layout checks prefer `preview_eval` measuring `getBoundingClientRect`/`getComputedStyle`. Chat image uploads fail in this env ("image processing unavailable"); to view a reference image, `WebFetch` it then `Read` the saved file.
- **Preview server**: there is no committed `.claude/launch.json`. Recreate it pointing at a static server (a PowerShell `HttpListener` script in the session scratchpad has been used) to run `preview_start`, then **delete it before committing**.
- **Cache-bust**: bump `?v=N` on `main.css` + `theme.css` across all 12 HTML (Git Bash `sed`) on every theme.css change. Favicon links have their own `?v=12`.
- **Commit**: `website update#N` only — nothing else. Next is `update#20`.
