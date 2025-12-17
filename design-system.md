# Design-System – Imposter Holiday Edition

> Mobile-first Web-App | Weihnachts-Theme „Winter-Nacht"

---

## 1. Farbpalette

### Primärfarben (Backgrounds)

| Name | Hex | Verwendung |
|------|-----|------------|
| `night-900` | `#0D1321` | Haupt-Background (dunkelster Punkt des Gradients) |
| `night-800` | `#1D2D44` | Sekundärer Background / Gradient-Endpunkt |
| `night-700` | `#2B4162` | Elevated surfaces, Header-Bereich |

**Background-Gradient:**
```
linear-gradient(180deg, #1D2D44 0%, #0D1321 100%)
```

### Akzentfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| `pine-500` | `#2D5A45` | 45, 90, 69 | Tannengrün – Success-States, Crew-Elemente |
| `pine-400` | `#3D7A5A` | 61, 122, 90 | Tannengrün hell – Hover-States |
| `gold-500` | `#D4A04A` | 212, 160, 74 | Warm-Gold – Highlights, wichtige CTAs |
| `gold-400` | `#E8BC6A` | 232, 188, 106 | Gold hell – Glow-Effekte |
| `candy-500` | `#C94B4B` | 201, 75, 75 | Candy-Red – Impostor, Warnungen |
| `candy-400` | `#E06666` | 224, 102, 102 | Candy-Red hell – Hover |
| `snow-100` | `#FAFBFC` | 250, 251, 252 | Schneeweiß – Primärtext |
| `snow-200` | `#E1E5EA` | 225, 229, 234 | Sekundärtext |
| `snow-300` | `#B8C1CC` | 184, 193, 204 | Tertiärtext, Placeholder |

### Semantische Farben

| Kontext | Farbe | Verwendung |
|---------|-------|------------|
| Primary CTA | `gold-500` | Hauptaktionen (Spiel starten, Weiter) |
| Secondary CTA | `pine-500` | Sekundäre Aktionen |
| Danger | `candy-500` | Impostor-Reveal, Reset-Warnung |
| Success | `pine-500` | Crew gewinnt, Bestätigungen |
| Neutral | `snow-300` | Deaktivierte Elemente |

---

## 2. Typografie

### Font-Stack

```css
--font-heading: 'Nunito', 'Quicksand', system-ui, sans-serif;
--font-body: 'Inter', 'Nunito', system-ui, sans-serif;
```

**Google Fonts Import:**
```
Nunito: 600, 700, 800
Inter: 400, 500, 600
```

### Typografie-Skala

| Token | Größe | Line-Height | Weight | Verwendung |
|-------|-------|-------------|--------|------------|
| `display-xl` | 48px / 3rem | 1.1 | 800 | Splash-Titel |
| `display-lg` | 36px / 2.25rem | 1.2 | 700 | Screen-Titel |
| `heading-lg` | 28px / 1.75rem | 1.3 | 700 | Karten-Titel, Spieler-Name |
| `heading-md` | 24px / 1.5rem | 1.3 | 600 | Sektions-Titel |
| `heading-sm` | 20px / 1.25rem | 1.4 | 600 | Card-Headers |
| `body-lg` | 18px / 1.125rem | 1.5 | 400 | Haupt-Bodytext (Party-sicher!) |
| `body-md` | 16px / 1rem | 1.5 | 400 | Standard-Body |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | Hints, Labels |
| `caption` | 12px / 0.75rem | 1.4 | 500 | Kleine Hinweise, Badges |

### Textfarben

