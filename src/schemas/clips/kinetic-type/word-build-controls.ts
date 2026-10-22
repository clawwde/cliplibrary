import { defineControls } from '../../control-layout';
import { LOOK, MOTION, PLACEMENT } from '../../control-presets';
import type { WordBuildProps } from './word-build';

export const wordBuildControls = defineControls<WordBuildProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        {
          path: 'text',
          label: 'Line',
          hint: 'The first words fly through huge, then the whole line builds. New lines start new rows',
        },
        { path: 'size', label: 'Line text size', hint: 'In pixels' },
        { path: 'weight', label: 'Line font weight' },
        {
          link: ['look.ink', 'bigColor'],
          label: 'Text color',
          hint: 'Sets the big words and the line together',
        },
        {
          ...LOOK.accent,
          label: 'Highlight color',
          hint: 'The walking highlight and the highlighted words',
        },
      ],
      more: [
        {
          path: 'lineHeight',
          label: 'Row spacing',
          hint: 'Distance between rows as a multiple of the text size',
        },
        { path: 'bigColor', label: 'Big word color', hint: 'Also colors the echo outlines' },
        { ...LOOK.ink, label: 'Line text color' },
      ],
    },
    {
      title: 'Big words',
      fields: [
        {
          path: 'entry',
          label: 'Big word style',
          hint: 'Scroll pans all the big words across as one strip, the other styles show one word at a time',
        },
        {
          path: 'bigWords',
          label: 'Number of big words',
          hint: 'Taken from the start of the line, 0 uses every word',
        },
        {
          path: 'bigSize',
          label: 'Big word size',
          hint: 'In pixels. With Step, the size of the last word',
        },
        {
          path: 'wordFrames',
          label: 'Frames per big word',
          hint: 'How long each big word holds the screen. With Scroll, the strip travels this long per word. Lower is faster',
        },
        {
          path: 'bigExit',
          label: 'Last big word exit',
          hint: 'Cut away, drop its letters, or squeeze down into the line. With Scroll it only delays the line',
        },
      ],
      more: [
        { path: 'bigWeight', label: 'Big word font weight' },
        {
          path: 'direction',
          label: 'Scroll direction',
          hint: 'Scroll style only, which way the strip travels',
        },
        {
          path: 'sizeRamp',
          label: 'Step size ramp',
          hint: 'Step style only, each word is this fraction of the size of the word after it',
        },
        {
          path: 'zoomFrom',
          label: 'Shrink start scale',
          hint: 'Shrink style only, how zoomed in each word starts',
        },
        {
          path: 'echoes',
          label: 'Echo outlines',
          hint: 'Echo style only, outline copies trailing each word',
        },
        { path: 'delay', label: 'Start delay', hint: 'In frames, before the first big word' },
      ],
    },
    {
      title: 'Line build',
      fields: [
        {
          path: 'sentenceEntry',
          label: 'Word entrance',
          hint: 'Rise up, swing in on a wave, or type in letter by letter',
        },
        { path: 'buildFrom', label: 'Build from', hint: 'Which end of the line appears first' },
        {
          path: 'buildFrames',
          label: 'Frames between words',
          hint: 'Lower builds the line faster',
        },
        {
          path: 'walkHighlight',
          label: 'Walking highlight',
          hint: 'Each new word flashes in the highlight color as it lands',
        },
      ],
      more: [
        {
          path: 'lineDelay',
          label: 'Pause before the line',
          hint: 'In frames, after the last big word leaves',
        },
        {
          path: 'highlight',
          label: 'Highlighted words',
          hint: 'Words kept in the highlight color, separated by spaces. Used when the walking highlight is off. Also tints matching big words in the Zoom, Shrink, Tilt, Pop and Echo styles',
        },
        {
          path: 'exitByWord',
          label: 'Words leave one by one',
          hint: 'Each word fades out in turn before the clip exit',
        },
        {
          path: 'exitStagger',
          label: 'Word exit stagger',
          hint: 'Frames between one word fading out and the next, 0 fades them together. Words leave one by one only',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { ...PLACEMENT.horizontal, hint: 'Moves the line. The big words stay centered' },
        { ...PLACEMENT.vertical, hint: 'Moves the line. The big words stay centered' },
      ],
      more: [
        {
          ...PLACEMENT.width,
          hint: 'Rows never wrap. Sets where left or right aligned rows sit',
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
        { ...LOOK.paperMargin, hint: 'A faded line in the highlight color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the big words, line build and word exits. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'motion.float'],
});
