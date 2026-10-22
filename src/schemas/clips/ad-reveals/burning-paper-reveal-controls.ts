import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { BurningPaperRevealProps } from './burning-paper-reveal';

const FROM_LEFT = "Pixels from the paper's left edge";
const BASELINE = "Baseline, pixels from the paper's top edge";

export const burningPaperRevealControls = defineControls<BurningPaperRevealProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'copy.headline', label: 'Headline' },
        {
          path: 'type.headlineSize',
          label: 'Headline size',
          hint: 'In pixels. Lower it for longer headlines so they stay on the paper',
        },
        { path: 'copy.kicker', label: 'Top line', hint: 'Handwritten, above the headline' },
        { path: 'copy.aside', label: 'Side note', hint: 'Handwritten, beside the headline' },
        { path: 'copy.footer', label: 'Footer line', hint: 'Shown in capitals' },
        { path: 'type.ink', label: 'Print color', hint: 'Headline, footer and border line' },
        {
          path: 'type.accent',
          label: 'Handwriting color',
          hint: 'Top line, side note and the underline swoosh',
        },
      ],
      more: [
        { path: 'type.underline', label: 'Underline swoosh' },
        {
          link: ['type.kickerSize', 'type.asideSize'],
          label: 'Handwriting size',
          hint: 'Sets the top line and side note together',
        },
        { path: 'type.kickerSize', label: 'Top line size' },
        { path: 'type.asideSize', label: 'Side note size' },
        { path: 'type.footerSize', label: 'Footer size' },
        { path: 'type.headlineX', label: 'Headline X', hint: FROM_LEFT },
        { path: 'type.headlineY', label: 'Headline Y', hint: BASELINE },
        { path: 'type.kickerX', label: 'Top line X', hint: FROM_LEFT },
        { path: 'type.kickerY', label: 'Top line Y', hint: BASELINE },
        {
          path: 'type.asideX',
          label: 'Side note right edge',
          hint: "Pixels from the paper's left edge, the note ends here",
        },
        { path: 'type.asideY', label: 'Side note Y', hint: BASELINE },
        { path: 'type.footerX', label: 'Footer X', hint: FROM_LEFT },
        { path: 'type.footerY', label: 'Footer Y', hint: BASELINE },
      ],
    },
    {
      title: 'Burn',
      fields: [
        { path: 'burn.startFrame', label: 'Burn starts at', hint: 'Frame number' },
        { path: 'burn.endFrame', label: 'Burn ends at', hint: 'Frame number' },
        { path: 'burn.ragged', label: 'Edge roughness', hint: 'In pixels' },
      ],
      more: [
        {
          path: 'burn.from',
          label: 'Revealed at start',
          hint: 'Share of the paper width showing when the burn starts',
        },
        {
          path: 'burn.to',
          label: 'Revealed at end',
          hint: 'Share of the paper width showing at the end, above 1 the edge clears the paper',
        },
        { path: 'burn.slant', label: 'Edge slant', hint: 'Negative leans the edge the other way' },
        {
          path: 'burn.crumple',
          label: 'Early crumple',
          hint: 'Extra roughness and ash while the burn is young',
        },
        { path: 'burn.charWidth', label: 'Char band width', hint: 'In pixels' },
        {
          path: 'burn.scorchWidth',
          label: 'Scorch width',
          hint: 'Brown singe beside the edge, in pixels',
        },
        {
          path: 'burn.ember',
          label: 'Ember color',
          hint: 'Glowing edge line, sparks and the warm spill on the paper',
        },
        { path: 'burn.char', label: 'Char color' },
        { path: 'burn.scorch', label: 'Scorch color' },
        {
          path: 'burn.seed',
          label: 'Edge variation',
          hint: 'Changes the edge shape, flicker and sparks',
        },
      ],
    },
    {
      title: 'Flames',
      fields: [
        { path: 'flame.height', label: 'Flame height' },
        { path: 'flame.intensity', label: 'Flame brightness' },
        { path: 'flame.embers', label: 'Sparks', hint: 'Number of flying sparks' },
      ],
      more: [
        { path: 'flame.core', label: 'Core color' },
        { path: 'flame.mid', label: 'Middle color', hint: 'Also tints the firelight' },
        { path: 'flame.outer', label: 'Outer color' },
        { path: 'flame.tip', label: 'Tip color' },
        { path: 'flame.width', label: 'Flame width' },
        {
          path: 'flame.spread',
          label: 'Flame coverage',
          hint: 'How far down the edge the flames reach',
        },
        { path: 'flame.turbulence', label: 'Flame sway', hint: 'Sideways wobble, in pixels' },
        {
          path: 'flame.speed',
          label: 'Fire speed',
          hint: 'How fast the flames rise and flicker, and how fast sparks, smoke and heat haze move',
        },
        {
          link: ['flame.glow', 'flame.handGlow'],
          label: 'Fire glow',
          hint: 'Halo around the flames and firelight on the hand',
        },
        { path: 'flame.glow', label: 'Flame halo' },
        { path: 'flame.handGlow', label: 'Firelight on hand' },
        { path: 'flame.wallGlow', label: 'Firelight on wall' },
        { path: 'flame.paperGlow', label: 'Firelight on paper' },
        { path: 'flame.shimmer', label: 'Heat haze', hint: 'Ripples the wall above the flames' },
        { path: 'flame.smoke', label: 'Smoke' },
        { path: 'flame.smokeColor', label: 'Smoke color' },
        {
          path: 'flame.fadeStart',
          label: 'Flames die down from',
          hint: 'Frame number, the glow fades with them',
        },
        { path: 'flame.fadeEnd', label: 'Flames out at', hint: 'Frame number' },
      ],
    },
    {
      title: 'Paper',
      fields: [
        { path: 'paper.color', label: 'Paper color' },
        { path: 'paper.tilt', label: 'Paper tilt', hint: 'In degrees' },
      ],
      more: [
        { path: 'paper.width', label: 'Paper width' },
        { path: 'paper.height', label: 'Paper height' },
        { path: 'paper.x', label: 'Paper X', hint: 'Left edge, screen pixels before zoom' },
        { path: 'paper.y', label: 'Paper Y', hint: 'Top edge, screen pixels before zoom' },
        { path: 'paper.shadow', label: 'Paper shadow', hint: 'Shadow cast on the wall' },
        {
          path: 'paper.shade',
          label: 'Paper shading',
          hint: 'Darkness of the folds and the top to bottom falloff',
        },
        { path: 'paper.bend', label: 'Paper bend', hint: 'Curve of the edges and fold highlights' },
        { path: 'paper.fibre', label: 'Paper texture' },
        { path: 'paper.border', label: 'Border line', hint: 'Thin printed frame, 0 hides it' },
      ],
    },
    {
      title: 'Hand',
      fields: [
        { path: 'hand.show', label: 'Show hand' },
        { path: 'hand.skin', label: 'Skin tone' },
      ],
      more: [
        { path: 'hand.sleeve', label: 'Sleeve', hint: 'Off shows a bare arm' },
        { path: 'hand.sleeveColor', label: 'Sleeve color' },
        { path: 'hand.bracelet', label: 'Bracelet' },
        { path: 'hand.braceletColor', label: 'Bracelet color' },
        { path: 'hand.shadow', label: 'Hand shadow', hint: 'Shadow the hand casts on the paper' },
        { path: 'hand.scale', label: 'Hand size' },
        { path: 'hand.x', label: 'Grip X', hint: "Pixels from the paper's left edge" },
        { path: 'hand.y', label: 'Grip Y', hint: "Pixels from the paper's top edge" },
        { path: 'hand.depth', label: 'Hand depth', hint: 'Negative tucks it behind the paper' },
        { path: 'hand.grip', label: 'Finger curl' },
        { path: 'hand.thumb', label: 'Thumb curl' },
        { path: 'hand.thumbSpread', label: 'Thumb reach' },
        { path: 'hand.turn', label: 'Hand roll', hint: 'In radians' },
        { path: 'hand.pitch', label: 'Hand pitch', hint: 'In radians' },
        { path: 'hand.yaw', label: 'Hand yaw', hint: 'In radians' },
        { path: 'hand.elbowX', label: 'Arm direction X', hint: 'Where the forearm points' },
        { path: 'hand.elbowY', label: 'Arm direction Y', hint: 'Where the forearm points' },
      ],
    },
    {
      title: 'Background',
      fields: [
        {
          ...LOOK.showBackdrop,
          label: 'Show wall',
          hint: 'Off drops the wall, paper shadow, firelight on the wall and heat haze for a transparent background',
        },
        { path: 'backdrop.upper', label: 'Upper wall' },
        { path: 'backdrop.side', label: 'Left wall' },
        { path: 'backdrop.wall', label: 'Lower wall' },
      ],
      more: [
        {
          path: 'backdrop.upperEdge',
          label: 'Upper wall edge',
          hint: 'Color the upper wall fades to away from the corner',
        },
        { path: 'backdrop.wallDeep', label: 'Lower wall shade' },
        { path: 'backdrop.apexX', label: 'Wall corner X', hint: 'Screen pixels' },
        { path: 'backdrop.apexY', label: 'Wall corner Y', hint: 'Screen pixels' },
      ],
    },
    {
      title: 'Camera and timing',
      fields: [
        {
          path: 'camera.zoomFrom',
          label: 'Start zoom',
          hint: 'How close the paper starts. It eases out to full frame by Zoom settles at',
        },
        {
          ...MOTION.speed,
          hint: 'Scales the burn, flames, camera and end card timing. Entrance and exit keep their length',
        },
      ],
      more: [
        { path: 'camera.handheld', label: 'Handheld shake' },
        { path: 'camera.zoomHold', label: 'Mid zoom', hint: 'Zoom held while the burn plays' },
        { path: 'camera.holdStart', label: 'Zoom hold starts at', hint: 'Frame number' },
        { path: 'camera.holdEnd', label: 'Zoom hold ends at', hint: 'Frame number' },
        {
          path: 'camera.zoomFrames',
          label: 'Zoom settles at',
          hint: 'Frame number where the view reaches full frame',
        },
        {
          path: 'camera.pivotX',
          label: 'Zoom center X',
          hint: 'Screen point the paper zooms around',
        },
        {
          path: 'camera.pivotY',
          label: 'Zoom center Y',
          hint: 'Screen point the paper zooms around',
        },
        {
          path: 'camera.driftY',
          label: 'Wall drift',
          hint: 'Starting vertical offset of the wall, eases to 0, in pixels',
        },
        { path: 'camera.driftFrames', label: 'Wall drift length', hint: 'In frames' },
        {
          path: 'camera.wallRoll',
          label: 'Wall roll',
          hint: 'Starting rotation of the wall in degrees, eases to 0',
        },
        { path: 'camera.rollFrames', label: 'Wall roll length', hint: 'In frames' },
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exit,
        MOTION.exitFrames,
      ],
    },
    {
      title: 'End card',
      fields: [
        { path: 'brandCard.show', label: 'Show end card' },
        { path: 'brandCard.name', label: 'Brand name' },
        { path: 'brandCard.tagline', label: 'Tagline' },
      ],
      more: [
        { path: 'brandCard.background', label: 'Card color' },
        { path: 'brandCard.ink', label: 'Card text color' },
        { path: 'brandCard.nameSize', label: 'Name size' },
        { path: 'brandCard.taglineSize', label: 'Tagline size' },
        { path: 'brandCard.start', label: 'Card appears at', hint: 'Frame number' },
        { path: 'brandCard.fadeFrames', label: 'Card fade length', hint: 'In frames' },
      ],
    },
  ],
  hidden: [
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
