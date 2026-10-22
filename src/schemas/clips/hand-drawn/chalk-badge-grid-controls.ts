import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { ChalkBadgeGridProps } from './chalk-badge-grid';

export const chalkBadgeGridControls = defineControls<ChalkBadgeGridProps>({
  sections: [
    {
      title: 'Badges',
      fields: [
        {
          path: 'badges',
          label: 'Badges',
          hint: 'Filled into the grid left to right, top to bottom',
          items: {
            variant: 'Badge design',
            word: 'Word',
            line: 'Chalk line color',
            fill: 'Fill color',
            text: 'Word color',
          },
        },
      ],
    },
    {
      title: 'Grid',
      fields: [
        { path: 'columns', label: 'Columns', hint: 'Rows are added as needed to fit every badge' },
        {
          path: 'scale',
          label: 'Badge size',
          hint: '1 is full size. Large sizes with many columns make badges overlap',
        },
      ],
      more: [
        {
          path: 'insetX',
          label: 'Side margin',
          hint: 'Pixels kept clear at the left and right of the grid',
        },
        {
          path: 'insetY',
          label: 'Top and bottom margin',
          hint: 'Pixels kept clear above and below the grid',
        },
      ],
    },
    {
      title: 'Drawing',
      fields: [
        {
          path: 'order',
          label: 'Draw order',
          hint: 'Scattered at random, in grid order, or from the last badge back',
        },
        {
          path: 'stagger',
          label: 'Gap between badges',
          hint: 'Frames between one badge starting to draw and the next',
        },
        {
          path: 'timing.drawFrames',
          label: 'Draw length',
          hint: 'Frames each badge takes to sketch on',
        },
      ],
      more: [
        {
          path: 'delay',
          label: 'Start delay',
          hint: 'Frames before the first badge starts to draw',
        },
        {
          path: 'shuffle',
          label: 'Scatter pattern',
          hint: 'Scattered draw order only. Pick another number for a different random order',
        },
      ],
    },
    {
      title: 'Wipe',
      fields: [
        {
          path: 'timing.eraseAt',
          label: 'Wipe starts at',
          hint: 'Frames after the start delay when the first badge begins to wipe',
        },
        {
          path: 'timing.eraseFrames',
          label: 'Wipe length',
          hint: 'Frames each badge takes to wipe away',
        },
        {
          path: 'eraseStagger',
          label: 'Gap between wipes',
          hint: 'Frames between one badge wiping and the next, in the same order they drew',
        },
      ],
    },
    {
      title: 'Chalk',
      fields: [
        { path: 'chalk.width', label: 'Stroke width' },
        {
          path: 'chalk.roughness',
          label: 'Rough edges',
          hint: 'Higher makes the chalk edges more ragged',
        },
        {
          path: 'chalk.dryness',
          label: 'Dry chalk texture',
          hint: 'Higher leaves more speckled gaps in the strokes',
        },
      ],
      more: [
        {
          path: 'chalk.shadow',
          label: 'Drop shadow',
          hint: 'Strength of the shadow under each badge',
        },
      ],
    },
    {
      title: 'Board',
      fields: [
        { ...LOOK.showBackdrop, label: 'Show chalkboard' },
        { ...LOOK.background, label: 'Board color' },
        {
          ...LOOK.paper,
          label: 'Board pattern',
          hint: 'Grid also adds chalk dots where the lines cross',
        },
        { ...LOOK.grain, label: 'Board grain' },
      ],
      more: [
        { ...LOOK.backgroundEdge, label: 'Board edge color' },
        LOOK.spotlight,
        LOOK.liveGrain,
        { ...LOOK.paperLine, label: 'Pattern line color' },
        { ...LOOK.paperSpacing, label: 'Pattern spacing' },
        {
          ...LOOK.ink,
          label: 'Grid dot color',
          hint: 'Chalk dots where the grid lines cross, shown with the grid pattern',
        },
        { ...LOOK.paperMargin, label: 'Margin line' },
        { ...LOOK.accent, label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.exitFrames,
          hint: 'In frames. The exit only plays when this is above 0, and it is 0 by default',
        },
        {
          ...MOTION.speed,
          hint: 'Scales the drawing and wipe timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
