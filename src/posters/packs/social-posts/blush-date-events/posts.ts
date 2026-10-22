import {
  circle,
  icon,
  POST_SIZE,
  rect,
  rotateNodes,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface EventPalette {
  brand: string;
  deep: string;
  paper: string;
  muted: string;
}

export const BLUSH: EventPalette = {
  brand: '#ff4f9a',
  deep: '#0f2329',
  paper: '#ffffff',
  muted: '#a7c0c5',
};

export const TANGERINE: EventPalette = {
  brand: '#ff8a3d',
  deep: '#1e1410',
  paper: '#ffffff',
  muted: '#d3bfb2',
};

export const HEAD = 'Urbanist';
export const BODY = 'Inter';
export const { width: W, height: H } = POST_SIZE;

const IDEAS = [
  'Behind the scenes',
  'Client win',
  'Quick tip',
  'Poll your fans',
  'Myth vs fact',
  'Meet the team',
  'Case study',
  'Ask me anything',
  'Weekend offer',
  'Monthly recap',
  'Tool of the week',
  'Launch teaser',
];

const DAYS = ['Mon', 'Wed', 'Fri'];

export const contentCalendar = (p: EventPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    text('Copy our content\ncalendar', 0, 90, W, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: p.brand,
      align: 'center',
      lineHeight: 1.05,
    }),
    text('12 post ideas for your feed', 0, 262, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: p.paper,
      align: 'center',
    }),
    rect(140, 380, 800, 880, '#f4f6f6', {
      cornerRadius: 18,
      name: 'Planner',
      shadow: { color: 'rgba(0,0,0,0.4)', blur: 36, offsetX: 0, offsetY: 14 },
    }),
    Array.from({ length: 10 }, (_, index) =>
      rect(180 + index * 76, 350, 14, 64, '#1f2937', { cornerRadius: 7, name: 'Spiral ring' }),
    ),
    IDEAS.map((idea, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      const x = 180 + column * 246;
      const y = 450 + row * 196;
      return [
        rect(x, y, 226, 176, '#ffffff', {
          cornerRadius: 10,
          stroke: '#111827',
          strokeWidth: 3,
          name: 'Day cell',
        }),
        rect(x, y, 226, 40, row % 2 === column % 2 ? p.brand : '#e5e7eb', {
          cornerRadius: 10,
          name: 'Day header',
        }),
        text(
          `${DAYS[column] ?? 'Mon'} ${String(row * 7 + column * 2 + 3).padStart(2, '0')}`,
          x + 16,
          y + 6,
          200,
          {
            fontFamily: BODY,
            fontSize: 22,
            fontWeight: 700,
            fill: '#111827',
          },
        ),
        text(idea, x + 16, y + 58, 196, {
          fontFamily: HEAD,
          fontSize: 28,
          fontWeight: 800,
          fill: '#111827',
          lineHeight: 1.1,
        }),
        rect(x + 16, y + 140, 120, 10, '#d1d5db', { cornerRadius: 5, name: 'Note line' }),
      ];
    }),
    star(5, 40, 600, 100, p.brand, { innerRatio: 0.45 }),
    star(5, 950, 900, 100, p.brand, { innerRatio: 0.45 }),
    circle(940, 1250, 56, '#111827'),
    icon('arrow-up-right', 912, 1222, 56, p.paper, { strokeWidth: 2.6 }),
  ]);

export const eventDay = (p: EventPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    rotateNodes(-10, 540, 650, [
      rect(180, 330, 720, 640, p.paper, { cornerRadius: 12, name: 'Back card' }),
    ]),
    rotateNodes(-4, 540, 650, [
      rect(180, 330, 720, 640, '#1c3a42', { cornerRadius: 12, name: 'Middle card' }),
    ]),
    rect(190, 360, 720, 640, p.deep, {
      cornerRadius: 12,
      name: 'Front card',
      shadow: { color: 'rgba(0,0,0,0.35)', blur: 30, offsetX: 0, offsetY: 14 },
    }),
    text('Event day', 250, 420, 600, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 600,
      fill: p.brand,
    }),
    text('Mon, 17 March', 250, 470, 640, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: p.paper,
    }),
    text('From 9am to 6pm', 250, 566, 600, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: p.muted,
    }),
    text('Weekly newsletter\nlaunch party', 250, 650, 600, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 800,
      fill: p.brand,
      lineHeight: 1.1,
    }),
    rect(250, 820, 480, 130, p.paper, { cornerRadius: 10, name: 'Signup box' }),
    text('Subscribe for\nmember-only deals', 280, 840, 440, {
      fontFamily: HEAD,
      fontSize: 36,
      fontWeight: 800,
      fill: p.deep,
      lineHeight: 1.1,
    }),
    text('Save your seat today', 90, 120, 900, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: p.deep,
    }),
    star(5, 90, 1130, 90, p.deep, { innerRatio: 0.45 }),
    star(5, 790, 1000, 230, p.paper, { innerRatio: 0.45 }),
  ]);

const MONTH = [
  { day: '01', name: 'Saturday', tag: '' },
  { day: '04', name: 'Tuesday', tag: '' },
  { day: '08', name: 'Saturday', tag: 'Open studio' },
  { day: '13', name: 'Thursday', tag: 'Kindness Day' },
  { day: '17', name: 'Monday', tag: '' },
  { day: '21', name: 'Friday', tag: '' },
  { day: '25', name: 'Tuesday', tag: '' },
  { day: '28', name: 'Friday', tag: 'Big sale' },
  { day: '30', name: 'Sunday', tag: '' },
];

export const monthEvents = (p: EventPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    text('Upcoming', 80, 110, 600, {
      fontFamily: BODY,
      fontSize: 36,
      fontWeight: 500,
      fill: p.muted,
    }),
    text('November Events', 80, 160, 920, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: p.paper,
    }),
    MONTH.map((entry, index) => {
      const x = 80 + (index % 3) * 316;
      const y = 340 + Math.floor(index / 3) * 300;
      const filled = index % 2 === 0;
      return [
        rect(x, y, 290, 270, filled ? p.brand : p.paper, { cornerRadius: 8, name: 'Day tile' }),
        text(entry.day, x + 22, y + 18, 90, {
          fontFamily: HEAD,
          fontSize: 50,
          fontWeight: 800,
          fill: p.deep,
        }),
        text(entry.name, x + 100, y + 34, 180, {
          fontFamily: BODY,
          fontSize: 24,
          fontWeight: 600,
          fill: p.deep,
        }),
        entry.tag === ''
          ? []
          : rotateNodes(-6, x + 40, y + 170, [
              rect(x + 20, y + 150, 250, 70, filled ? p.paper : p.deep, {
                cornerRadius: 6,
                name: 'Event tag',
              }),
              text(entry.tag, x + 20, y + 168, 250, {
                fontFamily: HEAD,
                fontSize: 30,
                fontWeight: 800,
                fill: filled ? p.deep : p.paper,
                align: 'center',
              }),
            ]),
      ];
    }),
    star(5, 930, 60, 110, p.paper, { innerRatio: 0.45 }),
    star(5, 20, 1250, 80, p.brand, { innerRatio: 0.45 }),
  ]);