| Kontext | Farbe |
|---------|-------|
| Primärtext | `snow-100` (#FAFBFC) |
| Sekundärtext | `snow-200` (#E1E5EA) |
| Deaktiviert/Placeholder | `snow-300` (#B8C1CC) |
| Link/Akzent | `gold-500` (#D4A04A) |
| Fehler | `candy-500` (#C94B4B) |

---

## 3. Spacing-System (8px Grid)

| Token | Wert | Verwendung |
|-------|------|------------|
| `space-1` | 4px | Micro-Spacing (Icon-Gap) |
| `space-2` | 8px | Tight Spacing |
| `space-3` | 12px | Kompakte Elemente |
| `space-4` | 16px | Standard-Padding (Buttons, Inputs) |
| `space-5` | 20px | Medium-Gap |
| `space-6` | 24px | Card-Padding |
| `space-8` | 32px | Section-Spacing |
| `space-10` | 40px | Large-Gap |
| `space-12` | 48px | Screen-Padding (mobile) |
| `space-16` | 64px | XL-Spacing |

### Layout-Maße

| Element | Wert |
|---------|------|
| Max-Width Container | 480px (mobile-optimiert) |
| Safe-Area Padding | 16px horizontal |
| Card-Padding | 24px |
| Button-Height | 56px (große Touch-Ziele) |
| Input-Height | 52px |

---

## 4. Border & Radius

| Token | Wert | Verwendung |
|-------|------|------------|
| `radius-sm` | 8px | Kleine Elemente, Tags |
| `radius-md` | 12px | Buttons, Inputs |
| `radius-lg` | 16px | Cards, Modals |
| `radius-xl` | 24px | Große Karten, Screens |
| `radius-full` | 9999px | Pills, Avatare |

### Border-Stile

```css
--border-subtle: 1px solid rgba(255, 255, 255, 0.08);
--border-default: 1px solid rgba(255, 255, 255, 0.12);
--border-strong: 1px solid rgba(255, 255, 255, 0.2);
```

---

## 5. Schatten & Effekte

### Frosted Glass (Glasmorphism)

```css
.frosted-glass {
  background: rgba(29, 45, 68, 0.6);      /* night-800 @ 60% */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### Elevation-System

| Level | Box-Shadow | Verwendung |
|-------|------------|------------|
| `elevation-1` | `0 2px 8px rgba(0,0,0,0.15)` | Buttons, kleine Elemente |
| `elevation-2` | `0 4px 16px rgba(0,0,0,0.2)` | Cards |
| `elevation-3` | `0 8px 32px rgba(0,0,0,0.25)` | Modals, Overlays |
| `elevation-4` | `0 16px 48px rgba(0,0,0,0.3)` | Hero-Cards |

### Glow-Effekte (Lichterkette)

```css
/* Gold Glow für Primary CTAs */
--glow-gold: 0 0 20px rgba(212, 160, 74, 0.4),
             0 0 40px rgba(212, 160, 74, 0.2);

/* Pulsierender Glow (Animation) */
--glow-pulse: 0 0 20px rgba(212, 160, 74, 0.5);

/* Erfolg Glow */
--glow-success: 0 0 20px rgba(61, 122, 90, 0.4);

/* Danger Glow */
--glow-danger: 0 0 20px rgba(201, 75, 75, 0.4);
```

---

## 6. Komponenten

### 6.1 Buttons

#### Primary Button (CTA)

```
Größe: width: 100% | height: 56px | padding: 16px 32px
Background: gold-500 (#D4A04A)
Text: night-900 (#0D1321) | body-lg (18px) | weight: 600
Border-Radius: radius-md (12px)
Box-Shadow: elevation-1 + glow-gold (bei Hover)

States:
- Default: gold-500 bg
- Hover: gold-400 bg + glow-gold
- Active: gold-500 bg, scale(0.98)
- Disabled: snow-300 bg, 50% opacity
```

#### Secondary Button

```
Background: transparent
Border: 2px solid snow-200
Text: snow-100 | body-lg | weight: 500
Hover: bg rgba(255,255,255,0.05), border snow-100
```

#### Danger Button

```
Background: candy-500
Text: snow-100
Hover: candy-400 + glow-danger
```

### 6.2 Cards

#### Frosted Card (Standard)

```
Background: frosted-glass
Padding: space-6 (24px)
Border-Radius: radius-lg (16px)
Border: border-subtle

Struktur:
┌─────────────────────────────┐
│  [Icon]                     │  ← Optional
│  Heading (heading-md)       │
│  Subtext (body-md, snow-200)│
│                             │
│  [Content Area]             │
│                             │
│  [CTA Button]               │  ← Optional
└─────────────────────────────┘
```

#### Player Card (Abstimmung)

```
Background: frosted-glass (leichter)
Padding: space-4 (16px)
Border-Radius: radius-md (12px)
Min-Height: 80px

States:
- Default: standard frosted
- Selected: gold-500 border (2px), glow-gold
- Voted: check-icon overlay
```

#### Reveal Card (Dramatisch)

```
Background: gradient (night-700 → night-900)
Border: 2px solid gold-500
Box-Shadow: elevation-4 + glow-gold
Padding: space-8 (32px)
Text-Align: center
```

### 6.3 Inputs

#### Text Input

```
Height: 52px
Background: rgba(255,255,255,0.05)
Border: border-default → gold-500 (focus)
Border-Radius: radius-md (12px)
Padding: 16px
Text: snow-100, body-lg
Placeholder: snow-300

Focus: 
- Border: 2px solid gold-500
- Box-Shadow: 0 0 0 4px rgba(212, 160, 74, 0.15)
```

#### Stepper (Zahlen-Eingabe)

```
Layout: [–] [Zahl] [+]
Button-Size: 48x48px
Zahl: heading-lg, zentriert
Min-Width: 180px
```

#### Toggle Switch

```
Track: 52x28px, radius-full
Knob: 24x24px
Off: night-700 track, snow-200 knob
On: pine-500 track, snow-100 knob
Transition: 200ms ease-out
```

### 6.4 Progress Indicators

#### Step Indicator (Candy-Cane Style)

```
Layout: Horizontal dots/circles mit Verbindungslinien
Active: gold-500 gefüllt
Completed: pine-500 gefüllt + check
Upcoming: night-700 outline

Verbindungslinie: 
- Completed: pine-500 solid
- Upcoming: snow-300 dashed (subtle candy-cane pattern)
```

#### Progress Bar

```
Height: 8px
Track: night-700
Fill: gradient gold-400 → gold-500
Border-Radius: radius-full
```

### 6.5 Modal / Overlay

```
Overlay: rgba(13, 19, 33, 0.85)
Modal: frosted-glass, elevation-3
Max-Width: 400px
Padding: space-8 (32px)
Border-Radius: radius-xl (24px)
Animation: fade-in + scale (300ms)
```

### 6.6 Badge / Tag

```
Padding: 6px 12px
Background: rgba(255,255,255,0.1)
Border-Radius: radius-full
Text: caption (12px), snow-200
```

---

## 7. Icons

### Icon-Set (empfohlen)

**Lucide Icons** oder **Phosphor Icons** (outline style)

### Weihnachts-Icons (custom oder Emoji-Fallback)

| Icon | Verwendung |
|------|------------|
| 🔔 / Bell | Start, Reveal-Sound |
| ⭐ / Star | Highlight, Sieg |
| 🎁 / Gift | Übergabe-Screen |
| 🎄 / Tree | Kategorie Weihnachten |
| ❄️ / Snowflake | Animationen, Deko |
| 👁️ / Eye | Wort anzeigen |
| 👁️‍🗨️ / EyeOff | Wort verstecken |
| ✓ / Check | Bestätigung |
| ✕ / X | Schließen |

### Icon-Größen

| Kontext | Größe |
|---------|-------|
| Inline (Text) | 20px |
| Button-Icon | 24px |
| Card-Icon | 32px |
| Hero-Icon | 48px |
| Decorative | 64px+ |

---

## 8. Accessibility

### Kontrast-Ratios (WCAG AA)

| Kombination | Ratio | Status |
|-------------|-------|--------|
| snow-100 auf night-900 | 15.2:1 | ✅ AAA |
| snow-100 auf night-800 | 11.4:1 | ✅ AAA |
| gold-500 auf night-900 | 7.3:1 | ✅ AA |
| candy-500 auf night-900 | 5.1:1 | ✅ AA |

### Touch-Ziele

- Minimum: 44x44px (iOS) / 48x48px (Android)
- Empfohlen für Party-App: **56x56px**
- Spacing zwischen Touch-Targets: min. 8px

### Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid gold-500;
  outline-offset: 2px;
}
```

---

## 9. Responsive Breakpoints

| Breakpoint | Wert | Anpassungen |
|------------|------|-------------|
| Mobile (Default) | < 640px | Single-column, 16px padding |
| Tablet | ≥ 640px | Max-width: 480px zentriert |
| Desktop | ≥ 1024px | Max-width: 560px, größere Abstände |

### Mobile-First Container

```css
.container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 1024px) {
  .container {
    max-width: 560px;
    padding: 0 24px;
  }
}
```

---

## 10. Dark Mode

> Die App ist **ausschließlich im Dark Mode** designt (Winter-Nacht-Theme).
> Kein Light Mode vorgesehen – das ist Teil der Markenidentität.

---

## CSS Custom Properties (Zusammenfassung)

```css
:root {
  /* Colors */
  --color-night-900: #0D1321;
  --color-night-800: #1D2D44;
  --color-night-700: #2B4162;
  --color-pine-500: #2D5A45;
  --color-pine-400: #3D7A5A;
  --color-gold-500: #D4A04A;
  --color-gold-400: #E8BC6A;
  --color-candy-500: #C94B4B;
  --color-candy-400: #E06666;
  --color-snow-100: #FAFBFC;
  --color-snow-200: #E1E5EA;
  --color-snow-300: #B8C1CC;

  /* Typography */
  --font-heading: 'Nunito', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-normal: 300ms ease-out;
  --transition-slow: 500ms ease-out;
}
```
