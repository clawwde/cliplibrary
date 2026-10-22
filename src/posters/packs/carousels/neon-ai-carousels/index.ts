import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  type CarouselRow,
  carouselCover,
  carouselRowPhones,
  carouselWall,
} from '../mulberry-growth-carousels/listing';
import {
  roadmapAudit,
  roadmapCover,
  roadmapScale,
  roadmapTeam,
  tipAgents,
  tipData,
  tipPrompts,
  waysCover,
} from './slides-blueprint';
import {
  automationCover,
  automationFramework,
  automationFriction,
  automationQuiet,
  smoothContext,
  smoothCover,
  smoothFeedback,
  smoothReview,
} from './slides-friction';
import {
  flowCover,
  flowFeedback,
  flowJourney,
  flowPrompts,
  impactAgents,
  impactCover,
  impactCurious,
  impactSystems,
} from './slides-impact';

const LIGHT: SlideTheme = {
  background: '#ecebef',
  text: '#120c1c',
  muted: '#3d3549',
  surface: '#ffffff',
  ink: '#120c1c',
  brand: '#2a1748',
  accent: '#ff5fa2',
  headFont: 'Sora',
  bodyFont: 'Sora',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d4d0da',
  accent: '#ff8fbf',
};

const ROADMAP: CarouselRow = [roadmapCover, roadmapAudit, roadmapTeam, roadmapScale];
const WAYS: CarouselRow = [waysCover, tipAgents, tipPrompts, tipData];
const IMPACT: CarouselRow = [impactCover, impactSystems, impactCurious, impactAgents];
const FLOW: CarouselRow = [flowCover, flowJourney, flowPrompts, flowFeedback];
const AUTOMATION: CarouselRow = [
  automationCover,
  automationFriction,
  automationFramework,
  automationQuiet,
];
const SMOOTH: CarouselRow = [smoothCover, smoothFeedback, smoothContext, smoothReview];

const feed = {
  subtitle: 'LinkedIn & Instagram',
  handle: 'loomwork',
  followers: '31,075 followers',
};

const phones = (title: string, row: CarouselRow) =>
  carouselRowPhones(SQUARE_SIZE, LIGHT, { ...feed, title }, row);

export const neonAiCarouselsPack = definePack({
  id: 'neon-ai-carousels',
  title: 'Neon AI Carousels',
  description:
    'Six midnight and neon pink carousels about AI workflows, agents and automation for tech and SaaS brands.',
  category: 'carousels',
  tags: ['carousel', 'ai', 'saas', 'linkedin', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    carouselCover(
      SQUARE_SIZE,
      LIGHT,
      { count: '6', label: ['AI & SaaS', 'Carousel', 'Templates'].join('\n'), pages: '24 Slides' },
      [ROADMAP, WAYS, IMPACT, FLOW, AUTOMATION, SMOOTH],
    ),
    carouselWall(SQUARE_SIZE, LIGHT, [ROADMAP, WAYS, IMPACT], {
      tileWidth: 300,
      shiftX: -60,
    }),
    carouselWall(SQUARE_SIZE, LIGHT, [FLOW, AUTOMATION, SMOOTH], {
      tileWidth: 300,
      shiftX: -60,
    }),
    phones('Carousel Pack 01', ROADMAP),
    phones('Carousel Pack 02', WAYS),
    phones('Carousel Pack 03', IMPACT),
    phones('Carousel Pack 04', FLOW),
    phones('Carousel Pack 05', AUTOMATION),
    phones('Carousel Pack 06', SMOOTH),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Every layer is editable',
        body: 'Tweak the copy, recolour the glow, swap icons and resize anything in the built-in editor.',
      },
      [...ROADMAP, ...WAYS, ...SMOOTH],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Start in Three Steps',
      steps: [
        { icon: 'credit-card', title: '01 Checkout', body: 'Finish the quick payment' },
        { icon: 'cloud-upload', title: '02 Open it', body: 'The pack loads in your editor' },
        { icon: 'wand-sparkles', title: '03 Customise', body: 'Edit, export and publish' },
      ],
    }),
  ],
});
