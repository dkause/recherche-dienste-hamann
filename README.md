# Recherche-Dienste - Dr. David Hamann

Service Portfolio für Dr. David Hamanns Dienstleistungen in historischer Archivrecherche und Transkription (NS-Zeit, Zweiter Weltkrieg, Sütterlin).

**Zielgruppe:** Akademiker und Familienforscher 45+ Jahre

## Quick Start

```bash
npm install    # Dependencies installieren
npm run dev    # Development Server (localhost:4321)
npm run build  # Produktions-Build
```

## Tech Stack

- **Astro 4.x** - Static Site Generator
- **Custom CSS** - Every-Layout System, Container Queries
- **StaticHost.eu** - Deployment mit GitHub Integration
- **WCAG AA** - Accessibility konform

### Key Dependencies
- `@astrojs/sitemap` - Sitemap-Generierung
- `astro-seo` - SEO Meta-Tags

## Struktur

```
src/
├── layouts/          # BaseLayout, MainLayout
├── pages/           # Astro-Seiten (.astro)
└── styles/          # global.css
```

## Design Features

- **Responsive:** Sidebar (>417px) / Stacked (≤417px)
- **Typography:** Fluid `clamp()` scaling
- **Mobile Menu:** CSS-only (kein JavaScript)
- **Fonts:** Iowan Old Style / Optima (umschaltbar)

## Deployment

### StaticHost.eu
1. Account bei [statichost.eu](https://statichost.eu)
2. GitHub Repository verknüpfen
3. Build: `npm run build` → `dist/`
4. Auto-Deploy aktivieren

## Development

### Seiten hinzufügen
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---
<MainLayout title="Titel" currentPath="/path/">
  <article class="article">
    <h1>Content</h1>
  </article>
</MainLayout>
```

### Navigation erweitern
`MainLayout.astro` → `navItems` Array anpassen

### CSS anpassen
`src/styles/global.css`:
- Spacing: `--s-2` bis `--s5`
- Typography: `--text-xs` bis `--text-xl`
- Colors: `--color-*`

## Status

**Ready:** Homepage, Kontakt, Responsive Layout, SEO  
**Todo:** Content-Migration, Kontaktformular, Mehrsprachigkeit

---

**Content:** David Hamann  
**Design:** Daniel Kause  
**Development:** Claude Code + Daniel Kause