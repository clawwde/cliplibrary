import { linear } from '@/design';
import {
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  poly,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  CLAY,
  deepBackdrop,
  didYouKnow,
  doorHanger,
  HEAD,
  marketPortrait,
  reviewWords,
  seoChecklist,
  softBackdrop,
  TIME_WAITS,
} from './posts';

const { width: W, height: H } = POST_SIZE;

const consistencyArt = (height: number): Nodes[] => {
  const top = (height - 1350) / 2;
  return [
    softBackdrop(CLAY, height),
    poly(
      [
        [500, 0],
        [560, 0],
        [700, height],
        [640, height],
      ],
      CLAY.deep,
      { name: 'Diagonal rule' },
    ),
    text('Growth Demands', 90, top + 300, 600, {
      fontFamily: BODY,
      fontSize: 44,
      fontWeight: 600,
      fill: CLAY.deep,
    }),
    text('CONSIS', 70, top + 360, 960, {
      fontFamily: HEAD,
      fontSize: 230,
      fontWeight: 800,
      fill: CLAY.brand,
      lineHeight: 1,
      letterSpacing: -6,
    }),
    text('TENCY', 170, top + 590, 900, {
      fontFamily: HEAD,
      fontSize: 230,
      fontWeight: 800,
      fill: CLAY.deep,
      lineHeight: 1,
      letterSpacing: -6,
    }),
    (['globe', 'at-sign', 'briefcase'] as const).map((name, index) => [
      circle(760, top + 960 + index * 80, 26, CLAY.deep),
      icon(name, 744, top + 944 + index * 80, 32, CLAY.paper),
      text('@clayhouse.co', 806, top + 944 + index * 80, 260, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 600,
        fill: CLAY.deep,
      }),
    ]),
  ];
};

export const consistencyPost = template(W, H, () => consistencyArt(H));

export const consistencyStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  consistencyArt(STORY_SIZE.height),
);

const tile = (letter: string, x: number, y: number) =>
  group(
    rect(x, y, 110, 120, CLAY.paper, {
      cornerRadius: 14,
      name: 'Letter tile',
      ...shadow(16, 8, 'rgba(74,31,23,0.25)'),
    }),
    text(letter, x, y + 18, 110, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 700,
      fill: CLAY.ink,
      align: 'center',
    }),
  );

const tileRow = (letters: string, y: number) => {
  const start = (W - (letters.length * 124 - 14)) / 2;
  return [...letters].map((letter, index) =>
    tile(letter === '_' ? '' : letter, start + index * 124, y),
  );
};

const guessWord = template(W, H, () => [
  rect(0, 0, W, H, linear(180, CLAY.soft, '#e5967a'), { name: 'Background' }),
  text('GUESS THE', 0, 170, W, {
    fontFamily: HEAD,
    fontSize: 60,
    fontWeight: 600,
    fill: CLAY.deep,
    align: 'center',
    letterSpacing: 4,
  }),
  text('WORD!', 0, 250, W, {
    fontFamily: HEAD,
    fontSize: 200,
    fontWeight: 800,
    fill: CLAY.paper,
    align: 'center',
    lineHeight: 1,
    ...shadow(24, 10, 'rgba(74,31,23,0.25)'),
  }),
  tileRow('G_OW_H', 590),
  tileRow('B_AN_', 760),
  text('Drop your answer in the comments', 0, 1000, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 600,
    fill: CLAY.deep,
    align: 'center',
  }),
  text('clayhouse.co', 0, 1220, W, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 500,
    fill: CLAY.deep,
    align: 'center',
    letterSpacing: 2,
  }),
]);

const countdownDays = template(W, H, () => [
  deepBackdrop(CLAY),
  group(
    rect(330, 250, 420, 440, CLAY.paper, {
      cornerRadius: 40,
      name: 'Calendar',
      ...shadow(50, 24, 'rgba(0,0,0,0.35)'),
    }),
    rect(330, 250, 420, 110, CLAY.soft, { cornerRadius: 40, name: 'Calendar top' }),
    rect(330, 320, 420, 40, CLAY.soft, { name: 'Calendar top edge' }),
    Array.from({ length: 7 }, (_, index) =>
      rect(372 + index * 50, 222, 14, 64, CLAY.ink, { cornerRadius: 7, name: 'Ring' }),
    ),
    text('7', 330, 380, 420, {
      fontFamily: HEAD,
      fontSize: 200,
      fontWeight: 800,
      fill: CLAY.brand,
      align: 'center',
      lineHeight: 1,
    }),
    text('Days', 330, 590, 420, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 700,
      fill: CLAY.ink,
      align: 'center',
    }),
  ),
  text('Lift your campaign results in\nless than one week of\nfocused strategy.', 90, 820, 900, {
    fontFamily: BODY,
    fontSize: 46,
    fontWeight: 600,
    fill: CLAY.paper,
    align: 'center',
    lineHeight: 1.35,
  }),
  text('clayhouse.co', 0, 1220, W, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 500,
    fill: CLAY.soft,
    align: 'center',
    letterSpacing: 2,
  }),
]);

