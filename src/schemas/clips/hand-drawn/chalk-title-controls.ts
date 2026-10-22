import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { ChalkTitleProps } from './chalk-title';

export const chalkTitleControls = defineControls<ChalkTitleProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'left', label: 'Left word' },
        { path: 'right', label: 'Right word' },
        { path: 'center.word', label: 'Center word', hint: 'Drawn between the two words' },
        {
          path: 'center.variant',
          label: 'Center badge style',
          hint: 'Wider styles may need more space around the center',
        },
        {
          path: 'wordFont',
          label: 'Word font',
          hint: 'Script: brush handwriting. Thin: narrow hand lettering. Bold: tall condensed sans. Chunky: rounded cartoon caps. Serif: heavy display serif',
        },
        { path: 'wordSize', label: 'Word size', hint: 'In pixels' },
      ],
      more: [
        { path: 'centerScale', label: 'Center badge size' },
        {
          path: 'gap',
          label: 'Space around the center',
          hint: 'Distance in pixels from the middle to each word',
        },
        {
          path: 'wordTilt',
          label: 'Word tilt',
          hint: 'In degrees, negative tilts the words up to the right',
        },
      ],
    },
    {
      title: 'Timing',
      fields: [
        {
          path: 'drawFrames',
          label: 'Writing length',
          hint: 'Frames to write the left word, the center badge and the right word',
        },
        {
          path: 'eraseAt',
          label: 'Erase starts at',
          hint: 'Frames after the start delay',
        },
        {
          path: 'eraseFrames',
          label: 'Erase length',
          hint: 'In frames, the right word unwrites first',
        },
      ],
      more: [{ path: 'delay', label: 'Start delay', hint: 'In frames' }],
    },
    {
      title: 'Chalk',
      fields: [
        {
          link: ['wordColor', 'center.text', 'center.line'],
          label: 'Chalk color',
          hint: 'Words, center word and center outline together',
        },
        {
          path: 'center.fill',
          label: 'Center accent color',
          hint: 'Sparkles and filled shapes of the center badge',
        },
        {
          path: 'chalk.roughness',
          label: 'Edge roughness',
          hint: 'Higher makes the chalk edges wobble more',
        },
        {
          path: 'chalk.dryness',
          label: 'Chalk dryness',
          hint: 'Higher leaves more gaps in the chalk',
        },
        { path: 'chalk.shadow', label: 'Drop shadow' },
      ],
      more: [
        { path: 'wordColor', label: 'Word color' },
        { path: 'center.text', label: 'Center word color' },
        {
          path: 'center.line',
          label: 'Center line color',
          hint: 'Outlines and drawn lines of the center badge',
        },
        {
          path: 'chalk.width',
          label: 'Stroke thickness',
          hint: 'Only for center badge styles drawn with lines',
        },
      ],
    },
    {
      title: 'Board',
      fields: [
        { ...LOOK.showBackdrop, label: 'Show chalkboard' },
        { ...LOOK.background, label: 'Board color' },
        { path: 'look.paper', label: 'Board pattern' },
        LOOK.grain,
      ],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        { ...LOOK.paperLine, label: 'Pattern line color' },
        { ...LOOK.paperSpacing, label: 'Pattern spacing', hint: 'In pixels' },
        {
          ...LOOK.ink,
          label: 'Grid dot color',
          hint: 'Dots at the grid crossings, Grid pattern only',
        },
        LOOK.paperMargin,
        { ...LOOK.accent, label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the writing and erase timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
