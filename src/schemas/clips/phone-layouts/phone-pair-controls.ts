import { defineControls } from '../../control-layout';
import { LOOK, MOTION, STAGE } from '../../control-presets';
import type { PhonePairProps } from './phone-pair';

export const phonePairControls = defineControls<PhonePairProps>({
  sections: [
    {
      title: 'Phones',
      fields: [
        {
          path: 'phones',
          label: 'Phones',
          hint: 'Left phone first. In the behind entrance the first phone stays in front and the second slides out from behind it. A custom screen image replaces the built-in screen',
          items: {
            screen: 'Screen',
            customScreen: 'Custom screen image',
            finish: 'Phone color',
          },
        },
        { path: 'scale', label: 'Phone size' },
      ],
    },
    {
      title: 'Entrance',
      fields: [
        {
          path: 'entrance',
          label: 'Entrance style',
          hint: 'Phones slide in from opposite sides, or the second phone slides out from behind the first',
        },
        {
          path: 'arriveFrames',
          label: 'Slide-in length',
          hint: 'Sides entrance only. In frames',
        },
        {
          path: 'behindSide',
          label: 'Slide-out direction',
          hint: 'Behind entrance only. The side the second phone slides out toward',
        },
        {
          path: 'slideFrames',
          label: 'Slide-out length',
          hint: 'Behind entrance only. In frames',
        },
      ],
      more: [
        {
          path: 'arriveSwing',
          label: 'Slide-in swing',
          hint: 'Sides entrance only. Extra turn the phones unwind as they arrive',
        },
        {
          path: 'slideDelay',
          label: 'Slide-out delay',
          hint: 'Behind entrance only. Frames before the second phone starts to move',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        {
          path: 'gap',
          label: 'Space between phones',
          hint: 'In the behind entrance, how far the second phone slides out',
        },
        {
          path: 'angle',
          label: 'Turn angle',
          hint: 'How far the phones turn. In the sides entrance they turn to face each other',
        },
        {
          path: 'stagger',
          label: 'Height offset',
          hint: 'Sides entrance only. Higher values raise the right phone and lower the left one',
        },
        { path: 'position.x', label: 'Horizontal position' },
        { path: 'position.y', label: 'Vertical position' },
      ],
      more: [{ path: 'position.z', label: 'Depth', hint: 'Higher values bring the pair closer' }],
    },
    {
      title: 'Camera and light',
      fields: [
        { ...STAGE.cameraDistance, hint: 'Higher values make the phones look smaller' },
        STAGE.keyLight,
        { ...STAGE.reflections, label: 'Glass and metal reflections' },
        STAGE.shadow,
      ],
      more: [STAGE.fieldOfView, STAGE.shadowSoftness, STAGE.cameraDrift],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        {
          ...LOOK.background,
          hint: 'A dark color also switches the studio lighting on the phones to its dark setup, even with the background hidden',
        },
        LOOK.spotlight,
      ],
      more: [
        LOOK.backgroundEdge,
        LOOK.grain,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        {
          ...LOOK.accent,
          label: 'Margin line color',
          hint: 'Only shows when Paper margin line is on',
        },
      ],
    },
    {
      title: 'Motion',
      fields: [
        { ...MOTION.enter, label: 'Intro transition', hint: 'How the whole frame appears' },
        {
          ...MOTION.exit,
          label: 'Outro transition',
          hint: 'How the whole frame leaves at the end',
        },
        {
          link: ['motion.exitFrames', 'motion.enterFrames'],
          label: 'Transition length',
          hint: 'Sets both the intro and outro transition, in frames',
        },
        {
          ...MOTION.float,
          hint: 'Gentle bob while the phones are on screen. In the behind entrance only the second phone bobs',
        },
        { ...MOTION.speed, hint: 'Speeds up or slows down the phone animation' },
      ],
      more: [
        { ...MOTION.enterFrames, label: 'Intro length' },
        { ...MOTION.exitFrames, label: 'Outro length' },
      ],
    },
  ],
  hidden: ['look.ink', 'look.muted'],
});
