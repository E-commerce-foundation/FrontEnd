# E-Commerce Website — Frontend (HTML, CSS & JavaScript)

![status-planning](https://img.shields.io/badge/status-planning-lightgrey) ![license-MIT](https://img.shields.io/badge/license-MIT-blue)

One-line summary
----------------
Interactive, beginner-friendly e‑commerce front-end that demonstrates browsing, cart management, and a simulated checkout using only HTML, CSS, and JavaScript.

Overview
--------
This project is a simple, educational e‑commerce website built with plain HTML, CSS, and JavaScript. It is intended to help learners practice layout, DOM manipulation, client-side state (localStorage), and basic UI flows such as browsing, adding to cart, and a simulated checkout.

Live demo / Screenshots
-----------------------
- Live demo: (add link here when deployed)  
- Screenshots to add: `assets/screenshots/hero-desktop.png`, `assets/screenshots/hero-mobile.png`  
- Recommended: add a short GIF showing the main shopping flow (browse → add to cart → checkout).

Features (MVP)
--------------
- Responsive product listing (grid + card layout)  
- Search and simple filters (category, size, color)  
- Add to Cart, Update Quantity, Remove from Cart  
- Simulated Checkout flow (order summary + printable/downloadable receipt)  
- Add to Favorites (local/temporary storage)  
- Simple user profile UI (signup/login form stub)

Tech stack
----------
| Technology | Purpose |
|---|---|
| HTML | Markup and structure |
| CSS (Grid & Flexbox) | Layout & responsive design |
| JavaScript (vanilla) | Interactivity, cart logic, localStorage |
| Git & GitHub | Version control |

Quick start (for beginners)
---------------------------
1. Clone the repo:
```bash
git clone https://github.com/E-commerce-foundation/FrontEnd.git
cd FrontEnd
```
2. Open in browser:
```bash
# Windows
start index.html

# macOS
open index.html
```
No build tools required — everything runs in the browser.

Project structure (short)
-------------------------
- `index.html` — main entry  
- `assets/` — images, screenshots, example product images  
- `css/` — main stylesheet and responsive rules  
- `js/` — product data, cart logic, UI helpers  
- `README.md` — project documentation

Usage / Primary user flows
--------------------------
1. Browse products → use filters or search  
2. Click "Add to Cart" on a product card  
3. Open Cart modal → update quantity or remove item  
4. Click "Checkout" → simulate payment and view printable receipt  
5. Download or print receipt from modal

Add short annotated screenshots for each flow in the README to help beginners follow along.

Contribution (beginner-friendly)
-------------------------------
We welcome contributions aimed at improving the learning experience.

Suggested workflow:
1. Fork the repository  
2. Create a branch: `git checkout -b feat/my-feature`  
3. Make small, focused changes and commit with clear messages  
4. Push and open a Pull Request describing the change and how to test it

Starter issues to add (examples):
- `good-first-issue` — Add hover state to product card  
- `good-first-issue` — Improve mobile navigation layout  
- `good-first-issue` — Add screenshots for README

Roadmap (learning-focused milestones)
------------------------------------
- Design & layout (MVP): product cards, responsive grid  
- Cart logic & localStorage: add/update/remove items  
- Checkout simulation & receipt export: printable page or PDF export  
- Favorites & basic user profile UI  
- Small UX polish and accessibility improvements

Team
----
| Name | GitHub | ID |
|------|--------|----|
| Amira Abdurahman | [amira](https://github.com/ami798) | ETS0170/16 |
| Abel Mekonen | [abel](https://github.com/bella-247/) | ETS0038/16 |
| Bemigbar Yehuwalawork | [bemigbar](https://github.com/Bem132833) | ETS0243/16 |
| Betelhem Kassaye | [betelhem](https://github.com/betelhem16) | ETS0265/16 |
| Bekam Yoseph | [bekam](https://github.com/bekam-bit) | ETS0240/16 |
| Barok Yeshiber | [barok](https://github.com/Barok-y) | ETS0224/16 |

How this helps you learn
------------------------
- Layout & CSS: practice Grid and Flexbox to build responsive cards and pages.  
- JavaScript: implement DOM updates, event handling, and simple state using localStorage.  
- UX thinking: design small, usable flows (product discovery → purchase).  
- Git & collaboration: make small PRs and learn code review basics.

License
-------
This project is licensed under the MIT License. See `LICENSE` for details.

Notes
-----
- This README focuses on beginner usability and clear, actionable next steps. QA, testing, and deployment notes are intentionally left for later so the team can focus on implementing and learning the core frontend functionality first.
