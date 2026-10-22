import {
  circle,
  ellipse,
  group,
  line,
  POST_SIZE,
  pill,
  poly,
  rect,
  rotateNodes,
  STORY_SIZE,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

interface SalePalette {
  main: string;
  ink: string;
  paper: string;
  dim: string;
  onMain: string;
}

export const GOLD: SalePalette = {
  main: '#ffc400',
  ink: '#0a0a0a',
  paper: '#ffffff',
  dim: '#2b2b2b',
  onMain: '#0a0a0a',
};

export const VIOLET: SalePalette = {
  main: '#8b5cf6',
  ink: '#120a24',
  paper: '#ffffff',
  dim: '#2e2546',
  onMain: '#ffffff',
};

const DISPLAY = 'Archivo Black';
const CONDENSED = 'Anton';
const BODY = 'Montserrat';
const { width: W, height: H } = POST_SIZE;

const tag = (label: string, x: number, y: number, rotation: number, p: SalePalette) => {
  const width = label.length * 20 + 44;
  return group(
    rotateNodes(rotation, x + width / 2, y + 28, [
      rect(x, y, width, 56, p.main, { cornerRadius: 6, name: `${label} tag` }),
      text(label, x, y + 9, width, {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 800,
        fill: p.onMain,
        align: 'center',
      }),
    ]),
  );
};

const megaphone = (p: SalePalette) => [
  poly(
    [
      [330, 600],
      [740, 420],
      [740, 940],
      [330, 760],
    ],
    p.ink,
    { name: 'Megaphone cone' },
  ),
  ellipse(690, 420, 110, 520, '#262626', { name: 'Megaphone rim' }),
  ellipse(710, 450, 70, 460, '#3f3f46', { name: 'Megaphone mouth' }),
  rect(250, 600, 100, 160, p.ink, { cornerRadius: 24, name: 'Megaphone back' }),
  rect(400, 770, 70, 190, p.ink, { cornerRadius: 18, rotation: -12, name: 'Megaphone grip' }),
  rect(380, 620, 300, 14, 'rgba(255,255,255,0.18)', {
    cornerRadius: 7,
    rotation: -22,
    name: 'Highlight',
  }),
];

const percentBadge = (cx: number, cy: number, r: number, p: SalePalette) => [
  circle(cx, cy, r, p.ink),
  text('%', cx - r, cy - r * 0.62, r * 2, {
    fontFamily: DISPLAY,
    fontSize: r * 1.05,
    fontWeight: 400,
    fill: p.paper,
    align: 'center',
  }),
];

const saleMegaphone = (p: SalePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.main, { name: 'Background' }),
    text('Only for 24 hours', 0, 70, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 700,
      fill: p.onMain,
      align: 'center',
    }),
    text('SALE', 0, 120, W, {
      fontFamily: DISPLAY,
      fontSize: 300,
      fontWeight: 400,
      fill: p.onMain,
      align: 'center',
      lineHeight: 1,
    }),
    megaphone(p),
    percentBadge(190, 520, 70, p),
    percentBadge(860, 960, 56, p),
    text('Black Friday', 0, 1060, W, {
      fontFamily: DISPLAY,
      fontSize: 92,
      fontWeight: 400,
      fill: p.onMain,
      align: 'center',
    }),
    text('Save up to 70% sitewide', 0, 1200, W, {
      fontFamily: BODY,
      fontSize: 36,
      fontWeight: 700,
      fill: p.onMain,
      align: 'center',
    }),
  ]);

const stackedWords = (p: SalePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    text('NOVEMBER 27', 0, 70, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
      letterSpacing: 4,
    }),
    text('BLACK', 0, 130, W, {
      fontFamily: CONDENSED,
      fontSize: 320,
      fontWeight: 400,
      fill: p.dim,
      align: 'center',
      lineHeight: 1,
    }),
    text('BLACK', 0, 470, W, {
      fontFamily: CONDENSED,
      fontSize: 180,
      fontWeight: 400,
      fill: p.main,
      align: 'center',
      lineHeight: 1,
    }),
    text('FRIDAY', 0, 650, W, {
      fontFamily: CONDENSED,
      fontSize: 150,
      fontWeight: 400,
      fill: p.paper,
      align: 'center',
      lineHeight: 1,
    }),
    tag('Sale', 640, 780, -10, p),
    text('FRIDAY', 0, 820, W, {
      fontFamily: CONDENSED,
      fontSize: 320,
      fontWeight: 400,
      fill: p.dim,
      align: 'center',
      lineHeight: 1,
    }),
    text('UP TO 70% OFF', 0, 1210, W, {
      fontFamily: BODY,
      fontSize: 40,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
      letterSpacing: 3,
    }),
    star(5, 880, 1170, 110, p.paper, { innerRatio: 0.42 }),
  ]);

