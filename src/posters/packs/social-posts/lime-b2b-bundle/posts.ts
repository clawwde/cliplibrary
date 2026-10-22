import {
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  photo,
  pill,
  poly,
  rect,
  rotateNodes,
  shadow,
  star,
  stat,
  template,
  text,
} from '../../../kit';

export interface B2bPalette {
  primary: string;
  ink: string;
  paper: string;
  accent: string;
  muted: string;
}

export const LIME: B2bPalette = {
  primary: '#c6f135',
  ink: '#0e0e12',
  paper: '#ffffff',
  accent: '#7b5cff',
  muted: '#9ca3af',
};

export const PEACH: B2bPalette = {
  primary: '#ffb38a',
  ink: '#1f2b46',
  paper: '#fff8f2',
  accent: '#e8553f',
  muted: '#8a93a8',
};

export const HEAD = 'Urbanist';
export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

export const heavy = (content: string, x: number, y: number, size: number, fill: string) =>
  text(content, x, y, W - x - 60, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 900,
    fill,
    lineHeight: 1.02,
  });

export const footer = (fill: string) =>
  text('kestrel.studio', 80, 1262, 500, { fontSize: 26, fontWeight: 600, fill });

const sparkle = (x: number, y: number, size: number, fill: string) =>
  star(5, x, y, size, fill, { innerRatio: 0.42, name: 'Sparkle' });

const statement = (
  label: string,
  body: string,
  x: number,
  y: number,
  fill: string,
  labelColor: string,
  bodyColor: string,
): Nodes[] => [
  rect(x, y, 660, 230, fill, { cornerRadius: 18, name: `${label} card`, ...shadow(30, 12) }),
  text(label, x + 40, y + 34, 300, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 900,
    fill: labelColor,
    letterSpacing: 3,
  }),
  text(body, x + 40, y + 86, 590, {
    fontSize: 38,
    fontWeight: 500,
    fill: bodyColor,
    lineHeight: 1.3,
  }),
];

export const mythFact = (p: B2bPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.primary, { name: 'Background' }),
    heavy('Myth', 90, 110, 160, p.ink),
    heavy('Fact', 90, 280, 160, p.ink),
    rect(440, 312, 96, 70, p.ink, { name: 'Or tag' }),
    text('or', 440, 322, 96, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 800,
      fill: p.primary,
      align: 'center',
    }),
    sparkle(850, 100, 150, p.paper),
    rotateNodes(-5, 540, 670, [
      statement(
        'MYTH',
        'Cold outreach no longer\nworks for B2B brands.',
        210,
        560,
        p.ink,
        p.primary,
        p.paper,
      ),
    ]),
    rect(560, 790, 4, 140, p.ink, { name: 'Connector' }),
    circle(562, 790, 12, p.ink),
    rotateNodes(4, 640, 1040, [
      statement(
        'FACT',
        'Personal, useful outreach\nstill books meetings.',
        310,
        925,
        p.paper,
        p.accent,
        p.ink,
      ),
    ]),
    sparkle(870, 840, 130, p.ink),
    footer(p.ink),
  ]);

const listCard = (
  title: string,
  items: string,
  name: 'circle-check' | 'circle-x',
  x: number,
  fill: string,
  color: string,
) => [
  rect(x, 500, 440, 680, fill, { cornerRadius: 22, name: `${title} card` }),
  icon(name, x + 34, 538, 60, color, { strokeWidth: 2.2 }),
  text(title, x + 110, 540, 300, { fontFamily: HEAD, fontSize: 48, fontWeight: 900, fill: color }),
  rect(x + 34, 630, 372, 3, color, { name: 'Divider' }),
  text(items, x + 34, 670, 380, { fontSize: 32, fontWeight: 500, fill: color, lineHeight: 1.55 }),
];

export const dosDonts = (p: B2bPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    heavy('What you', 80, 100, 100, p.primary),
    heavy('should know', 80, 205, 100, p.primary),
    heavy("Do's and Don'ts", 80, 330, 76, p.paper),
    sparkle(880, 110, 130, p.paper),
    listCard(
      "Do's",
      '• Post on a schedule\n• Lead with insight\n• Reply to comments\n• Share client wins',
      'circle-check',
      80,
      p.paper,
      p.ink,
    ),
    listCard(
      "Don'ts",
      '• Go quiet for weeks\n• Copy rival posts\n• Ignore messages\n• Buy fake followers',
      'circle-x',
      560,
      p.primary,
      p.ink,
    ),
    sparkle(900, 1130, 140, p.paper),
  ]);

