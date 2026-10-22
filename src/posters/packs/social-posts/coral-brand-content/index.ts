import { linear } from '@/design';
import {
  card,
  circle,
  fitBox,
  fitWidth,
  group,
  icon,
  mosaicCover,
  numbered,
  page,
  phone,
  phoneScreen,
  postInPhone,
  rect,
  type SlideTheme,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { definePack, LANDSCAPE } from '../../../pack';
import { CORAL, focusBridge, HEAD, howWeGrow, luxury, ourServices, standOut, TEAL } from './posts';
import {
  creativity,
  didYouKnow,
  everyMoment,
  nextLevel,
  seoInsights,
  takeTheSeat,
} from './posts-more';

const { width: W } = LANDSCAPE;
const BACKDROP = linear(135, '#2a1036', '#6b2457');
const WHITE = '#ffffff';

const POSTS = [
  standOut,
  luxury,
  howWeGrow,
  creativity,
  focusBridge,
  ourServices,
  takeTheSeat,
  everyMoment(CORAL),
  seoInsights(CORAL),
  nextLevel,
  didYouKnow,
];

const THEME: SlideTheme = {
  background: CORAL.ink,
  text: WHITE,
  muted: '#d8cfdc',
  surface: WHITE,
  ink: CORAL.ink,
  brand: CORAL.primary,
  accent: CORAL.accent,
  headFont: HEAD,
  bodyFont: 'Inter',
};

const nextLevelStory = template(STORY_SIZE.width, STORY_SIZE.height, () => [
  rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, CORAL.primary, { name: 'Background' }),
  fitWidth(nextLevel, 0, 420, STORY_SIZE.width),
  text('Swipe up to start', 0, 1640, STORY_SIZE.width, {
    fontFamily: HEAD,
    fontSize: 48,
    fontWeight: 700,
    fill: CORAL.ink,
    align: 'center',
  }),
]);

const showcase = () =>
  page(
    BACKDROP,
    text('20 Scroll-Stopping Content\nIdeas for Your Feed', 0, 60, W, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: WHITE,
      align: 'center',
      lineHeight: 1.12,
    }),
    text('Sized for feeds, pages and professional networks', 0, 250, W, {
      fontSize: 32,
      fontWeight: 500,
      fill: '#f0dbe8',
      align: 'center',
    }),
    text('Feed posts and matching stories included', 0, 1050, W, {
      fontSize: 30,
      fontWeight: 600,
      fill: CORAL.accent,
      align: 'center',
    }),
    POSTS.slice(0, 10).map((item, index) =>
      fitWidth(item, 18 + (index % 5) * 316, 340 + Math.floor(index / 5) * 316, 300),
    ),
  );

const arrowBubble = (cx: number, cy: number) => [
  circle(cx, cy, 50, WHITE),
  icon('arrow-right', cx - 28, cy - 28, 56, CORAL.primary, { strokeWidth: 3 }),
];

const customize = () =>
  page(
    BACKDROP,
    group(
      circle(70, 70, 110, linear(135, CORAL.primary, '#7c3aed'), shadow(24, 8)),
      icon('wand-sparkles', 50, 50, 70, WHITE),
    ),
    text('Customize\nin Minutes', 80, 250, 560, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: WHITE,
      lineHeight: 1.08,
    }),
    text('100% editable', 80, 470, 500, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 700,
      fill: CORAL.accent,
    }),
    rect(80, 610, 500, 4, WHITE, { dashed: true, name: 'Divider' }),
    text(
      'Editable social templates\nthat open right in your\nbrowser, no extra apps',
      80,
      670,
      520,
      {
        fontSize: 36,
        fontWeight: 600,
        fill: WHITE,
        lineHeight: 1.4,
      },
    ),
    fitBox(everyMoment(CORAL), 640, 110, 400, 400),
    arrowBubble(1110, 310),
    fitBox(everyMoment(TEAL), 1180, 110, 400, 400),
    fitBox(seoInsights(CORAL), 640, 660, 400, 400),
    arrowBubble(1110, 860),
    fitBox(seoInsights(TEAL), 1180, 660, 400, 400),
  );

