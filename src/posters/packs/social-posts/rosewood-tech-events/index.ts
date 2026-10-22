import { definePack, LANDSCAPE } from '../../../pack';
import {
  coverPage,
  deliverablesPage,
  editablePage,
  type ListingStyle,
  showcasePage,
} from '../plum-proof-reviews/listing';
import { bonusPage, brandPage, howItWorksPage } from '../plum-proof-reviews/listing-more';
import { eventDay, eventList, LAGOON, monthEvents, ROSEWOOD } from './posts';
import { contentCalendar, eventStory, saveDate } from './posts-more';

const STYLE: ListingStyle = {
  background: '#0f0610',
  text: '#ffffff',
  muted: '#d4b8c6',
  ink: ROSEWOOD.ink,
  brand: ROSEWOOD.brand,
  brandText: '#ffffff',
  highlight: ROSEWOOD.accent,
  strip: '#f8f1f4',
  folderFrom: '#ffb3cb',
  folderTo: '#c2185b',
  badgeFrom: '#fbbf24',
  badgeTo: '#e0457b',
  head: 'Outfit',
  body: 'DM Sans',
};

const MONTH = monthEvents(ROSEWOOD);
const LIST = eventList(ROSEWOOD);
const DAY = eventDay(ROSEWOOD);
const DATE = saveDate(ROSEWOOD);
const CALENDAR = contentCalendar(ROSEWOOD);

export const rosewoodTechEventsPack = definePack({
  id: 'rosewood-tech-events',
  title: 'Rosewood Tech Events',
  description:
    'Event calendar, save the date and content plan posts for SaaS and tech brands in wine and raspberry.',
  category: 'social-posts',
  tags: ['event', 'saas', 'instagram', 'story', 'gradient'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Date & Events',
        lead: 'SaaS & Tech',
        accent: 'Launch Kit',
        count: '5 premium social posts + a story layout',
        bonus: 'A FREE BONUS IS INSIDE  →  KEEP SWIPING',
      },
      [MONTH, LIST, DAY, CALENDAR, DATE, DATE, CALENDAR, MONTH, LIST, DAY],
      DAY,
    ),
    showcasePage(
      STYLE,
      {
        glowWord: 'Polished',
        title: 'Event Posts',
        subtitle: 'Finished layouts, built to fill every seat at your next event',
      },
      [DAY, CALENDAR, MONTH, LIST, DATE],
    ),
    deliverablesPage(
      STYLE,
      { title: 'Ready-to-post content.', posts: '5', stories: '1', storyLabel: 'Matching story' },
      MONTH,
      eventStory(ROSEWOOD),
    ),
    editablePage(STYLE, [
      [MONTH, monthEvents(LAGOON)],
      [CALENDAR, contentCalendar(LAGOON)],
    ]),
    howItWorksPage(STYLE, {
      title: 'How it works?',
      steps: [
        'Instant access right after checkout',
        'Drop in your own dates, events and colours',
        'Download and post across your channels',
      ],
      note: 'No design skills needed: everything runs in the built-in editor.',
    }),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, pick a second one free.*',
        'Just send us a note after checkout.',
        'LIMITED TIME: the offer closes soon',
      ],
      brandA: 'Loopworks',
      brandB: 'Studio',
      note: '*The second pack must be the same price or lower.',
      face: 'man-portrait-1',
    }),
    brandPage(
      STYLE,
      {
        folder: 'Event Kit',
        size: '19.6 MB',
        brandA: 'Loopworks',
        brandB: 'Studio',
        tagline: 'More than a template',
      },
      [MONTH, LIST, DATE, DAY, CALENDAR],
    ),
  ],
});
