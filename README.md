# ShopLight — Modern E‑commerce Frontend

![status-planning](https://img.shields.io/badge/status-planning-lightgrey) ![license-MIT](https://img.shields.io/badge/license-MIT-blue)

One-line summary
----------------
Interactive, beginner-friendly e‑commerce frontend (vanilla HTML/CSS/JS) with a polished UI, accessibility-first behaviours, and a lightweight 3D hero integration for a premium feel.

Live demo / Screenshots
-----------------------
- Live demo: (add deployed URL here)  
- Short GIF: assets/screenshots/flow.gif (browse → add to cart → checkout)  
- Screenshots:
  - `assets/screenshots/hero-desktop.png`
  - `assets/screenshots/hero-mobile.png`
  - `assets/screenshots/quickview.png`
  - `assets/screenshots/receipt.png`

Why this project
----------------
This repository is a focused learning project and a polished reference for building accessible, high-quality e‑commerce UIs without frameworks. It demonstrates:
- Design tokens and a reusable UI system (spacing, shadows, button tiers)  
- Progressive enhancement: lazy-loaded Spline hero with fallback image and reduced-motion support  
- Accessibility best-practices (focus management, ARIA roles, keyboard flows)  
- Lightweight, dependency-free interactive components that are easy to read and extend

Quick start
-----------
1. Clone:
```bash
git clone https://github.com/E-commerce-foundation/FrontEnd.git
cd FrontEnd
```
2. Open locally:
```bash
# Windows
start index.html

# macOS
open index.html
```
No build tools required.

Recommended dev workflow
------------------------
- Branch from `main` for features: `git checkout -b feat/my-feature`
- Make small, focused commits with clear messages
- Push branch and open a PR with screenshots / short GIF

Project structure
-----------------
- `index.html` — main entry (hero, product grid, cart, modals)  
- `assets/` — images and screenshots  
- `css/` — design tokens and component styles (`style.css`, `reset.css`)  
- `js/` — product data and app logic (`products.js`, `index.js`)  
- `docs/` — proposals, changelog, and design notes

Features (current)
------------------
- Responsive product grid and cards with image ratio control  
- Search with debounce, category & sort filters  
- Add to Cart, update quantity, remove items; cart drawer + checkout modal  
- Printable receipt (salePrice respected)  
- Favorites (localStorage) and quick-view modal  
- Toast notifications with accessible ARIA attributes  
- Lazy-loaded Spline hero (performance-minded) and noscript/image fallback

Design decisions (short)
------------------------
- Design tokens in CSS (:root) for consistent spacing, typography and color.  
- Button system: primary, secondary, and icon/tertiary for clear affordances.  
- Product card ratio 4:3 to keep imagery visually dominant and consistent.  
- Spline integration: lazy-load via IntersectionObserver; provide static fallback and reduced-motion path.

Accessibility & UX checklist
----------------------------
- [x] Keyboard accessible controls for cart, modal, and quick view  
- [x] Focus trap helpers and focus restore on modal/drawer close  
- [x] Toasts use `role="status"` and `aria-live` for screen reader announcements  
- [x] `prefers-reduced-motion` respected in CSS  
- [ ] Add aria-labels to any remaining interactive SVG-only buttons (ongoing review)  
- [ ] Run a full a11y audit (axe/Lighthouse) and publish results

Performance & engineering notes
-------------------------------
- Images use `loading="lazy"`; optimize (resize + WebP) before production.  
- Spline hero is lazy-loaded and injected only when near viewport to improve LCP.  
- Avoid heavy backdrop-filter/shadow on low-end devices (CSS fallbacks in place).  
- Suggested CI: GitHub Actions — run lint, unit tests (when added), and Lighthouse snapshot.

Testing & CI (recommended)
--------------------------
- Add basic unit tests for cart logic (Jest) and visual smoke tests with Playwright.  
- Add GitHub Actions workflow to run lint & tests on PRs and Lighthouse snapshots on deploy.

Contribution
------------
We welcome contributions aimed at improving the learning and production-readiness of this repo.

Suggested issues:
- `good-first-issue` — Add annotated screenshots for README  
- `good-first-issue` — Improve mobile navigation layout  
- `enhancement` — Add Playwright smoke tests for checkout flow

How to contribute
-----------------
1. Fork and branch: `git checkout -b feat/my-feature`  
2. Make changes and include screenshots/GIF in PR description  
3. Use a clear commit message and link to an issue when applicable

Docs & proposals
----------------
- Proposed UI/Spline changes: `docs/PROPOSED_UI_CHANGES.md`  
- Changelog (template): `docs/CHANGELOG.md` (will be added/maintained for releases)

Changelog (current)
-------------------
See `docs/PROPOSED_UI_CHANGES.md` for the latest planned UI improvements. A changelog will be created in `docs/CHANGELOG.md` and updated with each release.

License
-------
MIT — see LICENSE

Team & contacts
---------------
Listed contributors are in the original project. Add a preferred contact or maintainer link here.

Appendix — Immediate improvements applied
-----------------------------------------
- Robust HTML escaping and salePrice usage in totals/receipts (prevents XSS & pricing bugs).  
- Debounced search input, toast lifecycle with class-based transitions, one-shot cart-count animation.  
- Spline viewer moved into responsive hero grid with lazy-loading placeholder and noscript fallback.  
- Focus-trap helpers wired into modals/drawer for better keyboard accessibility.

Next steps (near-term)
----------------------
- Run a full accessibility and Lighthouse audit and add badges.  
- Add optimized image assets and a short GIF demonstrating the core flow.  
- Create `docs/CHANGELOG.md` and a GitHub Actions workflow for CI.
