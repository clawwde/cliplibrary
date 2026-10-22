import { linear } from '@/design';
import { circle, icon, photo, poly, rect, rotateNodes, shadow, template, text } from '../../../kit';
import { bold, button, copy, display, FH, H, handle, script, W } from './posts';

export const marketInsights = template(W, H, () => [
  rect(0, 0, W, H, linear(180, FH.cream, FH.mustardSoft), { name: 'Background' }),
  script('Receive latest', 0, 90, W, 84, FH.forest, { align: 'center' }),
  text('Market', 0, 170, W, {
    fontFamily: 'Archivo Black',
    fontSize: 230,
    fontWeight: 400,
    fill: FH.forest,
    align: 'center',
    lineHeight: 1,
  }),
  script('insights', 600, 400, 400, 80, FH.mustardDark, { align: 'right' }),
  circle(540, 820, 320, FH.mustard, { name: 'Halo' }),
  photo('woman-portrait-6', 250, 530, 580, 580, { cornerRadius: 290 }),
  icon('corner-down-right', 250, 1150, 80, FH.forest, { strokeWidth: 2.4 }),
  bold('Comment "MARKET"', 350, 1160, 600, 32, FH.forest),
  copy('to get the full report', 350, 1202, 600, 28, FH.ink),
]);

const PRIZES = [
  '10% OFF',
  'FREE CALL',
  'AD CREDIT',
  'TOTE BAG',
  'AUDIT',
  'BONUS',
  'GIFT CARD',
  'FREE PLAN',
] as const;

const CX = 790;
const CY = 560;
const RADIUS = 255;

const wedge = (index: number) => {
  const start = index * 45 - 112.5;
  const points = Array.from({ length: 6 }, (_, step) => {
    const angle = ((start + step * 9) * Math.PI) / 180;
    return [CX + Math.cos(angle) * RADIUS, CY + Math.sin(angle) * RADIUS] as const;
  });
  return poly([[CX, CY], ...points], index % 2 === 0 ? FH.forest : FH.cream, { name: 'Wedge' });
};

export const spinWheel = template(W, H, () => [
  rect(0, 0, W, H, FH.mustard, { name: 'Background' }),
  display('DID\nYOU\nSPIN?', 70, 170, 600, 240, FH.forest, { lineHeight: 0.92 }),
  circle(CX, CY, RADIUS + 18, FH.cream, {
    name: 'Wheel rim',
    ...shadow(40, 16, 'rgba(19,48,36,0.3)'),
  }),
  PRIZES.map((_, index) => wedge(index)),
  PRIZES.map((prize, index) =>
    rotateNodes(index * 45 - 90, CX, CY, [
      bold(prize, CX + 66, CY - 14, 170, 24, index % 2 === 0 ? FH.cream : FH.forest, {
        align: 'center',
      }),
    ]),
  ),
  circle(CX, CY, 42, FH.mustard, { name: 'Hub' }),
  circle(CX, CY, 16, FH.deep, { name: 'Hub pin' }),
  poly(
    [
      [CX - 26, CY - RADIUS - 40],
      [CX + 26, CY - RADIUS - 40],
      [CX, CY - RADIUS + 14],
    ],
    FH.deep,
    { name: 'Pointer' },
  ),
  copy(
    'Spin to win a free strategy call,\nad credits or a full brand audit.',
    70,
    930,
    940,
    36,
    FH.deep,
    {
      fontWeight: 500,
    },
  ),
  button('Spin Now', 70, 1070, FH.forest, FH.cream),
  handle(1250, FH.deep),
]);

const label = (
  content: string,
  x: number,
  y: number,
  width: number,
  fill: string,
  color: string,
  angle: number,
) =>
  rotateNodes(angle, x + width / 2, y + 80, [
    rect(x, y, width, 160, fill, { cornerRadius: 22, name: `${content} label` }),
    display(content, x, y + 14, width, 136, color, { align: 'center' }),
  ]);

export const mythFact = template(W, H, () => [
  rect(0, 0, W, H, FH.cream, { name: 'Background' }),
  label('MYTH', 90, 120, 430, FH.forest, FH.cream, -4),
  script('or', 560, 190, 120, 90, FH.forest),
  label('FACT', 470, 310, 460, FH.mustard, FH.forest, 3),
  button('MYTH', 90, 600, FH.forest, FH.cream),
  copy('Marketing is just running ads.', 90, 690, 900, 44, FH.ink, { fontWeight: 500 }),
  rect(90, 810, 900, 3, 'rgba(31,74,54,0.2)', { name: 'Divider' }),
  button('FACT', 90, 860, FH.mustard, FH.deep),
  copy('Marketing builds lasting\ncustomer relationships.', 90, 950, 900, 44, FH.ink, {
    fontWeight: 700,
  }),
  handle(1250, FH.grey),
]);

const OPTIONS = ['Revenue', 'Clicks', 'Hype', 'Views'] as const;

export const quizTime = template(W, H, () => [
  rect(0, 0, W, H, FH.cream, { name: 'Background' }),
  Array.from({ length: 80 }, (_, index) => {
    const column = index % 8;
    const row = Math.floor(index / 8);
    return (column + row) % 2 === 0
      ? rect(column * 135, row * 135, 135, 135, FH.forest, { name: 'Check' })
      : [];
  }),
  rect(150, 240, 780, 900, FH.cream, {
    cornerRadius: 44,
    name: 'Quiz card',
    ...shadow(50, 20, 'rgba(0,0,0,0.3)'),
  }),
  display('QUIZ', 200, 290, 400, 230, FH.forest),
  rotateNodes(-6, 690, 400, [
    rect(580, 350, 230, 100, FH.mustard, { cornerRadius: 16, name: 'Time tag' }),
    display('TIME', 580, 362, 230, 80, FH.forest, { align: 'center' }),
  ]),
  bold('Effective marketing\ndrives long-term', 200, 560, 700, 42, FH.ink),
  rect(200, 680, 320, 5, FH.forest, { cornerRadius: 3, name: 'Blank' }),
  OPTIONS.map((option, index) => {
    const y = 740 + index * 92;
    return [
      circle(236, y + 32, 32, FH.mustard),
      bold(String.fromCharCode(97 + index), 204, y + 14, 64, 30, FH.deep, { align: 'center' }),
      rect(290, y, 580, 64, FH.forest, { cornerRadius: 32, name: 'Option' }),
      bold(option, 290, y + 16, 580, 28, FH.cream, { align: 'center' }),
    ];
  }),
]);
