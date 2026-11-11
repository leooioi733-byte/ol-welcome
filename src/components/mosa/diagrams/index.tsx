import type { ReactNode } from "react";

import { ART_COLORS } from "@/content/palette";
import type { DiagramId } from "@/content/types";

import { NoteGlyph } from "./NoteGlyph";

const T = { fontFamily: "var(--font-sans)", fontWeight: 600 } as const;

function Frame({ children, viewBox = "0 0 320 180", label }: { children: ReactNode; viewBox?: string; label: string }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="h-auto w-full">
      {children}
    </svg>
  );
}

function Label({ x, y, children, anchor = "middle", size = 11, className = "fill-muted-foreground" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number; className?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} style={T} className={className}>
      {children}
    </text>
  );
}

/** Stick figure; pose drives limbs. Origin is the hip point. */
function Figure({ x, y, pose, className = "stroke-orchid" }: { x: number; y: number; pose: "stand" | "reach" | "crouch" | "lie" | "jump"; className?: string }) {
  const sw = 5;
  const common = { className, strokeWidth: sw, strokeLinecap: "round" as const, fill: "none" };
  if (pose === "lie") {
    return (
      <g {...common}>
        <circle cx={x - 34} cy={y - 4} r={7} className="fill-orchid stroke-none" />
        <path d={`M${x - 26} ${y - 2} H${x + 10} L${x + 34} ${y + 2} M${x + 10} ${y} L${x + 32} ${y - 8} M${x - 14} ${y - 2} L${x - 4} ${y - 14}`} />
      </g>
    );
  }
  const legs: Record<string, string> = {
    stand: `M${x} ${y} L${x - 10} ${y + 32} M${x} ${y} L${x + 10} ${y + 32}`,
    reach: `M${x} ${y} L${x - 12} ${y + 32} M${x} ${y} L${x + 12} ${y + 32}`,
    crouch: `M${x} ${y} L${x - 16} ${y + 10} L${x - 12} ${y + 22} M${x} ${y} L${x + 16} ${y + 10} L${x + 14} ${y + 22}`,
    jump: `M${x} ${y} L${x - 14} ${y + 18} L${x - 22} ${y + 26} M${x} ${y} L${x + 12} ${y + 20} L${x + 20} ${y + 24}`,
  };
  const torsoTop = pose === "crouch" ? y - 22 : y - 30;
  const arms: Record<string, string> = {
    stand: `M${x} ${torsoTop + 6} L${x - 14} ${torsoTop + 26} M${x} ${torsoTop + 6} L${x + 14} ${torsoTop + 26}`,
    reach: `M${x} ${torsoTop + 6} L${x - 24} ${torsoTop - 14} M${x} ${torsoTop + 6} L${x + 24} ${torsoTop - 14}`,
    crouch: `M${x} ${torsoTop + 6} L${x - 18} ${torsoTop + 12} M${x} ${torsoTop + 6} L${x + 18} ${torsoTop + 2}`,
    jump: `M${x} ${torsoTop + 6} L${x - 12} ${torsoTop - 18} M${x} ${torsoTop + 6} L${x + 12} ${torsoTop - 18}`,
  };
  return (
    <g {...common}>
      <circle cx={x} cy={torsoTop - 10} r={8} className="fill-orchid stroke-none" />
      <path d={`M${x} ${torsoTop} L${x} ${y} ${legs[pose]} ${arms[pose]}`} />
    </g>
  );
}

function wedge(cx: number, cy: number, r: number, start: number, end: number) {
  const rad = (d: number) => ((d - 90) * Math.PI) / 180;
  const p = (d: number) => `${cx + r * Math.cos(rad(d))} ${cy + r * Math.sin(rad(d))}`;
  return `M${cx} ${cy} L${p(start)} A${r} ${r} 0 0 1 ${p(end)} Z`;
}

