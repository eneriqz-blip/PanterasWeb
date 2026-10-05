export const ART_W = 400;
export const ART_H = 260;

export function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Number(n.toFixed(1));

export interface PlayScene {
  angle: number;
  cy: number;
  frames: { x: number; faint: boolean }[];
  holes: { x: number }[];
  ball: { cx: number; top: number; drop: number; r: number };
  buttons: { kind: 'triangle' | 'circle' | 'cross' | 'square'; x: number; y: number; delay: number }[];
  brush: string;
  sparks: { x: number; y: number; scale: number; delay: number }[];
}

export function playScene(seed: string): PlayScene {
  const rand = mulberry32(seedFrom(seed));
  const angle = f(-(9 + rand() * 8));
  const cy = f(150 + (rand() - 0.5) * 24);
  const frames = Array.from({ length: 12 }, (_, i) => ({ x: -140 + i * 64 + 8, faint: i % 2 === 1 }));
  const holes = Array.from({ length: 24 }, (_, i) => ({ x: -140 + i * 32 + 11 }));

  const r = 11;
  const top = 58;
  const ground = 206 + f((rand() - 0.5) * 8);
  const ball = { cx: f(184 + rand() * 56), top, drop: f(ground - top - r), r };

  const bx = f(322 + (rand() - 0.5) * 24);
  const by = f(62 + (rand() - 0.5) * 12);
  const buttons: PlayScene['buttons'] = [
    { kind: 'triangle', x: bx, y: by - 20, delay: 0 },
    { kind: 'circle', x: bx + 20, y: by, delay: 0.3 },
    { kind: 'cross', x: bx, y: by + 20, delay: 0.6 },
    { kind: 'square', x: bx - 20, y: by, delay: 0.9 },
  ];

  const bxs = 28 + rand() * 20;
  const brush = `M${f(bxs)} 222C${f(bxs + 40)} 184 ${f(bxs + 84)} 244 ${f(bxs + 136)} 206`;

  const sparks = Array.from({ length: 4 }, () => ({
    x: f(30 + rand() * 340),
    y: f(24 + rand() * 90),
    scale: f(0.6 + rand() * 0.8),
    delay: f(rand() * 3),
  }));

  return { angle, cy, frames, holes, ball, buttons, brush, sparks };
}

export interface CodeScene {
  lines: { x: number; y: number; w1: number; w2: number; tone: number }[];
  caret: { x: number; y: number };
  bars: { x: number; h: number; delay: number }[];
  chart: string;
  tokens: { text: string; x: number; y: number; delay: number }[];
}

export function codeScene(seed: string): CodeScene {
  const rand = mulberry32(seedFrom(seed));
  const baseX = 48;
  const baseY = 82;
  const lines = Array.from({ length: 7 }, (_, i) => {
    const indent = [0, 1, 1, 2, 2, 1, 0][i];
    const w1 = f(22 + rand() * 18);
    const w2 = f(40 + rand() * 74);
    return { x: baseX + indent * 14, y: baseY + i * 17, w1, w2, tone: Math.floor(rand() * 3) };
  });
  const last = lines[lines.length - 1];
  const caret = { x: f(last.x + last.w1 + last.w2 + 12), y: last.y - 1 };

  const bars = Array.from({ length: 5 }, (_, i) => ({
    x: 272 + i * 19,
    h: f(22 + rand() * 36),
    delay: f(i * 0.3),
  }));

  const pts = Array.from({ length: 6 }, (_, i) => `${f(270 + i * 17.5)} ${f(66 - rand() * 18)}`);
  const chart = `M${pts.join('L')}`;

  const tokens = [
    { text: '01', x: 372, y: 30, delay: 0 },
    { text: '</>', x: 24, y: 236, delay: 1.2 },
    { text: '{ }', x: 206, y: 240, delay: 2.2 },
  ];

  return { lines, caret, bars, chart, tokens };
}

function gearPath(cx: number, cy: number, radius: number, teeth: number, depth: number): string {
  const step = (Math.PI * 2) / teeth;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const stops: [number, number][] = [
      [radius, a + step * 0.12],
      [radius + depth, a + step * 0.3],
      [radius + depth, a + step * 0.7],
      [radius, a + step * 0.88],
    ];
    for (const [rad, ang] of stops) {
      points.push(`${f(cx + rad * Math.cos(ang))} ${f(cy + rad * Math.sin(ang))}`);
    }
  }
  return `M${points.join('L')}Z`;
}

export interface GearArt {
  gears: { path: string; cx: number; cy: number; hub: number }[];
  rings: { cx: number; cy: number; r: number }[];
}

export function gears(seed: string): GearArt {
  const rand = mulberry32(seedFrom(seed));
  const specs = [
    { cx: 100 + rand() * 40, cy: 120 + rand() * 30, r: 50, teeth: 12, depth: 11 },
    { cx: 225 + rand() * 30, cy: 80 + rand() * 30, r: 34, teeth: 9, depth: 9 },
    { cx: 315 + rand() * 25, cy: 175 + rand() * 25, r: 44, teeth: 11, depth: 10 },
  ];

  return {
    gears: specs.map((s) => ({
      path: gearPath(s.cx, s.cy, s.r, s.teeth, s.depth),
      cx: f(s.cx),
      cy: f(s.cy),
      hub: f(s.r * 0.36),
    })),
    rings: specs.map((s) => ({ cx: f(s.cx), cy: f(s.cy), r: f(s.r + s.depth + 14) })),
  };
}

export interface FlowArt {
  nodes: { x: number; y: number; w: number; h: number; delay: number }[];
  links: { d: string; w: number }[];
}

export function flows(seed: string): FlowArt {
  const rand = mulberry32(seedFrom(seed));
  const xs = [34, 132, 230, 328];
  const nodeW = 38;
  const columns: FlowArt['nodes'][] = xs.map((x, column) => {
    const n = 2 + Math.floor(rand() * 2);
    return Array.from({ length: n }, (_, i) => ({
      x,
      y: f(((i + 0.5) / n) * (ART_H - 40) + 20 - 17),
      w: nodeW,
      h: 34,
      delay: f(column * 0.55 + i * 0.25),
    }));
  });

  const links: FlowArt['links'] = [];
  for (let c = 0; c < columns.length - 1; c++) {
    for (const from of columns[c]) {
      const picks = 1 + Math.floor(rand() * 2);
      for (let k = 0; k < picks; k++) {
        const to = columns[c + 1][Math.floor(rand() * columns[c + 1].length)];
        const x1 = from.x + from.w;
        const y1 = from.y + from.h / 2;
        const x2 = to.x;
        const y2 = to.y + to.h / 2;
        const mid = (x1 + x2) / 2;
        links.push({
          d: `M${f(x1)} ${f(y1)}C${f(mid)} ${f(y1)} ${f(mid)} ${f(y2)} ${f(x2)} ${f(y2)}`,
          w: f(3 + rand() * 9),
        });
      }
    }
  }

  return { nodes: columns.flat(), links };
}
