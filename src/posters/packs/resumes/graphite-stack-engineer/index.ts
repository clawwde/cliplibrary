import { definePack, SQUARE } from '../../../pack';
import {
  cardsOnDesk,
  editorLaptop,
  howToStart,
  type ListingTheme,
  letterOnDesk,
  resumeOnDesk,
} from '../focal-point-photographer/listing';
import { engineerResume } from './resume';
import { engineerCardBack, engineerCardFront, engineerLetter } from './stationery';

const THEME: ListingTheme = {
  desk: '#eceef1',
  sheet: '#ffffff',
  night: '#0d0e11',
  accent: '#ffc94d',
  edge: '#d9434b',
  glow: ['#ffe08f', '#e0a21f'],
  spark: ['#ff7a80', '#a3242b'],
  font: 'Montserrat',
};

export const graphiteStackEngineerPack = definePack({
  id: 'graphite-stack-engineer',
  title: 'Graphite Stack Engineer',
  description:
    'A dark tiled software engineer resume in graphite, crimson and amber, with a cover letter and business cards.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'saas', 'b2b'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    resumeOnDesk(THEME, engineerResume),
    cardsOnDesk(THEME, engineerCardFront, engineerCardBack),
    letterOnDesk(THEME, engineerLetter),
    editorLaptop(THEME, engineerResume, {
      title: 'Fully editable online',
      body: 'Edit the text, switch fonts and colours, replace icons and rework the tiles to fit your story.',
    }),
    howToStart(THEME, {
      title: 'Start in 3 Steps',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Pay securely and get instant access' },
        { icon: 'download', title: '02 Get the PDF', body: 'Download it and hit the edit link' },
        { icon: 'code', title: '03 Edit away', body: 'Open it in the\nbuilt-in editor' },
      ],
    }),
  ],
});
