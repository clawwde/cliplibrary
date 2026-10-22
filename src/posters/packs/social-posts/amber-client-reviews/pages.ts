import { linear } from '@/design';
import {
  card,
  circle,
  fitBox,
  group,
  icon,
  mosaic,
  page,
  phone,
  phoneScreen,
  pill,
  postInPhone,
  rect,
  type SlideTheme,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import { AMBER, clientsSay, HEAD, photoQuote, ROSE, reviewLetters } from './posts';
import { clientEnvelope, clientEnvelopeStory, typewriter } from './posts-more';

const { width: W, height: H } = LANDSCAPE;
export const INK = '#0b0b0d';
export const WHITE = '#ffffff';

export const POSTS = [
  clientEnvelope,
  photoQuote,
  reviewLetters(AMBER),
  clientsSay(AMBER),
  typewriter(AMBER),
];

const THEME: SlideTheme = {
  background: INK,
  text: WHITE,
  muted: '#d4d4d8',
  surface: WHITE,
  ink: INK,
  brand: AMBER.to,
  accent: AMBER.from,
  headFont: HEAD,
  bodyFont: 'Inter',
};

const editorBadge = (x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, AMBER.from, '#7c3aed'), {
      cornerRadius: size * 0.24,
      name: 'Editor badge',
      ...shadow(24, 10),
    }),
    icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, WHITE),
  );

export const cover = () =>
  page(
    INK,
    mosaic(LANDSCAPE, POSTS, { columns: 6, gap: 24 }),
    rect(0, 0, W, H, 'rgba(11,11,13,0.35)', { name: 'Dim' }),
    card(280, 300, 1040, 560, { radius: 40 }),
    text('Ready-to-Use', 340, 350, 700, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: INK,
    }),
    text('Client Reviews', 340, 450, 760, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: AMBER.to,
    }),
    text('Testimonial posts for AI and digital brands', 340, 575, 760, {
      fontSize: 34,
      fontWeight: 700,
      fill: INK,
    }),
    text('5 premium social posts + matching stories', 340, 630, 760, {
      fontSize: 30,
      fontWeight: 500,
      fill: '#52525b',
    }),
    pill('A BONUS IS WAITING  >  SWIPE TO SEE IT', 340, 720, {
      fill: INK,
      color: WHITE,
      fontSize: 26,
      letterSpacing: 1,
    }),
    editorBadge(1130, 360, 140),
    icon('gift', 1150, 700, 110, AMBER.to, { strokeWidth: 1.8 }),
  );

export const showcase = () =>
  page(
    INK,
    text('Premium Social Media Reviews', 0, 70, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 900,
      fill: WHITE,
      align: 'center',
    }),
    text('Polished copy, tuned to build trust', 0, 180, W, {
      fontSize: 30,
      fontWeight: 500,
      fill: '#a1a1aa',
      align: 'center',
    }),
    fitBox(reviewLetters(AMBER), 430, 260, 340, 425),
    fitBox(clientsSay(AMBER), 830, 260, 340, 425),
    fitBox(photoQuote, 250, 720, 340, 425),
    fitBox(typewriter(AMBER), 630, 720, 340, 425),
    fitBox(clientEnvelope, 1010, 720, 340, 425),
  );

const storyPhone = (x: number, y: number, width: number) => {
  const screen = phoneScreen(width);
  return phone(x, y, width, {
    screen: AMBER.from,
    content: [fitBox(clientEnvelopeStory, 0, 0, screen.width, screen.height)],
  });
};

const deliverable = (x: number, label: string, size: string) => [
  text('5', x, 600, 200, { fontFamily: HEAD, fontSize: 120, fontWeight: 900, fill: INK }),
  text(label, x, 760, 360, { fontSize: 32, fontWeight: 500, fill: '#3f3f46' }),
  rect(x, 820, 320, 4, INK, { dashed: true, name: 'Divider' }),
  text(size, x, 850, 360, { fontSize: 28, fontWeight: 500, fill: '#71717a' }),
];

export const deliverables = () =>
  page(
    INK,
    text('Ready-to-post content.', 120, 70, 1300, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 900,
      fill: WHITE,
    }),
    card(120, 220, 1360, 880, { radius: 36 }),
    text('Perfect for:', 200, 290, 400, { fontSize: 40, fontWeight: 700, fill: INK }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(500 + index * 110, 314, 40, AMBER.to),
      icon(name, 478 + index * 110, 292, 44, WHITE),
    ]),
    text('What you get:', 200, 410, 600, { fontSize: 40, fontWeight: 700, fill: INK }),
    postInPhone(200, 500, 270, clientsSay(AMBER), THEME, 'brightline.studio'),
    deliverable(520, 'Feed posts', '1080 x 1350 px'),
    storyPhone(880, 500, 270),
    deliverable(1190, 'Story slides', '1080 x 1920 px'),
  );

const arrowBubble = (cx: number, cy: number) => [
  circle(cx, cy, 52, WHITE),
  icon('arrow-right', cx - 30, cy - 30, 60, AMBER.to, { strokeWidth: 3 }),
];

const framed = (item: Template, x: number, y: number) => [
  rect(x - 3, y - 3, 406, 506, 'rgba(0,0,0,0)', {
    stroke: 'rgba(255,255,255,0.3)',
    strokeWidth: 3,
    name: 'Frame',
  }),
  fitBox(item, x, y, 400, 500),
];

export const editable = () =>
  page(
    INK,
    text('Editable\nReview Posts\nin Your\nBrowser', 80, 130, 560, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 900,
      fill: WHITE,
      lineHeight: 1.08,
    }),
    rect(80, 560, 480, 4, WHITE, { dashed: true, name: 'Divider' }),
    text('Customize in\nminutes', 80, 610, 500, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 700,
      fill: WHITE,
      lineHeight: 1.15,
    }),
    text('100% editable', 80, 760, 500, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 800,
      fill: AMBER.from,
    }),
    framed(clientsSay(AMBER), 640, 70),
    arrowBubble(1110, 320),
    framed(clientsSay(ROSE), 1180, 70),
    framed(typewriter(AMBER), 640, 630),
    arrowBubble(1110, 880),
    framed(typewriter(ROSE), 1180, 630),
  );