const DIAGRAMS: Record<DiagramId, () => ReactNode> = {
  "line-types": () => (
    <Frame label="Cinco tipos de linha: horizontal, vertical, diagonal, curva e quebrada">
      {[
        { d: "M12 90 H52", label: "Horizontal" },
        { d: "M96 60 V120", label: "Vertical" },
        { d: "M140 120 L180 60", label: "Diagonal" },
        { d: "M204 110 C 214 50, 234 130, 244 70", label: "Curva" },
        { d: "M266 110 L276 70 L286 110 L296 70 L306 110", label: "Quebrada" },
      ].map((l, i) => (
        <g key={l.label}>
          <path d={l.d} className={i % 2 ? "stroke-foreground" : "stroke-vermilion"} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Label x={[32, 96, 160, 224, 286][i]!} y={152}>{l.label}</Label>
        </g>
      ))}
    </Frame>
  ),
  "shape-form": () => (
    <Frame label="Formas planas à esquerda e volumes sombreados à direita">
      <defs>
        <radialGradient id="sphere" cx="35%" cy="30%" r="75%">
          <stop offset="0%" style={{ stopColor: "var(--vermilion-soft)" }} />
          <stop offset="55%" style={{ stopColor: "var(--vermilion)" }} />
          <stop offset="100%" style={{ stopColor: "var(--foreground)" }} />
        </radialGradient>
      </defs>
      <circle cx={50} cy={80} r={30} className="fill-vermilion" />
      <rect x={95} y={55} width={46} height={46} className="fill-vermilion" />
      <Label x={95} y={160}>Forma (plano)</Label>
      <line x1={160} y1={30} x2={160} y2={140} className="stroke-border" strokeDasharray="4 4" />
      <ellipse cx={222} cy={118} rx={30} ry={7} className="fill-foreground" opacity={0.18} />
      <circle cx={210} cy={80} r={30} fill="url(#sphere)" />
      <path d="M262 64 L282 52 L302 64 L302 102 L282 114 L262 102 Z" className="fill-vermilion" />
      <path d="M262 64 L282 52 L302 64 L282 76 Z" className="fill-vermilion-soft" />
      <path d="M282 76 L302 64 L302 102 L282 114 Z" className="fill-foreground" opacity={0.45} />
      <Label x={250} y={160}>Volume (luz e sombra)</Label>
    </Frame>
  ),
  "color-wheel": () => {
    const segs = [
      { c: ART_COLORS.red, l: "Vermelho", p: true },
      { c: ART_COLORS.orange, l: "Laranja" },
      { c: ART_COLORS.yellow, l: "Amarelo", p: true },
      { c: ART_COLORS.green, l: "Verde" },
      { c: ART_COLORS.blue, l: "Azul", p: true },
      { c: ART_COLORS.violet, l: "Violeta" },
    ];
    return (
      <Frame viewBox="0 0 320 220" label="Círculo cromático com três primárias e três secundárias">
        {segs.map((s, i) => (
          <path key={s.l} d={wedge(160, 110, s.p ? 84 : 72, i * 60 - 30, i * 60 + 30)} fill={s.c} className="stroke-card" strokeWidth={3} />
        ))}
        <circle cx={160} cy={110} r={28} className="fill-card" />
        {segs.map((s, i) => {
          const a = ((i * 60 - 90) * Math.PI) / 180;
          return (
            <Label key={s.l} x={160 + 112 * Math.cos(a)} y={114 + 100 * Math.sin(a)} className={s.p ? "fill-foreground" : "fill-muted-foreground"}>
              {s.l}
            </Label>
          );
        })}
      </Frame>
    );
  },
  "value-scale": () => (
    <Frame viewBox="0 0 320 120" label="Escala de sete valores do claro ao escuro">
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <rect x={12 + i * 43} y={20} width={40} height={56} rx={6} style={{ fill: `color-mix(in oklab, var(--foreground) ${Math.round((i / 6) * 100)}%, var(--card))` }} className="stroke-border" />
          <Label x={32 + i * 43} y={98}>{i + 1}</Label>
        </g>
      ))}
    </Frame>
  ),
  temperature: () => (
    <Frame viewBox="0 0 320 140" label="Cores quentes avançam, cores frias recuam">
      {[ART_COLORS.red, ART_COLORS.orange, ART_COLORS.yellow].map((c, i) => (
        <circle key={c} cx={50 + i * 28} cy={62} r={30 - i * 4} fill={c} />
      ))}
      {[ART_COLORS.blue, ART_COLORS.green, ART_COLORS.violet].map((c, i) => (
        <circle key={c} cx={210 + i * 28} cy={62} r={18 + i * 0} fill={c} opacity={1 - i * 0.18} />
      ))}
      <Label x={78} y={120} className="fill-foreground">Quentes · avançam</Label>
      <Label x={238} y={120} className="fill-foreground">Frias · recuam</Label>
    </Frame>
  ),
  "rule-of-thirds": () => (
    <Frame viewBox="0 0 300 190" label="Quadro dividido em terços com quatro pontos de força">
      <rect x={10} y={10} width={280} height={170} rx={8} className="fill-cobalt-soft" />
      <path d={`M10 ${10 + 170 * 0.67} H290 V180 H10 Z`} className="fill-cobalt" opacity={0.85} />
      <circle cx={10 + 280 * 0.67} cy={10 + 170 * 0.33} r={14} className="fill-saffron" />
      {[1, 2].map((n) => (
        <g key={n} className="stroke-foreground" strokeDasharray="5 5" strokeWidth={1.5}>
          <line x1={10 + (280 * n) / 3} y1={10} x2={10 + (280 * n) / 3} y2={180} />
          <line x1={10} y1={10 + (170 * n) / 3} x2={290} y2={10 + (170 * n) / 3} />
        </g>
      ))}
      {[1, 2].flatMap((a) => [1, 2].map((b) => <circle key={`${a}${b}`} cx={10 + (280 * a) / 3} cy={10 + (170 * b) / 3} r={5} className="fill-vermilion stroke-card" strokeWidth={2} />))}
    </Frame>
  ),
  balance: () => (
    <Frame viewBox="0 0 320 140" label="Equilíbrio simétrico, assimétrico e radial">
      {["Simétrico", "Assimétrico", "Radial"].map((l, i) => (
        <g key={l}>
          <rect x={10 + i * 104} y={10} width={92} height={92} rx={8} className="fill-card stroke-border" />
          <Label x={56 + i * 104} y={124}>{l}</Label>
        </g>
      ))}
      <line x1={56} y1={18} x2={56} y2={94} className="stroke-border" strokeDasharray="3 3" />
      <rect x={24} y={40} width={22} height={30} rx={3} className="fill-cobalt" />
      <rect x={66} y={40} width={22} height={30} rx={3} className="fill-cobalt" />
      <rect x={122} y={26} width={50} height={60} rx={4} className="fill-cobalt-soft" />
      <circle cx={186} cy={72} r={9} className="fill-cobalt" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return <circle key={i} cx={264 + 28 * Math.cos(a)} cy={56 + 28 * Math.sin(a)} r={7} className="fill-cobalt" />;
      })}
      <circle cx={264} cy={56} r={9} className="fill-saffron" />
    </Frame>
  ),
  "focal-point": () => (
    <Frame viewBox="0 0 320 150" label="Muitos círculos cinzas e um vermelho que se destaca">
      {Array.from({ length: 21 }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const focal = i === 11;
        return <circle key={i} cx={40 + col * 40} cy={35 + row * 40} r={focal ? 15 : 11} className={focal ? "fill-vermilion" : "fill-muted-foreground"} opacity={focal ? 1 : 0.35} />;
      })}
    </Frame>
  ),
  "leading-lines": () => (
    <Frame viewBox="0 0 320 180" label="Estrada que converge para o ponto de fuga no horizonte">
      <rect x={0} y={0} width={320} height={80} rx={8} className="fill-cobalt-soft" />
      <rect x={0} y={80} width={320} height={100} className="fill-muted" />
      <path d="M90 180 L160 80 L230 180 Z" className="fill-foreground" opacity={0.85} />
      <path d="M160 180 L160 84" className="stroke-saffron" strokeWidth={3} strokeDasharray="12 10" />
      <path d="M20 180 L160 80 M300 180 L160 80" className="stroke-cobalt" strokeWidth={1.5} strokeDasharray="4 4" />
      <circle cx={160} cy={80} r={7} className="fill-vermilion stroke-card" strokeWidth={2} />
      <Label x={172} y={70} anchor="start" className="fill-foreground">ponto de fuga</Label>
    </Frame>
  ),
  "negative-space": () => (
    <Frame viewBox="0 0 320 200" label="Vaso de Rubin: um vaso ou dois perfis frente a frente">
      <rect x={80} y={10} width={160} height={180} rx={10} className="fill-cobalt" />
      <path
        d="M120 10 H200 C200 30 186 40 182 56 C178 70 196 78 192 92 C188 104 176 106 176 118 C176 132 194 142 194 158 C194 176 184 184 184 190 H136 C136 184 126 176 126 158 C126 142 144 132 144 118 C144 106 132 104 128 92 C124 78 142 70 138 56 C134 40 120 30 120 10 Z"
        className="fill-card"
      />
    </Frame>
  ),
  pulse: () => (
    <Frame viewBox="0 0 320 110" label="Pulso: batidas igualmente espaçadas">
      <line x1={10} y1={55} x2={310} y2={55} className="stroke-border" strokeWidth={2} />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <circle cx={30 + i * 37} cy={55} r={i % 4 === 0 ? 13 : 9} className={i % 4 === 0 ? "fill-saffron" : "fill-foreground"} />
          <Label x={30 + i * 37} y={92}>{(i % 4) + 1}</Label>
        </g>
      ))}
    </Frame>
  ),
  "note-values": () => (
    <Frame viewBox="0 0 320 250" label="Semibreve vale duas mínimas, que valem quatro semínimas, que valem oito colcheias">
      {[
        { kind: "semibreve" as const, n: 1, l: "Semibreve · 4" },
        { kind: "minima" as const, n: 2, l: "Mínima · 2" },
        { kind: "seminima" as const, n: 4, l: "Semínima · 1" },
        { kind: "colcheia" as const, n: 8, l: "Colcheia · ½" },
      ].map((row, r) => (
        <g key={row.kind}>
          <Label x={8} y={30 + r * 60} anchor="start" className="fill-foreground">{row.l}</Label>
          {Array.from({ length: row.n }, (_, i) => (
            <NoteGlyph key={i} kind={row.kind} x={110 + (200 / row.n) * (i + 0.5) - 10} y={40 + r * 60} />
          ))}
        </g>
      ))}
    </Frame>
  ),
  measures: () => (
    <Frame viewBox="0 0 320 170" label="Compassos binário, ternário e quaternário com tempo forte destacado">
      {[
        { l: "2/4", beats: [3, 1] },
        { l: "3/4", beats: [3, 1, 1] },
        { l: "4/4", beats: [3, 1, 2, 1] },
      ].map((row, r) => (
        <g key={row.l}>
          <Label x={14} y={38 + r * 50} anchor="start" size={16} className="fill-foreground">{row.l}</Label>
          {row.beats.map((b, i) => (
            <rect key={i} x={70 + i * 60} y={38 + r * 50 - b * 9} width={40} height={b * 9} rx={4} className={b === 3 ? "fill-saffron" : "fill-foreground"} opacity={b === 3 ? 1 : 0.25 + b * 0.2} />
          ))}
          <line x1={64} y1={42 + r * 50} x2={310} y2={42 + r * 50} className="stroke-border" />
        </g>
      ))}
    </Frame>
  ),
  pitch: () => (
    <Frame viewBox="0 0 320 180" label="Escada de notas do grave ao agudo">
      {["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"].map((n, i) => (
        <g key={n}>
          <rect x={14 + i * 42} y={150 - (i + 1) * 18} width={38} height={(i + 1) * 18} rx={4} className={i % 2 ? "fill-saffron-soft" : "fill-saffron"} />
          <Label x={33 + i * 42} y={168} className="fill-foreground">{n}</Label>
        </g>
      ))}
      <Label x={14} y={16} anchor="start">agudo ↑</Label>
    </Frame>
  ),
  dynamics: () => (
    <Frame viewBox="0 0 320 120" label="Dinâmica do pianíssimo ao fortíssimo">
      <path d="M14 60 L306 30 L306 90 Z" className="fill-saffron" opacity={0.85} />
      {["pp", "p", "mp", "mf", "f", "ff"].map((d, i) => (
        <text key={d} x={22 + i * 54} y={112} fontSize={16} className="fill-foreground" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 700 }}>
          {d}
        </text>
      ))}
    </Frame>
  ),
  kinesphere: () => (
    <Frame viewBox="0 0 320 200" label="Figura humana dentro de sua cinesfera">
      <circle cx={160} cy={100} r={86} className="fill-orchid-soft stroke-orchid" strokeDasharray="6 6" strokeWidth={2} />
      <ellipse cx={160} cy={100} rx={86} ry={24} className="fill-none stroke-orchid" strokeDasharray="3 6" opacity={0.6} />
      <Figure x={160} y={112} pose="reach" />
    </Frame>
  ),
  "body-levels": () => (
    <Frame viewBox="0 0 320 200" label="Níveis baixo, médio e alto">
      {["Alto", "Médio", "Baixo"].map((l, i) => (
        <g key={l}>
          <rect x={0} y={10 + i * 60} width={320} height={58} rx={6} className={i === 1 ? "fill-orchid-soft" : "fill-muted"} opacity={0.7} />
          <Label x={10} y={30 + i * 60} anchor="start" className="fill-foreground">{l}</Label>
        </g>
      ))}
      <Figure x={250} y={46} pose="jump" />
      <Figure x={160} y={124} pose="crouch" />
      <Figure x={90} y={172} pose="lie" />
    </Frame>
  ),
  "eight-count": () => (
    <Frame viewBox="0 0 320 110" label="Contagem de oito tempos, com 5, 6, 7, 8 como entrada">
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <circle cx={26 + i * 38 + (i >= 4 ? 8 : 0)} cy={50} r={15} className={i === 0 ? "fill-orchid" : i >= 4 ? "fill-orchid-soft" : "fill-muted"} />
          <Label x={26 + i * 38 + (i >= 4 ? 8 : 0)} y={55} size={14} className={i === 0 ? "fill-card" : "fill-foreground"}>{i + 1}</Label>
        </g>
      ))}
      <Label x={250} y={92}>contagem de entrada</Label>
    </Frame>
  ),
  directions: () => (
    <Frame viewBox="0 0 320 180" label="Oito direções e trajetórias reta, curva e espiral">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" className="fill-orchid" />
        </marker>
      </defs>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={80} y1={90} x2={80 + 58 * Math.cos(a)} y2={90 + 58 * Math.sin(a)} className="stroke-orchid" strokeWidth={3} markerEnd="url(#arr)" />;
      })}
      <circle cx={80} cy={90} r={9} className="fill-foreground" />
      <path d="M180 40 H300" className="stroke-foreground" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M180 92 C 210 62, 240 122, 300 92" className="stroke-foreground" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M240 150 m -4 0 a 4 4 0 1 1 8 0 a 9 9 0 1 1 -18 0 a 14 14 0 1 1 28 0 a 19 19 0 1 1 -38 0" className="stroke-foreground" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Label x={180} y={32} anchor="start">reta</Label>
      <Label x={180} y={80} anchor="start">curva</Label>
      <Label x={290} y={168} anchor="end">espiral</Label>
    </Frame>
  ),
  laban: () => (
    <Frame viewBox="0 0 320 170" label="Fatores de esforço: peso, tempo e fluxo, cada um entre dois extremos">
      {[
        { f: "Peso", a: "leve", b: "firme" },
        { f: "Tempo", a: "súbito", b: "sustentado" },
        { f: "Fluxo", a: "livre", b: "controlado" },
      ].map((r, i) => (
        <g key={r.f}>
          <Label x={10} y={36 + i * 50} anchor="start" size={13} className="fill-foreground">{r.f}</Label>
          <line x1={90} y1={32 + i * 50} x2={300} y2={32 + i * 50} className="stroke-orchid" strokeWidth={4} strokeLinecap="round" />
          <circle cx={90} cy={32 + i * 50} r={7} className="fill-orchid-soft stroke-orchid" strokeWidth={2} />
          <circle cx={300} cy={32 + i * 50} r={7} className="fill-orchid" />
          <Label x={90} y={54 + i * 50}>{r.a}</Label>
          <Label x={300} y={54 + i * 50}>{r.b}</Label>
        </g>
      ))}
    </Frame>
  ),
};

export function Diagram({ id }: { id: DiagramId }) {
  const render = DIAGRAMS[id];
  return <>{render()}</>;
}
