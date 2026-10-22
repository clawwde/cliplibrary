import { linear } from '@/design';
import { definePack, LANDSCAPE } from '../../../pack';
import {
  coverPage,
  deliverablesPage,
  editablePage,
  showcasePage,
} from '../lagoon-saas-stats/listing';
import { bonusPage, brandPage, howItWorksPage } from '../lagoon-saas-stats/listing-more';
import type { ListingCopy, ListingTheme } from '../lagoon-saas-stats/theme';
import type { EventTheme } from './posts';
import { type EventsCopy, eventTemplates } from './posts-more';

const VIOLET: EventTheme = {
  main: '#6d28d9',
  dark: '#160a2e',
  paper: '#ffffff',
  ink: '#160a2e',
  onMain: '#ffffff',
  pop: '#ffd166',
  star: '#ffffff',
  headFont: 'Figtree',
  bodyFont: 'Inter',
};

const MINT: EventTheme = {
  ...VIOLET,
  main: '#0f9d76',
  dark: '#06291f',
  ink: '#06291f',
};

const COPY: EventsCopy = {
  day: {
    kicker: 'Launch Day',
    date: 'Thu, 9 May',
    hours: 'Doors open 6pm to 9pm',
    title: 'Spring collection\nreveal night',
    cta: 'RSVP now for\nearly access perks',
  },
  month: {
    kicker: 'Coming up',
    title: 'November Events',
    days: [
      { day: '01', weekday: 'Saturday', dark: true, sticker: 'Open Studio\nWeekend' },
      { day: '05', weekday: 'Wednesday', dark: false },
      { day: '08', weekday: 'Saturday', dark: true },
      { day: '11', weekday: 'Tuesday', dark: false },
      { day: '13', weekday: 'Thursday', dark: true, sticker: 'World Kindness\nDay' },
      { day: '16', weekday: 'Sunday', dark: true },
      { day: '28', weekday: 'Friday', dark: true, sticker: 'Big Friday\nSale' },
      { day: '29', weekday: 'Saturday', dark: false },
      { day: '30', weekday: 'Sunday', dark: true },
    ],
  },
  save: {
    title: 'Save the Date',
    invite: 'You are invited to an\nevening worth remembering',
    digits: ['14', '06', '26'],
    units: ['DAY', 'MONTH', 'YEAR'],
    reply: 'Reply "YES" to join',
    host: 'Hosted by Fernway Books',
  },
  planner: {
    title: 'Grab Our Content\nPlanner',
    subtitle: '9 Fresh Post Ideas',
    ideas: [
      'Behind the\nscenes',
      'Customer\nshout-out',
      'Quick tip\nTuesday',
      'Poll your\nfollowers',
      'Product\nclose-up',
      'Meet the\nteam',
      'Myth or\nfact',
      'Weekend\noffer',
      'Ask me\nanything',
    ],
  },
  agenda: {
    month: 'JUN',
    rows: [
      {
        day: '06',
        title: 'Maker Meetup',
        body: 'Celebrate the makers behind\nour favourite products.',
      },
      {
        day: '12',
        title: 'Live Q&A Hour',
        body: 'Ask our founders anything\nabout the new release.',
      },
      { day: '19', title: 'Community Vote', body: 'Help us pick the next flavour\nfor the menu.' },
      { day: '26', title: 'Members Night', body: 'A thank-you evening for our\nloyal regulars.' },
    ],
  },
};

const LISTING: ListingTheme = {
  page: '#0d0618',
  text: '#ffffff',
  muted: '#b9a8d9',
  brand: '#7c3aed',
  brandDeep: '#2e1065',
  highlight: '#6d28d9',
  accent: '#ffd166',
  folder: linear(135, '#c4b5fd', '#6d28d9'),
  ink: '#160a2e',
  headFont: 'Figtree',
  bodyFont: 'Inter',
};

const LISTING_COPY: ListingCopy = {
  kicker: 'Ready-to-Use',
  title: 'Dates & Events',
  line: 'Small Business Marketing',
  count: '5 Premium Social Media Posts + Story',
  bonus: 'YOUR BONUS IS INSIDE  →  SWIPE TO SEE IT',
  showcase: ['Premium', 'Event Announcements'],
  showcaseNote: 'Finished layouts, ready to fill your calendar',
  editable: 'Editable\nSocial Post\nTemplates\nOnline',
  steps: [
    'Download your files after checkout',
    'Change dates, colours and branding in the editor',
    'Export and post on your social media',
  ],
  stepsNote: 'No design skills needed: the editor runs right in your browser.',
  offers: [
    'Buy one pack, get a second one free.*',
    'Message us after your purchase.',
    'LIMITED TIME: buy before the offer ends',
  ],
  offerNote: '*The free pack must carry the same price or lower.',
  studio: ['Lilacline', 'Studio'],
  folder: 'Event Kit',
  folderSize: '24.10 MB',
  handle: 'lilacline.studio',
};

const MAIN = eventTemplates(VIOLET, COPY);
const ALT = eventTemplates(MINT, COPY);

export const violetKeyDatesPack = definePack({
  id: 'violet-key-dates',
  title: 'Violet Key Dates',
  description:
    'Event day, monthly calendar, save the date, content planner and agenda posts in violet and butter yellow, with a matching story.',
  category: 'social-posts',
  tags: ['event', 'small-business', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      LISTING,
      LISTING_COPY,
      [MAIN.day, MAIN.month, MAIN.save, MAIN.planner, MAIN.month, MAIN.agenda, MAIN.save],
      MAIN.month,
    ),
    showcasePage(
      LISTING,
      LISTING_COPY,
      [MAIN.day, MAIN.planner],
      [MAIN.month, MAIN.save, MAIN.agenda],
    ),
    deliverablesPage(LISTING, LISTING_COPY, MAIN.day, MAIN.story),
    editablePage(LISTING, LISTING_COPY, [
      [MAIN.month, ALT.month],
      [MAIN.agenda, ALT.agenda],
    ]),
    howItWorksPage(LISTING, LISTING_COPY),
    bonusPage(LISTING, LISTING_COPY, 'man-portrait-2'),
    brandPage(LISTING, LISTING_COPY, [MAIN.month, MAIN.agenda, MAIN.save, MAIN.day, MAIN.planner]),
  ],
});
