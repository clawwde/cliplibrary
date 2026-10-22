import { type Fill, linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
  POST_SIZE,
  photo,
  pill,
  rect,
  STORY_SIZE,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import { BODY, MIST, SERIF, TALL } from './palette';

const { width: W, height: H } = POST_SIZE;

interface ScheduleCopy {
  background: Fill;
  chip: string;
  bar: string;
  start: string;
  end: string;
  title: string;
}

const schedule = (copy: ScheduleCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, copy.background, { name: 'Background' }),
    photo('yoga-2', 170, 480, 740, 800, { cornerRadius: 48 }),
    rect(110, 170, 860, 230, MIST.white, {
      cornerRadius: 26,
      name: 'Calendar card',
      ...shadow(40, 16, 'rgba(30,42,51,0.2)'),
    }),
    text(copy.start, 140, 196, 120, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: MIST.slate,
    }),
    text(copy.end, 140, 336, 120, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: MIST.slate,
    }),
    rect(270, 230, 670, 2, MIST.fog, { name: 'Hour line' }),
    rect(270, 238, 670, 120, copy.chip, { name: 'Event' }),
    rect(270, 238, 10, 120, copy.bar, { name: 'Event bar' }),
    text(copy.title, 306, 254, 600, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 700,
      fill: MIST.ink,
    }),
    icon('clock', 306, 310, 30, MIST.slate),
    text(`${copy.start} - ${copy.end}`, 346, 308, 400, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 500,
      fill: MIST.slate,
    }),
  ]);

export const sundayPilates = schedule({
  background: linear(180, MIST.mist, MIST.fog),
  chip: MIST.mint,
  bar: MIST.sage,
  start: '07:00',
  end: '08:00',
  title: 'Sunday Pilates',
});

export const morningMeditation = schedule({
  background: linear(180, MIST.white, '#f2eefb'),
  chip: '#e6defa',
  bar: '#7b6bb5',
  start: '05:30',
  end: '06:30',
  title: 'Morning Meditation',
});

const treePose = (height: number): Template =>
  template(W, height, () => {
    const mid = height / 2;
    return [
      rect(0, 0, W, height, linear(180, MIST.white, MIST.fog), { name: 'Background' }),
      photo('woman-portrait-3', 60, 100, 470, height - 200, { cornerRadius: 40 }),
      text('{tree pose}', 580, mid - 290, 460, {
        fontFamily: SERIF,
        fontSize: 92,
        fontWeight: 400,
        fill: MIST.ink,
      }),
      text(
        'A standing balance where\nyour weight rests on one\nleg while the other foot\npresses into the inner\ncalf or thigh. Palms meet\nat the heart or reach up.',
        584,
        mid - 150,
        440,
        {
          fontFamily: BODY,
          fontSize: 30,
          fontWeight: 400,
          fill: MIST.slate,
          lineHeight: 1.5,
        },
      ),
      pill('Hold for 5 breaths', 584, mid + 160, {
        width: 330,
        fill: MIST.mint,
        color: MIST.ink,
        fontSize: 28,
        fontFamily: BODY,
        fontWeight: 600,
      }),
    ];
  });

export const treePosePost = treePose(H);
export const treePoseStory = treePose(STORY_SIZE.height);

export const stressEmergency = template(W, H, () => [
  rect(0, 0, W, H, MIST.mist, { name: 'Background' }),
  Array.from({ length: 9 }, (_, index) =>
    rect(index * 135, 0, 3, H, MIST.white, { name: 'Tile line' }),
  ),
  Array.from({ length: 10 }, (_, index) =>
    rect(0, index * 135, W, 3, MIST.white, { name: 'Tile line' }),
  ),
  rect(130, 190, 820, 940, MIST.slate, {
    cornerRadius: 14,
    name: 'Box frame',
    ...shadow(40, 18, 'rgba(30,42,51,0.3)'),
  }),
  rect(180, 240, 720, 840, linear(160, MIST.white, MIST.fog), { name: 'Glass' }),
  text('IN CASE OF', 180, 300, 720, {
    fontFamily: TALL,
    fontSize: 96,
    fontWeight: 400,
    fill: MIST.ink,
    align: 'center',
  }),
  text('STRESS', 180, 410, 720, {
    fontFamily: TALL,
    fontSize: 190,
    fontWeight: 400,
    fill: MIST.sage,
    align: 'center',
  }),
  text('EMERGENCY', 180, 640, 720, {
    fontFamily: TALL,
    fontSize: 96,
    fontWeight: 400,
    fill: MIST.ink,
    align: 'center',
  }),
  rect(270, 860, 520, 150, MIST.sand, { cornerRadius: 75, name: 'Mat roll' }),
  ellipse(700, 860, 120, 150, '#c49f7f', { name: 'Mat end' }),
  circle(760, 935, 42, MIST.sand),
  circle(760, 935, 18, '#c49f7f'),
  text('BREAK THE GLASS. UNROLL THE MAT.', 0, 1190, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 700,
    fill: MIST.ink,
    align: 'center',
    letterSpacing: 3,
  }),
]);
