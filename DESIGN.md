# DESIGN.md — „Czy warto tworzyć strategię rozwoju gminy partycypacyjnie?"

Artefakt referencyjny (Faza 0). To pisemny odpowiednik kompów wizualnych —
po akceptacji koduję stronę dokładnie wg tej specyfikacji.

---

## 1. Koncepcja przewodnia (concept spine)

**„Protokół debaty"** — strona jest zanonimizowanym *zapisem sporu*, nie wykładem.
Estetyka: archiwum / think-tank / civic-tech. Czytelnik przegląda kolejne „wpisy"
protokołu, w których ścierają się trzy siły.

- **Narracja:** archiwum/dossier — indeksowane sekcje, podpisy, powściągliwa powaga.
- **Główne napięcie:** trzy głosy — **mieszkańcy ↔ eksperci ↔ polityka**.
- **Numeracja sekcji 01–10 jest uzasadniona** (realna sekwencja argumentu, nie ozdoba).

### Element-podpis (jedna rzecz do zapamiętania)
**Trójgłosowy wskaźnik napięcia** — mały trójpolowy wskaźnik (mieszkańcy / eksperci /
polityka), który pojawia się subtelnie w nagłówkach kolejnych sekcji jako „stan debaty",
a w **Sekcji 9** staje się w pełni interaktywny (3 suwaki proporcji). To wizualnie spina całą
narrację: teza „złota proporcja nie istnieje" jest dosłownie wpisana w element-podpis.
Cała śmiałość idzie tutaj — reszta strony pozostaje cicha i zdyscyplinowana.

---

## 2. Kolory (tokeny → `src/styles/tokens.css`)

Zgodne z briefem (jasne tło, grafit, granat, oliwka, koral), doprecyzowane:

| Token | Hex | Rola |
|---|---|---|
| `--paper` | `#F5F3EE` | tło główne (off-white, ciepły papier) |
| `--paper-2` | `#ECE9E1` | tło sekcji „cichych" / karty |
| `--ink` | `#1C1C1A` | tekst główny (grafit) |
| `--ink-soft` | `#55524B` | tekst drugorzędny, podpisy |
| `--navy` | `#1E3A5F` | akcent 1 — eksperci / dane / instytucja |
| `--olive` | `#5C6B3C` | akcent 2 — mieszkańcy / proces wspólnotowy |
| `--coral` | `#C04A2B` | akcent 3 — spór / ostrzeżenie / „fasada" |
| `--hairline` | `#D8D4CA` | linie, ramki, siatka |

