# Bubble Bliss — Final Project

**Student:** Ziruo Ke | **Course:** Web Development | **Due:** March 22, 2026

## Project Description

A professional, responsive, accessible 5-page website for **Bubble Bliss** — a fictional local milk tea shop. Built with vanilla HTML5, CSS3, and ES6+ JavaScript (no frameworks).

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, featured drinks, today's special, about teaser |
| Menu | `menu.html` | 20 drinks, live search, category filter, modal + customization builder |
| About | `about.html` | Brand story, values, team, sustainability stats |
| Locations | `locations.html` | Location cards, accessible store hours table |
| Contact | `contact.html` | Validated contact form with all input types |

## Setup

### Option A — Static (no server required)

Open any `.html` file directly in a browser — all features work except backend data persistence:

```
open index.html
```

### Option B — With Backend (recommended)

Runs the Express server which also serves the frontend at `http://localhost:3000`:

```bash
cd backend
npm install   # one-time setup
npm start     # visit http://localhost:3000
```

The backend provides:
- `GET /api/drinks` — live drink data from SQLite (with `?category=` and `?search=` support)
- `POST /api/contact` — saves contact form submissions
- `POST /api/orders` — saves placed orders

## Features Implemented

### Layout & Responsiveness
- Mobile-first CSS with breakpoints at 480px, 768px, and 1024px
- CSS Grid (menu cards, about values grid, footer columns)
- Flexbox (navigation, hero, location cards, form buttons)
- Sticky navigation header
- CSS custom properties (design system)

### Interactivity (JavaScript)
- **Debounced search** — 300ms debounce on menu search input
- **Category filter tabs** — ARIA tablist with keyboard arrow navigation
- **Drink modal** — full details, focus trap, Escape to close, backdrop click
- **Customization builder** — sweetness/ice selection with animated visual cup
- **Toast notification** — "Added to order" confirmation
- **Live form validation** — blur/input events with ARIA error messages
- **Scroll-in animations** — Intersection Observer for card entrance effects
- **Sticky nav shadow** — JS scroll event adds shadow at 10px scroll
- **Today's Special** — rotates daily via `new Date().getDay()`
- **Today's table row** — auto-highlights today in the store hours table

### Accessibility
- Skip-to-content link on every page
- All images have descriptive `alt` text
- `aria-label` on navigation, hamburger button, icon links
- `aria-expanded` / `aria-controls` on hamburger
- `aria-current="page"` on active nav link
- `role="dialog"`, `aria-modal`, `aria-labelledby` on modal
- `role="tablist"` / `role="tab"` / `aria-selected` on filter tabs
- `aria-live="polite"` on form error spans
- `aria-describedby` linking inputs to error messages
- Keyboard navigable modal with focus trap
- Accessible table: `<caption>`, `scope="col"`, `scope="row"` (locations page)
- Visible `:focus-visible` styles throughout
- WCAG AA contrast verified for all color pairs

### Performance
- `loading="lazy"` on all below-fold images
- `width` and `height` attributes on all images (prevents CLS)
- Unsplash URLs with `?w=600&q=80` size parameters
- CSS transitions using GPU-accelerated properties only (`transform`, `opacity`)
- No third-party libraries or frameworks

### Module Coverage
| Module | Demonstrated In |
|---|---|
| M2 — Semantic HTML | All pages: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| M3 — CSS Selectors & Typography | `styles.css`: element, class, pseudo-class selectors; typography scale |
| M4 — Visual Effects | Gradients, box-shadows, border-radius, transitions, `@keyframes` |
| M5 — Accessibility & Performance | ARIA, lazy loading, srcset-equivalent sizing, contrast ratios |
| M6 — Design System | CSS custom properties, spacing system, color palette |
| M7 — Responsive Mobile-First | Mobile-first CSS, 3 breakpoints, Flexbox + Grid |
| M8 — Accessible Tables | `locations.html`: `<caption>`, `scope`, zebra striping, today highlight |
| M9 — HTML Forms | `contact.html`: all input types, labels, radio, checkbox, select, textarea |

## Accessibility Audit

**Steps to run:**
1. Open any page in Chrome
2. Open DevTools → Lighthouse → Accessibility → Run audit
3. Also test with WAVE browser extension (wave.webaim.org)

**Known Issues:** None identified after implementation. Target: Lighthouse accessibility score ≥ 95.

## File Structure

```
final_project/
├── index.html
├── menu.html
├── about.html
├── locations.html
├── contact.html
├── css/
│   ├── styles.css        (main stylesheet — 650+ lines)
│   └── print.css         (print media styles)
├── js/
│   ├── main.js           (nav, scroll, animations, cart, today's special)
│   ├── menu.js           (drink data, filter, search, modal, customizer)
│   └── form.js           (contact form validation + API submission)
├── backend/
│   ├── server.js         (Express server + REST API)
│   ├── db.js             (SQLite schema via node:sqlite)
│   ├── seed.js           (auto-seeds drinks on first run)
│   ├── package.json
│   └── bubble_bliss.db   (auto-created SQLite database)
├── tests/
│   ├── test.html         (browser test runner)
│   └── tests.js          (8 automated tests)
├── README.md
└── design-docs.md        (design documentation)
```

## Known Limitations

- Images sourced from Unsplash CDN; offline access requires local images
- Backend uses `node:sqlite` (built into Node.js 24+); Node 22/23 requires `--experimental-sqlite` flag

## Third-Party Assets

- **Images:** Unsplash (unsplash.com) — Unsplash License (free, no attribution required)
- **Fonts:** System fonts only (Georgia, Arial) — no external font loading
- **Frontend libraries:** None — pure vanilla HTML/CSS/JS
- **Backend:** Express.js (MIT License) · `node:sqlite` built into Node.js 24
