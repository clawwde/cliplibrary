import { linear } from '@/design';
import {
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface EventTheme {
  brand: string;
  ink: string;
  paper: string;
  cream: string;
  muted: string;
}

export const SAFFRON: EventTheme = {
  brand: '#ffc21a',
  ink: '#151515',
  paper: '#ffffff',
  cream: '#fffaf0',
  muted: '#5c5546',
};

export const ROSE: EventTheme = {
  brand: '#ff6b8b',
  ink: '#2a0d16',
  paper: '#ffffff',
  cream: '#fff4f6',
  muted: '#6b4a52',
};

export const SKY: EventTheme = {
  brand: '#5ec8ff',
  ink: '#0c1d33',
  paper: '#ffffff',
  cream: '#f1f8ff',
  muted: '#4a5a6e',
};

const HEAD = 'Poppins';
const BODY = 'Inter';
const { width: PW, height: PH } = POST_SIZE;

const IDEAS = [
  'Behind the scenes',
  'Client win',
  'Quick tip',
  'This or that poll',
  'Team intro',
  'FAQ answer',
  'Launch teaser',
  'Myth vs fact',
  'Weekly recap',
];

export const contentCalendar = (theme: EventTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.cream, { name: 'Background' }),
    text('Steal Our Content', 0, 80, PW, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 800,
      fill: theme.ink,
      align: 'center',
    }),
    rect(370, 182, 340, 64, theme.brand, { name: 'Highlight', cornerRadius: 10 }),
    text('Calendar', 0, 166, PW, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 800,
      fill: theme.ink,
      align: 'center',
    }),
    text('9 post ideas for busy founders', 0, 270, PW, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: theme.muted,
      align: 'center',
    }),
    rect(176, 366, 740, 830, '#e7e2d6', { name: 'Back page', cornerRadius: 14 }),
    rect(160, 350, 740, 830, theme.paper, {
      name: 'Notebook',
      cornerRadius: 14,
      stroke: '#ddd7ca',
      strokeWidth: 3,
      ...shadow(24, 10, 'rgba(0,0,0,0.12)'),
    }),
    Array.from({ length: 9 }, (_, index) =>
      rect(204 + index * 80, 322, 16, 62, theme.ink, { name: 'Ring', cornerRadius: 8 }),
    ),
    IDEAS.map((idea, index) => {
      const x = 195 + (index % 3) * 230;
      const y = 420 + Math.floor(index / 3) * 250;
      return [
        rect(x, y, 210, 230, theme.cream, { name: 'Cell', stroke: theme.ink, strokeWidth: 3 }),
        rect(x, y, 210, 44, theme.ink, { name: 'Cell header' }),
        text(
          `WEEK ${Math.floor(index / 3) + 1}  /  ${['MON', 'WED', 'FRI'][index % 3]}`,
          x,
          y + 11,
          210,
          {
            fontFamily: BODY,
            fontSize: 18,
            fontWeight: 700,
            fill: theme.paper,
            align: 'center',
            letterSpacing: 1,
          },
        ),
        text(idea, x + 18, y + 64, 180, {
          fontFamily: HEAD,
          fontSize: 25,
          fontWeight: 700,
          fill: theme.ink,
          lineHeight: 1.15,
        }),
        rect(x + 18, y + 160, 170, 10, '#d9d3c4', { name: 'Line', cornerRadius: 5 }),
        rect(x + 18, y + 184, 120, 10, '#d9d3c4', { name: 'Line', cornerRadius: 5 }),
      ];
    }),
    star(5, 50, 620, 100, theme.brand, { innerRatio: 0.42 }),
    star(5, 930, 1000, 100, theme.brand, { innerRatio: 0.42 }),
    circle(980, 1260, 50, theme.ink),
    icon('arrow-right', 955, 1235, 50, theme.paper, { strokeWidth: 2.6 }),
  ]);

