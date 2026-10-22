import {
  avatar,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  poly,
  rating,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export interface ReviewTheme {
  brand: string;
  ink: string;
  deep: string;
  paper: string;
  cream: string;
  gold: string;
  muted: string;
}

export const TANGERINE: ReviewTheme = {
  brand: '#ff6a3d',
  ink: '#141b3d',
  deep: '#0a0f26',
  paper: '#ffffff',
  cream: '#fff4e8',
  gold: '#ffb020',
  muted: '#5b6178',
};

export const LAGOON: ReviewTheme = {
  brand: '#22b8a7',
  ink: '#10233a',
  deep: '#081627',
  paper: '#ffffff',
  cream: '#ecfbf8',
  gold: '#ffb020',
  muted: '#55677a',
};

export const ORCHID: ReviewTheme = {
  brand: '#8b5cf6',
  ink: '#2a1159',
  deep: '#1a0a3a',
  paper: '#ffffff',
  cream: '#fff4e8',
  gold: '#ffb020',
  muted: '#5b6178',
};

const HEAD = 'Outfit';
const WORD = 'Archivo Black';
const { width: PW, height: PH } = POST_SIZE;

const reviewCard = (
  theme: ReviewTheme,
  x: number,
  y: number,
  width: number,
  person: { name: string; photo: PosterPhotoName; quote: string },
  degrees = 0,
) =>
  rotateNodes(degrees, x, y, [
    rect(x, y, width, 200, theme.paper, {
      name: 'Review card',
      cornerRadius: 18,
      ...shadow(26, 10),
    }),
    avatar(person.photo, x + 62, y + 62, 34),
    text(person.name, x + 112, y + 30, width - 140, {
      fontFamily: HEAD,
      fontSize: 28,
      fontWeight: 700,
      fill: '#141414',
    }),
    rating(x + 112, y + 68, 24, 5, theme.gold),
    text(person.quote, x + 32, y + 118, width - 64, {
      fontSize: 22,
      fontWeight: 500,
      fill: theme.muted,
      lineHeight: 1.3,
    }),
  ]);

const letter = (theme: ReviewTheme, glyph: string, x: number, y: number, degrees: number): Nodes =>
  text(glyph, x, y, 480, {
    fontFamily: WORD,
    fontSize: 400,
    fontWeight: 400,
    fill: theme.brand,
    rotation: degrees,
    lineHeight: 1,
  });

const tag = (theme: ReviewTheme, x: number, y: number, degrees: number) =>
  rotateNodes(degrees, x, y, [
    rect(x, y, 290, 74, theme.paper, { name: 'Tag', cornerRadius: 8 }),
    text('#FEEDBACK', x, y + 14, 290, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 800,
      fill: theme.deep,
      align: 'center',
      letterSpacing: 2,
    }),
  ]);

export const reviewWord = (theme: ReviewTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.deep, { name: 'Background' }),
    letter(theme, 'R', 50, 40, -8),
    letter(theme, 'E', 340, 0, 5),
    letter(theme, 'V', 640, 40, 10),
    letter(theme, 'I', 90, 840, 6),
    letter(theme, 'E', 240, 860, -5),
    letter(theme, 'W', 540, 840, 4),
    tag(theme, 1010, 250, 90),
    tag(theme, 70, 780, -12),
    reviewCard(theme, 220, 500, 640, {
      name: 'Maya Lindqvist',
      photo: 'woman-portrait-1',
      quote: 'Clear plans, quick replies and a launch\nthat beat every target we had set.',
    }),
    star(5, 820, 390, 100, theme.paper, { innerRatio: 0.42 }),
    star(5, 950, 1230, 80, theme.paper, { innerRatio: 0.42 }),
  ]);

const lines = (x: number, y: number, widths: readonly number[], color: string, gap = 26) =>
  widths.map((width, index) =>
    rect(x, y + index * gap, width, 12, color, { name: 'Text line', cornerRadius: 6 }),
  );

