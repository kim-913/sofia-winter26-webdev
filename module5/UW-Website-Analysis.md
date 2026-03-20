# University of Washington Website Evaluation

**Website:** https://www.washington.edu/

---

## Part 1 – Structural Analysis

The UW website uses **hierarchical organization** with a homepage branching to seven main sections (About, Academics, Apply, News & Events, Research, Campuses, Give). The hierarchy is **too shallow** at the top—seven navigation items create too many immediate choices. The **Three-Click Rule** is mostly followed: MyUW Portal takes 1 click, Apply takes 1 click, Course Catalog takes 2 clicks. However, some faculty pages and research labs require 4+ clicks, violating the rule. Navigation is **highly consistent** with a sticky top bar on all pages, quick links in the top-right, breadcrumbs on internal pages, and a "Skip to Main Content" link for accessibility.

---

## Part 2 – Visual Design Principles

**Repetition:** Very effective. UW purple/gold colors, standardized typography (13px, 20px, 36px, 42px sizes), and identical headers/footers appear consistently, creating strong visual unity.

**Contrast:** Generally strong. White backgrounds contrast well with dark navigation and purple buttons. However, gray text (#6c757d) on white is too subtle in secondary content.

**Proximity:** Well-executed. News tiles are grouped in grids, navigation items cluster by topic, adequate white space separates sections. No obvious violations.

**Alignment:** CSS Grid creates consistent alignment. Content centers in a 1200px container with balanced margins. Text is left-aligned, hero images center-aligned.

**Impact on User Cognition:** These principles reduce cognitive load—repetition creates familiarity, contrast directs attention, proximity enables chunking information, alignment creates predictable flow. The main issue is the gray text forcing users to strain to read, increasing cognitive effort.

---

## Part 3 – Accessibility & Universal Design

**Issue #1: Insufficient Text Contrast**
- Gray text (#6c757d) on white: ~3.8:1 ratio (fails WCAG AA 4.5:1 standard)
- WCAG Principle: Perceivable
- Impact: Users with low vision, older adults, mobile users in sunlight struggle to read

**Issue #2: Keyboard Navigation Failure**
- Dropdown menus require mouse hover, don't respond to Tab/Enter/Arrow keys
- WCAG Principle: Operable
- Impact: Users with motor disabilities or broken trackpads cannot access navigation

**Issue #3: Missing Focus Indicators**
- Interactive elements lack visible focus when tabbing
- WCAG Principle: Operable
- Impact: Keyboard users lose track of current position

**Other Observations:** Font readability is generally good with standard web fonts and reasonable sizes. Alt text appears present but needs full audit. Site is responsive with flexible layouts and multiple image sizes (370px-2000px), though large images may slow mobile loading.

---

## Part 4 – Responsive & Layout Evaluation

The site uses **fluid/responsive hybrid design**—centered content with 1200px max-width but flexible units allowing scaling. Resizing from desktop (1920px) to mobile (375px) shows: multi-column layout on desktop with three-column news grid, two-column reflow on tablet (768px-1024px), single-column stack on mobile. Content reflows properly without horizontal scrolling. The CSS Grid adapts by reducing columns and stacking elements.

**Strengths:** Clear visual hierarchy across breakpoints, adequate white space, readable text without zooming, sticky navigation.

**Weaknesses:** Large hero images (2-4MB each) slow mobile loading, seven navigation items overwhelming in hamburger menu, excessive margins on ultra-wide displays, possibly small touch targets.

**Improvements:** Compress images to WebP format for 60-70% size reduction, use responsive images with srcset, consolidate navigation to 4-5 categories, add lazy loading, increase touch target sizes to 44x44px minimum.

---

## Part 5 – Redesign Proposal

**1. Revised Site Structure**

Reduce navigation from 7 to 4 categories: **Academics** (Programs, Courses, Calendar, Faculty), **Admissions** (Apply, Financial Aid, Visit, International), **Campus Life** (Housing, Activities, MyUW Portal), **Research & Impact** (Centers, Discoveries, Partnerships). Move "About" to footer, "News & Events" and "Give" to top-right utility links. This follows information chunking principles while maintaining Three-Click Rule compliance.

**2. Improved Navigation Strategy**

Make dropdowns keyboard-accessible: Enter/Space to open, Arrow keys to navigate, Escape to close, visible 2px focus indicators, ARIA attributes (aria-expanded, aria-haspopup). For mobile, use priority+ pattern keeping top 3 items visible with remaining in "More" menu.

**3. New Color Scheme**

**Target Audience:** Students (17-25), parents (40-60), faculty/staff (25-65), alumni (22-80)—broad "everyone" audience.

**Palette:** Primary UW Purple (#4B2E83), Secondary UW Gold (#B7A57A), Text (#2c2c2c for 7.5:1 contrast), Links (darker purple #3a2366 for 4.8:1 contrast).

**Justification:** Complementary color scheme maintains brand identity while meeting WCAG AAA standards. Purple conveys academic credibility, gold adds warmth. High contrast works for older adults and mobile viewing. Appropriate for attracting prospective students while serving all age groups.

**4. Accessibility Enhancement: Keyboard Navigation**

Add JavaScript event handlers for keyboard input on dropdown menus, implement focus trapping, add visible focus indicators (2px gold outline), include ARIA live regions for screen reader announcements. This achieves WCAG 2.1 Level AA compliance, enabling users with motor disabilities to navigate fully without a mouse. Trade-off: requires ~2KB additional JavaScript, but legal compliance and inclusive design outweigh minimal performance cost.

**5. Performance Improvement: Image Optimization**

Convert hero images to WebP format with JPG fallback, implement responsive images with srcset (mobile 640px/150KB, tablet 1024px/300KB, desktop 1920px/500KB), add lazy loading for below-fold content, compress to 80-85% quality. Expected results: reduce homepage image payload from 8-15MB to 1.5-2.5MB (80% reduction), cut load time from 4-5 seconds to under 2 seconds on 4G. Trade-offs: more complex HTML and image processing workflow, but worth it for significantly better mobile experience and higher conversion rates.

---

## Summary

The UW website has solid hierarchical structure and consistent branding but needs critical improvements in keyboard accessibility and color contrast to meet WCAG standards. The redesign maintains brand identity while consolidating navigation, enhancing accessibility, and optimizing performance for mobile users.
