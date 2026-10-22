import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { GridStackProps } from './grid-stack';

export const gridStackControls = defineControls<GridStackProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        {
          path: 'text',
          label: 'Phrases',
          hint: 'One phrase per line. Each builds word by word, then flies out for the next',
        },
        {
          path: 'highlight',
          label: 'Big words',
          hint: 'Words listed here are drawn large in the big word color; the rest stay small',
        },
        { path: 'face', label: 'Font' },
        { path: 'weight', label: 'Font weight' },
      ],
    },
    {
      title: 'Colors',
      fields: [
        { ...LOOK.ink, label: 'Small word color' },
        {
          ...LOOK.accent,
          label: 'Big word color',
          hint: 'Also tints the corner glow once its strength is above 0',
        },
        { ...LOOK.background, hint: 'Color at the center of the background' },
        LOOK.backgroundEdge,
      ],
      more: [
        {
          ...LOOK.showBackdrop,
          hint: 'Off renders the words and grid over transparency',
        },
        {
          path: 'lens.glow',
          label: 'Corner glow',
          hint: 'Washes the background with the big word color. 0 is off',
        },
        { path: 'lens.glowX', label: 'Glow position across', hint: '0 is left, 1 is right' },
        { path: 'lens.glowY', label: 'Glow position up', hint: '0 is bottom, 1 is top' },
      ],
    },
    {
      title: 'Stack',
      fields: [
        { path: 'bigSize', label: 'Big word size' },
        { path: 'smallSize', label: 'Small word size' },
        { path: 'maxWidth', label: 'Stack width', hint: 'Words shrink to fit inside this width' },
        {
          path: 'bend',
          label: 'Word curve',
          hint: 'Bends each word like a curved banner; negative values curve the other way',
        },
      ],
      more: [
        {
          path: 'gap',
          label: 'Line spacing',
          hint: 'Space between stacked words, as a fraction of the smaller word height. 0 makes them touch',
        },
        {
          path: 'offset',
          label: 'Small word stagger',
          hint: 'Pushes small words alternately left and right of center, as a fraction of the stack width',
        },
      ],
    },
    {
      title: 'Timing',
      fields: [
        { path: 'wordGap', label: 'Frames between words', hint: 'Lower builds each phrase faster' },
        {
          path: 'holdFrames',
          label: 'Hold before exit',
          hint: 'Frames a finished phrase stays before it flies out',
        },
        {
          link: ['arriveFrames', 'settleFrames', 'exitFrames'],
          label: 'Word move length',
          hint: 'Sets word arrival, stack settle and phrase exit together. In frames',
        },
      ],
      more: [
        { path: 'delay', label: 'Start delay', hint: 'In frames' },
        {
          path: 'arriveFrames',
          label: 'Word arrival length',
          hint: 'Frames each word takes to rise into place',
        },
        {
          path: 'settleFrames',
          label: 'Stack settle length',
          hint: 'Frames the stack takes to recenter as each word lands',
        },
        {
          path: 'exitFrames',
          label: 'Phrase exit length',
          hint: 'Frames each phrase takes to fly out; the last phrase stays on screen',
        },
      ],
    },
    {
      title: 'Camera',
      fields: [
        {
          path: 'swing',
          label: 'Camera swing',
          hint: 'Degrees the camera turns to alternate sides between phrases',
        },
        {
          path: 'tilt',
          label: 'Camera tilt',
          hint: 'Degrees the camera rolls and pitches between phrases',
        },
        {
          path: 'lens.distortion',
          label: 'Fisheye',
          hint: 'Barrel lens warp of the whole frame; 0 is flat',
        },
        {
          path: 'lens.shutter',
          label: 'Motion blur',
          hint: 'Shutter length in frames; 0 is sharp',
        },
      ],
      more: [
        { path: 'camera.drift', label: 'Camera drift', hint: 'Gentle handheld wobble' },
        { path: 'camera.distance', label: 'Camera distance' },
        { path: 'camera.fieldOfView', label: 'Field of view' },
        {
          path: 'lens.samples',
          label: 'Motion blur quality',
          hint: 'Frames blended per rendered frame; the preview uses at most 3',
        },
        { path: 'lens.fringe', label: 'Edge color fringe' },
        {
          path: 'lens.shift',
          label: 'Color split',
          hint: 'Red and blue shift sideways, in pixels at 1920 wide',
        },
        { path: 'lens.grain', label: 'Film grain', hint: 'Only shows while the background is on' },
      ],
    },
    {
      title: 'Grid',
      fields: [
        { path: 'grid.show', label: 'Show grid' },
        { path: 'grid.color', label: 'Grid color' },
        {
          path: 'grid.bulge',
          label: 'Grid bulge',
          hint: 'How far the grid domes toward the camera at the center',
        },
      ],
      more: [
        { path: 'gridOpacity', label: 'Grid opacity' },
        { path: 'grid.spacing', label: 'Grid cell size' },
        { path: 'grid.lineWidth', label: 'Grid line width' },
        {
          path: 'grid.depth',
          label: 'Grid depth',
          hint: 'How far behind the words the grid sits; lower pushes it further back',
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
          hint: 'Scales the word, stack and camera timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: [
    'look.muted',
    'look.grain',
    'look.liveGrain',
    'look.spotlight',
    'look.paper',
    'look.paperLine',
    'look.paperSpacing',
    'look.paperMargin',
    'motion.float',
  ],
});
