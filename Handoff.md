# Handoff — TechWebsite.github.io

Last updated: 2026-06-30 | Last pushed: update#8 (commit `2a9cc12`)

---

## What the site is

Personal cybersecurity portfolio for Lorenzo Bertini (GitHub: Wolanet).
Hosted at `TechWebsite.github.io` via GitHub Pages.
Base template: HTML5 UP "Massively" — static HTML, no build pipeline.

---

## What was done (update#5 → update#8)

### update#5
- Fixed nav logo overlapping social icons (brand moved to normal flow, icons made a proper flex row)
- Replaced `&` with `and` in hero typewriter roles
- Restyled typewriter line: JetBrains Mono, blue→cyan gradient
- Enlarged + glowed the `// Security Operations` kicker (later removed in update#7)
- About page restructured to flex grid: photo left (320px), text vertically centred

### update#6
- Homepage project list redesigned as clean vertical list with thumbnails/icons
- Added year badge "2023–2024" pill next to "Personal projects & labs"
- Highlighted "Work projects" label (accent blue, glowing dot)
- Enlarged all project row elements
- Added stylized silver wave illustration to footer right panel (`images/wave-footer.svg`)
- Japanese quote made single line, bold idiom, inline attribution

### update#7
- Hero banner: Option A implemented — layered parallax wave band (3 animated SVG layers)
- New logo designed and centralized: `images/logo-tek.svg` (gradient badge + cresting wave)
- Hero background "light circle" replaced; `.hero-orb` disabled
- Frosted glass panel (`hero-inner`) added around headline + typewriter
- `// Security Operations` kicker removed entirely
- Hero headline: `Cybersecurity / Lorenzo`, typewriter below it

### update#8
- Hero panel fully redesigned: borderless frosted halo, edges feathered via CSS `mask` radial-gradient (no visible rectangle/corners)
- Hero background changed to **Wave Contours** (faint flowing lines SVG + diagonal dark gradient); Aurora kept as commented fallback in theme.css §7
- `.hero-orb` removed (`display:none`)
- All 9 project/article pages fixed: `body.page-article` class + CSS `max-width:52rem` column so text fills ~half page and aligns with title; images no longer upscale
- Full text sweep: fixed G→i corruption in `alabsentinel.html`, casing and typo fixes across all other pages
- Meaningful `<title>` tags on all pages (were all "Tek Tsunami")
- Bare image captions wrapped in `<p class="img-caption">` + styled
- Hero reveal animation hardened: hidden state scoped to `body.is-preload`, fill-mode `both`
- CSS cache bumped to `?v=8`

### update#9 (this session, not yet committed)
- Removed `generic.html` (was unused, no nav link, no references anywhere)
- Removed 20 unused images: `JPneon.jpg`, `aboutme1.jpg`, `ankilanguage.jpg`, `azuresentinel.jpg`, `directory.jpg`, `harddisk3.jpg`, `scripts.jpg`, `securitymng.jpg`, `devops.png`, `pic01–09.jpg`
- Added `CLAUDE.md` and `Handoff.md`

---

## Current site state

### Hero (index.html `#intro`)
- Background: `hero-contours.svg` + diagonal dark gradient
- Wave band: 3 layered SVG paths (`.hero-waves`, `.hero-wave-layer hw1/hw2/hw3`)
- Frosted panel: `.hero-inner` with `::before` radial-gradient mask feathering
- Headline: `Cybersecurity / Lorenzo` (3.6rem)
- Divider: 90px gradient line
- Typewriter: `Detection and Response`, `Digital Forensics and Incident Response`, `Threat Hunting`, `Blue Team Operations`

### Nav
- Brand: `images/logo-tek.svg` (27×27) + "Tek Tsunami" wordmark
- Icons: LinkedIn + GitHub, pinned far right
- Links: Home / Experience / About

### Footer
- Left panel: Japanese quote `千里の道も一歩から ― 老子` (bold idiom, muted attribution)
- Right panel: `wave-footer.svg` silver wave illustration (opacity 0.6)
- Right panel: Social icons (LinkedIn, GitHub)

### Project list (index.html)
- Work projects: DFIR Work (1 entry, no year badge)
- Personal projects & labs 2023–2024: 9 entries with icon thumbs

### About page (elements.html)
- `/About` section label + `Lorenzo Bertini` h1
- `.about-grid` flex: photo (320px) left, text vertically centred right
- Cert badges, education, language skills

### Experience page (experience.html)
- `/Experience` section label + `Career timeline` h1
- Timeline entries; Rapid7 entry has no bullets yet (pending role maturation)

### Article pages (9 files)
- `body.page-article` class on all
- `max-width: 52rem` column, left-aligned, matches title edge
- Images: `width: auto; max-width: 100%; max-height: 80vh` (no upscaling)
- Captions: `<p class="img-caption">` (italic, muted)

---

## Pending items

| Priority | Item | Notes |
|----------|------|-------|
| Low | Favicon update | Replace placeholder in `images/favvicon/`; derive from `logo-tek.svg` |
| Low | Font overhaul | Current: DM Sans / Source Serif 4 / JetBrains Mono. User wants more professional body font. |
| Eventual | Rapid7 bullets | Add role bullet points to experience.html once the role matures |
| Cleanup | Dev scripts | Remove `.claude/serve.ps1` and `.claude/launch.json` when done |

---

## Key technical constraints

- **No build step** — pure static HTML/CSS/JS
- **CSS edits: `assets/css/theme.css` only** — never `main.css`
- **Cache-bust** — bump `?v=N` on all 13 HTML files via Git Bash `sed` every time theme.css changes
- **Git Bash for sed/grep** — PowerShell inserts curly quotes (U+201C/201D), breaking CSS
- **Commit format** — `website update#N`, nothing else
- **Next commit** — will be `website update#9`; CSS version will be `?v=9` if theme.css changes
