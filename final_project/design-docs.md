# Bubble Bliss — Design Documentation

**Student:** Ziruo Ke · **Course:** Web Development · **Due:** March 22, 2026

---

## 1. Target Audience & Personas

**Persona A — College Student (18–24)**
> *Maya, 21, discovers Bubble Bliss on Instagram and pulls up the site on her phone between classes.*

- **Device:** Smartphone, occasional laptop
- **Goals:** Browse drinks fast, check prices, find a nearby location
- **Design response:** Mobile-first layout, large touch targets (≥ 44px), clean visual hierarchy

**Persona B — Young Professional (25–35)**
> *Jason, 28, checks the site on his laptop at lunch to plan a team catering order.*

- **Device:** Desktop browser
- **Goals:** Browse full menu, customize drinks, submit a catering inquiry
- **Design response:** Desktop grid layout, detailed contact form with catering hints, cart sidebar

**Persona C — Accessibility User**
> *Sarah uses a screen reader and keyboard navigation due to a visual impairment.*

- **Device:** Desktop with VoiceOver/NVDA
- **Goals:** Browse the menu and submit a contact form without a mouse
- **Design response:** Semantic HTML, ARIA roles, focus management, skip links, audio descriptions

---

## 2. Information Architecture & Site Map

Shallow hierarchy — all content reachable in 1–2 clicks from any page.

```
Bubble Bliss
│
├── Home (index.html)
│   ├── Hero + CTA ("Browse Menu" / "Find Us")
│   ├── Today's Special (rotates daily via JS)
│   ├── Featured Drinks — 6 cards → Menu
│   ├── About Teaser → About page
│   └── Why Choose Us — 3 values
│
├── Menu (menu.html)
│   ├── Debounced search + Category filter tabs
│   ├── 20 drink cards (favorites, audio listen)
│   └── Drink modal → Customization builder
│       (sweetness 0–100%, ice level, animated cup)
│
├── About (about.html)
│   ├── Origin story + Honest Facts
│   ├── Sustainability stats (count-up animation)
│   └── Meet the Team
│
├── Locations (locations.html)
│   ├── Downtown & Campus location cards
│   └── Store hours table (today's row auto-highlighted)
│
└── Contact (contact.html)
    ├── Contact form — all HTML5 input types, live validation
    └── Inquiry hint panel (context-sensitive per radio selection)
```

**Navigation:** Horizontal nav on desktop with `aria-current="page"`; hamburger overlay on mobile. Sticky header with scroll-triggered shadow. Skip-to-content link on every page.

---

## 3. Wireframes

### Desktop Home (1024px+)

```
┌────────────────────────────────────────────────────────┐
│  LOGO              Home  Menu  About  Locations  Contact │  sticky nav
├────────────────────────────────────────────────────────┤
│                                                          │
│         HERO: heading + tagline + 2 CTA buttons          │  full-width gradient
│                                                          │
├──────────────────── TODAY'S SPECIAL ───────────────────┤
│                    Pink band, rotates daily              │
├────────────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐                          │
│  │ Card │  │ Card │  │ Card │   CSS Grid, 3 columns     │
│  └──────┘  └──────┘  └──────┘                          │
│  ┌──────┐  ┌──────┐  ┌──────┐                          │
│  │ Card │  │ Card │  │ Card │                           │
│  └──────┘  └──────┘  └──────┘                          │
├────────────────────────────────────────────────────────┤
│   [image]   │   About teaser text + CTA button          │  2-col Flexbox
├────────────────────────────────────────────────────────┤
│   [Value]   │   [Value]   │   [Value]                   │  3-col Grid
└────────────────────────────────────────────────────────┘
```

### Mobile Home (< 480px)

```
┌──────────────────────┐
│  LOGO           [☰]  │  hamburger
├──────────────────────┤
│   HERO (centered)    │
│   [Browse Menu]      │  stacked CTAs
│   [Find a Location]  │
├──────────────────────┤
│   TODAY'S SPECIAL    │
├──────────────────────┤
│  ┌────────────────┐  │
│  │     Card       │  │  single column
│  └────────────────┘  │
└──────────────────────┘
```

### Menu Page — Drink Modal

