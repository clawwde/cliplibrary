import { definePack, SQUARE } from '../../../pack';
import {
  cardsOnDesk,
  editorLaptop,
  howToStart,
  type ListingTheme,
  letterOnDesk,
  resumeOnDesk,
} from '../focal-point-photographer/listing';
import { designerResume } from './resume';
import { designerCardBack, designerCardFront, designerLetter } from './stationery';

const THEME: ListingTheme = {
  desk: '#efedf3',
  sheet: '#ffffff',
  night: '#120b1a',
  accent: '#c4f24a',
  edge: '#c4f24a',
  glow: ['#e4ff8f', '#7fb315'],
  spark: ['#c9a6ff', '#5b2d91'],
  font: 'Poppins',
};

export const loopLineDesignerPack = definePack({
  id: 'loop-line-designer',
  title: 'Loop Line Designer',
  description:
    'A playful graphic designer resume on a plum grid with lime swirls, plus a cover letter and business cards.',
  category: 'resumes',
  tags: ['resume', 'business-card', 'freelance', 'neon'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    resumeOnDesk(THEME, designerResume),
    cardsOnDesk(THEME, designerCardFront, designerCardBack),
    letterOnDesk(THEME, designerLetter),
    editorLaptop(THEME, designerResume, {
      title: 'Restyle it in your browser',
      body: 'Edit every word, pick new colours and fonts, swap icons and reshape the layout to match your work.',
    }),
    howToStart(THEME, {
      title: 'Ready in Three Steps',
      steps: [
        { icon: 'shopping-bag', title: '01 Buy', body: 'Check out securely in a few clicks' },
        { icon: 'download', title: '02 Download', body: 'Save the PDF and open the edit link' },
        { icon: 'palette', title: '03 Design', body: 'Make it yours in the\nbuilt-in editor' },
      ],
    }),
  ],
});
