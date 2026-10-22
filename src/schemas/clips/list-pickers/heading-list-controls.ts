import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { HeadingListProps } from './heading-list';

export const headingListControls = defineControls<HeadingListProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'heading', label: 'Heading' },
        { path: 'items', label: 'Menu items' },
        {
          link: ['headingColor', 'look.ink'],
          label: 'Text color',
          hint: 'The heading and the item next to the arrow',
        },
        {
          ...LOOK.muted,
          label: 'Faded item color',
          hint: 'Items one step or more from the arrow take this color. The active item blends into it as it moves off',
        },
      ],
      more: [
        { path: 'headingColor', label: 'Heading color' },
        { ...LOOK.ink, label: 'Active item color' },
      ],
    },
    {
      title: 'Scrolling',
      fields: [
        {
          path: 'stops',
          label: 'Number of moves',
          hint: 'The list stops after this many steps, or at the last item',
        },
        { path: 'timing.interval', label: 'Time per item', hint: 'Frames between moves' },
        {
          path: 'loop',
          label: 'Scroll forever',
          hint: 'Ignores the number of moves and wraps around the list',
        },
        {
          path: 'type.activeShift',
          label: 'Active item nudge',
          hint: 'How far the item at the arrow slides right, in pixels',
        },
      ],
      more: [
        {
          path: 'timing.moveFrames',
          label: 'Move length',
          hint: 'In frames. Capped at the time per item',
        },
        { path: 'timing.delay', label: 'First move after', hint: 'In frames' },
        {
          path: 'timing.start',
          label: 'Starting item',
          hint: 'Position of the item at the arrow when the video starts, counting from 0',
        },
      ],
    },
    {
      title: 'Arrow',
      fields: [
        { path: 'arrow.color', label: 'Arrow color' },
        { path: 'arrow.length', label: 'Arrow length', hint: 'In pixels' },
        { path: 'arrow.stroke', label: 'Line thickness', hint: 'In pixels' },
        {
          path: 'arrow.retreat',
          label: 'Pull-back on each move',
          hint: 'How far the arrow backs off, in pixels, while the list moves',
        },
      ],
      more: [
        { path: 'arrow.headWidth', label: 'Arrowhead length' },
        { path: 'arrow.headHeight', label: 'Arrowhead height' },
        {
          path: 'arrow.steps',
          label: 'Arrowhead pixel steps',
          hint: 'More steps give a smoother, less blocky head',
        },
        { path: 'arrow.drawStart', label: 'Arrow appears at', hint: 'Frame number' },
        { path: 'arrow.drawFrames', label: 'Arrow draw length', hint: 'In frames' },
      ],
    },
    {
      title: 'Type',
      fields: [
        { path: 'type.font', label: 'Font' },
        { path: 'type.headingSize', label: 'Heading size', hint: 'In pixels' },
        { path: 'type.activeSize', label: 'Active item size', hint: 'In pixels' },
        {
          path: 'type.size',
          label: 'Other items size',
          hint: 'In pixels, one step or more from the arrow',
        },
        {
          link: ['type.headingWeight', 'type.activeWeight', 'type.weight'],
          label: 'Font weight',
        },
      ],
      more: [
        { path: 'type.headingWeight', label: 'Heading weight' },
        { path: 'type.activeWeight', label: 'Active item weight' },
        { path: 'type.weight', label: 'Other items weight' },
        { path: 'type.pitch', label: 'Line spacing', hint: 'Pixels between items' },
        {
          path: 'type.reach',
          label: 'Visible items each side',
          hint: 'How many items show above and below the active one',
        },
        {
          path: 'type.fade',
          label: 'Fade-out range',
          hint: 'Higher starts fading items closer to the active one',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { path: 'layout.headingX', label: 'Heading position', hint: 'Left edge, in pixels' },
        {
          path: 'arrow.x',
          label: 'Arrow position',
          hint: 'Left end of the arrow, in pixels. Keep it between the heading and the list',
        },
        { path: 'layout.listX', label: 'List position', hint: 'Left edge, in pixels' },
        {
          path: 'layout.centerY',
          label: 'Vertical center',
          hint: 'Height of the heading, arrow and active item, in pixels from the top',
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
        { ...LOOK.accent, label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        {
          path: 'entrance.rise',
          label: 'Text rise distance',
          hint: 'Pixels the items rise into place. The heading rises a quarter as far',
        },
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the scrolling, the arrow and the text entrance. Entrance and exit keep their length',
        },
      ],
      more: [
        {
          path: 'entrance.stagger',
          label: 'Item entrance stagger',
          hint: 'Frames between each item appearing, from the starting item downward',
        },
        {
          path: 'entrance.delay',
          label: 'Text appears at',
          hint: 'Frame the heading begins to rise. The items follow one stagger apart',
        },
        {
          path: 'entrance.frames',
          label: 'Text entrance length',
          hint: 'In frames, for the heading and each item',
        },
        MOTION.enterFrames,
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: ['motion.float'],
});
