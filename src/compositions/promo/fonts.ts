import { loadFont as loadCaveatBrush } from '@remotion/google-fonts/CaveatBrush';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadInterTight } from '@remotion/google-fonts/InterTight';
import { loadFont as loadKalam } from '@remotion/google-fonts/Kalam';
import { loadFont as loadOnest } from '@remotion/google-fonts/Onest';
import { loadFont as loadPermanentMarker } from '@remotion/google-fonts/PermanentMarker';
import { loadFont as loadPoppins } from '@remotion/google-fonts/Poppins';
import type { HandFont } from '@/schemas';

export const displayFont = loadInterTight('normal', {
  weights: ['300', '500', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

const inter = loadInter('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const bodyFont = inter.fontFamily;

export const bodyFontReady = inter.waitUntilDone;

export const handFonts: Record<HandFont, string> = {
  'caveat-brush': loadCaveatBrush('normal', { weights: ['400'], subsets: ['latin'] }).fontFamily,
  'permanent-marker': loadPermanentMarker('normal', { weights: ['400'], subsets: ['latin'] })
    .fontFamily,
  kalam: loadKalam('normal', { weights: ['700'], subsets: ['latin'] }).fontFamily,
};

const poppins = loadPoppins('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

export const roundedFont = poppins.fontFamily;

export const roundedFontReady = poppins.waitUntilDone;

export const kineticFont = loadOnest('normal', {
  weights: ['300', '500', '600', '700', '800'],
  subsets: ['latin'],
}).fontFamily;
