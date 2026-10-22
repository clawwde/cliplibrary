import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { TypewriterProps } from './typewriter';

export const typewriterControls = defineControls<TypewriterProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'text', label: 'Line' },
        { path: 'size', label: 'Text size', hint: 'In pixels' },
        { path: 'weight', label: 'Font weight' },
        {
          link: ['look.ink', 'caretColor', 'selectionColor'],
          label: 'Text color',
          hint: 'Also colors the caret, the opening block and the selection highlight',
        },
      ],
      more: [
        { path: 'tracking', label: 'Letter spacing', hint: 'In em' },
        { ...LOOK.ink, label: 'Letter color', hint: 'The typed letters only' },
      ],
    },
    {
      title: 'Typing',
      fields: [
        {
          path: 'intro',
          label: 'Intro style',
          hint: 'Block: a block shrinks into the caret, then the line types. None: types straight away. Typed: the whole line rises in. Cut: the whole line appears at once',
        },
        {
          path: 'charFrames',
          label: 'Frames per letter',
          hint: 'Lower types faster. Also paces the erase outro',
        },
        { path: 'showCaret', label: 'Show caret' },
        {
          path: 'zoom',
          label: 'Start zoom',
          hint: 'The line eases from this scale down to full size until the outro begins. 1 keeps it still',
        },
      ],
      more: [
        { path: 'delay', label: 'Start delay', hint: 'In frames' },
        {
          path: 'caretHold',
          label: 'Caret pause before typing',
          hint: 'In frames. Block and None intros only',
        },
        { path: 'caretPulse', label: 'Caret blink length', hint: 'Frames per blink' },
        { path: 'caretColor', label: 'Caret color', hint: 'Also colors the opening block' },
      ],
    },
    {
      title: 'Outro',
      fields: [
        {
          path: 'outro',
          label: 'Outro style',
          hint: 'Select: a selection sweeps across and the line collapses away. Erase: letters delete from the end. None: the line stays',
        },
        {
          path: 'outroAt',
          label: 'Outro starts at',
          hint: 'Frame number. The start zoom finishes settling here too',
        },
      ],
      more: [
        {
          path: 'selectionColor',
          label: 'Selection color',
          hint: 'Highlight behind the selected line. The selected letters take the background color',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [PLACEMENT.horizontal, PLACEMENT.vertical],
      more: [
        {
          ...PLACEMENT.width,
          hint: 'The line never wraps. Sets where left or right aligned text sits',
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
        LOOK.paperMargin,
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
          hint: 'Scales the typing, caret and outro timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
