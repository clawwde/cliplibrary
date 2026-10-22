import { linear } from '@/design';
import { definePack, SQUARE } from '../../../pack';
import { cardBack, cardFront, coverLetter } from './letter';
import { cardsPage, editablePage, howToPage, paperPage, sheetPage } from './listing';
import { resume } from './resume';

export const blueprintGridResumePack = definePack({
  id: 'blueprint-grid-resume',
  title: 'Blueprint Grid Resume',
  description:
    'A minimalist designer resume on grid paper with selection-box headings, matching cover letter and cards.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'freelance', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    paperPage(resume),
    cardsPage(cardFront, cardBack),
    sheetPage(coverLetter),
    editablePage(resume),
    howToPage(linear(135, '#ff9a72', '#e5531f')),
  ],
});
