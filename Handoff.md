# Handoff — TechWebsite.github.io

Last updated: 2026-07-02 | Last pushed: `update#26` | Next commit: `update#27` | CSS cache: `?v=20`

> Quick-start companion to `CLAUDE.md`. Read `CLAUDE.md` first for the hard rules
> (CSS goes in theme.css only, cache-bust on every CSS change, Git Bash for sed,
> commit format `website update#N`). This file describes the **current state** so a
> new chat can orient fast. The full per-commit history lives in `CLAUDE.md`.

---

## What the site is

Personal cybersecurity portfolio for **Lorenzo Bertini** (GitHub: Wolanet), hosted at
`TechWebsite.github.io` via GitHub Pages. Base template: HTML5 UP "Massively" —
static HTML, **no build pipeline** (no Node/SASS/bundler — the `assets/sass/`
template source was removed as unused in update#25). Edits are hand-written
HTML + a single override stylesheet.

---

## Current state (as of update#26)

### Fonts
- **DM Sans** — headings + hero headline/typewriter/badge (`--font-heading`)
- **Source Sans 3** — all body, project descriptions and write-up text (`--font-body`). History: Source Serif 4 → Inter (update#18) → Source Sans 3 (update#20, fixed uneven word-spacing on About)
- **JetBrains Mono** — mono accents only: section labels, role-meta, scroll cue, nav links (`--font-mono`)
- **Klee One / Shippori Mincho** — Japanese footer quote (`--font-jp`)
- All loaded via two `@import` lines at the top of `theme.css`.

### Hero (`index.html #intro`) — theme.css §7
- Backdrop: diagonal dark gradient (`#111827` → `#080c12`).
- **Animated contour field**: `.hero-contours` → two `.hero-contour-layer` spans (hcA/hcB) drifting opposite directions (`hero-contours.svg` tiled).
- **Wave band** below the nav (`top:84px`): 3 layered SVG paths `.hero-wave-layer hw1/hw2/hw3`. hw1 (top, most coloured) has organic varied amplitude/wavelength; hw2 drifts the opposite way (cross-parallax).
- **Headline** `Cybersecurity / Lorenzo` (h1, **3.5rem**, enlarged in update#22) — plain on the backdrop, **no frosted panel**. Slash in accent.
- Divider: 90px gradient line. **Typewriter** sub-line (**1.9rem**, DM Sans, **white** text — changed from solid blue in update#22, caret stays blue) cycling roles: "Detection and Response" / "Forensics and Incident Response" / "Threat Hunting" / "Blue Team Operations".
- Clicking the **b64 button** (see Nav below) flips the typewriter to a rotating "doom" phrase set ("AI is taking over" / "Skynet does not forgive" / "If you're reading this, it's too late") until refresh.
- **Role badge** `.hero-now`: plain text "MDR Analyst – Rapid7" (no pill/border), white label + accent company name, absolutely positioned in the lower third (~`bottom:17%`), links to experience.html.
- **Scroll cue** `.hero-scroll`: animated chevron only.
- Reveal: opacity-0 scoped to `body.is-preload`; `fadeIn`/`revealUp` with `fill-mode:both`. `prefers-reduced-motion` fully handled.

### Nav (all pages)
- Brand `images/logo-tek.svg` (27×27 rounded-rect wave mark) + "Tek Tsunami" wordmark, centered in normal flow.
- Links styled like the section labels: **JetBrains Mono, uppercase, with a `/` prefix** (`::before`) → `/HOME` `/EXPERIENCE` `/ABOUT`. Base colour `--text` (matches the "/Experience" label), current-page link white + accent underline, hover brightens to blue. (update#24)
- Icons LinkedIn + GitHub pinned far right. **Homepage only**: a small blue **"b64" button** sits just before the icons (small gap before LinkedIn) — see below.

### "b64" easter egg (homepage only) — theme.css §11 + `assets/js/site.js`
- Click cycles the page's visible text through **Base64 → Hex → ROT13** (button label always shows the *next* encoding); a toast announces the active cipher.
- Excludes the footer, the Japanese quote, and the button itself. Text nodes are rewritten in place (never `innerHTML`), so nothing breaks.
- First click also switches the hero typewriter to the "doom" phrase set (see Hero above).
- No persistence — refresh restores everything to normal.

### Footer (all pages) — theme.css §9
- Left: Japanese quote `千里の道も一歩から ― 老子`. Attribution is the **same size** as the quote (1.22rem).
- Right: **Hokusai line-art cresting wave** `images/wave-footer-jp.svg` via `#footer::after` (opacity 0.62, right ~38%).
- Social icons (LinkedIn, GitHub).

### Project list (`index.html`) — theme.css §4
- **Work projects**: DFIR Work (primary label, accent-blue glowing dot).
- **Personal projects & labs 2023–2024**: 9 entries with Font Awesome icon thumbs (`workinprogress.html` was never listed here — its removal doesn't affect this list).
- Section labels enlarged to 0.8rem; year badge at 1em.

### About (`elements.html`) / Experience (`experience.html`)
- About: `/About` label, `.about-grid` (photo `aboutme3.jpg` left, text right). Copy reworded for grammar/flow in update#23 (same content, more professional).
- Experience: `Career timeline`, 3 roles. Rapid7 entry has **3 bullets** (added update#23 — detection & response / DFIR / customer reporting + detection tuning).

### Article / write-up pages (8 files, `body.page-article`) — theme.css §10
- Single `max-width: 52rem` column, **justified** body text, title-aligned. Justification is driven entirely by CSS (`#main p` base rule + `body.page-article`/`body.page-about` overrides) — the inline `align="justify"` HTML attribute was removed site-wide in update#25 as redundant/deprecated; no visual change.
- Images never upscale (`width:auto; max-width:100%; max-height:80vh`); captions `<p class="img-caption">` (italic, muted). All content screenshots now carry descriptive `alt` text (added update#25 — previously empty).
- `dfirwork.html` is an intentional stub ("Cases coming soon" — professional cases pending).

### Favicon
- `images/logo-tek-favicon.svg` — **full-bleed square** variant (no rounded corners → no transparent tab "tips"). Plus regenerated `favvicon/favicon.ico` + 16/32 PNGs from the same square design. All favicon links carry `?v=12`.
- Nav still uses the rounded `logo-tek.svg`.

### Security / accessibility hygiene
- Strict **Content-Security-Policy** + **Referrer-Policy** `<meta>` on all pages (update#20); all inline JS moved to `assets/js/site.js` so `script-src 'self'` holds.
- `<html lang="en">` on all 11 pages. Every external `target="_blank"` link carries `rel="noopener"`.
- `prefers-reduced-motion` respected throughout the hero.
- `user-scalable=no` **removed** from the viewport meta on all pages (update#25) — mobile pinch-zoom now works.
- All 12 page meta descriptions are unique (update#25) — previously 8 pages shared one generic description.

---

## File inventory (active files)

```
11 HTML pages: index, elements (About), experience, + 8 page-article write-ups
  (ablueteamwire, adhomelab, alabnessus, alabsentinel, ankistudy,
   athmwonderland, commontroubles, dfirwork)
  — workinprogress.html removed in update#25 (orphan, never linked)

assets/css/theme.css      ← ONLY css file to edit (override layer, loaded after main.css)
assets/css/main.css       ← template base, DO NOT edit
assets/css/noscript.css, fontawesome-all.min.css
assets/js/                ← 7 template JS files + site.js (custom), all in use
assets/sass/               ← REMOVED in update#25 (unused template source, main.css never rebuilt from it)

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
| Eventual | DFIR Work page | dfirwork.html is a "Cases coming soon" stub; now the headline project + featured on the GitHub README — fill when cases are ready |

(Font overhaul — DONE, body font is now Source Sans 3. "B64" easter-egg button — DONE, built update#20–22. `user-scalable=no` — DONE, removed update#25.)

---

## Working notes for a new chat

- **Verify visually via the localhost preview, not screenshots** — the screenshot tool wedges after ~1 shot per server (restart the server for a fresh one). For layout checks prefer `preview_eval` measuring `getBoundingClientRect`/`getComputedStyle`. Chat image uploads fail in this env ("image processing unavailable"); to view a reference image, `WebFetch` it then `Read` the saved file.
- **Preview server**: there is no committed `.claude/launch.json`. Recreate it pointing at a static server (a PowerShell `HttpListener` script in the session scratchpad has been used) to run `preview_start`, then **delete it before committing**.
- **Cache-bust**: bump `?v=N` on `main.css` + `theme.css` + `site.js` across all HTML (Git Bash `sed`) on every theme.css/site.js change. Favicon links have their own `?v=12`.
- **Commit**: `website update#N` only — nothing else. Next is `update#27`.
