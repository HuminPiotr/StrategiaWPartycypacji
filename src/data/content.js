// Jedyne źródło treści. Cała treść zanonimizowana i sparafrazowana (zasada „Las Vegas",
// patrz DESIGN.md §7): żadnych nazwisk, żadnych dosłownych kontrowersyjnych cytatów,
// głosy oznaczane rolami, nie osobami.

export const meta = {
  title: 'Czy strategię rozwoju gminy da się naprawdę współtworzyć z mieszkańcami?',
  intro:
    'Jeszcze niedawno wiele strategii powstawało jako formalność. Dziś prawo wymaga konsultacji — ale wciąż nie wiadomo, czy to ma sens i jak robić to dobrze.',
}

// Kolejność i etykiety sekcji (eyebrow „PROTOKÓŁ · 0X”).
export const sections = [
  { id: 'hero', n: '01', label: 'Wejście' },
  { id: 'why', n: '02', label: 'Po co' },
  { id: 'law', n: '03', label: 'Prawo' },
  { id: 'problem', n: '04', label: 'Dylemat' },
  { id: 'models', n: '05', label: 'Dwa modele' },
  { id: 'when', n: '06', label: 'Etapy' },
  { id: 'tools', n: '07', label: 'Narzędzia' },
  { id: 'facade', n: '08', label: 'Fasada' },
  { id: 'ratio', n: '09', label: 'Proporcje' },
  { id: 'return', n: '10', label: 'Powrót' },
]

// — SEKCJA 1: Hero / mini-sondaż —
export const poll = {
  question: 'Twoim zdaniem mieszkańcy powinni współtworzyć strategię?',
  options: [
    { id: 'start', label: 'Tak, od początku' },
    { id: 'stages', label: 'Tak, ale tylko na wybranych etapach' },
    { id: 'experts', label: 'Raczej nie — to rola ekspertów i władz' },
    { id: 'unsure', label: 'Nie mam zdania' },
  ],
}

// — SEKCJA 2: Po co tworzy się strategie (klikane kafelki) —
export const reasons = [
  {
    id: 'funds',
    label: 'Bo są fundusze zewnętrzne',
    note: 'Strategia bywa przepustką do pieniędzy. Pytanie, czy dokument pisany „pod nabór” opisuje realny kierunek gminy, czy tylko spełnia kryteria.',
  },
  {
    id: 'law',
    label: 'Bo wymaga tego prawo',
    note: 'Obowiązek porządkuje, ale potrafi też zamienić strategię w formularz. „Trzeba mieć” to nie to samo co „warto mieć”.',
  },
  {
    id: 'direction',
    label: 'Bo gmina potrzebuje kierunku',
    note: 'Najbardziej szlachetny powód — i najtrudniejszy. Kierunek wymaga wyboru, a wybór oznacza, że na coś nie starczy.',
  },
  {
    id: 'order',
    label: 'Bo to narzędzie porządkowania polityk',
    note: 'Strategia spina rozproszone plany w jedną logikę. Działa, jeśli ktoś jej później faktycznie używa przy decyzjach.',
  },
  {
    id: 'political',
    label: 'Bo to narzędzie polityczne',
    note: 'Dokument bywa też deklaracją władzy: tu idziemy. Bywa wizją, bywa obietnicą — i bywa podporządkowany kadencji.',
  },
  {
    id: 'identity',
    label: 'Bo mieszkańcy mają utożsamić się z wizją',
    note: 'Strategia może budować wspólnotę wokół przyszłości. Ale identyfikacja nie bierze się z publikacji pliku w BIP-ie.',
  },
  {
    id: 'expiry',
    label: 'Bo stara strategia wygasa i „coś musi być”',
    note: 'Najczęstszy cichy powód. Łatwo wtedy odtworzyć poprzedni dokument, zmieniając tylko daty.',
  },
]

// — SEKCJA 3: Co zmieniło prawo (kiedyś vs teraz) —
export const lawShift = {
  before: {
    title: 'Kiedyś',
    points: [
      'Strategia była nieobowiązkowa — gmina mogła ją mieć albo nie.',
      'Konsultacje bywały krótkie i uznaniowe.',
      'Raport z konsultacji nie musiał być publiczny.',
      'Spójność z dokumentami wyższego rzędu była luźna.',
    ],
  },
  after: {
    title: 'Teraz',
    points: [
      'Strategia stała się para-obowiązkowa — trudno jej uniknąć.',
      'Konsultacje muszą trwać co najmniej 35 dni.',
      'Raport z konsultacji musi być publiczny.',
      'Dokument ma być spójny z dokumentami wyższego rzędu.',
      'Mieszkańcy są wprost wskazani jako uczestnicy konsultacji.',
    ],
  },
  note: 'Prawo wskazało minimum proceduralne. Nie rozstrzygnęło najtrudniejszego pytania: kogo, kiedy i o co właściwie pytać.',
}

