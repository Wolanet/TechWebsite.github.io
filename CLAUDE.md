# CLAUDE.md — TechWebsite.github.io

Personal cybersecurity portfolio for Lorenzo Bertini, hosted on GitHub Pages.
Template: HTML5 UP "Massively" (static HTML, no build step, no Node/SASS).

---

## Hard rules — read first

1. **CSS edits go in `assets/css/theme.css` ONLY.** Never touch `main.css` or any SASS file. `theme.css` is loaded after `main.css` and overrides it.
2. **Cache-bust on every CSS/JS change.** All HTML files carry `main.css?v=N`, `theme.css?v=N` and `site.js?v=N`. Bump N across all HTML files (Git Bash `sed`) whenever theme.css OR site.js changes, or fixes will not appear on the live site.
3. **Use Git Bash (`sed`, `grep`) for any string substitution in HTML/CSS.** PowerShell emits curly quotes (U+201C/201D) into files, breaking CSS class selectors.
4. **Commit message format: `website update#N` — nothing else.** No body, no Co-Authored-By, no bullet points, no links.
5. **Current CSS cache version: `?v=25`** (theme.css changed for update#31 — removed the Google Fonts `@import`, then fixed the mobile nav-panel font/colour leak). Next CSS/JS change → bump to `?v=26`.
6. **Next commit number: `update#31`.**
7. **A branded OG share image exists: `images/og-share.png`** (1200×630, generated via .NET GDI+ — see update#27). If the brand/palette ever changes, regenerate it to match; it's referenced by `og:image`/`twitter:image` on all 11 content pages (`404.html` is `noindex` and intentionally has no OG/canonical tags).
8. **`oxipng` is installed** (winget, `Shssoichiro.Oxipng`) for lossless PNG recompression — use it on any new/replaced screenshot before committing (`oxipng -o 4 --strip safe <file>`).
9. **12 pages now, not 11** — `404.html` was added in update#28 (GitHub Pages serves it automatically on any 404). It carries `noindex, nofollow` and is intentionally excluded from `sitemap.xml`.
10. **`images/apple-touch-icon.png`** (180×180) exists for mobile home-screen icons — rasterized from `logo-tek-favicon.svg` via a browser canvas (no SVG rasterizer is installed locally; GDI+/System.Drawing cannot read SVG or WebP). Regenerate the same way if the favicon design changes.
11. **CSP `script-src` allows exactly one inline script**, via a `sha256-` hash — the JSON-LD Person block on `index.html`. If that block's content ever changes, the hash MUST be recomputed (`openssl dgst -sha256 -binary <extracted-content> | openssl base64`) or the page will silently fail to render the structured data (CSP blocks it, no visible error to the user, only a console CSP violation).

---

## GitHub profile README (separate repo — NOT part of this site)

Lorenzo also has a GitHub profile README at **`https://github.com/Wolanet/Wolanet`** (the special `username/username` repo — its `README.md` renders on his GitHub profile page). This is a **different repo** from `TechWebsite.github.io`, with its own commit history and no cache-busting/version rules.

- **Local reference copy**: `@ThePATH/@IT path/Github/README-Profile.md` (one level up from this repo, sibling to `TechWebsite.github.io/`). This is a plain file, **not a git clone** — keep it in sync manually after every edit, but it is not the source of truth.
- **To edit it**: `git clone https://github.com/Wolanet/Wolanet.git` into a scratch/temp folder (credentials are cached, clone/push work without extra auth), edit `README.md` there, `git add` + `git commit` (a normal descriptive message — the `website update#N` format is only for the TechWebsite repo) + `git push origin main`. Then mirror the same edit into the local `README-Profile.md` reference copy.
- Content: header with name/title, LinkedIn + tektsunami.com links at the top, About blurb, tools/tech badges, Portfolio (Featured: DFIR Work; Projects & Labs list linking to write-ups on tektsunami.com and GitHub repos), Certifications, Language Learning section, profile-view counter badge.
- **2026-07-02 edit**: removed the redundant `### Contact` section (LinkedIn/website already linked at top) and changed the DFIR Work featured link from a raw pasted URL (`[tektsunami.com/dfirwork.html](...)`) to clean link text (`[link](...)`).

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
| `404.html` | `is-preload page-404` | Custom 404 — served automatically by GitHub Pages; `noindex, nofollow`, excluded from sitemap.xml |

(`workinprogress.html` removed in update#25 — unused/orphan placeholder page, never linked from anywhere.)

### Key assets
| File | Notes |
|------|-------|
| `assets/css/theme.css` | **THE** styling file — all custom CSS goes here |
| `assets/css/main.css` | Template base — do not edit |
| `images/logo-tek.svg` | Nav logo (27×27, rounded-rect card) — referenced in all 12 HTML files |
| `images/logo-tek-favicon.svg` | Favicon variant — full-bleed square (no rounded corners) so it fills the browser tab with no transparent corner tips; `favvicon/` rasters regenerated from it |
| `images/logo-tek-original.svg` | Backup of original logo — keep, not deployed |
| `images/hero-contours.svg` | Wave contour background for hero section |
| `images/wave-footer-jp.svg` | Japanese Hokusai-style line-art cresting wave in the footer right panel (replaced the old silver `wave-footer.svg` in update#18) |
| `images/favvicon/` | Favicon files (note: double-v typo in folder name — don't rename) |
| `images/og-share.png` | Branded 1200×630 social-share card (og:image/twitter:image on all pages), generated via .NET GDI+ — see update#27 |
| `sitemap.xml` | Lists all 11 pages for search engines — add new pages here |
| `robots.txt` | Allow-all, points to sitemap.xml |

---

## CSS architecture (theme.css sections)

- **§1** CSS variables / colour tokens
- **§2** Nav — brand, logo, icons
- **§3** Footer — wave SVG, Japanese quote
- **§4** Project list — `.project-list`, `.project-row`, `.project-section-label`
- **§5** About page — `.about-grid`, `.about-photo`, `.about-text`
- **§6** Experience page
- **§7** Hero (`#intro`) — wave band, animated contour background, headline, typewriter, role badge, scroll cue, reveal animations
- **§8** Typography overrides
- **§9** Utility / misc
- **§10** Article pages (`body.page-article`) — column width, image sizing, captions
- **§11** "b64" easter-egg — near-hidden nav button (`.b64-btn`) + encoding toast (`.b64-toast`); homepage only, driven by `assets/js/site.js`
- **§12** 404 page (`body.page-404`) — centers the `.post.featured` message block from main.css

### Hero background (§7)
Currently set to **Wave Contours** (`images/hero-contours.svg` + diagonal dark gradient).
The **Aurora** alternative (off-centre blue/cyan glows) is kept as a comment block directly above the active `background:` rule — swap the two blocks to switch.

---

## Body class scoping

- `body.page-about` — targets About page only
- `body.page-article` — targets all 8 write-up pages
- `body.page-404` — targets the 404 page only
- No body class = homepage, experience, generic nav pages

---

## Deferred items (do NOT implement without explicit user request)

1. **Font overhaul** — DONE in update#18, body font later swapped again in update#20. Current fonts: DM Sans (headings), **Source Sans 3 (body)** — first swapped from Source Serif 4 to Inter (update#18), then Inter → Source Sans 3 (update#20, fixed uneven word-spacing), JetBrains Mono (mono accents only). `--font-body` in §1 drives all body/description/write-up text.
2. **Favicon** — done in update#10; favicon.ico + PNGs regenerated from logo-tek.svg wave design; SVG favicon added as primary link on all pages.
3. **Rapid7 role bullets** — DONE in update#23. Three bullets added (detection & response / DFIR / customer reporting + detection tuning); no InsightIDR or threat-hunting claims per user.
4. **DFIR Work project page** — `dfirwork.html` is a "Cases coming soon" stub; user will fill it with professional DFIR cases when ready. It is now the headline/main project (also featured on the GitHub profile README).
5. **"B64" homepage easter-egg button** — DONE (built update#20, polished update#21–#22). Small blue button in the nav, next to the social icons. Cycles Base64 → Hex → ROT13 on click (button label always shows the NEXT encoding), shows a toast, and switches the hero typewriter to a rotating "doom" phrase set. Excludes the footer + Japanese quote + the button itself. Client-side only, no storage — refresh reverts everything. See theme.css §11 + `assets/js/site.js`.
6. **Hero side-fill ideas (pixel-art fisherman, etc.)** — PLANNED ONLY, not implemented. User flagged the hero as feeling empty on the left/right sides around the centered headline on wide viewports. Full plan (fisherman/fishing-line concept, technical approach, alternates, recommended pairing) lives in `Handoff.md` → "Pending / deferred" table. Do not build any of this without explicit go-ahead.
7. **Hero headline overlay — masked/hooded figure** — PLANNED ONLY, not implemented. User wants an anonymous masked-face + hoodie figure (face hidden, only lower face/neck visible) positioned directly above "Cybersecurity / Lorenzo", colour-matched to the site palette and blended (soft edge fade) rather than looking pasted on. Full plan lives in `Handoff.md` → "Pending / deferred". Do not build without explicit go-ahead.

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
- update#15 — side waves removed; hero text all unified to heading font (typewriter + badge); badge → plain text (no pill/border), white label, accent Rapid7, moved to lower third; "View my work" text removed (arrow only); square full-bleed favicon (logo-tek-favicon.svg + regenerated rasters) to kill tab corner tips; top wave (hw1) given organic amplitude/wavelength variance; Japanese quote author enlarged to match quote; body copy justified (About + write-ups); CSS v12
- update#16 — project section labels enlarged (0.8rem; years 1em); typewriter colour changed from blue→cyan gradient to solid accent #58a6ff (matches Rapid7 highlight); removed trailing "[...] more examples will follow" placeholder from commontroubles.html; CSS v13
- update#17 — typewriter sub-line enlarged (1.45rem); nav links (Home/Experience/About) bolder + brighter (weight 600, --text colour, 0.86rem) so they stand out; CSS v14
- update#18 — body font Source Serif 4 → Inter site-wide (project descriptions + write-ups + About); footer wave replaced with Hokusai line-art design (wave-footer-jp.svg, dots removed, foam curls + rake lines), old wave-footer.svg deleted; CSS v15
- update#19 — final QA pass: added `lang="en"` to all pages and `rel="noopener"` to every external `target="_blank"` link; removed dead `.hero-orb` CSS rule; deleted 5 unused images (zwire/wire0.png + background-IMG/bg,bg2,bg43,bg44.jpg); refreshed CLAUDE.md + Handoff.md; CSS v16
- update#20 — alabnessus.html: removed poorly-rendered `nessusX1.png` image + cleaned the surrounding intro text / Tools list; body font Inter → **Source Sans 3** (fixes uneven word-spacing on About); hero enlarged (headline 2.75→3.5rem, typewriter 1.45→1.9rem) and typewriter text now **white** (caret stays blue); ankistudy.html title pipes removed (→ "How to learn any language: Anki + Immersion"); **security hardening** — strict CSP + Referrer-Policy `<meta>` on all 12 pages, all inline JS moved to `assets/js/site.js` so `script-src 'self'` holds; new **"b64" easter-egg** button (Base64→Hex→ROT13 cycle w/ toast, excludes footer + JP quote, refresh restores) — theme.css §11 + site.js; CSS v17
- update#21 — "b64" easter-egg polish: encoded text now **wraps inside the project cards** instead of overflowing (`body.b64-on` wrap rules, theme.css §11); the nav button **label updates to the active encoding** (b64 → hex → rot13) on each click; button **restyled** — solid accent-blue, bold, smaller, de-templated (overrode main.css `button { color:#212931 !important; height:3rem; box-shadow }` leaks with `!important` + `height:auto` + `box-shadow:none`); `site.js` now cache-busted with `?v=18` alongside the CSS; CSS v18
- update#22 — b64 round 2: button **moved to the right** (first item in the social-icons group, small gap before LinkedIn), **enlarged** (0.5→0.7rem), and its label now shows the **NEXT** encoding on each click (fixes the "1-behind" lag); clicking any encoder now flips the hero typewriter to a rotating **"doom" phrase set** ("AI is taking over" / "Skynet does not forgive" / "If you're reading this, it's too late"), reverting on refresh (`hero.setDoom()` in site.js); hero normal phrase "Digital Forensics…" → **"Forensics and Incident Response"**; nav links (Home/Experience/About) redesigned — brighter (`--heading`), nudged toward centre (`padding-left:2rem`), hover now **blue text, no box** (like the social icons); CSS v19
- update#23 — content only (no CSS): added 3 bullets to the **Rapid7** role in experience.html (detection & response / DFIR / customer reporting + detection tuning); reworded the **About** section (elements.html) for grammar/flow — same content, more professional. HTML-only, cache stays v19
- update#24 — nav links (Home/Experience/About) restyled to match the **"/Experience" section-label** look: JetBrains Mono, uppercase, with a `/` prefix via `::before` (→ `/HOME` `/EXPERIENCE` `/ABOUT`); base colour set to `--text` (light grey) to match the label exactly (note: the label itself is `--text`, not accent — `#main p` overrides its intended accent), current-page link stays white + accent underline, hover brightens to blue; CSS v20
- update#25 — full site QA pass (content/HTML only, no CSS/JS changes, cache stays v20): fixed typos and double-spaces (ablueteamwire.html, adhomelab.html); replaced inconsistent katakana "ー" bullet markers with em dash to match the rest of the doc (ablueteamwire.html, athmwonderland.html); trimmed stray leading/trailing whitespace inside heading tags (alabsentinel.html, athmwonderland.html, commontroubles.html); fixed invalid `<ul>`-inside-`<p>` nesting that was silently dropping paragraph styling on affected text (ablueteamwire.html, adhomelab.html, alabsentinel.html); gave all 8 pages that shared the generic homepage meta description a unique, content-specific one (SEO); removed the deprecated `align="justify"` HTML attribute site-wide (~98 occurrences) — text stays justified everywhere via the existing `theme.css` rules (`#main p` base rule + `body.page-article`/`body.page-about` overrides), so no visual change; removed `user-scalable=no` from the viewport meta on all pages, restoring mobile pinch-zoom; added descriptive `alt` text to all 85 content screenshots across the write-ups (previously empty, verified via image-viewing subagents); deleted the unused/orphan `workinprogress.html` page (never linked from anywhere), the orphaned `images/labnessus/nessusX1.png`, and the unused `assets/sass/` template source (31 files, dead weight since main.css is never rebuilt from it)
- update#26 — CLAUDE.md + Handoff.md housekeeping only (no site files changed): synced commit/cache counters after update#25 actually pushed; confirmed update#25's alt-text and structural fixes with a full non-agent re-verification pass (tag balance, meta uniqueness, deleted-file checks, live-preview DOM check on the `ablueteamwire.html` `<ul>`/`<p>` fix) before committing
- update#27 — full QA pass #3, three parts:
  **(A) fixes**: removed leftover `<!-- comments here -->` placeholder comment from `index.html`; fixed double-space typos (ablueteamwire.html, ankistudy.html, tcpdump command example); deleted the empty/unused `projectsIX/` directory (untracked, 2023 leftover); discovered and fixed `images/troubleshoot/bsod-error.png` — it was actually a WebP file mislabeled with a `.png` extension (found because `oxipng` rejected it) — renamed to `.webp` and updated the reference in `commontroubles.html`.
  **(B) SEO**: added `rel="canonical"` to all 11 pages; added full Open Graph + Twitter Card meta tags (title/description/image/url/site_name) to all 11 pages, backed by a new branded share image `images/og-share.png` (1200×630, generated via .NET GDI+ since no design tool was available); added `sitemap.xml` + `robots.txt`; removed the deprecated `<meta name="keywords">` from all 11 pages; **fixed heading-hierarchy skips site-wide** — `index.html`'s second `<h1>` ("/Projects") → `<h2>`, `experience.html`'s 3 role headings h3→h2, and promoted the write-up pages' section headings so every page follows a clean h1→h2(→h3) outline with no skipped levels (adhomelab/alabnessus/alabsentinel/athmwonderland: h3→h2; commontroubles: h4→h2; ankistudy: h3→h2 and the one genuinely-nested h4→h3). Verified via live computed-style measurements before touching anything — the promotions exactly match sizing already established by `ablueteamwire.html` (which was already correctly structured) and use main.css's existing unstyled h1/h2/h3 cascade, so **zero visual regression** — it actually fixed a pre-existing bug where the un-promoted h3/h4 headings weren't covered by the article column's `max-width` rule and rendered ~56px wider than the body text.
  **(C) performance**: installed `oxipng` (winget) and losslessly recompressed all 85 PNGs in `images/` (15.1MB → 11.7MB, ~22% reduction, zero quality loss); added explicit `width`/`height` to all 97 content `<img>` tags (dimensions read via .NET `System.Drawing`, with the one WebP file's dimensions hand-decoded from its VP8L header since GDI+ doesn't support WebP) to prevent layout shift; added `loading="lazy" decoding="async"` to the 85 below-the-fold content images (excluded: the nav logo on every page and the About page photo, both above-the-fold).
  Cache bumped to `?v=21` (theme.css changed for the heading-hierarchy CSS selector updates). All changes verified live (computed styles, network tab, console) before committing.
- update#28 — the deferred D/E items from update#27's QA report, all now done:
  **CSP tightened**: removed `'unsafe-inline'` from `style-src` on all pages. Verified live first — the site's only runtime inline-style usage is jQuery's `.css()` (homepage parallax background), which sets styles via the CSSOM (`element.style.prop = ...`) rather than the `style=""` attribute; empirically confirmed in a live preview that CSP's inline restriction does NOT block CSSOM property assignment, only `style=""` attribute mutation and `<style>` blocks (of which the site has zero) — so the tightened policy breaks nothing.
  **Custom `404.html` added** (12th page) — centered message reusing `.post.featured` from main.css, `noindex, nofollow`, not in the sitemap. Required one new small CSS block (theme.css §12, `body.page-404`) since `.post.featured` alone doesn't center block children — bumped cache to `?v=22`.
  **`apple-touch-icon` + `theme-color`** added to all 12 pages. The 180×180 PNG was rasterized from `logo-tek-favicon.svg` using a browser `<canvas>` (fetched the SVG, forced explicit width/height since intrinsic-less SVGs fail to load as an `Image()`, drew to canvas, exported as PNG) — no SVG rasterizer is installed locally (GDI+/System.Drawing can't read SVG or WebP). Optimized with `oxipng` (45% smaller, lossless).
  **JSON-LD `Person` structured data** added to `index.html` only (name, jobTitle, worksFor, sameAs LinkedIn/GitHub). Since CSP `script-src` has no `'unsafe-inline'`, the inline JSON-LD block is allowlisted via an exact `sha256-` hash rather than loosening the policy — see hard rule #11 above for what to do if this block's content ever changes.
  `.cyear` JS-fallback item was dropped from the to-do list per user request (not implemented, intentionally not tracked).
- update#29 — CLAUDE.md + Handoff.md housekeeping only (no site files changed): synced counters after update#28 actually pushed; corrected two facts that were wrong at write-time (og:image/twitter:image is on 11 content pages, not 12 — `404.html` is `noindex` and deliberately has no OG tags; `logo-tek.svg` is referenced on all 12 pages, not 11, since `404.html` also uses the nav logo); added the missing theme.css §12 (404 page) to the CSS architecture list and `body.page-404` to the body-class scoping list.
- update#30 — hero headline (3.5→3.2rem) and typewriter (1.9→1.75rem) font-size reduced per user request ("just a bit" smaller), mobile breakpoint scaled proportionally (2.4→2.2rem / 1.25→1.15rem); CSS v23.
- update#31 — a full site-wide QA sweep (4 parallel research agents covering content/typos, SEO, security/performance, links/assets, plus a live console/network pass across all 12 pages) turned up a short punch list, all fixed here:
  **Bugs**: `ablueteamwire.html`'s `wire9.png` image had a corrupted `alt` attribute — the update#27 width/height insertion script had landed mid-string (confused by a literal `>` inside the original alt text), truncating the alt text, creating an invalid stray attribute, and closing the `<img>` tag early so the tail of the intended alt text rendered as **literal garbled text visible on the live page**. Reconstructed the original alt text and re-added the attributes correctly. Also normalized 4 lowercase "Blue team"/"Red team" instances on the same page to match the site's dominant "Blue Team"/"Red Team" capitalization.
  **SEO housekeeping**: fixed `ankistudy.html`'s `<head>` element order (stylesheet links were before meta description/canonical, unlike all 11 other pages) — cosmetic/consistency only, no functional SEO impact.
  **Performance**: replaced the render-blocking Google Fonts `@import` in theme.css with `<link rel="preconnect">` + a single combined `<link rel="stylesheet">` in every page's `<head>` (merged what were previously two separate font CSS requests into one).
  **Hero load-speed investigation**: measured actual load time live (Navigation Timing API) — real resource loading is ~50ms locally, not the bottleneck. Root cause of the perceived 0.5–1s+ homepage delay was `main.css`'s generic `#wrapper.fade-in:before` template scaffolding — a full-viewport solid overlay (`#1e252d`) that, per its own declared CSS timing (0.75s transition-delay + 1s fade), keeps the *entire page* covered for up to ~1.75s after resources finish loading. Confirmed via a controlled iframe test harness that only `index.html` had `class="fade-in"` on `#wrapper` (every other page lacks it — explaining exactly why other pages "load instantly" by comparison) and that nothing in the JS depends on the class. Removed `class="fade-in"` from `index.html`'s `#wrapper`; the custom hero-element staggered reveal (waves/headline/badge/scroll-cue fading in, documented in the Hero section below) is untouched and still plays — the page itself is now visible immediately instead of hidden behind a dark curtain first.
  Cache bumped to `?v=24` (theme.css `@import` removal). All fixes verified live (console/network clean across all 12 pages, computed styles, actual rendered DOM) before considering this done.
  **Follow-up in the same update**: also fixed the mobile hamburger nav-panel font/colour leak noted above. Root cause: `main.js` doesn't clone the nav for the off-canvas `#navPanel` — it physically **relocates** the same `<ul class="links">` DOM nodes between `#nav` and `#navPanel` at the `≤medium` (980px) breakpoint. `main.css` has its own unthemed styling for the `#navPanel .links li a` context specifically (`font-family: "Source Sans Pro"`, no explicit `color` so it inherited a stray `#navPanel`-level dark grey, plus a light-grey `border-top` meant for a white panel) that only applies once the markup lands there, so a theme.css rule scoped to `#nav ul.links li a` alone stopped applying the moment JS moved the element. Fixed by extending the existing `#nav ul.links…` selectors to also match `#navPanel .links…` (same typography/colour/hover/active treatment — JetBrains Mono, uppercase, `/` prefix — since it's literally the same content), fixing the `<li>` border-top colour, and fixing `#navPanelToggle`'s ("Menu" button) font-family the same way. One subtlety: `font-family` had to be set **directly on the `<a>`** (not just the ancestor `<ul>`) because main.css's `#navPanel .links li a` rule sets it directly on the anchor too — an inherited value from a styled ancestor always loses to any rule that directly matches the element itself, `!important` or not. Verified live at a 375px mobile viewport (actual computed styles on the relocated DOM) and confirmed zero regression on the desktop nav. Cache re-bumped to `?v=25`.
