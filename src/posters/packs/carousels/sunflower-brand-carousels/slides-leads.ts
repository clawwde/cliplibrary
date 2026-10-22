import { radial } from '@/design';
import { circle, icon, rect, template } from '../../../kit';
import { creamBackground, H, SUN, say, swipeArrow, W } from './palette';

const bubble = () =>
  circle(
    740,
    1040,
    300,
    radial('rgba(255,255,255,0.95)', 'rgba(255,239,196,0.6)', 'rgba(255,201,60,0.18)'),
    { name: 'Bubble', stroke: 'rgba(255,255,255,0.9)', strokeWidth: 4 },
  );

export const leadsCover = template(W, H, () => [
  creamBackground(),
  bubble(),
  say('harbourline.co', 90, 90, 500, 30, SUN.ink, 600),
  rect(90, 430, 210, 60, SUN.gold, { name: 'Tag', cornerRadius: 30 }),
  say('Sales tip', 90, 442, 210, 30, SUN.white, 700, { align: 'center' }),
  say('How to\nConvert', 90, 520, 900, 110, SUN.ink, 800, { lineHeight: 1.02 }),
  say('Leads', 90, 744, 900, 110, SUN.amber, 800, { lineHeight: 1.02 }),
  say('Swipe to read', 90, 920, 400, 32, SUN.muted, 500),
  rect(320, 914, 56, 44, SUN.gold, { name: 'Arrow chip', cornerRadius: 12 }),
  icon('chevron-right', 330, 918, 36, SUN.white, { strokeWidth: 3 }),
]);

const tab = (side: 'left' | 'right') =>
  rect(side === 'left' ? 0 : W - 44, 420, 44, 520, SUN.gold, {
    name: 'Side tab',
    cornerRadius: 22,
  });

const leadStep = (label: string, title: string, body: string, side: 'left' | 'right') =>
  template(W, H, () => [
    creamBackground(),
    bubble(),
    tab(side),
    say(label, 110, 300, 800, 46, SUN.amber, 800),
    say(title, 110, 380, 900, 84, SUN.ink, 800, { lineHeight: 1.1 }),
    say(body, 110, 600, 860, 44, SUN.muted, 500, { lineHeight: 1.45 }),
    swipeArrow(SUN.ink),
  ]);

export const leadSpeed = leadStep(
  'Speed Matters',
  'Reply to Leads\nWithin the Hour',
  'The faster you answer, the\nwarmer the conversation stays.',
  'right',
);

export const leadQuestions = leadStep(
  'Ask First',
  'Ask Questions\nBefore You Pitch',
  'Understand their problem\nbefore you offer the fix.',
  'left',
);

export const leadValue = leadStep(
  'Lead With Value',
  'Sell the Outcome,\nNot the Features',
  'Show how life looks once\ntheir pain is finally solved.',
  'right',
);