export const hiringPost = template(W, H, () => [
  rect(0, 0, W, H, LIME.primary, { name: 'Background' }),
  poly(
    [
      [0, 940],
      [W, 600],
      [W, 790],
      [0, 1130],
    ],
    LIME.ink,
    { name: 'Diagonal band' },
  ),
  heavy('We are', 80, 110, 70, LIME.ink),
  heavy('Hiring', 80, 185, 200, LIME.ink),
  text('Join our growth team as a', 80, 420, 600, {
    fontSize: 38,
    fontWeight: 500,
    fill: LIME.ink,
  }),
  heavy('SEO STRATEGIST', 80, 472, 64, LIME.ink),
  photo('man-portrait-1', 600, 600, 400, 500, {
    cornerRadius: 24,
    stroke: LIME.paper,
    strokeWidth: 10,
  }),
  sparkle(890, 100, 110, LIME.ink),
  sparkle(150, 820, 80, LIME.ink),
  pill('Apply now', 80, 1190, {
    fill: LIME.ink,
    color: LIME.primary,
    fontSize: 36,
    fontFamily: HEAD,
    fontWeight: 800,
  }),
]);

export const leadersStats = template(W, H, () => [
  rect(0, 0, W, H, LIME.ink, { name: 'Background' }),
  text('kestrel.studio', 80, 80, 500, { fontSize: 26, fontWeight: 600, fill: LIME.muted }),
  heavy('Where Leaders', 80, 150, 88, LIME.paper),
  heavy('Invest in 2027', 80, 245, 88, LIME.primary),
  [
    ['72%', 'AI tooling'],
    ['58%', 'Brand content'],
    ['85%', 'Data and insight'],
  ].map(([value = '', label = ''], index) =>
    stat(value, label, 80 + index * 320, 440, 300, {
      valueColor: index === 2 ? LIME.primary : LIME.paper,
      labelColor: LIME.muted,
      valueSize: 110,
      labelSize: 30,
      fontFamily: HEAD,
    }),
  ),
  rect(80, 760, 920, 400, '#1b1b22', { cornerRadius: 28, name: 'Chart card' }),
  path(
    'M0 260 L160 200 L320 220 L480 130 L640 150 L800 30',
    140,
    840,
    800,
    260,
    'rgba(0,0,0,0)',
    { width: 800, height: 260 },
    { stroke: LIME.primary, strokeWidth: 8, name: 'Trend line' },
  ),
  [
    [0, 260],
    [160, 200],
    [320, 220],
    [480, 130],
    [640, 150],
    [800, 30],
  ].map(([x = 0, y = 0]) => circle(140 + x, 840 + y, 12, LIME.paper)),
  text('Source: Kestrel B2B pulse survey', 80, 1240, 920, {
    fontSize: 26,
    fontWeight: 500,
    fill: LIME.muted,
  }),
]);

export const saleMegaphone = template(W, H, () => [
  rect(0, 0, W, H, LIME.ink, { name: 'Background' }),
  text('SALE', 0, 60, W, {
    fontFamily: 'Anton',
    fontSize: 300,
    fontWeight: 400,
    fill: LIME.primary,
    align: 'center',
    lineHeight: 1,
  }),
  circle(540, 650, 230, '#1b1b22', { name: 'Spot' }),
  icon('megaphone', 380, 490, 320, LIME.paper, { strokeWidth: 1.6 }),
  circle(780, 470, 64, LIME.primary),
  icon('percent', 744, 434, 72, LIME.ink, { strokeWidth: 2.6 }),
  sparkle(150, 420, 100, LIME.paper),
  text('Year-End Deals', 0, 930, W, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 900,
    fill: LIME.paper,
    align: 'center',
  }),
  pill('Up to 50% off every plan', 255, 1080, {
    fill: LIME.primary,
    color: LIME.ink,
    fontSize: 40,
    fontFamily: HEAD,
    fontWeight: 800,
    width: 570,
  }),
  text('Offer ends December 31', 0, 1250, W, {
    fontSize: 30,
    fontWeight: 500,
    fill: LIME.muted,
    align: 'center',
  }),
]);
