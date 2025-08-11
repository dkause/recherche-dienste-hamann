# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Dr. David Hamann's professional website for historical archive research services. It's a static website project focused on accessibility and fluid responsive design targeting academics and genealogy researchers aged 45+.

## Architecture

- **Project Type**: Static website (planned: Astro 4.x with statichost.eu deployment)
- **Current State**: Content and design system development phase
- **Content Structure**: Markdown files with frontmatter in `/content/` directory
- **Styling**: Custom CSS system using Every-Layout principles, fluid typography, and container queries

### Directory Structure
- `content/` - Markdown content files organized by page hierarchy
- `assets/` - Images and documents
- `styles/` - CSS files (global.css with comprehensive design system)
- `design-system.html` - Live preview of all design components

### Key Pages
- Homepage, Recherche, Transkription, Biografie, Kontakt
- Specialized sections: Nationalsozialismus, Zweiter Weltkrieg
- Each section has subsections (e.g., personalunterlagen, dokumente, militaerakten, feldpost)

## Design System

### CSS Architecture
- **Method**: Every-Layout sidebar pattern with fluid typography
- **Spacing**: Universal system with `--s-2` to `--s5` variables
- **Typography**: Fluid scaling using `clamp()` - no fixed breakpoints
- **Colors**: "Warme Autorität" palette (WCAG AA compliant)
- **Fonts**: Toggleable between Old Style serif and Classical Humanist sans-serif

### Layout System
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

### Responsive Behavior
- **Container > 417px**: Navigation sidebar + content side-by-side
- **Container ≤ 417px**: Navigation stacks above content (mobile)
- **Mobile menu**: CSS-only hamburger implementation (no JavaScript)

### Typography Variables
- `--text-xs` to `--text-xl` for fluid font sizes
- `--font-primary`: Iowan Old Style (switchable to Optima)
- `--font-heading`: Optima/Candara for headings

## Content Guidelines

- **Target audience**: Academics and genealogy researchers 45+ years
- **Key message**: Professional archive research without sending original documents
- **Content language**: German (with planned English translation)
- **Writing style**: Authoritative but accessible, emphasizing trust and expertise

## Development Notes

### No Build System Yet
- No package.json, webpack, or build process currently
- Pure HTML/CSS development at present
- Planning: Astro 4.x implementation with @astrojs/sitemap and astro-seo

### CSS Philosophy
- Composable and DRY principles
- No utility classes - semantic components only
- Container queries preferred over media queries
- Minimal CSS approach (~40 lines for core system)

### Performance Requirements
- Static generation for optimal loading
- Mobile-first responsive design
- Accessibility WCAG AA conformance
- Load times < 2 seconds

## Key UX Features

### Critical Elements
1. **Document submission guidance** - Prominent messaging about sending scans/photos, never originals
2. **Trust indicators** - Dr. Hamann's qualifications and transparent process
3. **Mobile accessibility** - Large touch targets (44px minimum), clear navigation

### Navigation
- Maximum 3 clicks to any information
- Breadcrumb navigation on subpages
- 7-point main navigation structure

## Implementation References

- **PRD**: `/PRD-recherche-dienste.md` - Complete project requirements
- **Design System**: `/design-system.md` - HTML/CSS component library
- **Live Preview**: `/design-system.html` - Working examples of all components
- **Content**: `/content/` directory structure matches final site architecture

## Deployment

### StaticHost.eu Integration
- **Platform**: statichost.eu with GitHub auto-deployment
- **Setup**: Connect GitHub repository via https://www.statichost.eu/docs/git-providers/#github
- **Build**: Automatic static site generation from repository
- **Domain**: Custom domain configuration available through statichost.eu

## Future Development

Planned tech stack:
- Astro 4.x static site generator
- statichost.eu deployment with GitHub integration
- Bilingual (German/English) support
- Automated sitemap generation
- Contact form integration