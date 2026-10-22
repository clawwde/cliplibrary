import type { DesignIconName } from '@/design';
import { group, icon, POST_SIZE, photo, pill, rect, star, template, text } from '../../../kit';

export interface CommentTheme {
  brand: string;
  ink: string;
  paper: string;
  accent: string;
  deep: string;
}

export const AZURE: CommentTheme = {
  brand: '#2f6bff',
  ink: '#0a1024',
  paper: '#ffffff',
  accent: '#ffd166',
  deep: '#1d4ed8',
};

export const FUCHSIA: CommentTheme = {
  brand: '#c026d3',
  ink: '#1a0620',
  paper: '#ffffff',
  accent: '#a3e635',
  deep: '#86198f',
};

const { width: W, height: H } = POST_SIZE;
export const DISPLAY = 'Archivo Black';
export const HEAD = 'Outfit';
export const BODY = 'DM Sans';

const wordBox = (theme: CommentTheme, word: string, x: number, y: number, width: number) =>
  group(
    rect(x, y, width, 150, theme.ink, { name: `${word} box`, cornerRadius: 10 }),
    text(word, x, y + 34, width, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 700,
      fill: theme.paper,
      align: 'center',
    }),
  );

const iconBox = (theme: CommentTheme, name: DesignIconName, x: number, y: number) =>
  group(
    rect(x, y, 170, 150, theme.ink, { name: 'Icon box', cornerRadius: 10 }),
    icon(name, x + 40, y + 30, 90, theme.paper, { strokeWidth: 3 }),
  );

export const wordBoxes = (theme: CommentTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.brand, { name: 'Background' }),
    text('Most people scroll past this.\nThe ones who stop grow faster.', 90, 80, 760, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: theme.paper,
      lineHeight: 1.35,
    }),
    rect(90, 200, 640, 70, theme.paper, { name: 'Prompt label' }),
    text('Comment “grow” for the free guide', 90, 216, 640, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 700,
      fill: theme.ink,
      align: 'center',
    }),
    star(5, 880, 60, 120, theme.ink, { innerRatio: 0.42 }),
    iconBox(theme, 'arrow-right', 150, 340),
    wordBox(theme, 'Post', 350, 340, 480),
    wordBox(theme, 'Less', 150, 530, 440),
    wordBox(theme, '&', 620, 530, 210),
    iconBox(theme, 'arrow-down', 150, 720),
    wordBox(theme, 'Sell', 350, 720, 480),
    wordBox(theme, 'More', 150, 910, 480),
    iconBox(theme, 'arrow-right', 660, 910),
    text('Save this for your next launch', 0, 1170, W, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 700,
      fill: theme.paper,
      align: 'center',
    }),
  ]);

export const closeTo = (theme: CommentTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.brand, { name: 'Background' }),
    text('You are this', 80, 110, 800, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 500,
      fill: theme.paper,
    }),
    text('Close to...', 80, 190, 900, {
      fontFamily: HEAD,
      fontSize: 124,
      fontWeight: 800,
      fill: theme.paper,
    }),
    text('Read the caption\nbefore you scroll', 80, 380, 420, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 500,
      fill: theme.paper,
      lineHeight: 1.35,
    }),
    photo('phone-hand-2', 420, 500, 600, 790, { cornerRadius: 36 }),
    star(5, 900, 70, 100, theme.ink, { innerRatio: 0.42 }),
    star(5, 70, 1150, 130, theme.ink, { innerRatio: 0.42 }),
    star(5, 290, 1230, 70, theme.accent, { innerRatio: 0.42 }),
  ]);

export const dontSkip = (theme: CommentTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.brand, { name: 'Background' }),
    photo('woman-portrait-6', 330, 120, 690, 1100, { cornerRadius: 30 }),
    text('DON’T SKIP', 50, 1290, 1100, {
      fontFamily: DISPLAY,
      fontSize: 100,
      fontWeight: 400,
      fill: 'rgba(0,0,0,0)',
      stroke: theme.paper,
      strokeWidth: 3,
      rotation: -90,
    }),
    text('THE COMMENTS', 170, 1290, 1100, {
      fontFamily: DISPLAY,
      fontSize: 100,
      fontWeight: 400,
      fill: theme.paper,
      rotation: -90,
    }),
    star(5, 930, 40, 110, theme.ink, { innerRatio: 0.42 }),
    pill('The answer is waiting below', 400, 1150, {
      fill: theme.ink,
      color: theme.paper,
      fontSize: 34,
      fontFamily: HEAD,
      fontWeight: 700,
      width: 560,
    }),
  ]);
