import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadInterTight } from '@remotion/google-fonts/InterTight';

export const displayFont = loadInterTight('normal', {
  weights: ['500', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

export const bodyFont = loadInter('normal', {
  weights: ['400', '500', '600'],
  subsets: ['latin'],
}).fontFamily;
