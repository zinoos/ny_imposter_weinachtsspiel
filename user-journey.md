# User Journey – Imposter Holiday Edition

> Happy Path: Idealer Spielablauf von Start bis Ende
> 6 Spieler, 1 Impostor, Kategorie „Weihnachten"

---

## Übersicht

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  START → SETUP → [ÜBERGABE → REVEAL] x6 → HINTS x6 → ÜBERSICHT     │
│                                                                     │
│  → [ÜBERGABE → VOTE] x6 → ERGEBNIS → ENDE                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Gesamtdauer:** ca. 10-15 Minuten (abhängig von Diskussionszeit)

---

## Detaillierte Journey

### Phase 1: Einstieg (1-2 Minuten)

#### Step 1: Landing Screen öffnen
**Kontext:** Anna öffnet die Web-App auf ihrem Handy. Die Familie sitzt nach dem Weihnachtsessen zusammen.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Screen | App wird geladen | Schneeflocken-Animation startet |
| Titel | Liest „IMPOSTER – Holiday Edition" | Stern-Icon funkelt |
| CTA | Tippt auf „Spiel starten" | Button-Glow, Transition zu Setup |

**Emotion:** Neugierig, festlich gestimmt 🎄

---

#### Step 2: Spiel einrichten
**Kontext:** Anna konfiguriert das Spiel für 6 Spieler.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Spieler-Stepper | Tippt [+] bis 6 | Zahl springt mit Animation |
| Impostor | Belässt bei 1 | Empfehlung: „1 bei 6 Spielern" ✓ |
| Kategorie | Wählt „🎄 Weihnachten" | Chip wird gold umrandet |
| Optionen | Lässt Defaults | Sound an, Motion an |
| CTA | Tippt „Los geht's! 🎄" | Transition, Glöckchen-Sound |

**Emotion:** Vorfreude, alle schauen gespannt 👀

---

### Phase 2: Rollen verteilen (3-4 Minuten)

#### Step 3: Erste Übergabe
**Kontext:** Das Handy geht an Spieler 1 (Papa).

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Screen | Zeigt „Gib das Handy an: Spieler 1" | Geschenk-Icon wackelt |
| Warning | Liest Warnung | ⚠️ Alle anderen schauen weg |
| CTA | Spieler 1 tippt „Ich bin bereit 👀" | Transition zu Reveal |

---

#### Step 4: Rollen-Reveal (Crew)
**Kontext:** Spieler 1 sieht seine Rolle.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Reveal Step 1 | Wartet gespannt | „Du bist: CREW" erscheint (grün) |
| Tap | Tippt auf Screen | Transition zu Wort |
| Reveal Step 2 | Sieht Wort | „TANNENBAUM" erscheint groß |
| Timer | Merkt sich das Wort | 5-Sekunden-Countdown läuft |
| CTA | Tippt „Weitergeben →" | Screen wechselt zu Übergabe |

**Emotion:** Erleichterung (kein Impostor), merkt sich Wort 🧠

---

#### Step 5-8: Weitere Spieler (Crew)
**Kontext:** Spieler 2, 3, 4, 5 sehen ebenfalls „CREW" + „TANNENBAUM".

| Spieler | Rolle | Wort | Reaktion |
|---------|-------|------|----------|
| Spieler 2 (Mama) | Crew | TANNENBAUM | ✓ Gemerkt |
| Spieler 3 (Oma) | Crew | TANNENBAUM | ✓ Gemerkt |
| Spieler 4 (Opa) | Crew | TANNENBAUM | ✓ Gemerkt |
| Spieler 5 (Tim) | Crew | TANNENBAUM | ✓ Gemerkt |

---

#### Step 9: Impostor-Reveal
**Kontext:** Spieler 6 (Lisa) ist der Impostor.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Reveal Step 1 | Wartet nervös | „Du bist: IMPOSTOR 🎭" (rot, pulsierend) |
| Tap | Tippt auf Screen | Transition zu Wort-Screen |
| Reveal Step 2 | Sieht keinen Begriff | „???" + „Du siehst das Wort nicht." |
| Tipp-Box | Liest Strategie | „Gib vage Hinweise..." |
| CTA | Tippt „Verstanden, weitergeben →" | Runde startet |

**Emotion:** Nervös, aufgeregt, muss schauspielern 🎭

---

### Phase 3: Hinweis-Runde (3-4 Minuten)

#### Step 10: Erste Hinweis-Eingabe
**Kontext:** Spieler 1 gibt den ersten Hinweis.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Übergabe | Spieler 1 nimmt Handy | „Ich bin bereit 👀" |
| Input-Screen | Sieht Eingabefeld | Placeholder: „z.B. ‚Ist grün'" |
| Eingabe | Tippt „Hat Nadeln" | Character-Counter: 10/30 |
| CTA | Tippt „Hinweis abgeben ✓" | Hinweis gespeichert |
| Übergabe | Gibt Handy weiter | „Gib das Handy an: Spieler 2" |

