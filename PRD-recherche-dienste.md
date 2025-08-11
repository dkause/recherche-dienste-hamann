# Product Requirements Document (PRD)
## Recherche-Dienste Website - Dr. David Hamann

**Version:** 1.0  
**Datum:** 21. Juli 2025  
**Projekt-Lead:** Daniel Kause  
**Development Partner:** Claude Code  

---

## 1. Project Brief

### Vision
Professionelle, vertrauensvolle Website für Dr. David Hamanns Archivrecherche-Services, optimiert für Akademiker und Familienforscher 45+.

### Problem Statement
Dr. Hamann benötigt eine moderne, statische Website die seine Expertise vermittelt und Kunden klar durch seine Services führt, ohne dass sie Originaldokumente einsenden.

### Success Metrics
- Reduzierte Nachfragen zu Arbeitsweise und Ablauf
- Weniger Zusendung von Originaldokumenten  
- Klare Conversion-Pfade zu Kontaktaufnahme
- Mobile-optimierte UX für alle Altersgruppen

---

## 2. Target Persona

**Primäre Zielgruppe: "Der wissbegierige Forscher"**
- **Alter:** 45-75 Jahre (GenX, Boomer)
- **Background:** Akademisch gebildet, neugierig, lösungsorientiert
- **Tech-Affinität:** Grundlegend, aber nicht native digital
- **Motivation:** Familiengeschichte erforschen, wissenschaftliche Recherche
- **Pain Points:** Unsicherheit über Prozess, Tendenz Originale zu versenden

**UX-Implikationen:**
- Große, klare Schrift und Buttons
- Einfache, logische Navigation (max. 7 Hauptpunkte)
- Prominente Vertrauenselemente (Qualifikationen, Prozess)
- Klare Anweisungen für Dokumenten-Handling

---

## 3. Technical Requirements

### Tech Stack (festgelegt)
- **Framework:** Astro 4.x (statische Website)
- **Dependencies:** @astrojs/sitemap, astro-seo, @astrojs/i18n
- **Styling:** Custom CSS mit Dry und Composition over Inheritance Prinzipien
- **Fonts:** Old Style / Classical Humanist (umschaltbar)
- **Colors:** "Warme Autorität" Palette (WCAG AA)
- **Deployment:** Cloudflare Pages (GitHub Auto-Deploy)
- **Languages:** Deutsch/Englisch (Zweisprachig)

### CSS System (bereits entwickelt)
- Universelles Spacing: `--s-2` bis `--s5`
- Fluid Typography: `--text-xs` bis `--text-xl` mit clamp()
- **Responsive Method:** Container Queries + clamp() (KEINE Media Queries)
- Composable & DRY-Prinzipien
- Keine Utility-Klassen, semantische Komponenten

### Performance Requirements
- Statische Generierung für optimale Ladezeiten
- Mobile-First, responsive Design
- Accessibility WCAG AA konform

---

## 4. Development Phases

### Phase 1: Foundation (Review nach 2-3 Commits)
**Deliverables:**
- Astro-Projekt Setup mit Dependencies
- CSS-System Integration (globale Styles)
- Base Layout Components (Header, Footer, Container)
- 2 Test-Pages: Startseite + Kontakt
- CSS Mobile Menu (button method, kein JavaScript)

**Definition of Done:**
- Lokal lauffähig mit `npm run dev`
- Responsive auf Desktop/Mobile
- CSS-System funktional

### Phase 2: Content Integration (Review nach 4-5 Commits)  
**Deliverables:**
- Alle 11 Seiten aus Content-Struktur
- Markdown-Integration mit Frontmatter
- Interne Verlinkung + Breadcrumb-Navigation
- "Dokumente richtig senden"-Feature prominent platziert

**Definition of Done:**
- Alle Seiten verfügbar und verlinkt
- Content aus `hamann-clean/content/` integriert
- SEO-Meta-Tags implementiert

### Phase 3: Polish & Components (Review nach 3-4 Commits)
**Deliverables:**
- Service-Cards für Startseite
- Kontaktformular (Cloudflare Forms)
- Sitemap.xml automatisch generiert
- Performance-Optimierung

**Definition of Done:**
- Website deployment-ready
- Alle Features funktional
- Cross-Browser getestet

---

## 5. Development Workflow

### Pair Programming Protocol
- **Daniel:** Mentor, Product Owner, Code Reviewer
- **Claude Code:** Implementation Partner, fragt bei Unsicherheiten nach
- **Commit-Frequenz:** Nach jedem Feature/Fix
- **Review-Punkte:** Nach jeder Phase + bei Design-Entscheidungen

### Repository Management
- **Owner:** Daniel (GitHub Account)
- **Branching:** Main branch für stabile Versionen
- **Claude Code:** Arbeitet an Features, committed häufig mit klaren Messages

### Communication
- Claude Code dokumentiert Entscheidungen in Commit-Messages
- Bei UX/Design-Fragen: Stopp und nachfragen
- Regelmäßige "Status & Next Steps" nach Phasen

---

## 6. Content Structure (bereits definiert)

