# Design System - Dr. David Hamann
**Recherche-Dienste Website**

---

## HTML Examples

### Typography Examples

```html
<!-- H1 - Page Title -->
<h1>Dr. David Hamann - Archivrecherche & Transkription</h1>

<!-- H2 - Section Heading -->
<h2>Recherche-Services</h2>

<!-- H3 - Subsection -->
<h3>Personalunterlagen aus dem Nationalsozialismus</h3>

<!-- Body Text / Paragraph -->
<p>Dr. David Hamann bietet professionelle Archivrecherche und historische Dokumententranskription. Mit langjähriger Erfahrung in deutschen und internationalen Archiven unterstützt er Familienforscher und Wissenschaftler bei der Aufarbeitung ihrer Geschichte.</p>

<!-- Meta Information -->
<small class="meta">Letzte Aktualisierung: August 2025</small>
```

### Component Examples

```html
<!-- Service Card -->
<div class="card">
  <h3>Archivrecherche</h3>
  <p>Systematische Suche in Archiven nach Dokumenten zu Ihrer Familiengeschichte oder wissenschaftlichen Fragestellung.</p>
  <a href="/recherche/" class="button">Mehr erfahren</a>
</div>

<!-- Mobile Header -->
<header class="mobile-header">
  <div class="mobile-menu">
    <input type="checkbox" id="menu-toggle" class="menu-toggle">
    <label for="menu-toggle" class="menu-button">
      <div class="hamburger"></div>
      <span class="menu-text">MENU</span>
    </label>
  </div>
  <div class="logo">
    <h1>Dr. David Hamann</h1>
  </div>
</header>

<!-- Layout Structure -->
<div class="layout-wrapper">
  <nav class="sidebar">
    <ul>
      <li><a href="/">Startseite</a></li>
      <li><a href="/recherche/">Recherche</a></li>
      <li><a href="/transkription/">Transkription</a></li>
    </ul>
  </nav>
  <main class="content">
    <article class="article">
      <h1>Willkommen</h1>
      <p>Ihr Text hier...</p>
    </article>
  </main>
</div>

<!-- Breadcrumb Navigation -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Startseite</a> › 
  <a href="/nationalsozialismus/">Nationalsozialismus</a> › 
  <span>Personalunterlagen</span>
</nav>

<!-- Content with Initial Letter (Desktop) -->
<div class="content-grid">
  <p class="initial-letter">Dr. David Hamann bietet professionelle Archivrecherche...</p>
</div>
```

---

## Typography

### Font Stack
```css
--font-primary: 'Iowan Old Style', 'Palatino Linotype', serif;
--font-heading: Optima, Candara, sans-serif;
```

### Text Scaling (Fluid)
| Element | CSS | Size Range | Usage |
|---------|-----|------------|-------|
| **Body Text** | `clamp(1rem, 2.5vw, 1.25rem)` | 16-20px | Fließtext, Paragraphen |
| **Large Headings** | `clamp(1.25rem, 4vw, 2rem)` | 20-32px | H1, H2 |
| **Small Headings** | `clamp(1.1rem, 3vw, 1.4rem)` | 18-22px | H3, H4, H5, H6 |
| **Meta Text** | `clamp(0.875rem, 2vw, 1rem)` | 14-16px | Datum, Breadcrumb, Footer |

### Line Heights
- **Body Text:** 1.6 (optimale Lesbarkeit)
- **Headings:** 1.2 (kompakter)

---

## Spacing System

### Fluid Spacing (3 Values)
```css
--space-s: clamp(0.5rem, 2vw, 1rem);    /* 8-16px */
--space-m: clamp(1rem, 3vw, 2rem);      /* 16-32px */
--space-l: clamp(2rem, 5vw, 4rem);      /* 32-64px */
```

### Usage Guidelines
| Size | Mobile | Desktop | Usage |
|------|--------|---------|-------|
| **space-s** | 8px | 16px | Padding innen, kleine Abstände |
| **space-m** | 16px | 32px | Standard Margins, Card-Padding |
| **space-l** | 32px | 64px | Section-Abstände, große Gaps |

---

## Colors

### Palette: "Warme Autorität" (WCAG AA)
```css
--color-text: #1F2937;         /* Anthrazit - Haupttext */
--color-text-light: #374151;   /* Dunkelgrau - Sekundärtext */
--color-accent: #D97706;        /* Bernstein - Links, Buttons */
--color-accent-dark: #B45309;   /* Dunkler Bernstein - Hover */
--color-background: #FFFFFF;    /* Weiß - Haupt-Hintergrund */
--color-background-alt: #FEF3E2; /* Creme - Cards, Highlights */
```

