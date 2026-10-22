import {
  circle,
  icon,
  type Nodes,
  photo,
  pill,
  rating,
  rect,
  rotateNodes,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { DISPLAY, type GrowthPalette, H, HEAD, W } from './posts';

const LETTER_ROWS = [
  ['D', 'N', 'A', 'R'],
  ['G', 'I', 'B', 'N'],
];

export const unscramble = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    text('UNSCRAMBLE THIS', 0, 200, W, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
    }),
    icon('arrow-down', 505, 310, 70, p.brand, { strokeWidth: 3 }),
    LETTER_ROWS.map((row, rowIndex) =>
      row.map((letter, index) => [
        rect(170 + index * 190, 420 + rowIndex * 190, 160, 160, p.brand, {
          cornerRadius: 30,
          name: 'Letter tile',
        }),
        text(letter, 170 + index * 190, 452 + rowIndex * 190, 160, {
          fontFamily: HEAD,
          fontSize: 84,
          fontWeight: 800,
          fill: '#ffffff',
          align: 'center',
          lineHeight: 1,
        }),
      ]),
    ),
    text('COMMENT BELOW:', 0, 880, W, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
    }),
    Array.from({ length: 8 }, (_, index) =>
      circle(190 + index * 100, 1030, 36, '#ffffff', { stroke: p.brand, strokeWidth: 4 }),
    ),
    text('Hint: every brand needs it', 0, 1140, W, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 500,
      fill: '#9ca3af',
      align: 'center',
    }),
    star(5, 900, 90, 90, p.accent, { innerRatio: 0.45 }),
  ]);

const toggle = (y: number, label: string, p: GrowthPalette, on: boolean): Nodes[] => [
  rect(80, y, 620, 110, on ? p.ink : '#ffffff', { cornerRadius: 55, name: 'Toggle row' }),
  text(label, 130, y + 30, 440, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 700,
    fill: on ? '#ffffff' : p.brand,
  }),
  circle(640, y + 55, 38, on ? '#ffffff' : p.ink),
];

export const toggleBoost = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    toggle(150, 'More visibility', p, true),
    toggle(300, 'More results', p, true),
    toggle(450, 'More engagement', p, true),
    toggle(600, 'Get started', p, false),
    text('SOCIAL MEDIA\nMANAGEMENT', 80, 1040, 920, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'right',
      lineHeight: 1.05,
    }),
    star(5, 860, 220, 140, p.accent, { innerRatio: 0.45 }),
    icon('mouse', 680, 680, 90, '#ffffff', { strokeWidth: 2 }),
  ]);

export const dontCheck = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    photo('woman-portrait-4', 320, 0, 760, H),
    text("DON'T CHECK", 30, 1300, 1260, {
      fontFamily: DISPLAY,
      fontSize: 118,
      fontWeight: 400,
      fill: 'rgba(0,0,0,0)',
      stroke: '#ffffff',
      strokeWidth: 3,
      rotation: -90,
    }),
    text('THE COMMENTS', 170, 1300, 1260, {
      fontFamily: DISPLAY,
      fontSize: 118,
      fontWeight: 400,
      fill: '#ffffff',
      rotation: -90,
    }),
    pill('Brightwave Studio', 700, 80, {
      fill: p.ink,
      color: '#ffffff',
      fontSize: 28,
      fontFamily: HEAD,
      fontWeight: 700,
    }),
  ]);

export const reviewWall = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    text('REV', 40, 40, 1000, {
      fontFamily: DISPLAY,
      fontSize: 340,
      fontWeight: 400,
      fill: p.brand,
      lineHeight: 1,
    }),
    text('IEW', 40, 930, 1000, {
      fontFamily: DISPLAY,
      fontSize: 340,
      fontWeight: 400,
      fill: p.brand,
      align: 'right',
      lineHeight: 1,
    }),
    rotateNodes(-90, 980, 860, [
      pill('#REVIEW', 980, 860, {
        fill: p.paper,
        color: p.ink,
        fontSize: 34,
        fontFamily: HEAD,
        fontWeight: 800,
      }),
    ]),
    rect(150, 470, 780, 380, '#ffffff', {
      cornerRadius: 24,
      name: 'Review card',
      shadow: { color: 'rgba(0,0,0,0.5)', blur: 40, offsetX: 0, offsetY: 16 },
    }),
    circle(240, 560, 46, p.brand),
    icon('user', 216, 536, 48, '#ffffff'),
    text('Jordan Ellis', 310, 520, 560, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 700,
      fill: p.ink,
    }),
    rating(310, 578, 34, 5, p.accent, 0.2),
    text(
      'Our feed finally looks like one brand. Bookings went up within the first month.',
      200,
      660,
      680,
      {
        fontFamily: HEAD,
        fontSize: 32,
        fontWeight: 500,
        fill: '#374151',
        lineHeight: 1.4,
      },
    ),
    star(5, 860, 380, 120, p.paper, { innerRatio: 0.45 }),
    star(5, 90, 900, 80, p.paper, { innerRatio: 0.45 }),
  ]);

const WALKERS = [130, 160, 120, 170, 140, 150, 125, 165];

export const stopCreating = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.paper, { name: 'Background' }),
    text('Digital Marketing', 90, 110, 800, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 500,
      fill: p.ink,
    }),
    text('STOP', 90, 260, 900, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: p.ink,
    }),
    text('CREATING', 90, 390, 900, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: p.brand,
    }),
    text('ONE POST', 90, 520, 900, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: p.ink,
    }),
    text('A DAY', 90, 650, 500, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: p.brand,
    }),
    text('in 2026.', 500, 712, 300, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 600,
      fill: p.ink,
    }),
    WALKERS.map((size, index) => {
      const cx = 150 + index * 112;
      return [
        rect(cx - size * 0.15, 1220 - size * 1.3, size * 0.3, size * 0.8, p.ink, {
          cornerRadius: size * 0.1,
          name: 'Walker body',
        }),
        rect(cx - size * 0.12, 1220 - size * 0.55, size * 0.1, size * 0.55, p.ink, {
          name: 'Walker leg',
        }),
        rect(cx + size * 0.02, 1220 - size * 0.55, size * 0.1, size * 0.55, p.ink, {
          name: 'Walker leg',
        }),
        circle(cx, 1220 - size * 1.45, size * 0.14, index === 5 ? p.brand : p.ink),
      ];
    }),
    rect(80, 1226, 920, 4, '#d1d5db', { name: 'Ground' }),
    star(5, 880, 90, 110, p.brand, { innerRatio: 0.45 }),
  ]);