```
Hauptnavigation (7 Punkte):
├── Startseite (/)
├── Recherche (/recherche/)
├── Transkription (/transkription/)  
├── Biografie (/biografie/)
├── Kontakt (/kontakt/)
├── Nationalsozialismus (/nationalsozialismus/)
│   ├── Personalunterlagen
│   └── Dokumente
└── Zweiter Weltkrieg (/zweiter-weltkrieg/)
    ├── Militärakten  
    └── Feldpost
```

**Content bereits fertig** in `/hamann-clean/content/` als Markdown mit Frontmatter.

---

## 7. Key UX Features

### Critical Features
1. **"Dokumente korrekt senden"-Sektion** 
   - Prominent auf Kontakt-Seite
   - In allen Service-Bereichen erwähnt
   - Klare Anweisung: "Nur Scans/Fotos, niemals Originale"

2. **Vertrauens-Elemente**
   - Dr. Hamanns Qualifikationen prominent
   - Referenzen und Arbeitsweise transparent
   - Datenschutz-Hinweise

3. **Mobile Menu (CSS-only)**
   - CSS button method, kein JavaScript
   - Für ältere Zielgruppe zugänglich

### Navigation Principles
- Maximal 3 Klicks zu jeder Information
- Breadcrumb-Navigation auf Unterseiten
- Querverweise zwischen verwandten Services

---

## 8. Documentation Requirements

### Für Laien (Dr. Hamann)
- README: Wie Content-Updates beauftragen
- Basis-Erklärungen für Hosting/Domain
- Kontakt-Informationen für technische Hilfe

### Für Entwickler  
- Technische Architektur-Dokumentation
- CSS-System Erklärung
- Deployment-Process
- Wartung und Updates

### Code-Qualität
- Saubere, kommentierte Astro-Komponenten
- Selbsterklärender CSS mit Kommentaren
- Konsistente Namenskonventionen

---

## 9. Success Criteria

### Technical
- ✅ Website läuft statisch auf Cloudflare
- ✅ Mobile/Desktop responsive
- ✅ WCAG AA konform
- ✅ Ladezeiten < 2 Sekunden

### UX  
- ✅ Intuitive Navigation für 65+ Zielgruppe
- ✅ Klare Service-Darstellung ohne Verwirrung
- ✅ Reduzierte "Originaldokument"-Problematik

### Handover
- ✅ Dr. Hamann kann Änderungen beauftragen
- ✅ Andere Entwickler können Projekt übernehmen
- ✅ Vollständige Dokumentation vorhanden

---

## 10. Design System & Layout Specifications

### Responsive Layout Strategy
- **Method:** Container Queries + Clamp() (keine Media Queries)
- **Reference:** Every-layout.dev Sidebar Pattern
- **Principle:** Intrinsic Design - Layout reagiert auf verfügbaren Raum, nicht Viewport

### Sidebar Layout Implementation (Every-Layout Pattern)

**CSS-Mechanismus:**
```css
.layout-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s1);
}

.sidebar {
  flex-basis: 250px;     /* Feste Navigation-Breite */
  flex-grow: 1;          /* Kann wachsen wenn Content wrapped */
}

.content {
  flex-basis: 0;         /* Startet ohne Mindestbreite */
  flex-grow: 999;        /* Nimmt verfügbaren Platz */
  min-inline-size: 60%;  /* Wrap-Trigger bei ~417px Container */
}
```

**Layout-Verhalten:**
- **Container > ~417px:** Navigation (250px) + Content nebeneinander
- **Container ≤ ~417px:** Navigation oben, Content 100% breit darunter
- **Automatisch:** Kein Media Query, nur intrinsische Flexbox-Logik

### Desktop Layout (Container > 417px)
- **Grid:** Navigation-Sidebar (250px) + Content-Area (flexibel)
- **Navigation:** Vertikales Menu mit Logo oben
- **Content:** Two-column Layout mit Initial-Buchstabe (200% Größe)
- **Typography:** Größerer Font, mehr Zeilenabstand

### Mobile Layout (Container ≤ 417px)
- **Header:** Horizontal - Hamburger+MENU (links) + Logo (rechts)
- **Content:** Single Column, kompakte Typography
- **Navigation:** Off-canvas Menu (CSS-only)

### Mobile Menu Specifications
- **Style:** Vertical Stack (Hamburger Icon + "MENU" Text)
- **Position:** Left side of header (touch target: 44x44px)
- **Icon Specs:** 24x24px, 3 lines, 2px height, 6px spacing
- **Reference:** NNGroup Mobile Navigation Patterns
- **Implementation:** CSS-only (Checkbox-Hack oder moderne :has() Lösung)

### Typography System
- **Method:** Fluid clamp() values für alle Größen
- **Initial Letter:** 200% standard size bei größeren Viewports
- **Fonts:** Old Style/Classical Humanist umschaltbar
- **Line Height:** Responsive mit clamp()

### Content Responsive Behavior
- **Mobile:** Einspaltige Content-Area
- **Desktop:** Zweispaltige Content-Area mit Initial-Buchstaben
- **Transition:** Smooth über Container Queries

---

## 11. Out of Scope

- Content Management System (statisch gewünscht)
- E-Commerce/Bezahlfunktionen
- User-Accounts oder Login-Bereiche
- JavaScript-heavy Interaktionen

---

**Next Steps:** Phase 1 Start nach Daniel's Review und Go-Ahead.