---

#### Step 11-15: Weitere Hinweise
**Kontext:** Alle Spieler geben nacheinander Hinweise.

| Spieler | Hinweis | Strategie |
|---------|---------|-----------|
| Spieler 1 (Papa) | „Hat Nadeln" | Eindeutig, aber nicht zu direkt |
| Spieler 2 (Mama) | „Riecht gut" | Tannenduft |
| Spieler 3 (Oma) | „Steht im Wohnzimmer" | Ortshinweis |
| Spieler 4 (Opa) | „Geschenke darunter" | Klassiker |
| Spieler 5 (Tim) | „Ist grün" | Farbe |
| **Spieler 6 (Lisa) 🎭** | „Man mag ihn" | Vage, passt zu vielem! |

**Impostor-Strategie:** Lisa hört die anderen Hinweise und gibt etwas Allgemeines, das zu verschiedenen Weihnachts-Dingen passen könnte.

---

### Phase 4: Diskussion (2-3 Minuten)

#### Step 16: Übersicht aller Hinweise
**Kontext:** Alle Hinweise werden gemeinsam angezeigt.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Liste | Lesen alle Hinweise | Staggered Animation, Einblenden |
| Diskussion | Besprechen verdächtige Hinweise | Timer läuft (optional) |
| Verdacht | „‚Man mag ihn' ist sehr vage..." | Lisa versucht abzulenken |
| CTA | Host tippt „Zur Abstimmung →" | Voting-Phase startet |

**Dialog-Beispiel:**
> Papa: „‚Man mag ihn' – wer hat das gesagt?"
> Lisa: „Das passt doch! Man mag Tannenbäume!"
> Tim: „Aber alle anderen Hinweise sind spezifischer..."
> Oma: „Ich finde ‚Steht im Wohnzimmer' auch nicht so eindeutig."

---

### Phase 5: Abstimmung (2-3 Minuten)

#### Step 17-22: Voting-Runde
**Kontext:** Jeder Spieler stimmt einzeln ab.

| Spieler | Übergabe | Wählt | Grund |
|---------|----------|-------|-------|
| Spieler 1 | „Ich bin bereit 🗳️" | Spieler 6 | „Man mag ihn" war zu vage |
| Spieler 2 | „Ich bin bereit 🗳️" | Spieler 6 | Stimmt Papa zu |
| Spieler 3 | „Ich bin bereit 🗳️" | Spieler 5 | Unsicher, rät |
| Spieler 4 | „Ich bin bereit 🗳️" | Spieler 6 | Logische Schlussfolgerung |
| Spieler 5 | „Ich bin bereit 🗳️" | Spieler 6 | Gruppeninstinkt |
| **Spieler 6 🎭** | „Ich bin bereit 🗳️" | Spieler 3 | Versucht abzulenken |

**Progress:** „Abgestimmt: 1/6" → „2/6" → ... → „6/6"

---

### Phase 6: Reveal & Ende (1 Minute)

#### Step 23: Ergebnis-Reveal
**Kontext:** Die Abstimmung ist beendet.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Stimmen-Reveal | Alle schauen gespannt | „Meiste Stimmen: Spieler 6 (4 Stimmen)" |
| Pause | Spannung steigt | 1 Sekunde Verzögerung |
| Impostor-Reveal | – | „Der Impostor war... 🎭 SPIELER 6 🎭" |
| Ergebnis | – | „✅ Richtig erkannt!" |
| Winner-Banner | – | „🎄 CREW GEWINNT! 🎄" (Confetti!) |
| Wort-Info | – | „Das Wort war: TANNENBAUM" |

**Emotion:** Jubel, Erleichterung, Lisa lacht mit 🎉

---

#### Step 24: Spielende
**Kontext:** Die Runde ist vorbei.

| Element | User Action | System Response |
|---------|-------------|-----------------|
| Optionen | Familie bespricht | Drei CTAs sichtbar |
| CTA 1 | Tippt „Nochmal spielen 🔄" | Neues Setup (6 Spieler vorausgewählt) |
| Alternativ | „Neue Runde (gleiche Spieler)" | Direkt neue Wort-Zuweisung |
| Alternativ | „Zum Start 🏠" | Zurück zu Landing |

**Nächste Runde:** Vielleicht ist diesmal jemand anders der Impostor! 🎭

---

## Alternative Pfade

### Impostor gewinnt

```
Step 23 Alternative:
- Meiste Stimmen: Spieler 3 (3 Stimmen)
- Der Impostor war: Spieler 6
- ❌ Falsch getippt!
- 🎭 IMPOSTOR ENTKOMMT! 🎭
- (Subtilere Animation, kein Confetti)
```

