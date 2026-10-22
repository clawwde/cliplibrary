import { definePack, LANDSCAPE } from '../../../pack';
import { editablePage, type ListingStyle } from '../plum-proof-reviews/listing';
import { howItWorksPage } from '../plum-proof-reviews/listing-more';
import { profilePhone, saasChannels, saasCover, saasGrid } from './pages';
import { allInOne, COPPER, introNumber, LILAC, smartStrategy, systemsPost } from './posts';
import { benefitsApp, bookDemo, fromZero, ourServices, quotePhone, statDonut } from './posts-more';

const STYLE: ListingStyle = {
  background: '#08080a',
  text: '#ffffff',
  muted: '#a1a1aa',
  ink: '#1a120c',
  brand: COPPER.brand,
  brandText: '#ffffff',
  highlight: COPPER.glow,
  strip: '#f5f1ee',
  folderFrom: '#ffc18a',
  folderTo: '#ff6a1f',
  badgeFrom: '#fb923c',
  badgeTo: '#db2777',
  head: 'Outfit',
  body: 'DM Sans',
};

const SERVICES = ourServices(COPPER, 'OUR SERVICES', [
  'Connect',
  'Better',
  'Social media',
  'Do the work',
  'Branding',
  'Optimize',
  'Fast',
  'Launch',
]);
const ZERO = fromZero(COPPER, {
  left: 'Start today',
  right: 'Join us',
  tag: 'From 0 to',
  word: 'launch',
});
const SYSTEMS = systemsPost(COPPER);
const INTRO = introNumber(COPPER);
const SMART = smartStrategy(COPPER);
const PLACE = allInOne(COPPER);
const QUOTE = quotePhone(COPPER);
const DEMO = bookDemo(COPPER);
const DONUT = statDonut(COPPER);
const BENEFITS = benefitsApp(COPPER);

const TILES = [SYSTEMS, INTRO, SMART, PLACE, QUOTE, DEMO, DONUT, DEMO, BENEFITS, SERVICES];

export const copperSaasFoundersPack = definePack({
  id: 'copper-saas-founders',
  title: 'Copper SaaS Founders',
  description:
    'Startup marketing posts for SaaS and AI founders in copper orange on near black, with story-ready layouts.',
  category: 'social-posts',
  tags: ['saas', 'ai', 'linkedin', 'instagram', 'b2b'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    saasCover(STYLE, [INTRO, DEMO, SERVICES, PLACE, ZERO, DONUT, SMART, BENEFITS, QUOTE, SYSTEMS]),
    saasGrid(
      STYLE,
      {
        title: '22 Posts and 22 Stories\nfor SaaS Builders',
        subtitle: 'Made for your feed, your company page and your community',
      },
      TILES,
    ),
    editablePage(STYLE, [
      [
        SERVICES,
        ourServices(LILAC, 'OUR TOOLS', [
          'Storage',
          'CRM',
          'Search',
          'Analytics',
          'Hosting',
          'Video',
          'Maps',
          'Billing',
        ]),
      ],
      [
        ZERO,
        fromZero(LILAC, {
          left: 'Fast and easy',
          right: 'Join us',
          tag: 'Start today',
          word: 'Better',
        }),
      ],
    ]),
    saasChannels(
      STYLE,
      [
        'From idea to post in minutes',
        'Stop designing. Start growing.',
        'Just ready-to-post content.',
      ],
      [DONUT, SMART, ZERO],
    ),
    howItWorksPage(
      STYLE,
      {
        title: 'How it works',
        steps: [
          'Instant download after checkout',
          'Open your templates in the editor',
          'Edit text, colours and logo',
          'Export and post on every channel',
        ],
        note: 'No design skills needed: everything runs in your browser.',
      },
      { listX: 560, aside: [profilePhone(STYLE, 90, 250, 360, -8, TILES)] },
    ),
  ],
});