const howItWorks = () =>
  page(
    BACKDROP,
    text('How does it work?', 120, 140, 1300, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: WHITE,
    }),
    card(120, 330, 1360, 620, { radius: 32 }),
    numbered(
      [
        'Download the pack the moment you check out',
        'Change words, colours and branding in the editor',
        'Export and share across every channel',
      ],
      200,
      430,
      1220,
      { fontSize: 44, numberColor: CORAL.primary, gap: 130, fontFamily: HEAD, color: CORAL.ink },
    ),
    text('No design experience needed: it all runs in your browser.', 200, 840, 1200, {
      fontSize: 32,
      fontWeight: 500,
      fill: '#4b4450',
    }),
  );

const storyPhone = (x: number, y: number, width: number) => {
  const screen = phoneScreen(width);
  return phone(x, y, width, {
    screen: CORAL.primary,
    content: [fitBox(nextLevelStory, 0, 0, screen.width, screen.height)],
  });
};

const deliverable = (x: number, label: string, size: string) => [
  text('20', x, 560, 300, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 800,
    fill: CORAL.primary,
  }),
  text(label, x, 720, 360, { fontSize: 32, fontWeight: 600, fill: CORAL.ink }),
  rect(x, 780, 290, 4, CORAL.ink, { dashed: true, name: 'Divider' }),
  text(size, x, 810, 360, { fontSize: 28, fontWeight: 500, fill: '#6b6470' }),
];

const deliverables = () =>
  page(
    BACKDROP,
    text('Ready-to-post content.', 80, 60, 1400, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: WHITE,
    }),
    card(80, 210, 1440, 920, { radius: 32 }),
    text('Perfect for:', 160, 280, 400, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 700,
      fill: CORAL.ink,
    }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(470 + index * 110, 308, 40, CORAL.primary),
      icon(name, 448 + index * 110, 286, 44, WHITE),
    ]),
    text('What you get:', 160, 400, 600, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 700,
      fill: CORAL.ink,
    }),
    postInPhone(160, 490, 270, didYouKnow, THEME, 'halcyon.studio'),
    deliverable(490, 'Feed posts', '1080 x 1080 px'),
    storyPhone(860, 490, 270),
    deliverable(1180, 'Stories', '1080 x 1920 px'),
  );

const brand = () =>
  page(
    BACKDROP,
    text('More Than Just a Template', 80, 60, 1400, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: WHITE,
    }),
    group(
      rect(80, 190, 600, 400, linear(135, CORAL.primary, '#ff9a6b'), {
        cornerRadius: 40,
        ...shadow(40, 18, 'rgba(0,0,0,0.3)'),
      }),
      icon('folder', 140, 250, 140, WHITE, { strokeWidth: 1.6 }),
      text('Brand Pack', 320, 280, 320, {
        fontFamily: HEAD,
        fontSize: 44,
        fontWeight: 700,
        fill: WHITE,
      }),
      text('21.3 MB', 320, 340, 300, {
        fontSize: 28,
        fontWeight: 500,
        fill: 'rgba(255,255,255,0.85)',
      }),
      rect(140, 480, 420, 48, 'rgba(0,0,0,0.2)', { cornerRadius: 24, name: 'Progress track' }),
      rect(140, 480, 340, 48, WHITE, { cornerRadius: 24, name: 'Progress' }),
      icon('circle-check', 500, 470, 68, WHITE),
    ),
    text('Halcyon\nStudio', 780, 230, 760, {
      fontFamily: HEAD,
      fontSize: 140,
      fontWeight: 800,
      fill: 'rgba(255,255,255,0.35)',
      lineHeight: 1.05,
    }),
    rect(0, 660, W, 540, 'rgba(255,255,255,0.12)', { name: 'Strip' }),
    POSTS.slice(0, 14).map((item, index) =>
      fitWidth(item, 30 + (index % 7) * 222, 690 + Math.floor(index / 7) * 240, 210),
    ),
    POSTS.slice(0, 3).map((item, index) => fitWidth(item, 30 + (index + 4) * 222, 930, 210)),
  );

export const coralBrandContentPack = definePack({
  id: 'coral-brand-content',
  title: 'Coral Brand Content',
  description:
    'Square brand authority posts for agencies and B2B teams in coral, ink and plum, with a story size.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'small-business', 'photo'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    mosaicCover(LANDSCAPE, THEME, POSTS, [], { columns: 5 }),
    showcase,
    customize,
    howItWorks,
    deliverables,
    brand,
  ],
});