export const newspaper = (theme: ReviewTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    text('Straight from our clients', 0, 150, PW, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 700,
      fill: theme.paper,
      align: 'center',
    }),
    rotateNodes(-5, 150, 380, [rect(150, 380, 780, 640, '#d9d4cc', { name: 'Back sheet' })]),
    rotateNodes(4, 170, 360, [rect(170, 360, 780, 640, '#ece8e1', { name: 'Middle sheet' })]),
    rect(150, 370, 780, 640, theme.paper, { name: 'Front sheet', ...shadow(30, 12) }),
    rect(190, 410, 700, 92, theme.ink, { name: 'Masthead' }),
    text('What Our Clients Say', 190, 432, 700, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
    }),
    rect(190, 530, 450, 220, theme.paper, {
      name: 'Review box',
      stroke: theme.ink,
      strokeWidth: 4,
    }),
    avatar('man-portrait-1', 245, 585, 30),
    text('Jonas Pereira', 290, 562, 330, {
      fontFamily: HEAD,
      fontSize: 26,
      fontWeight: 700,
      fill: '#141414',
    }),
    rating(290, 598, 20, 5, theme.gold),
    text('Our pipeline doubled in one quarter.\nSharp strategy, zero fluff.', 215, 650, 410, {
      fontSize: 20,
      fontWeight: 500,
      fill: theme.muted,
      lineHeight: 1.35,
    }),
    lines(670, 540, [220, 190, 220, 160, 220, 200, 140], '#b9b6c4'),
    rect(670, 730, 220, 4, theme.ink, { name: 'Rule' }),
    lines(190, 790, [300, 280, 300, 240, 300, 200], '#b9b6c4'),
    lines(520, 790, [120, 100, 120, 90], '#b9b6c4'),
    rect(670, 780, 220, 180, theme.brand, { name: 'Score box' }),
    text('4.9', 670, 800, 220, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
    }),
    text('average rating', 670, 890, 220, {
      fontSize: 20,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
    }),
    star(5, 80, 260, 110, theme.paper, { innerRatio: 0.42 }),
    star(5, 880, 1060, 120, theme.paper, { innerRatio: 0.42 }),
    text('brightfold.agency', 0, 1220, PW, {
      fontFamily: HEAD,
      fontSize: 28,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
      letterSpacing: 1,
    }),
  ]);

export const photoQuote = (theme: ReviewTheme): Template =>
  template(PW, PH, () => [
    photo('meeting-1', 0, 0, PW, PH, { name: 'Background photo' }),
    rect(0, 0, PW, PH, 'rgba(10,15,38,0.18)', { name: 'Tint' }),
    rect(80, 170, 920, 1040, 'rgba(0,0,0,0)', {
      name: 'Frame',
      stroke: theme.brand,
      strokeWidth: 18,
    }),
    rect(80, 70, 300, 76, theme.brand, { name: 'Tag' }),
    text('#FEEDBACK', 80, 86, 300, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
      letterSpacing: 2,
    }),
    rect(800, 60, 200, 170, theme.deep, { name: 'Quote badge', cornerRadius: 20 }),
    icon('quote', 840, 85, 120, theme.brand, { strokeWidth: 2.4 }),
    rect(140, 960, 800, 300, theme.deep, { name: 'Quote box' }),
    text(
      'They rebuilt our funnel in six weeks and demo requests doubled. Easily the best partner we hired this year.',
      190,
      1000,
      700,
      {
        fontSize: 30,
        fontWeight: 500,
        fill: theme.paper,
        lineHeight: 1.4,
      },
    ),
    text('Daniel Osei, Founder at Northpine', 190, 1190, 700, {
      fontFamily: HEAD,
      fontSize: 26,
      fontWeight: 700,
      fill: theme.brand,
    }),
  ]);

