import { definePack, SQUARE } from '../../../pack';
import {
  cardsOnDesk,
  editorLaptop,
  howToStart,
  type ListingTheme,
  letterOnDesk,
  resumeOnDesk,
} from '../focal-point-photographer/listing';
import { realtorResume } from './resume';
import { realtorCardBack, realtorCardFront, realtorLetter } from './stationery';

const THEME: ListingTheme = {
  desk: '#f2eeec',
  sheet: '#ffffff',
  night: '#0c1322',
  accent: '#f0b9aa',
  edge: '#13203a',
  glow: ['#ffd6ca', '#c97c69'],
  spark: ['#7b90c4', '#1c2b4f'],
  font: 'Poppins',
};

export const roseMarbleRealtorPack = definePack({
  id: 'rose-marble-realtor',
  title: 'Rose Marble Realtor',
  description:
    'An elegant real estate agent resume in dusty rose and navy marble, with a matching cover letter and business cards.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'real-estate', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    resumeOnDesk(THEME, realtorResume),
    cardsOnDesk(THEME, realtorCardFront, realtorCardBack),
    letterOnDesk(THEME, realtorLetter),
    editorLaptop(THEME, realtorResume, {
      title: 'Tailor it in your browser',
      body: 'Update your story, drop in your own photo, recolour the marble accents and rearrange every block.',
    }),
    howToStart(THEME, {
      title: 'How It Works',
      steps: [
        {
          icon: 'shopping-cart',
          title: '01 Purchase',
          body: 'Check out in just\na couple of clicks',
        },
        {
          icon: 'mail-open',
          title: '02 Open the file',
          body: 'Download the PDF and use the edit link',
        },
        { icon: 'house', title: '03 Personalise', body: 'Edit it all in the\nbuilt-in editor' },
      ],
    }),
  ],
});