// — SEKCJA 4: Gdzie zaczyna się problem (sticky: pytanie ↔ kontrgłos) —
export const problemSteps = [
  {
    q: 'Mieszkańcy mają mówić o potrzebach czy o rozwiązaniach?',
    a: 'Łatwo zebrać listę potrzeb. Trudniej, gdy z konsultacji wychodzą gotowe rozwiązania, których nie da się ze sobą pogodzić ani sfinansować.',
  },
  {
    q: 'Czy strategia nie jest zbyt złożona na szeroką partycypację?',
    a: 'To dokument meta: o kierunkach, nie o konkretach. Trudno o niego pytać na otwartym spotkaniu, gdy każdy mówi o swojej ulicy.',
  },
  {
    q: 'Czy model ekspercki nie bywa czasem po prostu lepszy?',
    a: 'Dane, synteza, spójność — to mocne strony ekspertów. Ale dokument bez udziału ludzi potrafi zostać martwy zaraz po uchwaleniu.',
  },
  {
    q: 'Czy konsultowanie gotowego dokumentu ma jeszcze sens?',
    a: 'Jeśli pytamy dopiero o całość na końcu, zostaje gest. Sens pojawia się wcześniej — gdy jest co realnie zmienić.',
  },
]

// — SEKCJA 5: Dwa modele myślenia (split A/B) —
export const models = {
  tabs: [
    { id: 'for', label: 'Argumenty za' },
    { id: 'risk', label: 'Ryzyka' },
    { id: 'fit', label: 'Dla jakiej gminy' },
  ],
  a: {
    name: 'Strategia jako dokument ekspercki',
    accent: 'navy',
    for: [
      'Opiera się na danych, wiedzy i syntezie.',
      'Mieszkańcy nie muszą tworzyć dokumentu meta.',
      'Dobrze działają konsultacje konkretów, nie samej wizji.',
    ],
    risk: [
      'Może powstać dokument technokratyczny, bez identyfikacji.',
      'Łatwo o oderwanie od realnego życia gminy.',
      '„Eksperci wiedzą lepiej” bywa wygodną wymówką.',
    ],
    fit: [
      'Gdy materia jest trudna i wymaga twardych danych.',
      'Gdy czas i zasoby na szeroki proces są ograniczone.',
    ],
  },
  b: {
    name: 'Strategia jako proces wspólnotowy',
    accent: 'olive',
    for: [
      'Bez udziału ludzi dokument pozostaje martwy.',
      'Udział buduje identyfikację i zrozumienie decyzji.',
      'Partycypacja bywa formą edukacji samorządowej i współodpowiedzialności.',
    ],
    risk: [
      'Ryzyko chaosu i niespójnych oczekiwań.',
      'Proces jest czasochłonny i trudny do moderowania.',
      'Bez sprzężenia zwrotnego zaufanie szybko się wypala.',
    ],
    fit: [
      'Gdy gmina buduje wspólnotę wokół wspólnej wizji.',
      'Gdy ważniejsza od tempa jest trwałość i akceptacja.',
    ],
  },
  note: 'Żaden z modeli nie jest „dobry” ani „zły”. Różnią się tym, do jakiej gminy i do jakiego momentu pasują.',
}

