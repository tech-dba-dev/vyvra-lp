# VYVRA — Brand Guidelines

This document contains the color palette and typography rules for the VYVRA landing project.

---

## Color Palette

Primary palette (left → right):

- **#EADEDA** — Pale Neutral (use for backgrounds, large surfaces)
- **#CF9C97** — Soft Rose (accent / soft highlights)
- **#A47865** — Warm Clay (support / UI accents)
- **#6E6E5C** — Olive Neutral (muted dark accents)
- **#2E0D14** — Deep Maroon (primary dark / text on light)

Usage guidance:

- Backgrounds: `#EADEDA` or layered neutrals
- Primary accents / CTA: combine `#CF9C97` and `#A47865`
- Muted UI elements: `#6E6E5C`
- Dark text / strong contrast: `#2E0D14`

### CSS variables

```css
:root {
  --vyvra-bg: #EADEDA;
  --vyvra-accent-1: #CF9C97;
  --vyvra-accent-2: #A47865;
  --vyvra-muted: #6E6E5C;
  --vyvra-dark: #2E0D14;
}

/* Example usage */
body { background: var(--vyvra-bg); color: var(--vyvra-dark); }
.btn-primary { background: var(--vyvra-accent-2); color: var(--vyvra-bg); }
.muted { color: var(--vyvra-muted); }
```

### Tailwind theme extension (example)

Add to `theme.extend` in `tailwind.config.js`:

```js
colors: {
  vyvra: {
    bg: '#EADEDA',
    accent1: '#CF9C97',
    accent2: '#A47865',
    muted: '#6E6E5C',
    dark: '#2E0D14',
  }
}
```

---

## Typography

Primary and secondary typefaces observed in the brand materials:

- **Primary:** Inter — use for body text and general UI (`Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`).
- **Secondary / Display:** SF Pro Display — use for large display headings where available (note: SF Pro is Apple licensed). Fallback to `Inter` or `system-ui` when SF Pro isn't available.

Suggested font stacks:

```css
--font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
--font-display: 'SF Pro Display', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto;
```

### Usage rules

- Body copy: `font-family: var(--font-sans); font-weight: 300-400; line-height: 1.5;`
- H1 / H2 (large display): `font-family: var(--font-display); font-weight: 700-900; letter-spacing: -0.02em;`
- Buttons / UI labels: `font-family: var(--font-sans); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;`

### Example sizes (suggested)

- H1 (hero): 64–96px (desktop), responsive down to 40px on mobile
- H2: 36–48px
- Body: 16px (desktop) / 15px (mobile)
- Small / captions: 12px–13px

### Tailwind font config snippet

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        display: ['SF Pro Display', 'Inter', 'system-ui', '-apple-system'],
      }
    }
  }
}
```

---

## Accessibility notes

- Ensure sufficient contrast between text and background. Use `#2E0D14` over `#EADEDA` for high-contrast body text.
- For CTAs on light backgrounds, verify contrast for `#A47865` and `#CF9C97` — add a darker outline (`--vyvra-dark`) if needed.

## Licensing / assets

- `Inter` is available via Google Fonts — include via the usual `@import` or `<link>` in the project.
- `SF Pro Display` is a licensed Apple font. Use it only where you have the right to include it; otherwise, rely on `Inter` or system fonts as fallback.

---

If you want, I can also:

- Generate downloadable SVG/PNG color swatches.
- Add a small example page showing the palette and typographic scale.

File created: [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)
