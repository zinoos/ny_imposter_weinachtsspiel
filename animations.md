# Animationen & Interaktionen – Imposter Holiday Edition

> Alle Micro-Animations, Transitions und Motion-Specs
> Performance-optimiert mit „Reduce Motion" Fallbacks

---

## 1. Grundprinzipien

### Motion Philosophy

| Prinzip | Beschreibung |
|---------|--------------|
| **Purposeful** | Jede Animation hat einen Grund (Feedback, Orientierung, Delight) |
| **Subtle** | Dezent, nicht ablenkend – Party-Umgebung bedenken |
| **Fast** | Kurze Dauern (150-400ms), niemand wartet gern |
| **Accessible** | Voller Support für `prefers-reduced-motion` |

### Timing-System

| Token | Dauer | Easing | Verwendung |
|-------|-------|--------|------------|
| `--duration-instant` | 100ms | `ease-out` | Micro-Feedback (Tap) |
| `--duration-fast` | 150ms | `ease-out` | Button-States, Toggles |
| `--duration-normal` | 300ms | `ease-out` | Screen-Transitions, Cards |
| `--duration-slow` | 500ms | `ease-in-out` | Reveals, Overlays |
| `--duration-dramatic` | 800ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Winner-Reveal |

### Easing-Kurven

```css
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Overshoot */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 2. Background-Animationen

### 2.1 Schneeflocken-Animation

**Beschreibung:** Dezente, fallende Schneeflocken im Hintergrund aller Screens.

**Spezifikation:**

```css
.snowflake {
  position: fixed;
  top: -20px;
  color: rgba(255, 255, 255, 0.3);  /* Sehr transparent */
  font-size: 12px - 24px;  /* Verschiedene Größen */
  animation: snowfall linear infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes snowfall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
```

**Parameter:**

| Eigenschaft | Wert |
|-------------|------|
| Anzahl Flocken | 15-25 (abhängig von Viewport) |
| Fallgeschwindigkeit | 8-15 Sekunden (randomisiert) |
| Horizontale Drift | ±30px (subtle sway) |
| Opacity | max. 0.3 (sehr dezent) |
| Größen | 12px, 16px, 20px, 24px (gemischt) |
| Delay | 0-10s randomisiert |

**Reduce Motion Fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  .snowflake {
    animation: none;
    opacity: 0.15;  /* Statisch sichtbar, aber nicht animiert */
  }
}
```

### 2.2 Background Gradient Shift (optional)

**Beschreibung:** Sehr langsamer, kaum wahrnehmbarer Gradient-Shift.

```css
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.background {
  background: linear-gradient(180deg, #1D2D44 0%, #0D1321 100%);
  background-size: 100% 200%;
  animation: gradient-shift 30s ease-in-out infinite;
}
```

**Reduce Motion:** Animation deaktiviert, statischer Gradient.

---

## 3. Button-Animationen

### 3.1 Primary Button – Glow Pulse

**Beschreibung:** Sanft pulsierender Gold-Glow wie eine Lichterkette.

```css
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 
      0 0 15px rgba(212, 160, 74, 0.3),
      0 0 30px rgba(212, 160, 74, 0.15);
  }
  50% {
    box-shadow: 
      0 0 25px rgba(212, 160, 74, 0.5),
      0 0 50px rgba(212, 160, 74, 0.25);
  }
}

.btn-primary {
  animation: glow-pulse 2s ease-in-out infinite;
}
```

**Timing:** 2 Sekunden Zyklus, unendlich

**Reduce Motion:** Statischer Glow ohne Pulsieren

### 3.2 Button Tap-Feedback

**Beschreibung:** Kurzes Scale-Down bei Touch/Click.

```css
.btn:active {
  transform: scale(0.97);
  transition: transform 100ms ease-out;
}
```

| State | Transform | Duration |
|-------|-----------|----------|
| Default | `scale(1)` | – |
| Hover | `scale(1.02)` | 150ms |
| Active | `scale(0.97)` | 100ms |
| Focus | – | + Outline |

### 3.3 Button Hover-Glow (Desktop)

**Beschreibung:** Verstärkter Glow bei Mouse-Hover.

```css
.btn-primary:hover {
  box-shadow: 
    0 0 30px rgba(212, 160, 74, 0.6),
    0 0 60px rgba(212, 160, 74, 0.3);
  transition: box-shadow 200ms ease-out;
}
```

---

## 4. Card-Animationen

### 4.1 Card Entrance (Staggered)

**Beschreibung:** Cards erscheinen nacheinander mit Fade + Slide.

```css
@keyframes card-enter {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: card-enter 300ms ease-out forwards;
}

.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }
/* etc. */
```

**Reduce Motion:** Instant erscheinen, kein Slide.

### 4.2 Player Card Selection

**Beschreibung:** Gold-Border + Glow bei Auswahl (Voting).

```css
.player-card {
  transition: 
    border-color 200ms ease-out,
    box-shadow 200ms ease-out,
    transform 150ms ease-out;
}

.player-card--selected {
  border-color: var(--color-gold-500);
  box-shadow: 0 0 20px rgba(212, 160, 74, 0.4);
  transform: scale(1.02);
}
```

### 4.3 Frosted Glass Shimmer (optional)

**Beschreibung:** Subtiler Lichtreflex-Effekt auf Glass-Cards.

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
  pointer-events: none;
}
```

**Reduce Motion:** Deaktiviert.

---

## 5. Screen Transitions

### 5.1 Standard Page Transition

**Beschreibung:** Fade + leichter Slide zwischen Screens.

```css
/* Ausgehender Screen */
.page-exit {
  animation: page-out 250ms ease-in forwards;
}

