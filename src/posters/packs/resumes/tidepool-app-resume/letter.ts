import { linear } from '@/design';
import {
  avatar,
  CARD_SIZE,
  ellipse,
  icon,
  line,
  path,
  poly,
  rect,
  template,
  text,
} from '../../../kit';
import { BODY, HEAD, LETTER, TIDE } from './resume';

const LETTER_BODY = [
  'Hiring Team\nNorthbeam Health\n1200 Pier Street\nPortland, OR 97209',
  'Hello Northbeam team,',
  'I am excited to apply for the Senior Product Designer role. For eight years I have shaped mobile products that people open every day, from booking flows to habit trackers, always starting from real conversations with customers.',
  'At Harbor Health I led the redesign of our patient app, cutting onboarding time by 35% and lifting task success to 92%. I also built the design system that now powers four product teams.',
  'Your focus on calm, human healthcare tools is exactly the kind of work I want to do next. I would love to talk about how I can help the team ship with clarity and care.',
  'Warm regards,\nMaya Linden',
].join('\n\n');

const contactRows = [
  { icon: 'phone', label: '(555) 210-4477' },
  { icon: 'mail', label: 'maya@linden.studio' },
  { icon: 'map-pin', label: '48 Harbor Lane' },
] as const;

export const coverLetter = template(LETTER.width, LETTER.height, () => [
  rect(0, 0, LETTER.width, LETTER.height, TIDE.paper, { name: 'Background' }),
  rect(0, 0, LETTER.width, 320, TIDE.card, { name: 'Header' }),
  text('Maya', 110, 70, 420, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: TIDE.ink,
    lineHeight: 1,
  }),
  text('Linden', 110, 162, 420, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 400,
    fill: TIDE.ink,
    lineHeight: 1,
  }),
  text('Product Designer', 110, 266, 420, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: TIDE.teal,
  }),
  avatar('woman-portrait-4', 640, 165, 92, '#ffffff'),
  contactRows.map((row, index) => [
    icon(row.icon, 820, 100 + index * 60, 30, TIDE.deep, { strokeWidth: 2.2 }),
    text(row.label, 868, 102 + index * 60, 360, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 500,
      fill: TIDE.ink,
    }),
  ]),
  line(0, 320, LETTER.width, TIDE.grey, 3),
  text('Application Sent', 0, 370, LETTER.width, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 700,
    fill: TIDE.muted,
    align: 'center',
  }),
  text('March 12, 2026', 0, 410, LETTER.width, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 400,
    fill: TIDE.muted,
    align: 'center',
  }),
  poly(
    [
      [1080, 1440],
      [1150, 1440],
      [1170, 1500],
      [1110, 1478],
    ],
    '#0c8a79',
    { name: 'Bubble tail' },
  ),
  rect(150, 480, 990, 1000, linear(160, TIDE.teal, '#0c8a79'), {
    cornerRadius: 36,
    name: 'Message bubble',
  }),
  text(LETTER_BODY, 200, 530, 890, {
    fontFamily: BODY,
    fontSize: 27,
    fontWeight: 400,
    fill: '#ffffff',
    lineHeight: 1.5,
  }),
  text('Delivered', 800, 1520, 340, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 700,
    fill: TIDE.muted,
    align: 'right',
  }),
]);

const { width: CW, height: CH } = CARD_SIZE;

const hills = (x: number, y: number, width: number, height: number) => [
  path('M0 60 Q 160 0 330 46 T 700 40 L700 100 L0 100 Z', x, y, width, height, '#7fd1bf', {
    width: 700,
    height: 100,
  }),
  path('M0 80 Q 200 40 400 74 T 700 66 L700 100 L0 100 Z', x, y, width, height, TIDE.teal, {
    width: 700,
    height: 100,
  }),
];

const clouds = (x: number, y: number, scale: number) => [
  ellipse(x, y, 120 * scale, 40 * scale, '#ffffff', { name: 'Cloud' }),
  ellipse(x + 30 * scale, y - 22 * scale, 64 * scale, 50 * scale, '#ffffff', { name: 'Cloud' }),
];

export const cardFront = template(CW, CH, () => [
  rect(0, 0, CW, CH, TIDE.paper, { name: 'Background' }),
  rect(0, 0, CW, 260, linear(180, '#bfe9f2', '#e7f7f3'), { name: 'Sky' }),
  clouds(110, 80, 1),
  clouds(780, 60, 0.8),
  ellipse(880, 120, 60, 60, '#ffb199', { name: 'Sun' }),
  hills(0, 170, CW, 90),
  avatar('woman-portrait-4', CW / 2, 250, 92, '#ffffff'),
  text('Maya Linden', 0, 370, CW, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 800,
    fill: TIDE.ink,
    align: 'center',
  }),
  rect(CW / 2 - 150, 466, 300, 60, TIDE.deep, { cornerRadius: 30, name: 'Role pill' }),
  text('Product Designer', CW / 2 - 150, 481, 300, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  rect(0, CH - 14, CW, 14, TIDE.teal, { name: 'Edge' }),
]);

export const cardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, TIDE.paper, { name: 'Background' }),
  rect(0, 0, 340, CH, linear(180, '#bfe9f2', '#e7f7f3'), { name: 'Sky' }),
  clouds(50, 110, 0.9),
  clouds(190, 230, 0.6),
  hills(0, 430, 340, 170),
  avatar('woman-portrait-4', 340, 200, 96, '#ffffff'),
  text('Maya Linden', 470, 70, 560, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 800,
    fill: TIDE.ink,
  }),
  rect(470, 148, 270, 50, TIDE.deep, { cornerRadius: 25, name: 'Role pill' }),
  text('Product Designer', 470, 160, 270, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  (
    [
      { icon: 'phone', label: 'mobile', value: '(555) 210-4477' },
      { icon: 'mail', label: 'email', value: 'maya@linden.studio' },
      { icon: 'map-pin', label: 'studio', value: '48 Harbor Lane' },
    ] as const
  ).map((row, index) => {
    const y = 250 + index * 110;
    return [
      icon(row.icon, 470, y + 20, 36, TIDE.deep, {
        strokeWidth: 2.2,
      }),
      text(row.label, 530, y, 460, {
        fontFamily: BODY,
        fontSize: 20,
        fontWeight: 500,
        fill: TIDE.muted,
      }),
      text(row.value, 530, y + 28, 460, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: TIDE.ink,
      }),
      line(470, y + 88, 540, TIDE.grey, 2),
    ];
  }),
  rect(0, CH - 14, CW, 14, TIDE.teal, { name: 'Edge' }),
]);
