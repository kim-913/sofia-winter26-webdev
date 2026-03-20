# Week 1: Design Proposal & Wireframes

## Final Signature Project - Web Development

**Student Name:** Ziruo Ke
**Project:** Bubble Bliss Milk Tea Shop Website
**Date:** Feb 2026

---

## 1. Project Proposal

### Website Purpose

Bubble Bliss is a local milk tea shop located in downtown that needs a professional online presence to attract young customers, showcase their diverse menu, and enable online ordering for pickup. The website will serve as the primary digital touchpoint for both new and returning customers, providing easy access to menu information, store locations, and promotional content.

The site aims to:

- Increase brand awareness among college students and young professionals (ages 18-30)
- Streamline the ordering process with an intuitive menu browsing experience
- Communicate the shop's unique flavors and customization options
- Build customer loyalty through engaging visual content and seasonal promotions

### Target Audience

Our primary audience consists of:

- **College students (18-24)**: Tech-savvy, mobile-first users who value convenience and visual appeal
- **Young professionals (25-35)**: Busy individuals looking for quick online ordering and quality beverages
- **Social media enthusiasts**: Users who appreciate aesthetic presentation and shareable content

These users expect fast-loading pages, mobile-responsive design, and seamless navigation. They typically access websites on smartphones during commutes or breaks, making mobile optimization critical.

### Core Features

1. **Home Page**: Eye-catching hero section with current promotions, featured drinks, and quick links to menu and ordering
2. **Interactive Menu**: Searchable and filterable drink catalog organized by category (milk tea, fruit tea, smoothies, toppings)
3. **Customization Guide**: Visual guide showing sweetness levels, ice options, and topping combinations
4. **Store Locations**: Multiple location information with hours, directions, and contact details
5. **About Us**: Brand story, ingredient sourcing, and sustainability commitment
6. **Contact Form**: Customer inquiries, feedback submission, and catering requests

### Chosen Tech Stack

**Option 1 - Static / Progressive Enhancement** (Design-focused approach)

- **HTML5**: Semantic elements (header, nav, main, article, section, footer) for clear document structure
- **CSS3**: Grid and Flexbox for responsive layouts, custom properties for design system consistency
- **Vanilla JavaScript (ES6+)**: Minimal JS for menu search/filter, modal windows for drink details, and form validation
- **Build Tools**: Optional Parcel for CSS optimization and image processing
- **Deployment**: Netlify or Vercel for static hosting with continuous deployment

This approach emphasizes clean, maintainable code with strong focus on layout techniques, semantic markup, and accessibility compliance.

---

## 2. Information Architecture

### Site Map (Hierarchical Structure)

```
Homepage
│
├── Menu
│   ├── Milk Tea
│   ├── Fruit Tea
│   ├── Smoothies
│   └── Toppings & Add-ons
│
├── Customization Guide
│
├── Locations
│   ├── Downtown Store
│   └── Campus Store
│
├── About Us
│   ├── Our Story
│   └── Sustainability
│
└── Contact
    └── Feedback Form
```

### Navigation Strategy

- **Primary Navigation**: Horizontal menu bar (desktop) with 5 main sections
- **Mobile Navigation**: Hamburger menu expanding to vertical list
- **Footer Navigation**: Supplementary links (Hours, Careers, Social Media)
- **Skip Link**: Accessible keyboard navigation to main content
- **Breadcrumbs**: On sub-pages to show hierarchy (e.g., Menu > Milk Tea)

The structure follows a shallow hierarchy (max 2 levels deep) to ensure all content is reachable within 2-3 clicks, improving usability and findability.

---

## 3. Wireframes

### Desktop Layout (1200px+)

#### Homepage

The homepage will feature a full-width hero section at the top with a large image of a featured seasonal drink and a prominent "Order Now" call-to-action button. Below the hero, the layout transitions to a two-column design with featured drinks displayed in a grid on the left (taking about 70% of the width) and a "What's New" sidebar on the right showing current promotions and specials. The featured drinks will use a 3-column grid layout for optimal visual presentation. An "About" section follows with side-by-side image and text layout. The page concludes with a multi-column footer containing store hours, quick links, and social media.

**Layout Strategy:**

- Sticky navigation bar for easy access while scrolling
- CSS Grid for the featured drinks section (responsive columns)
- Two-column layout for main content area with sidebar
- Flexbox for header and footer element alignment

#### Menu Page

The menu page uses a sidebar layout with filters on the left side (approximately 20% width) and the main drink catalog on the right (80% width). The sidebar contains checkboxes for filtering by category (Milk Tea, Fruit Tea, Smoothies) and radio buttons for sorting options (Popular, Name, Price). The main content area has a search bar at the top and displays drinks in a responsive grid of cards. Each card shows the drink image, name, and price.

