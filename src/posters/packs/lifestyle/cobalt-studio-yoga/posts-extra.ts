import { linear } from '@/design';
import { POST_SIZE, photo, rect, STORY_SIZE, type Template, template, text } from '../../../kit';
import { CO, centeredMark, SANS, SERIF } from './palette';

const { width: W, height: H } = POST_SIZE;

const yogaLetters = (height: number): Template =>
  template(W, height, () => {
    const mid = height / 2;
    return [
      rect(0, 0, W, height, linear(180, CO.cobalt, CO.deep), { name: 'Background' }),
      text('YO', 0, mid - 520, W, {
        fontFamily: SANS,
        fontSize: 380,
        fontWeight: 800,
        fill: CO.white,
        align: 'center',
        lineHeight: 1,
        letterSpacing: 140,
      }),
      text('GA', 0, mid - 120, W, {
        fontFamily: SANS,
        fontSize: 380,
        fontWeight: 800,
        fill: CO.white,
        align: 'center',
        lineHeight: 1,
        letterSpacing: 140,
      }),
      photo('woman-portrait-3', 400, mid - 440, 280, 760, { cornerRadius: 140 }),
      text('Find your flow', 650, mid - 560, 380, {
        fontFamily: SERIF,
        fontSize: 54,
        fontWeight: 500,
        italic: true,
        fill: CO.lilac,
        rotation: 12,
      }),
      centeredMark(540, mid + 400, CO.white),
    ];
  });

export const yogaLettersPost = yogaLetters(H);
export const yogaLettersStory = yogaLetters(STORY_SIZE.height);
