import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { WordStreamsProps } from './word-streams';

const PER_FRAME = 'In pixels per frame';

export const wordStreamsControls = defineControls<WordStreamsProps>({
  sections: [
    {
      title: 'Word',
      fields: [
        { path: 'word.text', label: 'Word', hint: 'Repeated end to end along every stream' },
        {
          path: 'word.size',
          label: 'Word size',
          hint: 'In pixels, for the copies between swells',
        },
        { path: 'word.weight', label: 'Font weight' },
        {
          path: 'word.spacing',
          label: 'Copy spacing',
          hint: 'Gap from one copy to the next along the curve, as a multiple of its size. Lower packs them tighter',
        },
      ],
      more: [{ path: 'word.tracking', label: 'Letter spacing', hint: 'In em' }],
    },
    {
      title: 'Streams',
      fields: [
        { path: 'streams.count', label: 'Streams' },
        {
          path: 'streams.gap',
          label: 'Stream spacing',
          hint: 'In pixels between the centers of neighboring streams',
        },
        {
          path: 'streams.phaseStep',
          label: 'Curve offset',
          hint: 'In degrees. Shifts each stream along the wave from its left neighbor; 0 keeps them parallel',
        },
      ],
      more: [
        {
          path: 'streams.offsetX',
          label: 'Side shift',
          hint: 'Moves every stream sideways, in pixels from center',
        },
      ],
    },
    {
      title: 'Wave',
      fields: [
        {
          path: 'wave.amplitude',
          label: 'Curve width',
          hint: 'How far each stream swings to the side, in pixels. 0 runs them straight',
        },
        {
          path: 'wave.length',
          label: 'Curve length',
          hint: 'In pixels from one bend to the same bend again, measured top to bottom',
        },
        {
          path: 'wave.sway',
          label: 'Sway speed',
          hint: `${PER_FRAME} the bends slide down the frame; negative slides them up, 0 holds the curves still`,
        },
      ],
    },
    {
      title: 'Swell',
      fields: [
        {
          path: 'swell.peak',
          label: 'Swell size',
          hint: 'Size of the biggest copy in each swell, in pixels. Set it to the word size for no swell',
        },
        {
          path: 'swell.length',
          label: 'Copies per swell',
          hint: 'How many copies pass from one swell to the next',
        },
        {
          path: 'swell.offset',
          label: 'Swell offset',
          hint: 'Share of a swell each stream is shifted from its left neighbor',
        },
      ],
      more: [
        {
          path: 'swell.sharpness',
          label: 'Swell sharpness',
          hint: 'Higher keeps the big copies to a shorter run with more small ones between',
        },
        {
          path: 'swell.drift',
          label: 'Swell overtake speed',
          hint: `${PER_FRAME}. 0 carries the swell along with the copies. Above 0 it runs ahead, so copies grow and shrink as it passes and their speed varies slightly`,
        },
        {
          path: 'swell.outline',
          label: 'Outline the swell',
          hint: 'Draws the biggest copies as outlines instead of solid type',
        },
        {
          path: 'swell.outlineFrom',
          label: 'Outline from',
          hint: 'Share of the swell where copies turn to outline, blending softly. Lower outlines more of each swell. Outline the swell only',
        },
        {
          path: 'swell.outlineWidth',
          label: 'Outline thickness',
          hint: 'In pixels. Outline the swell only',
        },
      ],
    },
    {
      title: 'Flow',
      fields: [
        {
          path: 'flow.speed',
          label: 'Flow speed',
          hint: `${PER_FRAME} along the curve, always whole pixels so the type never judders. 0 parks the copies`,
        },
        {
          path: 'flow.direction',
          label: 'Flow direction',
          hint: 'Which way the copies travel. The slide-in follows the same direction',
        },
        {
          path: 'flow.riseDistance',
          label: 'Slide-in distance',
          hint: 'In pixels the streams slide along their flow as they fade in. 0 keeps them in place',
        },
        {
          path: 'flow.fadeFrames',
          label: 'Fade-in length',
          hint: 'In frames for each stream to fade in. 0 shows them at once',
        },
      ],
      more: [
        {
          path: 'flow.alternate',
          label: 'Alternate streams',
          hint: 'Every second stream flows the opposite way',
        },
        {
          path: 'flow.riseFrames',
          label: 'Slide-in length',
          hint: 'In frames for the first stream to settle into the flow. 0 turns the slide off',
        },
        {
          path: 'flow.riseStagger',
          label: 'Slide-in stagger',
          hint: 'Extra frames each stream takes to fade in and settle after its left neighbor',
        },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        {
          path: 'tone.dark',
          label: 'Dark look',
          hint: 'Swaps the background and ink colors for light type on a dark field',
        },
        { ...LOOK.background, hint: 'With Dark look on, this colors the type instead' },
        {
          link: ['look.ink', 'look.accent'],
          label: 'Ink color',
          hint: 'The words and the paper margin line. With Dark look on, this becomes the background',
        },
        LOOK.grain,
      ],
      more: [
        { ...LOOK.ink, label: 'Word color' },
        { ...LOOK.accent, label: 'Margin line color', hint: 'Shows when Paper margin line is on' },
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Speeds up the sway, the slide-in and the swell overtake. Flow speed is set separately; the entrance and exit keep their own length',
        },
      ],
      more: [MOTION.exitFrames, MOTION.enter, MOTION.enterFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
