import { defineControls } from '../../control-layout';
import type { FloatingCardsProps } from './floating-cards';

export const floatingCardsControls = defineControls<FloatingCardsProps>({
  sections: [
    {
      title: 'Settings',
      fields: [
        'cards',
        'delay',
        'stagger',
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
