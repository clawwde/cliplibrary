import { type Fill, linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
  laptop,
  POST_SIZE,
  path,
  poly,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const TIDE = {
  night: '#031716',
  deep: '#06302e',
  sea: '#0b4f4a',
  teal: '#0fa596',
  aqua: '#5eead4',
  mist: '#e9f4f2',
  ink: '#0a1f1e',
  grey: '#9fb8b4',
  amber: '#ffcf5a',
  white: '#ffffff',
};

export const HEAD = 'Plus Jakarta Sans';
export const BODY = 'Inter';
export const { width: W, height: H } = POST_SIZE;

export const brandMark = (
  x: number,
  y: number,
  width: number,
  color: string,
  align: 'left' | 'center' | 'right' = 'left',
) =>
  text('TIDELINE SYSTEMS', x, y, width, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 800,
    fill: color,
    align,
    letterSpacing: 3,
  });

export const ringArc = (
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  start: number,
  end: number,
  fill: Fill,
  view: { width: number; height: number } = POST_SIZE,
) => {
  const point = (radius: number, degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return `${(cx + radius * Math.cos(radians)).toFixed(1)} ${(cy + radius * Math.sin(radians)).toFixed(1)}`;
  };
  const large = end - start > 180 ? 1 : 0;
  const data = [
    `M ${point(outer, start)}`,
    `A ${outer} ${outer} 0 ${large} 1 ${point(outer, end)}`,
    `L ${point(inner, end)}`,
    `A ${inner} ${inner} 0 ${large} 0 ${point(inner, start)}`,
    'Z',
  ].join(' ');
  return path(data, 0, 0, view.width, view.height, fill, view, { name: 'Arc' });
};

export const eventsBoard = template(W, H, () => [
  rect(0, 0, W, H, TIDE.mist, { name: 'Background' }),
  ringArc(1080, 0, 360, 280, 90, 180, 'rgba(15,165,150,0.16)'),
  ringArc(1080, 0, 240, 200, 90, 180, 'rgba(15,165,150,0.22)'),
  text('Upcoming', 80, 100, 900, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 800,
    fill: TIDE.ink,
    lineHeight: 1,
  }),
  text('Events', 80, 230, 900, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 800,
    fill: TIDE.teal,
    lineHeight: 1,
  }),
  [
    { date: '04/14', title: 'Platform Release Live', dark: false },
    { date: '05/02', title: 'Partner Summit Recap', dark: true },
    { date: '06/19', title: 'Pricing Clinic Q&A', dark: true },
    { date: '07/08', title: 'RevOps Roundtable', dark: false },
  ].map((event, index) => {
    const x = 80 + (index % 2) * 480;
    const y = 430 + Math.floor(index / 2) * 370;
    return [
      rect(x, y, 440, 340, event.dark ? TIDE.deep : linear(150, TIDE.teal, TIDE.sea), {
        name: 'Event card',
        cornerRadius: 28,
      }),
      text(event.date, x + 36, y + 36, 300, {
        fontFamily: HEAD,
        fontSize: 48,
        fontWeight: 800,
        fill: TIDE.white,
      }),
      icon('arrow-up-right', x + 360, y + 40, 44, TIDE.aqua),
      text(event.title, x + 36, y + 116, 370, {
        fontFamily: HEAD,
        fontSize: 32,
        fontWeight: 700,
        fill: TIDE.white,
        lineHeight: 1.2,
      }),
      text('Join the team for a live walkthrough and open questions.', x + 36, y + 210, 370, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 400,
        fill: 'rgba(255,255,255,0.78)',
        lineHeight: 1.4,
      }),
    ];
  }),
  rect(80, 1200, 280, 72, TIDE.ink, { name: 'Link pill', cornerRadius: 36 }),
  text('tideline.io', 80, 1219, 280, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: TIDE.white,
    align: 'center',
  }),
  brandMark(560, 1222, 440, TIDE.ink, 'right'),
]);

export const analyticsBars = template(W, H, () => [
  rect(0, 0, W, H, linear(165, TIDE.sea, TIDE.night), { name: 'Background' }),
  brandMark(80, 80, 600, TIDE.white),
  [180, 230, 290, 340, 400, 460].map((height, index) => {
    const x = 150 + index * 135;
    const top = 720 - height;
    return [
      rect(x, top, 80, height, linear(180, 'rgba(94,234,212,0.9)', 'rgba(94,234,212,0)'), {
        name: 'Bar',
        cornerRadius: 40,
      }),
      circle(x + 40, top + 40, 40, TIDE.white, {
        name: 'Bar cap',
        ...shadow(40, 0, 'rgba(94,234,212,0.9)'),
      }),
    ];
  }),
  text('Turn Pipeline Data\ninto Confident\nDecisions.', 80, 790, 900, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: TIDE.white,
    lineHeight: 1.1,
  }),
  text('See how revenue teams read signals\nand act on them faster.', 80, 1070, 760, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 400,
    fill: TIDE.aqua,
    lineHeight: 1.4,
  }),
  icon('arrow-right', 900, 1180, 96, TIDE.aqua, { strokeWidth: 2.5 }),
]);

