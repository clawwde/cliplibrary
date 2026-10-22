import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { SkillWheelProps } from './skill-wheel';

export const skillWheelControls = defineControls<SkillWheelProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'title', label: 'Title' },
        { path: 'subtitle', label: 'Subtitle' },
        {
          path: 'words',
          label: 'Wheel words',
          hint: 'The list repeats around the wheel, one word per notch',
        },
        {
          link: ['heading.font', 'wheel.font'],
          label: 'Font',
          hint: 'Sets the title and the wheel words together',
        },
      ],
      more: [
        { path: 'heading.font', label: 'Title font' },
        { path: 'wheel.font', label: 'Wheel word font' },
        { path: 'heading.size', label: 'Title size' },
        { path: 'heading.weight', label: 'Title weight' },
        { path: 'heading.subtitleSize', label: 'Subtitle size' },
        { path: 'heading.subtitleWeight', label: 'Subtitle weight' },
        { path: 'heading.gap', label: 'Title to subtitle gap', hint: 'In pixels' },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          link: ['wheel.activeColor', 'pointer.color'],
          label: 'Highlight color',
          hint: 'The pointer and the word beside it',
        },
        { path: 'wheel.color', label: 'Word color' },
        {
          link: ['look.ink', 'look.muted', 'ticks.color'],
          label: 'Ink color',
          hint: 'The title, the subtitle and the tick ring',
        },
      ],
      more: [
        { path: 'wheel.activeColor', label: 'Highlighted word color' },
        { path: 'pointer.color', label: 'Pointer color' },
        { ...LOOK.ink, label: 'Title color' },
        { ...LOOK.muted, label: 'Subtitle color' },
        { path: 'ticks.color', label: 'Tick color' },
      ],
    },
    {
      title: 'Turning',
      fields: [
        { path: 'steps.interval', label: 'Time on each word', hint: 'In frames' },
        {
          path: 'steps.moveFrames',
          label: 'Turn length',
          hint: 'Frames each one-notch turn takes, capped at the time on each word',
        },
        {
          path: 'wheel.direction',
          label: 'Turn direction',
          hint: 'Which way the words travel past the pointer',
        },
      ],
      more: [
        {
          path: 'steps.delay',
          label: 'Start delay',
          hint: 'Frames before the first notch turn',
        },
        {
          path: 'steps.start',
          label: 'First word',
          hint: 'Position in the word list that starts at the pointer, counting from 0',
        },
        {
          path: 'wheel.entryTurn',
          label: 'Entrance spin',
          hint: 'How many words the wheel spins past as it appears',
        },
        {
          path: 'entryFrames',
          label: 'Fade-in length',
          hint: 'Frames for the wheel, title and pointer to fade in. The title rise runs 8 frames longer and the entrance spin 1.6 times as long',
        },
      ],
    },
    {
      title: 'Wheel',
      fields: [
        { path: 'wheel.size', label: 'Word size' },
        {
          path: 'wheel.activeScale',
          label: 'Highlighted word scale',
          hint: 'How much bigger the word beside the pointer grows',
        },
        { path: 'wheel.spacing', label: 'Word spacing', hint: 'Degrees between words' },
        { path: 'wheel.radius', label: 'Wheel radius', hint: 'Pixels from the hub to the words' },
      ],
      more: [
        { path: 'wheel.weight', label: 'Word weight' },
        {
          path: 'wheel.fadeStart',
          label: 'Fade starts at',
          hint: 'Degrees from the pointer where words begin to fade',
        },
        {
          path: 'wheel.range',
          label: 'Visible arc',
          hint: 'Degrees from the pointer where words are fully gone',
        },
        { path: 'pointer.show', label: 'Show pointer' },
        { path: 'pointer.size', label: 'Pointer size' },
        {
          path: 'pointer.offset',
          label: 'Pointer position',
          hint: 'Pixels from the wheel hub to the pointer',
        },
      ],
    },
    {
      title: 'Ticks',
      fields: [
        { path: 'ticks.show', label: 'Show tick ring' },
        { path: 'ticks.length', label: 'Tick length' },
        {
          path: 'ticks.speed',
          label: 'Tick turn amount',
          hint: 'Share of each word turn the tick ring follows. 0 leaves only the drift',
        },
      ],
      more: [
        { path: 'ticks.spacing', label: 'Tick spacing', hint: 'Degrees between ticks' },
        {
          path: 'ticks.radius',
          label: 'Tick ring radius',
          hint: 'Pixels from the wheel hub to the ticks',
        },
        {
          path: 'ticks.tilt',
          label: 'Tick slant',
          hint: 'Degrees each tick is turned away from pointing at the hub',
        },
        { path: 'ticks.stroke', label: 'Tick thickness' },
        { path: 'ticks.dot', label: 'Tick dot size', hint: '0 hides the dot inside each tick' },
        {
          path: 'ticks.idle',
          label: 'Tick drift',
          hint: 'Degrees per frame the ring creeps on its own. Negative reverses it',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        {
          path: 'center.x',
          label: 'Wheel hub across',
          hint: 'Pixels from the left edge; the title and pointer move with it',
        },
        {
          path: 'center.y',
          label: 'Wheel hub down',
          hint: 'Pixels from the top edge; the title and pointer move with it',
        },
        {
          path: 'heading.right',
          label: 'Title position',
          hint: 'Pixels from the wheel hub to the right edge of the title',
        },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.grain],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        {
          path: 'aura.blobs',
          label: 'Color glows',
          items: {
            color: 'Color',
            x: 'Across (%)',
            y: 'Down (%)',
            size: 'Size (%)',
            strength: 'Strength',
          },
        },
        { path: 'aura.drift', label: 'Glow drift' },
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { ...LOOK.accent, label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [MOTION.enter, MOTION.exit, MOTION.speed],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['motion.float'],
});
