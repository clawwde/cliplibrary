import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { DoodleArrowsProps } from './doodle-arrows';

export const doodleArrowsControls = defineControls<DoodleArrowsProps>({
  sections: [
    {
      title: 'Arrows',
      fields: [
        {
          path: 'arrows',
          label: 'Arrows',
          hint: 'Position is percent of the frame and size is in pixels. Each arrow starts drawing after the start delay plus its own extra delay, in frames',
          items: {
            shape: 'Shape',
            x: 'Horizontal position',
            y: 'Vertical position',
            size: 'Size',
            rotation: 'Rotation',
            flipX: 'Flip horizontally',
            flipY: 'Flip vertically',
            delay: 'Extra start delay',
          },
        },
        { path: 'headSize', label: 'Arrowhead size', hint: 'Share of the arrow length' },
      ],
    },
    {
      title: 'Drawing',
      fields: [
        {
          path: 'drawFrames',
          label: 'Draw duration',
          hint: 'In frames per arrow; longer shapes take a little longer',
        },
        {
          path: 'delay',
          label: 'Start delay',
          hint: 'Frames before any arrow starts drawing. Each arrow can add its own extra delay',
        },
      ],
      more: [
        {
          path: 'seed',
          label: 'Sketch variation',
          hint: 'Change for a different hand-drawn wobble',
        },
      ],
    },
    {
      title: 'Ink',
      fields: [
        { ...LOOK.ink, label: 'Ink color' },
        {
          ...LOOK.accent,
          label: 'Lead stroke color',
          hint: 'The pen stroke that leads each line as it draws, some ink flecks and the paper margin line',
        },
        { path: 'ink.width', label: 'Stroke thickness', hint: 'In pixels' },
        { path: 'ink.roughness', label: 'Roughness', hint: 'Higher is shakier and drier' },
      ],
      more: [
        { path: 'ink.lead', label: 'Lead stroke strength', hint: '0 hides the lead stroke' },
        {
          path: 'ink.leadOffset',
          label: 'Lead stroke offset',
          hint: 'How far the lead stroke sits off the ink line, in pixels',
        },
        { path: 'ink.flecks', label: 'Ink flecks', hint: 'Splatter dots while drawing' },
        {
          path: 'ink.boil',
          label: 'Line wobble',
          hint: 'How much the lines wiggle while they hold',
        },
        {
          path: 'ink.boilFrames',
          label: 'Wobble pace',
          hint: 'Frames per wobble pose; higher is calmer',
        },
      ],
    },
    {
      title: 'Outro',
      fields: [
        {
          path: 'breakApart',
          label: 'Break apart at the end',
          hint: 'Off keeps the arrows on screen until the last frame',
        },
        { path: 'eraseFrames', label: 'Break-apart length', hint: 'In frames per arrow' },
      ],
      more: [
        {
          path: 'eraseStagger',
          label: 'Break-apart stagger',
          hint: 'Frames between arrows. The first arrow breaks first and the last one finishes with the clip',
        },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.paper],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
        LOOK.paperLine,
        LOOK.paperSpacing,
        { ...LOOK.paperMargin, hint: 'Drawn in the lead stroke color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the drawing, wobble and break-apart pace. The break-apart still ends with the clip; entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
