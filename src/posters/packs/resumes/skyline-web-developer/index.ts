import { definePack, SQUARE } from '../../../pack';
import {
  cardsOnDesk,
  editorLaptop,
  howToStart,
  type ListingTheme,
  letterOnDesk,
  resumeOnDesk,
} from '../focal-point-photographer/listing';
import { developerResume } from './resume';
import { developerCardBack, developerCardFront, developerLetter } from './stationery';

const THEME: ListingTheme = {
  desk: '#edf1f6',
  sheet: '#ffffff',
  night: '#090e1c',
  accent: '#5ad1e6',
  edge: '#1fb2c9',
  glow: ['#8ee9f7', '#1592a8'],
  spark: ['#7d8ff5', '#26336e'],
  font: 'Poppins',
};

export const skylineWebDeveloperPack = definePack({
  id: 'skyline-web-developer',
  title: 'Skyline Web Developer',
  description:
    'A clean navy and sky blue web developer resume with a timeline layout, cover letter and business cards.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'saas', 'corporate'],
  theme: 'light',
  ...SQUARE,
  pages: [
    resumeOnDesk(THEME, developerResume),
    cardsOnDesk(THEME, developerCardFront, developerCardBack),
    letterOnDesk(THEME, developerLetter),
    editorLaptop(THEME, developerResume, {
      title: 'Customise it in your browser',
      body: 'Change any text, recolour the accents, swap icons and move sections around in a few clicks.',
    }),
    howToStart(THEME, {
      title: 'Three Easy Steps',
      steps: [
        { icon: 'credit-card', title: '01 Order', body: 'Finish checkout in a few seconds' },
        {
          icon: 'file-text',
          title: '02 Open the PDF',
          body: 'Download it and follow the edit link',
        },
        { icon: 'laptop', title: '03 Customise', body: 'Edit everything in the built-in editor' },
      ],
    }),
  ],
});
