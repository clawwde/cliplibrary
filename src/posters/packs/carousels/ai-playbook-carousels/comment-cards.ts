import { linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Plus Jakarta Sans';
const INK = '#0b2b26';
const TEAL = '#0f766e';
const MINT = '#5eead4';
const GREY = '#64748b';
const BACKDROP = linear(160, '#0f766e', '#064e3b');

interface Person {
  photo: PosterPhotoName;
  name: string;
  role: string;
}

const comment = (
  x: number,
  y: number,
  width: number,
  person: Person,
  message: string,
  rotation: number,
): Nodes[] =>
  rotateNodes(rotation, x + width / 2, y + 75, [
    rect(x, y, width, 150, '#ffffff', {
      name: 'Comment card',
      cornerRadius: 18,
      ...shadow(24, 10, 'rgba(2,44,34,0.35)'),
    }),
    avatar(person.photo, x + 46, y + 46, 26),
    text(person.name, x + 86, y + 20, width - 100, {
      fontFamily: FONT,
      fontSize: 26,
      fontWeight: 700,
      fill: INK,
    }),
    text(person.role, x + 86, y + 52, width - 100, {
      fontFamily: FONT,
      fontSize: 19,
      fontWeight: 500,
      fill: GREY,
    }),
    text(message, x + 28, y + 98, width - 56, {
      fontFamily: FONT,
      fontSize: 24,
      fontWeight: 500,
      fill: INK,
    }),
  ]);

export const commentsCover = template(W, H, () => [
  rect(0, 0, W, H, BACKDROP, { name: 'Background' }),
  comment(
    60,
    170,
    410,
    { photo: 'woman-portrait-1', name: 'Olivia Grant', role: 'Brand Strategist' },
    'Start with a clear goal',
    -6,
  ),
  comment(
    610,
    130,
    420,
    { photo: 'man-portrait-1', name: 'Marco Silva', role: 'Content Lead' },
    'Context beats clever words',
    5,
  ),
  icon('move-up-right', 700, 340, 110, '#ffffff', { strokeWidth: 1.75 }),
  rect(260, 480, 560, 330, '#ffffff', {
    name: 'Question card',
    cornerRadius: 26,
    ...shadow(40, 16, 'rgba(2,44,34,0.4)'),
  }),
  rect(300, 520, 96, 96, INK, { name: 'Logo', cornerRadius: 24 }),
  icon('layers', 322, 542, 52, MINT, { strokeWidth: 2 }),
  text('Northpeak Labs', 420, 532, 380, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: INK,
  }),
  icon('badge-check', 420, 580, 30, TEAL, { strokeWidth: 2.25 }),
  text('Verified page', 458, 580, 300, {
    fontFamily: FONT,
    fontSize: 22,
    fontWeight: 500,
    fill: GREY,
  }),
  text('What is your favourite\nAI shortcut?', 300, 640, 500, {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 600,
    fill: INK,
    lineHeight: 1.25,
  }),
  icon('message-square', 300, 755, 28, GREY, { strokeWidth: 2 }),
  text('64 comments', 340, 755, 300, {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 500,
    fill: GREY,
  }),
  comment(
    60,
    990,
    400,
    { photo: 'man-portrait-3', name: 'Daniel Kim', role: 'Sales Director' },
    'Show it two good examples',
    4,
  ),
  comment(
    610,
    1080,
    410,
    { photo: 'woman-portrait-4', name: 'Hana Ito', role: 'Ops Manager' },
    'Ask it to critique a draft',
    -5,
  ),
  icon('sparkles', 500, 900, 64, MINT, { strokeWidth: 2 }),
]);

const commentStep = (headline: string, body: string, person: Person, tool: string, rest: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, BACKDROP, { name: 'Background' }),
    comment(
      680,
      110,
      360,
      { photo: 'woman-portrait-6', name: 'Rosa Diaz', role: 'Founder' },
      'Saved me hours',
      5,
    ),
    text(headline, 90, 360, 900, {
      fontFamily: FONT,
      fontSize: 56,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text(body, 130, 440, 820, {
      fontFamily: FONT,
      fontSize: 46,
      fontWeight: 400,
      fill: '#ecfdf5',
      align: 'center',
      lineHeight: 1.35,
    }),
    rect(270, 720, 540, 260, '#ffffff', {
      name: 'Quote card',
      cornerRadius: 22,
      ...shadow(36, 14, 'rgba(2,44,34,0.4)'),
    }),
    avatar(person.photo, 330, 780, 34),
    text(person.name, 380, 752, 400, {
      fontFamily: FONT,
      fontSize: 30,
      fontWeight: 700,
      fill: INK,
    }),
    text(person.role, 380, 792, 400, {
      fontFamily: FONT,
      fontSize: 22,
      fontWeight: 500,
      fill: GREY,
    }),
    text(tool, 300, 850, 480, {
      fontFamily: FONT,
      fontSize: 34,
      fontWeight: 800,
      fill: TEAL,
    }),
    text(rest, 300, 896, 480, {
      fontFamily: FONT,
      fontSize: 32,
      fontWeight: 500,
      fill: INK,
    }),
    comment(
      50,
      1110,
      380,
      { photo: 'man-portrait-2', name: 'Ethan Moss', role: 'Analyst' },
      'Use it for structure',
      -4,
    ),
  ]);

