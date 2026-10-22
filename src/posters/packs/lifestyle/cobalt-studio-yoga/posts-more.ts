import { linear } from '@/design';
import { circle, POST_SIZE, photo, rect, shadow, star, template, text } from '../../../kit';
import { brandMark, CO, centeredMark, SANS, SERIF } from './palette';

const { width: W, height: H } = POST_SIZE;

const SESSIONS = [
  ['MONDAY', '7:00 AM - 8:00 AM', '5:30 PM - 6:30 PM'],
  ['WEDNESDAY', '7:00 AM - 8:00 AM', '6:00 PM - 7:00 PM'],
  ['FRIDAY', '8:00 AM - 9:00 AM', '5:00 PM - 6:00 PM'],
] as const;

export const yogaSchedule = template(W, H, () => [
  rect(0, 0, W, H, CO.paper, { name: 'Background' }),
  text('YOGA', 60, 60, 800, {
    fontFamily: SANS,
    fontSize: 170,
    fontWeight: 800,
    fill: CO.cobalt,
    lineHeight: 1,
    letterSpacing: -4,
  }),
  text('SCHEDULE', 60, 230, 900, {
    fontFamily: SANS,
    fontSize: 120,
    fontWeight: 800,
    fill: CO.cobalt,
    lineHeight: 1,
    letterSpacing: -3,
  }),
  star(8, 880, 80, 130, CO.cobalt, { innerRatio: 0.35 }),
  brandMark(64, 380, CO.ink, 32),
  photo('yoga-2', 0, 480, 560, 870, { name: 'Pose' }),
  rect(560, 470, 460, 780, CO.white, {
    cornerRadius: 30,
    name: 'Schedule card',
    ...shadow(36, 14, 'rgba(13,15,26,0.15)'),
  }),
  SESSIONS.map(([day, first, second], index) => {
    const y = 520 + index * 200;
    return [
      text(day, 600, y, 320, {
        fontFamily: SANS,
        fontSize: 36,
        fontWeight: 800,
        fill: CO.ink,
      }),
      circle(970, y + 22, 12, CO.cobalt),
      text(`${first}\n${second}`, 600, y + 56, 400, {
        fontFamily: SANS,
        fontSize: 28,
        fontWeight: 500,
        fill: CO.grey,
        lineHeight: 1.4,
      }),
      index < SESSIONS.length - 1 ? rect(600, y + 160, 380, 2, '#e3e5ee', { name: 'Divider' }) : [],
    ];
  }),
  text('Private sessions by\nappointment only', 600, 1130, 400, {
    fontFamily: SANS,
    fontSize: 24,
    fontWeight: 500,
    fill: CO.grey,
    lineHeight: 1.35,
  }),
]);

const MOODS = ['Good day?', 'Bad day?', 'Stressed?', 'Happy?', 'Tired?', 'Restless?'];

export const moodYoga = template(W, H, () => [
  rect(0, 0, W, H, linear(160, CO.cobalt, CO.deep), { name: 'Background' }),
  MOODS.map((mood, index) => [
    text(mood, 80, 300 + index * 120, 480, {
      fontFamily: SERIF,
      fontSize: 68,
      fontWeight: 500,
      italic: true,
      fill: CO.lilac,
      align: 'right',
    }),
    text('Yoga.', 600, 300 + index * 120, 400, {
      fontFamily: SANS,
      fontSize: 68,
      fontWeight: 800,
      fill: CO.white,
    }),
  ]),
  centeredMark(540, 1220, CO.white),
]);

export const unwind = template(W, H, () => [
  rect(0, 0, W, H, CO.ink, { name: 'Background' }),
  photo('yoga-2', 0, 420, W, 930, { name: 'Meditation' }),
  rect(0, 420, W, 300, linear(180, CO.ink, 'rgba(13,15,26,0)'), { name: 'Fade' }),
  text('Today I will', 0, 110, W, {
    fontFamily: SANS,
    fontSize: 46,
    fontWeight: 600,
    fill: CO.white,
    align: 'center',
  }),
  text('Unwind', 0, 170, W, {
    fontFamily: SERIF,
    fontSize: 230,
    fontWeight: 700,
    italic: true,
    fill: CO.lilac,
    align: 'center',
  }),
  centeredMark(540, 1230, CO.white),
]);

export const toggles = template(W, H, () => [
  photo('self-care', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(13,15,26,0.45)', { name: 'Dim' }),
  text('stress off', 0, 360, W, {
    fontFamily: SANS,
    fontSize: 60,
    fontWeight: 800,
    fill: CO.white,
    align: 'center',
  }),
  rect(390, 460, 300, 150, CO.ink, { cornerRadius: 75, name: 'Toggle off' }),
  circle(465, 535, 58, CO.white),
  text('yoga on', 0, 700, W, {
    fontFamily: SANS,
    fontSize: 60,
    fontWeight: 800,
    fill: CO.white,
    align: 'center',
  }),
  rect(390, 800, 300, 150, CO.cobalt, { cornerRadius: 75, name: 'Toggle on' }),
  circle(615, 875, 58, CO.white),
  centeredMark(540, 1230, CO.white),
]);

const BENEFITS = [
  ['Core Strength', 'Build stability and power\nwith controlled movement.'],
  ['Better Posture', 'Align the spine and ease\ntension from long days.'],
  ['Calm Mind', 'Breathe deeper and leave\nthe noise at the door.'],
] as const;

export const benefits = template(W, H, () => [
  photo('yoga-1', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(244,242,236,0.55)', { name: 'Haze' }),
  centeredMark(540, 80, CO.ink),
  BENEFITS.map(([title, detail], index) => {
    const y = 220 + index * 340;
    return [
      rect(200, y, 680, 290, 'rgba(255,255,255,0.94)', {
        cornerRadius: 30,
        name: 'Benefit card',
        ...shadow(30, 12, 'rgba(13,15,26,0.15)'),
      }),
      text(title, 200, y + 50, 680, {
        fontFamily: SANS,
        fontSize: 50,
        fontWeight: 800,
        fill: CO.cobalt,
        align: 'center',
      }),
      text(detail, 200, y + 130, 680, {
        fontFamily: SANS,
        fontSize: 32,
        fontWeight: 500,
        fill: CO.ink,
        align: 'center',
        lineHeight: 1.35,
      }),
    ];
  }),
]);
