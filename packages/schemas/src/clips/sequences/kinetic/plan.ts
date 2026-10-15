import { QUADRANTS, type Quadrant, type SequenceEntry } from '../../../sequence';
import { scribbleCaptionDefaults } from '../../typography/scribble-caption';
import { wordPunchDefaults } from '../../typography/word-punch';
import {
  FLIP_TO_GLOW,
  MARQUEE,
  SCRATCH_OUT,
  STACK,
  STEP_TO_TYPE,
  WORDS_TO_BLOCK,
  ZOOM_WAVE,
} from './beats-middle';
import {
  COUNT_UP,
  SCROLL_SENTENCE,
  SHRINK_ERASE,
  SWEEP_SENTENCE,
  TITLE,
  TYPED_WORDS,
  TYPEWRITER,
} from './beats-opening';
import { type Beat, entry, fadeOut, span } from './entry';

const OPENING: [number, Beat][] = [
  [0, COUNT_UP],
  [45, TITLE],
  [87, SHRINK_ERASE],
  [120, SCROLL_SENTENCE],
  [204, TYPED_WORDS],
  [321, TYPEWRITER],
  [447, SWEEP_SENTENCE],
  [537, ZOOM_WAVE],
  [699, STACK],
  [792, WORDS_TO_BLOCK],
  [906, MARQUEE],
  [1008, FLIP_TO_GLOW],
  [1128, SCRATCH_OUT],
  [1191, STEP_TO_TYPE],
];

const GRID_START = 1298;

const SET_LENGTH = 180;

const GRID_SETS: Beat[][] = [
  [SCROLL_SENTENCE, TYPEWRITER, SWEEP_SENTENCE, TYPED_WORDS],
  [ZOOM_WAVE, WORDS_TO_BLOCK, MARQUEE, FLIP_TO_GLOW],
  [STACK, SCROLL_SENTENCE, TYPEWRITER, STEP_TO_TYPE],
];

const gridPass = (at: number): SequenceEntry[] =>
  GRID_SETS.flatMap((set, setIndex) =>
    set.flatMap((beat, slot) =>
      beat.build(at + setIndex * SET_LENGTH, SET_LENGTH, QUADRANTS[slot] as Quadrant),
    ),
  );

const CLOSING_START = GRID_START + 2 * GRID_SETS.length * SET_LENGTH;

export const PROMO_END = CLOSING_START + 217;

export const PLAN_ENTRIES: SequenceEntry[] = [
  ...OPENING.flatMap(([at, beat], index) =>
    beat.build(at, (OPENING[index + 1]?.[0] ?? GRID_START) - at),
  ),
  ...gridPass(GRID_START),
  ...gridPass(GRID_START + GRID_SETS.length * SET_LENGTH),
  entry('word-punch', 'Text', span(CLOSING_START, 0, 84), wordPunchDefaults, {
    text: 'Download. Halo. Today.',
    delay: 2,
    motion: fadeOut(4),
  }),
  entry('scribble-caption', 'Captions', span(CLOSING_START, 82, 217), scribbleCaptionDefaults, {
    text: 'Download Halo Today!',
    drawFrames: 26,
    scribbleAt: 'end',
    glowOut: 1,
    delay: 0,
    motion: fadeOut(10),
  }),
];