export const typewriter = (theme: ReviewTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    rect(150, 80, 340, 860, theme.cream, { name: 'Paper', ...shadow(20, 8) }),
    [0, 1, 2, 3, 4].map((row) => [
      circle(195, 140 + row * 150, 22, theme.brand),
      rating(232, 124 + row * 150, 16, 5, theme.gold),
      lines(180, 180 + row * 150, [270, 230], '#cdbfae', 24),
    ]),
    rect(100, 880, 440, 64, '#2e3866', { name: 'Roller', cornerRadius: 32 }),
    circle(96, 912, 30, theme.ink),
    circle(544, 912, 30, theme.ink),
    rect(70, 940, 500, 270, theme.ink, {
      name: 'Typewriter body',
      cornerRadius: 46,
      ...shadow(30, 14),
    }),
    [0, 1, 2].map((row) =>
      Array.from({ length: 8 - row }, (_, key) =>
        circle(140 + row * 26 + key * 52, 1000 + row * 52, 16, theme.paper),
      ),
    ),
    rect(200, 1150, 240, 22, theme.paper, { name: 'Space bar', cornerRadius: 11 }),
    text(['Growth', 'Marketing', 'Results', 'that speak'].join('\n'), 620, 300, 420, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.08,
    }),
    rect(620, 680, 110, 8, theme.deep, { name: 'Rule', cornerRadius: 4 }),
    text('Real words from real clients, typed up fresh every week.', 620, 720, 400, {
      fontSize: 28,
      fontWeight: 500,
      fill: theme.paper,
      lineHeight: 1.4,
    }),
    star(5, 560, 60, 90, theme.deep, { innerRatio: 0.42 }),
    star(5, 860, 1100, 130, theme.paper, { innerRatio: 0.42 }),
  ]);

const envelope = (theme: ReviewTheme, height: number, story: boolean): Nodes[] => {
  const shift = story ? 300 : 0;
  const bottom = height - 90;
  return [
    rect(0, 0, PW, height, theme.brand, { name: 'Background' }),
    text('CLIENT', 0, 90 + shift, PW, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: theme.deep,
      align: 'center',
      letterSpacing: 4,
    }),
    text('love notes', 0, 230 + shift, PW, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 500,
      fill: theme.paper,
      align: 'center',
    }),
    rect(190, bottom - 380, 700, 380, theme.ink, { name: 'Envelope back', cornerRadius: 30 }),
    reviewCard(
      theme,
      250,
      390 + shift,
      560,
      {
        name: 'Priya Raman',
        photo: 'woman-portrait-2',
        quote: 'Fast, friendly and on brand every time.',
      },
      -6,
    ),
    reviewCard(
      theme,
      300,
      590 + shift,
      560,
      { name: 'Leo Hartmann', photo: 'man-portrait-3', quote: 'Our best quarter since we opened.' },
      4,
    ),
    reviewCard(
      theme,
      240,
      790 + shift,
      560,
      {
        name: 'Ana Duarte',
        photo: 'woman-portrait-4',
        quote: 'I would hire this crew again tomorrow.',
      },
      -3,
    ),
    pocket(theme, bottom),
    star(5, 860, 330 + shift, 110, theme.paper, { innerRatio: 0.42 }),
    star(5, 90, bottom - 520, 80, theme.paper, { innerRatio: 0.42 }),
  ];
};

const pocket = (theme: ReviewTheme, bottom: number): Nodes[] => [
  poly(
    [
      [190, bottom - 300],
      [540, bottom - 120],
      [890, bottom - 300],
      [890, bottom],
      [190, bottom],
    ],
    theme.deep,
    { name: 'Envelope front' },
  ),
  poly(
    [
      [190, bottom],
      [540, bottom - 170],
      [890, bottom],
    ],
    theme.ink,
    { name: 'Envelope fold' },
  ),
];

export const clientEnvelope = (theme: ReviewTheme): Template =>
  template(PW, PH, () => envelope(theme, PH, false));

export const clientStory = (theme: ReviewTheme): Template =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => envelope(theme, STORY_SIZE.height, true));
