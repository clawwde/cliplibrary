import { linear, radial } from '@/design';
import {
  circle,
  ellipse,
  type Nodes,
  POST_SIZE,
  path,
  poly,
  rect,
  rotateNodes,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface TipPalette {
  brand: string;
  ink: string;
  paper: string;
  steel: string;
}

export const COBALT: TipPalette = {
  brand: '#2f6bff',
  ink: '#0b0d12',
  paper: '#ffffff',
  steel: '#dfe4ee',
};

export const CRIMSON: TipPalette = {
  brand: '#ff3b5c',
  ink: '#170a0e',
  paper: '#fff8f5',
  steel: '#f1e4e4',
};

export const HEAD = 'Montserrat';
export const { width: W, height: H } = POST_SIZE;

const ladder = (x: number, top: number, bottom: number, rail: string, rung: string): Nodes[] => [
  rect(x, top, 24, bottom - top, rail, { cornerRadius: 8, name: 'Ladder rail' }),
  rect(x + 132, top, 24, bottom - top, rail, { cornerRadius: 8, name: 'Ladder rail' }),
  Array.from({ length: Math.floor((bottom - top - 40) / 72) }, (_, index) =>
    rect(x + 24, top + 40 + index * 72, 108, 16, rung, { cornerRadius: 4, name: 'Ladder rung' }),
  ),
];

export const sellProblem = (p: TipPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    star(5, 60, 60, 90, p.ink, { innerRatio: 0.45 }),
    star(5, 930, 250, 70, p.paper, { innerRatio: 0.45 }),
    rotateNodes(-72, 640, 640, ladder(562, 160, 640, 'rgba(0,0,0,0.16)', 'rgba(0,0,0,0.16)')),
    ellipse(410, 580, 460, 130, p.ink, { name: 'Hole' }),
    ellipse(440, 596, 400, 90, 'rgba(255,255,255,0.08)', { name: 'Hole rim' }),
    rotateNodes(14, 640, 690, ladder(562, 140, 690, p.steel, '#a8b0bf')),
    path(
      'M0 0 C0 86 460 86 460 0 Z',
      410,
      645,
      460,
      65,
      p.ink,
      { width: 460, height: 65 },
      {
        name: 'Hole lip',
      },
    ),
    text('SELL THE\nPROBLEM YOU\nSOLVE,', 80, 850, 900, {
      fontFamily: HEAD,
      fontSize: 78,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1.05,
    }),
    text('NOT THE\nPRODUCT.', 80, 1100, 900, {
      fontFamily: HEAD,
      fontSize: 78,
      fontWeight: 800,
      fill: p.ink,
      lineHeight: 1.05,
    }),
  ]);

const TOOL_LINES = [
  'Site stats: traffic + sales',
  'Search console: SEO health',
  'Design editor: quick visuals',
  'Notes app: plans and ideas',
  'Ads manager: paid social',
  'Writing helper: captions',
  'Keyword finder: research',
  'Mail tool: weekly newsletter',
];

export const toDoTools = (p: TipPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.paper, { name: 'Background' }),
    text('TO DO\nTO DO\nTO DO', 0, 60, W, {
      fontFamily: 'Anton',
      fontSize: 400,
      fontWeight: 400,
      fill: p.brand,
      align: 'center',
      lineHeight: 0.98,
    }),
    rotateNodes(-8, 540, 720, [
      rect(250, 330, 600, 780, '#ffffff', {
        cornerRadius: 18,
        name: 'Notebook',
        shadow: { color: 'rgba(0,0,0,0.3)', blur: 40, offsetX: 0, offsetY: 18 },
      }),
      Array.from({ length: 9 }, (_, index) => [
        circle(300 + index * 62, 360, 14, p.steel),
        rect(296 + index * 62, 312, 8, 50, p.ink, { cornerRadius: 4, name: 'Spiral ring' }),
      ]),
      text('Essential', 300, 420, 520, {
        fontFamily: HEAD,
        fontSize: 52,
        fontWeight: 800,
        fill: p.ink,
      }),
      text('Growth Tools', 300, 482, 520, {
        fontFamily: HEAD,
        fontSize: 52,
        fontWeight: 800,
        fill: p.brand,
      }),
      TOOL_LINES.map((item, index) => [
        circle(310, 597 + index * 58, 6, p.brand),
        text(item, 330, 582 + index * 58, 500, {
          fontFamily: HEAD,
          fontSize: 25,
          fontWeight: 500,
          fill: '#374151',
        }),
      ]),
      rect(790, 360, 24, 300, p.ink, { cornerRadius: 12, rotation: 8, name: 'Pen' }),
      rect(790, 360, 24, 60, p.brand, { cornerRadius: 12, rotation: 8, name: 'Pen cap' }),
    ]),
    star(5, 60, 1190, 100, p.ink, { innerRatio: 0.45 }),
  ]);

const FACETS: [number, number][][] = [
  [
    [420, 620],
    [560, 580],
    [500, 720],
  ],
  [
    [560, 580],
    [680, 660],
    [600, 760],
  ],
  [
    [380, 760],
    [500, 720],
    [470, 880],
  ],
  [
    [600, 760],
    [700, 800],
    [620, 900],
  ],
];

const SHARDS = Array.from({ length: 52 }, (_, index) => {
  const angle = (index * 137.5 * Math.PI) / 180;
  const distance = 170 + ((index * 53) % 220);
  return {
    x: 550 + Math.cos(angle) * distance,
    y: 730 + Math.sin(angle) * distance * 0.78,
    size: 22 + ((index * 7) % 26),
    rotation: (index * 29) % 90,
  };
});

export const lessIsMore = (p: TipPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    text('Brightline Studio', 80, 90, 600, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 500,
      fill: p.paper,
    }),
    text('WHY', 80, 150, 900, { fontFamily: HEAD, fontSize: 84, fontWeight: 800, fill: p.paper }),
    text('LESS IS MORE', 80, 245, 900, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: p.brand,
    }),
    text('IN DESIGN?', 80, 340, 900, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: p.paper,
    }),
    star(5, 900, 80, 100, p.paper, { innerRatio: 0.45 }),
    poly(
      [
        [470, 880],
        [610, 880],
        [646, 1100],
        [434, 1100],
      ],
      linear(180, '#c4c4cc', '#8e8e98'),
      { name: 'Neck' },
    ),
    path(
      'M0 330 C30 150 170 50 370 50 C570 50 710 150 740 330 Z',
      170,
      1020,
      740,
      330,
      linear(180, '#f4f4f5', '#9ca3af'),
      { width: 740, height: 330 },
      { name: 'Shoulders' },
    ),
    circle(540, 750, 190, radial('#ffffff', '#b4b4bb'), { name: 'Head' }),
    FACETS.map((points, index) =>
      poly(points, index % 2 === 0 ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.35)', {
        name: 'Facet',
      }),
    ),
    SHARDS.map((shard, index) =>
      rect(shard.x, shard.y, shard.size, shard.size * 0.8, index % 9 === 0 ? p.brand : '#f4f4f5', {
        rotation: shard.rotation,
        name: 'Shard',
        shadow: { color: 'rgba(0,0,0,0.35)', blur: 8, offsetX: 0, offsetY: 4 },
      }),
    ),
  ]);
