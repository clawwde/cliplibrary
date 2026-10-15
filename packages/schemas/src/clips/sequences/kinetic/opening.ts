import type { SequenceEntry } from '../../../sequence';
import { echoStackDefaults } from '../../typography/echo-stack';
import { glowRevealDefaults } from '../../typography/glow-reveal';
import { headlineRevealDefaults } from '../../typography/headline-reveal';
import { letterFlipDefaults } from '../../typography/letter-flip';
import { numberCounterDefaults } from '../../typography/number-counter';
import { outlineMarqueeDefaults } from '../../typography/outline-marquee';
import { scribbleCaptionDefaults } from '../../typography/scribble-caption';
import { typewriterDefaults } from '../../typography/typewriter';
import { wordBuildDefaults } from '../../typography/word-build';
import { wordPunchDefaults } from '../../typography/word-punch';
import { centered, entry, fadeOut } from './entry';

const build = (range: [number, number], overrides: Partial<typeof wordBuildDefaults>) =>
  entry('word-build', 'Text', range, wordBuildDefaults, overrides);

export const OPENING_ENTRIES: SequenceEntry[] = [
  entry('number-counter', 'Text', [0, 90], numberCounterDefaults, {
    motion: { ...fadeOut(14), exit: 'blur' },
  }),
  entry('headline-reveal', 'Text', [78, 168], headlineRevealDefaults, {
    eyebrow: '',
    headline: '12 Tools\nOne Calm App',
    highlight: 'Calm',
    body: '',
    size: 132,
    weight: 700,
    leadWeight: 300,
    delay: 0,
    placement: centered(),
  }),
  entry('typewriter', 'Text', [156, 228], typewriterDefaults, {
    text: 'Halo',
    size: 220,
    weight: 700,
    tracking: -0.04,
    intro: 'typed',
    outro: 'erase',
    delay: 0,
    charFrames: 4,
    outroAt: 36,
    showCaret: false,
  }),
  build([216, 348], { text: 'Plan Your Money In One Place', highlight: 'Money' }),
  entry('word-punch', 'Text', [336, 432], wordPunchDefaults, {}),
  entry('scribble-caption', 'Captions', [420, 504], scribbleCaptionDefaults, {}),
  entry('typewriter', 'Text', [492, 630], typewriterDefaults, { outroAt: 80 }),
  build([618, 750], {
    text: 'Track Every Goal In Seconds',
    highlight: 'Seconds',
    entry: 'slide',
    delay: 2,
  }),
  build([738, 870], {
    text: 'Keep Your Money Organised',
    highlight: 'Organised',
    entry: 'tilt',
    bigSize: 300,
    delay: 2,
  }),
  entry('echo-stack', 'Text', [858, 978], echoStackDefaults, { exitAt: 78, accentRow: 4 }),
  build([966, 1110], {
    text: 'Everything You Need\nIn One Calm App',
    highlight: 'Calm',
    entry: 'pop',
    wordFrames: 11,
    bigSize: 260,
    size: 84,
    delay: 2,
  }),
  entry('outline-marquee', 'Text', [1098, 1212], outlineMarqueeDefaults, {}),
  entry('letter-flip', 'Text', [1200, 1284], letterFlipDefaults, {
    motion: { ...fadeOut(14), exit: 'blur' },
  }),
  entry('glow-reveal', 'Text', [1272, 1380], glowRevealDefaults, { exitFlare: false }),
  entry('scribble-caption', 'Captions', [1368, 1446], scribbleCaptionDefaults, {
    text: 'BUILT FOR BUSY PEOPLE',
    shape: 'swash',
  }),
  build([1434, 1560], {
    text: 'Simple Money Habits',
    highlight: 'Habits',
    entry: 'echo',
    bigSize: 300,
    size: 96,
    exitByWord: true,
    delay: 2,
    motion: fadeOut(8),
  }),
];
