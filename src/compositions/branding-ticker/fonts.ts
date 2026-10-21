import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { roundedFont, roundedFontReady } from '../promo/fonts';

export const tickerFont = roundedFont;

export const tickerFontReady = roundedFontReady;

export const buttonFont = loadBarlowCondensed('normal', {
  weights: ['600', '700'],
  subsets: ['latin'],
}).fontFamily;
