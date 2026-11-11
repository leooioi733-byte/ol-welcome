import type { Area } from "../types";

export const danca: Area = {
  id: "danca",
  name: "Dança",
  tagline: "O corpo como pincel.",
  description:
    "Consciência corporal, espaço, tempo e qualidade de movimento. Aprenda a dançar entendendo o que o corpo comunica.",
  pigment: "orchid",
  motif: "arch",
  tracks: [
    {
      id: "da-corpo",
      title: "Corpo em movimento",
      summary: "Perceber, ocupar o espaço e contar.",
      level: "Iniciante",
      modules: [
        {
          id: "da-base",
          title: "Base do movimento",
          lessons: [
            {
              id: "da-consciencia",
              title: "Consciência corporal",
              summary: "Perceber o corpo antes de movê-lo.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "Dançar começa por dentro",
                  body: "Antes de aprender passos, é preciso perceber o próprio corpo: onde está o peso, como a respiração se move, quais partes estão tensas. Isso é consciência corporal.",
                },
                {
                  kind: "visual",
                  title: "A cinesfera",
                  visual: { type: "diagram", id: "kinesphere" },
                  caption: "O espaço ao redor do corpo que você alcança sem sair do lugar — sua \"bolha\" de movimento.",
                },
                {
                  kind: "cards",
                  cards: [
                    { title: "Peso", body: "Sinta os pés no chão. Onde o peso está apoiado?" },
                    { title: "Eixo", body: "Uma linha imaginária do topo da cabeça ao chão." },
                    { title: "Respiração", body: "Ela acompanha e dá impulso ao movimento." },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "da-consciencia-q1",
                    prompt: "O que é a cinesfera?",
                    options: [{ label: "Um tipo de passo de balé" }, { label: "O espaço que o corpo alcança sem se deslocar" }, { label: "Um aquecimento cardiovascular" }],
                    answer: 1,
                    explanation: "Conceito do coreógrafo Rudolf Laban: a esfera pessoal de alcance do corpo.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "practice",
                    id: "da-consciencia-practice",
                    prompt: "Faça este aquecimento consciente, em pé, num espaço livre.",
                    checklist: [
                      "Respirei fundo 3 vezes sentindo o peito e a barriga",
                      "Girei lentamente cabeça, ombros e quadril",
                      "Explorei minha cinesfera alcançando alto, baixo e para os lados",
                      "Observei onde estava meu peso ao final",
                    ],
                  },
                },
                { kind: "conclusion", points: ["Consciência corporal é a base da dança.", "A cinesfera é o seu espaço pessoal de movimento."] },
              ],
            },
            {
              id: "da-niveis",
              title: "Níveis no espaço",
              summary: "Baixo, médio e alto.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "O corpo ocupa alturas",
                  body: "Coreógrafos pensam o espaço em três níveis. Variar entre eles torna a dança mais interessante e expressiva.",
                },
                {
                  kind: "visual",
                  title: "Os três níveis",
                  visual: { type: "diagram", id: "body-levels" },
                  caption: "Baixo: perto do chão. Médio: agachado ou inclinado. Alto: em pé, saltando, na ponta dos pés.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "da-niveis-match",
                    prompt: "Associe cada movimento ao nível em que acontece.",
                    pairs: [
                      { left: "Rolar no chão", right: "Nível baixo" },
                      { left: "Agachar e girar", right: "Nível médio" },
                      { left: "Saltar com braços para cima", right: "Nível alto" },
                    ],
                    explanation: "Mudanças de nível criam contraste visual, como claro e escuro numa pintura.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "practice",
                    id: "da-niveis-practice",
                    prompt: "Crie uma pequena sequência passando pelos três níveis.",
                    checklist: ["Comecei no nível baixo", "Subi para o nível médio com um giro", "Terminei no nível alto", "Repeti a sequência sem parar"],
                  },
                },
                { kind: "conclusion", points: ["Baixo, médio e alto são os três níveis.", "Variar níveis dá dinamismo à dança."] },
              ],
            },
            {
              id: "da-contagem",
              title: "Contar a música em 8",
              summary: "A contagem que todo dançarino usa.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 3",
                  title: "5, 6, 7, 8!",
                  body: "Dançarinos contam a música em blocos de 8 tempos. Isso permite combinar passos, sincronizar grupos e saber quando entrar.",
                },
                {
                  kind: "visual",
                  title: "Um bloco de 8",
                  visual: { type: "diagram", id: "eight-count" },
                  caption: "Dois compassos de 4 formam um \"oito\". Frases coreográficas costumam ter 4 oitos.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "da-contagem-q1",
                    prompt: "Quando o professor diz \"5, 6, 7, 8!\", o que vem a seguir?",
                    options: [{ label: "Uma pausa longa" }, { label: "O tempo 1, quando todos começam" }, { label: "O fim da música" }],
                    answer: 1,
                    explanation: "É a contagem de entrada: os últimos tempos de um oito preparam o início do próximo.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "practice",
                    id: "da-contagem-practice",
                    prompt: "Com o metrônomo, conte e marque os oitos com o corpo.",
                    checklist: ["Dei um passo para a direita no 1 e para a esquerda no 2, por 8 tempos", "Bati palma só no tempo 1 de cada oito", "Fiz 4 oitos seguidos sem perder a contagem"],
                    metronomeBpm: 110,
                  },
                },
                { kind: "conclusion", points: ["A música é contada em blocos de 8.", "\"5, 6, 7, 8\" prepara a entrada no tempo 1."] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "da-qualidades",
      title: "Qualidades do movimento",
      summary: "Direção, trajetória e energia.",
      level: "Intermediário",
      modules: [
        {
          id: "da-expressao",
          title: "Expressão",
          lessons: [
            {
              id: "da-direcoes",
              title: "Direções e trajetórias",
              summary: "Desenhar com o corpo no chão.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "O corpo desenha no espaço",
                  body: "Quando você se desloca, deixa um desenho invisível no chão: retas, curvas, espirais. Essas trajetórias e direções fazem parte da coreografia.",
                },
                {
                  kind: "visual",
                  title: "Direções básicas",
                  visual: { type: "diagram", id: "directions" },
                  caption: "Frente, trás, lados e diagonais — mais as trajetórias retas, curvas e em espiral.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "da-direcoes-q1",
                    prompt: "Uma trajetória em espiral tende a transmitir…",
                    options: [{ label: "Rigidez e ordem" }, { label: "Fluidez e envolvimento" }, { label: "Imobilidade" }],
                    answer: 1,
                    explanation: "Curvas e espirais são contínuas e envolventes; retas soam diretas e decididas.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "practice",
                    id: "da-direcoes-practice",
                    prompt: "Desenhe com os pés no chão da sala.",
                    checklist: ["Caminhei em linha reta para frente e voltei de costas", "Fiz um caminho em curva em forma de S", "Terminei com uma pequena espiral para dentro"],
                  },
                },
                { kind: "conclusion", points: ["Deslocamentos criam desenhos no espaço.", "Retas soam diretas; curvas soam fluidas."] },
              ],
            },
            {
              id: "da-laban",
              title: "Fluxo, peso e tempo",
              summary: "As qualidades de esforço de Laban.",
              minutes: 7,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "Como, e não só o quê",
                  body: "Dois dançarinos podem fazer o mesmo gesto e comunicar coisas opostas. A diferença está na qualidade: o movimento é leve ou firme? Súbito ou sustentado? Livre ou controlado?",
                },
                {
                  kind: "visual",
                  title: "Os fatores de esforço",
                  visual: { type: "diagram", id: "laban" },
                  caption: "Cada fator é um eixo entre dois extremos.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "da-laban-match",
                    prompt: "Associe cada imagem à qualidade de movimento.",
                    pairs: [
                      { left: "Uma pena flutuando", right: "Peso leve" },
                      { left: "Empurrar uma parede", right: "Peso firme" },
                      { left: "Espantar um mosquito", right: "Tempo súbito" },
                      { left: "Espreguiçar ao acordar", right: "Tempo sustentado" },
                    ],
                    explanation: "Imagens do cotidiano ajudam o corpo a encontrar a qualidade certa.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "practice",
                    id: "da-laban-practice",
                    prompt: "Escolha um gesto simples (como levantar o braço) e faça-o de quatro maneiras.",
                    checklist: ["Leve, como uma pena", "Firme, como empurrando algo pesado", "Súbito, como um susto", "Sustentado, em câmera lenta"],
                  },
                },
                { kind: "conclusion", points: ["Qualidade de movimento muda o sentido do gesto.", "Peso, tempo e fluxo são eixos de expressão."] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
