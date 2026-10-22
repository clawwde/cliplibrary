import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { LetterFlipProps } from './letter-flip';

export const letterFlipControls = defineControls<LetterFlipProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'text', label: 'Word', hint: 'Each character flips in on its own' },
        { path: 'size', label: 'Text size', hint: 'In pixels' },
        { path: 'weight', label: 'Font weight' },
        LOOK.ink,
      ],
      more: [{ path: 'tracking', label: 'Letter spacing', hint: 'In em' }],
    },
    {
      title: 'Flip',
      fields: [
        {
          path: 'startAngle',
          label: 'Flip angle',
          hint: 'Degrees each letter turns before it lands; 180 starts from its mirror image',
        },
        { path: 'flipFrames', label: 'Flip length', hint: 'In frames per letter' },
        {
          path: 'stagger',
          label: 'Delay between letters',
          hint: 'In frames; 0 flips every letter at once',
        },
        {
          path: 'slide',
          label: 'Sideways slide',
          hint: 'How far each letter travels as it flips, as a multiple of the text size',
        },
      ],
      more: [
        { path: 'delay', label: 'Start delay', hint: 'In frames before the first letter flips' },
        {
          path: 'depth',
          label: 'Flip perspective',
          hint: 'Viewing distance as a multiple of the text size; lower looks more dramatic',
        },
      ],
    },
    {
      title: 'Highlight',
      fields: [
        {
          path: 'highlight',
          label: 'Highlighted letter',
          hint: 'Position of the letter drawn in the highlight color, counting from 1; 0 for none',
        },
        { ...LOOK.accent, label: 'Highlight color', hint: 'Also colors the paper margin line' },
      ],
    },
    {
      title: 'Ending',
      fields: [
        {
          path: 'glowOut',
          label: 'Glow burn-out',
          hint: 'Near the end the word glows, blurs and fades letter by letter; 0 turns it off',
        },
        MOTION.exit,
      ],
      more: [
        {
          ...MOTION.exitFrames,
          hint: 'In frames; a longer exit also starts the glow burn-out earlier',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [PLACEMENT.horizontal, PLACEMENT.vertical],
      more: [
        {
          ...PLACEMENT.width,
          hint: 'The word never wraps. Sets where left or right aligned text sits',
        },
        PLACEMENT.insetX,
        PLACEMENT.insetY,
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
        { ...LOOK.paperMargin, hint: 'Drawn in the highlight color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        {
          ...MOTION.speed,
          hint: 'Scales the letter flips. The glow burn-out, entrance and exit keep their timing',
        },
      ],
      more: [MOTION.enterFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
