import { IMAGE_FILTER_PRESETS, linear } from '@/design';
import { group, POST_SIZE, photo, rect, template, text } from '../../../kit';
import { CRIMSON, deepBackdrop, HEAD, tag } from './posts';

const { width: W, height: H } = POST_SIZE;

const MILESTONES = [
  { step: '1', value: '3 posts\na week', note: 'Steady output', height: 300 },
  { step: '2', value: '40k to\n90k', note: 'Monthly reach', height: 440 },
  { step: '3', value: '65', note: 'Qualified leads', height: 580 },
] as const;

export const milestones = template(W, H, () => [
  deepBackdrop(),
  text('Align Team Goals', 0, 120, W, {
    fontFamily: HEAD,
    fontSize: 70,
    fontWeight: 700,
    fill: CRIMSON.white,
    align: 'center',
  }),
  text('with Milestones', 0, 210, W, {
    fontFamily: HEAD,
    fontSize: 70,
    fontWeight: 700,
    fill: CRIMSON.bright,
    align: 'center',
  }),
  MILESTONES.map((item, index) => {
    const x = 110 + index * 300;
    const y = 1260 - item.height;
    return group(
      text(item.step, x, y - 250, 260, {
        fontFamily: HEAD,
        fontSize: 260,
        fontWeight: 800,
        fill: 'rgba(255,255,255,0.14)',
        align: 'center',
        lineHeight: 1,
      }),
      rect(x, y, 260, item.height, linear(180, CRIMSON.red, CRIMSON.wine), {
        cornerRadius: 18,
        name: 'Milestone bar',
      }),
      text(item.value, x, y + 34, 260, {
        fontFamily: HEAD,
        fontSize: 46,
        fontWeight: 700,
        fill: CRIMSON.white,
        align: 'center',
        lineHeight: 1.1,
      }),
      text(item.note, x, y + 160, 260, {
        fontFamily: HEAD,
        fontSize: 28,
        fontWeight: 400,
        fill: CRIMSON.blush,
        align: 'center',
      }),
    );
  }),
]);

const DAYS = [
  { day: 'Mon', date: '04', label: 'Live Webinar' },
  { day: 'Tue', date: '05', label: '' },
  { day: 'Wed', date: '06', label: '' },
  { day: 'Mon', date: '11', label: 'New Article' },
  { day: 'Tue', date: '12', label: 'Team Poll' },
  { day: 'Wed', date: '13', label: '' },
  { day: 'Mon', date: '18', label: 'Roundtable' },
  { day: 'Tue', date: '19', label: '' },
  { day: 'Wed', date: '20', label: 'Q&A Night' },
] as const;

export const calendarGrid = template(W, H, () => [
  rect(0, 0, W, H, CRIMSON.ink, { name: 'Background' }),
  photo('city-night', 0, 0, W, H, { filters: IMAGE_FILTER_PRESETS.noir, opacity: 0.55 }),
  text('Your month, planned', 80, 90, 920, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 700,
    fill: CRIMSON.white,
  }),
  DAYS.map((item, index) => {
    const x = 80 + (index % 3) * 315;
    const y = 250 + Math.floor(index / 3) * 345;
    const busy = item.label !== '';
    return group(
      rect(x, y, 290, 310, busy ? CRIMSON.red : CRIMSON.ink, {
        cornerRadius: 26,
        name: 'Day tile',
        stroke: 'rgba(255,255,255,0.25)',
        strokeWidth: busy ? 0 : 2,
      }),
      text(item.day, x + 28, y + 26, 200, {
        fontFamily: HEAD,
        fontSize: 30,
        fontWeight: 500,
        fill: CRIMSON.blush,
      }),
      text(item.date, x + 26, y + 66, 220, {
        fontFamily: HEAD,
        fontSize: 96,
        fontWeight: 700,
        fill: CRIMSON.white,
      }),
      busy ? tag(item.label, x + 24, y + 222, 26, { fill: CRIMSON.white, color: CRIMSON.ink }) : [],
    );
  }),
]);

export const seventyPercent = template(W, H, () => [
  rect(0, 0, W, H, linear(180, CRIMSON.white, CRIMSON.blush), { name: 'Background' }),
  photo('man-portrait-1', 560, 120, 520, 1230, { filters: IMAGE_FILTER_PRESETS.mono }),
  rect(560, 120, 160, 1230, linear(90, 'rgba(253,232,234,1)', 'rgba(253,232,234,0)'), {
    name: 'Fade',
  }),
  text('70%', 80, 260, 640, {
    fontFamily: HEAD,
    fontSize: 230,
    fontWeight: 800,
    fill: CRIMSON.red,
    lineHeight: 1,
    letterSpacing: -6,
  }),
  text('more output\nper team', 90, 520, 520, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 500,
    fill: CRIMSON.ink,
    lineHeight: 1.15,
  }),
  tag('Measured in 2026', 90, 720, 34, { fill: CRIMSON.ink }),
  text('Clear goals and weekly\ncheck-ins change how\nfast teams deliver.', 90, 1100, 460, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 400,
    fill: CRIMSON.grey,
    lineHeight: 1.4,
  }),
]);
