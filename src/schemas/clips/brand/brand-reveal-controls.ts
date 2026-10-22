import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { BrandRevealProps } from './brand-reveal';

export const brandRevealControls = defineControls<BrandRevealProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'brandName', label: 'Brand name' },
        { path: 'eyebrow', label: 'Eyebrow', hint: 'Small spaced capitals above the name' },
        { path: 'tagline', label: 'Tagline' },
      ],
    },
    {
      title: 'Logo mark',
      fields: [
        { path: 'showMark', label: 'Show ring mark' },
        { path: 'markColor', label: 'Mark color' },
        {
          path: 'markScale',
          label: 'Mark size',
          hint: 'Relative to the brand name size',
        },
      ],
      more: [
        {
          path: 'markGap',
          label: 'Gap to brand name',
          hint: 'Relative to the brand name size',
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        { path: 'wordmarkSize', label: 'Brand name size' },
        { path: 'wordmarkWeight', label: 'Brand name weight' },
        { ...LOOK.ink, label: 'Brand name color' },
        { ...LOOK.muted, label: 'Eyebrow and tagline color' },
        {
          link: ['eyebrowGap', 'taglineGap'],
          label: 'Space around brand name',
          hint: 'Gap above to the eyebrow and below to the tagline',
        },
      ],
      more: [
        {
          path: 'wordmarkTracking',
          label: 'Brand name letter spacing',
          hint: 'In em, negative pulls letters together',
        },
        { path: 'eyebrowSize', label: 'Eyebrow size' },
        { path: 'taglineSize', label: 'Tagline size' },
        { path: 'eyebrowGap', label: 'Gap below eyebrow' },
        { path: 'taglineGap', label: 'Gap above tagline' },
      ],
    },
    {
      title: 'Reveal',
      fields: [
        {
          ...MOTION.speed,
          label: 'Reveal speed',
          hint: 'Speeds up the ring drawing, the letter rise and the tagline cue',
        },
        {
          path: 'letterStagger',
          label: 'Delay between letters',
          hint: 'In frames. 0 raises every letter together',
        },
        {
          path: 'wordmarkStart',
          label: 'Letters start at',
          hint: 'Frame number at reveal speed 1',
        },
        {
          path: 'taglineStart',
          label: 'Tagline appears at',
          hint: 'Frame number at reveal speed 1',
        },
      ],
      more: [
        {
          path: 'letterRise',
          label: 'Letter rise length',
          hint: 'Frames each letter takes to rise into place',
        },
        {
          path: 'markStart',
          label: 'Ring starts drawing at',
          hint: 'Frame number at reveal speed 1',
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
        { ...LOOK.accent, label: 'Margin line color' },
      ],
    },
    {
      title: 'Entrance and exit',
      fields: [MOTION.enter, MOTION.exit],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['motion.float'],
});
