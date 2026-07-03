# Handoff — TechWebsite.github.io

Last updated: 2026-07-03 | Last pushed: `update#30` | Next commit: `update#31` (staged, not yet committed) | CSS cache: `?v=25`

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

## Current state (as of update#28, live)

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
- **Headline** `Cybersecurity / Lorenzo` (h1, **3.2rem**, nudged down from 3.5rem in update#30 — user felt it read a bit large) — plain on the backdrop, **no frosted panel**. Slash in accent.
- Divider: 90px gradient line. **Typewriter** sub-line (**1.75rem**, nudged down from 1.9rem in update#30, DM Sans, **white** text — changed from solid blue in update#22, caret stays blue) cycling roles: "Detection and Response" / "Forensics and Incident Response" / "Threat Hunting" / "Blue Team Operations".
- Clicking the **b64 button** (see Nav below) flips the typewriter to a rotating "doom" phrase set ("AI is taking over" / "Skynet does not forgive" / "If you're reading this, it's too late") until refresh.
- **Role badge** `.hero-now`: plain text "MDR Analyst – Rapid7" (no pill/border), white label + accent company name, absolutely positioned in the lower third (~`bottom:17%`), links to experience.html.
- **Scroll cue** `.hero-scroll`: animated chevron only.
- Reveal: opacity-0 scoped to `body.is-preload`; `fadeIn`/`revealUp` with `fill-mode:both`. `prefers-reduced-motion` fully handled.
- **Load-speed fix (update#31)**: `index.html`'s `#wrapper` used to carry the template's `class="fade-in"`, which (via `main.css`'s generic `#wrapper.fade-in:before` rule) drew a full-viewport solid overlay that stayed opaque for up to ~1.75s after resources finished loading — homepage-only (no other page had this class), which is why the homepage used to feel slow to appear while other pages felt instant. Removed the class; the page now paints immediately and only the deliberate hero-element stagger above still plays on top of it.

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
- Experience: `Career timeline`, 3 roles. Rapid7 entry has **3 bullets** (added update#23 — detection & response / DFIR / customer reporting + detection tuning).

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
- **update#28**: `style-src` no longer allows `'unsafe-inline'` (verified live that jQuery's `.css()` calls use the CSSOM, not the `style=""` attribute, so nothing broke — see CLAUDE.md update#28 entry for the full reasoning). `script-src` allows exactly one inline script via an exact `sha256-` hash (the JSON-LD block on index.html) — **if that block's content is ever edited, the hash must be recomputed** or the structured data silently stops rendering (CSP blocks it, only a console violation, no visible error).
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
| Eventual | Hero side-fill (see plan below) | User flagged the hero as feeling empty on the left/right sides around the centered headline/typewriter on wide viewports. Planning only — not implemented. |
| Eventual | Hero headline overlay figure (see plan below) | User wants a masked/hooded "anon" figure positioned directly above the headline, colour-matched and blended into it. Planning only — not implemented. |

Nothing else is currently pending — the CSP tightening, 404 page, apple-touch-icon/theme-color, and JSON-LD structured data items from update#27's QA report were all completed in update#28. (Font overhaul — DONE, body font is now Source Sans 3. "B64" easter-egg button — DONE, built update#20–22. `user-scalable=no` — DONE, removed update#25. SEO basics (canonical/OG/sitemap/robots/heading hierarchy) + image performance (lazy-load/dimensions/oxipng compression) — DONE, update#27.)

### Plan: hero side-fill ideas (added 2026-07-03, not built)

The hero's centered headline/typewriter column leaves a lot of open space on either side on wide viewports, sitting above the wave band. Ideas below are ranked; none are implemented yet.

**1. Primary idea (user's) — pixel-art fisherman, sitting at the bottom of the wave band, fishing line dropping down**
- A small pixel-art figure perched on/near the bottom edge of the top wave layer (`hw1`), off to one side (e.g. bottom-right) so it stays clear of the centered text column — legs dangling over the wave curve.
- A thin fishing line runs from his rod down through the dark hero backdrop below the waves, ending in a small hook/bobber — visually "under" the animated waves, per the original idea.
- **Built-in pun bonus for a cybersecurity site**: fisherman = "phishing." Worth leaning into subtly (e.g. what's on the hook could nod at a data packet/envelope icon) without making it the loud focal point — the joke should reward a second look, not compete with the headline.
- **Technical approach**: no pixel-art tool or image rasterizer is installed locally (`CLAUDE.md` hard rule — GDI+/System.Drawing can't do SVG/WebP either). Build the sprite as a **hand-coded SVG grid of `<rect>` elements** (true pixel art at the source, scales crisply at any size, no external tool or asset pipeline needed) rather than a PNG. The line can be a simple SVG path or a thin styled `<div>`.
- **Animation**: a slow, small-amplitude rod-tip bob (a few px, long duration) to match the site's existing slow-drift animation language (hero-contour layers, wave cross-parallax) — must respect `prefers-reduced-motion` like the rest of the hero (freeze in place, no motion).
- **Responsive**: hide or shrink at the existing `736px` hero breakpoint, where the hero is already tight and the headline/typewriter already scale down — don't add clutter on mobile.
- **Where it'd live**: a new sub-block under theme.css §7 (hero), not a new numbered section; new inline SVG markup in `index.html` only (homepage hero is unique to `index.html`).

**2. Complementary / alternative ideas to balance the composition**
- **Vertical "spine" text** on the opposite side, rotated 90°, JetBrains Mono, uppercase (e.g. `DETECT // ANALYZE // RESPOND`) — reuses the mono font already established for nav links and section labels, needs zero new art assets, cheap to build and cheap to remove if it doesn't work visually.
- **Slow-scrolling faint terminal/log strip** along one side edge (fake SOC log lines or nmap-style output, low opacity) — reinforces the blue-team aesthetic, but reads busier than the spine-text option; better as a "if the site still feels empty after option 1" fallback than a day-one addition.
- **Second, smaller balancing pixel-art element** on the opposite side (e.g. a tiny padlock or terminal silhouette) — only worth doing if the fisherman alone makes the composition visibly lopsided once it's actually in place.
- **Subtle HUD-style corner brackets / scanline framing** at the hero's outer edges — holds the empty space visually without introducing new figurative art; lowest-risk, also lowest-impact option.

**Recommendation for whoever picks this up**: start with the fisherman (idea 1 — it's the user's concept and it has a nice organic "phishing" pun for a cybersecurity portfolio) on one side, paired with the cheap vertical spine-text (idea 2, first bullet) on the other side to balance the composition. Both respect the site's existing "subtle, slow-moving, monochrome-with-one-accent" visual language established by the wave/contour animations. Ship those two, look at it live, and only reach for the remaining ideas if it still feels unbalanced — don't build all four at once.

### Plan: hero headline overlay — masked/hooded figure (added 2026-07-03, not built)

User's idea: an anonymous figure — face masked/obscured, hoodie up, cropped so **only the lower face and neck are visible** (the rest of the head stays hidden in shadow/hood — no actual face, per the explicit ask) — positioned **directly above** "Cybersecurity / Lorenzo," coloured to match the site's dark/blue palette, and blended into the headline rather than looking like a pasted-on sticker.

**Where it actually fits in the current layout** (grounded in the real hero CSS, `theme.css` §7):
- `#intro` is `min-height:100vh`, flex-centered, with `padding-top:28vh` — that padding exists specifically to push `.hero-inner` (the headline/divider/typewriter block) down below the wave band, which is what currently leaves a gap above the headline. That gap is exactly where this figure would sit — centered horizontally (the headline is already true-centered per the update#15 alignment fix), bottom edge of the figure meeting the top of the `<h1>`.
- The wave band (`.hero-waves`) sits at `top:84px` just under the fixed nav — the figure needs to clear that, not overlap the crests.

**Making it actually "blend" rather than look pasted on** — two techniques, use both:
1. **Palette-lock the artwork**: build it only from the site's existing design tokens (§1) — `--bg` `#0d1117` / `--bg-2` `#0b0f15` / `--surface` `#161b22` for the dark hoodie/shadow mass, `--muted` `#8b95a1` / `--text` `#cdd6e0` / `--heading` `#f0f3f6` for the visible jaw/neck, `--accent-text` `#58a6ff` / `--accent-solid` `#3b82f6` for a restrained highlight (rim light on the hood edge, or a faint glow) — instead of arbitrary illustration colours. If it only uses colours already in the page, it reads as part of the design system rather than an imported image.
2. **Soft-edge fade, not a hard crop**: a `mask-image`/gradient fade on the artwork's bottom edge so the neck dissolves into the dark backdrop right where the headline begins, rather than ending in a visible rectangle. This is what actually creates "blending" — colour-matching alone won't hide a hard image edge sitting right above the letters.

**Style — open decision, should match whichever hero figure gets built first**:
- (a) Same hand-built pixel-art SVG-grid approach as the fisherman idea (`Handoff.md` above) — gives a matched pair if both ship.
- (b) A smooth flat silhouette / line-art treatment instead, closer to the site's existing illustration language (the wave contours and the Hokusai footer wave are both clean line-art/gradient work, not pixel art) — would sit more naturally directly under/against the wave band.
- Don't mix both styles in the same hero — if the fisherman ships first as pixel art, match this to it; if this ships first, decide the style then and match the fisherman to it later.

**Practical risks to check live before committing to this**:
- Viewport-height sensitivity: the `28vh` gap this figure would occupy is a *percentage* of viewport height, so it's generous on tall desktop monitors but tight on short laptop screens — needs testing across real heights, possibly a `min-height`-based clamp or hiding/shrinking it the same way the headline already adapts at the `736px` width breakpoint.
- Total visual weight: this and the side-fill fisherman both target "the hero feels empty," but in different zones (this = directly above the headline; fisherman = lower/side). They're not mutually exclusive, but a hero with two new figurative illustrations *plus* the existing drifting contours and cross-parallax waves risks tipping from "fuller" into "busy." Build and evaluate one at a time, not both at once.
- Purely decorative — mark it `aria-hidden="true"` like the existing `.hero-contours`/`.hero-waves` layers so it doesn't clutter screen-reader output.

---

## Working notes for a new chat

- **Verify visually via the localhost preview, not screenshots** — the screenshot tool wedges after ~1 shot per server (restart the server for a fresh one). For layout checks prefer `preview_eval` measuring `getBoundingClientRect`/`getComputedStyle`. Chat image uploads fail in this env ("image processing unavailable"); to view a reference image, `WebFetch` it then `Read` the saved file.
- **Preview server**: there is no committed `.claude/launch.json`. Recreate it pointing at a static server (a PowerShell `HttpListener` script in the session scratchpad has been used) to run `preview_start`, then **delete it before committing**.
- **Cache-bust**: bump `?v=N` on `main.css` + `theme.css` + `site.js` across all HTML (Git Bash `sed`) on every theme.css/site.js change. Favicon links have their own `?v=12`.
- **Image tooling**: `oxipng` is installed (winget, `Shssoichiro.Oxipng`) for lossless PNG compression — no ImageMagick/pngquant available (Windows' `convert.exe` is an unrelated disk utility, not ImageMagick). `.NET System.Drawing` via PowerShell works for reading pixel dimensions (does NOT support SVG or WebP — decode WebP dimensions manually from the VP8L header if needed).
- **Commit**: `website update#N` only — nothing else. Next is `update#30`.
