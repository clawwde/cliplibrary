import { linear } from '@/design';
import {
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { FERN, forestBackdrop, HEAD, highlight, mintBackdrop } from './posts';

const { width: W, height: H } = POST_SIZE;

const EVENTS = [
  { day: '04', label: 'Brand Summit' },
  { day: '11', label: 'Mixer Night' },
  { day: '17', label: 'Live Q&A' },
  { day: '20', label: 'Audience Poll' },
  { day: '25', label: 'Spring Sale' },
  { day: '29', label: 'New Article' },
] as const;

export const monthEvents = template(W, H, () => [
  forestBackdrop(),
  text('June', 0, 150, W, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 800,
    fill: FERN.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('Events', 0, 280, W, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 800,
    fill: FERN.mint,
    align: 'center',
    lineHeight: 1,
  }),
  EVENTS.map((event, index) => {
    const x = 120 + (index % 3) * 290;
    const y = 520 + Math.floor(index / 3) * 340;
    const tile = [
      rect(x, y, 260, 300, FERN.white, {
        cornerRadius: 22,
        name: 'Date card',
        ...shadow(30, 12, 'rgba(0,0,0,0.3)'),
      }),
      text(event.day, x + 24, y + 24, 200, {
        fontFamily: HEAD,
        fontSize: 92,
        fontWeight: 800,
        fill: FERN.deep,
      }),
      text('June', x + 26, y + 130, 200, {
        fontFamily: HEAD,
        fontSize: 26,
        fontWeight: 500,
        fill: FERN.sage,
      }),
      rect(x, y + 220, 260, 80, FERN.fern, { cornerRadius: 22, name: 'Label band' }),
      rect(x, y + 220, 260, 30, FERN.fern, { name: 'Label band edge' }),
      text(event.label, x, y + 244, 260, {
        fontFamily: HEAD,
        fontSize: 28,
        fontWeight: 700,
        fill: FERN.white,
        align: 'center',
      }),
    ];
    return group(index === 0 ? rotateNodes(-6, x + 130, y + 150, tile) : tile);
  }),
]);

export const clipboardGoals = template(W, H, () => [
  mintBackdrop(),
  circle(900, 170, 120, FERN.white, { name: 'Cup', ...shadow(30, 12, 'rgba(0,0,0,0.2)') }),
  circle(900, 170, 92, '#3b2418', { name: 'Coffee' }),
  rotateNodes(-4, 500, 700, [
    rect(140, 170, 720, 1080, linear(160, '#b98a5e', '#8c6440'), {
      cornerRadius: 30,
      name: 'Clipboard',
      ...shadow(40, 18, 'rgba(15,42,32,0.3)'),
    }),
    rect(190, 250, 620, 940, FERN.white, { name: 'Paper' }),
    rect(370, 130, 240, 110, linear(180, '#cfd6d2', '#7e8783'), {
      cornerRadius: 24,
      name: 'Clip',
    }),
    text('Pin Down\nYour', 250, 400, 520, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 500,
      fill: FERN.deep,
      lineHeight: 1.05,
    }),
    text('Growth\nGoals', 265, 600, 520, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: FERN.fern,
      lineHeight: 1.05,
    }),
    text('Comment "GOALS"\nfor the free planner', 290, 880, 460, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 600,
      fill: FERN.forest,
      lineHeight: 1.3,
    }),
    icon('arrow-down', 640, 960, 90, FERN.forest, { strokeWidth: 2.5 }),
  ]),
  rect(900, 640, 50, 380, FERN.forest, { cornerRadius: 14, rotation: 14, name: 'Marker' }),
  rect(900, 640, 50, 90, FERN.fern, { cornerRadius: 14, rotation: 14, name: 'Marker cap' }),
]);

interface GrowPalette {
  background: string;
  soft: string;
  ring: string;
  ink: string;
  tag: string;
}

const FERN_GROW: GrowPalette = {
  background: FERN.light,
  soft: FERN.mint,
  ring: FERN.white,
  ink: FERN.deep,
  tag: FERN.fern,
};

export const CORAL_GROW: GrowPalette = {
  background: '#fff1ec',
  soft: '#ffc4b0',
  ring: '#ffffff',
  ink: '#4a1a10',
  tag: '#f0603c',
};

export const growWithUs = (palette: GrowPalette, tag: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, palette.background, palette.soft), { name: 'Background' }),
    circle(540, 640, 430, 'rgba(0,0,0,0)', {
      name: 'Ring',
      stroke: palette.ring,
      strokeWidth: 110,
    }),
    photo('woman-portrait-4', 290, 300, 500, 660, { cornerRadius: 250 }),
    group(
      rect(50, 880, 620, 120, palette.ring, {
        cornerRadius: 60,
        rotation: -24,
        name: 'Tag pill',
        ...shadow(30, 12, 'rgba(0,0,0,0.18)'),
      }),
      text(tag, 70, 902, 580, {
        fontFamily: HEAD,
        fontSize: 56,
        fontWeight: 800,
        fill: palette.tag,
        align: 'center',
        rotation: -24,
      }),
    ),
    text('Big goals start with one honest conversation.', 140, 1170, 800, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 600,
      fill: palette.ink,
      align: 'center',
    }),
  ]);

export const GROW_POST = growWithUs(FERN_GROW, '#GrowTogether');

const mythArt = (height: number): Nodes[] => {
  const top = (height - H) / 2;
  return [
    forestBackdrop(height),
    text('MYTH', 70, top + 1100, 700, {
      fontFamily: HEAD,
      fontSize: 150,
      fontWeight: 800,
      fill: 'rgba(0,0,0,0)',
      stroke: FERN.sage,
      strokeWidth: 3,
      rotation: -90,
      lineHeight: 1,
    }),
    text('Myth', 0, top + 120, W, {
      fontFamily: HEAD,
      fontSize: 130,
      fontWeight: 800,
      fill: FERN.white,
      align: 'center',
      lineHeight: 1,
    }),
    text('or', 330, top + 250, 120, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 600,
      fill: FERN.white,
      align: 'center',
    }),
    text('Fact', 420, top + 230, 400, {
      fontFamily: HEAD,
      fontSize: 110,
      fontWeight: 800,
      fill: FERN.mint,
    }),
    [
      {
        label: 'Myth',
        copy: 'Great marketing is pure creative\ninstinct and lucky timing.',
        y: 480,
      },
      {
        label: 'Fact',
        copy: 'It is research, testing and\nclear data, every single week.',
        y: 760,
      },
    ].map((item) =>
      group(
        rect(260, top + item.y, 720, 200, FERN.white, {
          cornerRadius: 24,
          name: `${item.label} card`,
          ...shadow(30, 12, 'rgba(0,0,0,0.3)'),
        }),
        highlight(item.label, 290, top + item.y - 30, 140, 34),
        text(item.copy, 300, top + item.y + 60, 640, {
          fontFamily: HEAD,
          fontSize: 32,
          fontWeight: 600,
          fill: FERN.deep,
          lineHeight: 1.35,
        }),
      ),
    ),
    group(
      rect(410, top + 1090, 420, 84, 'rgba(0,0,0,0)', {
        cornerRadius: 42,
        stroke: FERN.mint,
        strokeWidth: 3,
        name: 'Save button',
      }),
      text('Save this post', 410, top + 1112, 420, {
        fontFamily: HEAD,
        fontSize: 32,
        fontWeight: 700,
        fill: FERN.mint,
        align: 'center',
      }),
    ),
  ];
};

export const mythPost = template(W, H, () => mythArt(H));

export const mythStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  mythArt(STORY_SIZE.height),
);