// — SEKCJA 6: Kiedy włączać mieszkańców (timeline etapów) —
export const stages = [
  {
    id: 'diagnosis',
    name: 'Diagnoza',
    potential: 'Mieszkańcy widzą problemy, których nie widać w danych. To najmocniejszy moment ich wiedzy lokalnej.',
    risk: 'Diagnoza zamienia się w listę życzeń, jeśli nikt nie tłumaczy, czemu ona służy.',
    tools: ['Wywiady grupowe', 'Diagnoza wielonarzędziowa', 'Konsultacje online'],
    debate: 'W debacie mocno wybrzmiało, że dobra diagnoza przesądza o jakości całej strategii.',
  },
  {
    id: 'problems',
    name: 'Definiowanie problemów',
    potential: 'Wspólne nazwanie problemów buduje zrozumienie, dlaczego pewne wybory będą trudne.',
    risk: 'Bez moderacji wygrywają najgłośniejsi, a nie najważniejsze sprawy.',
    tools: ['Narada obywatelska', 'Tematyczne grupy robocze'],
    debate: 'Głosy z praktyki: tu najłatwiej pomylić emocje z priorytetami.',
  },
  {
    id: 'directions',
    name: 'Wyznaczanie kierunków',
    potential: 'Moment realnych wyborów. Udział mieszkańców daje kierunkom legitymację.',
    risk: 'To także materia najbardziej „meta” — najtrudniejsza do szerokiej partycypacji.',
    tools: ['Grupy eksperckie', 'Narada obywatelska'],
    debate: 'Część praktyków uważa, że to etap raczej dla węższego, kompetentnego grona.',
  },
  {
    id: 'consult',
    name: 'Konsultacja dokumentu',
    potential: 'Ostatni moment na korekty i wyłapanie tego, co umknęło.',
    risk: 'Jeśli dopiero tu zaczynamy pytać, zostaje gest — dokument jest już przesądzony.',
    tools: ['Konsultacje online', 'Spotkania otwarte'],
    debate: 'Najczęstszy zarzut z debaty: „konsultujemy gotowe” to za późno, by cokolwiek zmienić.',
  },
  {
    id: 'implement',
    name: 'Wdrażanie i dalsze działania',
    potential: 'Tu strategia żyje albo umiera. Udział mieszkańców utrzymuje ją przy życiu po uchwaleniu.',
    risk: 'Po publikacji dokumentu zwykle wszyscy wracają do codzienności i nikt go nie otwiera.',
    tools: ['Tematyczne grupy robocze', 'Praca na poziomie dzielnic'],
    debate: 'Wniosek z debaty: bez etapu wdrożenia nawet najlepsza strategia zostaje plikiem.',
  },
]

export const stagePanelLabels = {
  potential: 'Potencjał',
  risk: 'Ryzyko',
  tools: 'Narzędzia',
  debate: 'Co padło w debacie',
}

// — SEKCJA 7: Jakie narzędzia działają (toolbox + filtry) —
export const toolFilters = [
  { id: 'small', label: 'Dla małej gminy' },
  { id: 'big', label: 'Dla dużego miasta' },
  { id: 'diagnosis', label: 'Na etapie diagnozy' },
  { id: 'directions', label: 'Na etapie kierunków' },
  { id: 'hard', label: 'Do trudnej materii' },
  { id: 'representation', label: 'Gdy chcesz szerszej reprezentacji' },
]

export const tools = [
  {
    id: 'interviews',
    name: 'Wywiady grupowe',
    desc: 'Pogłębiona rozmowa z małą grupą. Wyłapuje niuanse i motywacje, których nie zbierze ankieta.',
    tags: ['small', 'diagnosis', 'hard'],
  },
  {
    id: 'assembly',
    name: 'Narada obywatelska',
    desc: 'Reprezentacja mieszkańców pracuje nad rekomendacjami przy wsparciu wiedzy eksperckiej.',
    tags: ['big', 'directions', 'hard', 'representation'],
  },
  {
    id: 'expert-groups',
    name: 'Grupy eksperckie / tematyczne',
    desc: 'Węższe, kompetentne grono pracuje nad konkretnym wycinkiem strategii.',
    tags: ['directions', 'hard'],
  },
  {
    id: 'online',
    name: 'Konsultacje online',
    desc: 'Szeroki zasięg niskim kosztem. Dobre do zbierania sygnałów, słabsze do trudnych rozstrzygnięć.',
    tags: ['big', 'diagnosis', 'representation'],
  },
  {
    id: 'open-meetings',
    name: 'Spotkania otwarte',
    desc: 'Klasyka konsultacji. Dają widoczność, ale łatwo o dominację najgłośniejszych.',
    tags: ['small', 'diagnosis'],
  },
  {
    id: 'multi-tool',
    name: 'Diagnoza wielonarzędziowa',
    desc: 'Łączenie kilku metod naraz, by zobaczyć gminę z różnych stron i nie ufać jednemu źródłu.',
    tags: ['big', 'diagnosis', 'hard', 'representation'],
  },
  {
    id: 'micro-macro',
    name: 'Praca mikro (dzielnice) i makro',
    desc: 'Osobno rozmowa o dzielnicy, osobno o całym mieście. Inna skala, inne pytania, inni ludzie.',
    tags: ['big', 'directions', 'representation'],
  },
]