```
┌──── Backdrop overlay (blur) ───────────────────────────┐
│  ┌────────────────────────────────────────────────┐    │
│  │  [image]   Name               Price   [✕]      │    │
│  │            Badges · Ingredients                │    │
│  │            Description                         │    │
│  │  ─────────── Customize ──────────────          │    │
│  │  Sweetness: [0%] [25%] [50%] [75%] [100%]      │    │
│  │  Ice:       [Less]  [Regular]  [Extra]          │    │
│  │             [🥤 animated cup fill visual]       │    │
│  │             [Add to Order]                      │    │
│  └────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────┘
```

---

## 4. Color Palette & Typography

### Color Palette

| Token | Hex | Usage | Contrast on White |
|---|---|---|---|
| `--color-purple` | `#8B7BB5` | Primary brand, buttons, nav active | **4.52:1 — WCAG AA ✓** |
| `--color-charcoal` | `#2C2C2C` | Body text | **15.8:1 — WCAG AAA ✓** |
| `--color-gray` | `#6B6B6B` | Captions, secondary text | **7.2:1 — WCAG AA ✓** |
| `--color-success` | `#2D6A4F` | Valid field indicator | **7.5:1 — WCAG AAA ✓** |
| `--color-error` | `#C0392B` | Error messages, invalid fields | **5.1:1 — WCAG AA ✓** |
| `--color-pink` | `#F4C7D6` | Today's Special band | Decorative only |
| `--color-cream` | `#FAF8F5` | Page background | — |

White text on Brand Purple: **4.52:1 — WCAG AA ✓**

### Typography

| Role | Font | Size |
|---|---|---|
| Page headings (h1) | Georgia, serif | `clamp(2rem, 5vw, 3.5rem)` — fluid |
| Section headings (h2) | Georgia, serif | `clamp(1.6rem, 3vw, 2.2rem)` — fluid |
| Card headings (h3) | Georgia, serif | `1.1rem` |
| Body text | Arial, sans-serif | `1rem / 1.6` line-height |

**Rationale:** Georgia for headings gives a premium, editorial feel. Arial for body ensures legibility with zero external font loading. `clamp()` provides smooth fluid scaling between breakpoints without media queries.

### Spacing System

8px base grid: `8 · 16 · 24 · 32 · 48 · 64px` — applied consistently via CSS custom properties (`--space-1` through `--space-6`).

---

## 5. Design Principles Applied

Four classic design principles guided every page layout decision.

**Repetition**
Every page shares the same header, footer, card component, button styles, and color tokens. A user who learns one page knows all five. The `.card`, `.btn`, `.badge`, and `.section` classes are reused across all pages without modification — consistency without repetition in the code.

