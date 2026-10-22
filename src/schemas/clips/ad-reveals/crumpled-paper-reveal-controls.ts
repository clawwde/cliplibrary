import { defineControls } from '../../control-layout';
import { MOTION } from '../../control-presets';
import type { CrumpledPaperRevealProps } from './crumpled-paper-reveal';

export const crumpledPaperRevealControls = defineControls<CrumpledPaperRevealProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'print.headline', label: 'Headline', hint: 'Each new line is printed as a row' },
        {
          path: 'print.footer',
          label: 'Footer line',
          hint: 'Small letter-spaced line near the bottom of the sheet; leave empty to hide',
        },
        { path: 'print.ink', label: 'Ink color', hint: 'Headline and footer' },
        { path: 'print.size', label: 'Headline size', hint: 'The footer scales with it' },
      ],
      more: [
        { path: 'print.lineHeight', label: 'Line spacing', hint: 'Relative to the headline size' },
        {
          path: 'print.condense',
          label: 'Letter width',
          hint: 'Squeezes the headline sideways; 1 is the natural width',
        },
        {
          path: 'print.indent',
          label: 'Line stagger',
          hint: 'How far each row shifts right of the one above',
        },
        {
          path: 'print.tilt',
          label: 'Headline tilt',
          hint: 'Rotation in radians; negative turns it counterclockwise',
        },
        { path: 'print.centerX', label: 'Headline position across', hint: '0 is the left edge' },
        { path: 'print.centerY', label: 'Headline position down', hint: '0 is the top edge' },
        {
          path: 'print.footerSize',
          label: 'Footer size',
          hint: 'Relative to the headline size',
        },
        {
          path: 'print.footerY',
          label: 'Footer position down',
          hint: '0 is the top edge of the sheet, 1 the bottom',
        },
      ],
    },
    {
      title: 'Timing',
      fields: [
        { path: 'timing.appearStart', label: 'Ball appears at', hint: 'Frame number' },
        { path: 'timing.unfoldStart', label: 'Unfold starts at', hint: 'Frame number' },
        { path: 'timing.unfoldFrames', label: 'Unfold length', hint: 'In frames' },
        { path: 'timing.pushStart', label: 'Camera push-in starts at', hint: 'Frame number' },
      ],
      more: [
        {
          path: 'timing.rubFrames',
          label: 'Clap length',
          hint: 'In frames from the start; the hands open and close once',
        },
        { path: 'timing.appearFrames', label: 'Ball grow length', hint: 'In frames' },
        {
          path: 'timing.regripStart',
          label: 'Hands settle at',
          hint: 'Frame number where the hands move to their holding grip',
        },
        { path: 'timing.regripFrames', label: 'Hands settle length', hint: 'In frames' },
        { path: 'timing.pushFrames', label: 'Push-in length', hint: 'In frames' },
        { ...MOTION.speed, hint: 'Higher plays the whole sequence faster' },
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exit,
        MOTION.exitFrames,
      ],
    },
    {
      title: 'Paper',
      fields: [
        { path: 'print.paper', label: 'Paper color' },
        { path: 'paper.creases', label: 'Crease count' },
        {
          path: 'paper.leftoverWrinkles',
          label: 'Wrinkles after opening',
          hint: 'How creased the sheet stays once it is flat',
        },
      ],
      more: [
        { path: 'paper.creaseDepth', label: 'Crease depth' },
        {
          path: 'paper.crinkle',
          label: 'Fine crinkle',
          hint: 'Small surface texture in the light',
        },
        { path: 'print.fiber', label: 'Paper fibers' },
        { path: 'paper.roughness', label: 'Paper roughness', hint: 'Lower looks glossier' },
        { path: 'paper.sheen', label: 'Soft sheen' },
        { path: 'paper.ballRadius', label: 'Ball size' },
        { path: 'paper.lumps', label: 'Ball lumpiness' },
        {
          path: 'paper.seed',
          label: 'Crumple pattern',
          hint: 'Pick another number for a different crease layout',
        },
        { path: 'paper.width', label: 'Sheet width' },
        { path: 'paper.height', label: 'Sheet height' },
        { path: 'paper.spin', label: 'Ball spin', hint: 'How far the ball turns while it is held' },
        { path: 'paper.turn', label: 'Open sheet turn', hint: 'Sideways angle once it is open' },
        { path: 'paper.tilt', label: 'Open sheet tilt', hint: 'Roll once it is open' },
      ],
    },
    {
      title: 'Hands',
      fields: [
        { path: 'hands.show', label: 'Show hands' },
        { path: 'hands.skin', label: 'Skin tone' },
        { path: 'hands.sleeve', label: 'Arms', hint: 'Bare forearms or knit sleeves' },
        { path: 'hands.watch', label: 'Show watch' },
      ],
      more: [
        { path: 'hands.sleeveColor', label: 'Sleeve color' },
        { path: 'hands.watchColor', label: 'Watch band color' },
        { path: 'hands.roughness', label: 'Skin roughness', hint: 'Lower looks shinier' },
        { path: 'hands.detail', label: 'Skin detail' },
        { path: 'hands.clap', label: 'Clap width', hint: 'How far the hands open during the clap' },
        {
          path: 'hands.rubSpeed',
          label: 'Rub cycle length',
          hint: 'Frames per back and forth rub; higher is slower',
        },
        { path: 'hands.rubReach', label: 'Rub stroke length' },
        {
          path: 'hands.rubX',
          label: 'Hands start position across',
          hint: 'Where the hands rub and the ball appears',
        },
        {
          path: 'hands.rubY',
          label: 'Hands start height',
          hint: 'Where the hands rub and the ball appears',
        },
        {
          path: 'hands.holdReach',
          label: 'Hold reach',
          hint: 'How far outside the sheet edges the hands hold it once open',
        },
        {
          path: 'hands.gripDepth',
          label: 'Palm distance from sheet',
          hint: 'Gap between the palms and the paper while gripping',
        },
        { path: 'hands.gripCurl', label: 'Finger curl while holding' },
        { path: 'hands.thumbCurl', label: 'Thumb curl while holding' },
      ],
    },
    {
      title: 'Camera',
      fields: [
        {
          link: ['camera.startDistance', 'camera.midDistance'],
          label: 'Wide shot distance',
          hint: 'Camera distance while the paper is balled and unfolding',
        },
        {
          path: 'camera.endDistance',
          label: 'Close-up distance',
          hint: 'Where the push-in ends; lower is closer',
        },
        { path: 'lens.depthOfField', label: 'Background blur', hint: 'Focus stays on the sheet' },
      ],
      more: [
        { path: 'camera.startDistance', label: 'Opening distance' },
        { path: 'camera.midDistance', label: 'Unfold distance' },
        { path: 'camera.fieldOfView', label: 'Field of view' },
        { path: 'camera.handheld', label: 'Handheld shake' },
        { path: 'camera.startX', label: 'Opening framing across' },
        { path: 'camera.startY', label: 'Opening framing height' },
        { path: 'camera.midX', label: 'Unfold framing across' },
        { path: 'camera.midY', label: 'Unfold framing height' },
        { path: 'camera.endX', label: 'Close-up framing across' },
        { path: 'camera.endY', label: 'Close-up framing height' },
        { path: 'lens.focusRange', label: 'Focus depth', hint: 'Higher keeps more in focus' },
        {
          path: 'lens.motionBlur',
          label: 'Motion blur samples',
          hint: 'Not shown in the live preview; 0 or 1 turns it off',
        },
        {
          path: 'lens.shutterAngle',
          label: 'Shutter angle',
          hint: 'Longer blur trails when higher',
        },
      ],
    },
    {
      title: 'Room and light',
      fields: [
        { path: 'room.wall', label: 'Wall color' },
        {
          path: 'room.glow',
          label: 'Wall glow',
          hint: 'Soft light patch on the wall, brightest above the sheet',
        },
        { path: 'light.key', label: 'Key light', hint: 'Main light that casts the shadows' },
        { path: 'light.keyColor', label: 'Key light color' },
      ],
      more: [
        { path: 'light.ambient', label: 'Fill light', hint: 'Lifts the shadows evenly' },
        { path: 'light.softness', label: 'Shadow softness' },
        { path: 'light.reflections', label: 'Reflections' },
        { path: 'light.keyX', label: 'Key light position across' },
        { path: 'light.keyY', label: 'Key light height' },
        { path: 'light.keyZ', label: 'Key light distance in front' },
        { path: 'room.wallDistance', label: 'Wall distance', hint: 'How far behind the sheet' },
      ],
    },
    {
      title: 'Finish',
      fields: [
        { path: 'camera.grain', label: 'Film grain' },
        { path: 'camera.vignette', label: 'Vignette' },
      ],
      more: [
        { path: 'lens.contrast', label: 'Contrast' },
        { path: 'lens.bloom', label: 'Bloom', hint: 'Glow around the brightest highlights' },
        { path: 'lens.ambientOcclusion', label: 'Contact shadows' },
        { path: 'lens.occlusionRadius', label: 'Contact shadow reach' },
      ],
    },
  ],
  hidden: [
    'look.showBackdrop',
    'look.background',
    'look.backgroundEdge',
    'look.ink',
    'look.muted',
    'look.accent',
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