export const eventDay = (theme: EventTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    rotateNodes(-8, 170, 360, [rect(170, 360, 700, 640, theme.paper, { name: 'Back card' })]),
    rect(220, 330, 660, 660, theme.ink, { name: 'Event card', ...shadow(30, 14) }),
    text('Launch Day', 280, 390, 560, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 500,
      fill: theme.brand,
    }),
    text('Thu, 22 May', 280, 440, 580, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: theme.paper,
    }),
    text('From 10am to 6pm', 280, 545, 560, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: theme.paper,
      opacity: 0.85,
    }),
    text('Live product demo\nand founder Q&A', 280, 625, 560, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 700,
      fill: theme.brand,
      lineHeight: 1.2,
    }),
    rect(280, 790, 440, 130, theme.paper, { name: 'Callout' }),
    text('Join the waitlist\nfor early perks', 308, 812, 400, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 700,
      fill: theme.ink,
      lineHeight: 1.2,
    }),
    star(5, 120, 200, 110, theme.paper, { innerRatio: 0.42 }),
    star(5, 780, 920, 240, theme.paper, { innerRatio: 0.42 }),
  ]);

const DAYS = [
  ['03', 'Mon'],
  ['07', 'Fri'],
  ['11', 'Tue'],
  ['13', 'Thu'],
  ['19', 'Wed'],
  ['21', 'Fri'],
  ['25', 'Tue'],
  ['28', 'Fri'],
  ['30', 'Sun'],
] as const;

const label = (theme: EventTheme, content: string, x: number, y: number, width: number) =>
  rotateNodes(-7, x, y, [
    rect(x, y, width, 58, theme.paper, { name: 'Event label', ...shadow(12, 4) }),
    text(content, x, y + 12, width, {
      fontFamily: HEAD,
      fontSize: 26,
      fontWeight: 700,
      fill: theme.ink,
      align: 'center',
    }),
  ]);

export const monthEvents = (theme: EventTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    text('Upcoming', 90, 80, 600, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 500,
      fill: theme.ink,
    }),
    text('November Events', 90, 122, 900, {
      fontFamily: HEAD,
      fontSize: 74,
      fontWeight: 800,
      fill: theme.ink,
    }),
    DAYS.map(([day, weekday], index) => {
      const x = 90 + (index % 3) * 305;
      const y = 270 + Math.floor(index / 3) * 315;
      const dark = index % 2 === 0;
      return [
        rect(x, y, 280, 290, dark ? theme.ink : theme.paper, { name: 'Day cell' }),
        text(day, x + 24, y + 20, 120, {
          fontFamily: HEAD,
          fontSize: 58,
          fontWeight: 800,
          fill: dark ? theme.brand : theme.ink,
        }),
        text(weekday, x + 130, y + 44, 130, {
          fontFamily: BODY,
          fontSize: 26,
          fontWeight: 600,
          fill: dark ? theme.paper : theme.muted,
        }),
      ];
    }),
    label(theme, 'Team Offsite', 70, 450, 300),
    label(theme, 'Kindness Day', 400, 770, 300),
    label(theme, 'Holiday Drop', 90, 1090, 300),
    star(5, 940, 60, 100, theme.paper, { innerRatio: 0.42 }),
  ]);

const flip = (
  theme: EventTheme,
  value: string,
  caption: string,
  x: number,
  y: number,
  hot: boolean,
) => [
  rect(x, y, 150, 150, hot ? theme.brand : theme.ink, { name: 'Flip card', cornerRadius: 12 }),
  rect(x, y + 73, 150, 4, hot ? theme.ink : theme.paper, { name: 'Flip seam', opacity: 0.35 }),
  text(value, x, y + 20, 150, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 800,
    fill: hot ? theme.ink : theme.paper,
    align: 'center',
    lineHeight: 1.2,
  }),
  text(caption, x, y + 166, 150, {
    fontFamily: BODY,
    fontSize: 20,
    fontWeight: 700,
    fill: theme.muted,
    align: 'center',
    letterSpacing: 2,
  }),
];

