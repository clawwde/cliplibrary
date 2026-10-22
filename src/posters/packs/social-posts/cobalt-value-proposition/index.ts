import { definePack, LANDSCAPE } from '../../../pack';
import { listingPages } from './listing';
import type { ListingTheme } from './listing-info';
import { COBALT, clearProcess, clearProcessStory, MINT } from './posts';
import { benefits, POSTS } from './posts-more';

const THEME: ListingTheme = {
  page: '#04050c',
  brand: '#3355ff',
  brandDeep: '#1a2a99',
  brandText: '#3355ff',
  onBrand: '#ffffff',
  accent: '#ffd23f',
  glow: '#7dd3fc',
  glowDeep: '#2547d0',
  ink: '#090b16',
  muted: '#3f4254',
  headFont: 'Poppins',
  headWidth: 0.58,
  bodyFont: 'Manrope',
  bodyWidth: 0.54,
};

export const cobaltValuePropositionPack = definePack({
  id: 'cobalt-value-proposition',
  title: 'Cobalt Value Proposition',
  description:
    'Service menu, clear process, promise grid, benefits and why choose us posts in cobalt and sunflower, with a matching story.',
  category: 'social-posts',
  tags: ['b2b', 'small-business', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      kicker: 'Ready-to-Use',
      title: 'Selling Points',
      line: ['Small Business', 'Marketing'],
      count: '5 Premium Social Media Posts + Story',
      showcase: ['Value', 'Proposition Posts'],
      showcaseNote: 'Finished layouts, written to win new clients',
      handle: 'northpeak.studio',
      steps: [
        'Instant download after checkout',
        'Edit text, colours and branding',
        'Export and share on every channel',
      ],
      stepsNote: 'No design skills needed: the editor runs right in your browser.',
      offers: [
        'Buy one pack, get a second one free.*',
        'Just message us after your purchase.',
        'LIMITED TIME: the offer ends soon',
      ],
      offerNote: '*The second pack must be the same price or lower.',
      studio: ['Northpeak', 'Studio'],
      folder: 'Value Kit',
      host: 'man-portrait-3',
    },
    {
      posts: POSTS,
      story: clearProcessStory,
      feature: benefits(COBALT),
      edits: [
        [benefits(COBALT), benefits(MINT)],
        [clearProcess(COBALT), clearProcess(MINT)],
      ],
    },
  ),
});
