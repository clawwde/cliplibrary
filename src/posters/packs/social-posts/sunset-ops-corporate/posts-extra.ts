import { linear, radial } from '@/design';
import {
  checklist,
  circle,
  group,
  type Nodes,
  POST_SIZE,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { darkBackdrop, HEAD, orangeBackdrop, SUNSET } from './posts';

const { width: W, height: H } = POST_SIZE;

const stagesArt = (height: number): Nodes[] => {
  const top = (height - H) / 2;
  return [
    darkBackdrop(height),
    circle(
      540,
      top + 720,
      470,
      radial('rgba(255,106,26,0.55)', 'rgba(255,106,26,0)', 'rgba(255,106,26,0)'),
      {
        name: 'Glow',
      },
    ),
    text('5 Stages of', 0, top + 120, W, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 500,
      fill: SUNSET.white,
      align: 'center',
    }),
    text('Business Ops', 0, top + 195, W, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 900,
      fill: SUNSET.white,
      align: 'center',
    }),
    text('5', 0, top + 300, W, {
      fontFamily: HEAD,
      fontSize: 820,
      fontWeight: 900,
      fill: linear(180, SUNSET.glow, SUNSET.ember),
      align: 'center',
      lineHeight: 1,
    }),
    Array.from({ length: 5 }, (_, index) =>
      rect(460 - index * 40, top + 1010 + index * 50, 160 + index * 80, 50, SUNSET.charcoal, {
        name: 'Step',
        stroke: 'rgba(255,255,255,0.2)',
        strokeWidth: 2,
      }),
    ),
  ];
};

export const stagesPost = template(W, H, () => stagesArt(H));

export const stagesStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  stagesArt(STORY_SIZE.height),
);

export const weAreHiring = template(W, H, () => [
  orangeBackdrop(),
  text('emberline.co', 0, 90, W, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 600,
    fill: SUNSET.white,
    align: 'center',
  }),
  text('We Are', 0, 170, W, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 900,
    fill: SUNSET.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('Hiring', 0, 300, W, {
    fontFamily: HEAD,
    fontSize: 200,
    fontWeight: 900,
    fill: SUNSET.white,
    align: 'center',
    lineHeight: 1,
    ...shadow(30, 12, 'rgba(120,40,0,0.35)'),
  }),
  rotateNodes(-8, 540, 900, [
    rect(170, 640, 740, 520, SUNSET.charcoal, { cornerRadius: 30, name: 'Back card' }),
  ]),
  rotateNodes(5, 540, 900, [
    rect(170, 640, 740, 520, SUNSET.peach, { cornerRadius: 30, name: 'Middle card' }),
  ]),
  group(
    rect(170, 660, 740, 520, SUNSET.white, {
      cornerRadius: 30,
      name: 'Roles card',
      ...shadow(40, 16, 'rgba(0,0,0,0.3)'),
    }),
    text('Open roles', 230, 710, 600, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 800,
      fill: SUNSET.charcoal,
    }),
    checklist(['Content Lead', 'Motion Designer', 'Growth Analyst'], 230, 820, 620, {
      color: SUNSET.charcoal,
      iconColor: SUNSET.orange,
      icon: 'circle-check',
      fontSize: 42,
      gap: 100,
      fontFamily: HEAD,
      fontWeight: 600,
    }),
  ),
]);

const STACK = [
  { word: 'ALIGNMENT', index: 3 },
  { word: 'STRATEGY', index: 2 },
  { word: 'FOCUS', index: 1 },
  { word: 'NETWORK', index: 3 },
  { word: 'TALENT', index: 0 },
  { word: 'INSIGHT', index: 5 },
] as const;

const COLUMN = 540;
const MONO_SIZE = 100;
const CHAR = MONO_SIZE * 0.612;

export const wordStack = template(W, H, () => [
  rect(0, 0, W, H, linear(180, SUNSET.white, SUNSET.soft), { name: 'Background' }),
  rect(COLUMN - 50, 140, 100, 1000, SUNSET.peach, { cornerRadius: 50, name: 'Column' }),
  STACK.map((item, row) => {
    const y = 170 + row * 160;
    const x = COLUMN - (item.index + 0.5) * CHAR;
    const style = { fontFamily: 'Space Mono', fontSize: MONO_SIZE, fontWeight: 700, lineHeight: 1 };
    return group(
      text(item.word, x, y, item.word.length * CHAR + 20, { ...style, fill: SUNSET.charcoal }),
      text(item.word.charAt(item.index), x + item.index * CHAR, y, CHAR + 10, {
        ...style,
        fill: SUNSET.orange,
      }),
    );
  }),
  text('Six habits behind lasting growth', 0, 1200, W, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 600,
    fill: SUNSET.smoke,
    align: 'center',
  }),
]);
