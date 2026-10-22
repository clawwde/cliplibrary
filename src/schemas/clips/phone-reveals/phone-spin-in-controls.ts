import { defineControls } from '../../control-layout';
import { LOOK, MOTION, STAGE } from '../../control-presets';
import type { PhoneSpinInProps } from './phone-spin-in';

export const phoneSpinInControls = defineControls<PhoneSpinInProps>({
  sections: [
    {
      title: 'Phone',
      fields: [
        { path: 'phone.screen', label: 'Screen' },
        {
          path: 'phone.customScreen',
          label: 'Custom screen image',
          hint: 'Replaces the preset screen when set',
        },
        { path: 'phone.finish', label: 'Phone finish' },
        { path: 'scale', label: 'Phone size' },
      ],
    },
    {
      title: 'Spin',
      fields: [
        {
          path: 'spinTurns',
          label: 'Spin amount',
          hint: 'Full turns the phone spins through as it rises; 0.25 is a quarter turn',
        },
        {
          path: 'spinFrames',
          label: 'Spin-in length',
          hint: 'In frames at normal speed; the phone rises, spins and settles over this time',
        },
        {
          path: 'rise',
          label: 'Rise distance',
          hint: 'How far below its resting spot the phone starts',
        },
        {
          path: 'tilt',
          label: 'Resting angle',
          hint: 'How far the phone stays turned once it settles. Positive faces the screen away from its side of the frame, to the left when centered',
        },
      ],
      more: [
        {
          path: 'slideIn',
          label: 'Sideways slide',
          hint: 'How far out toward its side of the frame the phone starts before sliding into place',
        },
        {
          path: 'startPitch',
          label: 'Starting tip back',
          hint: 'How far the phone is tipped back as it rises; it straightens as it settles',
        },
        {
          path: 'startRoll',
          label: 'Starting lean',
          hint: 'How far the phone leans sideways as it rises; it levels out as it settles',
        },
      ],
    },
    {
      title: 'Position',
      fields: [
        {
          path: 'position.x',
          label: 'Horizontal position',
          hint: 'Also sets which way the phone spins and leans, and where the spotlight sits',
        },
        { path: 'position.y', label: 'Vertical position' },
      ],
      more: [
        { path: 'position.z', label: 'Depth', hint: 'Higher brings the phone toward the camera' },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        {
          link: ['look.background', 'look.backgroundEdge'],
          label: 'Background color',
          hint: 'Sets the center and corner colors together for a flat background. Dark colors also switch the 3D lighting to a darker studio',
        },
        LOOK.spotlight,
        LOOK.grain,
      ],
      more: [
        {
          ...LOOK.background,
          label: 'Background center',
          hint: 'Dark colors also switch the 3D lighting to a darker studio',
        },
        LOOK.backgroundEdge,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        {
          path: 'look.accent',
          label: 'Margin line color',
          hint: 'Shows when Paper margin line is on',
        },
      ],
    },
    {
      title: 'Camera and lighting',
      fields: [
        {
          ...STAGE.cameraDistance,
          hint: 'Higher pulls the camera back so the phone looks smaller',
        },
        STAGE.keyLight,
        { ...STAGE.reflections, hint: 'Strength of the studio highlights on the glass and frame' },
        STAGE.shadow,
      ],
      more: [
        { ...STAGE.fieldOfView, hint: 'Lower flattens perspective like a longer lens' },
        STAGE.shadowSoftness,
        { ...STAGE.cameraDrift, hint: 'Slow wandering camera movement' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        { ...MOTION.float, hint: 'Gentle up and down bob' },
        {
          ...MOTION.speed,
          hint: 'Speeds up or slows the spin, sway and float. Entrance, exit and camera drift keep their pace',
        },
      ],
      more: [
        MOTION.enterFrames,
        MOTION.exitFrames,
        { path: 'sway', label: 'Idle sway', hint: 'Gentle side to side turn of the phone' },
      ],
    },
  ],
  hidden: ['look.ink', 'look.muted'],
});
