import { definePack, LANDSCAPE } from '../../../pack';
import { coverPage, deliverablesPage, type ListingStyle, showcasePage } from './listing';
import { bonusPage, brandPage, editablePage, howItWorksPage } from './listing-more';
import { COBALT, CRIMSON, lessIsMore, sellProblem, toDoTools } from './posts';
import { targeting, turnSuccess } from './posts-more';

const STYLE: ListingStyle = {
  background: '#07090f',
  text: '#ffffff',
  muted: '#9ca3af',
  ink: '#0b0d12',
  brand: COBALT.brand,
  brandText: '#ffffff',
  strip: '#eef1f8',
  folderFrom: '#7aa2ff',
  folderTo: '#2f6bff',
  head: 'Montserrat',
  body: 'Inter',
};

const SELL = sellProblem(COBALT);
const TODO = toDoTools(COBALT);
const LESS = lessIsMore(COBALT);
const TARGET = targeting(COBALT);
const SUCCESS = turnSuccess(COBALT);
const POSTS = [SELL, TODO, LESS, TARGET, SUCCESS];

export const cobaltLessonTipsPack = definePack({
  id: 'cobalt-lesson-tips',
  title: 'Cobalt Lesson Tips',
  description:
    'Educational tip posts for small business marketing in cobalt, black and white, with matching stories.',
  category: 'social-posts',
  tags: ['tips', 'instagram', 'small-business', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Lesson Tips',
        lead: 'Small Business Marketing',
        accent: '5 premium social posts + story',
        bonus: 'YOUR BONUS IS WAITING  →  SWIPE TO SEE IT',
      },
      [SELL, TODO, LESS, TARGET, SUCCESS, LESS, TARGET],
      LESS,
    ),
    showcasePage(
      STYLE,
      {
        title: 'Social Media Lesson Posts',
        subtitle: 'Finished copy, tuned to spark comments and saves',
        outline: 'Premium',
      },
      [SUCCESS, TODO, SELL, LESS, TARGET],
    ),
    deliverablesPage(STYLE, { count: '5' }, LESS, SUCCESS),
    editablePage(STYLE, [LESS, lessIsMore(CRIMSON)], [TODO, toDoTools(CRIMSON)]),
    howItWorksPage(
      STYLE,
      [
        'Instant access right after checkout',
        'Edit text, colours and logo in your browser',
        'Download and share on every channel',
      ],
      'No design skills needed: everything runs in the built-in editor.',
    ),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, pick a second one free.*',
        'Send us a message after purchase.',
        'LIMITED TIME: grab it before the offer ends',
      ],
      brandA: 'Brightline',
      brandB: 'Studio',
      note: '*The second pack must carry the same price or less.',
      photo: 'man-portrait-2',
    }),
    brandPage(
      STYLE,
      { folder: 'Lesson Kit', size: '16.2 MB', brandA: 'Brightline', brandB: 'Studio' },
      POSTS,
    ),
  ],
});
