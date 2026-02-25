# VYVRA — Members Towel Activation Landing Page

## Overview

A minimal, mobile-first landing page accessed via QR code on towels gifted to the first 300 VYVRA customers. The page lives **inside the existing `vyvra-lp` project** and is accessed at the route `/members`.

**Flow:** QR Code → `/members` → Registration/CTA → Circle checkout (30-day free trial)

---

## Architecture & Routing

### Current State
- Single-page React app (Vite + TypeScript + Tailwind CSS via CDN)
- No router installed — navigation is scroll-based

### Required Changes
1. **Install React Router:** `npm install react-router-dom`
2. **Restructure `App.tsx`:**
   - Wrap app in `<BrowserRouter>`
   - Current landing page content → `<Route path="/" element={<HomePage />} />`
   - New members page → `<Route path="/members" element={<MembersPage />} />`
3. **Vite config:** Add `historyApiFallback` or configure for SPA routing so `/members` doesn't 404 on refresh

### File Structure (new files only)
```
src/
├── pages/
│   ├── HomePage.tsx        ← extract current App.tsx content here
│   └── MembersPage.tsx     ← new towel activation page
├── App.tsx                 ← now just Router + Routes
└── index.tsx               ← unchanged
```

---

## Design System Reference

All design tokens come from the existing project. **Do not introduce new colors, fonts, or patterns.**

### Color Palette

| Token            | Hex       | Usage on Members Page                        |
|------------------|-----------|----------------------------------------------|
| `brand-dark`     | `#2E0015` | Page background (primary)                    |
| `brand-primary`  | `#4A0422` | Card/section backgrounds, subtle contrast    |
| `brand-accent`   | `#CF9C97` | Accent text, icons, bullet markers, borders  |
| `brand-beige`    | `#EADEDA` | Primary text color, headings                 |
| `brand-charcoal` | `#1D0C14` | Deep background if needed for layering       |
| White            | `#FFFFFF` | CTA button text                              |

### Typography

| Element         | Font    | Size (mobile → desktop)  | Weight | Style                         |
|-----------------|---------|--------------------------|--------|-------------------------------|
| Title (H1)      | Cinzel  | 28px → 40px              | 700    | `tracking-tight`, uppercase   |
| Subtitle         | Inter   | 15px → 18px              | 300    | `leading-relaxed`, normal     |
| Bullet items     | Inter   | 14px → 16px              | 400    | Normal                        |
| CTA button       | Inter   | 14px → 16px              | 600    | Uppercase, `tracking-widest`  |
| Legal/small text | Inter   | 11px → 12px              | 300    | `text-brand-accent/60`        |

### Fonts (already loaded in `index.html`)
```
Cinzel: weights 400-900 (Google Fonts)
Inter: weights 300-600 (Google Fonts)
```

---

## Page Layout & Components

### Structure (top to bottom, single scroll — no navigation)

The page is **one viewport tall on mobile** (or near it). No navbar, no footer, no menu. Completely standalone.

```
┌─────────────────────────────────┐
│         [VYVRA Logo SVG]        │  ← Small, centered, top padding
│                                 │
│   "You've unlocked 1 month of  │  ← H1, Cinzel, centered
│      Premium access."           │
│                                 │
│   "As part of our first 300     │  ← Subtitle, Inter light, centered
│    customers, you get full      │
│    access to our private        │
│    community, free for 30 days."│
│                                 │
│   ┌───────────────────────────┐ │
│   │  ✦ Full Premium access    │ │  ← Benefits list
│   │  ✦ Exclusive content      │ │     Accent-colored markers
│   │  ✦ Member-only perks      │ │     Left-aligned within
│   │  ✦ Early access to drops  │ │     centered container
│   └───────────────────────────┘ │
│                                 │
│   ┌───────────────────────────┐ │
│   │  ACTIVATE MY FREE MONTH   │ │  ← CTA button
│   └───────────────────────────┘ │     Full-width on mobile
│                                 │
│   "Valid for selected customers │  ← Legal text, muted
│    only. Free for 30 days.      │
│    Cancel anytime. After 30     │
│    days, renews at standard     │
│    rate."                       │
│                                 │
└─────────────────────────────────┘
```

---

## Component Specifications

### 1. Page Container
```
- Background: bg-brand-dark (#2E0015)
- Min height: min-h-screen
- Display: flex flex-col items-center justify-center
- Padding: px-6 py-12 (mobile), px-8 py-16 (desktop)
- Max content width: max-w-md (28rem) centered
- Optional: subtle radial gradient or blur orb in background
  (reuse the decorative blur pattern from CommunitySection)
```

### 2. VYVRA Logo
```
- Reuse the existing SVG logo from the navbar in App.tsx
- Size: h-6 (mobile), h-8 (desktop)
- Color: fill brand-beige (#EADEDA)
- Margin bottom: mb-10 md:mb-12
- Centered
```

### 3. Title Block
```
- Font: Cinzel, font-bold (700)
- Size: text-2xl md:text-4xl
- Color: text-brand-beige
- Text align: center
- Letter spacing: tracking-tight
- Margin bottom: mb-4 md:mb-6
- Content: "You've unlocked 1 month of Premium access."
```

