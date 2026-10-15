import { defaultMotion, phone, placement } from '../../../promo-common';
import type { SequenceEntry } from '../../../sequence';
import { phoneScrollDefaults } from '../../devices/phone-scroll';
import { phoneSpinInDefaults } from '../../devices/phone-spin-in';
import { phoneWallDefaults } from '../../devices/phone-wall';
import { splitGridDefaults } from '../../overlays/split-grid';
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

const RECAP_RANGE: [number, number] = [1548, 2400];

const RECAP_END = RECAP_RANGE[1];

const phoneMotion = defaultMotion({ enter: 'fade', enterFrames: 14, exit: 'fade', exitFrames: 16 });

const TOP_LEFT: SequenceEntry[] = [
  entry('word-punch', 'Text', [1560, 1716], wordPunchDefaults, { wordFrames: 36 }, 'top-left'),
  entry(
    'phone-spin-in',
    'Devices',
    [1704, 1926],
    phoneSpinInDefaults,
    { phone: phone('wallet', 'black'), tilt: 0.24, motion: phoneMotion },
    'top-left',
  ),
  entry('echo-stack', 'Text', [1914, 2064], echoStackDefaults, { exitAt: 100 }, 'top-left'),
  entry(
    'number-counter',
    'Text',
    [2052, 2196],
    numberCounterDefaults,
    { from: 0, to: 24, suffix: '/7', countFrames: 56 },
    'top-left',
  ),
  entry(
    'scribble-caption',
    'Captions',
    [2184, RECAP_END],
    scribbleCaptionDefaults,
    {
      text: 'SAVE PLAN GROW',
      size: 48,
      keepScribble: true,
      shape: 'underline',
      scribblePlace: 'under',
    },
    'top-left',
  ),
];

const TOP_RIGHT: SequenceEntry[] = [
  entry(
    'phone-scroll',
    'Devices',
    [1584, 1806],
    phoneScrollDefaults,
    { phone: phone('feed', 'black'), motion: phoneMotion },
    'top-right',
  ),
  entry(
    'word-build',
    'Text',
    [1794, 1938],
    wordBuildDefaults,
    { text: 'Track Every Goal', highlight: 'Goal', entry: 'slide', size: 110, delay: 2 },
    'top-right',
  ),
  entry(
    'outline-marquee',
    'Text',
    [1926, 2070],
    outlineMarqueeDefaults,
    { labelSize: 104 },
    'top-right',
  ),
  entry('letter-flip', 'Text', [2058, 2160], letterFlipDefaults, {}, 'top-right'),
  entry(
    'glow-reveal',
    'Text',
    [2148, RECAP_END],
    glowRevealDefaults,
    { text: 'Calmer Days', highlight: 'Days', size: 120, exitFlare: false },
    'top-right',
  ),
];

const BOTTOM_LEFT: SequenceEntry[] = [
  entry(
    'typewriter',
    'Text',
    [1608, 1752],
    typewriterDefaults,
    { text: 'Smarter Budgets', size: 120, outroAt: 84 },
    'bottom-left',
  ),
  entry(
    'phone-wall',
    'Devices',
    [1740, 1962],
    phoneWallDefaults,
    { finish: 'black', motion: phoneMotion },
    'bottom-left',
  ),
  entry(
    'word-build',
    'Text',
    [1950, 2094],
    wordBuildDefaults,
    { text: 'Plan Your Money', highlight: 'Money', size: 110, delay: 2 },
    'bottom-left',
  ),
  entry(
    'headline-reveal',
    'Text',
    [2082, 2226],
    headlineRevealDefaults,
    {
      eyebrow: '',
      headline: 'Your Money\nYour Rules',
      highlight: 'Rules',
      body: '',
      size: 150,
      weight: 700,
      leadWeight: 300,
      delay: 0,
      placement: centered(),
    },
    'bottom-left',
  ),
  entry(
    'word-punch',
    'Text',
    [2214, RECAP_END],
    wordPunchDefaults,
    { wordFrames: 40 },
    'bottom-left',
  ),
];

const BOTTOM_RIGHT: SequenceEntry[] = [
  entry('number-counter', 'Text', [1632, 1752], numberCounterDefaults, {}, 'bottom-right'),
  entry(
    'glow-reveal',
    'Text',
    [1740, 1872],
    glowRevealDefaults,
    { text: 'Less Stress', size: 120, exitFlare: false },
    'bottom-right',
  ),
  entry(
    'scribble-caption',
    'Captions',
    [1860, 1956],
    scribbleCaptionDefaults,
    { text: 'BUILT FOR YOU', size: 48, scribbleWidth: 900 },
    'bottom-right',
  ),
  entry(
    'phone-spin-in',
    'Devices',
    [1944, 2166],
    phoneSpinInDefaults,
    { phone: phone('analytics', 'black'), tilt: -0.24, motion: phoneMotion },
    'bottom-right',
  ),
  entry(
    'word-build',
    'Text',
    [2154, RECAP_END],
    wordBuildDefaults,
    { text: 'One Calm App', highlight: 'Calm', entry: 'pop', size: 120, delay: 2 },
    'bottom-right',
  ),
];

export const RECAP_ENTRIES: SequenceEntry[] = [
  entry('split-grid', 'Overlays', RECAP_RANGE, splitGridDefaults, {
    showLabels: false,
    lineOpacity: 0.32,
    delay: 0,
    motion: fadeOut(14),
  }),
  ...TOP_LEFT,
  ...TOP_RIGHT,
  ...BOTTOM_LEFT,
  ...BOTTOM_RIGHT,
];

export const CLOSING_ENTRIES: SequenceEntry[] = [
  entry('word-punch', 'Text', [2388, 2484], wordPunchDefaults, {
    text: 'Download. Halo. Today.',
    highlight: 'Halo.',
    wordFrames: 26,
  }),
  entry('glow-reveal', 'Text', [2472, 2580], glowRevealDefaults, {
    text: 'Halo',
    size: 200,
    weight: 700,
    tracking: -0.04,
    flareFrames: 26,
    motion: fadeOut(10),
  }),
  entry('scribble-caption', 'Captions', [2484, 2580], scribbleCaptionDefaults, {
    text: 'DOWNLOAD HALO TODAY',
    size: 26,
    shape: 'underline',
    scribblePlace: 'under',
    keepScribble: true,
    placement: placement('center', 'bottom', { insetY: 300, width: 1600 }),
    motion: fadeOut(18),
  }),
];
