import { definePack, LANDSCAPE } from '../../../pack';
import { listingPages } from './listing';
import type { ListingTheme } from './listing-info';
import { COBALT, eventDay, eventList, eventStory, JADE, monthEvents, POSTS } from './posts';

const THEME: ListingTheme = {
  page: '#030807',
  brand: '#0f9f8a',
  brandDeep: '#045a4d',
  brandText: '#0f9f8a',
  onBrand: '#ffffff',
  accent: '#c6f25e',
  glow: '#7ee8d0',
  glowDeep: '#0f766e',
  ink: '#07130f',
  muted: '#3f4a47',
  headFont: 'Sora',
  headWidth: 0.66,
  bodyFont: 'DM Sans',
  bodyWidth: 0.52,
};

export const jadeEventCalendarPack = definePack({
  id: 'jade-event-calendar',
  title: 'Jade Event Calendar',
  description:
    'Monthly event calendar, save the date, event day and content planner posts in jade and lime, with a matching story.',
  category: 'social-posts',
  tags: ['event', 'instagram', 'small-business', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      kicker: 'Ready-to-Use',
      title: 'Dates & Events',
      line: ['Smart Marketing Templates for', 'Brands'],
      count: '5 Premium Social Media Posts + Story',
      showcase: ['Premium', 'Event Posts'],
      showcaseNote: 'Finished layouts, tuned to fill your calendar',
      handle: 'fernway.studio',
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
      studio: ['Fernway', 'Studio'],
      folder: 'Event Kit',
      host: 'woman-portrait-1',
    },
    {
      posts: POSTS,
      story: eventStory,
      feature: monthEvents(JADE),
      edits: [
        [eventDay(JADE), eventDay(COBALT)],
        [eventList(JADE), eventList(COBALT)],
      ],
    },
  ),
});
