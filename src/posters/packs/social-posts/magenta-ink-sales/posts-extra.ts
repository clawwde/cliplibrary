import { linear } from '@/design';
import { icon, photo, poly, rect, rotateNodes, template } from '../../../kit';
import {
  BL,
  bold,
  brandingMistakes,
  campaignInsights,
  chatHero,
  copy,
  createBrands,
  H,
  handle,
  heavy,
  W,
} from './posts';
import { boostViews, heyYou, mythTruth, rightLeads } from './posts-more';

const ITEMS = [
  'Define your audience',
  'Sharpen the message',
  'Make a clear offer',
  'Track every result',
] as const;

const dailyChecklist = template(W, H, () => [
  rect(0, 0, W, H, linear(170, BL.magenta, BL.magentaDeep), { name: 'Background' }),
  rotateNodes(-8, 540, 640, [rect(190, 230, 700, 820, BL.ink, { cornerRadius: 44 })]),
  rotateNodes(-3, 540, 640, [
    rect(190, 230, 700, 820, BL.white, { cornerRadius: 44, name: 'Note card' }),
    icon('arrow-left', 240, 285, 36, BL.ink, { strokeWidth: 2.6 }),
    copy('Notes', 286, 280, 200, 30, BL.ink),
    heavy('Sales & Marketing\nDaily Checklist', 240, 370, 620, 52, BL.ink),
    ITEMS.map((item, index) => [
      icon('circle-check', 240, 560 + index * 110, 56, BL.magenta, { strokeWidth: 2.4 }),
      copy(item, 320, 566 + index * 110, 540, 38, BL.ink),
    ]),
  ]),
  bold('Save this for Monday', 0, 1160, W, 44, BL.white, { align: 'center' }),
  handle(1240, BL.ink),
]);

const BADGES = [
  { value: '20%', label: 'Higher\nretention' },
  { value: '3x', label: 'More\nqualified leads' },
  { value: '95%', label: 'Client\nsatisfaction' },
] as const;

const customerInsights = (height: number) =>
  template(W, height, () => {
    const top = height - 700;
    return [
      rect(0, 0, W, height, BL.ink, { name: 'Background' }),
      photo('meeting-1', 0, 0, W, top + 190, { crop: { zoom: 1, focusX: 0.5, focusY: 0.4 } }),
      rect(0, top - 300, W, 492, linear(180, 'rgba(18,18,18,0)', BL.ink), { name: 'Fade' }),
      bold('Turning\nCustomer Data', 90, top, 900, 80, BL.white, { lineHeight: 1.1 }),
      heavy('into Insights', 90, top + 180, 900, 80, BL.magenta),
      BADGES.map((badge, index) => {
        const x = 90 + index * 310;
        return [
          rect(x, top + 330, 280, 210, BL.magenta, { cornerRadius: 28, name: 'Stat badge' }),
          poly(
            [
              [x + 110, top + 538],
              [x + 170, top + 538],
              [x + 140, top + 572],
            ],
            BL.magenta,
            { name: 'Badge pointer' },
          ),
          heavy(badge.value, x, top + 350, 280, 76, BL.white, { align: 'center' }),
          copy(badge.label, x, top + 440, 280, 24, BL.white, {
            align: 'center',
            lineHeight: 1.25,
          }),
        ];
      }),
      handle(height - 90, BL.grey),
    ];
  });

export const insightsPost = customerInsights(H);
export const insightsStory = customerInsights(1920);

export const POSTS = [
  brandingMistakes,
  createBrands,
  campaignInsights,
  chatHero,
  heyYou,
  boostViews,
  rightLeads,
  mythTruth,
  dailyChecklist,
];
