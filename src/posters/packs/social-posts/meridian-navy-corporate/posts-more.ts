import { IMAGE_FILTER_PRESETS, linear } from '@/design';
import {
  circle,
  icon,
  POST_SIZE,
  photo,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  bigNumber,
  coralBackdrop,
  cta,
  HEAD,
  ideasHeights,
  MERIDIAN,
  navyBackdrop,
  pocketOps,
  receiptPartners,
  strategyTabs,
} from './posts';

const { width: W, height: H } = POST_SIZE;

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const EVENT_DAYS = [4, 12, 19, 22, 26, 30];

const eventsCalendar = template(W, H, () => [
  navyBackdrop(H),
  text('Coming up', 80, 90, 600, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: MERIDIAN.sand,
  }),
  text('AUGUST', 80, 140, 900, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: MERIDIAN.coral,
    letterSpacing: 4,
  }),
  DAYS.map((day, index) =>
    text(day, 80 + index * 134, 300, 124, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 700,
      fill: MERIDIAN.white,
      align: 'center',
    }),
  ),
  Array.from({ length: 35 }, (_, index) => {
    const day = index - 2;
    const x = 80 + (index % 7) * 134;
    const y = 350 + Math.floor(index / 7) * 112;
    const event = EVENT_DAYS.includes(day);
    if (day < 1 || day > 31) {
      return rect(x, y, 124, 100, 'rgba(255,255,255,0.08)', { cornerRadius: 14, name: 'Blank' });
    }
    return [
      rect(x, y, 124, 100, event ? MERIDIAN.coral : MERIDIAN.cream, {
        cornerRadius: 14,
        name: 'Day',
      }),
      text(String(day).padStart(2, '0'), x, y + 28, 124, {
        fontFamily: HEAD,
        fontSize: 38,
        fontWeight: 600,
        fill: MERIDIAN.navy,
        align: 'center',
      }),
    ];
  }),
  text('04  Founder Q&A\n12  Growth Summit\n19  New Playbook', 80, 950, 460, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: MERIDIAN.white,
    lineHeight: 1.6,
  }),
  text('22  Live Poll\n26  Product Demo\n30  Guest Talk', 560, 950, 440, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: MERIDIAN.white,
    lineHeight: 1.6,
  }),
  text('meridian.co', 80, 1240, 400, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: MERIDIAN.coral,
    letterSpacing: 2,
  }),
]);

const statCard = (y: number, label: string, value: string, dark: boolean) => [
  rect(110, y, 860, 220, dark ? MERIDIAN.navy : MERIDIAN.white, {
    cornerRadius: 30,
    name: 'Stat card',
    ...shadow(30, 14, 'rgba(11,20,38,0.2)'),
  }),
  text(label, 160, y + 62, 420, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 500,
    fill: dark ? MERIDIAN.white : MERIDIAN.navy,
    lineHeight: 1.2,
  }),
  text(value, 560, y + 50, 360, {
    fontFamily: HEAD,
    fontSize: 116,
    fontWeight: 800,
    fill: dark ? MERIDIAN.coral : MERIDIAN.navy,
    align: 'right',
    lineHeight: 1,
  }),
];

const statsCards = template(W, H, () => [
  coralBackdrop(H),
  text('Proof in numbers', 110, 180, 860, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 600,
    fill: MERIDIAN.navy,
    letterSpacing: 2,
    uppercase: true,
  }),
  statCard(330, 'Projects\ndelivered', '18x', true),
  statCard(590, 'Years helping\nteams scale', '9+', false),
  text("We don't just advise,", 110, 920, 860, {
    fontFamily: HEAD,
    fontSize: 62,
    fontWeight: 400,
    fill: MERIDIAN.navy,
  }),
  text('we build.', 110, 996, 860, {
    fontFamily: HEAD,
    fontSize: 62,
    fontWeight: 800,
    fill: MERIDIAN.white,
  }),
]);

const webinar = (height: number, photoTop: number, photoWidth: number) => {
  const photoHeight = photoWidth * 1.25;
  const band = photoTop + 120;
  const copyTop = photoTop + photoHeight + 70;
  return [
    rect(0, 0, W, height, linear(180, MERIDIAN.white, MERIDIAN.sand), { name: 'Background' }),
    rect(400, 0, 280, band, MERIDIAN.navy, { name: 'Band' }),
    text('AUG', 400, photoTop - 300, 280, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 600,
      fill: MERIDIAN.coral,
      align: 'center',
      letterSpacing: 6,
    }),
    text('14', 400, photoTop - 230, 280, {
      fontFamily: HEAD,
      fontSize: 200,
      fontWeight: 800,
      fill: MERIDIAN.white,
      align: 'center',
      lineHeight: 1,
    }),
    photo('man-portrait-2', (W - photoWidth) / 2, photoTop, photoWidth, photoHeight, {
      cornerRadius: 40,
      filters: IMAGE_FILTER_PRESETS.mono,
      ...shadow(40, 18, 'rgba(11,20,38,0.3)'),
    }),
    text('Map Your', 0, copyTop, W, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 400,
      fill: MERIDIAN.navy,
      align: 'center',
    }),
    text('Quarterly Targets', 0, copyTop + 86, W, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: MERIDIAN.coral,
      align: 'center',
    }),
    text('Live session at 6 PM GMT', 0, copyTop + 196, W, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 500,
      fill: MERIDIAN.grey,
      align: 'center',
    }),
  ];
};

