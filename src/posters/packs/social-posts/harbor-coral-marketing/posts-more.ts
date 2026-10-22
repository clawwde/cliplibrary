import { linear } from '@/design';
import { circle, icon, photo, rect, rotateNodes, STORY_SIZE, shadow, template } from '../../../kit';
import {
  BODY,
  brandTag,
  growthStats,
  H,
  HARBOR,
  ideasFlight,
  leadTrend,
  portfolio,
  say,
  seoMagnifier,
  W,
} from './posts';

const marketTrends = (height: number) => {
  const dy = (height - H) / 2;
  return template(W, height, () => [
    rect(0, 0, W, height, linear(180, HARBOR.indigo, HARBOR.navy), { name: 'Background' }),
    photo('man-portrait-3', 220, 130 + dy, 640, 1000, { cornerRadius: 40 }),
    rect(220, 480 + dy, 640, 650, linear(180, 'rgba(31,42,92,0)', 'rgba(31,42,92,0.75)'), {
      name: 'Photo fade',
      cornerRadius: 40,
    }),
    {
      ...say('Market', 0, 400 + dy, W, 220, HARBOR.white, 800, 'center'),
      ...shadow(30, 6, 'rgba(20,26,51,0.55)'),
    },
    {
      ...say('Trends', 0, 610 + dy, W, 220, HARBOR.coral, 800, 'center'),
      ...shadow(30, 6, 'rgba(20,26,51,0.55)'),
    },
    rect(200, 1010 + dy, 680, 100, HARBOR.white, {
      name: 'Search bar',
      cornerRadius: 50,
      ...shadow(30, 12, 'rgba(0,0,0,0.3)'),
    }),
    icon('search', 240, 1038 + dy, 44, HARBOR.navy),
    say('Discover what comes next', 305, 1040 + dy, 560, 34, HARBOR.ink, 500, 'left', BODY),
    brandTag(1230 + dy, 'rgba(255,255,255,0.75)'),
  ]);
};

const timeWaits = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.navy, { name: 'Background' }),
  rect(90, 90, 900, 1170, HARBOR.cream, { name: 'Inner card', cornerRadius: 50 }),
  say('Time Waits', 0, 190, W, 100, HARBOR.indigo, 800, 'center'),
  say('for nobody', 0, 300, W, 72, HARBOR.ink, 500, 'center'),
  rect(440, 410, 200, 6, HARBOR.coral, { name: 'Rule', cornerRadius: 3 }),
  say(
    'But you decide how to\nmake the most of it.',
    0,
    450,
    W,
    38,
    HARBOR.grey,
    500,
    'center',
    BODY,
  ),
  circle(540, 880, 250, linear(135, HARBOR.peach, HARBOR.coral), {
    name: 'Clock disc',
    ...shadow(40, 16, 'rgba(255,107,87,0.45)'),
  }),
  icon('alarm-clock', 370, 710, 340, HARBOR.navy, { strokeWidth: 1.6 }),
]);

const checklist = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.indigo, { name: 'Background' }),
  [
    { x: 150, label: '1.', fill: HARBOR.cream, color: HARBOR.ink },
    { x: 400, label: '2.', fill: HARBOR.coral, color: HARBOR.navy },
    { x: 650, label: '3.', fill: HARBOR.navy, color: HARBOR.white },
  ].map((tab) => [
    rect(tab.x, 220, 260, 110, tab.fill, { name: 'Tab', cornerRadius: 20 }),
    say(tab.label, tab.x + 30, 236, 200, 34, tab.color, 800, 'left', BODY),
  ]),
  rect(130, 290, 820, 820, HARBOR.white, {
    name: 'Checklist card',
    cornerRadius: 30,
    ...shadow(40, 18, 'rgba(0,0,0,0.3)'),
  }),
  say('Your Marketing', 200, 380, 700, 50, HARBOR.ink, 600),
  say('Checklist', 200, 440, 700, 116, HARBOR.indigo, 800),
  [
    'Define your audience',
    'Plan useful content',
    'Optimise for search',
    'Track every campaign',
  ].map((item, index) => {
    const y = 650 + index * 100;
    return [
      icon('square-check', 200, y, 54, HARBOR.coral, { strokeWidth: 2.4 }),
      say(item, 285, y + 6, 620, 38, HARBOR.ink, 500, 'left', BODY),
    ];
  }),
  brandTag(1200, 'rgba(255,255,255,0.75)'),
]);

