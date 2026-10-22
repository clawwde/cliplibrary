import { defineControls } from '../../control-layout';
import type { PhoneSwapProps } from './phone-swap';

export const phoneSwapControls = defineControls<PhoneSwapProps>({
  sections: [
    {
      title: 'Settings',
      fields: [
        'screens',
        'finish',
        'startSide',
        'offset',
        'scale',
        'spinTurns',
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
        'stage.cameraDistance',
        'stage.fieldOfView',
        'stage.keyLight',
        'stage.reflections',
        'stage.shadow',
        'stage.shadowSoftness',
        'stage.cameraDrift',
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
