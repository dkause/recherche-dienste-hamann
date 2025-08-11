# Recherche-Dienste - Dr. David Hamann

Professionelle Website für historische Archivrecherche und Transkriptionsservices.

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build

# Build-Output testen
npm run preview
```

Die Website läuft dann unter: http://localhost:4321/

## 📋 Über das Projekt

Diese Website präsentiert Dr. David Hamanns Dienstleistungen im Bereich:
- Archivrecherche (Schwerpunkt: NS-Zeit und Zweiter Weltkrieg)  
- Transkription historischer Dokumente (Sütterlin, Kurrentschrift)
- Lektorat wissenschaftlicher Publikationen

### Zielgruppe
Akademiker und Familienforscher 45+ Jahre mit Interesse an deutscher Geschichte des 19./20. Jahrhunderts.

## 🛠 Technischer Stack

- **Framework:** Astro 4.x (Static Site Generator)
- **Styling:** Custom CSS mit Every-Layout Prinzipien
- **Responsive:** Container Queries + Fluid Typography
- **Accessibility:** WCAG AA konform
- **Deployment:** StaticHost.eu mit GitHub Integration

### Dependencies
- `@astrojs/sitemap`: Automatische Sitemap-Generierung
- `astro-seo`: SEO-Meta-Tags Management

## 🎨 Design System

### CSS-Architektur
- **Layout:** Every-Layout Sidebar Pattern  
- **Typography:** Fluid scaling mit `clamp()`
- **Spacing:** Universelles System (`--s-2` bis `--s5`)
- **Colors:** "Warme Autorität" Palette (WCAG AA)

### Responsive Verhalten
- **Container > 417px:** Sidebar + Content nebeneinander
- **Container ≤ 417px:** Gestacktes Mobile Layout
- **Mobile Menu:** CSS-only Hamburger (kein JavaScript)

### Font-Optionen
```css
/* Option 1: Old Style (Standard) */
--font-primary: 'Iowan Old Style', 'Palatino Linotype', serif;

/* Option 2: Classical Humanist */
--font-primary: Optima, Candara, 'Noto Sans', sans-serif;
```

## 📁 Projektstruktur

```
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML-Grundgerüst + Global CSS
│   │   └── MainLayout.astro      # Navigation + Sidebar Layout
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   └── kontakt.astro         # Kontakt-Seite
│   └── styles/
│       └── global.css            # Komplettes CSS-System
├── content/                      # Original Markdown-Content (preserved)
├── assets/                       # Bilder und Dokumente
├── design-system.html            # Component Preview
└── public/                       # Statische Assets
```

## 🚢 Deployment

### StaticHost.eu Setup
1. Account bei [statichost.eu](https://statichost.eu) erstellen
2. GitHub Repository verknüpfen
3. Build-Settings: `npm run build` → `dist/` ordner
4. Auto-Deploy aus `main` branch aktivieren

### Build-Prozess
```bash
npm run build    # Generiert dist/ ordner
npm run preview  # Lokaler Test des Builds
```

## 📝 Content Management

### Seiten hinzufügen
Neue `.astro` Dateien in `src/pages/` erstellen:

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="Seitentitel" currentPath="/neue-seite/">
  <article class="article">
    <h1>Seitentitel</h1>
    <p>Content hier...</p>
  </article>
</MainLayout>
```

### Navigation erweitern
Navigation in `src/layouts/MainLayout.astro` anpassen:

```js
const navItems = [
  { href: '/', label: 'Startseite' },
  { href: '/neue-seite/', label: 'Neue Seite' },
  // ... weitere Items
];
```

## 🎯 Key Features

### ✅ Implementiert
- Responsive Every-Layout Sidebar
- Fluid Typography mit `clamp()`
- CSS-only Mobile Menu
- Homepage mit Service-Cards
- Kontakt-Seite mit Dokument-Hinweisen
- SEO-optimierte Meta-Tags
- WCAG AA konforme Farben

### 🔄 In Entwicklung
- Vollständige Content-Migration aus `content/` 
- Kontaktformular (Cloudflare Forms)
- Sitemap-Integration
- Mehrsprachigkeit (Deutsch/Englisch)

## 🔧 Development

### Lokale Entwicklung
```bash
npm run dev         # http://localhost:4321/
npm run build       # Produktions-Build
npm run preview     # Build-Preview
```

### CSS-System anpassen
Alle Styles in `src/styles/global.css`:
- Spacing: `--s-2` bis `--s5` 
- Typography: `--text-xs` bis `--text-xl`
- Colors: `--color-*` Variablen

### Debugging
- Development Server läuft auf Port 4321
- Hot Reload für alle Änderungen aktiv
- Browser DevTools für Responsive Testing

## 📞 Support

**Technische Fragen:** Siehe `development-log.md`  
**Content Updates:** Siehe `tasks-daniel.md`  
**Design System:** Siehe `design-system.html` für Live-Preview

## 📄 Lizenz

Privates Projekt - Alle Rechte vorbehalten Dr. David Hamann

---

**Status:** ✅ MVP Ready for Deployment  
**Last Updated:** August 2025  
**Development:** Claude Code + Daniel Kause