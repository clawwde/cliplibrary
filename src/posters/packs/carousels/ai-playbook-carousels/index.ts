import { linear } from '@/design';
import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { carouselCover, carouselPage, type ListingStyle } from '../momentum-carousel-kit/listing';
import {
  type NotesTheme,
  notesBody,
  notesChecklist,
  notesCover,
  notesRows,
} from '../momentum-carousel-kit/notes';
import { COMMENT_STEPS, commentsCover, STRATEGY_STEPS, searchCover } from './comment-cards';
import { NUMBER_STEPS, numbersCover, PILL_STEPS, pillsCover } from './pills-numbers';

const STYLE: ListingStyle = {
  background: '#e6ecea',
  text: '#0b2b26',
  muted: '#3d524d',
  badge: linear(135, '#14b8a6', '#065f46'),
  avatar: linear(135, '#0f766e', '#0b2b26'),
  handle: 'northpeak',
  feed: 'business',
};

const DARK: SlideTheme = {
  background: '#061512',
  text: '#ffffff',
  muted: '#cbd5d1',
  surface: '#ffffff',
  ink: '#0b2b26',
  brand: '#0f766e',
  accent: '#5eead4',
  headFont: 'Figtree',
  bodyFont: 'Figtree',
};

const NIGHT: NotesTheme = {
  paper: '#0c1211',
  ink: '#ffffff',
  muted: '#b9c8c4',
  accent: '#2dd4bf',
  highlight: 'rgba(45,212,191,0.32)',
  card: '#ffffff',
  cardInk: '#0c1211',
  font: 'Plus Jakarta Sans',
};

const notesDeck = [
  notesCover(NIGHT, {
    name: 'Owen Blake',
    handle: '@owenblake',
    photo: 'man-portrait-3',
    title: 'Planning With\nAI Assistants',
    hook: 'It is changing how you work.',
    swipe: 'Swipe to view notes',
    count: '4',
  }),
  notesBody(NIGHT, {
    page: 'Notes | 1 of 4',
    title: 'Get Better at\nPrompting',
    body: 'Go past one line questions. Iterate on the prompt, add examples and set clear limits, and you will get sharper drafts that match the brief.',
  }),
  notesChecklist(NIGHT, {
    page: 'Notes | 2 of 4',
    title: 'Where People\nStill Win',
    items: ['Judgement', 'Taste', 'Strategy', 'Trust'],
  }),
  notesRows(NIGHT, {
    page: 'Notes | 3 of 4',
    title: 'Keep Your\nOwn Voice',
    rows: [
      { when: 'Draft fast', action: 'Edit slowly' },
      { when: 'Ask AI', action: 'Decide yourself' },
      { when: 'Reuse ideas', action: 'Add your story' },
    ],
  }),
] as const;

const commentsDeck = [commentsCover, ...COMMENT_STEPS] as const;
const pillsDeck = [pillsCover, ...PILL_STEPS] as const;
const strategyDeck = [searchCover, ...STRATEGY_STEPS] as const;
const numbersDeck = [numbersCover, ...NUMBER_STEPS] as const;
const subtitle = 'Business Feed Post';

export const aiPlaybookCarouselsPack = definePack({
  id: 'ai-playbook-carousels',
  title: 'AI Playbook Carousels',
  description:
    'Five teal business carousels that teach teams how to prompt, plan and work smarter with AI tools.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'ai', 'b2b'],
  theme: 'light',
  ...SQUARE,
  pages: [
    carouselCover(STYLE, { count: '5', lines: 'Business\nCarousel\nTemplates', pages: '30' }, [
      commentsDeck,
      notesDeck,
      pillsDeck,
      strategyDeck,
      numbersDeck,
    ]),
    carouselPage(STYLE, 'Carousel Set 01', subtitle, [
      commentsDeck[0],
      commentsDeck[1],
      commentsDeck[2],
    ]),
    carouselPage(STYLE, 'Carousel Set 02', subtitle, [notesDeck[0], notesDeck[1], notesDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 03', subtitle, [pillsDeck[0], pillsDeck[1], pillsDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 04', subtitle, [
      strategyDeck[0],
      strategyDeck[1],
      strategyDeck[2],
    ]),
    carouselPage(STYLE, 'Carousel Set 05', subtitle, [
      numbersDeck[0],
      numbersDeck[1],
      numbersDeck[2],
    ]),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite any slide, swap photos and icons, and recolour the whole set in a few clicks.',
      },
      [...commentsDeck, ...notesDeck, ...strategyDeck],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Three Easy Steps',
      steps: [
        { icon: 'shopping-bag', title: '01 Place order', body: 'Finish a quick checkout' },
        { icon: 'download', title: '02 Grab the link', body: 'Download the guide' },
        { icon: 'wand-sparkles', title: '03 Customise', body: 'Open the set and edit' },
      ],
    }),
  ],
});
