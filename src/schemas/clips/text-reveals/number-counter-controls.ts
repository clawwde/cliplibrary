import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { NumberCounterProps } from './number-counter';

export const numberCounterControls = defineControls<NumberCounterProps>({
  sections: [
    {
      title: 'Number',
      fields: [
        {
          path: 'from',
          label: 'Count from',
          hint: 'Set it above Count to and the number counts down',
        },
        { path: 'to', label: 'Count to' },
        { path: 'prefix', label: 'Prefix', hint: 'Text before the number, such as $' },
        { path: 'suffix', label: 'Suffix', hint: 'Text after the number, such as % or +' },
      ],
      more: [
        {
          path: 'separator',
          label: 'Thousands separator',
          hint: 'Placed before the last three digits, such as a comma for 1,250. Leave empty for none',
        },
        {
          path: 'affixScale',
          label: 'Prefix and suffix size',
          hint: 'Relative to the number, 1 matches it',
        },
      ],
    },
    {
      title: 'Count',
      fields: [
        {
          path: 'roll',
          label: 'Digit roll',
          hint: 'At 0 the number counts in place out of a blur. Above 0 the number fades in as the count starts and each digit rolls like an odometer, with more travel between digits at higher values',
        },
        { path: 'countFrames', label: 'Count length', hint: 'In frames, lower counts faster' },
        { path: 'delay', label: 'Count starts at', hint: 'Frame number' },
      ],
    },
    {
      title: 'Style',
      fields: [
        {
          link: ['look.ink', 'affixColor', 'glowColor'],
          label: 'Number color',
          hint: 'Sets the digits, prefix and suffix, and glow together',
        },
        { path: 'size', label: 'Number size', hint: 'In pixels' },
        { path: 'weight', label: 'Font weight' },
        { path: 'glow', label: 'Glow', hint: 'Steady glow around the number' },
        {
          path: 'bloom',
          label: 'Glow flash',
          hint: 'Extra glow that is brightest as the count starts and fades out as the number lands',
        },
      ],
      more: [
        { ...LOOK.ink, label: 'Digit color' },
        { path: 'affixColor', label: 'Prefix and suffix color' },
        { path: 'glowColor', label: 'Glow color' },
      ],
    },
    {
      title: 'Layout',
      fields: [PLACEMENT.horizontal, PLACEMENT.vertical],
      more: [
        {
          ...PLACEMENT.width,
          label: 'Number box width',
          hint: 'The number never wraps. Sets where left or right aligned numbers sit',
        },
        PLACEMENT.insetX,
        PLACEMENT.insetY,
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.grain],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
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
          hint: 'Scales the count and glow timing, including the start frame. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
