import type { DesignIconName } from '@/design';
import { circle, icon, rect, type Template, template, text } from '../../../kit';
import { BODY, brandLine, COBALT, glow, H, HEAD, inkBackground, SITE, W } from './palette';

const planCover = template(W, H, () => [
  inkBackground(),
  brandLine(80, 160, COBALT.white),
  text('How Product-\nLed Teams\nShip a Plan', 80, 380, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: COBALT.white,
    lineHeight: 1.1,
  }),
  text('Where strategy aligns the team and\nexecution earns the results.', 80, 770, 900, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 500,
    fill: COBALT.sky,
    lineHeight: 1.4,
  }),
  rect(80, 1080, 340, 92, glow(), { cornerRadius: 46, name: 'Button' }),
  text('GET STARTED', 80, 1106, 340, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 800,
    fill: COBALT.white,
    align: 'center',
    letterSpacing: 2,
  }),
  [0, 1, 2].map((index) => circle(812 + index * 30, 1126, 9, COBALT.white)),
  icon('arrow-right', 900, 1080, 92, COBALT.white, { strokeWidth: 2.8 }),
]);

const glowCard = (name: DesignIconName, title: string, body: string) =>
  template(W, H, () => [
    inkBackground(),
    rect(0, 420, 56, 480, glow(), { cornerRadius: 22, name: 'Side card' }),
    rect(1024, 420, 56, 480, glow(), { cornerRadius: 22, name: 'Side card' }),
    rect(130, 300, 820, 760, glow(), { cornerRadius: 56, name: 'Card' }),
    circle(540, 300, 76, COBALT.white),
    icon(name, 502, 262, 76, COBALT.ink, { strokeWidth: 2.2 }),
    text(title, 170, 420, 740, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: COBALT.white,
      align: 'center',
      lineHeight: 1.12,
    }),
    text(body, 190, 690, 700, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 500,
      fill: COBALT.white,
      align: 'center',
      lineHeight: 1.5,
    }),
    text(SITE, 0, 1150, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: COBALT.white,
      align: 'center',
    }),
  ]);

export const PLAN_SERIES: readonly Template[] = [
  planCover,
  glowCard(
    'search',
    'Spot the Problems,\nDefine Outcomes,\nThen Prioritise',
    'Name the issues users face, decide what success looks like and dig into research before you build.',
  ),
  glowCard(
    'message-square',
    'Listen to\nCustomers and\nthe Market',
    'Every product call affects real people. Put them at the centre by talking to them early and often.',
  ),
  glowCard(
    'building-2',
    'Know the Company\nand the Product\nVision',
    'Your mission and long term vision shape every decision. Keep them visible in each planning session.',
  ),
  glowCard(
    'map',
    'Build a Roadmap\nEveryone Can\nRead',
    'Share one simple plan so design, sales and engineering pull in the same direction.',
  ),
];
