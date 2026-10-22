import { defineControls } from '../../control-layout';
import { LOOK, MOTION, STAGE } from '../../control-presets';
import type { PhoneFlatLayProps } from './phone-flat-lay';

export const phoneFlatLayControls = defineControls<PhoneFlatLayProps>({
  sections: [
    {
      title: 'Phone',
      fields: [
        { path: 'phone.screen', label: 'Screen' },
        {
          path: 'phone.customScreen',
          label: 'Custom screen image',
          hint: 'Replaces the built-in screen; leave empty to use the screen above',
        },
        { path: 'phone.finish', label: 'Phone finish' },
        { path: 'scale', label: 'Phone size' },
      ],
      more: [
        {
          path: 'phoneTurn',
          label: 'Phone rotation',
          hint: 'Spins the phone flat on the ribbons, in radians',
        },
        { path: 'position.x', label: 'Phone left and right', hint: 'Along the ribbons' },
        { path: 'position.y', label: 'Phone up and down', hint: 'Across the ribbons' },
        {
          path: 'position.z',
          label: 'Phone lift',
          hint: 'Raises the phone off the ribbons; negative sinks it into them',
        },
      ],
    },
    {
      title: 'Camera',
      fields: [
        {
          path: 'camera.tiltFrom',
          label: 'Starting tilt',
          hint: 'How oblique the view starts, in radians; 0 is straight top-down',
        },
        {
          path: 'camera.tiltTo',
          label: 'Ending tilt',
          hint: 'Where the tilt lands, in radians; 0 is straight top-down',
        },
        {
          path: 'camera.turnFrom',
          label: 'Starting turn',
          hint: 'Spins the phone and ribbons flat in the frame at the start, in radians',
        },
        { path: 'camera.turnTo', label: 'Ending turn', hint: 'Where the spin lands, in radians' },
        {
          path: 'camera.frames',
          label: 'Camera move length',
          hint: 'In frames. Longer than the clip leaves the move still settling at the end',
        },
      ],
      more: [
        {
          path: 'camera.delay',
          label: 'Camera move starts at',
          hint: 'Frame number at normal speed; holds the starting angle until then',
        },
        {
          path: 'camera.ease',
          label: 'Camera move easing',
          hint: 'Settle starts fast and lands softly, Smooth eases in and out, Linear keeps a constant speed',
        },
        STAGE.cameraDistance,
        STAGE.fieldOfView,
        { ...STAGE.cameraDrift, hint: 'Slow handheld-style wander' },
      ],
    },
    {
      title: 'Ribbons',
      fields: [
        { path: 'surface.color', label: 'Ribbon color' },
        {
          path: 'surface.show',
          label: 'Show ribbons',
          hint: 'Off leaves the phone floating over the background',
        },
        { path: 'surface.count', label: 'Number of ribbons' },
        { path: 'surface.amplitude', label: 'Wave height' },
      ],
      more: [
        { path: 'surface.waves', label: 'Waves per ribbon', hint: 'Wave cycles along each ribbon' },
        {
          path: 'surface.curl',
          label: 'Side curl',
          hint: 'How far each ribbon sways side to side along its length',
        },
        {
          path: 'surface.angle',
          label: 'Ribbon angle',
          hint: 'Rotates the ribbon field under the phone, in radians',
        },
        {
          path: 'surface.width',
          label: 'Ribbon width',
          hint: 'Also sets the spacing between ribbons',
        },
        { path: 'surface.length', label: 'Ribbon length' },
        { path: 'surface.thickness', label: 'Ribbon thickness' },
        {
          path: 'surface.step',
          label: 'Alternate ribbon height',
          hint: 'Extra thickness on every other ribbon, which staggers the field',
        },
        { path: 'surface.roughness', label: 'Ribbon finish', hint: 'Higher is more matte' },
      ],
    },
    {
      title: 'Lighting',
      fields: [
        STAGE.keyLight,
        { ...STAGE.reflections, hint: 'Studio reflections on the phone and ribbons' },
      ],
      more: [
        { ...STAGE.shadowSoftness, hint: 'Blur of the shadows the phone and ribbons cast' },
        { path: 'camera.lightX', label: 'Key light left to right' },
        { path: 'camera.lightY', label: 'Key light height' },
        {
          path: 'camera.lightZ',
          label: 'Key light distance',
          hint: 'Higher sits nearer the camera',
        },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the camera move and its start frame. Camera drift, entrance and exit keep their pace',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
    {
      title: 'Background',
      fields: [
        {
          ...LOOK.background,
          hint: 'Seen only where the ribbons leave gaps. A dark color also switches to darker studio lighting',
        },
        LOOK.showBackdrop,
      ],
      more: [
        { ...LOOK.grain, hint: 'Sits behind the ribbons, so it shows only where they leave gaps' },
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float', 'stage.shadow'],
});
