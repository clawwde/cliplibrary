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

export const PINE: ReviewTheme = {
  brand: '#14a37f',
  ink: '#0b3a2c',
  deep: '#04211a',
  paper: '#ffffff',
  cream: '#effbf5',
  gold: '#f5b301',
  muted: '#4f6b61',
};

export const SUNSET: ReviewTheme = {
  brand: '#ff7a1a',
  ink: '#3a1a06',
  deep: '#1f0d02',
  paper: '#ffffff',
  cream: '#fff4e8',
  gold: '#f5b301',
  muted: '#6b5446',
};

export const COBALT: ReviewTheme = {
  brand: '#2f6bff',
  ink: '#0d1f4d',
  deep: '#071233',
  paper: '#ffffff',
  cream: '#eef3ff',
  gold: '#f5b301',
  muted: '#4f5b7a',
};

const HEAD = 'Plus Jakarta Sans';
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
    text('#USERLOVE', x, y + 14, 290, {
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
      name: 'Tomas Berg',
      photo: 'man-portrait-1',
      quote: 'Setup took ten minutes and our support\nqueue dropped by half in week one.',
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
    text('Loved by product teams', 0, 150, PW, {
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
    text('What Our Users Say', 190, 432, 700, {
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
    avatar('woman-portrait-5', 245, 585, 30),
    text('Hana Kowalski', 290, 562, 330, {
      fontFamily: HEAD,
      fontSize: 26,
      fontWeight: 700,
      fill: '#141414',
    }),
    rating(290, 598, 20, 5, theme.gold),
    text('Dashboards our whole team opens.\nFinally, one source of truth.', 215, 650, 410, {
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
    text('4.8', 670, 800, 220, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
    }),
    text('app store rating', 670, 890, 220, {
      fontSize: 20,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
    }),
    star(5, 80, 260, 110, theme.paper, { innerRatio: 0.42 }),
    star(5, 880, 1060, 120, theme.paper, { innerRatio: 0.42 }),
    text('stackwise.app', 0, 1220, PW, {
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
    photo('team-3', 0, 0, PW, PH, { name: 'Background photo' }),
    rect(0, 0, PW, PH, 'rgba(10,15,38,0.18)', { name: 'Tint' }),
    rect(80, 170, 920, 1040, 'rgba(0,0,0,0)', {
      name: 'Frame',
      stroke: theme.brand,
      strokeWidth: 18,
    }),
    rect(80, 70, 300, 76, theme.brand, { name: 'Tag' }),
    text('#USERLOVE', 80, 86, 300, {
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
      'We replaced four tools with one workspace and shipped our roadmap a full month early. Our team loves it.',
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
    text('Rosa Lindgren, COO at Fieldnote', 190, 1190, 700, {
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
    text('Real\nResults\nfrom Real\nUsers', 620, 300, 420, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.08,
    }),
    rect(620, 680, 110, 8, theme.deep, { name: 'Rule', cornerRadius: 4 }),
    text('Unfiltered notes from the teams that use us every day.', 620, 720, 400, {
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
    text('USER', 0, 90 + shift, PW, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: theme.deep,
      align: 'center',
      letterSpacing: 4,
    }),
    text('reviews that ship', 0, 230 + shift, PW, {
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
        name: 'Amara Diallo',
        photo: 'woman-portrait-6',
        quote: 'Onboarding our team took one afternoon.',
      },
      -6,
    ),
    reviewCard(
      theme,
      300,
      590 + shift,
      560,
      {
        name: 'Felix Grant',
        photo: 'man-portrait-2',
        quote: 'Reports that used to take days now run live.',
      },
      4,
    ),
    reviewCard(
      theme,
      240,
      790 + shift,
      560,
      { name: 'June Park', photo: 'woman-portrait-3', quote: 'The cleanest product we pay for.' },
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

export const userEnvelope = (theme: ReviewTheme): Template =>
  template(PW, PH, () => envelope(theme, PH, false));

export const userStory = (theme: ReviewTheme): Template =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => envelope(theme, STORY_SIZE.height, true));