export const webinarPost = template(W, H, () => webinar(H, 400, 420));

export const webinarStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  webinar(STORY_SIZE.height, 560, 600),
);

interface HangerCopy {
  background: [string, string];
  hanger: string;
  top: string;
  bottom: string;
  topColor: string;
  bottomColor: string;
  lines: string;
  highlight: string;
  accent: string;
  button: string;
}

const doorHanger = (copy: HangerCopy) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, copy.background[0], copy.background[1]), {
      name: 'Background',
    }),
    rect(120, 250, 270, 900, copy.hanger, {
      cornerRadius: 14,
      name: 'Door hanger',
      ...shadow(30, 14, 'rgba(0,0,0,0.3)'),
    }),
    circle(255, 370, 66, copy.background[0], { name: 'Hanger hole' }),
    circle(255, 370, 58, linear(160, '#f8fafc', '#8b95a5'), { name: 'Rosette' }),
    rect(230, 330, 720, 74, linear(180, '#f8fafc', '#b8c0cc', '#7d8796'), {
      cornerRadius: 37,
      name: 'Handle',
      ...shadow(24, 12, 'rgba(0,0,0,0.3)'),
    }),
    icon('arrow-up-right', 170, 560, 130, copy.bottomColor, { strokeWidth: 2.6 }),
    text(copy.top, 120, 730, 270, {
      fontFamily: HEAD,
      fontSize: 160,
      fontWeight: 800,
      fill: copy.topColor,
      align: 'center',
      lineHeight: 1,
    }),
    text(copy.bottom, 120, 890, 270, {
      fontFamily: HEAD,
      fontSize: 160,
      fontWeight: 800,
      fill: copy.bottomColor,
      align: 'center',
      lineHeight: 1,
    }),
    text(copy.lines, 450, 600, 580, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 400,
      fill: MERIDIAN.white,
      lineHeight: 1.15,
    }),
    text(copy.highlight, 450, 674, 580, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 800,
      fill: copy.accent,
    }),
    cta(copy.button, 450, 800, {
      fill: copy.accent,
      color: MERIDIAN.deep,
      dot: MERIDIAN.deep,
      dotIcon: copy.accent,
    }),
  ]);

export const doorBefore = doorHanger({
  background: [MERIDIAN.mid, MERIDIAN.deep],
  hanger: MERIDIAN.coral,
  top: '20',
  bottom: '27',
  topColor: MERIDIAN.white,
  bottomColor: MERIDIAN.navy,
  lines: 'Leading With',
  highlight: 'Purpose in 2027',
  accent: MERIDIAN.coral,
  button: 'Grow with us',
});

export const doorAfter = doorHanger({
  background: ['#1d5c4f', '#0b2a24'],
  hanger: '#b9f0d8',
  top: 'OP',
  bottom: 'EN',
  topColor: '#0b2a24',
  bottomColor: '#1d8a6f',
  lines: 'Our Door is',
  highlight: 'Open to Partners',
  accent: '#b9f0d8',
  button: 'Work with us',
});

const stickyNote = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#f4f5f7', '#cfd5de'), { name: 'Background' }),
  rect(230, 330, 620, 620, linear(160, MERIDIAN.coralSoft, MERIDIAN.coral), {
    rotation: -4,
    name: 'Sticky note',
    ...shadow(40, 24, 'rgba(11,20,38,0.25)'),
  }),
  rect(200, 330, 170, 54, 'rgba(255,255,255,0.6)', { rotation: -38, name: 'Tape' }),
  rect(760, 260, 170, 54, 'rgba(255,255,255,0.6)', { rotation: 34, name: 'Tape' }),
  text('Small issues\ngrow fast.\nMake today\nyour turning\npoint.', 290, 400, 520, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 700,
    fill: MERIDIAN.navy,
    lineHeight: 1.12,
    rotation: -4,
  }),
  text('Advice from the Meridian desk', 0, 1140, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: MERIDIAN.grey,
    align: 'center',
  }),
]);

export const POSTS = [
  ideasHeights,
  strategyTabs,
  pocketOps,
  eventsCalendar,
  bigNumber,
  doorBefore,
  receiptPartners,
  statsCards,
  webinarPost,
  stickyNote,
];