export const COMMENT_STEPS = [
  commentStep(
    'Skip the blank page.',
    'Let AI draft a first version you can shape instead of staring at nothing.',
    { photo: 'woman-portrait-2', name: 'Priya Nair', role: 'Head of Content' },
    'Draftly',
    'is perfect for first outlines.',
  ),
  commentStep(
    'Stop guessing at trends.',
    'Use AI to spot patterns in sales, churn and support tickets in minutes.',
    { photo: 'man-portrait-1', name: 'Leo Hart', role: 'Growth Analyst' },
    'Signalbox',
    'surfaces trends I would miss.',
  ),
  commentStep(
    'Untangle messy notes.',
    'AI can turn scattered notes into clear tasks, owners and due dates.',
    { photo: 'woman-portrait-5', name: 'Ana Ruiz', role: 'Operations Lead' },
    'Tidynote',
    'turns notes into task lists.',
  ),
] as const;

export const searchCover = template(W, H, () => [
  rect(0, 0, W, H, BACKDROP, { name: 'Background' }),
  text('PRACTICAL PLAYBOOK', 90, 420, 900, {
    fontFamily: FONT,
    fontSize: 30,
    fontWeight: 700,
    fill: MINT,
    letterSpacing: 3,
  }),
  text('4 Ways AI\nGives You Back\nYour Week', 90, 480, 920, {
    fontFamily: FONT,
    fontSize: 96,
    fontWeight: 500,
    fill: '#ffffff',
    lineHeight: 1.1,
  }),
  rect(90, 1040, 900, 112, '#ffffff', { name: 'Search bar', cornerRadius: 56 }),
  icon('search', 132, 1070, 52, GREY, { strokeWidth: 2.25 }),
  text('What should I automate?', 204, 1074, 600, {
    fontFamily: FONT,
    fontSize: 38,
    fontWeight: 500,
    fill: GREY,
  }),
  circle(930, 1096, 40, TEAL),
  icon('arrow-right', 908, 1074, 44, '#ffffff', { strokeWidth: 2.5 }),
]);

const ACTIONS = [
  { name: 'thumbs-up', label: 'Like' },
  { name: 'message-square', label: 'Comment' },
  { name: 'repeat', label: 'Repost' },
  { name: 'send', label: 'Send' },
] as const;

const strategy = (index: number, person: Person, title: string, body: string, progress: number) =>
  template(W, H, () => [
    rect(0, 0, W, H, BACKDROP, { name: 'Background' }),
    rect(110, 190, 860, 840, '#ffffff', {
      name: 'Post card',
      cornerRadius: 32,
      ...shadow(40, 16, 'rgba(2,44,34,0.4)'),
    }),
    rect(400, 150, 280, 72, '#ccfbf1', {
      name: 'Tab',
      cornerRadius: 20,
      ...shadow(16, 6, 'rgba(2,44,34,0.25)'),
    }),
    text(`WAY ${index}`, 400, 168, 280, {
      fontFamily: FONT,
      fontSize: 30,
      fontWeight: 800,
      fill: TEAL,
      align: 'center',
      letterSpacing: 2,
    }),
    avatar(person.photo, 206, 316, 44),
    text(person.name, 268, 282, 400, {
      fontFamily: FONT,
      fontSize: 32,
      fontWeight: 700,
      fill: INK,
    }),
    text(person.role, 268, 324, 400, {
      fontFamily: FONT,
      fontSize: 24,
      fontWeight: 500,
      fill: GREY,
    }),
    text('+ Follow', 740, 296, 190, {
      fontFamily: FONT,
      fontSize: 30,
      fontWeight: 700,
      fill: TEAL,
      align: 'right',
    }),
    text(title, 162, 400, 760, {
      fontFamily: FONT,
      fontSize: 60,
      fontWeight: 800,
      fill: INK,
      lineHeight: 1.12,
    }),
    text(body, 162, 560, 760, {
      fontFamily: FONT,
      fontSize: 34,
      fontWeight: 400,
      fill: '#475569',
      lineHeight: 1.45,
    }),
    icon('thumbs-up', 162, 856, 28, TEAL, { strokeWidth: 2 }),
    text('128', 200, 856, 200, { fontFamily: FONT, fontSize: 24, fontWeight: 500, fill: GREY }),
    text('24 comments', 620, 856, 300, {
      fontFamily: FONT,
      fontSize: 24,
      fontWeight: 500,
      fill: GREY,
      align: 'right',
    }),
    rect(162, 900, 756, 3, '#e2e8f0', { name: 'Rule' }),
    ACTIONS.map((action, slot) => [
      icon(action.name, 222 + slot * 190, 924, 38, '#334155', { strokeWidth: 2 }),
      text(action.label, 166 + slot * 190, 970, 150, {
        fontFamily: FONT,
        fontSize: 22,
        fontWeight: 500,
        fill: '#334155',
        align: 'center',
      }),
    ]),
    rect(110, 1110, 860, 14, 'rgba(255,255,255,0.25)', { name: 'Track', cornerRadius: 7 }),
    rect(110, 1110, 860 * progress, 14, '#ffffff', { name: 'Progress', cornerRadius: 7 }),
  ]);

export const STRATEGY_STEPS = [
  strategy(
    1,
    { photo: 'man-portrait-2', name: 'Daniel Brooks', role: 'Operations Director' },
    'Start With Real\nPain Points',
    'Do not add AI because it is new. List the slow, repetitive or error prone tasks your team hates and solve those first.',
    0.3,
  ),
  strategy(
    2,
    { photo: 'man-portrait-1', name: 'Mason Webb', role: 'Customer Lead' },
    'Assist People,\nDo Not Replace Them',
    'Strong teams let AI handle drafts and research so people can spend their time on judgement and relationships.',
    0.55,
  ),
  strategy(
    3,
    { photo: 'woman-portrait-5', name: 'Grace Lin', role: 'Product Manager' },
    'Turn Wins Into\nShared Workflows',
    'Once a prompt works, save it as a team template so everyone gets the same quality every single time.',
    0.8,
  ),
] as const;
