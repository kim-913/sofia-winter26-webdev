# Bubble Bliss — Final Project Presentation
### Web Development · Sofia University · Winter 2026
### Kim Ke · March 22, 2026

---

## Slide Deck Outline (10 slides · ~8 minutes)

---

### SLIDE 1 — Title
**Heading:** Bubble Bliss
**Subheading:** A Full-Stack Web Experience for a Fictional Milk Tea Shop
**Visual:** Screenshot of the home page hero (full width, bubbles floating)
**Bottom:** Kim Ke · Web Dev · Sofia University Winter 2026

> **Script (30 sec):**
> "Hi everyone — my name is Kim, and today I'm presenting Bubble Bliss, a multi-page
> website for a fictional milk tea shop. I built this entirely from scratch using vanilla
> HTML, CSS, and JavaScript — no frameworks, no libraries. Everything you'll see was
> hand-coded. Let me walk you through it."

---

### SLIDE 2 — Project Overview
**Heading:** What I Built
**Content (bullet list):**
- 5 fully responsive pages: Home, Menu, About, Locations, Contact
- 1 unified design system (custom CSS properties, 3 breakpoints)
- 3 JavaScript files powering interactive features
- Meets every module 2–9 rubric requirement

**Visual:** File tree diagram showing the project structure

> **Script (45 sec):**
> "The project has five pages, each serving a different purpose. The home page draws
> you in, the menu page is the most interactive — with live search, filter tabs, and a
> modal detail view. The about page tells the brand story. Locations has an accessible
> HTML table. And the contact page has a fully validated form with real-time feedback.
> All pages share one CSS file with a design system built on custom properties — things
> like color tokens, spacing scales, and typography — so every page looks consistent."

---

### SLIDE 3 — Design System
**Heading:** Design System
**Visual:** Color swatches for the 8 brand colors + font pairing card
**Content:**
- 8 CSS custom properties for color (purple, pink, cream, mint, charcoal...)
- 2 font families (Georgia serif headings · Arial sans body)
- Spacing scale: --space-1 through --space-6 (8px → 64px)
- Reusable components: .btn, .card, .badge, .grid-auto, .container

> **Script (45 sec):**
> "Before writing a single page, I built a design system in CSS. Every color is a custom
> property — so if I want to change the brand purple, I change one line and it updates
> everywhere. Same for spacing — I use a consistent scale from 8px up to 64px. This is
> how real product teams work. Having this foundation made building five pages much
> faster and kept everything visually cohesive."

---

### SLIDE 4 — Home Page
**Heading:** Home Page — First Impressions Matter
**Visual:** Screenshot of hero section with floating bubble animation
**Content:**
- Full-viewport hero with CSS @keyframes 'float' bubble animation
- Featured drinks grid (CSS Grid, auto-fill columns)
- Sticky header with scroll shadow (JS scroll event)
- Hamburger menu on mobile with ARIA aria-expanded
- Word-by-word hero title reveal (Apple-style)
- 3D card tilt on hover (mousemove → perspective transform)
- Smooth page entrance fade on load

> **Script (1 min):**
> "The home page is all about making a great first impression. The hero uses a CSS
> gradient background and pure CSS animation — those floating circles are just div
> elements with border-radius 50% and a keyframe animation. No JavaScript, no canvas.
>
> Watch the heading when the page loads — it splits into individual word spans with
> staggered animation delays, so each word rises into place, exactly like Apple product
> pages. Below that, as you scroll, every section heading does a 'clip reveal': the text
> literally slides up through an invisible floor using CSS overflow:hidden and transform.
>
> Hover over any card and it tilts in 3D toward your mouse — that's 12 lines of
> JavaScript calculating rotateX and rotateY from the cursor position."

---

### SLIDE 5 — Menu Page (LIVE DEMO)
**Heading:** Menu Page — Interactive Drink Catalog
**Visual:** Screenshot of the menu grid + modal open
**Content:**
- 20 drinks stored as a JavaScript data array
- Live debounced search (300ms) + 5 filter tabs
- Click any card → modal with ingredients, customizer (sweetness, ice)
- Add to Cart → floating cart sidebar with sessionStorage persistence
- ❤️ Favorite button → localStorage remembers your usual order

> **Script (1.5 min):**
> "This is the page I'm most proud of. All 20 drinks live in a JavaScript array — no
> backend, no database. The renderCards function takes a filtered list and builds the
> HTML dynamically. The search input uses a debounce so it doesn't fire on every
> keystroke — it waits 300 milliseconds, which is a real performance technique.
>
> [DEMO: type 'taro' in search → cards filter. Click Milk Tea tab → filter. Click a card.]
>
> Clicking a card opens a modal — I built focus trapping so tabbing stays inside the modal
> until you close it. That's an accessibility requirement. Inside the modal you can
> customize sweetness and ice level, then add to cart. The cart persists across pages
> using sessionStorage. And the heart button saves your single favorite drink to
> localStorage — so the next time you visit, the page greets you by name."

---

### SLIDE 6 — Locations Page
**Heading:** Locations — Accessible HTML Tables (Module 8)
**Visual:** Screenshot of the store hours table with today's row highlighted
**Content:**
- <table> with <caption>, <thead>, <th scope="col/row">
- Zebra striping: tr:nth-child(even)
- Today's row highlighted in pink via new Date().getDay()
- Location cards with Flexbox layout

> **Script (30 sec):**
> "Module 8 was all about accessible tables, and the locations page shows every
> technique. The table has a caption, proper scope attributes on all header cells for
> screen reader navigation, and zebra striping with the nth-child selector. My favorite
> detail: JavaScript reads today's day of the week and adds a highlight class to that row.
> So if you open this on a Monday, Monday is highlighted in pink."

