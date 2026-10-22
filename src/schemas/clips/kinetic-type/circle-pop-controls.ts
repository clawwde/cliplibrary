import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { CirclePopProps } from './circle-pop';

const AFTER_FLOOD_STARTS = 'In frames after the flood starts';

export const circlePopControls = defineControls<CirclePopProps>({
  sections: [
    {
      title: 'Word',
      fields: [
        { path: 'word.text', label: 'Word', hint: 'Stays on one line' },
        {
          path: 'word.startSize',
          label: 'Size on the disc',
          hint: 'Font size in pixels while the word sits on the disc',
        },
        {
          path: 'word.endSize',
          label: 'Size after the flood',
          hint: 'Font size in pixels once the frame is white. The word never wraps, so lower it for longer words',
        },
        { path: 'word.weight', label: 'Font weight' },
        {
          link: ['word.color', 'word.floodColor', 'subline.color'],
          label: 'Text color',
          hint: 'Sets the word before and after the flood and the sub-line together',
        },
      ],
      more: [
        { path: 'word.tracking', label: 'Letter spacing', hint: 'In em' },
        { path: 'word.color', label: 'Word color on the disc' },
        {
          path: 'word.floodColor',
          label: 'Word color after the flood',
          hint: 'The word blends to this color while the frame floods',
        },
      ],
    },
    {
      title: 'Disc',
      fields: [
        { ...LOOK.ink, label: 'Disc color', hint: 'Also the color that floods the frame' },
        { path: 'disc.size', label: 'Disc size', hint: 'Diameter in pixels once it lands' },
        {
          path: 'pop.overshoot',
          label: 'Pop bounce',
          hint: 'How far the disc and word overshoot before they settle, so 0.08 is 8% bigger. 0 lands with no bounce',
        },
        {
          path: 'pop.frames',
          label: 'Pop length',
          hint: 'In frames, from a point to resting size',
        },
      ],
      more: [
        { path: 'pop.delay', label: 'Start delay', hint: 'In frames before the disc appears' },
        {
          path: 'pop.fadeFrames',
          label: 'Fade-in length',
          hint: 'In frames. The disc and word fade in as they grow, so nothing pops in',
        },
        {
          path: 'disc.offsetX',
          label: 'Move across',
          hint: 'In pixels from the center, positive is right. The word moves with the disc',
        },
        {
          path: 'disc.offsetY',
          label: 'Move up or down',
          hint: 'In pixels from the center, positive is down. The word moves with the disc',
        },
      ],
    },
    {
      title: 'Wobble',
      fields: [
        {
          path: 'wobble.shape',
          label: 'Edge shape',
          hint: 'Wobble rolls soft waves around the edge; starburst gives it sharp sticker points',
        },
        { path: 'wobble.lobes', label: 'Wobble bumps', hint: 'Number of bumps around the edge' },
        {
          path: 'wobble.amount',
          label: 'Wobble depth',
          hint: 'Bump height as a share of the radius, so 0.06 is 6%. 0 keeps a clean circle',
        },
        {
          path: 'wobble.speed',
          label: 'Wobble spin',
          hint: 'How fast the bumps travel around the edge, in degrees of wave per frame. 0 holds them still',
        },
        {
          path: 'wobble.buildFrames',
          label: 'Wobble build-up',
          hint: 'In frames, from the disc landing to the flood starting. The bumps start growing at the top of the pop bounce',
        },
      ],
    },
    {
      title: 'Flood',
      fields: [
        {
          path: 'flood.frames',
          label: 'Flood length',
          hint: 'In frames, from the blob starting to swell until it is past every corner',
        },
        {
          path: 'flood.wordFrames',
          label: 'Word grow length',
          hint: 'In frames, from the size on the disc to the size after the flood',
        },
        {
          path: 'flood.wordDelay',
          label: 'Word grow delay',
          hint: `${AFTER_FLOOD_STARTS}. A few frames keep the word inside the swelling blob`,
        },
      ],
      more: [
        {
          path: 'flood.reach',
          label: 'Flood overshoot',
          hint: 'How far past the farthest corner the blob ends, as a multiple of that distance. Higher fills the corners sooner',
        },
      ],
    },
    {
      title: 'Tilt',
      fields: [
        {
          path: 'word.rotation',
          label: 'Starting tilt',
          hint: 'In degrees, while the word sits on the disc',
        },
        {
          path: 'tilt.angle',
          label: 'Final tilt',
          hint: 'In degrees, where the word lands after the flood',
        },
      ],
      more: [
        { path: 'tilt.delay', label: 'Tilt delay', hint: AFTER_FLOOD_STARTS },
        { path: 'tilt.frames', label: 'Tilt length', hint: 'In frames' },
      ],
    },
    {
      title: 'Sub-line',
      fields: [
        {
          path: 'subline.text',
          label: 'Sub-line',
          hint: 'A small line under the word that rises in after the flood. Leave empty to hide it',
        },
        { path: 'subline.size', label: 'Sub-line size', hint: 'Font size in pixels' },
        { path: 'subline.delay', label: 'Sub-line delay', hint: AFTER_FLOOD_STARTS },
      ],
      more: [
        { path: 'subline.frames', label: 'Sub-line fade-in length', hint: 'In frames' },
        {
          path: 'subline.rise',
          label: 'Sub-line rise',
          hint: 'In pixels it travels up while it fades in. 0 only fades it',
        },
        {
          path: 'subline.gap',
          label: 'Gap under the word',
          hint: 'In pixels below the bottom of the word, measured from its descenders at the size after the flood',
        },
        { path: 'subline.weight', label: 'Sub-line weight' },
        { path: 'subline.tracking', label: 'Sub-line letter spacing', hint: 'In em' },
        { path: 'subline.color', label: 'Sub-line color' },
      ],
    },
    {
      title: 'Background',
      fields: [
        {
          ...LOOK.showBackdrop,
          hint: 'Off leaves only the disc, the flood and the word, so the clip can sit over another layer',
        },
        {
          path: 'inverted',
          label: 'Invert colors',
          hint: 'Swaps every color for its opposite, so a dark disc floods a white frame',
        },
        { ...LOOK.background, hint: 'Shows around the disc until the flood covers it' },
        {
          ...LOOK.grain,
          hint: 'Off by default for a clean black. Shows on the background only, never on the flood',
        },
      ],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the pop, wobble, flood and tilt timing. The entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.muted', 'look.accent', 'motion.float'],
});
