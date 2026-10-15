import type { HandFont } from '@cliplibrary/schemas';
import { loadFont as loadCaveatBrush } from '@remotion/google-fonts/CaveatBrush';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadInterTight } from '@remotion/google-fonts/InterTight';
import { loadFont as loadKalam } from '@remotion/google-fonts/Kalam';
import { loadFont as loadPermanentMarker } from '@remotion/google-fonts/PermanentMarker';

export const displayFont = loadInterTight('normal', {
  weights: ['300', '500', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

export const bodyFont = loadInter('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

export const handFonts: Record<HandFont, string> = {
  'caveat-brush': loadCaveatBrush('normal', { weights: ['400'], subsets: ['latin'] }).fontFamily,
  'permanent-marker': loadPermanentMarker('normal', { weights: ['400'], subsets: ['latin'] })
    .fontFamily,
  kalam: loadKalam('normal', { weights: ['700'], subsets: ['latin'] }).fontFamily,
};
