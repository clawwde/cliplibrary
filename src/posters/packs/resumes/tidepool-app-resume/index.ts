import { linear } from '@/design';
import { definePack, SQUARE } from '../../../pack';
import { resumeWins } from './achievements';
import { cardBack, cardFront, coverLetter } from './letter';
import { cardsPage, editablePage, howToPage, paperPage, sheetPage } from './listing';
import { resumeMain } from './resume';

export const tidepoolAppResumePack = definePack({
  id: 'tidepool-app-resume',
  title: 'Tidepool App Resume',
  description:
    'A phone-screen inspired two page resume with matching cover letter and business cards in teal and coral.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'freelance', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    paperPage(resumeMain),
    cardsPage(cardFront, cardBack),
    sheetPage(resumeWins),
    sheetPage(coverLetter),
    editablePage(resumeMain),
    howToPage(linear(135, '#ffb199', '#f0643f')),
  ],
});
