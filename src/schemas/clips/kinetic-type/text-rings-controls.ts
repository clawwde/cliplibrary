import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { TextRingsProps } from './text-rings';

const FRAMES_AFTER_START = 'In frames, on the scene clock';

export const textRingsControls = defineControls<TextRingsProps>({
  sections: [
    {
      title: 'Words',
      fields: [
        {
          path: 'words.text',
          label: 'Ring words',
          hint: 'Repeated around every ring. Leave empty to show only the center mark',
        },
        {
          path: 'words.separator',
          label: 'Separator',
          hint: 'Sits halfway between repeats. Leave empty for plain gaps',
        },
        {
          path: 'words.innerSize',
          label: 'Inner text size',
          hint: 'In pixels, where a new ring appears next to the mark',
        },
        {
          path: 'words.outerSize',
          label: 'Outer text size',
          hint: 'In pixels, as a ring reaches the corners of the frame',
        },
        {
          link: ['words.weight', 'words.oddWeight'],
          label: 'Font weight',
          hint: 'Sets every ring. Change Every other ring weight on its own to alternate',
        },
      ],
      more: [
        {
          path: 'words.weight',
          label: 'Ring weight',
          hint: 'The first ring and every other one after it',
        },
        {
          path: 'words.oddWeight',
          label: 'Every other ring weight',
          hint: 'The second, fourth and so on. Set it apart from Ring weight to alternate',
        },
        {
          path: 'words.tracking',
          label: 'Letter spacing',
          hint: 'In em. Stretched slightly so the repeats close evenly around each ring',
        },
        {
          path: 'words.gap',
          label: 'Gap around separator',
          hint: 'In em, on each side. Larger gaps fit fewer repeats per ring',
        },
      ],
    },
    {
      title: 'Rings',
      fields: [
        { path: 'rings.count', label: 'Number of rings' },
        {
          path: 'rings.interval',
          label: 'Time between rings',
          hint: 'In frames. Shorter spawns rings faster and makes them expand faster',
        },
        {
          path: 'rings.spacing',
          label: 'Ring spacing',
          hint: 'How many times wider each ring is than the next one inside it',
        },
        { path: 'rings.firstAt', label: 'First ring at', hint: FRAMES_AFTER_START },
      ],
      more: [
        {
          path: 'rings.spawnRadius',
          label: 'Start radius',
          hint: 'In pixels from the center, where each ring fades in',
        },
        { path: 'rings.fadeFrames', label: 'Ring fade-in', hint: 'In frames' },
        {
          path: 'rings.oddOpacity',
          label: 'Every other ring opacity',
          hint: 'Below 1 dims the second, fourth and so on for a layered look',
        },
      ],
    },
    {
      title: 'Spin',
      fields: [
        {
          path: 'spin.speed',
          label: 'Spin speed',
          hint: 'Pixels per frame along each ring, so small rings turn faster. Keep it at 1.5 or more for smooth text. 0 stops the spin',
        },
        {
          path: 'spin.alternate',
          label: 'Alternate directions',
          hint: 'Neighboring rings turn opposite ways',
        },
      ],
      more: [
        {
          path: 'spin.clockwise',
          label: 'First ring clockwise',
          hint: 'Off turns the first ring counterclockwise',
        },
        {
          path: 'spin.offset',
          label: 'Ring turn offset',
          hint: 'In degrees, how far each ring starts turned from the one before',
        },
      ],
    },
    {
      title: 'Center mark',
      fields: [
        {
          path: 'mark.style',
          label: 'Mark style',
          hint: 'Circle with a scribble, circle with a word, the circle alone, or no mark',
        },
        { path: 'mark.size', label: 'Circle size', hint: 'Diameter in pixels' },
        {
          link: ['mark.stroke', 'mark.scribbleStroke'],
          label: 'Line width',
          hint: 'Sets the circle and the scribble together, in pixels',
        },
        {
          path: 'mark.drawFrames',
          label: 'Draw length',
          hint: 'In frames for the circle. The scribble takes a little longer',
        },
      ],
      more: [
        { path: 'mark.word', label: 'Center word', hint: 'Word style only' },
        { path: 'mark.wordSize', label: 'Center word size', hint: 'In pixels. Word style only' },
        { path: 'mark.wordWeight', label: 'Center word weight', hint: 'Word style only' },
        { path: 'mark.loops', label: 'Scribble loops', hint: 'Scribble style only' },
        { path: 'mark.stroke', label: 'Circle line width', hint: 'In pixels' },
        {
          path: 'mark.scribbleStroke',
          label: 'Scribble line width',
          hint: 'In pixels. Scribble style only',
        },
        {
          path: 'mark.scribbleSize',
          label: 'Scribble size',
          hint: 'Share of the circle radius. Scribble style only',
        },
        { path: 'mark.drawAt', label: 'Draw starts at', hint: FRAMES_AFTER_START },
        {
          path: 'mark.scribbleDelay',
          label: 'Scribble or word delay',
          hint: 'In frames after the circle starts drawing',
        },
        {
          path: 'mark.shrinkTo',
          label: 'Shrink to',
          hint: 'Final scale of the circle and scribble while the rings grow. 1 keeps its size. The center word holds its size',
        },
        {
          path: 'mark.shrinkFrames',
          label: 'Shrink length',
          hint: 'In frames, starting with the first ring',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          path: 'inverted',
          label: 'Light version',
          hint: 'Swaps the background and ink: dark words on a light page',
        },
        {
          link: ['look.ink', 'look.accent'],
          label: 'Ink color',
          hint: 'Colors the ring words and the center mark together',
        },
      ],
      more: [
        { ...LOOK.ink, label: 'Ring words color' },
        {
          ...LOOK.accent,
          label: 'Mark color',
          hint: 'Colors the circle and scribble. Also the paper margin line',
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
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
      ],
    },
    {
      title: 'Motion',
      fields: [MOTION.enter, MOTION.exit],
      more: [
        MOTION.enterFrames,
        MOTION.exitFrames,
        {
          ...MOTION.speed,
          hint: 'Speeds up the mark drawing, ring timing, growth and spin together; the entrance and exit keep their own length',
        },
      ],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