const CROWD = [
  [90, 560, 120],
  [230, 600, 100],
  [350, 545, 130],
  [500, 590, 110],
  [630, 540, 135],
  [780, 590, 105],
  [900, 550, 120],
  [150, 700, 110],
  [300, 715, 95],
  [430, 690, 120],
  [580, 720, 100],
  [720, 695, 115],
  [860, 715, 100],
] as const;

const targetingCrowd = template(W, H, () => [
  rect(0, 0, W, H, CLAY.paper, { name: 'Background' }),
  text("You're", 0, 170, W, {
    fontFamily: BODY,
    fontSize: 54,
    fontWeight: 600,
    fill: CLAY.ink,
    align: 'center',
  }),
  text('targeting', 0, 240, W, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 800,
    fill: CLAY.brand,
    align: 'center',
    lineHeight: 1,
  }),
  CROWD.map(([x, y, size], index) =>
    icon('user-round', x, y, size, index % 4 === 1 ? CLAY.brand : CLAY.ink, { strokeWidth: 2.6 }),
  ),
  text('a massive', 0, 880, W, {
    fontFamily: BODY,
    fontSize: 54,
    fontWeight: 600,
    fill: CLAY.ink,
    align: 'center',
  }),
  text('market', 0, 950, W, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 800,
    fill: CLAY.brand,
    align: 'center',
    lineHeight: 1,
  }),
]);

const TAG_ROWS = [
  [{ label: 'Branding', icon: 'palette' }],
  [
    { label: 'Analytics', icon: 'chart-column' },
    { label: 'Conversion', icon: 'refresh-cw' },
  ],
  [
    { label: 'Engagement', icon: 'message-circle' },
    { label: 'Ads', icon: 'megaphone' },
  ],
  [
    { label: 'Strategy', icon: 'target' },
    { label: 'Social', icon: 'smartphone' },
  ],
  [
    { label: 'Growth', icon: 'trending-up' },
    { label: 'Content', icon: 'pencil' },
  ],
  [{ label: 'Audience', icon: 'users' }],
] as const;

const tagWidth = (label: string) => label.length * 25 + 150;

const tagCloud = template(W, H, () => [
  deepBackdrop(CLAY),
  text('Everything your brand needs', 0, 110, W, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 700,
    fill: CLAY.paper,
    align: 'center',
  }),
  TAG_ROWS.map((row, rowIndex) => {
    const widths = row.map((tag) => tagWidth(tag.label));
    const total = widths.reduce((sum, width) => sum + width, 0) + (row.length - 1) * 30;
    const y = 280 + rowIndex * 150;
    const start = (W - total) / 2 + (rowIndex % 2 === 0 ? -40 : 40);
    return row.map((tag, index) => {
      const x = start + widths.slice(0, index).reduce((sum, size) => sum + size + 30, 0);
      const width = widths[index] ?? 0;
      const filled = (rowIndex + index) % 3 === 0;
      return group(
        rect(x, y, width, 96, filled ? CLAY.soft : CLAY.paper, {
          cornerRadius: 48,
          name: `${tag.label} tag`,
          ...shadow(20, 8, 'rgba(0,0,0,0.25)'),
        }),
        text(tag.label, x + 36, y + 26, width - 100, {
          fontFamily: BODY,
          fontSize: 38,
          fontWeight: 600,
          fill: CLAY.ink,
        }),
        icon(tag.icon, x + width - 76, y + 26, 44, CLAY.brand),
      );
    });
  }),
  text('Which one are you working on?', 0, 1200, W, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: CLAY.soft,
    align: 'center',
  }),
]);

export const POSTS = [
  reviewWords,
  marketPortrait,
  doorHanger,
  seoChecklist,
  didYouKnow,
  TIME_WAITS,
  consistencyPost,
  guessWord,
  countdownDays,
  targetingCrowd,
  tagCloud,
];
