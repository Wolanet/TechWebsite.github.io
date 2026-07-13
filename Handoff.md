# Handoff — TechWebsite.github.io

Last updated: 2026-07-13 | Last pushed: `update#45` (docs: synced counters after the #44 hero-empty-sides removal) | Next commit: `update#46` | CSS cache: `?v=32`

> Quick-start companion to `CLAUDE.md`. Read `CLAUDE.md` first for the hard rules
> (CSS goes in theme.css only, cache-bust on every CSS change, Git Bash for sed,
> commit format `website update#N`). This file describes the **current state** so a
> new chat can orient fast. The full per-commit history lives in `CLAUDE.md`.

---

## GitHub profile README (quick reference)

Separate from this site: Lorenzo's GitHub profile README lives at **`github.com/Wolanet/Wolanet`** (the special repo whose `README.md` renders on his profile page). Local reference copy: `@ThePATH/@IT path/Github/README-Profile.md` (plain file, not a clone — sync manually). To edit for real: clone `https://github.com/Wolanet/Wolanet.git` to a scratch folder (cached creds, no extra auth needed), edit, commit (normal message, not `update#N` format), push, then mirror into the local reference copy. Full details in `CLAUDE.md` → "GitHub profile README" section.

---

## What the site is

Personal cybersecurity portfolio for **Lorenzo Bertini** (GitHub: Wolanet), hosted at
`TechWebsite.github.io` via GitHub Pages. Base template: HTML5 UP "Massively" —
static HTML, **no build pipeline** (no Node/SASS/bundler — the `assets/sass/`
template source was removed as unused in update#25). Edits are hand-written
HTML + a single override stylesheet.

---

## Current state (as of update#42, live)

### Fonts
- **DM Sans** — headings + hero headline/typewriter/badge (`--font-heading`)
- **Source Sans 3** — all body, project descriptions and write-up text (`--font-body`). History: Source Serif 4 → Inter (update#18) → Source Sans 3 (update#20, fixed uneven word-spacing on About)
- **JetBrains Mono** — mono accents only: section labels, role-meta, scroll cue, nav links (`--font-mono`)
- **Klee One / Shippori Mincho** — Japanese footer quote (`--font-jp`)
- All loaded via `<link rel="preconnect">` + one combined Google Fonts `<link rel="stylesheet">` in every page's `<head>` — update#31 replaced the old render-blocking `@import` in `theme.css` with this.
- **update#42**: removed the template's leftover **dead** Google-Fonts `@import` (Merriweather + Source Sans Pro) from `main.css` line 2 — it fired a 2nd `fonts.googleapis.com` request on every page load for two fonts nothing renders in (proven: 0 of every element on all 12 pages resolves to them; theme.css overrides all). Homepage now makes 1 Google-Fonts stylesheet request, not 2. main.css's `font-family: "Merriweather"/"Source Sans Pro"` *fallback* declarations were kept (overridden + harmless, provide a system-font fallback if theme.css ever fails).

### Hero (`index.html #intro`) — theme.css §7
- Backdrop: diagonal dark gradient (`#111827` → `#080c12`).
- **Animated contour field**: `.hero-contours` → two `.hero-contour-layer` spans (hcA/hcB) drifting opposite directions (`hero-contours.svg` tiled).
- **Wave band** below the nav (`top:84px`) — **reworked in update#32**: now **5 layered SVG paths** `.hero-wave-layer hw5…hw1` (back→front), seamless multi-harmonic curves (all wavelengths divide 1200 so the `translateX(-50%)` loop is seamless). Motion is **parallax drift + vertical roll** — layers drift at graduated speeds and alternating directions and roll up/down twice per drift cycle (`heroWaveA/B` = front tier ±5px, `heroWaveC/D` = back tier ±3px; X stays linear to keep the loop seamless). The **front wave `hw1`** is deliberately bigger-amplitude and faster (`heroWaveA 9s`) — the lively "active" surface vs. the calmer back layers — and carries `.hero-wave-crest`, a hairline stroke that slowly shimmers (`heroCrestShimmer`). Wave shapes were made by a throwaway Python sine-sum script (not committed). **Scrapped this session (do not rebuild): a light-sweep "sheen", a pixel-art fisherman, a hooded "anon" figure over the headline, and binary "bytes" riding the crest.**
- **Headline** `Cybersecurity / Lorenzo` (h1, **3.2rem**, nudged down from 3.5rem in update#30 — user felt it read a bit large) — plain on the backdrop, **no frosted panel**. Slash in accent.
- Divider: 90px gradient line. **Typewriter** sub-line (**1.75rem**, nudged down from 1.9rem in update#30, DM Sans, **white** text — changed from solid blue in update#22, caret stays blue) cycling roles: "Detection and Response" / "Forensics and Incident Response" / "Threat Hunting" / "Blue Team Operations".
- Clicking the **b64 button** (see Nav below) flips the typewriter to a rotating "doom" phrase set ("AI is taking over" / "Skynet does not forgive" / "If you're reading this, it's too late") until refresh.
- **Role badge** `.hero-now`: plain text "MDR Analyst – Rapid7" (no pill/border), white label + accent company name, absolutely positioned in the lower third (~`bottom:17%`), links to experience.html.
- **Scroll cue** `.hero-scroll`: animated chevron only.
- Reveal (current, post-update#34): `.hero-inner` (headline + typewriter) has **NO** entrance animation — instant paint; only the decorative `.hero-waves`/`.hero-now`/`.hero-scroll` do a quick `fadeIn 0.6s` at first paint (NOT gated on `is-preload`/`window.load` — see the two load-speed fixes below). The `revealUp` keyframe was deleted. `prefers-reduced-motion` fully handled (instant static hero).
- **Load-speed fix (update#31)**: `index.html`'s `#wrapper` used to carry the template's `class="fade-in"`, which (via `main.css`'s generic `#wrapper.fade-in:before` rule) drew a full-viewport solid overlay that stayed opaque for up to ~1.75s after resources finished loading — homepage-only (no other page had this class), which is why the homepage used to feel slow to appear while other pages felt instant. Removed the class; the page now paints immediately and only the deliberate hero-element stagger above still plays on top of it.
- **Instant-load fix (update#34)**: the hero *still* felt like it faded in on load, because the whole hero was additionally gated on the template's **`is-preload`** body class — which `main.js` removes only on `window.on('load')` (after every font/SVG/image downloads). While present it (a) froze all animations via `main.css` `body.is-preload *{animation:none!important}`, (b) hid `#intro` via `main.css` `body.is-preload #intro{opacity:0;transform:translateY(2rem)}`, and (c) hid the hero children via a theme.css rule — then released everything at once with staggered delays up to ~2s. **Removed `class="is-preload"` from `index.html`'s `<body>` entirely** so the hero paints + animates from the first frame. Retuned the entrance (theme.css §7): `.hero-inner` (headline + typewriter) now has **NO** entrance animation — it's instant — while only the decorative `.hero-waves`/`.hero-now`/`.hero-scroll` keep a quick `fadeIn 0.6s`, no longer gated on load; the unused `revealUp` keyframe was deleted. The other 11 pages keep `is-preload` (none have `#intro`). `prefers-reduced-motion` untouched → those users now get an instant static hero. Cache `?v=31`.

### Nav (all pages)
- Brand `images/logo-tek.svg` (27×27 rounded-rect wave mark) + "Tek Tsunami" wordmark, centered in normal flow.
- Links styled like the section labels: **JetBrains Mono, uppercase, with a `/` prefix** (`::before`) → `/HOME` `/EXPERIENCE` `/ABOUT`. Base colour `--text` (matches the "/Experience" label), current-page link white + accent underline, hover brightens to blue. (update#24)
- Icons LinkedIn + GitHub pinned far right. **Homepage only**: a small blue **"b64" button** sits just before the icons (small gap before LinkedIn) — see below.
- **Mobile off-canvas panel** (`#navPanel`, ≤980px, hamburger toggle top-right): `main.js` *relocates* (not clones) the same `ul.links` DOM into the panel, so it now shares the exact desktop treatment above (theme.css extends the `#nav ul.links…` selectors to also match `#navPanel .links…`). Fixed in update#31 — previously fell back to `main.css`'s unthemed defaults (wrong font, low-contrast text, light-grey border meant for a white panel).

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
- Experience: `Career timeline`, 3 roles. Rapid7 entry has **3 bullets** (added update#23 — detection & response / DFIR / customer reporting + detection tuning); bullet 1 was quantified to "a global MDR portfolio of **3,000+ customers**" in update#36.

### Article / write-up pages (8 files, `body.page-article`) — theme.css §10
- Single `max-width: 52rem` column, **justified** body text, title-aligned. Justification is driven entirely by CSS (`#main p` base rule + `body.page-article`/`body.page-about` overrides) — the inline `align="justify"` HTML attribute was removed site-wide in update#25 as redundant/deprecated; no visual change.
- Images never upscale (`width:auto; max-width:100%; max-height:80vh`); captions `<p class="img-caption">` (italic, muted). All content screenshots now carry descriptive `alt` text (added update#25 — previously empty) and explicit `width`/`height` + `loading="lazy" decoding="async"` (added update#27).
- Heading hierarchy is now clean everywhere: every write-up follows h1→h2(→h3) with no skipped levels (fixed update#27 — previously most pages went straight from h1 to h3 or h4).
- `dfirwork.html` is an intentional stub ("Cases coming soon" — professional cases pending).

### SEO — theme.css unaffected except §12, all in `<head>` + new root files (update#27, #28)
- `rel="canonical"` + full Open Graph/Twitter Card meta (title/description/image/url/site_name) on all 11 content pages, backed by `images/og-share.png` (1200×630 branded share card, generated via .NET GDI+).
- `sitemap.xml` + `robots.txt` added at the repo root.
- Deprecated `<meta name="keywords">` removed from all pages.
- **update#28**: `apple-touch-icon` (180×180, `images/apple-touch-icon.png`) + `theme-color` (`#0d1117`) meta added to all 12 pages. JSON-LD `Person` structured data added to `index.html` only (see Security section below for the CSP implication). Custom `404.html` added — `noindex, nofollow`, deliberately excluded from the sitemap.

### Performance (update#27)
- `oxipng` (installed via winget) losslessly recompressed all 85 PNGs: 15.1MB → 11.7MB (~22%), zero quality loss. Use it on any new screenshot before committing: `oxipng -o 4 --strip safe <file>`.
- All 97 content `<img>` tags now carry explicit `width`/`height` (prevents layout shift). The 85 below-the-fold ones also carry `loading="lazy" decoding="async"` (nav logo + About photo excluded — both above-the-fold).
- Found and fixed a mislabeled file: `images/troubleshoot/bsod-error.png` was actually a WebP file with a `.png` extension (caught because `oxipng` refused to touch it) — renamed to `.webp`, reference updated in `commontroubles.html`.

### Favicon
- `images/logo-tek-favicon.svg` — **full-bleed square** variant (no rounded corners → no transparent tab "tips"). Plus regenerated `favvicon/favicon.ico` + 16/32 PNGs from the same square design. All favicon links carry `?v=12`.
- Nav still uses the rounded `logo-tek.svg`.

### Security / accessibility hygiene
- Strict **Content-Security-Policy** + **Referrer-Policy** `<meta>` on all pages (update#20); all inline JS moved to `assets/js/site.js` so `script-src 'self'` holds.
- **update#28**: `style-src` no longer allows `'unsafe-inline'` (verified live that jQuery's `.css()` calls use the CSSOM, not the `style=""` attribute, so nothing broke — see CLAUDE.md update#28 entry for the full reasoning). `script-src` allows exactly one inline script via an exact `sha256-` hash (the JSON-LD block on index.html) — **if that block's content is ever edited, the hash must be recomputed** or the structured data silently stops rendering (CSP blocks it, only a console violation, no visible error). Because only index.html carries this hash, **its CSP string intentionally differs from the other 11 pages** — a "are all 12 CSPs identical?" QA check flags index as a false positive; that's expected, not a bug (hash verified matching in update#42).
- `<html lang="en">` on all 12 pages. Every external `target="_blank"` link carries `rel="noopener"`.
- `prefers-reduced-motion` respected throughout the hero.
- `user-scalable=no` **removed** from the viewport meta on all pages (update#25) — mobile pinch-zoom now works.
- All 12 page meta descriptions are unique (update#25) — previously 8 pages shared one generic description.

---

## File inventory (active files)

```
12 HTML pages: index, elements (About), experience, + 8 page-article write-ups
  (ablueteamwire, adhomelab, alabnessus, alabsentinel, ankistudy,
   athmwonderland, commontroubles, dfirwork), + 404 (added update#28)
  — workinprogress.html removed in update#25 (orphan, never linked)

assets/css/theme.css      ← ONLY css file to edit (override layer, loaded after main.css)
assets/css/main.css       ← template base, DO NOT edit for styling (update#42 removed 2 dead-cruft lines only: unused Merriweather/Source Sans Pro @import + deleted-bg46.jpg ref)
assets/css/noscript.css  ← no-JS fallback stylesheet; fontawesome-all.min.css ref fixed update#38, bg46.jpg layer removed entirely update#40 (was reactivating the old template photo theme.css intentionally overrides — see update#40 entry)
assets/css/fontawesome-all.min.css
assets/js/                ← 7 template JS files + site.js (custom), all in use
assets/sass/               ← REMOVED in update#25 (unused template source, main.css never rebuilt from it)

images/logo-tek.svg              ← nav logo (rounded card)
images/logo-tek-favicon.svg      ← square favicon source
images/hero-contours.svg         ← animated hero background (via theme.css)
images/wave-footer-jp.svg        ← Hokusai footer wave (via theme.css)
images/overlay.png               ← template overlay texture (via main.css)
images/aboutme3.jpg              ← About photo
images/anki1.jpg anki2.jpg       ← Anki article images
images/favvicon/                 ← favicon.ico + 16/32 PNGs (double-v typo in folder name — don't rename)
images/og-share.png              ← 1200×630 OG/Twitter share card (added update#27)
images/apple-touch-icon.png      ← 180×180 mobile home-screen icon (added update#28)
images/{activedlab,labnessus,labsentinel,troubleshoot,wonderland,zwire}/  ← write-up screenshots

sitemap.xml, robots.txt          ← added update#27
```

---

## Pending / deferred (do NOT do without explicit ask)

| Priority | Item | Notes |
|----------|------|-------|
| Eventual | DFIR Work page | dfirwork.html is a "Cases coming soon" stub; now the headline project + featured on the GitHub README — fill when cases are ready |

Nothing else is currently pending — the CSP tightening, 404 page, apple-touch-icon/theme-color, and JSON-LD structured data items from update#27's QA report were all completed in update#28. (Font overhaul — DONE, body font is now Source Sans 3. "B64" easter-egg button — DONE, built update#20–22. `user-scalable=no` — DONE, removed update#25. SEO basics (canonical/OG/sitemap/robots/heading hierarchy) + image performance (lazy-load/dimensions/oxipng compression) — DONE, update#27.)

(The detailed fisherman / hooded-figure / sheen / crest-bytes plans that used to live here were all scrapped in the update#32 session and have been removed so nobody rebuilds them. The only hero change that shipped was the wave-band rework — see the Hero section above.)

---

## Working notes for a new chat

- **Verify visually via the localhost preview, not screenshots** — the screenshot tool wedges after ~1 shot per server (restart the server for a fresh one). For layout checks prefer `preview_eval` measuring `getBoundingClientRect`/`getComputedStyle`. Chat image uploads fail in this env ("image processing unavailable"); to view a reference image, `WebFetch` it then `Read` the saved file.
- **Preview server**: no committed `.claude/launch.json`. Create a temporary one for a static server — `python -m http.server 8080` works well (`runtimeExecutable: "python"`, `runtimeArgs: ["-m","http.server","8080"]`, `port: 8080`), then `preview_start`. `.claude/` is git-ignored so it's never committed, but delete the launch.json when done to keep things tidy.
- **Cache-bust**: bump `?v=N` on `main.css` + `theme.css` + `site.js` across all HTML (Git Bash `sed`) whenever any of those three changes (now `?v=32` after update#42's main.css edit). Favicon links have their own `?v=12`.
- **Image tooling**: `oxipng` is installed (winget, `Shssoichiro.Oxipng`) for lossless PNG compression — no ImageMagick/pngquant available (Windows' `convert.exe` is an unrelated disk utility, not ImageMagick). `.NET System.Drawing` via PowerShell works for reading pixel dimensions (does NOT support SVG or WebP — decode WebP dimensions manually from the VP8L header if needed). `python` (3.13) is available; `pypdf` is installed (pip) for extracting text from PDFs — the built-in Read PDF path needs poppler/`pdftoppm`, which is NOT installed.
- **Commit**: `website update#N` only — nothing else. Next is `update#46`.
- **QA pass #4 (update#38)**: full re-audit found the site in excellent shape — only 2 minor stale references in `noscript.css` (unused-unless-JS-disabled fallback stylesheet) and a one-day-stale `sitemap.xml` lastmod, both fixed. See CLAUDE.md's update#38 entry for the full audit checklist if repeating this later.
- **update#40 correction**: the update#38 `noscript.css` fix (pointing at `bg46.jpg` since the file existed) was itself wrong — `bg46.jpg` is the old HTML5-UP template stock photo that `theme.css` deliberately overrides everywhere with a dark vignette gradient (`!important`). That fix had accidentally brought the old photo back for JS-disabled visitors only. Corrected by removing the `bg46.jpg` layer from `noscript.css` entirely (no-JS visitors now get the same overlay+gradient look, no stock photo) and deleting the now-fully-unused `images/background-IMG/bg46.jpg` + its folder. `main.css` kept its own dead textual reference to the deleted file at the time (that rule is permanently overridden by theme.css, so it was harmless) — **later cleaned in update#42**, so the reference is now gone from main.css too. **Lesson for next time**: when a file reference is broken, check *why* it might be broken (design intent) before just repointing it at whatever file happens to exist on disk.
- **update#42 (dead main.css cruft + methodology fix)**: first-ever edit to `main.css` (user-approved) — removed the dead Google-Fonts `@import` (Merriweather/Source Sans Pro, unused: proven 0 elements resolve to them across all 12 pages) and the deleted-`bg46.jpg` reference; cache `?v=31 → ?v=32`. **Key lesson**: the reason 5+ prior QA passes missed the dead font `@import` (and initially the bg46 issue) is they were *text-based* (grep for references, tag balance) — which can't detect that a referenced file/font is served by a CSS rule that's fully overridden and therefore dead. Going forward, for "unused asset" audits use **live network capture** (`performance.getEntriesByType('resource')` / the preview network panel) to see what the browser *actually* fetches, and **computed-style DOM walks** (`getComputedStyle`) to see what fonts/rules *actually* apply — not just grep. Also checked this pass and clean: **case-sensitivity** of every asset ref (would 404 on GitHub Pages' case-sensitive FS but pass silently on case-insensitive Windows), and confirmed `overlay.png` IS used (noscript.css, no-JS) so it stays.