### 4. Subtitle
```
- Font: Inter, font-light (300)
- Size: text-sm md:text-base
- Color: text-brand-beige/80 (80% opacity)
- Text align: center
- Line height: leading-relaxed
- Margin bottom: mb-8 md:mb-10
- Max width: max-w-sm
- Content: "As part of our first 300 customers, you get full access
  to our private community, free for 30 days."
```

### 5. Benefits List
```
- Container: w-full, text-left, space-y-3, mb-8 md:mb-10
- Each item: flex items-center gap-3
- Marker: "✦" character or small diamond, text-brand-accent (#CF9C97)
- Text: Inter, font-normal (400), text-sm md:text-base, text-brand-beige
- Items:
  1. "Full Premium access"
  2. "Exclusive content"
  3. "Member-only perks"
  4. "Early access to drops"
```

### 6. CTA Button
```
- Width: w-full
- Background: bg-brand-accent (#CF9C97)
- Text: text-brand-dark (#2E0015), uppercase, font-semibold (600)
- Letter spacing: tracking-widest
- Padding: py-4 px-8
- Border radius: rounded-full (pill shape, matches existing "Shop Drop 01" style)
- Font size: text-sm md:text-base
- Hover: opacity-90 or slight scale transform (scale-[1.02])
- Transition: transition-all duration-300
- Content: "ACTIVATE MY FREE MONTH"
- Action: window.location.href to Circle checkout URL
  (placeholder: https://community.vyvra.com/checkout/premium-trial)
```

### 7. Legal Text
```
- Font: Inter, font-light (300)
- Size: text-[11px] md:text-xs
- Color: text-brand-accent/50 (50% opacity of accent)
- Text align: center
- Margin top: mt-6
- Max width: max-w-xs
- Line height: leading-relaxed
- Content: "Valid for selected customers only. Free for 30 days.
  Cancel anytime. After 30 days, renews at standard rate."
```

---

## Background Decoration (Optional)

Reuse the ambient blur orb pattern from the existing Community Section:

```jsx
{/* Top-right orb */}
<div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />

{/* Bottom-left orb */}
<div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl" />
```

Container needs `relative overflow-hidden` for this to work.

---

## Animations

Reuse the fade-in-up animation pattern from the Hero section:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Apply staggered delays:
| Element      | Delay  |
|--------------|--------|
| Logo         | 0ms    |
| Title        | 150ms  |
| Subtitle     | 300ms  |
| Benefits     | 450ms  |
| CTA Button   | 600ms  |
| Legal text   | 750ms  |

---

## Tracking (Meta Pixel + Google Analytics)

### Google Analytics (GA4)
Add to `index.html` or load conditionally on `/members`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Fire custom event on CTA click:
```javascript
gtag('event', 'Towel_Activation', {
  event_category: 'Members',
  event_label: 'towel_qr_activation'
});
```

### Meta Pixel
Add to `index.html` or load conditionally on `/members`:
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

Fire custom event on CTA click:
```javascript
fbq('track', 'Towel_Activation', {
  content_name: 'towel_qr_premium_trial'
});
```

---

## 300-Activation Limit (Optional — Simple Approach)

### Option A: Frontend Counter (simple, not bulletproof)
Use a lightweight backend/service (e.g., Firebase Realtime DB, Supabase, or a simple API):
1. On page load, fetch current activation count
2. If count >= 300, show "This offer has expired" instead of the CTA
3. On CTA click, increment counter, then redirect

### Option B: Circle-Side Limit
- Create the plan in Circle with a coupon/trial limited to 300 uses
- Circle handles the limit — the landing page just redirects
- Simpler, no backend needed
- **Recommended approach**

### Expired State UI
If activations are exhausted, replace the content block with:
```
Title: "This exclusive offer has ended."
Subtitle: "All 300 spots have been claimed. Follow us for future drops."
CTA: "FOLLOW @VYVRAOFFICIAL" → links to Instagram
```

---

## Responsive Breakpoints

Follow existing project patterns:
```
Mobile:    < 768px   (default styles, single column)
Tablet:    md: 768px (slight spacing increases)
Desktop:   lg: 1024px (max, but page is narrow by design)
```

The page is intentionally narrow (`max-w-md`) so it looks great on mobile and remains elegant on desktop — no need for complex responsive layouts.

---

## Accessibility

- All text meets WCAG AA contrast on `#2E0015` background
- CTA button: large touch target (min 48px height)
- Semantic HTML: `<main>`, `<h1>`, `<ul>`, `<button>`
- `aria-label` on CTA button
- Legal text: readable at 11px minimum

---

## Checklist

- [ ] Install `react-router-dom`
- [ ] Restructure App.tsx with Router
- [ ] Extract current page to `HomePage.tsx`
- [ ] Create `MembersPage.tsx` with all components above
- [ ] Add VYVRA logo SVG (reuse from navbar)
- [ ] Implement fade-in-up animations
- [ ] Add background blur orbs
- [ ] Set CTA href to Circle checkout URL (get from Circle setup)
- [ ] Add GA4 tracking script + `Towel_Activation` event
- [ ] Add Meta Pixel script + `Towel_Activation` event
- [ ] Configure Vite for SPA routing (history fallback)
- [ ] Test on mobile viewport (375px width)
- [ ] Test QR code → `/members` flow end-to-end
- [ ] Deploy and generate QR code pointing to `yourdomain.com/members`
