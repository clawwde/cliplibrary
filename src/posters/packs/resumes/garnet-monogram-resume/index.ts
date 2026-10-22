import { linear } from '@/design';
import { definePack, SQUARE } from '../../../pack';
import { cardBack, cardFront, coverLetter } from './letter';
import { cardsPage, editablePage, howToPage, paperPage, sheetPage } from './listing';
import { resume } from './resume';

export const garnetMonogramResumePack = definePack({
  id: 'garnet-monogram-resume',
  title: 'Garnet Monogram Resume',
  description:
    'A bold sectioned resume with a hexagon monogram, matching cover letter and business cards in wine and rose.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'corporate', 'freelance'],
  theme: 'light',
  ...SQUARE,
  pages: [
    paperPage(resume),
    cardsPage(cardFront, cardBack),
    sheetPage(coverLetter),
    editablePage(resume),
    howToPage(linear(135, '#f9a8c6', '#c2185b')),
  ],
});