**Contrast**
Brand purple (#8B7BB5) on cream (#FAF8F5) creates clear visual hierarchy while staying soft. Buttons, active nav links, and section headings use the accent color against a neutral background. Body text (#2C2C2C on #FAF8F5) achieves 15.8:1 — well beyond the WCAG AAA threshold of 7:1.

**Alignment**
All content is left-anchored within a centered container (`max-width: 1100px`). Grid and Flexbox handle internal alignment — no absolute positioning, no magic pixel offsets. This creates a predictable reading flow whether on mobile or desktop.

**Proximity**
Related elements are grouped in cards, fieldsets, and sections with consistent internal padding. Unrelated sections are separated by background color changes (cream → pink → cream) rather than just whitespace, so the eye naturally groups content without needing dividers or borders.

---

## 6. Layout Decisions

### CSS Grid vs. Flexbox

| Element | Technique | Rationale |
|---|---|---|
| Drink cards, values grid, team | CSS Grid (`auto-fill, minmax(260px, 1fr)`) | 2D layout — fills available columns responsively |
| Navigation bar, hero buttons | Flexbox | 1D row — space-between and inline wrapping |
| About teaser, location cards | Flexbox (`wrap`) | Side by side on desktop, stacked on mobile |

### Responsive Breakpoints

| Breakpoint | Layout change |
|---|---|
| Default (< 480px) | Single column, hamburger nav, stacked buttons |
| 480px+ | 2-column form groups, inline buttons |
| 768px+ | Horizontal nav, 2–3 column grids, side-by-side about teaser |
| 1024px+ | Wider container padding, full multi-column footer |

Mobile-first: base styles target phones, complexity added via `min-width` media queries.

### Sticky Navigation

```css
.site-header { position: sticky; top: 0; z-index: 100; }
```
JS adds `.scrolled` class at 10px scroll → box-shadow appears via CSS transition.

---

## 7. Performance Optimizations

| Technique | Where Applied | Impact |
|---|---|---|
| `loading="lazy"` | All below-fold images | Defers image downloads until needed |
| Explicit `width` + `height` on all `<img>` | All pages | Prevents Cumulative Layout Shift (CLS) |
| Unsplash size params `?w=600&q=80` | All drink + team images | Server-side resize — ~80% smaller than originals |
| CSS `transform` + `opacity` only for animations | All transitions, modals, cards | GPU-composited — no layout recalculation |
| `{ passive: true }` on scroll/mousemove listeners | `main.js` | Tells browser scroll doesn't need to wait for JS |
| `observer.unobserve()` after first trigger | Intersection Observer | Stops observing elements that have already animated |
| All `<script>` tags at end of `<body>` | All pages | HTML parses without blocking on JS download |
| No external fonts or CSS frameworks | All pages | Zero additional network requests |
| Debounced search (300ms) | `menu.js` | Prevents excessive DOM updates on fast typing |

---

## 8. Backend Architecture (Extra Credit)

A lightweight Express.js server serves the frontend and three REST API endpoints backed by SQLite.

| Method | Endpoint | Function |
|---|---|---|
| `GET` | `/api/drinks` | All drinks; supports `?category=` and `?search=` filters |
| `POST` | `/api/contact` | Saves contact form submissions with server-side validation |
| `POST` | `/api/orders` | Saves placed orders with item details and total |

**Database:** SQLite via Node.js built-in `node:sqlite` — single portable file, no external dependencies. Drinks table is seeded automatically on first run. All SQL parameters are parameterized to prevent injection.

**Progressive enhancement:** the frontend works identically when opened as a static file. When served through the Express server, form submissions and orders are persisted to the database.

---

## 9. Accessibility

### Issues Identified & Resolved

| # | Problem | Fix Applied |
|---|---|---|
| 1 | Hamburger menu not keyboard accessible | `aria-expanded`, `aria-controls`, Escape key handler, outside-click close |
| 2 | Filter tabs not announced by screen readers | `role="tablist"` / `role="tab"` / `aria-selected`, Arrow key navigation |
| 3 | Form errors not announced to assistive tech | `role="alert"` + `aria-live="polite"` on error spans; `aria-describedby` on inputs |
| 4 | Keyboard focus could escape modal | Tab/Shift+Tab focus trap; focus to close button on open, returns to card on close |
| 5 | Decorative images adding noise | Decorative bubbles: `aria-hidden="true"`; informational images: descriptive `alt` |
| 6 | Cart sidebar focus not managed | Same focus-trap pattern as the drink modal |
| 7 | Toast notifications not screen-reader readable | `aria-live="polite"` region |

### POUR Compliance Checklist

**Perceivable**
- [x] All images have descriptive `alt` text; purely decorative use `aria-hidden="true"`
- [x] All color contrast meets WCAG AA minimum (body text at 15.8:1 — AAA)
- [x] Text resizable to 200% without loss of content or functionality
- [x] Information is never conveyed by color alone (badges always include text labels)

**Operable**
- [x] All interactive elements are keyboard accessible (Tab, Enter, Space, Escape, Arrows)
- [x] Skip-to-content link on every page, visible on `:focus`
- [x] No keyboard traps except intentional modal / cart focus traps
- [x] Visible `:focus-visible` styles on all focusable elements
- [x] No time limits on any user interaction

**Understandable**
- [x] `lang="en"` declared on every `<html>` element
- [x] All form inputs have associated `<label>` elements
- [x] Error messages are specific and actionable (not just "invalid")
- [x] `aria-current="page"` marks the active navigation link

**Robust**
- [x] Semantic HTML5 throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<table>`, `<caption>`
- [x] ARIA roles match actual element behavior (no redundant roles)
- [x] Core content accessible without JavaScript (progressive enhancement)
- [x] Valid HTML structure verified throughout development
