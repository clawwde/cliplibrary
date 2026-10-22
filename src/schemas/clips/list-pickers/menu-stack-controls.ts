import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { MenuStackProps } from './menu-stack';

export const menuStackControls = defineControls<MenuStackProps>({
  sections: [
    {
      title: 'Menu',
      fields: [
        { path: 'label', label: 'Heading' },
        { path: 'items', label: 'Menu items' },
        {
          path: 'stops',
          label: 'Rows to roll',
          hint: 'How many rows the stack rolls before it stops, never past the last item. Ignored while Keep rolling is on',
        },
        {
          path: 'loop',
          label: 'Keep rolling',
          hint: 'Rolls through the list forever, wrapping back to the first item',
        },
      ],
      more: [
        {
          path: 'timing.start',
          label: 'Starting item',
          hint: 'Position in the list of the card in front at the start, counting from 0',
        },
      ],
    },
    {
      title: 'Rolling',
      fields: [
        { path: 'timing.delay', label: 'First roll at', hint: 'Frame number' },
        { path: 'timing.interval', label: 'Time per row', hint: 'Frames between each roll' },
        {
          path: 'timing.moveFrames',
          label: 'Roll length',
          hint: 'Frames each roll takes, capped at the time per row',
        },
        {
          path: 'card.pitch',
          label: 'Row spacing',
          hint: 'Vertical distance between cards in pixels',
        },
      ],
      more: [
        {
          path: 'card.shrink',
          label: 'Shrink per row',
          hint: 'How much smaller each card gets per row away from the front',
        },
        {
          path: 'card.reach',
          label: 'Visible rows',
          hint: 'Rows shown above and below the front card',
        },
        {
          path: 'card.fade',
          label: 'Edge fade',
          hint: 'How many rows at the top and bottom edges fade out',
        },
      ],
    },
    {
      title: 'Text',
      fields: [
        { path: 'type.font', label: 'Font' },
        { path: 'type.size', label: 'Item text size' },
        { path: 'type.labelSize', label: 'Heading size' },
        { ...LOOK.ink, hint: 'Heading and front card text' },
      ],
      more: [
        {
          ...LOOK.muted,
          label: 'Faded text color',
          hint: 'Rows away from the front fade toward this',
        },
        { path: 'type.weight', label: 'Item text weight' },
        { path: 'type.labelWeight', label: 'Heading weight' },
        {
          path: 'layout.labelX',
          label: 'Heading position',
          hint: 'Distance from the left edge in pixels',
        },
      ],
    },
    {
      title: 'Cards',
      fields: [
        { path: 'card.fill', label: 'Card color' },
        { path: 'card.width', label: 'Card width' },
        { path: 'card.height', label: 'Card height' },
        { path: 'card.radius', label: 'Corner roundness' },
      ],
      more: [
        {
          path: 'card.veil',
          label: 'Faded card color',
          hint: 'Cards blend toward this as they fade at the edges',
        },
        { path: 'card.shadow', label: 'Shadow strength' },
        { path: 'card.shadowBlur', label: 'Shadow softness' },
        { path: 'card.shadowY', label: 'Shadow drop', hint: 'Downward offset in pixels' },
        {
          path: 'card.padding',
          label: 'Left padding',
          hint: 'Space between the card edge and its icon or text',
        },
        {
          path: 'card.gap',
          label: 'Icon to text gap',
          hint: 'In pixels, only while icons are shown',
        },
        {
          path: 'layout.cardX',
          label: 'Stack position',
          hint: 'Horizontal center of the cards in pixels, also centers the background glow',
        },
        {
          path: 'layout.centerY',
          label: 'Vertical center',
          hint: 'Moves the heading, pointer and front card together',
        },
      ],
    },
    {
      title: 'Icons and pointer',
      fields: [
        {
          link: ['icon.color', 'pointer.color'],
          label: 'Accent color',
          hint: 'Card icons and the pointer',
        },
        { path: 'icon.show', label: 'Show icons' },
        { path: 'pointer.show', label: 'Show pointer' },
      ],
      more: [
        { path: 'icon.color', label: 'Icon color' },
        { path: 'icon.glyph', label: 'Arrow color' },
        { path: 'icon.size', label: 'Icon size' },
        {
          path: 'icon.radius',
          label: 'Icon corner roundness',
          hint: 'Half the icon size makes a circle',
        },
        { path: 'icon.glyphStroke', label: 'Arrow thickness' },
        { path: 'pointer.color', label: 'Pointer color' },
        { path: 'pointer.width', label: 'Pointer width' },
        { path: 'pointer.height', label: 'Pointer height' },
        {
          path: 'pointer.notch',
          label: 'Pointer notch',
          hint: 'How deep the back of the arrow cuts in',
        },
        {
          path: 'layout.pointerX',
          label: 'Pointer position',
          hint: 'Distance from the left edge in pixels',
        },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.spotlight],
      more: [
        LOOK.backgroundEdge,
        {
          path: 'aura.blobs',
          label: 'Soft glows',
          items: {
            color: 'Color',
            x: 'Horizontal position',
            y: 'Vertical position',
            size: 'Size',
            strength: 'Strength',
          },
        },
        { path: 'aura.drift', label: 'Glow drift', hint: 'How much the soft glows wander' },
        LOOK.grain,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        {
          path: 'entrance.stagger',
          label: 'Card cascade',
          hint: 'Frames between each card appearing, outward from the front card',
        },
        MOTION.enter,
        MOTION.exit,
      ],
      more: [
        {
          path: 'entrance.delay',
          label: 'Fade-in start',
          hint: 'Frame the heading and pointer start fading in, with the cards right after',
        },
        {
          path: 'entrance.frames',
          label: 'Fade-in length',
          hint: 'In frames, for the heading, the pointer and each card',
        },
        {
          path: 'entrance.rise',
          label: 'Card rise',
          hint: 'Pixels each card rises as it fades in',
        },
        {
          ...MOTION.speed,
          hint: 'Scales the rolling and the fade-in timing. Entrance, exit and glow drift keep their pace',
        },
        MOTION.enterFrames,
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: ['motion.float'],
});
