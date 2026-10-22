import {
  circle,
  ellipse,
  icon,
  line,
  photo,
  poly,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  brandLine,
  connectingTeams,
  copy,
  GREEN_FILL,
  H,
  ideasResults,
  MINT,
  starReviews,
  struggling,
  W,
  webinarNote,
} from './posts';

const brandMistakes = template(W, H, () => [
  rect(0, 0, W, H, MINT.paper, { name: 'Background' }),
  copy('3', 80, 70, 260, 320, MINT.green, 800),
  copy('Brand\nMistakes', 300, 130, 700, 100, MINT.ink, 700),
  line(130, 450, 690, MINT.green, 4, { dashed: true, rotation: 90 }),
  [
    {
      tag: 'Inconsistent',
      body: 'Mixing visuals and voices\nacross channels blurs\nwho you really are.',
    },
    {
      tag: 'Confusing',
      body: 'Copying rivals instead of\nstanding apart leaves\nbuyers unsure.',
    },
    { tag: 'Vague', body: 'A fuzzy promise makes\nyour brand easy to\nforget and skip.' },
  ].map((item, index) => {
    const y = 500 + index * 240;
    return [
      line(130, y + 40, 80, MINT.green, 4, { dashed: true }),
      rect(220, y, 270, 80, MINT.green, { name: 'Tag', cornerRadius: 40 }),
      copy(item.tag, 220, y + 20, 270, 32, MINT.white, 700, 'center'),
      copy(item.body, 530, y - 10, 480, 30, MINT.ink, 500),
    ];
  }),
  brandLine(1240, MINT.deep),
]);

const invitedEnvelope = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  rect(200, 520, 680, 520, MINT.deep, { name: 'Envelope back', cornerRadius: 22 }),
  rotateNodes(-4, 540, 560, [
    rect(260, 300, 560, 540, MINT.white, {
      name: 'Invite card',
      cornerRadius: 12,
      ...shadow(30, 10, 'rgba(0,0,0,0.4)'),
    }),
    text("You're invited", 260, 330, 560, {
      fontFamily: 'Caveat',
      fontSize: 64,
      fontWeight: 700,
      fill: MINT.deep,
      align: 'center',
    }),
    copy('ONLINE\nWEBINAR', 260, 420, 560, 92, MINT.green, 800, 'center'),
    rect(400, 640, 280, 66, MINT.black, { name: 'Sign up pill', cornerRadius: 33 }),
    copy('Sign up today!', 400, 655, 280, 30, MINT.white, 700, 'center'),
  ]),
  poly(
    [
      [200, 690],
      [540, 880],
      [880, 690],
      [880, 1018],
      [858, 1040],
      [222, 1040],
      [200, 1018],
    ],
    GREEN_FILL,
    { name: 'Envelope pocket', ...shadow(30, -6, 'rgba(0,0,0,0.35)') },
  ),
  icon('map-pin', 360, 1110, 42, MINT.green),
  copy('Live online, everywhere', 420, 1114, 500, 32, MINT.white, 500),
  icon('calendar-days', 360, 1180, 42, MINT.green),
  copy('June 3, 2027', 420, 1184, 500, 32, MINT.white, 500),
]);

const hiringPositions = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  ellipse(140, 300, 800, 800, 'rgba(0,0,0,0)', {
    name: 'Ring',
    stroke: 'rgba(255,255,255,0.08)',
    strokeWidth: 40,
  }),
  copy("We're Hiring", 0, 120, W, 100, MINT.white, 800, 'center'),
  rect(320, 245, 440, 112, MINT.green, { name: 'Highlight', cornerRadius: 12 }),
  copy('Positions', 320, 254, 440, 84, MINT.ink, 800, 'center'),
  [
    { x: 80, y: 480, face: 'woman-portrait-4' as const, role: 'Social Lead' },
    { x: 390, y: 440, face: 'man-portrait-3' as const, role: 'Design Director' },
    { x: 700, y: 480, face: 'woman-portrait-5' as const, role: 'Content Strategist' },
  ].map((person) => [
    photo(person.face, person.x, person.y, 300, 560, {
      cornerRadius: 40,
      stroke: MINT.white,
      strokeWidth: 6,
    }),
    rect(person.x + 10, person.y + 500, 280, 64, MINT.white, {
      name: 'Role chip',
      cornerRadius: 32,
      ...shadow(20, 8, 'rgba(0,0,0,0.4)'),
    }),
    copy(person.role, person.x + 10, person.y + 518, 280, 24, MINT.ink, 700, 'center'),
  ]),
  copy('Apply at brightlane.studio/careers', 0, 1170, W, 32, MINT.grey, 500, 'center'),
]);

const fourThings = template(W, H, () => [
  rect(0, 0, W, H, GREEN_FILL, { name: 'Background' }),
  rect(294, 120, 270, 84, MINT.black, { name: 'Highlight', cornerRadius: 8 }),
  copy('4 Things', 294, 130, 270, 56, MINT.white, 800, 'center'),
  copy('Before', 584, 130, 300, 56, MINT.white, 700),
  copy('Launching a Campaign', 0, 222, W, 56, MINT.white, 700, 'center'),
  [
    ['Audience fit', 'Know exactly who you want to reach.'],
    ['Clear offer', 'Make the value obvious in one line.'],
    ['Sharp message', 'Lead with the hook, then the proof.'],
    ['Smooth path', 'Landing page, CTA and follow-up ready.'],
  ].map(([title = '', detail = ''], index) => {
    const dark = index % 2 === 0;
    const x = dark ? 110 : 350;
    const y = 380 + index * 210;
    const badgeX = dark ? x + 620 : x;
    return [
      rect(x, y, 620, 150, dark ? MINT.black : MINT.white, {
        name: 'Tip card',
        cornerRadius: 22,
        ...shadow(24, 10, 'rgba(4,80,60,0.35)'),
      }),
      copy(title, x + 44, y + 30, 540, 34, dark ? MINT.white : MINT.ink, 800),
      copy(detail, x + 44, y + 82, 540, 26, dark ? '#c9d1ce' : '#3f4643', 500),
      circle(badgeX, y, 34, dark ? MINT.white : MINT.black, { name: 'Badge' }),
      copy(
        String(index + 1),
        badgeX - 34,
        y - 18,
        68,
        30,
        dark ? MINT.ink : MINT.white,
        800,
        'center',
      ),
    ];
  }),
]);

const shareThis = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  Array.from({ length: 12 }, (_, index) =>
    rect(index * 90 + 45, 0, 2, H, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
  ),
  Array.from({ length: 15 }, (_, index) =>
    rect(0, index * 90 + 45, W, 2, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
  ),
  copy('[ Hey, make your marketing count. ]', 0, 300, W, 34, MINT.green, 600, 'center'),
  copy('Share', 0, 370, W, 210, MINT.white, 800, 'center'),
  rotateNodes(90, 270, 720, [
    icon('arrow-up-right', 180, 630, 180, MINT.green, { strokeWidth: 3 }),
  ]),
  copy('This!', 380, 610, 640, 210, MINT.white, 800),
  copy(
    'Pass it on to someone building\nauthentic connections at scale.',
    0,
    900,
    W,
    34,
    MINT.grey,
    500,
    'center',
  ),
  brandLine(1240, MINT.grey),
]);

export const strugglingPost = struggling(H);
export const strugglingStory = struggling(STORY_SIZE.height);

export const POSTS = [
  connectingTeams,
  starReviews,
  ideasResults,
  brandMistakes,
  webinarNote,
  strugglingPost,
  fourThings,
  shareThis,
  invitedEnvelope,
  hiringPositions,
];