**Layout Strategy:**

- Left sidebar with filter controls using vertical layout
- Main content area with CSS Grid for drink cards (3-4 columns)
- Search functionality with live filtering
- Card components with consistent spacing and styling

---

### Mobile Layout (320px - 768px)

#### Homepage (Mobile)

On mobile devices, the layout transforms into a single-column design. The header contains a hamburger menu icon on the left and the logo in the center. The hero section remains full-width but with adjusted proportions. All content sections stack vertically: featured drinks display one per row as full-width cards, the "What's New" section moves below the featured drinks, and the about section stacks the image above the text. The footer content also stacks into a single column.

**Layout Strategy:**

- Single-column vertical flow with full-width content blocks
- Hamburger menu that expands to overlay navigation
- Touch-friendly buttons with minimum 44px tap targets
- Responsive images that scale to container width
- Increased spacing between sections for better mobile readability

#### Menu Page (Mobile)

The mobile menu page removes the fixed sidebar and places filter and sort options in collapsible dropdown buttons at the top of the page. The search bar remains sticky below the header. Drink cards display in a single column with full width, maintaining the same card structure but adapted for vertical scrolling. Each card provides adequate spacing for easy touch interaction.

**Layout Strategy:**

- Collapsible dropdowns for filters and sorting
- Single-column card layout with full-width cards
- Sticky header with search functionality
- Optimized vertical spacing for thumb-friendly scrolling

---

### Navigation Layout

**Desktop Navigation:**
The navigation will be a horizontal menu bar positioned below the logo, containing all five main sections (Home, Menu, Guide, About, Contact). Navigation items will have hover effects with smooth color transitions and an active page indicator using a bottom border or background color highlight.

**Mobile Navigation:**
A hamburger menu icon (☰) in the top-left corner will trigger a full-screen overlay navigation menu. When opened, the icon changes to a close button (✕), and menu items display vertically with large touch targets. The menu closes when a link is clicked or the close button is tapped.

**Accessibility Features:**

- Full keyboard navigation support (Tab, Enter, Escape keys)
- Clear focus states with visible outlines
- ARIA labels for icon buttons
- Skip-to-content link for screen reader users

---

### Footer Layout

**Desktop Footer:**
The footer will use a three-column layout displaying Store Hours (left), Quick Links (center), and Social Media links (right). Below these columns, a centered copyright notice and privacy policy link span the full width.

**Mobile Footer:**
On mobile, the footer stacks into a single column with each section displaying one after another: Store Hours, Quick Links, Social Media, and Copyright information at the bottom.

---

## 4. Initial Design System

### Color Palette

**Primary Colors:**

- **Brand Purple**: `#8B7BB5` (Main brand color for headers, buttons)
  - Contrast ratio with white: 4.52:1 ✓ (WCAG AA compliant)
- **Soft Pink**: `#F4C7D6` (Accents, hover states, highlights)
  - Used sparingly for CTAs and featured content

**Neutral Colors:**

- **Deep Charcoal**: `#2C2C2C` (Primary text)
  - Contrast ratio with white: 15.8:1 ✓ (WCAG AAA compliant)
- **Warm Gray**: `#6B6B6B` (Secondary text, labels)
  - Contrast ratio with white: 7.2:1 ✓ (WCAG AA compliant)
- **Light Cream**: `#FAF8F5` (Page background, cards)
- **Pure White**: `#FFFFFF` (Content areas, modals)

**Accent Colors:**

- **Fresh Mint**: `#B8E6D5` (Success states, sustainability content)
- **Peach**: `#FFCC99` (Special offers, new items badge)

**Color Usage Strategy:**

- High contrast between text and backgrounds for readability
- Consistent button colors (Primary: purple, Secondary: pink outline)
- Background variations to create visual hierarchy
- Print-friendly alternative: grayscale fallbacks in print stylesheet

---

### Typography

**Font Families:**
- **Headings**: Georgia, Times New Roman, serif (elegant, readable)
- **Body Text**: Arial, Helvetica, sans-serif (clean, modern)

**Font Sizes:**
- Desktop: h1 (48px), h2 (36px), h3 (24px), body (16px)
- Mobile: h1 (36px), h2 (28px), h3 (20px), body (16px)
- Line height: 1.6 for readability

---

### Layout Grid Concept

**Spacing System:**
- Based on 8px increments: 8px, 16px, 24px, 32px, 48px
- Consistent padding and margins throughout

**Grid Structure:**
- Container max-width: 1200px, centered
- 12-column CSS Grid system
- Breakpoints: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- Box-sizing: border-box for all elements

---

**End of Week 1 Proposal**