---

### SLIDE 7 — Contact Page (LIVE DEMO)
**Heading:** Contact Form — Real-Time Validation
**Visual:** Screenshot of form with error states + success banner
**Content:**
- All Module 9 input types: text, email, tel, radio, checkbox, select, textarea
- Inline error messages with ARIA aria-describedby (accessible)
- blur validation + input auto-clear on correction
- Submit: 1.4s loading state → typewriter success animation
- Personalized "Hey Kim!" response based on name field

> **Script (1 min):**
> "The contact form covers every input type from Module 9. Validation runs on blur —
> when you leave a field — and errors are cleared as you correct them. The error spans
> are linked to inputs with aria-describedby so screen readers read the error aloud.
>
> [DEMO: hit submit empty → errors appear. Fill it in → hit Send Message.]
>
> When you submit, the button shows a loading spinner for 1.4 seconds — that's a fake
> delay, but in a real app it would be a network request. Then the form swaps out for a
> personalized success banner, and the message types out character by character. It
> also reads the message aloud using the Web Speech API — that's a native browser
> feature, zero libraries."

---

### SLIDE 8 — Technical Highlights
**Heading:** Under the Hood
**Visual:** Code snippet (one of the impressive ones — focus trap or debounce)
**Content (two-column):**

| Feature | Technique |
|---|---|
| Web Speech API | SpeechSynthesisUtterance, voice selection |
| Focus trap in modal | tabIndex + keydown Tab intercept |
| Debounced search | clearTimeout / setTimeout pattern |
| Cart | sessionStorage JSON serialization |
| Favorites | localStorage with single-item constraint |
| Scroll progress bar | window.scrollY / scrollHeight × 100% |
| Apple clip-reveal | CSS overflow:hidden + translateY(105%) on inner span |
| 3D card tilt | mousemove → perspective(700px) rotateX/Y + scale |
| Hero parallax | scroll event → translateY + opacity fade |
| Count-up stats | IntersectionObserver + requestAnimationFrame cubic ease |
| Word-by-word reveal | JS splits h1 → spans with staggered CSS animation-delay |
| Form typewriter | setInterval character-by-character output |

> **Script (1.5 min):**
> "Let me highlight the most technically interesting pieces. The Apple-style scroll effects
> use a combination of IntersectionObserver and CSS. For the heading clip-reveal: I wrap
> the heading text in a span, set the parent to overflow:hidden, and start the span at
> translateY(105%). When IntersectionObserver fires, a CSS class adds the transition and
> snaps it to translateY(0). The text literally emerges from the floor. No library needed.
>
> The 3D card tilt uses event delegation — one mousemove listener on the document
> calculates cursor position relative to whichever .card is under the mouse, then applies
> perspective(700px) rotateX/Y. It works for dynamically generated cards too, because
> it delegates to the document.
>
> The scroll progress bar is one line of math: scrollY divided by (total height minus
> viewport height) times 100. Assign that to a CSS width property. Done."

---

### SLIDE 9 — What I Learned
**Heading:** Key Takeaways
**Content:**
- CSS Custom Properties are not optional — they are how real teams scale CSS
- Accessibility isn't extra credit; it's correctness (ARIA, scope, focus management)
- Debouncing, sessionStorage, localStorage — small techniques, huge UX impact
- Building for mobile first forces better layout decisions
- JavaScript without frameworks is harder but you understand everything you write

> **Script (45 sec):**
> "If I had to pick three things I'm taking away from this project: First, CSS custom
> properties changed how I think about design systems — being able to swap the entire
> color palette by changing five lines is powerful. Second, accessibility is not a bonus
> feature. ARIA attributes, focus management, semantic HTML — these are what separate
> a website from a real product. Third, vanilla JavaScript forces you to understand your
> tools. There's no magic. Every feature I built, I can explain exactly how it works."

---

### SLIDE 10 — Live Demo + Q&A
**Heading:** Let's Look at It Live
**Visual:** QR code or local URL

> **Script (30 sec intro, then open browser):**
> "I'll open the site now and you can ask me to navigate to any page or try any feature.
> The search, the modal, the form, the cart — everything is live. Happy to answer
> questions about any of the implementation choices I made."

---

## Presentation Tips

- **Demo order:** Home → Menu (search + modal + cart) → Contact (submit form) → Locations (table)
- **Time check:** Aim for 7–8 minutes of talking + 2 minutes of live demo = 10 min total
- **If something breaks live:** Stay calm, explain the feature verbally. "Here's what it normally does..."
- **Pause after the typewriter effect on the success banner** — let classmates see it, it's impressive
- **Point out the scroll progress bar** on tall pages (menu page is good for this)
- **Speak to the ARIA attributes** — most classmates won't have done this, it differentiates your project

---

## Frequently Asked Questions (prepare these)

**Q: Why no framework like React?**
> "The assignment required vanilla JS, and honestly I think it made me a better
> developer. I had to understand DOM manipulation, event delegation, and state
> management without any abstraction helping me."

**Q: How does the modal focus trap work?**
> "When the modal opens, I store a reference to the element that was focused before.
> I add a keydown listener that intercepts Tab and Shift-Tab, and forces focus to stay
> within the modal's focusable elements. On close, focus returns to the original element."

**Q: What would you add with more time?**
> "A real backend with Node.js — actually saving form submissions. User accounts so
> the favorites system is synced across devices. And I'd add a dark mode toggle using
> prefers-color-scheme plus a CSS class override."

**Q: How long did this take?**
> "The design system and first three pages took about a week. The menu page
> interactions — search, filter, modal, cart — took another week. The final polish,
> accessibility work, and the Web Speech API were the last few days."
