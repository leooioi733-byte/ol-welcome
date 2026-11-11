/**
 * Content model for MOSA. Everything the student learns is plain data described here,
 * so new areas, tracks, lessons and activities are added by writing data files —
 * no UI changes required unless a brand-new activity or diagram type is introduced.
 */

/** Pigment tokens defined in src/styles.css. */
export type Pigment = "vermilion" | "cobalt" | "saffron" | "orchid" | "moss";

/** Geometric tile shapes used across the MOSA identity. */
export type TileShape = "circle" | "square" | "quarter" | "triangle" | "half" | "arch" | "diamond";

export type DiagramId =
  | "line-types"
  | "shape-form"
  | "color-wheel"
  | "value-scale"
  | "temperature"
  | "rule-of-thirds"
  | "balance"
  | "focal-point"
  | "leading-lines"
  | "negative-space"
  | "pulse"
  | "note-values"
  | "measures"
  | "pitch"
  | "dynamics"
  | "kinesphere"
  | "body-levels"
  | "eight-count"
  | "directions"
  | "laban";

export type Visual =
  | { type: "diagram"; id: DiagramId }
  | { type: "swatch"; colors: string[] }
  | { type: "tile"; shape: TileShape; pigment?: Pigment };

export type RhythmFigure = "seminima" | "colcheias" | "pausa" | "minima";

export interface ChoiceOption {
  label: string;
  /** Optional color sample shown with the option (artwork color, not UI theme). */
  swatch?: string;
  /** Optional frequency in Hz the student can listen to. */
  tone?: number;
}

export type Activity =
  | {
      type: "choice";
      id: string;
      prompt: string;
      options: ChoiceOption[];
      answer: number;
      explanation: string;
    }
  | {
      type: "order";
      id: string;
      prompt: string;
      /** Items listed in the CORRECT order; the UI shuffles them. */
      items: { label: string; swatch?: string; tone?: number }[];
      explanation: string;
    }
  | {
      type: "match";
      id: string;
      prompt: string;
      pairs: { left: string; right: string }[];
      explanation: string;
    }
  | {
      type: "mix";
      id: string;
      prompt: string;
      palette: { label: string; color: string }[];
      /** Indexes in palette that produce the result (order does not matter). */
      answer: [number, number];
      result: { label: string; color: string };
      explanation: string;
    }
  | {
      type: "hotspot";
      id: string;
      prompt: string;
      scene: "landscape" | "portrait";
      /** Candidate points in % of the frame. */
      points: { x: number; y: number }[];
      /** Any of these point indexes is accepted. */
      answers: number[];
      explanation: string;
    }
  | {
      type: "rhythm";
      id: string;
      prompt: string;
      /** Figures in 4/4 written as notation; the target pattern is derived from them. */
      figures: RhythmFigure[];
      bpm: number;
      explanation: string;
    }
  | {
      type: "sketch";
      id: string;
      prompt: string;
      minStrokes: number;
      tips?: string[];
    }
  | {
      type: "practice";
      id: string;
      prompt: string;
      checklist: string[];
      /** When set, a metronome at this tempo is offered to practise with. */
      metronomeBpm?: number;
    };

export type ActivityType = Activity["type"];

export type Step =
  | { kind: "intro"; kicker?: string; title: string; body: string; visual?: Visual }
  | { kind: "text"; title?: string; body: string[] }
  | { kind: "cards"; title?: string; cards: { title: string; body: string; visual?: Visual }[] }
  | { kind: "visual"; title?: string; visual: Visual; caption?: string }
  | { kind: "example"; title: string; body: string; visual?: Visual }
  | { kind: "tip"; body: string }
  | { kind: "activity"; activity: Activity }
  | { kind: "conclusion"; title?: string; points: string[] };

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  steps: Step[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Track {
  id: string;
  title: string;
  summary: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  modules: Module[];
}

export interface Area {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pigment: Pigment;
  motif: TileShape;
  tracks: Track[];
}
