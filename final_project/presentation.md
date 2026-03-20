# Bubble Bliss — Presentation Script
**Kim Ke · Web Development · Winter 2026**
**8–12 min recorded · 5 min live**

---

## Slide 1 — Title

Hi, I'm Kim. This is Bubble Bliss — a five-page website for a fictional milk tea shop.
I built the whole thing from scratch: vanilla HTML, CSS, and JavaScript.
No React, no frameworks, no libraries. Just me and the DOM.
And because I wanted to go a bit further, I also added a small Express backend
with a SQLite database, and the whole site is live on Render right now.

---

## Slide 2 — Architecture

Let me quickly walk through how the project is structured before diving into the pages.

There are five HTML files — one per page — all sharing a single stylesheet and a set of three JavaScript files.
`main.js` runs on every page: it handles the sticky nav, the hamburger menu, the cart, scroll animations, and the toast notifications.
`menu.js` only loads on the menu page — it manages the drink data, search, filters, and the modal.
`form.js` only loads on the contact page — it handles validation and submission.

The reason I split it this way is separation of concerns.
No page loads JavaScript it doesn't need.

For the backend, the same Express server does two things at once:
it serves all the static HTML and CSS files, and it also handles the API routes.
So there's no separate frontend server — one process, one deploy.

The site is also built with progressive enhancement in mind.
Every page works if you just open the HTML file directly in a browser.
The backend adds persistence — saved orders, saved contacts — but nothing breaks without it.

---

## Slide 3 — Design System

Before I wrote a single line of HTML, I figured out the entire design system.
Every color, every font size, every spacing value is a CSS custom property —
so if I wanted to change the brand purple across all five pages, it's literally one line.
I checked all the color combinations against WCAG contrast requirements
before committing to them.
For fonts, I went with Georgia for headings and Arial for body —
both system fonts, so there's zero load time from external font files.
And spacing follows a strict 8px grid throughout.

---

## Slide 4 — Layout & Responsiveness

The whole site is mobile-first — base styles target a phone,
and I layer on complexity as the screen gets wider.
I used CSS Grid for anything 2D, like the menu cards or the team grid,
because it reflows automatically without needing breakpoint rules in the grid itself.
Flexbox handles 1D things — the nav, the hero buttons, location cards side by side.
I have three breakpoints at 480, 768, and 1024 pixels.
The sticky header is just five lines of JavaScript that adds a shadow
when you scroll past 10 pixels.

---

## Slide 5 — Menu Page

The menu page is where most of the JavaScript lives.
All 20 drinks are stored as a JavaScript array of objects,
and a single renderCards function builds all the DOM.
The search input has a 300ms debounce —
so it waits until you stop typing before filtering,
instead of running on every single keystroke.
When you open a drink card, it's a full modal with a focus trap —
Tab and Shift-Tab stay inside the modal until you close it,
and Escape closes it and returns focus to the card you opened.
The cart uses sessionStorage so your items survive
when you navigate between pages.
And there's a favorites system in localStorage
that actually greets you by name when you come back.

---

## Slide 6 — Accessibility

I treated accessibility as part of the structure, not something I'd fix at the end.
Every page has a skip-to-content link.
The hamburger menu sets aria-expanded on every toggle,
and it closes on Escape or if you click outside of it.
The category filter tabs work with arrow keys using the ARIA tablist pattern.
Form errors use role="alert" so screen readers announce them without losing focus.
Every color pair in the site meets WCAG AA minimum contrast —
body text is actually at 15.8 to 1, which is AAA.

---

## Slide 7 — Contact Form

The contact form covers every HTML5 input type the rubric asks for:
text, email, tel, radio buttons, checkboxes, a select, and a textarea.
I put novalidate on the form so the browser doesn't take over —
all validation runs through JavaScript.
The blur event validates when you leave a field.
The input event clears the error message as soon as you start correcting it.
Each input is linked to its error span with aria-describedby,
so screen readers know which error belongs to which field.
When you submit, it posts to the backend, saves to the database,
and plays a typewriter animation for the success message.

---

## Slide 8 — Locations Table

The locations page has an accessible data table.
I put scope="col" on the day headers and scope="row" on the location headers —
which means a screen reader will say "Monday, Palo Alto: 9AM to 9PM"
instead of just reading out a number with no context.
The rows alternate with zebra striping using nth-child(even).
And today's row gets a pink highlight automatically —
I just grab new Date().getDay() and match it to a data attribute on each row.

---

## Slide 9 — Backend

For extra credit, I built a small backend.
It's an Express server with three endpoints:
GET /api/drinks serves the menu with optional search and category filters,
POST /api/contact saves contact form submissions,
and POST /api/orders saves placed orders.
The database is SQLite using node:sqlite,
which is built directly into Node 24 —
so there's nothing to install or compile.
The important thing is that the site works exactly the same as a static file —
the backend just adds persistence on top.
And it auto-deploys from GitHub every time I push.

---

## Slide 10 — Admin Dashboard

Since I'm saving orders and contacts to a database,
I also built an admin page at /admin.
It shows every order — what was ordered, the customizations,
the total, the timestamp — and every contact form submission.
There's a login page that matches the site's design,
and once you're in there's a logout button in the header.
It's protected server-side with a cookie-based session,
so anyone hitting /admin without being logged in just sees the login form.
I'll pull this up during the demo to show a live order I place right before.

---

## Slide 11 — What I Learned

Three things that actually stuck with me.

First: build the design system before anything else.
By the time I got to page five, it took maybe 20% of the time page one did —
because every decision was already made and locked in.

Second: accessibility is architecture.
I tried to retrofit focus traps and aria-live regions onto an existing page once, and it was a mess.
Once I started treating them as part of the HTML structure from the beginning, they were easy.

Third: the bugs you hate most teach you the most.
I spent about an hour debugging why my entire menu script just silently stopped running.
Turned out it was a top-level return statement in strict mode.
I now understand JavaScript execution in a way no tutorial would have gotten me there.

---

## Slide 12 — Demo

Alright, let's look at the live site.

I'll start on the home page —
scroll down slowly so you can see the clip-reveal headings and the card entrance animations.
Then I'll go to the menu, do a quick search,
click into a drink to show the modal and the customizer,
add it to the cart, and place an order.
Then I'll hit the contact form, fill it out, and submit it.
And then I'll go to /admin and show the order and the contact form submission
that just came in — live from the database.

---

*~9 minutes at a natural speaking pace.*
*5-min live version: skip slides 3, 6, 7. Max 45 seconds per slide. Hit the demo at 3:30.*
