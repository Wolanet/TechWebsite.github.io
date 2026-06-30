# Handoff — TechWebsite.github.io

Last updated: 2026-06-30 | Last pushed: update#10 (commit `0c997eb`) | Next commit: `update#11`

---

## What the site is

Personal cybersecurity portfolio for Lorenzo Bertini (GitHub: Wolanet).
Hosted at `TechWebsite.github.io` via GitHub Pages.
Base template: HTML5 UP "Massively" — static HTML, no build pipeline.

---

## What was done (update#5 → update#9)

### update#5
- Fixed nav logo overlapping social icons (brand moved to normal flow, icons made a proper flex row)
- Replaced `&` with `and` in hero typewriter roles
- Restyled typewriter line: JetBrains Mono, blue→cyan gradient
- About page restructured to flex grid: photo left (320px), text vertically centred

### update#6
- Homepage project list redesigned as clean vertical list with icon thumbnails
- Added year badge "2023–2024" pill next to "Personal projects & labs"
- Highlighted "Work projects" label (accent blue, glowing dot)
- Enlarged all project row elements
- Added stylized silver wave illustration to footer right panel (`images/wave-footer.svg`)
- Japanese quote: single line, bold idiom, inline muted attribution

### update#7
- Hero banner: layered parallax wave band (3 animated SVG layers, `.hero-waves`)
- New logo designed and centralized: `images/logo-tek.svg` (gradient badge + cresting wave curl)
- Original logo preserved at `images/logo-tek-original.svg`
- Hero background "light circle" removed; `.hero-orb` set to `display:none`
- Frosted glass panel (`.hero-inner`) added around headline + typewriter
- `// Security Operations` kicker removed entirely

### update#8
- Hero panel redesigned: borderless frosted halo, edges feathered via CSS `mask` radial-gradient (no visible rectangle or corner marks)
- Hero background → **Wave Contours**: `images/hero-contours.svg` (faint flowing lines) + diagonal dark gradient; **Aurora** (off-centre blue/cyan glows) kept as commented fallback in theme.css §7
- All 9 project/article pages fixed with `body.page-article`: `max-width: 52rem` column so text fills ~half page and aligns with title; images no longer upscale (`width: auto; max-width: 100%; max-height: 80vh`)
- Full text sweep: fixed G→i corruption in `alabsentinel.html`; casing and typo fixes across all other pages
- Meaningful `<title>` tags on all pages (were all "Tek Tsunami")
- Bare image captions wrapped in `<p class="img-caption">` + styled (italic, muted)
- Hero reveal animation hardened: hidden state scoped to `body.is-preload`; fill-mode `both`
- CSS cache bumped to `?v=8`

### update#9
- Removed `generic.html` (no links pointing to it anywhere)
- Removed 20 unused images: `pic01–09.jpg` (template defaults), `JPneon.jpg`, `aboutme1.jpg`, `ankilanguage.jpg`, `azuresentinel.jpg`, `directory.jpg`, `harddisk3.jpg`, `scripts.jpg`, `securitymng.jpg`, `devops.png`
- All JS scripts verified in use — none removed
- Added `CLAUDE.md` (auto-loaded context for Claude Code) and `Handoff.md` (this file)

