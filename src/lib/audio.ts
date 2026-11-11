/** Tiny Web Audio helpers for rhythm, pitch and metronome activities (browser only). */
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playTone(freq: number, duration = 0.6, when = 0, volume = 0.25, type: OscillatorType = "triangle") {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + when;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

export function playClick(when = 0, accent = false) {
  playTone(accent ? 1320 : 880, 0.08, when, accent ? 0.35 : 0.22, "square");
}

/** Plays an eighth-note pattern; returns its duration in ms. */
export function playPattern(pattern: boolean[], bpm: number): number {
  const eighth = 60 / bpm / 2;
  pattern.forEach((on, i) => {
    if (i % 2 === 0) playTone(i === 0 ? 1200 : 900, 0.04, i * eighth, 0.08, "sine");
    if (on) playTone(196, 0.18, i * eighth, 0.4, "triangle");
  });
  return pattern.length * eighth * 1000;
}

export interface Metronome {
  stop(): void;
}

export function startMetronome(bpm: number, onBeat?: (beat: number) => void, beatsPerBar = 4): Metronome {
  let beat = 0;
  const tick = () => {
    playClick(0, beat % beatsPerBar === 0);
    onBeat?.(beat % beatsPerBar);
    beat++;
  };
  tick();
  const id = window.setInterval(tick, (60 / bpm) * 1000);
  return { stop: () => window.clearInterval(id) };
}
