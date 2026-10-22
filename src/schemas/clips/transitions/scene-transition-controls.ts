import { defineControls } from '../../control-layout';
import type { SceneTransitionProps } from './scene-transition';

export const sceneTransitionControls = defineControls<SceneTransitionProps>({
  sections: [
    {
      title: 'Settings',
      fields: ['kind', 'color', 'easing'],
    },
  ],
});