export const aiSearch = template(W, H, () => [
  rect(0, 0, W, H, linear(180, TIDE.night, '#041f1d'), { name: 'Background' }),
  ringArc(540, 2000, 1010, 930, 238, 302, linear(90, 'rgba(15,165,150,0)', TIDE.teal, TIDE.aqua)),
  ringArc(540, 2000, 900, 880, 240, 300, 'rgba(94,234,212,0.35)'),
  text('AI is rewriting the', 0, 330, W, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 700,
    fill: TIDE.white,
    align: 'center',
  }),
  text('B2B playbook', 0, 420, W, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 700,
    fill: TIDE.aqua,
    align: 'center',
  }),
  rect(150, 600, 780, 96, 'rgba(255,255,255,0.06)', {
    name: 'Search bar',
    cornerRadius: 48,
    stroke: 'rgba(255,255,255,0.7)',
    strokeWidth: 3,
  }),
  text('How do we stay ahead of the shift?', 200, 628, 620, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 400,
    fill: TIDE.white,
  }),
  icon('search', 850, 626, 44, TIDE.white),
  icon('arrow-right', 940, 1226, 64, TIDE.aqua, { strokeWidth: 2.5 }),
  brandMark(0, 1240, W, TIDE.white, 'center'),
]);

export const websiteLive = template(W, H, () => [
  rect(0, 0, W, H, linear(180, TIDE.night, TIDE.deep), { name: 'Background' }),
  brandMark(0, 80, W, TIDE.white, 'center'),
  text('New Website', 0, 160, W, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: TIDE.white,
    align: 'center',
  }),
  text('is now live', 0, 280, W, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: TIDE.aqua,
    align: 'center',
  }),
  rect(240, 450, 600, 96, 'rgba(15,165,150,0.22)', {
    name: 'Address box',
    stroke: TIDE.aqua,
    strokeWidth: 3,
  }),
  [
    [234, 444],
    [834, 444],
    [234, 540],
    [834, 540],
  ].map(([x = 0, y = 0]) => rect(x, y, 12, 12, TIDE.white, { name: 'Handle' })),
  text('tideline.io', 240, 472, 600, {
    fontFamily: BODY,
    fontSize: 44,
    fontWeight: 600,
    fill: TIDE.white,
    align: 'center',
  }),
  poly(
    [
      [820, 520],
      [820, 590],
      [838, 574],
      [852, 604],
      [866, 598],
      [852, 568],
      [876, 568],
    ],
    TIDE.white,
    { name: 'Cursor', stroke: TIDE.ink, strokeWidth: 3 },
  ),
  ellipse(180, 1040, 720, 120, 'rgba(94,234,212,0.18)', { name: 'Glow' }),
  laptop(250, 680, 580, {
    body: '#1b2b2a',
    content: [
      rect(0, 0, 551, 331, linear(180, '#7dd3fc', '#e0f7f4'), { name: 'Sky' }),
      ellipse(330, 50, 120, 40, 'rgba(255,255,255,0.9)', { name: 'Cloud' }),
      poly(
        [
          [0, 220],
          [180, 170],
          [360, 210],
          [551, 160],
          [551, 331],
          [0, 331],
        ],
        '#3f9b5c',
        { name: 'Hill' },
      ),
      poly(
        [
          [0, 280],
          [260, 230],
          [551, 270],
          [551, 331],
          [0, 331],
        ],
        '#2f7a47',
        { name: 'Hill' },
      ),
    ],
  }),
  text('Explore the new experience', 0, 1170, W, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: TIDE.grey,
    align: 'center',
  }),
]);

export const skillPoll = template(W, H, () => [
  rect(0, 0, W, H, linear(180, TIDE.white, TIDE.mist), { name: 'Background' }),
  brandMark(70, 70, 500, TIDE.ink),
  text('TIDELINE.IO', 560, 74, 450, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: TIDE.sea,
    align: 'right',
    letterSpacing: 2,
  }),
  rect(370, 180, 340, 84, linear(90, TIDE.teal, TIDE.sea), {
    name: 'Poll tag',
    cornerRadius: 12,
  }),
  text('Quick Poll', 370, 197, 340, {
    fontFamily: HEAD,
    fontSize: 42,
    fontWeight: 700,
    fill: TIDE.white,
    align: 'center',
  }),
  text('Which Skill Drives\nB2B Growth Most?', 0, 310, W, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 800,
    fill: TIDE.ink,
    align: 'center',
    lineHeight: 1.15,
  }),
  ['Account Planning', 'Content Strategy', 'Data Storytelling', 'Partner Selling'].map(
    (option, index) => {
      const y = 560 + index * 130;
      return [
        rect(200, y, 680, 100, TIDE.white, {
          name: 'Option',
          cornerRadius: 18,
          stroke: '#cfe3df',
          strokeWidth: 2,
          ...shadow(20, 6, 'rgba(10,31,30,0.08)'),
        }),
        icon('square-check', 236, y + 28, 44, TIDE.teal),
        text(option, 306, y + 29, 540, {
          fontFamily: BODY,
          fontSize: 36,
          fontWeight: 500,
          fill: TIDE.ink,
        }),
      ];
    },
  ),
  circle(540, 1170, 54, TIDE.teal, { name: 'Vote button' }),
  icon('arrow-down', 510, 1140, 60, TIDE.white, { strokeWidth: 2.5 }),
]);
