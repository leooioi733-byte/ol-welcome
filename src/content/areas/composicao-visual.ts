import type { Area } from "../types";

export const composicaoVisual: Area = {
  id: "composicao-visual",
  name: "Composição Visual",
  tagline: "Organizar o olhar.",
  description:
    "Como dispor elementos num quadro para criar equilíbrio, foco e movimento — na pintura, na fotografia e no design.",
  pigment: "cobalt",
  motif: "square",
  tracks: [
    {
      id: "cv-organizar",
      title: "Organizar o olhar",
      summary: "Terços, equilíbrio e ponto focal.",
      level: "Iniciante",
      modules: [
        {
          id: "cv-estrutura",
          title: "Estrutura do quadro",
          lessons: [
            {
              id: "cv-regra-tercos",
              title: "A regra dos terços",
              summary: "Uma grade simples para composições vivas.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "Saia do centro",
                  body: "Colocar o assunto bem no meio do quadro é seguro, mas costuma ser estático. A regra dos terços propõe outra organização, mais dinâmica.",
                },
                {
                  kind: "visual",
                  title: "A grade",
                  visual: { type: "diagram", id: "rule-of-thirds" },
                  caption: "Divida o quadro em 3 × 3. As quatro interseções são pontos de força para posicionar o assunto.",
                },
                {
                  kind: "cards",
                  cards: [
                    { title: "Pontos de força", body: "Onde as linhas se cruzam. Bons lugares para olhos, rostos ou o elemento principal." },
                    { title: "Linhas de força", body: "Bons lugares para o horizonte: no terço superior ou inferior, nunca cortando ao meio." },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "hotspot",
                    id: "cv-tercos-hotspot",
                    prompt: "Toque no melhor lugar para posicionar a árvore solitária desta paisagem.",
                    scene: "landscape",
                    points: [
                      { x: 50, y: 50 },
                      { x: 33.3, y: 33.3 },
                      { x: 66.6, y: 33.3 },
                      { x: 33.3, y: 66.6 },
                      { x: 66.6, y: 66.6 },
                      { x: 12, y: 12 },
                      { x: 88, y: 88 },
                      { x: 50, y: 12 },
                    ],
                    answers: [1, 2, 3, 4],
                    explanation: "Qualquer uma das quatro interseções da grade dá ao assunto destaque e deixa espaço para o olhar respirar.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "cv-tercos-q1",
                    prompt: "Numa foto de céu dramático, onde a regra dos terços sugere colocar o horizonte?",
                    options: [{ label: "Exatamente no meio" }, { label: "Na linha do terço inferior" }, { label: "Na borda superior" }],
                    answer: 1,
                    explanation: "Com o horizonte embaixo, o céu ocupa dois terços do quadro e vira protagonista.",
                  },
                },
                { kind: "conclusion", points: ["A grade 3 × 3 cria pontos e linhas de força.", "É um ponto de partida — regras podem ser quebradas com intenção."] },
              ],
            },
            {
              id: "cv-equilibrio",
              title: "Equilíbrio visual",
              summary: "Simetria, assimetria e peso visual.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "Elementos têm peso",
                  body: "Na composição, cada elemento pesa: os grandes, escuros, saturados ou detalhados pesam mais. Equilibrar é distribuir esse peso pelo quadro.",
                },
                {
                  kind: "visual",
                  title: "Três tipos de equilíbrio",
                  visual: { type: "diagram", id: "balance" },
                  caption: "Simétrico espelha; assimétrico compensa pesos diferentes; radial irradia a partir do centro.",
                },
                {
                  kind: "example",
                  title: "Assimetria na prática",
                  body: "Um barco pequeno e escuro pode equilibrar uma grande área de mar claro. Peso não é só tamanho: contraste e cor também contam.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "cv-equilibrio-match",
                    prompt: "Associe cada tipo de equilíbrio ao exemplo correspondente.",
                    pairs: [
                      { left: "Simétrico", right: "Fachada de templo grego" },
                      { left: "Assimétrico", right: "Barco pequeno num mar vasto" },
                      { left: "Radial", right: "Rosácea de catedral" },
                    ],
                    explanation: "Templos espelham lados; o barco compensa o vazio; a rosácea irradia do centro.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "cv-equilibrio-q1",
                    prompt: "Qual destes elementos tende a ter MAIS peso visual?",
                    options: [{ label: "Um pequeno círculo cinza-claro" }, { label: "Um pequeno círculo vermelho intenso" }, { label: "Uma área de céu branco" }],
                    answer: 1,
                    explanation: "Saturação e contraste aumentam o peso visual — mesmo quando o elemento é pequeno.",
                  },
                },
                { kind: "conclusion", points: ["Tamanho, valor, cor e detalhe definem peso visual.", "Equilíbrio assimétrico tende a ser mais dinâmico."] },
              ],
            },
          ],
        },
        {
          id: "cv-foco",
          title: "Foco",
          lessons: [
            {
              id: "cv-ponto-focal",
              title: "Ponto focal e contraste",
              summary: "Decidir para onde o olhar vai primeiro.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 3",
                  title: "Toda imagem precisa de um protagonista",
                  body: "O ponto focal é o lugar onde o olhar pousa primeiro. Sem ele, a imagem fica confusa; com dois competindo, fica tensa.",
                },
                {
                  kind: "visual",
                  title: "O diferente chama atenção",
                  visual: { type: "diagram", id: "focal-point" },
                  caption: "Entre muitos iguais, o elemento que contrasta vira o centro de interesse.",
                },
                {
                  kind: "cards",
                  title: "Ferramentas de contraste",
                  cards: [
                    { title: "Cor", body: "Um elemento saturado entre neutros." },
                    { title: "Valor", body: "Claro contra escuro." },
                    { title: "Tamanho", body: "O maior — ou o único pequeno." },
                    { title: "Isolamento", body: "Um elemento sozinho, longe do grupo." },
                  ],
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "cv-focal-q1",
                    prompt: "Numa multidão vestida de cinza, como destacar uma única pessoa?",
                    options: [{ label: "Vesti-la também de cinza" }, { label: "Vesti-la de amarelo vivo" }, { label: "Colocá-la no fundo, menor" }],
                    answer: 1,
                    explanation: "O contraste de cor isola a figura e a transforma no ponto focal.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "order",
                    id: "cv-focal-order",
                    prompt: "Ordene as etapas para planejar o ponto focal de uma ilustração.",
                    items: [
                      { label: "Decidir o que é mais importante" },
                      { label: "Posicioná-lo num ponto de força" },
                      { label: "Aplicar o contraste mais forte nele" },
                      { label: "Suavizar o restante da imagem" },
                    ],
                    explanation: "Primeiro a intenção, depois a posição, o contraste e, por fim, a hierarquia do resto.",
                  },
                },
                { kind: "conclusion", points: ["O ponto focal nasce do contraste.", "Reserve o contraste máximo para o que mais importa."] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cv-movimento",
      title: "Movimento e espaço",
      summary: "Linhas que conduzem e o poder do vazio.",
      level: "Intermediário",
      modules: [
        {
          id: "cv-percurso",
          title: "Percurso do olhar",
          lessons: [
            {
              id: "cv-linhas-condutoras",
              title: "Linhas que conduzem",
              summary: "Estradas, rios e gestos que guiam o olhar.",
              minutes: 5,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 1",
                  title: "O olhar segue caminhos",
                  body: "Nosso olho acompanha linhas, reais ou sugeridas. Uma estrada, um braço estendido ou um olhar de personagem podem levar o espectador direto ao ponto focal.",
                },
                {
                  kind: "visual",
                  title: "Linhas condutoras",
                  visual: { type: "diagram", id: "leading-lines" },
                  caption: "As linhas convergem para o ponto de fuga — e levam o olhar junto.",
                },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "cv-linhas-q1",
                    prompt: "Numa foto de trilho de trem, onde o olhar tende a terminar?",
                    options: [{ label: "Nas bordas laterais" }, { label: "No ponto onde os trilhos convergem" }, { label: "No canto inferior esquerdo" }],
                    answer: 1,
                    explanation: "As linhas paralelas parecem convergir no horizonte e arrastam o olhar até lá.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "match",
                    id: "cv-linhas-match",
                    prompt: "Associe cada linha condutora ao tipo.",
                    pairs: [
                      { left: "Uma estrada", right: "Linha real" },
                      { left: "O olhar de um personagem", right: "Linha implícita" },
                      { left: "Uma fileira de postes", right: "Linha sugerida por repetição" },
                    ],
                    explanation: "Linhas condutoras não precisam ser desenhadas: direção do olhar e repetição também criam caminhos.",
                  },
                },
                { kind: "conclusion", points: ["Linhas reais e implícitas conduzem o olhar.", "Use-as para levar o espectador ao ponto focal."] },
              ],
            },
            {
              id: "cv-espaco-negativo",
              title: "Espaço negativo",
              summary: "O vazio também é forma.",
              minutes: 6,
              steps: [
                {
                  kind: "intro",
                  kicker: "Lição 2",
                  title: "O que não está lá",
                  body: "Espaço positivo é o assunto; espaço negativo é o que está em volta. Um bom artista desenha os dois — o vazio dá respiro e pode até esconder formas.",
                },
                {
                  kind: "visual",
                  title: "Figura e fundo",
                  visual: { type: "diagram", id: "negative-space" },
                  caption: "Dois perfis ou um vaso? O espaço negativo também desenha.",
                },
                { kind: "tip", body: "Ao desenhar uma cadeira, tente desenhar só os buracos entre as pernas. As proporções ficam mais precisas." },
                {
                  kind: "activity",
                  activity: {
                    type: "choice",
                    id: "cv-negativo-q1",
                    prompt: "Por que muitos logotipos minimalistas deixam bastante espaço vazio?",
                    options: [{ label: "Para economizar tinta" }, { label: "Para dar respiro e destacar a forma principal" }, { label: "Porque o vazio não tem função" }],
                    answer: 1,
                    explanation: "O espaço negativo isola e valoriza a forma, deixando a leitura mais rápida.",
                  },
                },
                {
                  kind: "activity",
                  activity: {
                    type: "sketch",
                    id: "cv-negativo-sketch",
                    prompt: "Desenhe uma folha de árvore preenchendo apenas o FUNDO ao redor dela, deixando a folha vazia.",
                    minStrokes: 6,
                    tips: ["Comece pelas bordas do quadro.", "A folha aparece pelo contorno do fundo."],
                  },
                },
                { kind: "conclusion", points: ["Espaço negativo é parte ativa da composição.", "Desenhar o vazio treina o olhar para proporções."] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
