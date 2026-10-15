import { defaultMotion, placement } from '../../../promo-common';
import { echoStackDefaults } from '../../typography/echo-stack';
import { glowRevealDefaults } from '../../typography/glow-reveal';
import { headlineRevealDefaults } from '../../typography/headline-reveal';
import { letterFlipDefaults } from '../../typography/letter-flip';
import { outlineMarqueeDefaults } from '../../typography/outline-marquee';
import { scribbleCaptionDefaults } from '../../typography/scribble-caption';
import { wordBuildDefaults } from '../../typography/word-build';
import { wordPunchDefaults } from '../../typography/word-punch';
import { type Beat, centered, entry, fadeOut, span } from './entry';

const headline = (text: string, size: number) => ({
  eyebrow: '',
  headline: text,
  highlight: '',
  body: '',
  size,
  weight: 700,
  leadWeight: 700,
  typeface: 'onest' as const,
  revealFrames: 4,
  delay: 0,
  placement: centered(),
});

export const ZOOM_WAVE: Beat = {
  length: 159,
  build: (at, length, quadrant) => [
    entry(
      'word-build',
      'Text',
      span(at, 0, length),
      wordBuildDefaults,
      {
        text: 'Keep Your Money Organised',
        entry: 'shrink',
        bigWords: 2,
        bigSize: 300,
        zoomFrom: 2.6,
        wordFrames: 33,
        bigExit: 'fall',
        sentenceEntry: 'wave',
        size: 96,
        buildFrames: 2,
        walkHighlight: false,
        delay: 0,
      },
      quadrant,
    ),
  ],
};

export const STACK: Beat = {
  length: 90,
  build: (at, length, quadrant) => [
    entry(
      'echo-stack',
      'Text',
      span(at, 0, length),
      echoStackDefaults,
      {
        delay: 0,
        exitAt: length - 12,
        motion: fadeOut(2),
      },
      quadrant,
    ),
  ],
};

export const WORDS_TO_BLOCK: Beat = {
  length: 111,
  build: (at, length, quadrant) => [
    entry(
      'word-punch',
      'Text',
      span(at, 0, 48),
      wordPunchDefaults,
      {
        text: 'Simple Money Tools',
        style: 'punch',
        size: 150,
        shrink: 0,
        wordFrames: 15,
        swapFrames: 2,
        punch: 0.06,
        delay: 0,
        motion: fadeOut(3),
      },
      quadrant,
    ),
    entry(
      'headline-reveal',
      'Text',
      span(at, 48, length),
      headlineRevealDefaults,
      {
        ...headline('Simple Money Tools\nFor Every Budget', 104),
        motion: defaultMotion({ enter: 'grow', enterFrames: 12, exit: 'blast', exitFrames: 8 }),
      },
      quadrant,
    ),
  ],
};

export const MARQUEE: Beat = {
  length: 99,
  build: (at, length, quadrant) => [
    entry(
      'headline-reveal',
      'Text',
      span(at, 0, 14),
      headlineRevealDefaults,
      {
        ...headline('Calm Money', 60),
        motion: defaultMotion({ enter: 'grow', enterFrames: 6, exit: 'blast', exitFrames: 6 }),
      },
      quadrant,
    ),
    entry(
      'outline-marquee',
      'Text',
      span(at, 12, length),
      outlineMarqueeDefaults,
      {
        delay: 0,
        motion: defaultMotion({ enter: 'blast', enterFrames: 10, exit: 'fade', exitFrames: 4 }),
      },
      quadrant,
    ),
  ],
};

export const FLIP_TO_GLOW: Beat = {
  length: 117,
  build: (at, length, quadrant) => [
    entry(
      'letter-flip',
      'Text',
      span(at, 0, 58),
      letterFlipDefaults,
      {
        delay: 0,
        motion: fadeOut(2),
      },
      quadrant,
    ),
    entry(
      'glow-reveal',
      'Text',
      span(at, 55, length),
      glowRevealDefaults,
      {
        size: 72,
        weight: 700,
        typeFrames: 0.4,
        bloomFrames: 30,
        exitFlare: false,
        delay: 0,
        motion: fadeOut(5),
      },
      quadrant,
    ),
  ],
};

export const SCRATCH_OUT: Beat = {
  length: 57,
  build: (at, length, quadrant) => [
    entry(
      'scribble-caption',
      'Captions',
      span(at, 0, length),
      scribbleCaptionDefaults,
      {
        typeFrames: 0.25,
        spread: 0,
        scribbleAt: 'end',
        drawFrames: 20,
        delay: 0,
        motion: fadeOut(3),
      },
      quadrant,
    ),
  ],
};

export const STEP_TO_TYPE: Beat = {
  length: 108,
  build: (at, length, quadrant) => [
    entry(
      'word-build',
      'Text',
      span(at, 0, length),
      wordBuildDefaults,
      {
        text: 'Modern Money Habits',
        entry: 'step',
        bigWords: 3,
        bigSize: 330,
        sizeRamp: 0.42,
        wordFrames: 15,
        bigExit: 'squeeze',
        sentenceEntry: 'type',
        buildFrames: 4,
        walkHighlight: false,
        delay: 0,
        placement: placement('center', 'center', { width: 1700 }),
        motion: fadeOut(6),
      },
      quadrant,
    ),
  ],
};
