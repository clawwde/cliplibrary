import { linear } from '@/design';
import {
  circle,
  icon,
  POST_SIZE,
  pill,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import { BODY, backdrop, type EventTheme, HEAD } from './posts';

const { width: W, height: H } = POST_SIZE;

const flipBox = (
  theme: EventTheme,
  x: number,
  y: number,
  caption: string,
  value: string,
  bold: boolean,
) => [
  rect(x, y, 170, 44, theme.ink, { name: 'Flip caption' }),
  text(caption, x, y + 9, 170, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 700,
    fill: theme.paper,
    align: 'center',
    letterSpacing: 2,
  }),
  rect(x, y + 44, 170, 150, bold ? theme.brand : theme.paper, {
    name: 'Flip digit',
    stroke: theme.ink,
    strokeWidth: 6,
  }),
  text(value, x, y + 66, 170, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: bold ? theme.paper : theme.ink,
    align: 'center',
    lineHeight: 1,
  }),
  rect(x, y + 117, 170, 4, bold ? theme.paper : theme.ink, { name: 'Flip seam' }),
];

export const saveDate = (theme: EventTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(90, '#b9bec7', '#eef0f3', '#c4c9d1', '#e6e8ec', '#b3b9c2'), {
      name: 'Steel doors',
    }),
    rect(538, 0, 4, H, '#8f97a3', { name: 'Door seam' }),
    rect(0, 1270, W, 80, '#9aa1ab', { name: 'Floor' }),
    rotateNodes(-2, 540, 690, [
      rect(190, 250, 700, 880, '#fcfcfa', { name: 'Poster', ...shadow(30, 14) }),
      star(5, 220, 280, 56, theme.brand, { innerRatio: 0.42 }),
      text('Save the', 190, 320, 700, {
        fontFamily: HEAD,
        fontSize: 84,
        fontWeight: 800,
        fill: theme.ink,
        align: 'center',
      }),
      text('Date', 190, 410, 700, {
        fontFamily: HEAD,
        fontSize: 108,
        fontWeight: 800,
        fill: theme.brand,
        align: 'center',
      }),
      text('You are invited to our first\nin-person founder meetup', 190, 560, 700, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: '#4b5563',
        align: 'center',
        lineHeight: 1.35,
      }),
      flipBox(theme, 255, 700, 'DAY', '14', false),
      flipBox(theme, 455, 700, 'MONTH', '11', true),
      flipBox(theme, 655, 700, 'YEAR', '26', false),
      text('Want a seat?', 190, 940, 700, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: '#4b5563',
        align: 'center',
      }),
      text('Comment “RSVP”', 190, 990, 700, {
        fontFamily: HEAD,
        fontSize: 52,
        fontWeight: 800,
        fill: theme.ink,
        align: 'center',
      }),
    ]),
    rect(260, 210, 200, 64, 'rgba(255,193,69,0.8)', { rotation: -8, name: 'Tape' }),
    rect(640, 196, 200, 64, 'rgba(255,193,69,0.8)', { rotation: 6, name: 'Tape' }),
  ]);

const IDEAS = [
  'Founder\nstory',
  'Feature\nquick tip',
  'Customer\nwin',
  'Poll your\nusers',
  'Meet the\nteam',
  'Roadmap\nteaser',
  'Live Q&A\nreminder',
  'Myth vs\nfact',
  'Launch\nrecap',
] as const;

export const contentCalendar = (theme: EventTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, '#fbf7f9', { name: 'Background' }),
    text('Copy Our Content', 0, 80, W, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: theme.ink,
      align: 'center',
    }),
    text('Calendar', 0, 164, W, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: theme.brand,
      align: 'center',
    }),
    text('9 ready post ideas for the month', 0, 268, W, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 600,
      fill: '#4b5563',
      align: 'center',
    }),
    rect(150, 380, 780, 860, theme.paper, {
      name: 'Calendar',
      cornerRadius: 12,
      ...shadow(40, 16),
    }),
    Array.from({ length: 9 }, (_, index) =>
      rect(200 + index * 82, 350, 22, 70, theme.ink, { name: 'Ring', cornerRadius: 11 }),
    ),
    IDEAS.map((idea, index) => {
      const x = 180 + (index % 3) * 250;
      const y = 450 + Math.floor(index / 3) * 260;
      return [
        rect(x, y, 230, 240, theme.paper, {
          name: 'Idea cell',
          stroke: theme.ink,
          strokeWidth: 4,
        }),
        rect(x, y, 230, 50, theme.tint, { name: 'Cell head' }),
        text(
          `Week ${Math.floor(index / 3) + 1} · ${['Mon', 'Wed', 'Fri'][index % 3] ?? ''}`,
          x,
          y + 12,
          230,
          {
            fontFamily: BODY,
            fontSize: 22,
            fontWeight: 700,
            fill: theme.ink,
            align: 'center',
          },
        ),
        text(idea, x + 22, y + 80, 190, {
          fontFamily: HEAD,
          fontSize: 32,
          fontWeight: 700,
          fill: theme.ink,
          lineHeight: 1.2,
        }),
      ];
    }),
    star(5, 50, 620, 100, theme.brand, { innerRatio: 0.42 }),
    star(5, 950, 860, 90, theme.ink, { innerRatio: 0.42 }),
    circle(980, 1260, 50, theme.ink),
    icon('arrow-up-right', 956, 1236, 48, theme.paper),
  ]);

export const eventStory = (theme: EventTheme) =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => [
    backdrop(theme, STORY_SIZE.width, STORY_SIZE.height),
    text('Upcoming', 90, 160, 900, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 500,
      fill: theme.paper,
    }),
    text('Demo\nNight', 90, 230, 900, {
      fontFamily: HEAD,
      fontSize: 200,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1,
    }),
    star(5, 820, 140, 170, theme.accent, { innerRatio: 0.42 }),
    rect(90, 720, 900, 640, theme.ink, { name: 'Agenda card', ...shadow(40, 16) }),
    text('Thu, 14 Nov · 6 pm', 140, 780, 800, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: theme.brand,
    }),
    ['Live product walkthrough', 'Founder fireside chat', 'Early access giveaway'].map(
      (item, index) => [
        circle(170, 960 + index * 120, 26, theme.brand),
        text(String(index + 1), 144, 942 + index * 120, 52, {
          fontFamily: HEAD,
          fontSize: 32,
          fontWeight: 800,
          fill: theme.paper,
          align: 'center',
        }),
        text(item, 230, 938 + index * 120, 720, {
          fontFamily: BODY,
          fontSize: 42,
          fontWeight: 600,
          fill: theme.paper,
        }),
      ],
    ),
    pill('Tap to RSVP', 290, 1560, {
      fill: theme.paper,
      color: theme.ink,
      fontSize: 52,
      fontFamily: HEAD,
      fontWeight: 800,
      width: 500,
    }),
    star(5, 80, 1700, 120, theme.paper, { innerRatio: 0.42 }),
  ]);
