import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { IncomingCallTeaserProps } from './incoming-call-teaser';

export const incomingCallTeaserControls = defineControls<IncomingCallTeaserProps>({
  sections: [
    {
      title: 'Call',
      fields: [
        { path: 'call.caller', label: 'Caller name' },
        { path: 'call.subtitle', label: 'Line under the name' },
        { path: 'call.callerColor', label: 'Name color' },
      ],
      more: [
        { path: 'call.callerSize', label: 'Name size' },
        { path: 'call.subtitleSize', label: 'Subtitle size' },
        { path: 'call.subtitleColor', label: 'Subtitle color' },
        {
          path: 'call.pulseFrames',
          label: 'Pulse length',
          hint: 'Frames per name pulse, the halo rings take twice as long',
        },
        {
          path: 'call.pulseOffset',
          label: 'Pulse offset',
          hint: 'Shifts the name pulse and halo rhythm, in frames',
        },
        {
          path: 'call.pulseFloor',
          label: 'Dimmest name opacity',
          hint: 'How faint the name gets between pulses',
        },
      ],
    },
    {
      title: 'Swipe and hang-up',
      fields: [
        { path: 'call.sliderLabel', label: 'Slider text' },
        {
          path: 'call.slideStart',
          label: 'Swipe starts at',
          hint: 'Frame number. The call pulses until then',
        },
        { path: 'call.haloColor', label: 'Halo color' },
        {
          link: ['call.answerColor', 'wall.barFill'],
          label: 'Pick-up color',
          hint: 'The phone icon before the swipe and the loading bar fill',
        },
        {
          path: 'call.declineColor',
          label: 'Hang-up button color',
          hint: 'The button turns this color after the swipe',
        },
      ],
      more: [
        {
          path: 'call.centerY',
          label: 'Vertical position',
          hint: 'Pixels from the top to the slider center, the name and subtitle sit above it',
        },
        { path: 'call.pillWidth', label: 'Slider width' },
        { path: 'call.pillHeight', label: 'Slider height', hint: 'Also sets the button size' },
        { path: 'call.pillColor', label: 'Slider color', hint: 'Top of the slider gradient' },
        { path: 'call.pillShade', label: 'Slider shade', hint: 'Bottom of the slider gradient' },
        { path: 'call.ringColor', label: 'Slider outline', hint: 'Also rings the button' },
        { path: 'call.labelColor', label: 'Slider text color' },
        { path: 'call.shimmerColor', label: 'Shimmer color' },
        { path: 'call.shimmerFrames', label: 'Shimmer length', hint: 'Frames per sweep' },
        { path: 'call.knobColor', label: 'Button color' },
        { path: 'call.answerColor', label: 'Phone icon color', hint: 'Before the swipe' },
        { path: 'call.hangupIcon', label: 'Hang-up icon color' },
        {
          path: 'call.declineDim',
          label: 'Hang-up fade color',
          hint: 'The red button darkens to this as the call ends',
        },
        { path: 'call.halo', label: 'Halo strength' },
        { path: 'call.slideFrames', label: 'Swipe length', hint: 'In frames' },
        {
          path: 'call.declineFrames',
          label: 'Hang-up length',
          hint: 'Frames for the button to glide back to center and turn red',
        },
        {
          path: 'call.holdFrames',
          label: 'Hold after hang-up',
          hint: 'In frames, before the words start',
        },
      ],
    },
    {
      title: 'Words',
      fields: [
        {
          path: 'words.list',
          label: 'Words',
          hint: 'Each word cuts in on its slab, then glitches between the light and glitch colors for its glitch frames',
          items: {
            text: 'Word',
            band: 'Slab',
            frames: 'Frames on screen',
            glitchFrames: 'Glitch frames after',
          },
        },
        { path: 'words.size', label: 'Word size' },
        { path: 'words.lightBand', label: 'Light slab color' },
        {
          link: ['words.darkInk', 'outro.color'],
          label: 'Highlight text color',
          hint: 'Words on dark slabs and the sign-off script',
        },
      ],
      more: [
        { path: 'words.darkBand', label: 'Dark slab color' },
        { path: 'words.lightInk', label: 'Text on light slab' },
        { path: 'words.darkInk', label: 'Text on dark slab' },
        { path: 'words.glitchBand', label: 'Glitch slab color' },
        { path: 'words.glitchInk', label: 'Glitch text color' },
        {
          path: 'words.glitchPattern',
          label: 'Glitch pattern',
          hint: 'One letter per frame, L shows the light slab and D the glitch colors, then repeats',
        },
        {
          path: 'words.letterFlicker',
          label: 'Letter flicker',
          hint: 'Higher drops out more letters while a word glitches',
        },
        {
          path: 'words.distress',
          label: 'Worn print',
          hint: 'Eats speckles out of the letters',
        },
        { path: 'words.tilt', label: 'Slab tilt', hint: 'In degrees' },
        { path: 'words.bandHeight', label: 'Slab height' },
        {
          path: 'words.bandOffsetY',
          label: 'Slab vertical offset',
          hint: 'Pixels from the frame center',
        },
        {
          path: 'words.textOffsetY',
          label: 'Word vertical nudge',
          hint: 'Pixels from the slab center',
        },
        { path: 'words.weight', label: 'Word weight' },
        { path: 'words.tracking', label: 'Letter spacing' },
        {
          path: 'words.leadFrames',
          label: 'Pause before words',
          hint: 'Frames the empty light slab shows before the first word',
        },
      ],
    },
    {
      title: 'Loading screen',
      fields: [
        { path: 'wall.title', label: 'Title' },
        { path: 'wall.label', label: 'Bar caption' },
        { path: 'wall.panel', label: 'Blind color' },
      ],
      more: [
        { path: 'wall.frames', label: 'Length', hint: 'In frames' },
        { path: 'wall.titleSize', label: 'Title size' },
        { path: 'wall.labelSize', label: 'Caption size' },
        { path: 'wall.ink', label: 'Text and bar outline color' },
        { path: 'wall.barFill', label: 'Bar fill color' },
        {
          path: 'wall.progressFrom',
          label: 'Bar starts at',
          hint: 'Share filled when the screen appears',
        },
        {
          path: 'wall.progressTo',
          label: 'Bar ends at',
          hint: 'Share filled when the screen ends',
        },
        { path: 'wall.showHandle', label: 'Show handle' },
        { path: 'wall.panelLight', label: 'Glow color', hint: 'Light pooled on the blind' },
        { path: 'wall.light', label: 'Glow strength' },
        { path: 'wall.cabinet', label: 'Housing color' },
        { path: 'wall.shelf', label: 'Shelf color' },
        { path: 'wall.rail', label: 'Rail color', hint: 'Bar along the bottom of the blind' },
        {
          path: 'wall.slot',
          label: 'Slot color',
          hint: 'Dark gap below the blind while it is still raised',
        },
        { path: 'wall.pullFrames', label: 'Pull-down length', hint: 'In frames' },
        {
          path: 'wall.pullDistance',
          label: 'Pull-down distance',
          hint: 'How far above its resting place the blind starts, in pixels',
        },
        {
          path: 'wall.tilt',
          label: 'Scene drop',
          hint: 'Starting vertical offset of the whole scene in pixels, settles with the pull',
        },
        { path: 'wall.zoomFrom', label: 'Start zoom' },
        { path: 'wall.zoomTo', label: 'End zoom' },
        { path: 'wall.vignette', label: 'Vignette' },
        { path: 'wall.softness', label: 'Soft focus', hint: 'Blur in pixels' },
      ],
    },
    {
      title: 'Sign-off',
      fields: [
        { path: 'outro.text', label: 'Sign-off text' },
        { path: 'outro.size', label: 'Text size' },
        { path: 'outro.burn', label: 'Film burn' },
        {
          link: ['outro.burnCore', 'outro.swashColor'],
          label: 'Flash color',
          hint: 'Hot center of the film burn and the swash under the text',
        },
      ],
      more: [
        { path: 'outro.color', label: 'Text color' },
        { path: 'outro.centerY', label: 'Vertical position', hint: 'Pixels from the top' },
        { path: 'outro.tilt', label: 'Text tilt', hint: 'In degrees' },
        {
          path: 'outro.gapFrames',
          label: 'Gap before sign-off',
          hint: 'Empty frames after the loading screen',
        },
        {
          path: 'outro.burnStart',
          label: 'Burn starts at',
          hint: 'Frames after the sign-off appears',
        },
        { path: 'outro.burnColor', label: 'Burn color' },
        { path: 'outro.burnCore', label: 'Burn center color' },
        { path: 'outro.burnStrength', label: 'Burn strength' },
        {
          path: 'outro.burnSeed',
          label: 'Burn pattern',
          hint: 'Changes where the flashes land',
        },
        { path: 'outro.swash', label: 'Underline swash' },
        { path: 'outro.swashColor', label: 'Swash color' },
        {
          path: 'outro.swashStart',
          label: 'Swash starts at',
          hint: 'Frames after the sign-off appears',
        },
        { path: 'outro.swashFrames', label: 'Swash draw length', hint: 'In frames' },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background, LOOK.grain],
      more: [
        LOOK.backgroundEdge,
        LOOK.spotlight,
        LOOK.liveGrain,
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
        {
          ...MOTION.speed,
          hint: 'Scales every beat but not the entrance or exit. The video length stays fixed, so slower speeds cut off the sign-off and faster ones hold on it longer',
        },
        MOTION.enter,
        {
          ...MOTION.exit,
          hint: 'Starts at an exit length of 0, raise it under More options for the exit to show',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float'],
});
