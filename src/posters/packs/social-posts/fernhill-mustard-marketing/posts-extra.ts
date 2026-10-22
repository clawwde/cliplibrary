import { linear } from '@/design';
import { icon, photo, rect, shadow, template } from '../../../kit';
import { bold, catalogNewest, copy, display, FH, H, openingHours, W, whatTheySay } from './posts';
import { marketInsights, mythFact, quizTime, spinWheel } from './posts-more';

interface SearchStyle {
  from: string;
  to: string;
  query: string;
  rows: readonly string[];
}

const searchCard = (style: SearchStyle) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, style.from, style.to), { name: 'Background' }),
    copy('fernhill.studio', 110, 110, 600, 28, FH.white, { fontWeight: 600, letterSpacing: 2 }),
    rect(110, 280, 860, 110, FH.white, {
      cornerRadius: 55,
      name: 'Search bar',
      ...shadow(30, 12, 'rgba(0,0,0,0.18)'),
    }),
    copy(style.query, 170, 314, 680, 36, FH.ink, { fontWeight: 500 }),
    icon('mic', 880, 308, 52, FH.grey, { strokeWidth: 2 }),
    rect(110, 420, 680, 400, FH.white, {
      cornerRadius: 32,
      name: 'Results',
      ...shadow(30, 12, 'rgba(0,0,0,0.18)'),
    }),
    style.rows.map((row, index) => {
      const y = 450 + index * 90;
      return [
        icon('search', 150, y + 12, 34, FH.grey, { strokeWidth: 2.2 }),
        copy(row, 210, y + 8, 520, 32, FH.ink),
        index < style.rows.length - 1
          ? rect(150, y + 72, 600, 2, '#e7e3da', { name: 'Divider' })
          : [],
      ];
    }),
    photo('man-portrait-3', 600, 640, 400, 620, { cornerRadius: 40 }),
    bold('Know your\nnext move.', 110, 960, 460, 66, FH.white),
    copy('Strategy built on real data.', 110, 1140, 460, 30, FH.white),
  ]);

export const searchBefore = searchCard({
  from: FH.forest,
  to: FH.deep,
  query: 'What drives B2B growth?',
  rows: ['Content that converts', 'Intent data', 'Team alignment', 'Customer retention'],
});

export const searchAfter = searchCard({
  from: '#4361ee',
  to: '#16206b',
  query: 'What content works best?',
  rows: ['Live webinars', 'In-depth guides', 'Research reports', 'Case studies'],
});

const EVENTS = [
  { day: '12', name: 'Growth\nSummit' },
  { day: '18', name: 'Brand\nWorkshop' },
  { day: '24', name: 'Founders\nMixer' },
  { day: '30', name: 'Content\nBootcamp' },
] as const;

const monthEvents = (height: number) =>
  template(W, height, () => {
    const tall = height > 1500;
    const top = tall ? 220 : 100;
    const cardHeight = tall ? 380 : 250;
    return [
      rect(0, 0, W, height, FH.forest, { name: 'Background' }),
      display('MAY EVENTS', 0, top, W, 170, FH.mustard, { align: 'center' }),
      copy('Everything planned for the month', 0, top + 190, W, 32, FH.cream, {
        align: 'center',
        fontWeight: 500,
      }),
      EVENTS.map((event, index) => {
        const x = 110 + (index % 2) * 450;
        const y = top + 290 + Math.floor(index / 2) * (cardHeight + 30);
        const middle = y + cardHeight / 2;
        return [
          rect(x, y, 410, cardHeight, FH.cream, { cornerRadius: 26, name: 'Event card' }),
          display('MAY', x + 30, middle - 90, 150, 50, FH.mustardDark),
          display(event.day, x + 30, middle - 34, 150, 120, FH.forest),
          bold(event.name, x + 190, middle - 36, 200, 30, FH.ink, { lineHeight: 1.25 }),
        ];
      }),
      bold('Save your seat today', 0, top + 330 + cardHeight * 2 + 40, W, 34, FH.cream, {
        align: 'center',
      }),
      Array.from({ length: 24 }, (_, index) => {
        const column = index % 12;
        const row = Math.floor(index / 12);
        return rect(
          column * 90,
          height - 180 + row * 90,
          90,
          90,
          (column + row) % 2 === 0 ? FH.mustard : FH.cream,
          {
            name: 'Check',
          },
        );
      }),
    ];
  });

export const eventsPost = monthEvents(H);
export const eventsStory = monthEvents(1920);

export const POSTS = [
  catalogNewest,
  openingHours,
  whatTheySay,
  marketInsights,
  spinWheel,
  mythFact,
  quizTime,
  eventsPost,
  searchBefore,
];
