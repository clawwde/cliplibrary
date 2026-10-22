import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { WordPickerProps } from './word-picker';

export const wordPickerControls = defineControls<WordPickerProps>({
  sections: [
    {
      title: 'Words',
      fields: [
        { path: 'items', label: 'Words' },
        { path: 'type.font', label: 'Font' },
        { path: 'type.activeSize', label: 'Selected word size' },
        { path: 'type.size', label: 'Other words size' },
        { path: 'type.activeWeight', label: 'Selected word weight' },
      ],
      more: [
        { path: 'type.weight', label: 'Other words weight' },
        { path: 'type.tracking', label: 'Letter spacing', hint: 'In em' },
        { path: 'type.pitch', label: 'Line spacing', hint: 'Pixels between words' },
        {
          path: 'type.reach',
          label: 'Visible words each side',
          hint: 'How many words show above and below the selected one',
        },
        {
          path: 'type.fade',
          label: 'Fade-out range',
          hint: 'Higher starts fading words closer to the selected one',
        },
      ],
    },
    {
      title: 'Scrolling',
      fields: [
        {
          path: 'stops',
          label: 'Number of moves',
          hint: 'The list stops after this many steps, or at the last word',
        },
        { path: 'timing.interval', label: 'Time per word', hint: 'Frames between moves' },
        {
          path: 'loop',
          label: 'Scroll forever',
          hint: 'Ignores the number of moves and wraps around the list',
        },
      ],
      more: [
        {
          path: 'timing.moveFrames',
          label: 'Move length',
          hint: 'In frames, capped at the time per word',
        },
        { path: 'timing.delay', label: 'First move after', hint: 'In frames' },
        {
          path: 'timing.start',
          label: 'Starting word',
          hint: 'Position of the word selected when the video starts, counting from 0',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          link: ['look.accent', 'frame.fill'],
          label: 'Highlight color',
          hint: 'The selected word and the frame fill',
        },
        {
          ...LOOK.ink,
          label: 'Next word color',
          hint: 'Words one step above or below the selected one',
        },
        {
          ...LOOK.muted,
          label: 'Far word color',
          hint: 'Words two or more steps away. Words in between blend from the next word color',
        },
        { path: 'frame.line', label: 'Frame line color', hint: 'Corner lines and dots' },
      ],
      more: [
        {
          ...LOOK.accent,
          label: 'Selected word color',
          hint: 'Also colors the paper margin line',
        },
        { path: 'frame.fill', label: 'Frame fill color' },
      ],
    },
    {
      title: 'Frame',
      fields: [
        { path: 'frame.show', label: 'Show selection frame' },
        { path: 'frame.width', label: 'Frame width' },
        { path: 'frame.height', label: 'Frame height' },
      ],
      more: [
        { path: 'frame.fillOpacity', label: 'Fill strength', hint: 'Opacity of the frame fill' },
        { path: 'frame.lineWidth', label: 'Line thickness' },
        {
          path: 'frame.overhang',
          label: 'Line overhang',
          hint: 'How far the corner lines reach past the frame, in pixels',
        },
        { path: 'frame.dot', label: 'Corner dot size' },
        {
          path: 'frame.drawStart',
          label: 'Frame draws in at',
          hint: 'Video frame number where the dots and lines start drawing',
        },
        { path: 'frame.drawFrames', label: 'Frame draw length', hint: 'In frames' },
      ],
    },
    {
      title: 'Layout',
      fields: [
        {
          path: 'offsetX',
          label: 'Horizontal offset',
          hint: 'Moves the list and frame from the center, in pixels',
        },
        {
          path: 'offsetY',
          label: 'Vertical offset',
          hint: 'Moves the list and frame from the center, in pixels',
        },
      ],
    },
    {
      title: 'Background',
      fields: [
        { ...LOOK.showBackdrop, hint: 'Off leaves a transparent background and hides the glows' },
        LOOK.background,
        LOOK.grain,
      ],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        {
          path: 'aura.blobs',
          label: 'Color glows',
          hint: 'Soft colored light behind the list',
          items: {
            color: 'Color',
            x: 'Horizontal position',
            y: 'Vertical position',
            size: 'Size',
            strength: 'Strength',
          },
        },
        { path: 'aura.drift', label: 'Glow drift', hint: 'How much the glows wander' },
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
      ],
    },
    {
      title: 'Motion',
      fields: [
        { path: 'entrance.rise', label: 'Words rise in from', hint: 'Pixels below their spot' },
        {
          path: 'entrance.stagger',
          label: 'Word entrance stagger',
          hint: 'Frames between each word appearing, outward from the selected one',
        },
        MOTION.speed,
      ],
      more: [
        { path: 'entrance.delay', label: 'Words appear at', hint: 'Frame number' },
        { path: 'entrance.frames', label: 'Word entrance length', hint: 'In frames' },
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exit,
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: ['motion.float'],
});
