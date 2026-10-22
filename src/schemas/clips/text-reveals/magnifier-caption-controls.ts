import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { MagnifierCaptionProps } from './magnifier-caption';

export const magnifierCaptionControls = defineControls<MagnifierCaptionProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        {
          path: 'caption.text',
          label: 'Caption',
          hint: 'Each word gets its own cell in the honeycomb for the lens to find; line breaks start new lines',
        },
        {
          path: 'glow.accentWord',
          label: 'Keyword',
          hint: 'Caption word drawn in the keyword color with an underline; leave empty for none',
        },
        { path: 'caption.font', label: 'Font' },
        { path: 'caption.size', label: 'Text size' },
        { path: 'caption.color', label: 'Text color' },
      ],
      more: [
        { path: 'caption.weight', label: 'Font weight' },
        { path: 'caption.lineHeight', label: 'Line spacing' },
        {
          path: 'caption.top',
          label: 'Caption position',
          hint: 'Distance from the top of the frame, in pixels',
        },
        {
          path: 'caption.underline',
          label: 'Underline thickness',
          hint: 'In pixels; 0 hides the keyword underline',
        },
      ],
    },
    {
      title: 'Magnifier',
      fields: [
        { path: 'lens.radius', label: 'Lens size', hint: 'Radius in pixels' },
        {
          path: 'lens.magnify',
          label: 'Magnification',
          hint: 'How much larger the honeycomb looks through the glass',
        },
        {
          path: 'lens.rim',
          label: 'Rim color',
          hint: 'Also colors the handle outline and collar',
        },
        { path: 'lens.handle', label: 'Handle color' },
      ],
      more: [
        {
          path: 'lens.x',
          label: 'Lens position X',
          hint: 'Pixels from the left; the lens starts and ends here and wanders around it',
        },
        {
          path: 'lens.y',
          label: 'Lens position Y',
          hint: 'Pixels from the top; the lens starts and ends here and wanders around it',
        },
        { path: 'lens.angle', label: 'Tilt', hint: 'Resting angle of the handle, in degrees' },
        {
          path: 'lens.sway',
          label: 'Wander',
          hint: 'How far the lens shifts and tilts as it moves between words; 0 holds it still',
        },
        { path: 'lens.rimWidth', label: 'Rim thickness' },
        { path: 'lens.handleLength', label: 'Handle length', hint: '0 hides the handle' },
        { path: 'lens.handleWidth', label: 'Handle thickness' },
        {
          path: 'lens.handleGap',
          label: 'Handle gap',
          hint: 'Space between the rim and the handle collar',
        },
        {
          path: 'lens.glint',
          label: 'Glass glint',
          hint: 'Strength of the white shine on the glass',
        },
        {
          path: 'lens.inside',
          label: 'Lens background',
          hint: 'Fill behind the cells seen through the glass',
        },
        {
          link: ['lens.ring', 'lens.word'],
          label: 'Cells in the lens',
          hint: 'Outline and word color of the cells seen through the glass',
        },
        { path: 'lens.ring', label: 'Lens cell outline color' },
        { path: 'lens.word', label: 'Lens cell word color' },
        { path: 'lens.lineWidth', label: 'Lens cell outline thickness' },
      ],
    },
    {
      title: 'Glow',
      fields: [
        {
          link: ['glow.accent', 'glow.accentText'],
          label: 'Keyword color',
          hint: 'Sets the keyword text, its underline and its cell glow together',
        },
        {
          path: 'glow.color',
          label: 'Found word glow',
          hint: 'Glow and lit word color of each caption cell under the lens; the keyword uses the keyword color',
        },
      ],
      more: [
        {
          path: 'glow.accent',
          label: 'Keyword glow color',
          hint: 'The underline and the glow behind the keyword cell',
        },
        {
          path: 'glow.accentText',
          label: 'Keyword text color',
          hint: 'The keyword in the caption and in its lit cell',
        },
        {
          path: 'glow.strength',
          label: 'Glow strength',
          hint: 'Higher lights the found cells sooner and fuller',
        },
        { path: 'glow.halo', label: 'Glow blur', hint: 'Soft halo behind the lit words' },
        { path: 'glow.weight', label: 'Lit word weight' },
      ],
    },
    {
      title: 'Honeycomb',
      fields: [
        {
          path: 'field.decoys',
          label: 'Background words',
          hint: 'One per line, scattered across the cells; the first sits under the lens at rest',
        },
        { path: 'field.shape', label: 'Cell shape' },
        {
          link: ['field.ring', 'field.word'],
          label: 'Honeycomb color',
          hint: 'Outline and word color of the blurred cells outside the lens',
        },
        { path: 'field.blur', label: 'Blur', hint: 'Blur of the honeycomb outside the lens' },
      ],
      more: [
        { path: 'field.ring', label: 'Cell outline color' },
        { path: 'field.word', label: 'Cell word color' },
        { path: 'field.lineWidth', label: 'Cell outline thickness' },
        {
          path: 'field.wordSize',
          label: 'Cell word size',
          hint: 'Applies inside and outside the lens',
        },
        {
          path: 'field.wordWeight',
          label: 'Cell word weight',
          hint: 'Words before they light up, inside and outside the lens',
        },
        {
          path: 'field.spread',
          label: 'Path spread',
          hint: 'How far apart the caption word cells sit; higher makes the lens travel further',
        },
        {
          path: 'field.seed',
          label: 'Layout seed',
          hint: 'Change for a different random honeycomb',
        },
        {
          path: 'field.targetRadius',
          label: 'Caption cell size',
          hint: 'Radius of the cells holding caption words',
        },
        { path: 'field.minRadius', label: 'Smallest cell' },
        { path: 'field.maxRadius', label: 'Largest cell' },
        { path: 'field.gap', label: 'Cell gap' },
        {
          path: 'field.fill',
          label: 'Labelled cells',
          hint: 'Share of background cells that show a word',
        },
        {
          path: 'field.drift',
          label: 'Drift',
          hint: 'How fast the honeycomb keeps gliding after each lens move, in pixels per frame',
        },
        {
          path: 'field.fadeTop',
          label: 'Top fade edge',
          hint: 'Pixels from the top; the honeycomb is hidden above this line and fades in below it',
        },
        {
          path: 'field.fadeBottom',
          label: 'Bottom fade edge',
          hint: 'Pixels from the top; the honeycomb fades out toward this line and is hidden below it',
        },
        { path: 'field.fadeLength', label: 'Fade length', hint: 'In pixels' },
      ],
    },
    {
      title: 'Timing',
      fields: [
        {
          link: ['timing.wordInterval', 'timing.moveInterval'],
          label: 'Pace',
          hint: 'Frames between words; the lens moves on the same beat so each word types as it is found',
        },
        {
          path: 'timing.returnFrame',
          label: 'Lens returns at',
          hint: 'Frame number; raise it for longer captions so the lens reaches every word',
        },
        {
          path: 'timing.fadeOutFrame',
          label: 'Caption fades out at',
          hint: 'Frame number; also fades the underline',
        },
      ],
      more: [
        {
          path: 'timing.wordInterval',
          label: 'Frames between words',
          hint: 'Caption typing pace',
        },
        {
          path: 'timing.moveInterval',
          label: 'Frames between lens moves',
          hint: 'Slightly lower than frames between words lets typing land as the lens arrives',
        },
        { path: 'timing.firstWord', label: 'First word at', hint: 'Frame number' },
        {
          path: 'timing.firstMove',
          label: 'First lens move at',
          hint: 'Frame number; negative starts the move before the clip begins',
        },
        { path: 'timing.travelFrames', label: 'Lens travel time', hint: 'In frames' },
        { path: 'timing.returnFrames', label: 'Return travel time', hint: 'In frames' },
        {
          path: 'caption.charStagger',
          label: 'Letter stagger',
          hint: 'Frames between letters typing in',
        },
        {
          path: 'caption.wordFrames',
          label: 'Max typing time per word',
          hint: 'In frames; long words type faster to fit',
        },
        {
          path: 'caption.charFade',
          label: 'Letter fade time',
          hint: 'In frames, for fading in and out',
        },
        { path: 'caption.underlineFrames', label: 'Underline draw time', hint: 'In frames' },
        {
          path: 'timing.fadeOutStagger',
          label: 'Fade-out stagger',
          hint: 'Frames between letters fading out',
        },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background],
      more: [
        {
          path: 'look.spotlight',
          label: 'Spotlight color',
          hint: 'Glow in the center of the background',
        },
      ],
    },
    {
      title: 'Brand',
      fields: [
        { path: 'brand.show', label: 'Show brand line' },
        { path: 'brand.url', label: 'Brand text' },
      ],
      more: [
        { path: 'brand.color', label: 'Brand text color' },
        { path: 'brand.mark', label: 'Logo mark color' },
        { path: 'brand.size', label: 'Brand size' },
        { path: 'brand.y', label: 'Brand position', hint: 'Pixels from the top' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        { ...MOTION.exitFrames, hint: 'In frames; starts at 0, so raise it for the exit to play' },
        {
          ...MOTION.speed,
          hint: 'Scales the lens, typing and fade timing; the clip length, entrance and exit stay the same',
        },
      ],
      more: [MOTION.enterFrames],
    },
  ],
  hidden: ['motion.float'],
});
