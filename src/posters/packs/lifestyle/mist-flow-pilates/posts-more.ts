import { linear } from '@/design';
import { icon, line, POST_SIZE, photo, rect, shadow, template, text } from '../../../kit';
import { BODY, MIST, SERIF, TALL } from './palette';

const { width: W, height: H } = POST_SIZE;

const CLASSES = [
  ['09', 'Morning Flow', 'Studio A  ·  7:00 AM'],
  ['14', 'Core & Balance', 'Studio B  ·  6:30 PM'],
  ['21', 'Reformer Basics', 'Studio A  ·  8:00 AM'],
  ['28', 'Sunset Stretch', 'Rooftop  ·  7:15 PM'],
] as const;

export const classCalendar = template(W, H, () => [
  rect(0, 0, W, H, linear(180, MIST.mist, MIST.fog), { name: 'Background' }),
  text('CLASS', 0, 60, W, {
    fontFamily: TALL,
    fontSize: 220,
    fontWeight: 400,
    fill: MIST.ink,
    align: 'center',
    lineHeight: 1.1,
    letterSpacing: 10,
  }),
  text('Calendar', 0, 250, W, {
    fontFamily: SERIF,
    fontSize: 140,
    fontWeight: 400,
    italic: true,
    fill: MIST.sage,
    align: 'center',
  }),
  CLASSES.map(([day, name, where], index) => {
    const y = 500 + index * 180;
    const dark = index % 2 === 1;
    return [
      rect(130, y, 820, 150, dark ? MIST.ink : MIST.slate, { cornerRadius: 18, name: 'Class row' }),
      text(day, 160, y + 18, 150, {
        fontFamily: SERIF,
        fontSize: 100,
        fontWeight: 400,
        fill: MIST.white,
        align: 'center',
      }),
      rect(330, y + 30, 2, 90, 'rgba(255,255,255,0.4)', { name: 'Divider' }),
      text(name, 360, y + 34, 460, {
        fontFamily: BODY,
        fontSize: 38,
        fontWeight: 700,
        fill: MIST.white,
      }),
      text(where, 360, y + 86, 460, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 500,
        fill: MIST.fog,
      }),
      text('AUG', 920, y + 32, 100, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 700,
        fill: MIST.mint,
        letterSpacing: 4,
        rotation: 90,
      }),
    ];
  }),
]);

const NOTES = [
  ['Arms reach long,\nparallel to the mat', 50, 470, 330, 520],
  ['Gaze softly over\nthe front fingers', 760, 420, 700, 450],
  ['Front knee stacked\nabove the ankle', 760, 820, 700, 850],
  ['Back foot grounded\nand angled in', 50, 1040, 330, 1080],
] as const;

export const formTips = template(W, H, () => [
  rect(0, 0, W, H, linear(180, MIST.white, MIST.mist), { name: 'Background' }),
  text('form tips', 0, 50, W, {
    fontFamily: SERIF,
    fontSize: 150,
    fontWeight: 400,
    italic: true,
    fill: MIST.ink,
    align: 'center',
  }),
  text('(Warrior II)', 0, 230, W, {
    fontFamily: SERIF,
    fontSize: 54,
    fontWeight: 400,
    italic: true,
    fill: MIST.slate,
    align: 'center',
  }),
  photo('woman-portrait-3', 390, 340, 300, 900, { cornerRadius: 150 }),
  NOTES.map(([note, x, y, lineX, lineY]) => [
    text(note, x, y, 270, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 500,
      fill: MIST.slate,
      lineHeight: 1.3,
    }),
    line(lineX, lineY, 60, MIST.ink, 2),
  ]),
]);

const PRINCIPLES = [
  ['Centering', 'Start every move from a steady, engaged core.'],
  ['Precision', 'Small, exact movements build lasting strength.'],
  ['Flow', 'Link each motion smoothly with your breath.'],
] as const;

export const principles = template(W, H, () => [
  photo('yoga-2', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(30,42,51,0.78)', { name: 'Dim' }),
  text('PILATES', 80, 70, 920, {
    fontFamily: TALL,
    fontSize: 170,
    fontWeight: 400,
    fill: MIST.white,
    letterSpacing: 6,
  }),
  text('three core principles', 80, 290, 920, {
    fontFamily: SERIF,
    fontSize: 64,
    fontWeight: 400,
    italic: true,
    fill: MIST.mint,
  }),
  PRINCIPLES.map(([title, detail], index) => {
    const y = 450 + index * 270;
    return [
      rect(80, y - 30, 920, 2, 'rgba(255,255,255,0.25)', { name: 'Rule' }),
      text(String(index + 1), 80, y, 120, {
        fontFamily: SERIF,
        fontSize: 150,
        fontWeight: 400,
        fill: MIST.white,
        lineHeight: 1,
      }),
      text(title, 240, y + 16, 760, {
        fontFamily: BODY,
        fontSize: 46,
        fontWeight: 700,
        fill: MIST.white,
      }),
      text(detail, 240, y + 86, 740, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 400,
        fill: MIST.fog,
        lineHeight: 1.35,
      }),
    ];
  }),
]);

const POSES = ['Warrior II', "Child's Pose", 'Downward Dog', 'Cobra Pose'];

export const searchPoses = template(W, H, () => [
  rect(0, 0, W, H, MIST.mist, { name: 'Background' }),
  photo('woman-portrait-4', 0, 640, W, 710, { name: 'Portrait' }),
  rect(130, 120, 820, 116, MIST.white, {
    cornerRadius: 58,
    name: 'Search bar',
    ...shadow(30, 10, 'rgba(30,42,51,0.15)'),
  }),
  text('What are the best yoga poses?', 190, 154, 640, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: MIST.ink,
  }),
  icon('mic', 860, 152, 52, MIST.slate),
  rect(180, 280, 720, 440, MIST.white, {
    cornerRadius: 30,
    name: 'Results card',
    ...shadow(36, 14, 'rgba(30,42,51,0.2)'),
  }),
  POSES.map((pose, index) => [
    icon('search', 230, 326 + index * 96, 40, MIST.sage),
    text(pose, 300, 322 + index * 96, 560, {
      fontFamily: BODY,
      fontSize: 40,
      fontWeight: 500,
      fill: MIST.ink,
    }),
    index < POSES.length - 1
      ? rect(230, 392 + index * 96, 620, 2, MIST.mist, { name: 'Divider' })
      : [],
  ]),
]);
