import { definePack, SQUARE } from '../../../pack';
import {
  cardsOnDesk,
  editorLaptop,
  howToStart,
  type ListingTheme,
  letterOnDesk,
  resumeOnDesk,
} from './listing';
import { photographerResume } from './resume';
import { photographerCardBack, photographerCardFront, photographerLetter } from './stationery';

const THEME: ListingTheme = {
  desk: '#eef1ef',
  sheet: '#ffffff',
  night: '#0b1416',
  accent: '#f0b04c',
  edge: '#12343b',
  glow: ['#ffd38a', '#d9862f'],
  spark: ['#4fb3a5', '#12545a'],
  font: 'Poppins',
};

export const focalPointPhotographerPack = definePack({
  id: 'focal-point-photographer',
  title: 'Focal Point Photographer',
  description:
    'A slanted-band photographer resume with a matching cover letter and business cards in deep teal and amber.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'freelance', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    resumeOnDesk(THEME, photographerResume),
    cardsOnDesk(THEME, photographerCardFront, photographerCardBack),
    letterOnDesk(THEME, photographerLetter),
    editorLaptop(THEME, photographerResume, {
      title: 'Edit everything in your browser',
      body: 'Rewrite any line, swap the photo, try new fonts or colours and rearrange sections to suit you.',
    }),
    howToStart(THEME, {
      title: 'Get Started in 3 Steps',
      steps: [
        {
          icon: 'shopping-cart',
          title: '01 Check out',
          body: 'Complete your order in under a minute',
        },
        {
          icon: 'download',
          title: '02 Grab the file',
          body: 'Download the PDF and tap the edit link inside',
        },
        {
          icon: 'pencil',
          title: '03 Make it yours',
          body: 'Open it in the built-in editor and start typing',
        },
      ],
    }),
  ],
});
