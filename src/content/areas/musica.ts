import type { Area } from "../types";

export const musica: Area = {
  id: "musica",
  name: "Música",
  tagline: "Ouvir, sentir, marcar o tempo.",
  description:
    "Pulso, ritmo, altura e dinâmica: os ingredientes da música explicados com o ouvido e com o corpo.",
  pigment: "saffron",
  motif: "quarter",
  tracks: [
    {
      id: "mu-ritmo",
      title: "Ritmo e pulso",
      summary: "O coração que move a música.",
      level: "Iniciante",
      modules: [
        {
          id: "mu-tempo",
          title: "Sentir o tempo",
          lessons: [
            {
              id: "mu-pulso",
              title: "Pulso e andamento",
              summary: "A batida constante por trás de toda música.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "A música tem um coração",
                  body: "Quando você bate o pé ouvindo uma canção, está marcando o pulso: uma batida regular que organiza todos os sons. O andamento é a velocidade desse pulso.",
                },
                {
                  kind: "visual",
                  title: "Pulso regular",
                  visual: { type: "diagram", id: "pulse" },
                  caption: "Batidas igualmente espaçadas no tempo. BPM = batidas por minuto.",
                },
                {
                  kind: "cards",
                  title: "Andamentos comuns",
                  cards: [
                    { title: "Lento · 60 BPM", body: "Uma batida por segundo, como um relógio. Baladas." },
                    { title: "Moderado · 100 BPM", body: "Andar tranquilo. Pop e MPB." },
                    { title: "Rápido · 140 BPM", body: "Corrida leve. Frevo, rock acelerado." },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "mu-pulso-q1",
                    prompt: "Qual andamento é o mais rápido?",
                    options: [{ label: "60 BPM" }, { label: "90 BPM" }, { label: "150 BPM" }],
                    answer: 2,
                    explanation: "Quanto mais batidas por minuto, mais rápido o pulso.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "practice",
                    id: "mu-pulso-practice",
                    prompt: "Ligue o metrônomo e acompanhe o pulso com o corpo.",
                    checklist: ["Bati palmas junto com 8 batidas seguidas", "Marquei o pulso com o pé sem olhar a tela", "Contei em voz alta: 1, 2, 3, 4"],
                    metronomeBpm: 90,
                  },
                },
                { kind: "conclusion", points: ["Pulso é a batida regular da música.", "Andamento é a velocidade do pulso, medida em BPM."] },
              ],
            },
            {
              id: "mu-figuras",
              title: "Figuras rítmicas",
              summary: "Semibreve, mínima, semínima e colcheia.",
              minutes: 7,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "Escrever a duração",
                  body: "Na partitura, cada figura indica quanto tempo um som dura em relação ao pulso. Aprender quatro figuras já permite ler muitos ritmos.",
                },
                {
                  kind: "visual",
                  title: "A árvore das figuras",
                  visual: { type: "diagram", id: "note-values" },
                  caption: "Cada figura vale metade da anterior.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "mu-figuras-match",
                    prompt: "Associe cada figura à sua duração (com a semínima valendo 1 tempo).",
                    pairs: [
                      { left: "Semibreve", right: "4 tempos" },
                      { left: "Mínima", right: "2 tempos" },
                      { left: "Semínima", right: "1 tempo" },
                      { left: "Colcheia", right: "½ tempo" },
                    ],
                    explanation: "Semibreve 4, mínima 2, semínima 1, colcheia ½ — sempre dividindo por dois.",
                  },
                },
                { kind: "tip", body: "Diga \"tá\" para cada semínima e \"ti-ti\" para cada par de colcheias. Falar o ritmo ajuda a senti-lo." },
                {
                  kind: "activity",
                  activity: {
                    type: "rhythm",
                    id: "mu-figuras-rhythm",
                    prompt: "Leia a notação e monte o ritmo na grade. Cada casa vale meio tempo.",
                    figures: ["seminima", "seminima", "colcheias", "seminima"],
                    bpm: 90,
                    explanation: "Semínima ocupa 2 casas (som + espera); um par de colcheias ocupa 2 casas com som nas duas.",
                  },
                },
                { kind: "conclusion", points: ["Figuras indicam duração relativa ao pulso.", "Cada figura vale metade da anterior."] },
              ],
            },
            {
              id: "mu-compassos",
              title: "Compassos",
              summary: "Agrupar pulsos: 2, 3 e 4 tempos.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 3",
                  title: "Pulsos em grupos",
                  body: "Os pulsos se organizam em grupos chamados compassos. O primeiro tempo de cada grupo é mais forte — é ele que dá o \"balanço\" de cada estilo.",
                },
                {
                  kind: "visual",
                  title: "Binário, ternário, quaternário",
                  visual: { type: "diagram", id: "measures" },
                  caption: "O tempo forte (maior) inicia cada compasso.",
                },
                {
                  kind: "cards",
                  cards: [
                    { title: "2/4 · binário", body: "FORTE-fraco. Marchas, samba, frevo." },
                    { title: "3/4 · ternário", body: "FORTE-fraco-fraco. Valsa." },
                    { title: "4/4 · quaternário", body: "FORTE-fraco-médio-fraco. A maioria do pop e do rock." },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "mu-compassos-q1",
                    prompt: "Uma valsa é tipicamente escrita em qual compasso?",
                    options: [{ label: "2/4" }, { label: "3/4" }, { label: "4/4" }],
                    answer: 1,
                    explanation: "A valsa gira em três: UM-dois-três, UM-dois-três.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "rhythm",
                    id: "mu-compassos-rhythm",
                    prompt: "Monte este compasso 4/4 com uma pausa no terceiro tempo.",
                    figures: ["seminima", "colcheias", "pausa", "seminima"],
                    bpm: 96,
                    explanation: "A pausa também ocupa tempo: 2 casas em silêncio.",
                  },
                },
                { kind: "conclusion", points: ["Compassos agrupam pulsos com um tempo forte.", "Silêncios (pausas) também contam o tempo."] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "mu-som",
      title: "Som e melodia",
      summary: "Altura e intensidade.",
      level: "Iniciante",
      modules: [
        {
          id: "mu-propriedades",
          title: "Propriedades do som",
          lessons: [
            {
              id: "mu-altura",
              title: "Altura: grave e agudo",
              summary: "Subir e descer na escala.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "Sons sobem e descem",
                  body: "A altura é o quão grave ou agudo um som é. Ela depende da frequência da vibração: vibrações rápidas soam agudas, lentas soam graves.",
                },
                {
                  kind: "visual",
                  title: "A escada da escala",
                  visual: { type: "diagram", id: "pitch" },
                  caption: "Dó, ré, mi, fá, sol, lá, si: cada degrau, um som mais agudo.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "mu-altura-q1",
                    prompt: "Ouça os três sons. Qual é o mais agudo?",
                    options: [
                      { label: "Som A", tone: 220 },
                      { label: "Som B", tone: 660 },
                      { label: "Som C", tone: 330 },
                    ],
                    answer: 1,
                    explanation: "O som B vibra 660 vezes por segundo — a frequência mais alta, logo o mais agudo.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "order",
                    id: "mu-altura-order",
                    prompt: "Ouça e ordene as notas do grave para o agudo.",
                    items: [
                      { label: "Dó", tone: 261.63 },
                      { label: "Mi", tone: 329.63 },
                      { label: "Sol", tone: 392 },
                      { label: "Dó agudo", tone: 523.25 },
                    ],
                    explanation: "Dó, mi e sol formam o acorde de dó maior; o dó agudo repete o primeiro uma oitava acima.",
                  },
                },
                { kind: "conclusion", points: ["Altura depende da frequência.", "As notas da escala formam uma escada do grave ao agudo."] },
              ],
            },
            {
              id: "mu-dinamica",
              title: "Dinâmica: forte e piano",
              summary: "A intensidade que dá expressão.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "Volume é expressão",
                  body: "A mesma melodia pode sussurrar ou gritar. Dinâmica é a variação de intensidade — e é uma das maiores ferramentas expressivas de quem toca ou canta.",
                },
                {
                  kind: "visual",
                  title: "Do pianíssimo ao fortíssimo",
                  visual: { type: "diagram", id: "dynamics" },
                  caption: "Os termos vêm do italiano: piano = suave, forte = forte.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "mu-dinamica-match",
                    prompt: "Associe cada sinal ao significado.",
                    pairs: [
                      { left: "pp", right: "Muito suave" },
                      { left: "p", right: "Suave" },
                      { left: "f", right: "Forte" },
                      { left: "ff", right: "Muito forte" },
                    ],
                    explanation: "pp = pianíssimo, p = piano, f = forte, ff = fortíssimo.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "mu-dinamica-q1",
                    prompt: "O que indica um crescendo (<) na partitura?",
                    options: [{ label: "Aumentar a velocidade" }, { label: "Aumentar gradualmente a intensidade" }, { label: "Tocar mais grave" }],
                    answer: 1,
                    explanation: "Crescendo é o volume crescendo aos poucos; o oposto é o decrescendo (>).",
                  },
                },
                { kind: "conclusion", points: ["Dinâmica é a variação de intensidade.", "Crescendo e decrescendo criam movimento emocional."] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
