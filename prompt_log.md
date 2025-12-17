## Prompt Log


**Prompt:** <br>
Exacter, geh auf das design ein, es soll ein weinachts theme haben und es wird eine web app sein

**Result:**
```
Rolle: Du bist UX/UI-Designer + Product-Designer für eine moderne, mobile-first Web-App.
Aufgabe: Designe das Partyspiel „Imposter“ (wie in Handy-Apps: ein Handy wird reihum weitergegeben), aber als Weihnachts-Web-App.

Ziel & Kernidee
- 3–12 Spieler, Pass-and-Play am selben Gerät.
- Alle sehen dasselbe geheime Wort, außer der Impostor (sieht „???“ / „Du bist der Impostor“).
- Jeder gibt reihum kurze Hinweise, danach Diskussion + Abstimmung, dann Reveal.

Weihnachts-Theme (Look & Feel)
- Stimmung: cozy, festlich, „Winter-Nacht“ (nicht kitschig, eher modern).
- Farbpalette:
  - Background: dunkles Nachtblau/Anthrazit (Gradient).
  - Akzente: Tannengrün, Warm-Gold, Candy-Red, Schneeweiß.
- Visuelle Elemente:
  - Dezente Schneeflocken-Animation im Hintergrund (optional toggle: „Motion aus“).
  - UI-Karten wie „Frosted glass“ (leicht transparent, Blur).
  - Icons: Glöckchen, Stern, Geschenk, Mistelzweig, Weihnachtskugel.
  - Kleine Mikro-Animationen: Button-Glow wie Lichterkette, Confetti = Schneeflocken beim Sieg.
- Typografie:
  - Headings: freundliche, runde Sans (modern).
  - Body: sehr gut lesbar, große Schrift (Party-sicher).
- Sound (optional):
  - Kurze, leise „Jingle“-Sounds für Start/Reveal; immer mit Mute-Schalter.

UX Flow / Screens (genau ausarbeiten, mit Komponenten)
1) Landing / Start
   - Titel: „Imposter – Holiday Edition“
   - CTA: „Spiel starten“
   - Kleine Erklärung in 2 Zeilen + Icon-Reihe „Weitergeben • Hinweise • Abstimmen“

2) Setup
   - Spieleranzahl (Stepper 3–12)
   - Anzahl Impostor (Default 1; ab 8 Spielern Vorschlag 2)
   - Runden/Clues (z.B. 1–3 Runden)
   - Kategorie optional (z.B. „Weihnachten“, „Essen“, „Orte“, „Alltag“) + Random
   - Safety/Party-Optionen:
     - „Kinderfreundlich“ Toggle
     - „Motion reduzieren“ Toggle
     - „Sound an/aus“

3) Übergabe-Screen (Pass the phone)
   - Vollbild-Karte: „Gib das Handy an: Spieler X“
   - Button „Ich bin bereit“ (verhindert Spoiler)
   - Design: Geschenkpapier-Textur, große Nummer/Name, Schneeflocken im Rand

4) Rollen- & Wort-Reveal (privat)
   - Dramatischer Reveal in 2 Steps:
     a) „Du bist: Crew / Impostor“
     b) Wenn Crew: „Geheimes Wort: …“ (groß, kurz sichtbar)
        Wenn Impostor: „Du siehst das Wort nicht.“
   - Timer/Auto-Hide Option (z.B. 5 Sekunden) + „Verbergen“-Button
   - Danach: Button „Weitergeben“

5) Hint-Runden (Clue Eingabe)
   - Anzeige: „Spieler X: Gib 1 Hinweis“
   - Eingabefeld (kurz, max 30 Zeichen) + Beispiele als Placeholder
   - Regelhinweis: „Sag NICHT das Wort.“
   - Nach Absenden: „Weitergeben“-Screen

6) Übersicht / Runde fertig
   - Zeigt alle Hinweise als Liste (ohne Spieler-Reihenfolge optional)
   - Button „Diskussion starten“
   - Optional Timer: „2 Minuten diskutieren“ (mit Schneeglasuhr-Icon)

7) Abstimmung
   - Grid/Liste aller Spieler als Karten
   - Tap wählt Verdächtigen, dann „Stimme ab“
   - Zeige Live-Progress (z.B. „6/10 abgestimmt“) ohne Zwischenstände
   - Ergebnis-Screen: „Meiste Stimmen: Spieler Y“

8) Reveal & Ende
   - Reveal: „Impostor war: …“
   - Wenn Crew gewinnt: Schneeflocken-Confetti + „Crew gewinnt!“
   - Wenn Impostor gewinnt: „Impostor entkommt!“ (subtil, nicht böse)
   - Optional: Impostor darf das Wort raten (Input + „Bestätigen“)
   - Buttons: „Nochmal spielen“ / „Neue Runde mit gleichen Spielern“ / „Home“

UI-Komponenten & Design-Details (konkret)
- Buttons: groß, rounded, leichtes Glow (Lichterkette-Effekt)
- Cards: frosted glass, klare Hierarchie (Titel, Subtext, CTA)
- Progress/Stepper: „Candy-cane“ Style Divider (dezent)
- Modals: für Regeln & „Are you sure?“ beim Reset
- Accessibility:
  - hoher Kontrast, große Tap-Zonen
  - „Reduce motion“, „Mute“, „Textgröße groß“
  - klare Warnscreens gegen Spoiler (Übergabe-Screen ist Pflicht)

Game-Logik (kurz, aber eindeutig)
- Random Wort aus Kategorie
- Random Impostor-Zuweisung
- Pro Runde: jeder genau 1 Hinweis
- Danach Voting einmal
- Siegbedingungen:
  - Crew gewinnt, wenn Impostor entlarvt
  - Impostor gewinnt, wenn nicht entlarvt (optional Wort-Raten am Ende)

Output, den du liefern sollst
1) Design-System: Farben, Typo, Spacing, Komponenten (kurz + praktisch)
2) Wireframe-Beschreibung pro Screen (Layout in Worten)
3) Microcopy (exakte Button-Texte & Hinweise, deutsch, simpel)
4) Interaktionen/Animationen (was genau, wann, wie dezent)
5) Eine kurze „Happy Path“-User Journey von Start → Ende

Rahmen
- Mobile-first, responsive bis Desktop.
- Single-device Pass-and-Play.
- Kein Code liefern, nur Design + UX Spezifikation. '''
