import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { RibbonWordsProps } from './ribbon-words';

const FRAME_NUMBER = 'Frame number';
const IN_FRAMES = 'In frames';

export const ribbonWordsControls = defineControls<RibbonWordsProps>({
  sections: [
    {
      title: 'Words',
      fields: [
        {
          path: 'text',
          label: 'Phrase',
          hint: 'Rides along the ribbon on one line. Keep it short so it fits inside the frame',
        },
        {
          path: 'words.size',
          label: 'Text size',
          hint: 'In pixels. Keep it under the ribbon width',
        },
        {
          path: 'highlight',
          label: 'Highlighted word',
          hint: 'Colored with the Highlight color. Leave empty to keep every letter one color',
        },
        { path: 'words.color', label: 'Text color' },
      ],
      more: [
        { path: 'words.weight', label: 'Font weight' },
        { path: 'words.tracking', label: 'Letter spacing', hint: 'In em' },
        {
          path: 'words.centering',
          label: 'Vertical centering',
          hint: 'Moves the letters across the ribbon, as a share of the text size. Raise it to push them toward the lower edge',
        },
        {
          ...LOOK.accent,
          label: 'Highlight color',
          hint: 'Only used by the highlighted word',
        },
      ],
    },
    {
      title: 'Ribbon',
      fields: [
        { path: 'ribbon.width', label: 'Ribbon width', hint: 'In pixels' },
        {
          path: 'ribbon.color',
          label: 'Ribbon color',
          hint: 'Also the background when Light version is on',
        },
        {
          path: 'ribbon.style',
          label: 'Ribbon style',
          hint: 'Outline draws two thin edges with a see-through middle; the phrase then takes the ribbon color',
        },
      ],
      more: [
        {
          path: 'ribbon.outline',
          label: 'Outline thickness',
          hint: 'In pixels. Outline style only',
        },
      ],
    },
    {
      title: 'Second ribbon',
      fields: [
        {
          path: 'second.enabled',
          label: 'Show second ribbon',
          hint: 'A parallel ribbon behind the first, with its own phrase',
        },
        { path: 'second.text', label: 'Second phrase' },
        {
          path: 'second.offsetY',
          label: 'Distance',
          hint: 'How far below the first ribbon it runs, in pixels. Negative puts it above',
        },
      ],
      more: [
        {
          path: 'second.shift',
          label: 'Wave offset',
          hint: 'Shifts its waves against the first ribbon, in degrees. 0 keeps the two parallel',
        },
        {
          path: 'second.delay',
          label: 'Draw-on delay',
          hint: 'Frames it starts after the first ribbon. Both retract together',
        },
      ],
    },
    {
      title: 'Path',
      fields: [
        {
          path: 'path.shape',
          label: 'Path shape',
          hint: 'Wave snakes up and down, Swoop is one smooth arc, Swell is a wave that grows toward the right',
        },
        {
          path: 'path.amplitude',
          label: 'Wave height',
          hint: 'In pixels above and below the center line. 0 makes a straight ribbon',
        },
        {
          path: 'path.waves',
          label: 'Wave count',
          hint: 'Full waves across the path, edge to edge. Higher counts bend tighter. Swoop ignores it',
        },
        {
          path: 'path.drop',
          label: 'Tilt',
          hint: 'How much lower the right end sits than the left, in pixels. Negative tilts it up',
        },
        {
          path: 'path.centerY',
          label: 'Vertical position',
          hint: 'Center of the path, in pixels from the top',
        },
      ],
      more: [
        {
          path: 'path.shift',
          label: 'Wave shift',
          hint: 'Slides the waves along the path, in degrees. For Swoop, past 90 bends the arc downward',
        },
        {
          path: 'path.breathe',
          label: 'Wave breathing',
          hint: 'How far the waves slowly sway, in pixels. 0 holds the path still',
        },
        { path: 'path.breatheFrames', label: 'Breathing cycle', hint: 'Frames per sway' },
      ],
    },
    {
      title: 'Timing',
      fields: [
        { path: 'timing.drawFrames', label: 'Draw-on length', hint: IN_FRAMES },
        {
          path: 'timing.settleAt',
          label: 'Resting spot',
          hint: 'Where the middle of the phrase settles, as a share of the path from the left',
        },
        {
          path: 'timing.drift',
          label: 'Drift speed',
          hint: 'Pixels per frame the words keep gliding while they rest. 1 is the slowest smooth speed',
        },
        {
          path: 'timing.retractAt',
          label: 'Retract at',
          hint: `${FRAME_NUMBER}; the ribbon pulls off from the left and takes the words with it`,
        },
        {
          ...MOTION.speed,
          hint: 'Scales every beat. The exit fade keeps its length. Below 1 the retract can be cut off',
        },
      ],
      more: [
        { path: 'timing.drawAt', label: 'Draw-on starts at', hint: FRAME_NUMBER },
        {
          path: 'timing.lag',
          label: 'Text lag',
          hint: 'Gap between the end of the phrase and the drawing tip while it rides, in pixels',
        },
        {
          path: 'timing.settleFrames',
          label: 'Settle length',
          hint: 'Frames the words take to slow from the ribbon tip to the drift speed',
        },
        { path: 'timing.retractFrames', label: 'Retract length', hint: IN_FRAMES },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        {
          path: 'inverted',
          label: 'Light version',
          hint: 'Swaps the colors: the background takes the ribbon color, the ribbon takes the background color and the phrase turns light',
        },
        {
          link: ['look.background', 'look.backgroundEdge', 'words.color'],
          label: 'Background color',
          hint: 'Also colors the phrase, so the letters read as cut out of the ribbon',
        },
        LOOK.grain,
      ],
      more: [
        LOOK.background,
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
      fields: [MOTION.enter, MOTION.exit],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float'],
});
