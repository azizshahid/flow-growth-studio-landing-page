# SEO Audit Landing Page

A responsive, single-page lead generation website that captures free SEO audit requests from small business owners. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies beyond two CDN libraries.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation Instructions](#installation-instructions)
3. [Usage Examples](#usage-examples)
4. [Code Explanation](#code-explanation)
5. [License Information](#license-information)
6. [Contact Information](#contact-information)

---

## Project Overview

### What It Does

This is a marketing landing page designed to convert website visitors into audit leads. A visitor arrives, reads about why their site may not be ranking on Google, and fills in a short form (name, website URL, email, optional industry). The form submission triggers a success confirmation and logs the lead data — ready to be forwarded to a backend handler of your choice (Formspree, EmailJS, a custom API, etc.).

### Why It Is Useful

- **Zero dependencies to install** — runs directly in any browser by opening `index.html`
- **Full framework audit** — built against the standard landing page conversion framework: Hero → Problem → Solution → Trust → Plan → Offer → CTA
- **Interactive without React** — uses Swiper.js for carousels and vanilla JS for tab switching, keeping the bundle tiny
- **Fully responsive** — adapts from mobile (375px) to wide desktop (1440px+) with CSS Grid and Swiper breakpoints
- **Customisable design system** — all colours, fonts, and spacing are controlled through CSS custom properties (variables) at the top of the stylesheet, so rebranding takes minutes

### Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, Grid, Flexbox, keyframe animations) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Carousel library | Swiper.js 11.0.5 (CDN) |
| Typography | Google Fonts — Cormorant Garamond + Nunito |
| Form handling | Placeholder `console.log` — replace with your own handler |

---

## Installation Instructions

### Prerequisites

You need nothing installed beyond a modern web browser (Chrome, Firefox, Safari, or Edge). There is no Node.js, no npm, no build step.

If you want to serve the file over a local development server (recommended for testing form submissions), you can use any of the following:

- **VS Code** with the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- **Python** (comes pre-installed on macOS and most Linux systems)
- **Node.js** `http-server` (optional)

### Step 1 — Get the file

Save the `index.html` file to a folder on your computer, for example:

```
my-seo-landing/
└── index.html
```

There are no other local assets. All fonts, Swiper CSS, and Swiper JS are loaded from CDNs at runtime.

### Step 2 — Open in a browser (quickest option)

Double-click `index.html`. It will open in your default browser. All sections, carousels, and tabs will work immediately.

> **Note:** Form submissions will only log to the browser console in this mode. To handle real submissions, connect a form service (see [Usage Examples](#usage-examples)).

### Step 3 — Serve locally (recommended for development)

**Option A — VS Code Live Server**

1. Open the `my-seo-landing` folder in VS Code
2. Right-click `index.html` in the Explorer panel
3. Select **Open with Live Server**
4. The page opens at `http://127.0.0.1:5500`

**Option B — Python**

```bash
# Python 3
cd my-seo-landing
python3 -m http.server 8080
# Visit http://localhost:8080
```

**Option C — Node http-server**

```bash
npm install -g http-server
cd my-seo-landing
http-server -p 8080
# Visit http://localhost:8080
```

### Step 4 — Deploy to production

The file is a static HTML document, so it can be hosted on any static hosting platform:

| Platform | Command / Method |
|---|---|
| **Netlify** | Drag and drop the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` from inside the project folder |
| **GitHub Pages** | Push to a repo, enable Pages under Settings → Pages |
| **Cloudflare Pages** | Connect your repo, set build command to *(none)* |
| **Any cPanel host** | Upload `index.html` via FTP to `public_html/` |

---

## Usage Examples

### Running the page

```bash
# Simplest possible start — Python 3
python3 -m http.server 8080

# Then open your browser at:
# http://localhost:8080
```

### Customising the brand colours

All colours are defined as CSS custom properties inside the `:root` block near the top of the `<style>` tag. Edit these to rebrand the entire page at once:

```css
:root {
  --navy:     #0e1f3b;   /* primary dark — nav, hero, plan circles  */
  --navy-mid: #162d52;   /* hover state for navy elements            */
  --cream:    #fdf7ee;   /* base page background                     */
  --cream-2:  #fef2e0;   /* alternate section background             */
  --amber:    #e89b0a;   /* primary accent — CTAs, highlights        */
  --amber-lt: #fef3d0;   /* light amber fill for solution icons      */
  --coral:    #d9511f;   /* urgency accent — problem bar, final CTA  */
  --coral-lt: #fdeee8;   /* light coral fill                         */
  --green:    #1a7a4a;   /* success / checkmark colour               */
  --green-lt: #e6f4ed;   /* light green fill for reassurance dots    */
  --text:     #1a1a2e;   /* body text                                */
  --muted:    #5a6070;   /* secondary/descriptive text               */
  --border:   rgba(14,31,59,0.12); /* subtle borders                */
}
```

### Connecting a real form handler

Locate the `submit` event listener at the bottom of the `<script>` block and replace the `console.log` with your chosen service:

**Option A — Formspree (easiest, free tier available)**

```html
<!-- Replace the <form> tag -->
<form id="auditForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Then remove the `e.preventDefault()` call and the manual JS submission block, or keep JS validation and use `fetch`:

```javascript
// Inside the submit handler, replace console.log with:
const formData = new FormData(this);
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
});
```

**Option B — EmailJS (sends email directly from the browser)**

```javascript
// Add this to the <head>:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

emailjs.init('YOUR_PUBLIC_KEY');

// Inside the submit handler, replace console.log with:
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  from_name: name,
  website:   website,
  reply_to:  email,
  industry:  document.getElementById('industry').value
});
```

**Option C — Custom backend endpoint**

```javascript
// Replace console.log with:
const res = await fetch('https://your-api.com/audit-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, website, email })
});
if (!res.ok) throw new Error('Submission failed');
```

### Changing the number of Swiper slides visible

In the `<script>` block, each Swiper instance accepts a `breakpoints` option:

```javascript
const problemSwiper = new Swiper('#problemSwiper', {
  slidesPerView: 1.08,     // mobile: shows 1 card + peek
  spaceBetween: 16,
  breakpoints: {
    640: { slidesPerView: 2.1 },    // tablet: 2 cards + peek
    960: { slidesPerView: 3.1 }     // desktop: 3 cards + peek
  }
});
```

Adjust `slidesPerView` values to show more or fewer cards at each breakpoint.

---

## Code Explanation

### File structure

```
index.html          ← the entire project lives in this one file
├── <head>
│   ├── Google Fonts link (Cormorant Garamond + Nunito)
│   └── Swiper CSS link (CDN)
├── <style>         ← all CSS, ~550 lines
├── <body>
│   ├── <nav>                     Section: sticky navigation bar
│   ├── <section class="hero">    Section 1 — Hero
│   ├── <section class="problem"> Section 2 — Problem carousel
│   ├── <section class="solution">Section 3 — Solution tabs
│   ├── <section class="trust">   Section 4 — Trust / testimonials
│   ├── <section class="plan">    Section 5 — 3-step plan
│   ├── <section class="form-section"> Section 6 — Lead capture form
│   ├── <section class="final-cta">    Section 7 — Final call to action
│   └── <footer>
├── <script src="swiper CDN">     Swiper library loaded from CDN
└── <script>        ← all JavaScript, ~60 lines
```

### CSS Architecture

**Design tokens via CSS custom properties**

All visual values — colours, spacing, borders — are defined once in `:root` and referenced throughout. This makes global changes (rebranding, dark mode) a single-point edit.

**Layout system**

CSS Grid is used for two-column layouts (hero, form). It degrades gracefully: `@media (max-width: 900px)` switches all grids to `grid-template-columns: 1fr` (single column). Swiper handles its own horizontal layout internally.

**Component-scoped class names**

Each section uses a BEM-inspired flat naming convention:
- `.problem-card` — a card within the problem section
- `.sol-tab` / `.sol-panel` — tab button and its content panel
- `.testi-quote` / `.testi-author` — parts of a testimonial slide

**Animation**

A single `@keyframes fadeUp` animation is applied to hero elements with staggered `animation-delay` values (0s, 0.1s, 0.2s, 0.3s, 0.35s), creating a cascading entrance on page load without JavaScript.

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero h1 { animation: fadeUp .5s .1s ease both; }
```

The `both` fill-mode keeps the element invisible before the animation starts and frozen in the final state after it ends.

---

### JavaScript — Function-by-Function Reference

#### Problem Swiper initialisation

```javascript
const problemSwiper = new Swiper('#problemSwiper', { ... });
```

Creates a Swiper instance on the element with `id="problemSwiper"`. The `slidesPerView: 1.08` value intentionally shows a sliver of the next card, signalling to users that more content exists to the right.

---

#### `updateProblemUI()`

```javascript
function updateProblemUI() {
  const i = problemSwiper.realIndex;
  counter.textContent = `${i + 1} / ${total}`;
  fill.style.width = `${((i + 1) / total) * 100}%`;
}
problemSwiper.on('slideChange', updateProblemUI);
```

**Purpose:** Keeps the "1 / 4" counter and the amber progress bar in sync with the active slide.

**How it works:**
- `problemSwiper.realIndex` returns the zero-based index of the currently visible slide
- The counter label is set to `current + 1` (human-readable, 1-indexed)
- The progress bar fill width is calculated as a percentage of total slides
- It is registered as a callback on Swiper's built-in `slideChange` event, so it fires automatically on every swipe or button click

---

#### Problem carousel prev/next buttons

```javascript
prevBtn.addEventListener('click', () => problemSwiper.slidePrev());
nextBtn.addEventListener('click', () => problemSwiper.slideNext());
```

**Purpose:** Connects the custom `←` and `→` HTML buttons to Swiper's built-in navigation methods.

`slidePrev()` and `slideNext()` are Swiper API methods that move the carousel by one slide and automatically fire the `slideChange` event, which triggers `updateProblemUI()`.

---

#### Solution tab switcher

```javascript
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.sol-panel[data-panel="${idx}"]`).classList.add('active');
  });
});
```

**Purpose:** Switches the visible solution panel when a tab button is clicked.

**How it works:**
1. Each `<button class="sol-tab">` carries a `data-tab="0"` attribute (0–3)
2. Each `<div class="sol-panel">` carries a matching `data-panel="0"` attribute
3. On click, all `active` classes are stripped from every tab and every panel
4. The clicked tab and the panel whose `data-panel` matches the tab's `data-tab` both receive `active`
5. CSS rule `display: none` on `.sol-panel` and `display: flex` on `.sol-panel.active` handles visibility

No animation library is needed — the instant swap is intentional for a crisp, app-like feel.

---

#### Testimonial Swiper initialisation

```javascript
const testiSwiper = new Swiper('#testiSwiper', {
  slidesPerView: 1.06,
  spaceBetween: 16,
  grabCursor: true,
  autoplay: { delay: 4200, disableOnInteraction: true },
  breakpoints: { 700: { slidesPerView: 2.1 }, 960: { slidesPerView: 3 } }
});
```

**Key options:**
- `grabCursor: true` — shows a grab hand cursor on desktop to hint at drag interaction
- `autoplay.delay: 4200` — advances automatically every 4.2 seconds
- `disableOnInteraction: true` — stops autoplay permanently once a user manually interacts, respecting their intent

---

#### `updateDots()`

```javascript
function updateDots() {
  dots.forEach(d => d.classList.remove('active'));
  const active = document.querySelector(`.testi-dot[data-i="${testiSwiper.realIndex}"]`);
  if (active) active.classList.add('active');
}
testiSwiper.on('slideChange', updateDots);
```

**Purpose:** Highlights the correct dot indicator below the testimonial carousel.

**How it works:**
- All dots lose the `active` class first (resets state)
- The dot whose `data-i` attribute matches `testiSwiper.realIndex` gains `active`
- CSS on `.testi-dot.active` expands its width from 6px to 20px and colours it amber, creating a "pill" indicator effect via `transition`

---

#### Dot click navigation

```javascript
dots.forEach(d => d.addEventListener('click', () => testiSwiper.slideTo(+d.dataset.i)));
```

**Purpose:** Lets users jump directly to any testimonial by clicking its dot.

`slideTo(index)` is a Swiper API method that moves to a specific slide by zero-based index. The `+` prefix coerces `d.dataset.i` from a string to a number.

---

#### Form validation and submission

```javascript
document.getElementById('auditForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const website = document.getElementById('website').value.trim();
  const email   = document.getElementById('email').value.trim();

  if (!name || !website || !email) return;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // TODO: replace with real handler
  console.log('Audit request:', { name, website, email });

  this.style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';
});
```

**Purpose:** Validates form fields client-side and replaces the form with a success message on submission.

**Step-by-step:**
1. `e.preventDefault()` — stops the browser's default form POST, which would navigate away from the page
2. `.trim()` — strips leading/trailing whitespace from each field so `"  "` is treated as empty
3. The presence check `if (!name || !website || !email)` returns early if any required field is blank
4. The regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` tests that the email contains exactly one `@` with non-whitespace characters on both sides and a `.` in the domain — a lightweight sanity check, not a full RFC 5322 validator
5. After a successful (placeholder) submission, `this.style.display = 'none'` hides the `<form>` element
6. The success `<div id="successMsg">` is revealed with `display: 'block'`

---

### External Libraries

#### Swiper.js 11.0.5

Loaded from `cdnjs.cloudflare.com`. Swiper is a mature, mobile-first touch slider library. It handles:
- Touch/drag/mouse swipe events
- Responsive breakpoints
- Autoplay with pause-on-interaction
- The `slideChange` event system used to power the custom UI (counter, progress bar, dots)

CDN links used:
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css" />

<!-- JS (loaded before closing </body>) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js"></script>
```

#### Google Fonts

Loaded via the standard Google Fonts embed in `<head>`. Two families are used:

| Family | Weights loaded | Used for |
|---|---|---|
| Cormorant Garamond | 400, 600, 700 (+ italic variants) | All headings (`h1`–`h3`), pull quotes, large numbers |
| Nunito | 400, 500, 600, 700 | All body text, labels, buttons, navigation |

---

## License Information

This project is released under the **MIT License**.

```
MIT License

Copyright (c) 2025 SEO Audit Co.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-party licences

| Dependency | Licence | Link |
|---|---|---|
| Swiper.js | MIT | https://github.com/nolimits4web/swiper/blob/master/LICENSE |
| Google Fonts (Cormorant Garamond) | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Cormorant+Garamond |
| Google Fonts (Nunito) | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Nunito |

All three third-party assets are free to use in commercial projects under their respective open licences.

---

## Contact Information

### Project maintainer

| Field | Detail |
|---|---|
| Name | SEO Audit Co. |
| Email | hello@seoauditco.com *(replace with your actual address)* |
| Website | https://seoauditco.com *(replace with your domain)* |

### Reporting a bug or requesting a change

1. Check whether the issue is already noted in the project's issue tracker (if hosted on GitHub)
2. If not, open a new issue with:
   - A clear title describing the problem
   - The browser and OS you are using
   - Steps to reproduce the issue
   - A screenshot if relevant

### Support response time

This is a solo-maintained project. Responses to support queries are typically sent within **2 business days**.

---

*Last updated: April 2025*