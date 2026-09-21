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

export interface NetworkArt {
  nodes: { x: number; y: number; r: number; ring: boolean }[];
  edges: { x1: number; y1: number; x2: number; y2: number }[];
}

export function network(seed: string): NetworkArt {
  const rand = mulberry32(seedFrom(seed));
  const cols = 6;
  const rows = 4;
  const nodes: NetworkArt['nodes'] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.2) continue;
      nodes.push({
        x: f(((c + 0.5) / cols) * ART_W + (rand() - 0.5) * 38),
        y: f(((r + 0.5) / rows) * ART_H + (rand() - 0.5) * 32),
        r: f(2 + rand() * 4),
        ring: rand() < 0.28,
      });
    }
  }

  const edges: NetworkArt['edges'] = [];
  nodes.forEach((node, i) => {
    nodes
      .map((other, j) => ({ j, d: (other.x - node.x) ** 2 + (other.y - node.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach((o) => {
        if (o.j > i) {
          edges.push({ x1: node.x, y1: node.y, x2: nodes[o.j].x, y2: nodes[o.j].y });
        }
      });
  });

  return { nodes, edges };
}

export interface SpriteArt {
  cells: { x: number; y: number; o: number }[];
  size: number;
}

export function sprites(seed: string): SpriteArt {
  const rand = mulberry32(seedFrom(seed));
  const size = 20;
  const cols = ART_W / size;
  const rows = Math.floor(ART_H / size);
  const cells: SpriteArt['cells'] = [];
  const count = 5 + Math.floor(rand() * 3);

  for (let k = 0; k < count; k++) {
    const ox = Math.floor(rand() * (cols - 6));
    const oy = Math.floor(rand() * (rows - 6));
    const o = f(0.45 + rand() * 0.5);
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 3; c++) {
        if (rand() < 0.56) {
          cells.push({ x: (ox + c) * size, y: (oy + r) * size, o });
          if (c < 2) cells.push({ x: (ox + 4 - c) * size, y: (oy + r) * size, o });
        }
      }
    }
  }

  return { cells, size };
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
  nodes: { x: number; y: number; w: number; h: number }[];
  links: { d: string; w: number }[];
}

export function flows(seed: string): FlowArt {
  const rand = mulberry32(seedFrom(seed));
  const xs = [34, 132, 230, 328];
  const nodeW = 38;
  const columns: { x: number; y: number; w: number; h: number }[][] = xs.map((x) => {
    const n = 2 + Math.floor(rand() * 2);
    return Array.from({ length: n }, (_, i) => ({
      x,
      y: f(((i + 0.5) / n) * (ART_H - 40) + 20 - 17),
      w: nodeW,
      h: 34,
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
