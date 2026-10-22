import { linear } from '@/design';
import { icon, line, POST_SIZE, photo, rect, shadow, template, text } from '../../../kit';
import { CO, centeredMark, SANS } from './palette';

const { width: W, height: H } = POST_SIZE;

export const stopBreathe = template(W, H, () => [
  photo('yoga-2', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(26,43,184,0.4)', { name: 'Cobalt tint' }),
  rect(0, 800, W, 550, linear(180, 'rgba(13,15,26,0)', 'rgba(13,15,26,0.7)'), { name: 'Fade' }),
  text('Driftwood\nYoga Studio', 0, 180, W, {
    fontFamily: SANS,
    fontSize: 36,
    fontWeight: 600,
    fill: CO.white,
    align: 'center',
    lineHeight: 1.15,
  }),
  text('stop &\nbreathe', 0, 400, W, {
    fontFamily: SANS,
    fontSize: 190,
    fontWeight: 800,
    fill: CO.white,
    align: 'center',
    lineHeight: 0.95,
    letterSpacing: -6,
  }),
  centeredMark(540, 1220, CO.white),
]);

export const letsFlow = template(W, H, () => [
  rect(0, 0, W, H, CO.paper, { name: 'Background' }),
  centeredMark(540, 60, CO.ink),
  Array.from({ length: 6 }, (_, index) =>
    text("LET'S FLOW", 0, 160 + index * 150, W, {
      fontFamily: SANS,
      fontSize: 150,
      fontWeight: 800,
      fill: CO.cobalt,
      align: 'center',
      lineHeight: 1,
      letterSpacing: -4,
    }),
  ),
  photo('woman-portrait-3', 380, 150, 320, 930, { cornerRadius: 160 }),
  text('Take a moment to move your body,\nbreathe deeply and reset.', 0, 1150, W, {
    fontFamily: SANS,
    fontSize: 36,
    fontWeight: 500,
    fill: CO.ink,
    align: 'center',
    lineHeight: 1.35,
  }),
]);

export const dailyReminder = template(W, H, () => [
  photo('yoga-1', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(13,15,26,0.35)', { name: 'Dim' }),
  rect(170, 500, 740, 360, CO.white, {
    cornerRadius: 32,
    name: 'Reminder card',
    ...shadow(40, 18, 'rgba(0,0,0,0.35)'),
  }),
  text('Daily Reminder', 170, 545, 740, {
    fontFamily: SANS,
    fontSize: 44,
    fontWeight: 800,
    fill: CO.ink,
    align: 'center',
  }),
  text(
    'Pause today to move gently, breathe\nslowly and notice how your body feels.',
    210,
    620,
    660,
    {
      fontFamily: SANS,
      fontSize: 28,
      fontWeight: 500,
      fill: CO.grey,
      align: 'center',
      lineHeight: 1.4,
    },
  ),
  line(170, 760, 740, '#e3e5ee', 2),
  line(540, 760, 100, '#e3e5ee', 2, { rotation: 90 }),
  text('Dismiss', 170, 788, 370, {
    fontFamily: SANS,
    fontSize: 34,
    fontWeight: 600,
    fill: CO.grey,
    align: 'center',
  }),
  text('Got it!', 540, 788, 370, {
    fontFamily: SANS,
    fontSize: 34,
    fontWeight: 800,
    fill: CO.cobalt,
    align: 'center',
  }),
  centeredMark(540, 1220, CO.white),
]);

export const yogaVertical = template(W, H, () => [
  rect(0, 0, W, H, CO.ink, { name: 'Background' }),
  photo('yoga-1', 380, 0, 700, H, { name: 'Pose' }),
  rect(380, 0, 360, H, linear(90, CO.ink, 'rgba(13,15,26,0)'), { name: 'Fade' }),
  text('Y\nO\nG\nA', 60, 70, 360, {
    fontFamily: SANS,
    fontSize: 260,
    fontWeight: 800,
    fill: CO.lilac,
    lineHeight: 0.98,
  }),
  text('Build strength,\nbalance and focus\none breath at a time', 560, 90, 460, {
    fontFamily: SANS,
    fontSize: 34,
    fontWeight: 600,
    fill: CO.white,
    align: 'right',
    lineHeight: 1.35,
  }),
  text('Driftwood', 950, 1230, 600, {
    fontFamily: SANS,
    fontSize: 72,
    fontWeight: 800,
    fill: CO.white,
    rotation: -90,
  }),
  icon('flower-2', 958, 1250, 66, CO.lilac, { strokeWidth: 2 }),
]);

export const eatSleep = template(W, H, () => [
  rect(0, 0, W, H, linear(160, CO.cobalt, CO.deep), { name: 'Background' }),
  photo('woman-portrait-4', 660, 140, 420, 1210, { name: 'Portrait' }),
  text('Eat\nSleep\nYoga\nRepeat', 50, 80, 1000, {
    fontFamily: SANS,
    fontSize: 210,
    fontWeight: 800,
    fill: CO.white,
    lineHeight: 0.98,
    letterSpacing: -8,
  }),
  centeredMark(300, 1230, CO.white),
]);