// — SEKCJA 8: Kiedy partycypacja staje się fasadą (quiz) —
export const facadeSignals = [
  'Dokument jest gotowy, a mieszkańcy dostają go tylko „do opinii”.',
  'Nikt nie rozumie treści dokumentu.',
  'Konsultacje są formalne i martwe.',
  'Strategia jest kopiuj-wklej z innej gminy.',
  'Brak informacji zwrotnej, co zrobiono z uwagami.',
  'Zaprasza się ciągle te same osoby.',
  '„Partycypacja” służy tylko odhaczeniu obowiązku.',
]

export const facadeQuiz = [
  {
    id: 'q1',
    scenario:
      'Gmina publikuje gotową strategię i zbiera uwagi przez wymagane 35 dni. Po terminie dokument zostaje uchwalony bez zmian, a uwagi trafiają do załącznika.',
    verdict: 'facade',
    explain: 'Procedura dochowana, ale nic nie dało się zmienić. To dopełnienie obowiązku, nie współtworzenie.',
  },
  {
    id: 'q2',
    scenario:
      'Przed napisaniem dokumentu odbywa się kilka warsztatów diagnostycznych w dzielnicach, a ich wnioski wracają do mieszkańców z informacją, co i dlaczego uwzględniono.',
    verdict: 'real',
    explain: 'Udział na wczesnym etapie plus sprzężenie zwrotne. To partycypacja, która realnie wpływa na treść.',
  },
  {
    id: 'q3',
    scenario:
      'Urząd organizuje jedno otwarte spotkanie wieczorem w środku tygodnia. Przychodzą głównie te same aktywne osoby co zwykle, a notatki nie zostają nigdzie opublikowane.',
    verdict: 'facade',
    explain: 'Wąska, przypadkowa reprezentacja i brak śladu po rozmowie. Forma jest, sensu mało.',
  },
  {
    id: 'q4',
    scenario:
      'Strategię współtworzy losowo dobrana narada obywatelska, wspierana danymi i ekspertami, a jej rekomendacje są jawne wraz z uzasadnieniem, które odrzucono.',
    verdict: 'real',
    explain: 'Reprezentatywny skład, wiedza ekspercka i transparentność decyzji. Tu udział ma ciężar.',
  },
]

export const facadeVerdicts = {
  real: 'To jeszcze partycypacja',
  facade: 'To już fasada',
}

// — SEKCJA 9: Złota proporcja nie istnieje (3 suwaki) —
export const ratio = {
  components: [
    { id: 'residents', label: 'Głos mieszkańców', accent: 'olive' },
    { id: 'experts', label: 'Wiedza ekspercka i dane', accent: 'navy' },
    { id: 'politics', label: 'Odpowiedzialność polityczna', accent: 'coral' },
  ],
  thesis:
    'Nie ma jednej właściwej proporcji. Kluczowe jest świadome projektowanie procesu — wiedza, kogo, kiedy i po co włączamy.',
  // Komentarze opisowe, nie oceniające — pojawiają się przy przewadze danego składnika.
  warnings: {
    experts: 'Przewaga ekspertów → ryzyko technokratycznego dokumentu, z którym nikt się nie utożsamia.',
    residents: 'Przewaga mieszkańców → ryzyko chaosu, niespójności i oczekiwań nie do pogodzenia.',
    politics: 'Przewaga polityki → ryzyko dokumentu podporządkowanego kadencji, a nie gminie.',
  },
  balanced:
    'Względna równowaga. Żaden głos nie dominuje — ale to nie „poprawna odpowiedź”, tylko jeden z możliwych, świadomych wyborów.',
}

// — SEKCJA 10: Powrót do pytania —
export const ending = {
  question: 'Czy po tej debacie zmieniłeś/aś zdanie?',
  options: [
    { id: 'yes', label: 'Tak' },
    { id: 'no', label: 'Nie' },
    { id: 'depends', label: 'Jeszcze bardziej widzę, że to zależy' },
  ],
  punchline:
    'Strategia nie staje się partycypacyjna dlatego, że zapytamy mieszkańców na końcu. Staje się sensowna wtedy, gdy wiemy, kogo, kiedy i po co włączamy do rozmowy o przyszłości gminy.',
}