@keyframes page-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
}

/* Eingehender Screen */
.page-enter {
  animation: page-in 300ms ease-out forwards;
}

@keyframes page-in {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Reduce Motion:** Nur Fade (opacity), kein Slide.

### 5.2 Modal Overlay

**Beschreibung:** Backdrop fade + Modal scale-in.

```css
/* Backdrop */
@keyframes backdrop-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.modal-backdrop {
  animation: backdrop-in 200ms ease-out forwards;
}

/* Modal Content */
@keyframes modal-in {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-content {
  animation: modal-in 300ms ease-out forwards;
}
```

---

## 6. Reveal-Animationen

### 6.1 Rollen-Reveal (Crew/Impostor)

**Beschreibung:** Dramatischer 2-Step-Reveal mit Blur-Effekt.

**Step 1: Blur auflösen**
```css
@keyframes role-reveal {
  0% {
    filter: blur(20px);
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    filter: blur(10px);
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    filter: blur(0);
    transform: scale(1);
    opacity: 1;
  }
}

.role-text {
  animation: role-reveal 600ms ease-out forwards;
}
```

**Step 2: Wort-Reveal**
```css
@keyframes word-reveal {
  0% {
    opacity: 0;
    letter-spacing: 20px;
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    letter-spacing: normal;
    filter: blur(0);
  }
}

.secret-word {
  animation: word-reveal 500ms ease-out forwards;
  animation-delay: 300ms;  /* Nach Rollen-Reveal */
}
```

### 6.2 Timer Countdown

**Beschreibung:** Progress-Bar Animation + Zahl-Pulse.

```css
/* Progress Bar */
@keyframes timer-drain {
  0% { width: 100%; }
  100% { width: 0%; }
}

.timer-bar-fill {
  animation: timer-drain 5s linear forwards;  /* 5 Sekunden */
}

/* Countdown-Zahl Pulse (letzte 3 Sekunden) */
@keyframes countdown-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.countdown-number--urgent {
  animation: countdown-pulse 500ms ease-in-out;
  color: var(--color-candy-500);
}
```

### 6.3 Winner Reveal

**Beschreibung:** Dramatisches Erscheinen des Siegers.

```css
@keyframes winner-reveal {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.winner-banner {
  animation: winner-reveal 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

---

## 7. Celebration-Animationen

### 7.1 Schneeflocken-Confetti (Crew-Sieg)

**Beschreibung:** Explosion von Schneeflocken bei Crew-Sieg.

```css
@keyframes confetti-fall {
  0% {
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(720deg) scale(0.5);
  }
}

.confetti-particle {
  position: fixed;
  top: -20px;
  animation: confetti-fall 3s ease-out forwards;
  pointer-events: none;
}
```

**Parameter:**

| Eigenschaft | Wert |
|-------------|------|
| Anzahl Partikel | 30-50 |
| Startposition | Random X, Y = -20px |
| Fallrichtung | Leicht nach außen (spread) |
| Dauer | 2.5-4s (randomisiert) |
| Partikel-Typen | ❄️ ✨ ⭐ (gemischt) |
| Farben | Snow-100, Gold-400, Pine-400 |

**Reduce Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .confetti-particle {
    animation: none;
    display: none;  /* Komplett ausblenden */
  }
  
  /* Alternative: Statisches Overlay */
  .celebration-static {
    display: block;
    background: radial-gradient(
      circle at center,
      rgba(212, 160, 74, 0.1) 0%,
      transparent 70%
    );
  }
}
```

### 7.2 Impostor-Entkommt Animation

**Beschreibung:** Subtilere Animation wenn Impostor gewinnt (kein Confetti).

```css
@keyframes impostor-escape {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(201, 75, 75, 0.5));
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(201, 75, 75, 0.3));
  }
}

.impostor-wins {
  animation: impostor-escape 1s ease-in-out;
}
```

---

## 8. Input & Form Animationen

### 8.1 Input Focus

**Beschreibung:** Border-Highlight + Glow bei Fokus.

```css
.input {
  transition: 
    border-color 200ms ease-out,
    box-shadow 200ms ease-out;
}

.input:focus {
  border-color: var(--color-gold-500);
  box-shadow: 0 0 0 4px rgba(212, 160, 74, 0.15);
}
```

### 8.2 Toggle Switch

**Beschreibung:** Smooth slide des Knobs.

```css
.toggle-knob {
  transition: transform 200ms ease-out;
}

.toggle--active .toggle-knob {
  transform: translateX(24px);
}

.toggle-track {
  transition: background-color 200ms ease-out;
}
```

### 8.3 Stepper Buttons

**Beschreibung:** Number-Change Animation.

```css
@keyframes number-bump {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.stepper-value--changed {
  animation: number-bump 200ms ease-out;
}
```

---

## 9. Icon-Animationen

### 9.1 Geschenk-Wackeln (Übergabe-Screen)

**Beschreibung:** Leichtes Hin-und-Her-Wackeln.

```css
@keyframes gift-wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

.gift-icon {
  animation: gift-wiggle 2s ease-in-out infinite;
}
```

### 9.2 Stern-Sparkle (Landing)

**Beschreibung:** Subtiles Funkeln des Hero-Sterns.

```css
@keyframes star-sparkle {
  0%, 100% { 
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(212, 160, 74, 0.5));
  }
  50% { 
    opacity: 0.8;
    filter: drop-shadow(0 0 20px rgba(212, 160, 74, 0.8));
  }
}

.star-icon {
  animation: star-sparkle 3s ease-in-out infinite;
}
```

### 9.3 Loading Spinner

**Beschreibung:** Rotierende Schneeflocke.

```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1.5s linear infinite;
}
```

---

## 10. Sound-Design (Optional)

### Sound-Effekte

| Trigger | Sound | Beschreibung |
|---------|-------|--------------|
| Spiel starten | `start.mp3` | Kurzes Glöckchen (0.5s) |
| Rollen-Reveal | `reveal.mp3` | Sanfter Chime (0.3s) |
| Wort anzeigen | `word.mp3` | Magischer Sparkle (0.4s) |
| Timer-Ende | `timer-end.mp3` | Soft Ding (0.2s) |
| Abstimmung | `vote.mp3` | Subtle Click (0.1s) |
| Crew-Sieg | `victory.mp3` | Fröhlicher Jingle (1.5s) |
| Impostor-Sieg | `escape.mp3` | Mysteriöser Ton (1s) |

### Sound-Guidelines

- **Lautstärke:** Max. 50% vom System-Volume
- **Dauer:** Nie länger als 2 Sekunden
- **Stil:** Weihnachtlich, aber nicht kitschig
- **Format:** MP3 + WebM für Kompatibilität
- **Mute:** Global toggle, per Session gespeichert

---

## 11. Performance-Optimierung

### GPU-Accelerated Properties

Für smooth 60fps nur diese Properties animieren:

```css
/* ✓ Performant */
transform: translate(), scale(), rotate();
opacity;
filter: blur();  /* Mit Vorsicht */

/* ✗ Vermeiden */
width, height;
top, left, right, bottom;
margin, padding;
border-width;
box-shadow;  /* Animiert = teuer */
```

### Will-Change Hints

```css
.animated-element {
  will-change: transform, opacity;
}

/* Nach Animation entfernen */
.animation-complete {
  will-change: auto;
}
```

### Reduce Motion Media Query

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Statische Alternativen aktivieren */
  .motion-alternative {
    display: block;
  }
}
```

---

## 12. Animation Trigger Map

| Screen | Trigger | Animation |
|--------|---------|-----------|
| Landing | Page load | Snowflakes start, Star sparkle |
| Landing | CTA hover | Glow intensify |
| Setup | Stepper tap | Number bump |
| Setup | Toggle tap | Knob slide |
| Übergabe | Page enter | Gift wiggle start |
| Reveal | Tap anywhere | Role blur-reveal |
| Reveal | After role | Word letter-reveal |
| Reveal | Timer tick | Bar drain, pulse at 3s |
| Hint | Input focus | Border glow |
| Hint | Submit | Card slide out |
| Voting | Card tap | Selection glow |
| Result | Page enter | Staggered reveals |
| Result (Crew) | After reveal | Confetti burst |
| Result (Imp) | After reveal | Subtle pulse |