export const saveTheDate = (theme: EventTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, linear(90, '#9ea3aa', '#e2e5e9', '#b3b8bf', '#e8eaed', '#9ea3aa'), {
      name: 'Elevator doors',
    }),
    rect(537, 0, 6, PH, '#7c8189', { name: 'Door seam' }),
    rect(0, 1240, PW, 110, '#6f747c', { name: 'Floor' }),
    rotateNodes(-2, 220, 260, [
      rect(220, 260, 640, 820, '#fbfaf6', { name: 'Poster', ...shadow(30, 12) }),
      text('Save the Date', 220, 330, 640, {
        fontFamily: HEAD,
        fontSize: 70,
        fontWeight: 800,
        fill: theme.ink,
        align: 'center',
      }),
      rect(440, 432, 200, 10, theme.brand, { name: 'Underline', cornerRadius: 5 }),
      text('You are invited to our\nsummer open studio', 220, 470, 640, {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 500,
        fill: theme.muted,
        align: 'center',
        lineHeight: 1.35,
      }),
      flip(theme, '14', 'DAY', 285, 600, false),
      flip(theme, '06', 'MONTH', 465, 600, true),
      flip(theme, '26', 'YEAR', 645, 600, false),
      rect(300, 860, 480, 4, '#e2ddd2', { name: 'Divider' }),
      text('WANT A SEAT?', 220, 890, 640, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 700,
        fill: theme.muted,
        align: 'center',
        letterSpacing: 3,
      }),
      text('Comment "IN" below', 220, 930, 640, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 800,
        fill: theme.ink,
        align: 'center',
      }),
    ]),
    rotateNodes(-32, 170, 290, [
      rect(170, 290, 170, 52, 'rgba(206,170,110,0.85)', { name: 'Tape' }),
    ]),
    rotateNodes(32, 760, 200, [
      rect(760, 200, 170, 52, 'rgba(206,170,110,0.85)', { name: 'Tape' }),
    ]),
  ]);

const PLANS = [
  ['06', 'Maker Spotlight', 'Celebrate the makers behind our brand.'],
  ['13', 'Community Poll', 'Help us pick our next limited flavour.'],
  ['19', 'Live Workshop', 'Our launch checklist in 45 minutes.'],
  ['27', 'VIP Preview Night', 'Early access for our most loyal fans.'],
] as const;

const schedule = (theme: EventTheme, height: number, story: boolean): Nodes[] => {
  const top = story ? 420 : 200;
  const gap = story ? 300 : 280;
  return [
    rect(0, 0, PW, height, theme.brand, { name: 'Background' }),
    text('Coming up this month', 90, story ? 200 : 80, 800, {
      fontFamily: HEAD,
      fontSize: story ? 64 : 40,
      fontWeight: 800,
      fill: theme.ink,
    }),
    PLANS.map(([day, title, note], index) => {
      const y = top + index * gap;
      return [
        rect(90, y, 150, 160, theme.paper, {
          name: 'Date tile',
          cornerRadius: 14,
          ...shadow(16, 6),
        }),
        rect(90, y, 150, 36, theme.ink, { name: 'Date tile top', cornerRadius: 14 }),
        rect(90, y + 20, 150, 16, theme.ink, { name: 'Date tile edge' }),
        circle(130, y + 18, 7, theme.paper),
        circle(200, y + 18, 7, theme.paper),
        text(day, 90, y + 52, 150, {
          fontFamily: HEAD,
          fontSize: 64,
          fontWeight: 800,
          fill: theme.ink,
          align: 'center',
          lineHeight: 1.1,
        }),
        text(title, 280, y + 20, 720, {
          fontFamily: HEAD,
          fontSize: 46,
          fontWeight: 800,
          fill: theme.ink,
        }),
        text(note, 280, y + 92, 700, {
          fontFamily: BODY,
          fontSize: 30,
          fontWeight: 500,
          fill: theme.ink,
          opacity: 0.8,
        }),
      ];
    }),
    star(5, 930, story ? 120 : 50, 100, theme.paper, { innerRatio: 0.42 }),
    story
      ? [
          rect(90, 1640, 900, 120, theme.ink, { name: 'Button', cornerRadius: 60 }),
          text('Turn on post alerts', 90, 1678, 900, {
            fontFamily: HEAD,
            fontSize: 38,
            fontWeight: 700,
            fill: theme.paper,
            align: 'center',
          }),
        ]
      : star(5, 900, 1180, 110, theme.ink, { innerRatio: 0.42 }),
  ];
};

export const scheduleList = (theme: EventTheme): Template =>
  template(PW, PH, () => schedule(theme, PH, false));

export const scheduleStory = (theme: EventTheme): Template =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => schedule(theme, STORY_SIZE.height, true));