### Impostor rät das Wort (optional)

```
Nach „Impostor entlarvt":
- „Aber... Spieler 6 darf raten!"
- Input: „Tannenbaum"
- 🎉 Richtig! Impostor stiehlt den Sieg!
```

### Gleichstand bei Abstimmung

```
Stimmenverteilung: Spieler 3 (2), Spieler 6 (2), Rest verteilt
- „Gleichstand! Niemand fliegt raus."
- 🎭 IMPOSTOR ENTKOMMT! 🎭
```

---

## Emotional Journey Map

```
Emotion Level
     ▲
  😄 │                                              🎉
     │                                          ╱
  😊 │    ╭───╮                            ╭───╯
     │   ╱     ╲         ╭─────╮          ╱
  😐 │──╯       ╲       ╱       ╲        ╱
     │           ╲     ╱         ╲      ╱
  😟 │            ╲   ╱           ╲    ╱
     │             ╲─╯             ╲──╯
  😰 │
     └────────────────────────────────────────────▶ Zeit
       Start  Setup  Reveal  Hints  Discuss  Vote  Result
       
     ── Crew
     ── Impostor (höhere Anspannung während Hints & Vote)
```

---

## Metriken & Erfolgskriterien

### Time on Task

| Phase | Zielzeit | Max. Zeit |
|-------|----------|-----------|
| Setup | 30s | 2min |
| Pro Spieler (Reveal) | 15s | 30s |
| Pro Spieler (Hint) | 20s | 45s |
| Diskussion | 2min | 5min |
| Pro Spieler (Vote) | 10s | 20s |
| Reveal | 30s | 1min |

### Completion Rate

- **Ziel:** 95% der gestarteten Spiele werden beendet
- **Abbruch-Gründe minimieren:**
  - Klare Übergabe-Screens (kein Spoiler-Risiko)
  - Einfache Eingabe (keine komplexen Formulare)
  - Kurze Ladezeiten

### Engagement

- **Replay-Rate:** 70% spielen mindestens 2 Runden
- **Session-Länge:** Durchschnitt 3 Runden pro Session
- **Feature-Nutzung:** 
  - Timer: 40% nutzen ihn
  - Sound: 60% lassen ihn an
  - Wort-Raten: 30% nutzen es

---

## Edge Cases & Error Handling

### Versehentlich falscher Spieler sieht Wort

**Problem:** Spieler 2 drückt „Ich bin bereit", obwohl Spieler 3 dran ist.

**Lösung:** 
- Klare, große Anzeige „Gib das Handy an: Spieler 3"
- Warning-Text mit ⚠️ Icon
- Kein „Zurück"-Button während Reveal

### Spieler vergisst sein Wort

**Problem:** Crew-Mitglied hat das Wort vergessen.

**Lösung:**
- Wort ist nur 5 Sekunden sichtbar (bewusste Einschränkung)
- Bei erneutem Reveal-Wunsch: Spiel müsste neu gestartet werden
- **Design-Entscheidung:** Kurze Merkzeit ist Teil des Spiels

### Internet-Verbindung unterbrochen

**Problem:** App verliert Verbindung mitten im Spiel.

**Lösung:**
- Spielstand im LocalStorage speichern
- Bei Reconnect: „Spiel fortsetzen?" Modal
- Offline-fähig: Keine Server-Kommunikation nötig

### Zu wenig / zu viele Spieler

**Problem:** Jemand geht oder kommt hinzu.

**Lösung:**
- Kein dynamisches Hinzufügen/Entfernen während des Spiels
- Bei Bedarf: „Spiel beenden?" → Neues Setup

---

## Accessibility Journey

### Screen Reader Flow

1. **Landing:** „Imposter Holiday Edition. Spiel starten Button."
2. **Setup:** „Spieler: 6. Stepper. Plus Button, Minus Button."
3. **Übergabe:** „Gib das Handy an Spieler 3. Ich bin bereit Button."
4. **Reveal:** „Du bist Crew. Das geheime Wort ist Tannenbaum."
5. **Hint:** „Spieler 3. Gib deinen Hinweis. Textfeld."
6. **Vote:** „Abstimmung. Für Spieler 1 stimmen. Für Spieler 2 stimmen..."
7. **Result:** „Crew hat gewonnen. Das Wort war Tannenbaum."

### Keyboard Navigation (Desktop)

- Tab: Zwischen interaktiven Elementen
- Enter/Space: Buttons aktivieren
- Arrow Keys: Stepper, Kategorie-Auswahl
- Escape: Modals schließen

### Reduced Motion Experience

- Keine Schneeflocken-Animation
- Keine Confetti-Animation
- Instant Screen-Transitions
- Statische Button-Styles (kein Glow-Pulse)
- Alle Informationen bleiben verfügbar
