import { linear, radial } from '@/design';
import { circle, icon, type Nodes, POST_SIZE, rect, template, text } from '../../../kit';
import { FONT, MUTED, NAVY, SKY } from './windows-sliders';

const { width: W, height: H } = POST_SIZE;
const MIDNIGHT = linear(180, '#0b1d3a', '#020617');
const ROYAL = '#2563eb';

const bubbles = (dark: boolean): Nodes[] => {
  const fill = dark
    ? radial('rgba(125,211,252,0.32)', 'rgba(125,211,252,0.04)')
    : radial('rgba(37,99,235,0.16)', 'rgba(37,99,235,0.02)');
  return [circle(940, 150, 130, fill), circle(130, 1190, 110, fill)];
};

export const bubblesCover = template(W, H, () => [
  rect(0, 0, W, H, MIDNIGHT, { name: 'Background' }),
  bubbles(true),
  text('STUDIO SYSTEMS', 0, 220, W, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 800,
    fill: '#ffffff',
    letterSpacing: 2,
    align: 'center',
  }),
  text('What I Learned', 0, 420, W, {
    fontFamily: FONT,
    fontSize: 84,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  text('Designing With AI', 0, 520, W, {
    fontFamily: FONT,
    fontSize: 84,
    fontWeight: 800,
    fill: SKY,
    align: 'center',
  }),
  text('Real lessons from using AI\nin everyday creative work', 0, 650, W, {
    fontFamily: FONT,
    fontSize: 42,
    fontWeight: 500,
    fill: MUTED,
    align: 'center',
    lineHeight: 1.35,
  }),
  rect(320, 840, 440, 100, '#ffffff', { name: 'Swipe pill', cornerRadius: 50 }),
  text('Swipe to continue', 360, 868, 320, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 700,
    fill: NAVY,
  }),
  icon('arrow-right', 686, 866, 48, NAVY, { strokeWidth: 2.75 }),
]);

const lesson = (dark: boolean, number: string, lead: string, accent: string, body: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, dark ? MIDNIGHT : linear(180, '#ffffff', '#eaf3ff'), {
      name: 'Background',
    }),
    bubbles(dark),
    rect(465, 300, 150, 150, dark ? '#ffffff' : linear(160, '#123a7a', '#07142b'), {
      name: 'Number tile',
      cornerRadius: 26,
    }),
    text(number, 465, 334, 150, {
      fontFamily: FONT,
      fontSize: 68,
      fontWeight: 800,
      fill: dark ? NAVY : '#ffffff',
      align: 'center',
    }),
    text(lead, 0, 510, W, {
      fontFamily: FONT,
      fontSize: 76,
      fontWeight: 800,
      fill: dark ? '#ffffff' : NAVY,
      align: 'center',
    }),
    text(accent, 0, 600, W, {
      fontFamily: FONT,
      fontSize: 76,
      fontWeight: 800,
      fill: dark ? SKY : ROYAL,
      align: 'center',
    }),
    text(body, 150, 730, 780, {
      fontFamily: FONT,
      fontSize: 40,
      fontWeight: 500,
      fill: dark ? MUTED : '#475569',
      align: 'center',
      lineHeight: 1.4,
    }),
    rect(430, 960, 220, 84, 'rgba(0,0,0,0)', {
      name: 'Arrow pill',
      cornerRadius: 42,
      stroke: dark ? '#ffffff' : NAVY,
      strokeWidth: 4,
    }),
    icon('arrow-right', 512, 974, 56, dark ? '#ffffff' : NAVY, { strokeWidth: 2.5 }),
  ]);

export const LESSON_STEPS = [
  lesson(
    false,
    '01',
    'AI Is a',
    'Starting Point',
    'It speeds up ideas, but the human touch is what turns them into impact.',
  ),
  lesson(
    true,
    '02',
    'Sharp Prompts,',
    'Sharper Results',
    'The more intentional your input, the more useful the output.',
  ),
  lesson(
    false,
    '03',
    'AI Boosts',
    'Creativity',
    'It removes friction, so you spend more time refining and less restarting.',
  ),
  lesson(
    true,
    '04',
    'Systems Beat',
    'Shiny Tools',
    'AI works best inside a repeatable workflow and a clear design system.',
  ),
] as const;