interface WebinarStyle {
  card: string;
  sticker: string;
  stickerText: string;
  label: string;
  title: string;
  date: string;
}

const webinarCard = (style: WebinarStyle) =>
  template(W, H, () => [
    rect(0, 0, W, H, HARBOR.paper, { name: 'Background' }),
    rect(260, 250, 560, 900, style.card, {
      name: 'Player card',
      cornerRadius: 50,
      ...shadow(40, 18, 'rgba(20,26,51,0.3)'),
    }),
    photo('woman-portrait-6', 300, 290, 480, 440, { cornerRadius: 30 }),
    say(style.title, 260, 770, 560, 54, HARBOR.white, 800, 'center'),
    say(style.date, 260, 845, 560, 34, HARBOR.white, 500, 'center', BODY),
    rect(320, 940, 440, 8, 'rgba(255,255,255,0.35)', { name: 'Track', cornerRadius: 4 }),
    rect(320, 940, 200, 8, HARBOR.white, { name: 'Progress', cornerRadius: 4 }),
    circle(520, 944, 16, HARBOR.white, { name: 'Scrubber' }),
    say('0:52', 320, 966, 120, 22, HARBOR.white, 500, 'left', BODY),
    say('-3:06', 640, 966, 120, 22, HARBOR.white, 500, 'right', BODY),
    rotateNodes(180, 400, 1050, [icon('chevrons-right', 370, 1020, 60, HARBOR.white)]),
    circle(540, 1050, 52, HARBOR.white, { name: 'Play button' }),
    icon('play', 516, 1026, 50, style.card),
    icon('chevrons-right', 650, 1020, 60, HARBOR.white),
    rotateNodes(-8, 330, 230, [
      rect(170, 190, 330, 90, style.sticker, {
        name: 'Sticker',
        cornerRadius: 14,
        ...shadow(16, 8, 'rgba(0,0,0,0.2)'),
      }),
      say(style.label, 170, 214, 330, 34, style.stickerText, 700, 'center', BODY),
    ]),
  ]);

export const webinarNavy = webinarCard({
  card: HARBOR.navy,
  sticker: HARBOR.coral,
  stickerText: HARBOR.navy,
  label: 'Online Webinar',
  title: 'Marketing 201',
  date: 'March 9 at 7 PM GMT',
});

export const webinarDark = webinarCard({
  card: HARBOR.charcoal,
  sticker: HARBOR.mint,
  stickerText: HARBOR.charcoal,
  label: 'Live Session',
  title: 'Funnel Studio',
  date: 'June 21 at 4 PM GMT',
});

const empowerIdeas = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.cream, { name: 'Background' }),
  rect(0, 0, 440, H, HARBOR.navy, { name: 'Side panel' }),
  photo('woman-portrait-3', 100, 230, 400, 900, { cornerRadius: 30 }),
  say('Empower\nIdeas, Build', 560, 330, 480, 70, HARBOR.ink, 500),
  say('Stronger', 560, 490, 480, 78, HARBOR.coral, 800),
  say('Business\nLeads', 560, 580, 480, 70, HARBOR.ink, 500),
  rect(560, 800, 260, 76, HARBOR.coral, { name: 'Button', cornerRadius: 38 }),
  say('Learn More', 560, 819, 260, 32, HARBOR.navy, 700, 'center', BODY),
  say('lumora.studio', 560, 1200, 440, 28, HARBOR.grey, 500, 'left', BODY),
]);

export const trendsPost = marketTrends(H);
export const trendsStory = marketTrends(STORY_SIZE.height);

export const POSTS = [
  ideasFlight,
  portfolio,
  leadTrend,
  seoMagnifier,
  growthStats,
  trendsPost,
  timeWaits,
  checklist,
  webinarNavy,
  empowerIdeas,
];
