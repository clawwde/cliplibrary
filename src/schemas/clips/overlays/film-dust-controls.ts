import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { FilmDustProps } from './film-dust';

export const filmDustControls = defineControls<FilmDustProps>({
  sections: [
    {
      title: 'Film wear',
      fields: [
        {
          path: 'dust',
          label: 'Dust specks',
          hint: 'Higher scatters more specks across the frame',
        },
        { path: 'hairs', label: 'Stray hairs', hint: 'Higher shows more curled hairs at once' },
        {
          path: 'scratches',
          label: 'Scratches',
          hint: 'Higher flashes more faint vertical lines down the full height of the frame',
        },
        {
          path: 'vignette',
          label: 'Vignette',
          hint: 'Darkens the edges of the frame like an old projector. 0 turns it off',
        },
        { path: 'color', label: 'Dust color', hint: 'Shared by specks, hairs and scratches' },
      ],
      more: [
        {
          path: 'seed',
          label: 'Random pattern',
          hint: 'Pick another number for a different arrangement of marks',
        },
      ],
    },
    {
      title: 'Timing',
      fields: [
        {
          path: 'gateFrames',
          label: 'Mark lifetime',
          hint: 'Higher keeps each speck, hair and scratch on screen longer',
        },
        {
          ...MOTION.speed,
          label: 'Flicker speed',
          hint: 'Higher makes marks come and go faster. Entrance and exit keep their length',
        },
      ],
    },
    {
      title: 'Background',
      fields: [
        {
          ...LOOK.showBackdrop,
          hint: 'Turn off to lay the dust over other layers',
        },
        {
          link: ['look.background', 'look.backgroundEdge'],
          label: 'Background color',
          hint: 'Sets the center and the corners together',
        },
        {
          ...LOOK.grain,
          hint: 'Noise drawn over the background, so it disappears when the background is off',
        },
      ],
      more: [
        { ...LOOK.background, label: 'Background center' },
        LOOK.backgroundEdge,
        LOOK.liveGrain,
        LOOK.spotlight,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { ...LOOK.accent, label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.exitFrames,
          hint: 'In frames. Starts at 0, so raise it for the exit to play',
        },
      ],
      more: [MOTION.enterFrames],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float'],
});
