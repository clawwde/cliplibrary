import { definePack, LANDSCAPE } from '../../../pack';
import { coverPage, deliverablesPage, type ListingStyle, showcasePage } from './listing';
import { bonusPage, brandPage, editablePage, howItWorksPage } from './listing-more';
import { BLUSH, contentCalendar, eventDay, monthEvents, TANGERINE } from './posts';
import { eventList, saveTheDate } from './posts-more';

const STYLE: ListingStyle = {
  background: '#081417',
  text: '#ffffff',
  muted: '#a7c0c5',
  ink: BLUSH.deep,
  brand: BLUSH.brand,
  brandText: '#ffffff',
  strip: '#f2f5f5',
  folderFrom: '#ff9cc6',
  folderTo: '#e83e8c',
  head: 'Urbanist',
  body: 'Inter',
};

const PLANNER = contentCalendar(BLUSH);
const DAY = eventDay(BLUSH);
const MONTH = monthEvents(BLUSH);
const AGENDA = eventList(BLUSH);
const SAVE = saveTheDate(BLUSH);

export const blushDateEventsPack = definePack({
  id: 'blush-date-events',
  title: 'Blush Date Events',
  description:
    'Event, calendar and save the date posts for freelancers in blush pink and deep teal, with matching stories.',
  category: 'social-posts',
  tags: ['event', 'freelance', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Date & Events',
        lead: 'Freelance Marketing Kit',
        accent: '5 premium social posts + story',
        bonus: 'YOUR BONUS IS WAITING  →  SWIPE TO SEE IT',
      },
      [DAY, AGENDA, MONTH, SAVE, DAY, SAVE, PLANNER, AGENDA, PLANNER, MONTH],
      MONTH,
    ),
    showcasePage(
      STYLE,
      {
        title: 'Premium Social Media Events',
        subtitle: 'Finished layouts, built to fill every seat',
      },
      [PLANNER, DAY, MONTH, AGENDA, SAVE],
    ),
    deliverablesPage(STYLE, { count: '5' }, PLANNER, MONTH),
    editablePage(STYLE, [PLANNER, contentCalendar(TANGERINE)], [MONTH, monthEvents(TANGERINE)]),
    howItWorksPage(
      STYLE,
      [
        'Instant access right after checkout',
        'Change dates, events and colours in a click',
        'Download and share on every channel',
      ],
      'No design skills needed: everything runs in the built-in editor.',
    ),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, unlock a second one free.*',
        'Just message us after purchase.',
        'LIMITED TIME: ends when the month does',
      ],
      brandA: 'Fernwood',
      brandB: 'Studio',
      note: '*The free pack must be the same price or lower.',
      photo: 'woman-portrait-5',
    }),
    brandPage(
      STYLE,
      { folder: 'Event Kit', size: '19.3 MB', brandA: 'Fernwood', brandB: 'Studio' },
      [MONTH, AGENDA, SAVE, DAY, PLANNER],
    ),
  ],
});
