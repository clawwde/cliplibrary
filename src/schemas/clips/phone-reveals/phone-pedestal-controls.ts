import { defineControls } from '../../control-layout';
import { LOOK, MOTION, STAGE } from '../../control-presets';
import type { PhonePedestalProps } from './phone-pedestal';

export const phonePedestalControls = defineControls<PhonePedestalProps>({
  sections: [
    {
      title: 'Phone',
      fields: [
        { path: 'phone.screen', label: 'Screen' },
        {
          path: 'phone.customScreen',
          label: 'Custom screen image',
          hint: 'Replaces the built-in screen when set',
        },
        { path: 'phone.finish', label: 'Phone color' },
        { path: 'scale', label: 'Phone size' },
      ],
    },
    {
      title: 'Drop and balance',
      fields: [
        {
          path: 'lean',
          label: 'Lean',
          hint: 'How far the phone tips over on its corner; positive leans the top to the right',
        },
        {
          path: 'rock',
          label: 'Rocking',
          hint: 'How far the phone sways once it lands; 0 holds it still',
        },
        {
          path: 'entry.drop',
          label: 'Drop height',
          hint: 'How far above the block the phone starts; negative rises up from below',
        },
        { path: 'entry.frames', label: 'Landing length', hint: 'In frames' },
      ],
      more: [
        {
          path: 'rockSpeed',
          label: 'Rocking speed',
          hint: 'Higher sways back and forth faster. At 1 a full sway takes about 6 seconds',
        },
        { path: 'yaw', label: 'Phone turn', hint: 'Spins the phone to show more of one side' },
        {
          path: 'pitch',
          label: 'Tip toward camera',
          hint: 'Negative leans the top of the phone back',
        },
      ],
    },
    {
      title: 'Block',
      fields: [
        { path: 'pedestal.show', label: 'Show block' },
        { path: 'pedestal.color', label: 'Block color' },
        { path: 'pedestal.size', label: 'Block size' },
        {
          path: 'pedestal.top',
          label: 'Peak height',
          hint: 'Raises or lowers the block and the phone together',
        },
      ],
      more: [
        {
          path: 'pedestal.turn',
          label: 'Block angle',
          hint: '0 faces a flat side to the camera; about 0.79 points a corner at it',
        },
        { path: 'pedestal.bevel', label: 'Edge rounding' },
        {
          path: 'pedestal.roughness',
          label: 'Block matte',
          hint: 'Higher looks softer and less shiny',
        },
      ],
    },
    {
      title: 'Camera',
      fields: [
        {
          path: 'camera.height',
          label: 'Camera height',
          hint: 'Lower values look up at the block from below',
        },
        {
          path: 'camera.rise',
          label: 'Camera rise',
          hint: 'How far the camera climbs over the clip',
        },
        {
          path: 'camera.orbit',
          label: 'Camera orbit',
          hint: 'How far the view swings around the phone over the clip; negative swings the other way',
        },
        { ...STAGE.cameraDistance, hint: 'Higher pulls the camera back from the phone' },
      ],
      more: [
        {
          path: 'entry.cameraTilt',
          label: 'Camera start lift',
          hint: 'The camera starts this much higher and settles as the phone lands',
        },
        { path: 'camera.aimY', label: 'Aim height', hint: 'Where the camera points vertically' },
        STAGE.fieldOfView,
        { ...STAGE.cameraDrift, hint: 'Slow handheld wander' },
      ],
    },
    {
      title: 'Light',
      fields: [
        STAGE.keyLight,
        { ...STAGE.shadow, hint: 'Shadow cast on the wall behind the block' },
      ],
      more: [
        { ...STAGE.reflections, hint: 'Shine on the phone and the clay' },
        STAGE.shadowSoftness,
        { path: 'camera.lightX', label: 'Key light left to right' },
        { path: 'camera.lightY', label: 'Key light height' },
        { path: 'camera.lightZ', label: 'Key light distance in front' },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.backgroundEdge],
      more: [
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the landing, rocking and camera move. Entrance, exit and camera drift keep their pace',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float'],
});
