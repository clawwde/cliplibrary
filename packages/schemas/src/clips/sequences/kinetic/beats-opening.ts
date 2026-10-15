import { headlineRevealDefaults } from '../../typography/headline-reveal';
import { numberCounterDefaults } from '../../typography/number-counter';
import { scribbleCaptionDefaults } from '../../typography/scribble-caption';
import { typewriterDefaults } from '../../typography/typewriter';
import { wordBuildDefaults } from '../../typography/word-build';
import { wordPunchDefaults } from '../../typography/word-punch';
import { type Beat, centered, entry, fadeOut, span } from './entry';

const twoLines = (text: string, size: number, revealFrames: number) => ({
  eyebrow: '',
  headline: text,
  highlight: '',
  body: '',
  size,
  weight: 700,
  leadWeight: text.includes('\n') ? 300 : 700,
  typeface: 'onest' as const,
  revealFrames,
  delay: 0,
  placement: centered(),
  motion: fadeOut(3),
});

export const COUNT_UP: Beat = {
  length: 45,
  build: (at, length, quadrant) => [
    entry(
      'number-counter',
      'Text',
      span(at, 0, length),
      numberCounterDefaults,
      {
        delay: 0,
        motion: fadeOut(3),
      },
      quadrant,
    ),
  ],
};

export const TITLE: Beat = {
  length: 42,
  build: (at, length, quadrant) => [
    entry(
      'headline-reveal',
      'Text',
      span(at, 0, 10),
      headlineRevealDefaults,
      twoLines('Smart', 150, 4),
      quadrant,
    ),
    entry(
      'headline-reveal',
      'Text',
      span(at, 9, length),
      headlineRevealDefaults,
      twoLines('12 Smart\nMoney Tools', 150, 5),
      quadrant,
    ),
  ],
};

export const SHRINK_ERASE: Beat = {
  length: 33,
  build: (at, length, quadrant) => [
    entry(
      'typewriter',
      'Text',
      span(at, 0, length),
      typewriterDefaults,
      {
        text: 'Introducing',
        size: 132,
        weight: 300,
        tracking: -0.03,
        intro: 'cut',
        outro: 'erase',
        zoom: 1.5,
        delay: 0,
        charFrames: 1.4,
        outroAt: length - 18,
        showCaret: false,
        motion: fadeOut(2),
      },
      quadrant,
    ),
  ],
};

export const SCROLL_SENTENCE: Beat = {
  length: 84,
  build: (at, length, quadrant) => [
    entry('word-build', 'Text', span(at, 0, length), wordBuildDefaults, { delay: 0 }, quadrant),
  ],
};

export const TYPED_WORDS: Beat = {
  length: 117,
  build: (at, length, quadrant) => [
    entry(
      'word-punch',
      'Text',
      span(at, 0, 84),
      wordPunchDefaults,
      { delay: 2, motion: fadeOut(4) },
      quadrant,
    ),
    entry(
      'scribble-caption',
      'Captions',
      span(at, 81, length),
      scribbleCaptionDefaults,
      {
        delay: 0,
        drawFrames: 14,
        motion: fadeOut(4),
      },
      quadrant,
    ),
  ],
};

export const TYPEWRITER: Beat = {
  length: 126,
  build: (at, length, quadrant) => [
    entry(
      'typewriter',
      'Text',
      span(at, 0, length),
      typewriterDefaults,
      {
        size: 80,
        weight: 700,
        tracking: -0.01,
        delay: 3,
        outroAt: length - 18,
        motion: fadeOut(2),
      },
      quadrant,
    ),
  ],
};

export const SWEEP_SENTENCE: Beat = {
  length: 87,
  build: (at, length, quadrant) => [
    entry(
      'word-build',
      'Text',
      span(at, 0, length),
      wordBuildDefaults,
      {
        text: 'Track Goals In Seconds',
        entry: 'slide',
        direction: 'right',
        bigWords: 3,
        bigSize: 560,
        wordFrames: 17,
        buildFrom: 'right',
        exitByWord: false,
        delay: 0,
      },
      quadrant,
    ),
  ],
};
