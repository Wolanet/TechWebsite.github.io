/* ==========================================================================
   site.js — small, dependency-free site behaviors.
   These used to live in inline <script> tags; moving them into this file lets
   the pages enforce a strict Content-Security-Policy (script-src 'self').
   Loaded on every page. Each feature guards on the elements it needs, so the
   homepage-only bits (typewriter, b64 egg) simply no-op elsewhere.
   ========================================================================== */
(function () {
	'use strict';

	/* ── 1. Copyright year — runs on every page ─────────────────────────── */
	document.querySelectorAll('.cyear').forEach(function (y) {
		y.textContent = new Date().getFullYear();
	});

	/* ── 2. Hero typewriter sub-line — homepage only ────────────────────── */
	(function typewriter() {
		var el = document.getElementById('typed');
		if (!el) return;
		var roles = [
			'Detection and Response',
			'Digital Forensics and Incident Response',
			'Threat Hunting',
			'Blue Team Operations'
		];
		// Respect reduced-motion: show a single static line, no typing.
		if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			el.textContent = 'Defensive security, DFIR and hands-on labs';
			var caret = document.querySelector('.type-caret');
			if (caret) caret.style.display = 'none';
			return;
		}
		var ri = 0, ci = 0, deleting = false;
		function tick() {
			var word = roles[ri];
			el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
			var delay = deleting ? 38 : 72;
			if (!deleting && ci > word.length) { deleting = true; delay = 1500; }
			else if (deleting && ci < 0) { deleting = false; ci = 0; ri = (ri + 1) % roles.length; delay = 380; }
			setTimeout(tick, delay);
		}
		tick();
	})();

	/* ── 3. "b64" easter egg — homepage only ────────────────────────────────
	   Each click re-encodes the page's readable text (always from the original
	   source text) and cycles the scheme:  Base64 → Hex → ROT13 → Base64 → …
	   A page refresh restores everything (state lives only in memory — nothing
	   is persisted). Excluded from encoding: the footer + Japanese quote
	   (#footer), the animated typewriter (.hero-type), and the button itself
	   ([data-b64-skip]). Text NODES are rewritten in place (never innerHTML),
	   so event handlers and the DOM structure stay intact. ────────────────── */
	(function b64egg() {
		var btn = document.getElementById('b64-toggle');
		if (!btn) return;

		var SKIP = '#footer, .hero-type, [data-b64-skip]';
		var originals = null;   // [{ node, text }] captured lazily on first click
		var stage = 0;

		var CIPHERS = [
			{ name: 'Base64', label: 'b64',   fn: toBase64 },
			{ name: 'Hex',    label: 'hex',   fn: toHex },
			{ name: 'ROT13',  label: 'rot13', fn: rot13 }
		];

		// UTF-8-safe Base64 (btoa alone throws on non-Latin1 chars like — or é).
		function toBase64(s) {
			try { return btoa(unescape(encodeURIComponent(s))); }
			catch (e) { return s; }
		}
		function toHex(s) {
			var bytes = new TextEncoder().encode(s), out = '';
			for (var i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0');
			return out;
		}
		function rot13(s) {
			return s.replace(/[a-z]/gi, function (c) {
				var base = c <= 'Z' ? 65 : 97;
				return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
			});
		}

		// Collect the visible text nodes we're allowed to touch, once.
		function collect() {
			var out = [];
			var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
				acceptNode: function (node) {
					if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
					var p = node.parentElement;
					if (!p || p.closest('script, style, ' + SKIP)) return NodeFilter.FILTER_REJECT;
					return NodeFilter.FILTER_ACCEPT;
				}
			});
			var n;
			while ((n = walker.nextNode())) out.push({ node: n, text: n.nodeValue });
			return out;
		}

		function apply(cipher) {
			originals.forEach(function (rec) { rec.node.nodeValue = cipher.fn(rec.text); });
		}

		var toast, toastTimer;
		function showToast(msg) {
			if (!toast) {
				toast = document.createElement('div');
				toast.className = 'b64-toast';
				toast.setAttribute('role', 'status');
				toast.setAttribute('aria-live', 'polite');
				document.body.appendChild(toast);
			}
			toast.textContent = msg;
			// force reflow so re-triggering the transition restarts it
			void toast.offsetWidth;
			toast.classList.add('is-visible');
			clearTimeout(toastTimer);
			toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2600);
		}

		btn.addEventListener('click', function () {
			if (!originals) {
				originals = collect();
				document.body.classList.add('b64-on');   // enables wrap rules in theme.css
			}
			var cipher = CIPHERS[stage % CIPHERS.length];
			apply(cipher);
			btn.textContent = cipher.label;              // button reflects the active encoding
			showToast(cipher.name + ' — refresh to decode');
			stage++;
		});
	})();

})();
