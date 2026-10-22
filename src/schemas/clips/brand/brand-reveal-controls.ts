import { defineControls } from '../../control-layout';
import type { BrandRevealProps } from './brand-reveal';

export const brandRevealControls = defineControls<BrandRevealProps>({
  sections: [
    {
      title: 'Settings',
      fields: [
        'eyebrow',
        'brandName',
        'tagline',
        'showMark',
        'markColor',
        'wordmarkSize',
        'look.showBackdrop',
        'look.background',
        'look.backgroundEdge',
        'look.ink',
        'look.muted',
        'look.accent',
        'look.grain',
        'look.liveGrain',
        'look.spotlight',
        'look.paper',
        'look.paperLine',
        'look.paperSpacing',
        'look.paperMargin',
        'motion.enter',
        'motion.enterFrames',
        'motion.exit',
        'motion.exitFrames',
        'motion.float',
        'motion.speed',
      ],
    },
  ],
});
