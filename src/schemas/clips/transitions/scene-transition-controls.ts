import { defineControls } from '../../control-layout';
import type { SceneTransitionProps } from './scene-transition';

export const sceneTransitionControls = defineControls<SceneTransitionProps>({
  sections: [
    {
      title: 'Transition',
      fields: [
        {
          path: 'kind',
          label: 'Style',
          hint: 'How the color covers the frame and opens again: a growing circle, a sliding panel, or two bars closing from the edges. Split uses top and bottom bars, Split vertical uses left and right',
        },
        { path: 'color', label: 'Cover color' },
      ],
    },
    {
      title: 'Timing',
      fields: [
        {
          path: 'easing',
          label: 'Easing curve',
          hint: 'Shapes both the cover and the reveal',
        },
        {
          path: 'holdFrames',
          label: 'Hold fully covered',
          hint: 'In frames. The color fills the whole frame this long before opening, a clean spot to cut between clips. The cover and reveal speed up to keep the clip length',
        },
      ],
    },
    {
      title: 'Iris center',
      fields: [
        {
          path: 'centerX',
          label: 'Center across',
          hint: 'Iris style only. Percent of the width, 0 is the left edge',
        },
        {
          path: 'centerY',
          label: 'Center down',
          hint: 'Iris style only. Percent of the height, 0 is the top edge',
        },
      ],
    },
  ],
});
