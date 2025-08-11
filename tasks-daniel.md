# Tasks für Daniel - Recherche-Dienste Website

## Nach der automatischen Entwicklung zu erledigen

### 1. StaticHost.eu Setup (5-10 Min)
- [ ] Account bei https://statichost.eu erstellen
- [ ] GitHub Repository verbinden: https://github.com/dkause/recherche-dienste-hamann
- [ ] Auto-Deploy aus main branch aktivieren
- [ ] Build-Settings prüfen: `npm run build` → `dist/` ordner
- [ ] Generierte URL testen

### 2. Domain & DNS (Optional, 10-15 Min)
- [ ] Custom Domain bei StaticHost.eu konfigurieren (falls gewünscht)
- [ ] DNS-Einstellungen anpassen
- [ ] SSL-Zertifikat automatisch aktivieren

### 3. Content Review & Test (10 Min)
- [ ] Website auf generierter URL testen
- [ ] Mobile Ansicht prüfen (Hamburger Menu funktional?)
- [ ] Alle Seiten und interne Links testen
- [ ] Kontaktformular-Design prüfen

### 4. Potentielle Nacharbeiten (falls nötig)
- [ ] Fehlende Inhalte aus `content/` ergänzen
- [ ] Design-Anpassungen wenn nötig
- [ ] Performance optimieren
- [ ] Weitere Seiten aus Content-Struktur hinzufügen

## Notizen zur Entwicklung
- Alle Fortschritte sind im `development-log.md` dokumentiert
- Bei Problemen: Log-File prüfen für Details
- GitHub Repository: https://github.com/dkause/recherche-dienste-hamann

## Quick Start (nach StaticHost Setup)
```bash
# Lokale Entwicklung
npm run dev

# Build testen
npm run build

# Build-Output prüfen
ls dist/
```

## Support
- StaticHost.eu Docs: https://www.statichost.eu/docs/
- Astro Docs: https://docs.astro.build/
- Bei technischen Fragen: development-log.md prüfen