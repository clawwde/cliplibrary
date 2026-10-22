import { type Fill, linear, radial } from '@/design';
import {
  circle,
  ellipse,
  icon,
  POST_SIZE,
  path,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const VOLT = {
  black: '#04050b',
  night: '#0a0f24',
  navy: '#0f1a45',
  blue: '#3d7bff',
  sky: '#8ab8ff',
  ice: '#e3edff',
  white: '#ffffff',
  grey: '#9aa3b8',
  mint: '#34d399',
  ink: '#0b1020',
};

export const HEAD = 'Outfit';
export const BODY = 'Inter';
export const { width: W, height: H } = POST_SIZE;
export const CLEAR = 'rgba(0,0,0,0)';
export const SHINE = linear(90, VOLT.sky, VOLT.blue);

export const backdrop = (height: number, glowColor = '#13307a') =>
  rect(0, 0, W, height, linear(180, VOLT.black, VOLT.black, glowColor), { name: 'Background' });

export const words = (
  content: string,
  y: number,
  size: number,
  fill: Fill,
  weight = 700,
  x = 0,
  width: number = W,
  align: 'left' | 'center' = 'center',
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    align,
    lineHeight: 1.05,
  });

const ringArc = (
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  start: number,
  end: number,
  fill: Fill,
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
  return path(data, 0, 0, W, H, fill, POST_SIZE, { name: 'Arc' });
};

export const wifiSpeed = template(W, H, () => [
  backdrop(H),
  ringArc(540, 640, 430, 350, 225, 315, VOLT.white),
  ringArc(540, 640, 310, 230, 225, 315, VOLT.white),
  ringArc(540, 640, 190, 110, 225, 315, VOLT.white),
  poly(
    [
      [528, 646],
      [552, 634],
      [716, 262],
      [700, 254],
    ],
    linear(90, VOLT.blue, VOLT.sky),
    { name: 'Needle', ...shadow(20, 0, VOLT.blue) },
  ),
  circle(540, 640, 44, VOLT.blue, { name: 'Pivot', ...shadow(30, 0, VOLT.blue) }),
  words('Get', 840, 112, VOLT.white, 400, 80, 800, 'left'),
  words('more', 960, 112, VOLT.white, 400, 80, 800, 'left'),
  words('speed', 1080, 128, SHINE, 800, 80, 800, 'left'),
]);

export const automationCard = template(W, H, () => [
  backdrop(H),
  circle(540, 760, 380, radial('rgba(61,123,255,0.45)', CLEAR), { name: 'Glow' }),
  words('The power of', 160, 66, VOLT.white, 400),
  words('Automation', 245, 108, SHINE, 800),
  rect(170, 520, 90, 90, CLEAR, {
    name: 'Float tile',
    cornerRadius: 20,
    stroke: 'rgba(138,184,255,0.6)',
    strokeWidth: 3,
    rotation: 14,
  }),
  rect(830, 930, 70, 70, CLEAR, {
    name: 'Float tile',
    cornerRadius: 16,
    stroke: 'rgba(138,184,255,0.6)',
    strokeWidth: 3,
    rotation: -18,
  }),
  rotateNodes(-10, 540, 760, [
    rect(360, 580, 360, 360, linear(135, VOLT.ice, VOLT.sky, VOLT.blue), {
      name: 'Glow card',
      cornerRadius: 70,
      ...shadow(80, 0, 'rgba(61,123,255,0.9)'),
    }),
    icon('sparkles', 450, 670, 180, VOLT.white, { strokeWidth: 1.6 }),
  ]),
  text('Let the busywork run itself.', 0, 1120, W, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 500,
    fill: VOLT.grey,
    align: 'center',
  }),
]);

const reviewCard = (
  y: number,
  width: number,
  name: string,
  quote: string,
  mark: 'zap' | 'layers' | 'leaf',
  fill: string,
) => {
  const x = (W - width) / 2;
  return [
    rect(x, y, width, 210, fill, {
      name: 'Review card',
      cornerRadius: 28,
      ...shadow(40, 14, 'rgba(0,0,0,0.5)'),
    }),
    rect(x + 32, y + 32, 96, 96, VOLT.navy, { name: 'Logo', cornerRadius: 22 }),
    icon(mark, x + 52, y + 52, 56, VOLT.sky),
    text(name, x + 156, y + 34, 360, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 700,
      fill: VOLT.ink,
    }),
    icon('badge-check', x + 156 + name.length * 19, y + 38, 32, VOLT.blue),
    text('2m ago', x + width - 170, y + 40, 140, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 400,
      fill: '#6b7280',
      align: 'right',
    }),
    text(quote, x + 156, y + 86, width - 200, {
      fontFamily: BODY,
      fontSize: 27,
      fontWeight: 400,
      fill: '#374151',
      lineHeight: 1.35,
    }),
  ];
};

export const clientReviews = template(W, H, () => [
  backdrop(H),
  words('Client', 140, 116, VOLT.white, 800),
  words('Reviews', 255, 116, SHINE, 800),
  icon('square-check', 375, 420, 52, VOLT.sky),
  text('100% Verified', 445, 422, 400, {
    fontFamily: BODY,
    fontSize: 40,
    fontWeight: 500,
    fill: VOLT.white,
  }),
  reviewCard(
    840,
    680,
    'Mosaic Health',
    'Our go-to partner for workflow\nautomation.',
    'leaf',
    '#c9d6f2',
  ),
  reviewCard(
    700,
    740,
    'Corvid Labs',
    'Quick turnaround on every\nsingle request.',
    'layers',
    '#e6edfb',
  ),
  reviewCard(
    560,
    800,
    'Brightwell',
    'Fast delivery, clear updates and\nreal results for our team.',
    'zap',
    VOLT.white,
  ),
  text('Trusted by 2,400+ teams', 0, 1160, W, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: VOLT.grey,
    align: 'center',
  }),
]);

