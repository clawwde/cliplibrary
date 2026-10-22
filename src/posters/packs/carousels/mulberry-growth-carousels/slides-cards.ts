import { checklist, circle, icon, type Nodes, rect, shadow, template, text } from '../../../kit';
import { backdrop, H, MULBERRY, SANS, say, W } from './palette';

const CARD = { x: 90, y: 150, width: 900, height: 1050 };

const postCard = (activeDot: number, content: Nodes[]) =>
  template(W, H, () => [
    backdrop(),
    rect(170, 0, 740, 96, MULBERRY.blush, { name: 'Top tab', cornerRadius: 28 }),
    rect(170, 1254, 740, 96, MULBERRY.blush, { name: 'Bottom tab', cornerRadius: 28 }),
    rect(CARD.x, CARD.y, CARD.width, CARD.height, MULBERRY.cream, {
      name: 'Card',
      cornerRadius: 44,
      ...shadow(40, 16, 'rgba(0,0,0,0.3)'),
    }),
    circle(178, 240, 36, MULBERRY.wine),
    text('F', 142, 216, 72, {
      fontFamily: SANS,
      fontSize: 40,
      fontWeight: 800,
      fill: MULBERRY.white,
      align: 'center',
    }),
    say('Fernway', 232, 216, 400, 38, MULBERRY.ink, 600),
    rect(840, 222, 70, 8, MULBERRY.ink, { name: 'Menu line', cornerRadius: 4 }),
    rect(862, 246, 48, 8, MULBERRY.ink, { name: 'Menu line', cornerRadius: 4 }),
    content,
    icon('heart', 150, 1110, 48, '#e0245e', { strokeWidth: 2.4 }),
    icon('message-circle', 222, 1110, 48, MULBERRY.ink, { strokeWidth: 2.2 }),
    icon('send', 294, 1110, 48, MULBERRY.ink, { strokeWidth: 2.2 }),
    [0, 1, 2, 3].map((index) =>
      circle(500 + index * 30, 1134, 9, index === activeDot ? MULBERRY.wine : '#d9c3c9'),
    ),
    icon('bookmark', 882, 1110, 48, MULBERRY.ink, { strokeWidth: 2.2 }),
  ]);

const cardTitle = (content: string) =>
  say(content, 150, 340, 780, 84, MULBERRY.wine, 800, { lineHeight: 1.08 });

export const cardCover = postCard(0, [
  say('Social Posts', 150, 380, 780, 96, MULBERRY.wine, 800, { lineHeight: 1 }),
  say('that stop\nthe scroll', 150, 500, 780, 84, MULBERRY.ink, 400, { lineHeight: 1.15 }),
  icon('move-right', 150, 760, 130, MULBERRY.ink, { strokeWidth: 1.6 }),
]);

export const cardRemix = postCard(1, [
  cardTitle('Remix a\nWinner'),
  checklist(['SPOT a rising format', 'STUDY its structure', 'SHIP your own spin'], 150, 620, 760, {
    color: MULBERRY.ink,
    iconColor: MULBERRY.wine,
    fontSize: 42,
    fontFamily: SANS,
    fontWeight: 500,
    gap: 96,
  }),
]);

export const cardProcess = postCard(2, [
  cardTitle('Show the\nProcess'),
  say(
    'Share the messy drafts that led\nto the final result. People trust\nwhat they watch you build, so\nshow the work behind the polish.',
    150,
    620,
    760,
    40,
    MULBERRY.ink,
    400,
    { lineHeight: 1.45 },
  ),
]);

export const cardContrarian = postCard(3, [
  cardTitle('The Contrarian\nTake'),
  say(
    '1. Name the popular myth\n2. Flip it with your angle\n3. Back it up with proof',
    150,
    620,
    760,
    42,
    MULBERRY.ink,
    500,
    { lineHeight: 1.9 },
  ),
]);
