import { loadFont } from '@remotion/google-fonts/BarlowSemiCondensed';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';

export const neonFont = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
}).fontFamily;

export const urlFont = loadMontserrat('normal', {
  weights: ['400', '500'],
  subsets: ['latin'],
}).fontFamily;
