import { circle, icon, photo, rect, type Template, template, text } from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { trail } from '../coral-tide-carousels/slide-kit';
import { brandLine, COBALT, H, HEAD, inkBackground, W } from './palette';

const tag = (label: string, x: number, y: number) => {
  const width = label.length * 40 * 0.6 + 56;
  return [
    rect(x, y, width, 76, COBALT.sky, { cornerRadius: 8, name: 'Tag' }),
    text(label, x, y + 14, width, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 800,
      fill: COBALT.ink,
      align: 'center',
    }),
  ];
};

const mindsetCover = template(W, H, () => [
  inkBackground(),
  trail(
    'M20 360 C200 420 420 300 400 160 C385 60 260 40 200 110',
    560,
    60,
    480,
    440,
    COBALT.sky,
    64,
  ),
  brandLine(80, 160, COBALT.white),
  tag('Product Mindset', 80, 600),
  text('4 Ways to Train\nYour Team to Think\nProduct First', 80, 720, 920, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: COBALT.white,
    lineHeight: 1.15,
  }),
  icon('arrow-right', 900, 1110, 100, COBALT.white, { strokeWidth: 2.8 }),
]);

type Layout = 'trio' | 'duo' | 'single';

const FRAMES: Record<Layout, readonly (readonly [number, number, number, number])[]> = {
  trio: [
    [80, 540, 300, 700],
    [400, 540, 600, 340],
    [400, 900, 600, 340],
  ],
  duo: [
    [80, 540, 450, 700],
    [550, 540, 450, 700],
  ],
  single: [[80, 540, 920, 700]],
};

const topic = (
  label: string,
  headline: string,
  layout: Layout,
  progress: number,
  photos: readonly PosterPhotoName[],
) =>
  template(W, H, () => [
    inkBackground(),
    tag(label, 80, 140),
    text(headline, 80, 270, 920, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 700,
      fill: COBALT.white,
      lineHeight: 1.18,
    }),
    rect(80, 460, 920, 6, COBALT.white, { cornerRadius: 3, name: 'Progress track' }),
    circle(80 + 920 * progress, 463, 16, COBALT.sky),
    FRAMES[layout].map(([x, y, width, height], index) =>
      photo(photos[index % photos.length] ?? 'workspace-1', x, y, width, height, {
        cornerRadius: 28,
      }),
    ),
  ]);

export const MINDSET_SERIES: readonly Template[] = [
  mindsetCover,
  topic(
    'Knowledge',
    'Learn your product inside out:\nfeatures, limits and strengths.',
    'trio',
    0.25,
    ['designer-tablet', 'laptop-analytics', 'workspace-1'],
  ),
  topic('Objective', 'Make goals visible at every\nlevel of the team.', 'duo', 0.5, [
    'meeting-1',
    'team-1',
  ]),
  topic('Strategy', 'Shape the roadmap together,\nnot behind closed doors.', 'single', 0.75, [
    'team-3',
  ]),
  topic('Planning', 'Turn the plan into weekly\nwork everyone can see.', 'duo', 1, [
    'desk-imac',
    'team-2',
  ]),
];
