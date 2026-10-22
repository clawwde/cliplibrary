import { definePack, LANDSCAPE } from '../../../pack';
import type { ListingTheme } from './listing';
import { listingPages } from './listing-more';
import {
  contentCalendar,
  eventDay,
  monthEvents,
  ROSE,
  SAFFRON,
  SKY,
  saveTheDate,
  scheduleList,
  scheduleStory,
} from './posts';

const THEME: ListingTheme = {
  page: '#0c0b08',
  brand: SAFFRON.brand,
  brandText: '#d98a00',
  onBrand: SAFFRON.ink,
  accent: SAFFRON.brand,
  ink: SAFFRON.ink,
  muted: '#5c5546',
  folder: ['#f0a800', '#a35f00'],
  frame: '#ffd970',
  strip: '#fff6db',
  storyFill: SAFFRON.brand,
  headFont: 'Poppins',
  headScale: 1.1,
  bodyFont: 'Inter',
  bodyScale: 1,
};

const calendar = contentCalendar(SAFFRON);
const launch = eventDay(SAFFRON);
const month = monthEvents(SAFFRON);
const save = saveTheDate(SAFFRON);
const plan = scheduleList(SAFFRON);

export const saffronLaunchEventsPack = definePack({
  id: 'saffron-launch-events',
  title: 'Saffron Launch Events',
  description:
    'Event day, monthly calendar, save the date and content plan posts in saffron and black, with a story.',
  category: 'social-posts',
  tags: ['event', 'linkedin', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      title: 'Dates & Events',
      channel: [{ content: 'LinkedIn Posts for ' }, { content: 'Launches', fill: THEME.brandText }],
      count: [
        { content: '5 ' },
        { content: 'Premium', fill: THEME.brandText, weight: 800 },
        { content: ' social posts + a story' },
      ],
      bonus: 'A BONUS AWAITS  >  SWIPE TO UNLOCK IT',
      showcase: [{ content: 'Premium ', glow: true }, { content: 'Event Posts' }],
      showcaseNote: 'Finished layouts, made for clear and timely announcements',
      editTitle: 'Editable\nEvent Posts\nin Your\nBrowser',
      editLines: ['Change Dates\nin Seconds', '100% editable'],
      steps: [
        'Instant download after checkout',
        'Set your dates, venues and colours',
        'Export and announce on every channel',
      ],
      stepsNote: 'No design skills needed: the built-in editor handles everything.',
      offers: [
        'Buy one pack, get another one free.*',
        'Drop us a message after checkout.',
        'LIMITED TIME: before the offer closes',
      ],
      offerNote: '*The free pack must be the same price or lower.',
      studio: ['Goldleaf', 'Studio'],
      tagline: 'More Than a Template',
      folder: ['Event Kit', '22.4 MB'],
      host: 'woman-portrait-2',
    },
    {
      posts: [save, launch, plan, calendar, month],
      mosaic: [save, launch, plan, calendar, save, month, launch],
      feature: month,
      story: scheduleStory(SAFFRON),
      showcase: [calendar, launch, month, save, plan],
      edits: [
        [launch, eventDay(ROSE)],
        [month, monthEvents(SKY)],
      ],
    },
  ),
});
