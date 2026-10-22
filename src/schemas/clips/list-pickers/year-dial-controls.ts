import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { YearDialProps } from './year-dial';

export const yearDialControls = defineControls<YearDialProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'label', label: 'Label', hint: 'Word beside the pointer. Leave empty to hide it' },
        {
          path: 'firstYear',
          label: 'First year',
          hint: 'Year in the highlight before the first turn; each turn counts on from here',
        },
        {
          path: 'yearStep',
          label: 'Count by',
          hint: 'Years per turn, e.g. 10 to count by decades',
        },
        {
          path: 'countDown',
          label: 'Count down',
          hint: 'Years go down with each turn instead of up',
        },
        { path: 'yearType.font', label: 'Font' },
        { path: 'yearType.size', label: 'Year size', hint: 'In pixels' },
      ],
      more: [
        { link: ['yearType.weight', 'yearType.labelWeight'], label: 'Font weight' },
        { path: 'yearType.weight', label: 'Year weight' },
        { path: 'yearType.labelSize', label: 'Label size', hint: 'In pixels' },
        { path: 'yearType.labelWeight', label: 'Label weight' },
      ],
    },
    {
      title: 'Turning',
      fields: [
        {
          path: 'steps.interval',
          label: 'Time per turn',
          hint: 'Frames from one turn to the next; each turn moves on one year',
        },
        {
          path: 'steps.moveFrames',
          label: 'Turn length',
          hint: 'Frames each turn takes, capped at the time per turn',
        },
        { path: 'steps.delay', label: 'First turn at', hint: 'Frame number' },
      ],
      more: [
        {
          path: 'turnEasing',
          label: 'Turn feel',
          hint: 'Smooth eases in and out. Settle starts fast and glides to a stop. Linear turns at a constant speed',
        },
        {
          path: 'entryTurn',
          label: 'Entrance spin',
          hint: 'Years the dial winds through as it eases in; 0 starts still',
        },
        {
          path: 'entryFrames',
          label: 'Entrance length',
          hint: 'In frames; the dial fades in over this and its spin settles over about 1.6 times this',
        },
        {
          path: 'steps.start',
          label: 'Turns already made',
          hint: 'Turns counted before frame 0, so the dial opens this many years past the first year',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          link: ['highlight.color', 'pointer.color'],
          label: 'Accent color',
          hint: 'Highlight bar and pointer',
        },
        { path: 'highlight.text', label: 'Highlighted year color' },
        {
          link: ['look.ink', 'labelColor', 'ticks.color'],
          label: 'Ink color',
          hint: 'Years, label and major ticks',
        },
        { path: 'ticks.minorColor', label: 'Minor tick color' },
      ],
      more: [
        { path: 'highlight.color', label: 'Highlight color' },
        { path: 'pointer.color', label: 'Pointer color' },
        { ...LOOK.ink, label: 'Year color', hint: 'Years outside the highlight' },
        { path: 'labelColor', label: 'Label color' },
        { path: 'ticks.color', label: 'Major tick color' },
      ],
    },
    {
      title: 'Dial',
      fields: [
        { path: 'highlight.width', label: 'Highlight width', hint: 'In pixels' },
        { path: 'highlight.height', label: 'Highlight height', hint: 'In pixels' },
        {
          path: 'highlight.radius',
          label: 'Highlight corner radius',
          hint: 'In pixels; half the height gives a pill',
        },
        { path: 'dial.slot', label: 'Year spacing', hint: 'Degrees between years around the dial' },
      ],
      more: [
        {
          path: 'dial.range',
          label: 'Visible years each side',
          hint: 'Years this far from the highlight have fully faded out',
        },
        {
          path: 'dial.fadeStart',
          label: 'Fade starts at',
          hint: 'Years away from the highlight where the years begin to fade out',
        },
        {
          path: 'dial.textFollow',
          label: 'Years follow the curve',
          hint: '0 keeps every year level, 1 tilts each year along the dial',
        },
        {
          path: 'dial.radius',
          label: 'Year ring radius',
          hint: 'Distance from the dial center to the years and highlight',
        },
      ],
    },
    {
      title: 'Ticks and pointer',
      fields: [
        { path: 'pointer.size', label: 'Pointer size' },
        { path: 'ticks.spacing', label: 'Tick spacing', hint: 'Degrees between ticks' },
      ],
      more: [
        {
          path: 'pointer.gap',
          label: 'Pointer gap',
          hint: 'Space between the ticks and the pointer, which also pushes the label out',
        },
        { path: 'ticks.length', label: 'Tick length', hint: 'Minor ticks are 60% of this' },
        { path: 'ticks.stroke', label: 'Tick thickness' },
        {
          path: 'ticks.majorEvery',
          label: 'Major tick every',
          hint: 'Every nth tick is longer, thicker and drawn in the major tick color',
        },
        {
          path: 'ticks.radius',
          label: 'Tick ring radius',
          hint: 'Distance from the dial center to the tick marks',
        },
      ],
    },
    {
      title: 'Camera',
      fields: [
        { path: 'camera.tilt', label: 'Tilt', hint: 'Degrees the dial leans back' },
        { path: 'camera.spin', label: 'Rotation', hint: 'Degrees the dial turns in its own plane' },
        { path: 'camera.scale', label: 'Zoom' },
      ],
      more: [
        {
          path: 'camera.drift',
          label: 'Drift',
          hint: 'Slow spin and slide over time; 0 holds the camera still',
        },
        {
          path: 'camera.x',
          label: 'Horizontal offset',
          hint: 'Dial center offset from the frame center, in pixels',
        },
        {
          path: 'camera.y',
          label: 'Vertical offset',
          hint: 'Dial center offset from the frame center, in pixels',
        },
        {
          path: 'camera.perspective',
          label: 'Perspective depth',
          hint: 'Lower values exaggerate the depth',
        },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.backgroundEdge],
      more: [
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
        {
          path: 'aura.blobs',
          label: 'Color glows',
          hint: 'Soft colored light behind the dial',
          items: {
            color: 'Color',
            x: 'Horizontal position',
            y: 'Vertical position',
            size: 'Size',
            strength: 'Strength',
          },
        },
        { path: 'aura.drift', label: 'Glow drift', hint: 'How much the color glows wander' },
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [MOTION.enter, MOTION.exit, MOTION.speed],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
