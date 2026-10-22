import { linear } from '@/design';
import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { FOLDER_STEPS, foldersCover, TIP_STEPS, tipsCover } from './focus-folders';
import { carouselCover, carouselPage, type ListingStyle } from './listing';
import { type NotesTheme, notesChecklist, notesCover, notesRows, notesSayTry } from './notes';
import { PLANNER_STEPS, PROMPT_STEPS, plannerCover, promptCover } from './prompt-planner';

const STYLE: ListingStyle = {
  background: '#e8ebe7',
  text: '#101814',
  muted: '#3f4a44',
  badge: linear(135, '#14b8a6', '#4f46e5'),
  avatar: linear(135, '#0d9488', '#4f46e5'),
  handle: 'brightdesk',
  feed: 'business',
};

const DARK: SlideTheme = {
  background: '#07110e',
  text: '#ffffff',
  muted: '#d1d5db',
  surface: '#ffffff',
  ink: '#111827',
  brand: '#0d9488',
  accent: '#a3e635',
  headFont: 'Figtree',
  bodyFont: 'Figtree',
};

const MINT: NotesTheme = {
  paper: '#eef3ee',
  ink: '#10231a',
  muted: '#475a50',
  accent: '#15803d',
  highlight: '#bbf7d0',
  card: '#ffffff',
  cardInk: '#10231a',
  font: 'Inter',
};

const notesDeck = [
  notesCover(MINT, {
    name: 'Mira Solano',
    handle: '@mirasolano',
    photo: 'woman-portrait-4',
    title: 'How to Stay\nConsistent',
    hook: 'It is simpler than you think...',
    swipe: 'Swipe to open notes',
    count: '3',
  }),
  notesChecklist(MINT, {
    page: 'Notes | 1 of 3',
    title: 'Track Small Wins\nEvery Single Day',
    items: ['Improve by one percent', 'Fix one weak spot', 'Close open loops', 'Prep for tomorrow'],
  }),
  notesSayTry(MINT, {
    page: 'Notes | 2 of 3',
    title: 'Shrink the\nFirst Step',
    pairs: [
      { label: 'Skip:', quote: '"I will read for a whole hour."' },
      { label: 'Try:', quote: '"Ten pages right after lunch."' },
    ],
  }),
  notesRows(MINT, {
    page: 'Notes | 3 of 3',
    title: 'Stack It on a\nDaily Routine',
    rows: [
      { when: 'After coffee', action: 'Plan the day' },
      { when: 'After lunch', action: 'Walk ten minutes' },
      { when: 'After work', action: 'Tidy the desk' },
    ],
  }),
] as const;

const promptDeck = [promptCover, ...PROMPT_STEPS] as const;
const plannerDeck = [plannerCover, ...PLANNER_STEPS];
const tipsDeck = [tipsCover, ...TIP_STEPS];
const foldersDeck = [foldersCover, ...FOLDER_STEPS];

const subtitle = 'Business Feed Post';

export const momentumCarouselKitPack = definePack({
  id: 'momentum-carousel-kit',
  title: 'Momentum Carousel Kit',
  description:
    'Five swipeable business carousels on prompts, weekly planning, focus tips, habit notes and growth steps.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'tips'],
  theme: 'light',
  ...SQUARE,
  pages: [
    carouselCover(STYLE, { count: '5', lines: 'Business\nCarousel\nTemplates', pages: '25' }, [
      promptDeck,
      plannerDeck,
      tipsDeck,
      notesDeck,
      foldersDeck,
    ]),
    carouselPage(STYLE, 'Carousel Set 01', subtitle, [
      promptCover,
      PROMPT_STEPS[0],
      PROMPT_STEPS[1],
    ]),
    carouselPage(STYLE, 'Carousel Set 02', subtitle, [
      plannerCover,
      PLANNER_STEPS[0],
      PLANNER_STEPS[1],
    ]),
    carouselPage(STYLE, 'Carousel Set 03', subtitle, [tipsCover, TIP_STEPS[0], TIP_STEPS[1]]),
    carouselPage(STYLE, 'Carousel Set 04', subtitle, [notesDeck[0], notesDeck[1], notesDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 05', subtitle, [
      foldersCover,
      FOLDER_STEPS[0],
      FOLDER_STEPS[1],
    ]),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change the words, fonts, colours and icons, then rearrange any slide to suit your brand.',
      },
      [...foldersDeck, ...notesDeck, ...tipsDeck],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-cart', title: '01 Check out', body: 'Complete your order' },
        { icon: 'download', title: '02 Get the file', body: 'Save the guide file' },
        { icon: 'pencil', title: '03 Start editing', body: 'Open the set and edit' },
      ],
    }),
  ],
});
