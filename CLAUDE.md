# CLAUDE.md — TechWebsite.github.io

Personal cybersecurity portfolio for Lorenzo Bertini, hosted on GitHub Pages.
Template: HTML5 UP "Massively" (static HTML, no build step, no Node/SASS).

---

## Hard rules — read first

1. **CSS edits go in `assets/css/theme.css` ONLY.** Never touch `main.css` or any SASS file. `theme.css` is loaded after `main.css` and overrides it.
2. **Cache-bust on every CSS change.** All HTML files carry `main.css?v=N` and `theme.css?v=N`. Bump N across all 12 HTML files (Git Bash `sed`) whenever theme.css changes, or fixes will not appear on the live site.
3. **Use Git Bash (`sed`, `grep`) for any string substitution in HTML/CSS.** PowerShell emits curly quotes (U+201C/201D) into files, breaking CSS class selectors.
4. **Commit message format: `website update#N` — nothing else.** No body, no Co-Authored-By, no bullet points, no links.
5. **Current CSS cache version: `?v=11`** (pushed with update#14). Next CSS change → bump to `?v=12`.
6. **Next commit number: `update#15`.**

---

## Site structure

### Pages (12 HTML files)
| File | Body class | Purpose |
|------|-----------|---------|
| `index.html` | `is-preload` | Homepage — hero + project list |
| `elements.html` | `is-preload page-about` | About Lorenzo |
| `experience.html` | `is-preload` | Career timeline |
| `ablueteamwire.html` | `is-preload page-article` | Blue Team Toolkit write-up |
| `adhomelab.html` | `is-preload page-article` | Active Directory Homelab |
| `alabnessus.html` | `is-preload page-article` | Vulnerability Management Lab |
| `alabsentinel.html` | `is-preload page-article` | Azure Honeypot / Sentinel Lab |
| `ankistudy.html` | `is-preload page-article` | Language Learning / Anki |
| `athmwonderland.html` | `is-preload page-article` | Red Team: Wonderland CTF |
| `commontroubles.html` | `is-preload page-article` | Windows Troubleshooting |
| `dfirwork.html` | `is-preload page-article` | DFIR Work (professional) |
| `workinprogress.html` | `is-preload page-article` | Work in progress placeholder |

### Key assets
| File | Notes |
|------|-------|
| `assets/css/theme.css` | **THE** styling file — all custom CSS goes here |
| `assets/css/main.css` | Template base — do not edit |
| `images/logo-tek.svg` | Nav logo (27×27) — referenced in all 12 HTML files |
| `images/logo-tek-original.svg` | Backup of original logo — keep, not deployed |
| `images/hero-contours.svg` | Wave contour background for hero section |
| `images/wave-footer.svg` | Silver wave illustration in footer right panel |
| `images/favvicon/` | Favicon files (note: double-v typo in folder name — don't rename) |

---

## CSS architecture (theme.css sections)

- **§1** CSS variables / colour tokens
- **§2** Nav — brand, logo, icons
- **§3** Footer — wave SVG, Japanese quote
- **§4** Project list — `.project-list`, `.project-row`, `.project-section-label`
- **§5** About page — `.about-grid`, `.about-photo`, `.about-text`
- **§6** Experience page
- **§7** Hero (`#intro`) — wave band, frosted panel, animations, background
- **§8** Typography overrides
- **§9** Utility / misc
- **§10** Article pages (`body.page-article`) — column width, image sizing, captions

### Hero background (§7)
Currently set to **Wave Contours** (`images/hero-contours.svg` + diagonal dark gradient).
The **Aurora** alternative (off-centre blue/cyan glows) is kept as a comment block directly above the active `background:` rule — swap the two blocks to switch.

---

## Body class scoping

- `body.page-about` — targets About page only
- `body.page-article` — targets all 9 write-up pages
- No body class = homepage, experience, generic nav pages

---

## Deferred items (do NOT implement without explicit user request)

1. **Font overhaul** — current fonts: DM Sans (headings), Source Serif 4 (body), JetBrains Mono (typewriter accent). User wants a more professional body font eventually.
2. **Favicon** — done in update#10; favicon.ico + PNGs regenerated from logo-tek.svg wave design; SVG favicon added as primary link on all pages.
3. **Rapid7 role bullets** — experience.html Rapid7 entry has no bullets yet; user will add when the role matures.

---

## Commit history reference
- update#5 — nav logo fix, typewriter "&"→"and", About page layout
- update#6 — homepage project list redesign, footer wave, year badge, highlighted "Work projects"
- update#7 — hero banner option A (wave band), new logo, background fix
- update#8 — hero frosted panel redesign, wave contours bg, full QA pass, page titles, article column fix, image caption styles, hero reveal hardening
- update#9 — removed generic.html and 20 unused images; added CLAUDE.md and Handoff.md
- update#10 — removed dev scripts (.claude/serve.ps1, launch.json); new favicons (wave design from logo-tek.svg); SVG favicon link added to all 12 pages
- update#11 — updated CLAUDE.md and Handoff.md to reflect update#10 changes
- update#12 — hero rework: smaller headline/typewriter, wave band pushed below nav, animated contour background, favicon cache-bust (?v=10), side wave design (hero-wave-side.svg), MDR Analyst–Rapid7 badge, zoom fix (single root font-size), frosted panel removal, alignment fix; CSS v11
- update#13 — removed hero-wave-side.svg side waves (clutter); deleted temp .claude/launch.json
- update#14 — hero tweaks batch: badge no dot / dash / bigger, alignment fix, wave band cross-parallax; all sessions changes committed and pushed
