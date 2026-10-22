import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { EchoStackProps } from './echo-stack';

export const echoStackControls = defineControls<EchoStackProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'text', label: 'Phrase', hint: 'Repeated on every row' },
        { path: 'size', label: 'Text size', hint: 'In pixels' },
        { path: 'weight', label: 'Font weight' },
        LOOK.ink,
      ],
      more: [{ path: 'tracking', label: 'Letter spacing', hint: 'In em' }],
    },
    {
      title: 'Stack',
      fields: [
        { path: 'rows', label: 'Number of rows' },
        {
          path: 'lineHeight',
          label: 'Row spacing',
          hint: 'Height of each row as a multiple of the text size',
        },
        {
          path: 'accentRow',
          label: 'Highlighted row',
          hint: 'Counted from the top, 0 highlights none',
        },
        { ...LOOK.accent, label: 'Highlight color', hint: 'Also colors the paper margin line' },
      ],
    },
    {
      title: 'Row animation',
      fields: [
        {
          path: 'rowStagger',
          label: 'Row stagger',
          hint: 'Frames between one row and the next, on the way in and out',
        },
        {
          path: 'rowFrames',
          label: 'Row move length',
          hint: 'In frames, how long each row takes to rise in or drop out. Lower is snappier',
        },
        {
          path: 'exitAt',
          label: 'Roll away starts at',
          hint: 'Frame number when the top row starts dropping away',
        },
      ],
      more: [
        {
          path: 'delay',
          label: 'Start delay',
          hint: 'In frames, before the top row starts rising',
        },
        {
          path: 'travel',
          label: 'Row travel',
          hint: 'How far each row rises in and drops away. 1 is the default distance, 0 fades in place',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [PLACEMENT.horizontal, PLACEMENT.vertical],
      more: [PLACEMENT.insetX, PLACEMENT.insetY],
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
        { ...LOOK.paperMargin, hint: 'A faded line in the highlight color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales all row timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float', 'placement.width'],
});
