import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { OutlineMarqueeProps } from './outline-marquee';

export const outlineMarqueeControls = defineControls<OutlineMarqueeProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'text', label: 'Scrolling words', hint: 'Repeated along every outlined row' },
        { path: 'label', label: 'Label', hint: 'The solid line in front of the rows' },
        { path: 'labelSize', label: 'Label size', hint: 'In pixels' },
        {
          link: ['weight', 'labelWeight'],
          label: 'Font weight',
          hint: 'Sets the outlined rows and the label together',
        },
      ],
      more: [
        { path: 'labelWeight', label: 'Label weight' },
        { path: 'labelTracking', label: 'Label letter spacing', hint: 'In em' },
      ],
    },
    {
      title: 'Marquee',
      fields: [
        { path: 'rows', label: 'Rows' },
        { path: 'size', label: 'Outline text size', hint: 'In pixels' },
        {
          path: 'speed',
          label: 'Scroll speed',
          hint: 'Pixels per frame. Neighboring rows glide in opposite directions. 0 holds them still',
        },
        { path: 'stroke', label: 'Outline thickness', hint: 'In pixels' },
      ],
      more: [
        { path: 'weight', label: 'Outline font weight' },
        { path: 'tracking', label: 'Outline letter spacing', hint: 'In em' },
        { path: 'rowSpacing', label: 'Row height', hint: 'Multiple of the outline text size' },
        {
          path: 'repeats',
          label: 'Copies per row',
          hint: 'Raise it if short words or fast scrolling leave gaps at the edges',
        },
        { path: 'repeatGap', label: 'Gap between copies', hint: 'In em' },
        {
          path: 'reverse',
          label: 'Reverse directions',
          hint: 'Off: the top row scrolls left. On: it scrolls right',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          link: ['outlineColor', 'look.ink'],
          label: 'Text color',
          hint: 'Colors the outlines and the label together',
        },
        { path: 'outlineOpacity', label: 'Outline opacity' },
      ],
      more: [
        { path: 'outlineColor', label: 'Outline color' },
        { path: 'look.ink', label: 'Label color' },
      ],
    },
    {
      title: 'Timing',
      fields: [
        { path: 'delay', label: 'Start delay', hint: 'In frames, before the first row fades in' },
        { path: 'rowStagger', label: 'Row stagger', hint: 'Frames between each row fading in' },
        {
          path: 'labelDelay',
          label: 'Label delay',
          hint: 'Frames after the start delay before the label rises in',
        },
      ],
      more: [
        {
          path: 'motion.speed',
          label: 'Reveal speed',
          hint: 'Speeds up the row fade-ins and label rise, delays included. Scroll speed is set separately',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { ...PLACEMENT.horizontal, label: 'Label horizontal align' },
        { ...PLACEMENT.vertical, label: 'Label vertical align' },
      ],
      more: [
        {
          ...PLACEMENT.width,
          label: 'Label box width',
          hint: 'The label never wraps. Sets where left or right aligned labels sit',
        },
        { ...PLACEMENT.insetX, label: 'Label side margin' },
        { ...PLACEMENT.insetY, label: 'Label top and bottom margin' },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        {
          ...LOOK.background,
          hint: 'Also tints the soft halo behind the label',
        },
        LOOK.grain,
      ],
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
      fields: [MOTION.enter, MOTION.exit],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
