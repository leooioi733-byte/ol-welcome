import type { Area } from "../types";

export const artesVisuais: Area = {
  id: "artes-visuais",
  name: "Artes Visuais",
  tagline: "Ver, traçar, colorir.",
  description:
    "Os elementos que formam qualquer imagem: ponto, linha, forma, luz e cor. Aprenda a olhar como quem desenha.",
  pigment: "vermilion",
  motif: "circle",
  tracks: [
    {
      id: "av-fundamentos",
      title: "Fundamentos do desenho e da cor",
      summary: "Do primeiro traço ao círculo cromático.",
      level: "Iniciante",
      modules: [
        {
          id: "av-elementos",
          title: "Os elementos visuais",
          lessons: [
            {
              id: "av-ponto-linha",
              title: "Ponto, linha e forma",
              summary: "A gramática mínima de toda imagem.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "Tudo começa com um ponto",
                  body: "Quando a ponta do lápis encosta no papel, nasce um ponto. Quando ela se move, o ponto vira linha. Quando a linha se fecha, temos uma forma. Esses três elementos estão em todas as imagens que você já viu.",
                  visual: { type: "tile", shape: "circle", pigment: "vermilion" },
                },
                {
                  kind: "cards",
                  title: "Os três elementos",
                  cards: [
                    { title: "Ponto", body: "A menor marca visual. Sozinho, chama atenção; em grupo, cria textura e ritmo.", visual: { type: "tile", shape: "circle" } },
                    { title: "Linha", body: "Um ponto em movimento. Tem direção, espessura e energia.", visual: { type: "tile", shape: "half" } },
                    { title: "Forma", body: "Uma área delimitada por linhas ou por mudanças de cor.", visual: { type: "tile", shape: "square" } },
                  ],
                },
                {
                  kind: "visual",
                  title: "Cada linha tem um temperamento",
                  visual: { type: "diagram", id: "line-types" },
                  caption: "Horizontais acalmam, verticais elevam, diagonais agitam, curvas suavizam e quebradas tensionam.",
                },
                {
                  kind: "example",
                  title: "Na prática",
                  body: "Paisagens tranquilas costumam ser dominadas por linhas horizontais (o horizonte, um lago). Cenas de ação usam diagonais: corpos inclinados, chuva oblíqua, estradas em perspectiva.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "av-ponto-linha-q1",
                    prompt: "Você quer desenhar um mar calmo ao entardecer. Que tipo de linha deve dominar a composição?",
                    options: [{ label: "Diagonais" }, { label: "Horizontais" }, { label: "Quebradas em zigue-zague" }, { label: "Verticais" }],
                    answer: 1,
                    explanation: "Linhas horizontais lembram repouso — como um corpo deitado ou o horizonte — e transmitem calma.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "sketch",
                    id: "av-ponto-linha-sketch",
                    prompt: "Desenhe ao menos cinco linhas com temperamentos diferentes: uma calma, uma agitada, uma suave, uma tensa e uma que suba.",
                    minStrokes: 5,
                    tips: ["Varie a pressão e a velocidade do gesto.", "Não busque perfeição: observe a sensação de cada linha."],
                  },
                },
                {
                  kind: "conclusion",
                  points: [
                    "Ponto, linha e forma são a base de toda imagem.",
                    "A direção de uma linha comunica emoção.",
                    "Você já pode escolher linhas de propósito, não por acaso.",
                  ],
                },
              ],
            },
            {
              id: "av-forma-volume",
              title: "Forma e volume",
              summary: "Como a luz transforma o plano em espaço.",
              minutes: 7,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "Do plano ao volume",
                  body: "Um círculo é plano. Uma esfera ocupa espaço. A diferença entre os dois não está no contorno, mas na luz: é o sombreamento que faz nosso olho acreditar em volume.",
                },
                {
                  kind: "visual",
                  title: "Forma × volume",
                  visual: { type: "diagram", id: "shape-form" },
                  caption: "À esquerda, formas planas. À direita, as mesmas formas recebendo luz e sombra.",
                },
                {
                  kind: "cards",
                  title: "O caminho da luz em um objeto",
                  cards: [
                    { title: "Luz", body: "A área voltada para a fonte de luz. É a mais clara." },
                    { title: "Meio-tom", body: "A transição suave entre a luz e a sombra." },
                    { title: "Sombra própria", body: "O lado do objeto que não recebe luz." },
                    { title: "Sombra projetada", body: "A sombra que o objeto lança sobre a superfície ao lado." },
                  ],
                },
                { kind: "tip", body: "Aperte os olhos ao observar um objeto. Os detalhes somem e você enxerga melhor as grandes massas de luz e sombra." },
                {
                  kind: "activity",
                  activity: {
                    type: "order",
                    id: "av-forma-volume-order",
                    prompt: "Ordene as zonas de uma esfera iluminada, da mais clara para a mais escura.",
                    items: [{ label: "Luz" }, { label: "Meio-tom" }, { label: "Sombra própria" }, { label: "Sombra projetada" }],
                    explanation: "A luz vai perdendo força pelo meio-tom até a sombra própria; a sombra projetada, onde a luz é bloqueada, costuma ser a mais escura.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "av-forma-volume-q1",
                    prompt: "O que faz um círculo desenhado parecer uma esfera?",
                    options: [{ label: "Um contorno mais grosso" }, { label: "A gradação de luz e sombra" }, { label: "Usar uma cor mais viva" }],
                    answer: 1,
                    explanation: "O contorno define a forma; o volume surge da gradação tonal que imita a luz real.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "sketch",
                    id: "av-forma-volume-sketch",
                    prompt: "Desenhe um círculo e transforme-o em esfera: escolha de onde vem a luz e construa a sombra com várias camadas de traços.",
                    minStrokes: 8,
                    tips: ["Marque com uma seta de onde vem a luz.", "Não esqueça a sombra projetada no chão."],
                  },
                },
                {
                  kind: "conclusion",
                  points: ["Volume é uma ilusão criada pela luz.", "Luz, meio-tom, sombra própria e projetada formam o mapa do sombreamento."],
                },
              ],
            },
          ],
        },
        {
          id: "av-cor",
          title: "Cor",
          lessons: [
            {
              id: "av-circulo-cromatico",
              title: "O círculo cromático",
              summary: "Primárias, secundárias e complementares.",
              minutes: 7,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 3",
                  title: "Um mapa para as cores",
                  body: "O círculo cromático organiza as cores como um relógio. Com ele você descobre quais cores nascem de quais, e quais conversam ou brigam entre si.",
                },
                {
                  kind: "visual",
                  title: "O círculo cromático",
                  visual: { type: "diagram", id: "color-wheel" },
                  caption: "As primárias (vermelho, amarelo e azul) geram as secundárias quando misturadas duas a duas.",
                },
                {
                  kind: "cards",
                  title: "Famílias de cores",
                  cards: [
                    { title: "Primárias", body: "Não podem ser obtidas por mistura.", visual: { type: "swatch", colors: ["#E2412E", "#F2C230", "#2C5FB8"] } },
                    { title: "Secundárias", body: "Mistura de duas primárias.", visual: { type: "swatch", colors: ["#F08A24", "#4A9D4F", "#7B4BA8"] } },
                    { title: "Complementares", body: "Ficam opostas no círculo e se intensificam lado a lado.", visual: { type: "swatch", colors: ["#2C5FB8", "#F08A24"] } },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "mix",
                    id: "av-circulo-mix",
                    prompt: "Misture duas primárias para obter laranja.",
                    palette: [
                      { label: "Vermelho", color: "#E2412E" },
                      { label: "Amarelo", color: "#F2C230" },
                      { label: "Azul", color: "#2C5FB8" },
                    ],
                    answer: [0, 1],
                    result: { label: "Laranja", color: "#F08A24" },
                    explanation: "Vermelho + amarelo = laranja. Do mesmo modo, amarelo + azul = verde e azul + vermelho = violeta.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "av-circulo-q1",
                    prompt: "Qual é a cor complementar do azul?",
                    options: [
                      { label: "Verde", swatch: "#4A9D4F" },
                      { label: "Laranja", swatch: "#F08A24" },
                      { label: "Violeta", swatch: "#7B4BA8" },
                      { label: "Vermelho", swatch: "#E2412E" },
                    ],
                    answer: 1,
                    explanation: "O laranja está do lado oposto ao azul no círculo — e é formado pelas duas primárias que não são azul.",
                  },
                },
                {
                  kind: "example",
                  title: "Onde isso aparece",
                  body: "Cartazes de cinema usam azul e laranja com frequência: o contraste complementar faz a imagem vibrar e destaca os personagens do fundo.",
                },
                {
                  kind: "conclusion",
                  points: ["Três primárias geram todas as outras cores do círculo.", "Complementares ficam opostas e criam contraste máximo."],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "av-luz-valor",
      title: "Luz, valor e temperatura",
      summary: "Claro, escuro, quente e frio.",
      level: "Iniciante",
      modules: [
        {
          id: "av-valor",
          title: "Valor e temperatura",
          lessons: [
            {
              id: "av-escala-valores",
              title: "A escala de valores",
              summary: "Enxergar a imagem em tons de cinza.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "Valor é o quão claro ou escuro",
                  body: "Antes de pensar em cor, artistas pensam em valor: a posição de um tom entre o branco e o preto. Uma imagem com bons valores funciona até em preto e branco.",
                },
                {
                  kind: "visual",
                  title: "Uma escala de 7 valores",
                  visual: { type: "diagram", id: "value-scale" },
                  caption: "Do branco do papel ao preto mais profundo, passando por cinzas intermediários.",
                },
                { kind: "tip", body: "Tire uma foto em preto e branco do seu desenho. Se tudo parecer cinza-médio, aumente o contraste entre claros e escuros." },
                {
                  kind: "activity",
                  activity: {
                    type: "order",
                    id: "av-valores-order",
                    prompt: "Organize os tons do mais claro para o mais escuro.",
                    items: [
                      { label: "Valor 1", swatch: "#F3EFE6" },
                      { label: "Valor 2", swatch: "#C9C3B8" },
                      { label: "Valor 3", swatch: "#97918A" },
                      { label: "Valor 4", swatch: "#5F5A55" },
                      { label: "Valor 5", swatch: "#2A2724" },
                    ],
                    explanation: "Treinar a percepção de valor ajuda a criar profundidade e foco em qualquer técnica.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "av-valores-q1",
                    prompt: "Para destacar um rosto claro, qual fundo cria mais contraste de valor?",
                    options: [
                      { label: "Um fundo escuro", swatch: "#2A2724" },
                      { label: "Um fundo cinza-claro", swatch: "#C9C3B8" },
                      { label: "Um fundo branco", swatch: "#F3EFE6" },
                    ],
                    answer: 0,
                    explanation: "Contraste de valor é diferença entre claro e escuro. Claro sobre escuro salta aos olhos.",
                  },
                },
                {
                  kind: "conclusion",
                  points: ["Valor é a luminosidade de um tom.", "Contraste de valor guia o olhar e cria profundidade."],
                },
              ],
            },
            {
              id: "av-quentes-frias",
              title: "Cores quentes e frias",
              summary: "A temperatura que muda a emoção da imagem.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "Cor também tem temperatura",
                  body: "Algumas cores nos lembram fogo e sol; outras, água e sombra. Essa sensação de temperatura muda o clima de uma imagem e até a sensação de distância.",
                },
                {
                  kind: "visual",
                  title: "Quentes × frias",
                  visual: { type: "diagram", id: "temperature" },
                  caption: "Cores quentes parecem avançar; cores frias parecem recuar.",
                },
                {
                  kind: "cards",
                  cards: [
                    { title: "Quentes", body: "Energia, proximidade, calor, urgência.", visual: { type: "swatch", colors: ["#E2412E", "#F08A24", "#F2C230"] } },
                    { title: "Frias", body: "Calma, distância, silêncio, introspecção.", visual: { type: "swatch", colors: ["#2C5FB8", "#4A9D4F", "#7B4BA8"] } },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "av-temp-match",
                    prompt: "Associe cada cena à paleta mais adequada.",
                    pairs: [
                      { left: "Fogueira à noite", right: "Laranjas e vermelhos" },
                      { left: "Lago congelado", right: "Azuis e cinzas" },
                      { left: "Floresta úmida", right: "Verdes e azuis-esverdeados" },
                    ],
                    explanation: "A temperatura da paleta reforça a sensação física da cena.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "av-temp-q1",
                    prompt: "Numa paisagem, as montanhas mais distantes tendem a parecer…",
                    options: [{ label: "Mais quentes e saturadas" }, { label: "Mais frias e azuladas" }, { label: "Sempre pretas" }],
                    answer: 1,
                    explanation: "É a perspectiva atmosférica: o ar entre nós e o objeto deixa o distante mais frio, claro e menos contrastado.",
                  },
                },
                {
                  kind: "conclusion",
                  points: ["Quentes avançam e energizam; frias recuam e acalmam.", "Escolher a temperatura é escolher a emoção."],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
