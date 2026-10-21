import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadSaira } from '@remotion/google-fonts/Saira';

const saira = loadSaira('normal', {
  weights: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const montserrat = loadMontserrat('normal', {
  weights: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const squareFont = saira.fontFamily;

export const heavyFont = montserrat.fontFamily;
