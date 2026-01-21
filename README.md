# Training Tools - Astro Version

Trainingstools für mentale Fitness - Vanilla HTML/JS/CSS mit Astro Framework

Diese Anwendung wurde von einer React-Anwendung zu einer statischen Astro-Site konvertiert, die vanilla HTML, JavaScript und CSS verwendet.

## 🚀 Projekt Struktur

```
/
├── public/
│   ├── beep-short.mp3       # Audio-Datei für Sound-Feedback
│   └── icon-192x192.png     # App-Icon
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # Hauptlayout-Komponente
│   ├── pages/
│   │   ├── index.astro      # Startseite
│   │   ├── farben.astro     # Farben-Tool (Stroop-Effekt)
│   │   └── kettenrechner.astro  # Kettenrechner-Tool
│   ├── scripts/
│   │   ├── utils.js         # Gemeinsame Utilities
│   │   └── icons.js         # SVG-Icon-Definitionen
│   └── styles/
│       └── global.css       # Globale CSS-Styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Befehle

Alle Befehle werden vom Projektverzeichnis aus ausgeführt:

| Befehl                   | Aktion                                       |
| :----------------------- | :------------------------------------------- |
| `npm install`            | Installiert Abhängigkeiten                   |
| `npm run dev`            | Startet lokalen Dev-Server auf `localhost:3000` |
| `npm run build`          | Baut die Produktionssite nach `./dist/`      |
| `npm run preview`        | Zeigt das Build lokal an                     |

## 🎯 Training Tools

### Farben (Stroop-Effekt-Trainer)
- Reaktionstraining mit Farben und Wörtern
- Sound-Control-Modus (Farbe wechselt bei Geräusch)
- Mikrofon-Integration für Audio-Trigger
- Einstellbare Geschwindigkeit und Anzahl der Schritte

### Kettenrechner
- Kopfrechnen mit fortlaufenden Operationen
- Additions- und Subtraktionsaufgaben
- Einstellbare Geschwindigkeit und Schriftgröße
- Unendlich-Modus verfügbar

## 🔧 Technologie-Stack

- **Astro** - Statischer Site-Generator
- **Vanilla JavaScript** - Keine React-Abhängigkeiten
- **CSS Custom Properties** - Design-System mit CSS-Variablen
- **Web Audio API** - Für Mikrofonzugriff und Sound-Synthese
- **LocalStorage** - Für Einstellungsspeicherung

## 📱 Features

- Vollbild-Modus
- Responsive Design
- Deutsche Benutzeroberfläche
- Accessibility-Unterstützung (ARIA-Labels)
- Offline-fähig (nach erstem Laden)

## 🎨 Design-System

Das Design verwendet CSS Custom Properties für konsistente Farben und Abstände:

```css
:root {
  --color-background: #0a0a0f;
  --color-surface: #151520;
  --color-primary: #6366f1;
  --color-success: #22c55e;
  --color-danger: #dc2626;
  /* ... */
}
```

## 📝 Lizenz

Dieses Projekt wurde von React auf Astro konvertiert und ist für Trainingszwecke gedacht.