export const aiBeginners = template(W, H, () => [
  backdrop(H),
  icon('video', 380, 122, 42, VOLT.sky),
  text('Online Webinar', 436, 124, 400, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 600,
    fill: VOLT.white,
  }),
  words('AI for', 190, 104, VOLT.white, 800),
  words('Beginners', 295, 104, SHINE, 800),
  text('New to AI but curious where to start?\nLearn the basics from practitioners.', 0, 435, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 400,
    fill: VOLT.grey,
    align: 'center',
    lineHeight: 1.4,
  }),
  rect(290, 580, 500, 580, VOLT.white, {
    name: 'Calendar',
    cornerRadius: 30,
    ...shadow(60, 20, 'rgba(61,123,255,0.45)'),
  }),
  rect(290, 580, 500, 130, linear(90, VOLT.blue, '#2348b8'), {
    name: 'Calendar head',
    cornerRadius: 30,
  }),
  rect(290, 670, 500, 40, '#2c56cf', { name: 'Calendar head base' }),
  Array.from({ length: 6 }, (_, index) =>
    rect(330 + index * 80, 548, 20, 70, '#cbd5e1', { name: 'Ring', cornerRadius: 10 }),
  ),
  text('October', 290, 618, 500, {
    fontFamily: HEAD,
    fontSize: 58,
    fontWeight: 700,
    fill: VOLT.white,
    align: 'center',
  }),
  text('14', 290, 760, 500, {
    fontFamily: HEAD,
    fontSize: 320,
    fontWeight: 800,
    fill: VOLT.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('Thursday, 6 PM GMT', 0, 1210, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 600,
    fill: VOLT.sky,
    align: 'center',
  }),
]);

export const bigWords = (name: string, accent: string, deep: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, VOLT.black, VOLT.black, deep), { name: 'Background' }),
    poly(
      [
        [610, 0],
        [650, 0],
        [600, H],
        [560, H],
      ],
      linear(90, CLEAR, 'rgba(0,0,0,0.6)', CLEAR),
      { name: 'Crease' },
    ),
    text(name, 70, 300, 960, {
      fontFamily: HEAD,
      fontSize: 156,
      fontWeight: 800,
      italic: true,
      fill: VOLT.white,
      lineHeight: 1,
    }),
    text(name, 70, 500, 960, {
      fontFamily: HEAD,
      fontSize: 156,
      fontWeight: 800,
      italic: true,
      fill: CLEAR,
      stroke: 'rgba(255,255,255,0.8)',
      strokeWidth: 3,
      lineHeight: 1,
    }),
    text(name, 70, 700, 960, {
      fontFamily: HEAD,
      fontSize: 156,
      fontWeight: 800,
      italic: true,
      fill: VOLT.white,
      lineHeight: 1,
    }),
    rect(0, 574, 330, 8, linear(90, CLEAR, accent), { name: 'Beam' }),
    circle(380, 578, 66, radial(VOLT.white, accent), {
      name: 'Orb',
      ...shadow(70, 0, accent),
    }),
    ellipse(240, 1180, 600, 120, radial(accent, CLEAR), { name: 'Floor glow' }),
  ]);

export const launchPoster = (height: number) => {
  const dy = (height - H) / 2;
  const puff = (cx: number, cy: number, radius: number) =>
    circle(cx, cy + dy, radius, radial('#c7dbff', VOLT.blue, '#1d3fa8'), { name: 'Smoke' });
  return template(W, height, () => [
    backdrop(height, '#1b3d99'),
    text('New Product', 130, 150 + dy, 500, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 400,
      italic: true,
      fill: VOLT.white,
    }),
    text('LAUNCH', 0, 200 + dy, W, {
      fontFamily: 'Anton',
      fontSize: 270,
      fontWeight: 400,
      italic: true,
      fill: linear(180, VOLT.white, VOLT.sky),
      align: 'center',
      lineHeight: 1,
    }),
    ellipse(490, 860 + dy, 100, 200, linear(180, VOLT.white, VOLT.sky, CLEAR), { name: 'Flame' }),
    poly(
      [
        [470, 640 + dy],
        [370, 800 + dy],
        [380, 900 + dy],
        [475, 820 + dy],
      ],
      linear(180, VOLT.sky, VOLT.blue),
      { name: 'Fin' },
    ),
    poly(
      [
        [610, 640 + dy],
        [710, 800 + dy],
        [700, 900 + dy],
        [605, 820 + dy],
      ],
      linear(180, VOLT.sky, VOLT.blue),
      { name: 'Fin' },
    ),
    ellipse(450, 330 + dy, 180, 560, linear(90, '#b9c8ef', VOLT.white, '#a8b8e6'), {
      name: 'Rocket body',
      ...shadow(40, 0, 'rgba(61,123,255,0.6)'),
    }),
    rect(452, 470 + dy, 176, 26, VOLT.blue, { name: 'Stripe' }),
    circle(540, 590 + dy, 50, VOLT.navy, { name: 'Window', stroke: VOLT.sky, strokeWidth: 12 }),
    rect(528, 760 + dy, 24, 170, VOLT.blue, { name: 'Centre fin', cornerRadius: 12 }),
    text('10.24.27', 720, 520 + dy, 300, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 600,
      italic: true,
      fill: VOLT.white,
    }),
    puff(200, 1240, 110),
    puff(880, 1240, 110),
    puff(330, 1170, 150),
    puff(750, 1170, 150),
    puff(540, 1130, 180),
    puff(430, 1250, 100),
    puff(650, 1250, 100),
  ]);
};
