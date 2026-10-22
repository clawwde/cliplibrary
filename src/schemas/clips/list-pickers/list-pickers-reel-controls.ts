import { defineControls } from '../../control-layout';
import type { ListPickersReelProps } from './list-pickers-reel';

export const listPickersReelControls = defineControls<ListPickersReelProps>({
  sections: [
    {
      title: 'Settings',
      fields: [
        'intro.show',
        'intro.frames',
        'intro.background',
        'intro.gap',
        'intro.radius',
        'intro.popFrames',
        'intro.stagger',
        'intro.zoomFrames',
        'intro.lead',
        'grid',
        'beats',
        'crossfade',
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
