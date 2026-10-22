import { defineControls } from '../../control-layout';
import type { FilmDustProps } from './film-dust';

export const filmDustControls = defineControls<FilmDustProps>({
  sections: [
    {
      title: 'Settings',
      fields: [
        'color',
        'dust',
        'hairs',
        'scratches',
        'vignette',
        'gateFrames',
        'seed',
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