### update#10
- Removed `.claude/serve.ps1` and `.claude/launch.json` (local dev helpers, no longer needed)
- Regenerated all three favicon files (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`) in `images/favvicon/` — wave badge design matching `logo-tek.svg` (dark background, rounded rect border, two wave paths, foam dot)
- Added `<link rel="icon" type="image/svg+xml" href="images/logo-tek.svg">` as the primary favicon link on all 12 HTML files, before the ICO/PNG fallbacks

---

## Current site state

### Hero (`index.html #intro`)
- Background: `hero-contours.svg` (faint wave contour lines) + diagonal dark gradient (`#111827` → `#080c12`)
- Wave band: 3 layered animated SVG paths (`.hero-waves`, `.hero-wave-layer hw1/hw2/hw3`) — 10s/16s/23s drift
- Frosted panel: `.hero-inner` — `::before` with `radial-gradient` mask feathering; no border/corners
- Headline: `Cybersecurity / Lorenzo` (h1, 3.6rem)
- Divider: 90px gradient line (`.hero-divider`)
- Typewriter: `Detection and Response` / `Digital Forensics and Incident Response` / `Threat Hunting` / `Blue Team Operations`
- Reveal: opacity-0 scoped to `body.is-preload` only; `fadeIn` + `revealUp` animations with `fill-mode: both`

### Nav
- Brand: `images/logo-tek.svg` (27×27) + "Tek Tsunami" wordmark (normal flow, not absolutely positioned)
- Icons: LinkedIn + GitHub, `display:flex; justify-content:flex-end` — pinned far right, no overlap
- Links: Home / Experience / About

### Footer (all pages)
- Left panel: Japanese quote `千里の道も一歩から ― 老子` (bold idiom, muted inline attribution)
- Right panel: `wave-footer.svg` silver Hokusai-style wave via `#footer::after` CSS (opacity 0.6, right ~34% of panel)
- Right panel: Social icons (LinkedIn, GitHub)

### Project list (`index.html`)
- **Work projects**: DFIR Work (1 entry, primary label with accent-blue dot)
- **Personal projects & labs 2023–2024**: 9 entries with icon thumbs

### About page (`elements.html`)
- `/About` section label (0.78rem — matches `/Experience`)
- `Lorenzo Bertini` h1
- `.about-grid` flex layout: `images/aboutme3.jpg` photo (320px) left, text vertically centred right

### Experience page (`experience.html`)
- `/Experience` section label
- `Career timeline` h1
- Timeline entries; Rapid7 entry has no bullets (pending role maturation)

### Article pages (9 files: `ablueteamwire`, `adhomelab`, `alabnessus`, `alabsentinel`, `ankistudy`, `athmwonderland`, `commontroubles`, `dfirwork`, `workinprogress`)
- All have `body.page-article` class
- `max-width: 52rem` column, left-aligned, matching title edge
- Images: `width: auto; max-width: 100%; max-height: 80vh` — no upscaling
- Captions: `<p class="img-caption">` (italic, muted, small)

---

## File inventory (active files only)

```
index.html               elements.html            experience.html
ablueteamwire.html       adhomelab.html           alabnessus.html
alabsentinel.html        ankistudy.html           athmwonderland.html
commontroubles.html      dfirwork.html            workinprogress.html

assets/css/theme.css     ← only CSS file to edit
assets/css/main.css      ← template base, do not touch
assets/css/noscript.css
assets/css/fontawesome-all.min.css
assets/js/               ← all 7 JS files in use (jQuery + template core)

images/logo-tek.svg              ← nav logo (all 12 pages)
images/logo-tek-original.svg     ← backup, not deployed
images/hero-contours.svg         ← hero background (via theme.css)
images/wave-footer.svg           ← footer wave (via theme.css)
images/overlay.png               ← body overlay texture (via main.css)
images/aboutme3.jpg              ← About page photo
images/anki1.jpg  anki2.jpg      ← Anki article images
images/favvicon/                 ← favicon files (double-v typo — don't rename)
images/activedlab/               ← AD homelab images
images/labnessus/                ← Nessus lab images
images/labsentinel/              ← Sentinel lab images
images/troubleshoot/             ← Windows troubleshooting images
images/wonderland/               ← Wonderland CTF images
images/zwire/                    ← Blue Team Toolkit images
```

---

## Pending items

| Priority | Item | Notes |
|----------|------|-------|
| Low | Font overhaul | Current: DM Sans / Source Serif 4 / JetBrains Mono. User wants a more professional body font. |
| Eventual | Rapid7 bullets | Add role bullets to experience.html once the role matures |

---

## Key technical constraints

- **No build step** — pure static HTML/CSS/JS, GitHub Pages serves directly
- **CSS edits: `assets/css/theme.css` only** — never `main.css`
- **Cache-bust** — bump `?v=N` on all 12 HTML files via Git Bash `sed` every time theme.css changes; current version: `?v=8`
- **Git Bash for sed/grep** — PowerShell inserts curly quotes (U+201C/201D), breaking CSS selectors
- **Commit format** — `website update#N` only — no body, no bullet points, no Co-Authored-By, no links
- **Next commit** — `website update#10`; bump CSS to `?v=9` if theme.css changes