### Contrast Ratios
- Text auf Weiß: **13.4:1** (AAA)
- Text Light auf Weiß: **9.5:1** (AAA)
- Accent auf Weiß: **4.8:1** (AA)
- Accent Dark auf Weiß: **6.4:1** (AA)

---

## Layout System

### Every-Layout Sidebar Pattern
```css
.layout-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
}

.sidebar {
  flex-basis: 250px;
  flex-grow: 1;
}

.content {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 60%;
}
```

### Breakpoint Behavior
- **Container > 417px:** Navigation (250px) + Content nebeneinander
- **Container ≤ 417px:** Navigation oben, Content 100% breit

### Mobile Header
```css
.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-s);
}
```

---

## Components

### Mobile Menu
**Hamburger Icon:**
- Size: 24x24px
- Lines: 3 × 2px height, 6px spacing
- Touch Target: 44x44px minimum
- Position: Left side + "MENU" text below

**CSS-Only Implementation:**
- Checkbox hack or modern `:has()` solution
- Vertical stack design
- Off-canvas slide behavior

### Content Grid
**Desktop (Container > 417px):**
- Two-column layout
- Initial letter: 200% standard size
- Larger typography and line spacing

**Mobile (Container ≤ 417px):**
- Single column
- Compact typography
- Standard initial letters

### Cards & Buttons

**Service Card:**
```html
<div class="card">
  <h3>Archivrecherche</h3>
  <p>Systematische Suche in Archiven nach Dokumenten...</p>
  <a href="/recherche/" class="button">Mehr erfahren</a>
</div>
```

```css
.card {
  background: var(--color-background);
  border: 1px solid var(--color-background-alt);
  padding: var(--space-m);
  border-radius: 8px;
  margin-bottom: var(--space-m);
}
```

**Button Styles:**
```html
<a href="/kontakt/" class="button">Kontakt aufnehmen</a>
<button type="submit" class="button button-secondary">Senden</button>
```

```css
.button {
  background: var(--color-accent);
  color: white;
  padding: var(--space-s) var(--space-m);
  border: none;
  border-radius: 4px;
  font-size: inherit;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.button:hover {
  background: var(--color-accent-dark);
}

.button-secondary {
  background: var(--color-text-light);
}
```

### Navigation Components

**Desktop Sidebar:**
```html
<nav class="sidebar">
  <div class="logo">
    <h2>Dr. David Hamann</h2>
    <p class="meta">Archivrecherche</p>
  </div>
  <ul class="nav-list">
    <li><a href="/" class="nav-active">Startseite</a></li>
    <li><a href="/recherche/">Recherche</a></li>
    <li><a href="/transkription/">Transkription</a></li>
    <li><a href="/biografie/">Biografie</a></li>
    <li><a href="/kontakt/">Kontakt</a></li>
    <li class="nav-separator"></li>
    <li><a href="/nationalsozialismus/">Nationalsozialismus</a></li>
    <li><a href="/zweiter-weltkrieg/">Zweiter Weltkrieg</a></li>
  </ul>
</nav>
```

**Mobile Menu:**
```html
<div class="mobile-menu">
  <input type="checkbox" id="menu-toggle" class="menu-toggle">
  <label for="menu-toggle" class="menu-button">
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span class="menu-text">MENU</span>
  </label>
  <nav class="mobile-nav">
    <ul>
      <li><a href="/">Startseite</a></li>
      <li><a href="/recherche/">Recherche</a></li>
      <!-- ... -->
    </ul>
  </nav>
</div>
```

---

## Accessibility

### Touch Targets
- **Minimum:** 44x44px (WCAG AA)
- **Preferred:** 48x48px for better usability

### Typography
- **Body text minimum:** 16px on mobile
- **High contrast ratios:** All AA/AAA compliant
- **Text wrapping:** `text-wrap: pretty` for modern browsers

### Navigation
- **Semantic HTML:** `<nav>`, `<main>`, `<header>`
- **Skip links:** For keyboard navigation
- **ARIA labels:** For mobile menu states

---

## Implementation Notes

### Container Queries (Future)
- Replace media queries with container queries
- Components respond to available space, not viewport
- Better for modular design systems

### Fluid Design Principles
- All spacing and typography scales automatically
- No fixed breakpoints needed
- Intrinsic web design approach

### Performance
- **Minimal CSS:** ~40 lines for core system
- **No frameworks:** Pure CSS approach
- **Font loading:** System fonts with web font fallbacks

---

**Version:** 1.0  
**Last Updated:** August 2025  
**For:** Claude Code Implementation