- **Tło ciemne** (Sekcja 4 „gdzie zaczyna się problem") = inwersja: `--ink` jako tło,
  `--paper` jako tekst, koral jako akcent dramaturgiczny.
- Trzy akcenty mają **stałe znaczenie semantyczne** przez całą stronę:
  granat=eksperci, oliwka=mieszkańcy, koral=polityka/spór. Czytelnik uczy się kodu.
- A11y: znaczenie **nigdy tylko przez kolor** — zawsze etykieta lub ikona/kształt obok.

---

## 3. Typografia

Kontrast **instytucja vs człowiek** jako zabieg projektowy:

- **Display — `Bricolage Grotesque`** (zmienny, charakterny editorial grotesk): nagłówki sekcji,
  mocne pytania. Ciasny tracking, duża skala, kontrolowana liczba linii.
- **Body / UI — `Inter`**: leady, treść kart, etykiety, przyciski. Neutralny, czytelny.
- **Głosy — `Newsreader` italic** (serif): parafrazowane „głosy z debaty" (`„głos z małej
  gminy"`). Serif-italik nadaje anonimowym głosom *ludzki* ton, kontra do grotesku instytucji.

Wszystkie self-host przez `@fontsource` (lekkość, brak zależności od CDN).

### Skala (clamp, mobile-first)
- `h1` (mocne pytanie hero): `clamp(2.4rem, 7vw, 5.5rem)`, waga 600, leading ~0.98
- `h2` (nagłówek sekcji): `clamp(1.9rem, 4.5vw, 3.25rem)`, waga 600
- `lead`: `clamp(1.05rem, 2vw, 1.4rem)`, waga 400, `--ink-soft`
- `body`: `1rem / 1.6`
- `caption / eyebrow`: `0.8rem`, uppercase, letter-spacing `0.08em`, `--ink-soft`
- `quote` (Newsreader italic): `clamp(1.2rem, 2.6vw, 1.9rem)`

---

## 4. Layout i rytm

- **Kontener:** maks. ~1180px treści; szerokie sekcje (split/timeline) sięgają krawędzi.
- **Eyebrow każdej sekcji:** `PROTOKÓŁ · 0X` + krótka etykieta tematu (koduje sekwencję).
- **Rytm:** naprzemiennie sekcje „głośne" (interaktywne, pełnoekranowe) i „ciche"
  (oddech, dużo światła). Sekwencja jasności: jasno → bogato → ciemno (S4) → jasno…
- **Hairline grid:** cienkie linie `--hairline` jako system porządku (archiwalny charakter),
  nigdy jako dekoracja-śmieć.

### ASCII — hero (Sekcja 1)
```
┌───────────────────────────────────────────────┐
│ PROTOKÓŁ DEBATY · 01            [trójgłos ▣▣▣] │
│                                                 │
│   Czy strategię rozwoju gminy                   │
│   da się naprawdę                               │
│   współtworzyć z mieszkańcami?                  │  ← H1 behemot
│                                                 │
│   lead: jeszcze niedawno formalność, dziś       │
│   prawo wymaga konsultacji — ale czy to ma sens?│
│                                                 │
│   ┌─ Twoim zdaniem mieszkańcy powinni… ──────┐  │
│   │ ( ) od początku  ( ) na etapach          │  │  ← mini-sondaż
│   │ ( ) raczej nie   ( ) nie mam zdania      │  │
│   └──────────────────────────────────────────┘  │
│                                   ↓ wejdź do debaty│
└───────────────────────────────────────────────┘
```

### ASCII — split dwóch modeli (Sekcja 5)
```
┌──────────────────────┬──────────────────────┐
│ MODEL A · ekspercki  │  MODEL B · wspólnotowy│
│ (granat)             │  (oliwka)             │
│ argumenty za         │  argumenty za         │
│ ryzyka               │  ryzyka               │
│ dla jakiej gminy     │  dla jakiej gminy     │
│      [ za / ryzyka / dla kogo ] ← przełącznik │
└──────────────────────┴──────────────────────┘
       mobile: stack pionowy, przełącznik na górze
```

---

## 5. Mapa 10 sekcji

Legenda ruchu: **F**=fade-in, **S**=stagger, **P**=pin/sticky, **C**=scrub. Mobile zawsze
upraszcza do stacku.

| # | Sekcja | Główna myśl | Interakcja | Tło | Ruch |
|---|---|---|---|---|---|
| 01 | Hero | pytanie otwiera spór | mini-sondaż (localStorage) | paper, pełny ekran | F + wejście H1 |
| 02 | Po co strategie | motywacje są sprzeczne | grid klikanych chipsów → komentarz 2–3 zd. | paper | S kart |
| 03 | Co zmieniło prawo | szybki kontekst | slider „kiedyś ↔ teraz" / 2 kolumny | paper-2 (cicha) | F |
| 04 | Gdzie problem | obowiązek ≠ odpowiedź | sticky scroll: pytanie↔kontrgłos | **ink (ciemna)** | P + C |
| 05 | Dwa modele | centralne napięcie | split A/B + przełącznik (za/ryzyka/dla kogo) | paper | F + przełącznik |
| 06 | Kiedy włączać | najbardziej praktyczna | klikalna timeline 5 etapów → panel | paper-2 | P timeline |
| 07 | Narzędzia | konkret i użyteczność | toolbox kart + filtry (toggle chips) | paper | S + filtr |
| 08 | Fasada? | mocny krytyczny moment | mini quiz scenariuszy | koral-akcent | F + reveal werdyktu |
| 09 | Złota proporcja | nie ma jednej recepty | **3 suwaki → opisowy komentarz** (element-podpis) | paper | animowane suwaki |
| 10 | Powrót do pytania | domknięcie pętli | pokazuje odpowiedź z S01 + drugi sondaż + puenta | paper, pełny ekran | F |

**Treść każdej sekcji** trzyma jedną główną myśl, prowadzi pytaniem, mało tekstu na ekran.

---

## 6. Ruch i dostępność

**Tak (wg briefu):** fade-in przy scrollu, subtelny stagger kart, pin dla sticky (S4, S6),
rozkładanie kart po kliknięciu, animowane suwaki, highlight wybranego stanowiska.

**Nie:** ciężkie parallaxy, przejścia 3D, przesadny motion, cokolwiek spowalniającego odbiór.
> Z `gpt-taste` bierzemy tylko wzorce ScrollTrigger (pin/scrub) — odrzucamy jego maksymalizm
> i „randomizację", bo brief żąda lekkości i czytelności.

**Quality floor (bez ogłaszania):**
- `prefers-reduced-motion` → animacje wyłączone/uproszczone, treść w pełni dostępna.
- Widoczne `focus-visible` na wszystkich interaktywnych elementach.
- Kontrast WCAG AA; hierarchia nagłówków h1→h2→h3 bez przeskoków.
- Mobile: każda interakcja działa tapnięciem; timeline i split mają wersję pionową.
- Sondaż, suwaki, quiz, filtry obsługiwalne klawiaturą (natywne `input`/`button` gdzie się da).

---

## 7. Zasady treści (zasada „Las Vegas")

- **Anonimizacja:** żadnych nazwisk; głosy jako `„głos z dużego miasta"`, `„głos z małej
  gminy"`, `„praktyczka konsultacji"`, `„uczestniczka debaty"`.
- **Parafrazy, nie cytaty dosłowne**; skracać; bez ostrych sformułowań personalnych i aluzji
  politycznych.
- Strona = **synteza napięć i wniosków**, nie zapis rozmowy.
- Ton: inteligentny, refleksyjny, lekko editorialowy, prowokujący pytaniami — bez moralizowania
  i bez pokazywania któregokolwiek modelu jako „dobrego/złego".
- Copy pisane od strony odbiorcy, aktywnym głosem; etykiety mówią co się stanie (np. CTA
  „wejdź do debaty", nie „submit").
- Cała treść w `src/data/content.js` — jedno źródło, przejrzysz przed publikacją.

---

## 8. Stack i pliki (potwierdzone)

Vite + React (JS), `gsap` + ScrollTrigger, `@fontsource` (Bricolage Grotesque, Inter,
Newsreader). Struktura: `src/sections/*.jsx`, `src/components/*.jsx` (Chip, Card, Slider,
Toggle, StickyScene, VoiceTag, TensionMeter), `src/data/content.js`,
`src/hooks/usePersistedAnswer.js`, `src/styles/tokens.css`.

---

→ **STOP. Czekam na Twoją akceptację `DESIGN.md` (lub uwagi) przed kodowaniem.**