export const priceTag = (p: SalePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.main, { name: 'Background' }),
    text("It's here", 0, 70, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 700,
      fill: p.onMain,
      align: 'center',
    }),
    circle(90, 240, 14, p.ink),
    circle(990, 240, 14, p.ink),
    line(90, 240, 485, p.ink, 4, { rotation: 21.8 }),
    line(990, 240, 485, p.ink, 4, { rotation: 158.2 }),
    poly(
      [
        [440, 380],
        [640, 380],
        [800, 540],
        [800, 1000],
        [280, 1000],
        [280, 540],
      ],
      p.ink,
      { name: 'Price tag' },
    ),
    circle(540, 450, 24, p.main),
    text('BLACK\nFRIDAY', 280, 540, 520, {
      fontFamily: DISPLAY,
      fontSize: 92,
      fontWeight: 400,
      fill: p.paper,
      align: 'center',
      lineHeight: 1.05,
    }),
    pill('UP TO 50%', 380, 790, {
      fill: p.main,
      color: p.onMain,
      fontSize: 40,
      fontFamily: BODY,
      fontWeight: 800,
      width: 320,
    }),
    text('On every product', 280, 900, 520, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: p.paper,
      align: 'center',
    }),
    text('THIS FRIDAY, 27 NOV', 0, 1050, W, {
      fontFamily: DISPLAY,
      fontSize: 58,
      fontWeight: 400,
      fill: p.onMain,
      align: 'center',
    }),
    text('Doors open at 8 am', 0, 1135, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: p.onMain,
      align: 'center',
    }),
    star(5, 490, 1210, 100, p.paper, { innerRatio: 0.42 }),
    star(5, 840, 120, 90, p.paper, { innerRatio: 0.42 }),
  ]);

const lastDayAt = (p: SalePalette, height: number) => {
  const shift = height > H ? 285 : 0;
  return template(W, height, () => [
    rect(0, 0, W, height, p.ink, { name: 'Background' }),
    text(['Last', 'Day For', 'Black', 'Friday', 'Deals'].join('\n'), 0, 200 + shift, W, {
      fontFamily: DISPLAY,
      fontSize: 140,
      fontWeight: 400,
      fill: p.paper,
      align: 'center',
      lineHeight: 1,
    }),
    tag('Hurry', 730, 165 + shift, -8, p),
    tag('Before', 110, 470 + shift, -10, p),
    tag("It's", 800, 760 + shift, 8, p),
    tag('Gone', 480, 900 + shift, -6, p),
    text('Shop before midnight', 0, 1060 + shift, W, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 700,
      fill: p.paper,
      align: 'center',
    }),
    star(5, 850, 1150 + shift, 120, p.paper, { innerRatio: 0.42 }),
    star(5, 110, 80 + shift, 70, p.main, { innerRatio: 0.42 }),
  ]);
};

export const lastDay = (p: SalePalette) => lastDayAt(p, H);

export const lastDayStory = lastDayAt(GOLD, STORY_SIZE.height);

const TAPE = Array.from({ length: 7 }, () => 'BLACK FRIDAY').join('   /   ');

const comingSoon = (p: SalePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    star(5, 70, 70, 100, p.main, { innerRatio: 0.42 }),
    text('Check out our best offers', 0, 200, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: p.paper,
      align: 'center',
    }),
    text('Black Friday', 0, 260, W, {
      fontFamily: DISPLAY,
      fontSize: 92,
      fontWeight: 400,
      fill: p.paper,
      align: 'center',
    }),
    text('COMING', 0, 410, W, {
      fontFamily: DISPLAY,
      fontSize: 160,
      fontWeight: 400,
      fill: p.main,
      align: 'center',
      lineHeight: 1,
    }),
    rotateNodes(-6, 540, 620, [
      rect(330, 588, 420, 64, p.paper, { cornerRadius: 8, name: 'Countdown tag' }),
      text('Only 10 days left', 330, 600, 420, {
        fontFamily: BODY,
        fontSize: 34,
        fontWeight: 800,
        fill: p.ink,
        align: 'center',
      }),
    ]),
    text('SOON', 0, 660, W, {
      fontFamily: DISPLAY,
      fontSize: 160,
      fontWeight: 400,
      fill: p.main,
      align: 'center',
      lineHeight: 1,
    }),
    poly(
      [
        [0, 1000],
        [W, 900],
        [W, 970],
        [0, 1070],
      ],
      '#d4d4d8',
      { name: 'Tape' },
    ),
    text(TAPE, 10, 1040, 1070, {
      fontFamily: CONDENSED,
      fontSize: 30,
      fontWeight: 400,
      fill: p.ink,
      rotation: -5.3,
    }),
    poly(
      [
        [0, 1140],
        [W, 1240],
        [W, 1310],
        [0, 1210],
      ],
      p.main,
      { name: 'Tape' },
    ),
    text(TAPE, 10, 1150, 1070, {
      fontFamily: CONDENSED,
      fontSize: 30,
      fontWeight: 400,
      fill: p.onMain,
      rotation: 5.3,
    }),
  ]);

export const POSTS: readonly [Template, Template, Template, Template, Template] = [
  saleMegaphone(GOLD),
  stackedWords(GOLD),
  priceTag(GOLD),
  lastDay(GOLD),
  comingSoon(GOLD),
];
