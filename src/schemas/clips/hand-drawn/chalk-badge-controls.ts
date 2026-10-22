import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { ChalkBadgeProps } from './chalk-badge';

export const chalkBadgeControls = defineControls<ChalkBadgeProps>({
  sections: [
    {
      title: 'Badge',
      fields: [
        { path: 'badge.word', label: 'Word' },
        {
          path: 'badge.variant',
          label: 'Badge design',
          hint: 'The hand-drawn frame, ribbon or doodle drawn around the word. Colors stay as set below',
        },
        { path: 'scale', label: 'Size' },
        { path: 'x', label: 'Horizontal position', hint: 'Badge center, in percent of the width' },
        { path: 'y', label: 'Vertical position', hint: 'Badge center, in percent of the height' },
      ],
      more: [
        {
          path: 'tilt',
          label: 'Tilt',
          hint: 'In degrees around the badge center. Negative leans left',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          link: ['badge.line', 'badge.text', 'captionColor'],
          label: 'Chalk color',
          hint: 'Sets the line, word and caption colors together',
        },
        {
          path: 'badge.fill',
          label: 'Fill color',
          hint: 'Solid shapes such as sparkles, tape, ribbons and bursts. Their shading is a darker mix of it',
        },
      ],
      more: [
        { path: 'badge.line', label: 'Line color', hint: 'The hand-drawn chalk strokes' },
        { path: 'badge.text', label: 'Word color' },
      ],
    },
    {
      title: 'Drawing',
      fields: [
        {
          path: 'timing.drawFrames',
          label: 'Draw length',
          hint: 'In frames, lower sketches faster',
        },
        {
          path: 'timing.eraseAt',
          label: 'Erase starts after',
          hint: 'Frames after the badge starts drawing. Push it past the clip end to keep the badge on screen',
        },
      ],
      more: [
        { path: 'delay', label: 'Start delay', hint: 'Frames before the badge starts drawing' },
        { path: 'timing.eraseFrames', label: 'Erase length', hint: 'In frames' },
      ],
    },
    {
      title: 'Chalk',
      fields: [
        { path: 'chalk.width', label: 'Stroke width', hint: 'Thickness of the chalk lines' },
        {
          path: 'chalk.dryness',
          label: 'Dry chalk texture',
          hint: 'Higher leaves patchier, dustier strokes',
        },
      ],
      more: [
        { path: 'chalk.roughness', label: 'Edge wobble', hint: 'How much the edges warp' },
        {
          path: 'chalk.shadow',
          label: 'Drop shadow',
          hint: 'Strength of the soft shadow under the badge',
        },
      ],
    },
    {
      title: 'Caption',
      fields: [
        { path: 'caption', label: 'Caption', hint: 'Leave empty to hide it' },
        {
          path: 'captionSize',
          label: 'Caption size',
          hint: 'In pixels. Larger also sits lower from the top edge',
        },
      ],
      more: [
        { path: 'captionColor', label: 'Caption color' },
        {
          path: 'captionDelay',
          label: 'Caption start delay',
          hint: 'Frames before the caption starts typing',
        },
        {
          path: 'captionFrames',
          label: 'Frames per letter',
          hint: 'Lower types faster; it deletes at twice this speed before the end',
        },
      ],
    },
    {
      title: 'Background',
      fields: [
        { ...LOOK.showBackdrop, label: 'Show chalkboard' },
        { ...LOOK.background, label: 'Board color' },
        { ...LOOK.paper, label: 'Board pattern' },
      ],
      more: [
        { ...LOOK.backgroundEdge, label: 'Board edge color' },
        { ...LOOK.paperLine, label: 'Pattern line color' },
        { ...LOOK.paperSpacing, label: 'Pattern spacing', hint: 'In pixels' },
        {
          path: 'look.ink',
          label: 'Grid dot color',
          hint: 'Dots at the grid crossings, grid pattern only',
        },
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
        { ...LOOK.paperMargin, label: 'Show margin line' },
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the badge drawing, erase and caption timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
