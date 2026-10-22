import { type DesignIconName, linear } from '@/design';
import { circle, icon, POST_SIZE, path, poly, rect, template, text } from '../../../kit';

const { width: W, height: H } = POST_SIZE;
export const FONT = 'Outfit';
export const WINE = '#4a1030';
export const MINT = '#a7f3d0';
export const LEAF = '#10b981';
export const BLUSH = '#f5d0e0';
export const DEEP = linear(180, '#5c1a3f', '#2a0819');
export const SITE = 'harborline.co';

const tabFromRight = (y: number, width: number, height: number, fill: string) =>
  path(
    `M${width} 0 H${height / 2} A${height / 2} ${height / 2} 0 0 0 ${height / 2} ${height} H${width} Z`,
    W - width,
    y,
    width,
    height,
    fill,
    { width, height },
    { name: 'Tab' },
  );

const tabFromLeft = (y: number, width: number, height: number, fill: string) =>
  path(
    `M0 0 H${width - height / 2} A${height / 2} ${height / 2} 0 0 1 ${width - height / 2} ${height} H0 Z`,
    0,
    y,
    width,
    height,
    fill,
    { width, height },
    { name: 'Tab' },
  );

const ring = (corner: 'left' | 'right') =>
  path(
    corner === 'right'
      ? 'M680 0 A400 400 0 0 0 1080 400 L1080 250 A250 250 0 0 1 830 0 Z'
      : 'M400 0 A400 400 0 0 1 0 400 L0 250 A250 250 0 0 0 250 0 Z',
    0,
    0,
    W,
    H,
    MINT,
    { width: W, height: H },
    { name: 'Quarter ring' },
  );

export const leversCover = template(W, H, () => [
  rect(0, 0, W, H, '#ffffff', { name: 'Background' }),
  text('SALES PLAYBOOK', 90, 300, 700, {
    fontFamily: FONT,
    fontSize: 30,
    fontWeight: 700,
    fill: WINE,
    letterSpacing: 3,
  }),
  text('How to\nGrow Repeat\nRevenue', 90, 360, 780, {
    fontFamily: FONT,
    fontSize: 108,
    fontWeight: 800,
    fill: WINE,
    lineHeight: 1.1,
  }),
  tabFromRight(560, 220, 150, MINT),
  circle(990, 635, 44, WINE),
  icon('chevron-right', 966, 611, 48, '#ffffff', { strokeWidth: 3 }),
  text(SITE, 490, 1200, 500, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 600,
    fill: WINE,
    align: 'right',
  }),
]);

const lever = (dark: boolean, number: string, title: string, body: string, mark: DesignIconName) =>
  template(W, H, () => [
    rect(0, 0, W, H, dark ? DEEP : '#ffffff', { name: 'Background' }),
    ring(dark ? 'right' : 'left'),
    dark
      ? icon(mark, 800, 180, 100, WINE, { strokeWidth: 2.25 })
      : text(number, 130, 178, 200, {
          fontFamily: FONT,
          fontSize: 84,
          fontWeight: 800,
          fill: WINE,
          align: 'center',
        }),
    dark ? tabFromLeft(600, 200, 120, MINT) : tabFromRight(600, 200, 120, MINT),
    dark
      ? text(number, 40, 620, 120, {
          fontFamily: FONT,
          fontSize: 66,
          fontWeight: 800,
          fill: WINE,
        })
      : icon(mark, 940, 630, 60, WINE, { strokeWidth: 2.25 }),
    text(title, dark ? 240 : 90, 600, 760, {
      fontFamily: FONT,
      fontSize: 72,
      fontWeight: 800,
      fill: dark ? '#ffffff' : WINE,
      lineHeight: 1.1,
    }),
    text(body, dark ? 240 : 90, 800, 760, {
      fontFamily: FONT,
      fontSize: 46,
      fontWeight: 400,
      fill: dark ? BLUSH : '#57534e',
      lineHeight: 1.35,
    }),
  ]);

export const LEVER_STEPS = [
  lever(
    true,
    '01',
    'Track What\nCounts',
    'Measure repeat orders and lifetime value, not just first sales.',
    'target',
  ),
  lever(
    false,
    '02',
    'Sharpen\nYour Offer',
    'Confused buyers stall. A crisp promise makes saying yes easy.',
    'message-circle',
  ),
  lever(
    true,
    '03',
    'Know Your\nBuyer',
    'Learn what they fear, want and compare you against before you pitch.',
    'users',
  ),
] as const;

const wave = (y: number) =>
  path(
    'M0 70 C 180 10, 360 130, 540 70 S 900 10, 1080 60',
    0,
    y,
    W,
    140,
    'rgba(0,0,0,0)',
    { width: W, height: 140 },
    { name: 'Wave', stroke: '#ffffff', strokeWidth: 5, dashed: true },
  );

export const waveCover = template(W, H, () => [
  rect(0, 0, W, H, DEEP, { name: 'Background' }),
  text('3', 0, 200, W, {
    fontFamily: FONT,
    fontSize: 320,
    fontWeight: 800,
    fill: MINT,
    align: 'center',
    lineHeight: 1,
  }),
  text('Habits That Build', 0, 560, W, {
    fontFamily: FONT,
    fontSize: 60,
    fontWeight: 400,
    fill: '#ffffff',
    align: 'center',
  }),
  text('Loyal Customers', 0, 636, W, {
    fontFamily: FONT,
    fontSize: 60,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  wave(800),
  rect(410, 820, 260, 100, MINT, { name: 'Arrow pill', cornerRadius: 50 }),
  icon('arrow-right', 510, 840, 60, WINE, { strokeWidth: 2.75 }),
  text(SITE, 0, 1180, W, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
]);

const waveStep = (number: string, title: string, body: string, mark: DesignIconName) =>
  template(W, H, () => [
    rect(0, 0, W, H, DEEP, { name: 'Background' }),
    text(number, 0, 680, W, {
      fontFamily: FONT,
      fontSize: 560,
      fontWeight: 800,
      fill: 'rgba(255,255,255,0.06)',
      align: 'center',
      lineHeight: 1,
    }),
    text(title, 60, 300, 960, {
      fontFamily: FONT,
      fontSize: 70,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text(body, 140, 400, 800, {
      fontFamily: FONT,
      fontSize: 46,
      fontWeight: 400,
      fill: BLUSH,
      align: 'center',
      lineHeight: 1.35,
    }),
    wave(900),
    rect(465, 780, 150, 150, MINT, { name: 'Icon badge', cornerRadius: 34 }),
    poly(
      [
        [520, 928],
        [560, 928],
        [540, 960],
      ],
      MINT,
      { name: 'Badge pointer' },
    ),
    icon(mark, 498, 813, 84, WINE, { strokeWidth: 2.25 }),
  ]);

export const WAVE_STEPS = [
  waveStep(
    '01',
    'Show Up Often',
    'Stay visible with helpful posts, emails and quick check-ins.',
    'megaphone',
  ),
  waveStep(
    '02',
    'Close the Loop',
    'Ask for feedback after every order and act on it fast.',
    'search',
  ),
  waveStep('03', 'Reward Return Visits', 'A simple perk makes the second order feel easy.', 'gift'),
] as const;
