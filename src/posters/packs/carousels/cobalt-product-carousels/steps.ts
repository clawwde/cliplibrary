import { icon, poly, rect, type Template, template, text } from '../../../kit';
import { BODY, brandLine, COBALT, glow, H, HEAD, inkBackground, SITE, W } from './palette';

const waysCover = template(W, H, () => [
  inkBackground(),
  rect(80, 220, 1000, 930, COBALT.white, { cornerRadius: 44, name: 'Card' }),
  brandLine(140, 290, COBALT.ink),
  rect(140, 370, 880, 3, COBALT.line, { name: 'Divider' }),
  text('4 Ways', 140, 420, 600, {
    fontFamily: BODY,
    fontSize: 44,
    fontWeight: 500,
    fill: COBALT.grey,
  }),
  text('To Build a More\nProduct-Led', 140, 510, 880, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 800,
    fill: COBALT.ink,
    lineHeight: 1.12,
  }),
  text('Mindset', 140, 707, 880, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 800,
    fill: COBALT.blue,
    lineHeight: 1.12,
  }),
  text('A field guide for growing teams', 140, 860, 860, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: COBALT.grey,
  }),
  rect(140, 960, 880, 3, COBALT.line, { name: 'Divider' }),
  text(SITE, 140, 1040, 500, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 600,
    fill: COBALT.ink,
  }),
  icon('chevrons-right', 900, 1010, 100, COBALT.blue, { strokeWidth: 2.6 }),
]);

const stepCard = (
  number: number,
  lines: readonly (readonly [string, boolean])[],
  body: string,
  last = false,
) =>
  template(W, H, () => [
    inkBackground(),
    rect(620, 130, 460, 1090, glow(), { cornerRadius: 60, name: 'Glow block' }),
    poly(
      [
        [0, 630],
        [36, 670],
        [0, 710],
      ],
      COBALT.white,
      { name: 'Notch' },
    ),
    rect(170, 230, 740, 860, COBALT.white, { cornerRadius: 50, name: 'Card' }),
    text(`#${number}`, 170, 290, 740, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: COBALT.blue,
      align: 'center',
    }),
    lines.map(([line, accent], index) =>
      text(line, 170, 390 + index * 84, 740, {
        fontFamily: HEAD,
        fontSize: 72,
        fontWeight: 800,
        fill: accent ? COBALT.blue : COBALT.ink,
        align: 'center',
      }),
    ),
    text(body, 220, 680, 640, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 400,
      fill: COBALT.grey,
      align: 'center',
      lineHeight: 1.5,
    }),
    last
      ? []
      : poly(
          [
            [1044, 630],
            [1080, 670],
            [1044, 710],
          ],
          COBALT.ink,
          { name: 'Notch' },
        ),
  ]);

export const WAYS_SERIES: readonly Template[] = [
  waysCover,
  stepCard(
    1,
    [
      ['Know your', false],
      ['customer pains', true],
      ['and goals', false],
    ],
    'Product focus starts with real curiosity about the people you serve: what they need, what slows them down and why.',
  ),
  stepCard(
    2,
    [
      ['Set a sharp', false],
      ['product vision', true],
      ['and roadmap', false],
    ],
    'A clear vision acts as a north star. The roadmap shows the route, the audience and the value you will deliver.',
  ),
  stepCard(
    3,
    [
      ['Prioritise', false],
      ['by real value', true],
      ['not by noise', false],
    ],
    'Skip the trap of doing everything. Rank ideas by impact on customers and the business, then cut the rest.',
  ),
  stepCard(
    4,
    [
      ['Ship, learn', false],
      ['and repeat', true],
      ['every sprint', false],
    ],
    'Release small, measure honestly and feed every lesson back into the next plan.',
    true,
  ),
];
