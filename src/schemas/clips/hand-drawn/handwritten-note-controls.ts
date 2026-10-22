import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { HandwrittenNoteProps } from './handwritten-note';

export const handwrittenNoteControls = defineControls<HandwrittenNoteProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'text', label: 'Note', hint: 'Each new line is written on its own row' },
        {
          path: 'highlight',
          label: 'Highlighted words',
          hint: 'Words from the note to color and mark, separated by spaces',
        },
        { path: 'font', label: 'Handwriting font' },
        { path: 'size', label: 'Text size', hint: 'In pixels' },
        { ...LOOK.ink, label: 'Ink color' },
        {
          ...LOOK.accent,
          label: 'Highlight color',
          hint: 'Highlighted words, their underline and ticks, and the ghost behind each new letter',
        },
      ],
      more: [
        { path: 'lineHeight', label: 'Line spacing', hint: 'Multiple of the text size' },
        { path: 'tilt', label: 'Tilt', hint: 'In degrees' },
      ],
    },
    {
      title: 'Writing',
      fields: [
        {
          path: 'charStagger',
          label: 'Frames between letters',
          hint: 'Lower writes the note faster',
        },
        {
          path: 'charFrames',
          label: 'Letter ink-in length',
          hint: 'Frames each letter takes to settle in',
        },
        { path: 'delay', label: 'Start delay', hint: 'In frames' },
        { path: 'erase', label: 'Break apart at the end' },
      ],
      more: [
        { path: 'wordPause', label: 'Pause between words', hint: 'In frames' },
        {
          path: 'eraseFrames',
          label: 'Break apart length',
          hint: 'In frames, finishing just before the clip ends',
        },
        {
          path: 'jitter',
          label: 'Letter wobble',
          hint: 'Random tilt and lift on each letter',
        },
        {
          path: 'seed',
          label: 'Variation',
          hint: 'Reshuffles the letter wobble, ink texture and break-apart order',
        },
      ],
    },
    {
      title: 'Marker',
      fields: [
        { path: 'underline', label: 'Underline highlighted words' },
        {
          path: 'burst',
          label: 'Burst ticks',
          hint: 'Draws ticks on both sides of highlighted words and spaces them out',
        },
        {
          path: 'ink.roughness',
          label: 'Marker roughness',
          hint: 'Rougher letter edges and wobblier marks',
        },
      ],
      more: [
        { path: 'ink.width', label: 'Mark thickness', hint: 'Underline and tick stroke width' },
        {
          path: 'ink.lead',
          label: 'Letter ghost',
          hint: 'Strength of the highlight-colored ghost behind each letter as it writes',
        },
        { path: 'ink.leadOffset', label: 'Letter ghost offset', hint: 'In pixels' },
        {
          path: 'ink.boil',
          label: 'Mark shimmer',
          hint: 'How much the underline and ticks redraw while on screen',
        },
        {
          path: 'ink.boilFrames',
          label: 'Shimmer pace',
          hint: 'Frames per shimmer step, higher is calmer',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { ...PLACEMENT.horizontal, hint: 'Also sets the text alignment' },
        PLACEMENT.vertical,
        { ...PLACEMENT.width, label: 'Note width' },
      ],
      more: [PLACEMENT.insetX, PLACEMENT.insetY],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        {
          link: ['look.background', 'look.backgroundEdge'],
          label: 'Paper color',
          hint: 'Sets the center and corner colors together',
        },
        LOOK.paper,
      ],
      more: [
        { ...LOOK.background, label: 'Paper center color' },
        { ...LOOK.backgroundEdge, label: 'Paper corner color' },
        LOOK.paperLine,
        LOOK.paperSpacing,
        { ...LOOK.paperMargin, hint: 'Drawn in the highlight color' },
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        {
          ...MOTION.speed,
          hint: 'Scales the writing, marks, break-apart and drift. Entrance and exit keep their length',
        },
        { ...MOTION.float, hint: 'Gentle drift and sway while on screen' },
      ],
      more: [
        MOTION.enterFrames,
        {
          ...MOTION.exit,
          hint: 'Only plays when Exit length is above 0, which it is not by default because the note breaks apart instead',
        },
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: ['look.muted', 'ink.flecks'],
});
