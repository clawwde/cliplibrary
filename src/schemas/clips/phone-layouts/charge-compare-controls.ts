import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { ChargeCompareProps } from './charge-compare';

const keyframe = (step: 'rise' | 'swing' | 'land', name: string, when: string) =>
  [
    { path: `logo.${step}.frame`, label: `${name} at`, hint: when },
    {
      path: `logo.${step}.x`,
      label: `${name} horizontal position`,
      hint: 'Badge center as a share of the video width',
    },
    {
      path: `logo.${step}.y`,
      label: `${name} vertical position`,
      hint: 'Badge center as a share of the video height',
    },
    { path: `logo.${step}.size`, label: `${name} size`, hint: 'Share of the video width' },
  ] as const;

export const chargeCompareControls = defineControls<ChargeCompareProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'copy.headline', label: 'Headline' },
        {
          path: 'copy.highlight',
          label: 'Highlighted words',
          hint: 'Painted with the highlight gradient; must appear exactly in the headline',
        },
        { path: 'copy.leftLabel', label: 'Left phone label' },
        {
          path: 'copy.rightLabel',
          label: 'Right phone label',
          hint: 'Over the phone that charges',
        },
      ],
      more: [
        { path: 'layout.headlineSize', label: 'Headline size', hint: 'In pixels' },
        {
          path: 'layout.headlineY',
          label: 'Headline position',
          hint: 'Center of the line, in pixels from the top',
        },
        { path: 'layout.labelSize', label: 'Phone label size', hint: 'In pixels' },
        {
          path: 'layout.labelY',
          label: 'Phone label position',
          hint: 'Center of the labels, in pixels from the top',
        },
        { path: 'layout.labelSpacing', label: 'Phone label letter spacing', hint: 'In em' },
      ],
    },
    {
      title: 'End card',
      fields: [
        { path: 'copy.wordmark', label: 'Wordmark' },
        { path: 'copy.tagline', label: 'Tagline' },
        { path: 'copy.url', label: 'Button text', hint: 'Typed in letter by letter' },
      ],
      more: [
        { path: 'timing.wordmarkAt', label: 'Wordmark appears at', hint: 'Frame number' },
        { path: 'timing.taglineAt', label: 'Tagline appears at', hint: 'Frame number' },
        { path: 'timing.pillAt', label: 'Button appears at', hint: 'Frame number' },
        {
          path: 'timing.typeDelay',
          label: 'Typing delay',
          hint: 'Frames after the button appears',
        },
        { path: 'timing.typeFrames', label: 'Frames per letter', hint: 'Lower types faster' },
        { path: 'timing.shimmerStart', label: 'Wordmark shimmer starts at', hint: 'Frame number' },
        {
          path: 'timing.shimmerStagger',
          label: 'Shimmer stagger',
          hint: 'Frames between letters',
        },
        { path: 'timing.shimmerFrames', label: 'Shimmer length', hint: 'In frames per letter' },
        { path: 'timing.shimmerBlur', label: 'Shimmer blur', hint: 'In pixels' },
        { path: 'layout.wordmarkSize', label: 'Wordmark size' },
        {
          path: 'layout.wordmarkX',
          label: 'Wordmark horizontal position',
          hint: 'Center, in pixels',
        },
        {
          path: 'layout.wordmarkY',
          label: 'Wordmark vertical position',
          hint: 'Center, in pixels',
        },
        { path: 'layout.taglineSize', label: 'Tagline size' },
        { path: 'layout.taglineSpacing', label: 'Tagline letter spacing', hint: 'In em' },
        {
          path: 'layout.taglineX',
          label: 'Tagline horizontal position',
          hint: 'Center, in pixels',
        },
        { path: 'layout.taglineY', label: 'Tagline vertical position', hint: 'Center, in pixels' },
        { path: 'layout.pillWidth', label: 'Button width' },
        { path: 'layout.pillHeight', label: 'Button height' },
        { path: 'layout.pillBorder', label: 'Button border width' },
        { path: 'layout.pillX', label: 'Button horizontal position', hint: 'Center, in pixels' },
        { path: 'layout.pillY', label: 'Button vertical position', hint: 'Center, in pixels' },
        { path: 'layout.urlSize', label: 'Button text size' },
        { path: 'look.wordmarkInk', label: 'Wordmark color' },
        { path: 'look.taglineInk', label: 'Tagline color' },
        { path: 'look.pillFill', label: 'Button fill', hint: 'Also the arrow' },
        { path: 'look.pillEdge', label: 'Button border color', hint: 'Also the arrow circle' },
        { path: 'look.pillInk', label: 'Button text color' },
      ],
    },
    {
      title: 'Badge',
      fields: [
        { path: 'copy.monogram', label: 'Monogram' },
        { path: 'copy.brand', label: 'Brand name' },
        {
          path: 'copy.brandAccent',
          label: 'Brand name accent',
          hint: 'Follows the brand name, painted with the badge gradient',
        },
      ],
      more: [
        { path: 'copy.badgeLine', label: 'Small line under the name' },
        { path: 'look.badgeFill', label: 'Badge fill' },
        { path: 'look.ringLight', label: 'Badge gradient light end' },
        { path: 'look.ring', label: 'Badge gradient middle' },
        { path: 'look.ringDeep', label: 'Badge gradient deep end' },
        { path: 'look.brandInk', label: 'Brand name color', hint: 'Also the small line' },
        {
          path: 'layout.cornerLogoX',
          label: 'Corner badge horizontal position',
          hint: 'Center, in pixels',
        },
        {
          path: 'layout.cornerLogoY',
          label: 'Corner badge vertical position',
          hint: 'Center, in pixels',
        },
        { path: 'layout.cornerLogoSize', label: 'Corner badge size', hint: 'In pixels' },
      ],
    },
    {
      title: 'Badge animation',
      fields: [
        {
          path: 'logo.appear.frame',
          label: 'Big badge appears at',
          hint: 'Frame number; it fades in over the pop-in length, then rises, swings and lands on the end card',
        },
      ],
      more: [
        {
          path: 'timing.cornerFadeStart',
          label: 'Corner badge fades at',
          hint: 'Frame number; the small badge in the corner fades out here',
        },
        { path: 'timing.cornerFadeFrames', label: 'Corner badge fade length', hint: 'In frames' },
        {
          path: 'logo.appear.x',
          label: 'Appear horizontal position',
          hint: 'Badge center as a share of the video width',
        },
        {
          path: 'logo.appear.y',
          label: 'Appear vertical position',
          hint: 'Badge center as a share of the video height',
        },
        { path: 'logo.appear.size', label: 'Appear size', hint: 'Share of the video width' },
        ...keyframe('rise', 'Rise', 'Frame number; the badge grows and lifts until here'),
        ...keyframe('swing', 'Swing', 'Frame number; the badge sweeps aside until here'),
        ...keyframe('land', 'Land', 'Frame number; the badge settles into its end card spot here'),
      ],
    },
    {
      title: 'Charging',
      fields: [
        {
          path: 'battery.stops',
          label: 'Charge colors',
          hint: 'Battery fill color as the charge rises; the left battery keeps the lowest stop',
          items: { color: 'Color', at: 'Charge progress' },
        },
        { path: 'battery.segments', label: 'Battery bars' },
        { path: 'timing.chargeStart', label: 'Charging starts at', hint: 'Frame number' },
        { path: 'timing.chargeEnd', label: 'Fully charged at', hint: 'Frame number' },
      ],
      more: [
        {
          path: 'battery.emptyLevel',
          label: 'Empty level',
          hint: 'How full the left battery stays and where the right one starts',
        },
        { path: 'battery.fullLevel', label: 'Full level', hint: 'How full the right battery ends' },
        { path: 'timing.cableStart', label: 'Chargers rise from', hint: 'Frame number' },
        {
          path: 'timing.plugFrame',
          label: 'Chargers plug in at',
          hint: 'Frame number; the batteries pop in here',
        },
        {
          path: 'battery.boltFrames',
          label: 'Bolt fade-in',
          hint: 'In frames, from charging start',
        },
        { path: 'battery.boltSize', label: 'Bolt size', hint: 'Share of the battery height' },
        { path: 'battery.width', label: 'Battery width' },
        { path: 'battery.height', label: 'Battery height' },
        { path: 'battery.bottomGap', label: 'Battery gap from phone bottom' },
        { path: 'battery.stroke', label: 'Battery outline thickness' },
        { path: 'battery.inset', label: 'Battery inner padding' },
        { path: 'battery.segmentGap', label: 'Gap between bars' },
        { path: 'look.batteryOutline', label: 'Battery outline color' },
        { path: 'look.bolt', label: 'Bolt color' },
      ],
    },
    {
      title: 'Colors',
      fields: [
        LOOK.background,
        {
          link: ['look.headlineInk', 'look.wordmarkInk'],
          label: 'Text color',
          hint: 'Headline and end card wordmark. The badge and button keep their own text colors',
        },
        {
          link: ['look.labelInk', 'look.taglineInk'],
          label: 'Secondary text color',
          hint: 'Left phone label and end card tagline',
        },
        {
          link: ['look.highlightFrom', 'look.chargedLabelInk'],
          label: 'Highlight color',
          hint: 'Start of the headline gradient and the right phone label',
        },
        { path: 'look.highlightTo', label: 'Highlight gradient end' },
        {
          link: ['look.ring', 'look.pillEdge'],
          label: 'Accent color',
          hint: 'Middle of the badge gradient, the button border and the arrow circle',
        },
        { path: 'look.glow', label: 'Charge glow', hint: 'Grows behind the charging phone' },
      ],
      more: [
        LOOK.showBackdrop,
        { path: 'look.headlineInk', label: 'Headline color' },
        { path: 'look.highlightFrom', label: 'Highlight gradient start' },
        { path: 'look.labelInk', label: 'Left label color' },
        { path: 'look.chargedLabelInk', label: 'Right label color' },
        { path: 'layout.glowRadius', label: 'Glow radius', hint: 'In pixels' },
        { path: 'layout.glowStrength', label: 'Glow strength' },
      ],
    },
    {
      title: 'Phones and chargers',
      fields: [
        {
          path: 'layout.phoneSpread',
          label: 'Distance between phones',
          hint: 'From the center to each phone, in pixels',
        },
        { path: 'layout.phoneWidth', label: 'Phone width' },
        { path: 'layout.phoneHeight', label: 'Phone height' },
      ],
      more: [
        { path: 'layout.phoneTop', label: 'Phone top', hint: 'Top edge, in pixels from the top' },
        { path: 'layout.phoneRadius', label: 'Corner roundness' },
        { path: 'layout.edgeWidth', label: 'Frame thickness' },
        { path: 'layout.bezelWidth', label: 'Bezel thickness' },
        { path: 'look.phoneEdge', label: 'Frame color', hint: 'Also the side buttons' },
        { path: 'look.phoneBezel', label: 'Bezel color' },
        { path: 'look.phoneScreen', label: 'Screen color', hint: 'Also fills the batteries' },
        { path: 'look.island', label: 'Camera island color' },
        {
          path: 'charger.plugGap',
          label: 'Plug gap below phone',
          hint: 'Negative tucks the plug into the phone',
        },
        { path: 'charger.plugWidth', label: 'Plug width' },
        { path: 'charger.plugHeight', label: 'Plug height' },
        { path: 'charger.housingWidth', label: 'Charger head width' },
        { path: 'charger.housingHeight', label: 'Charger head height' },
        { path: 'charger.reliefWidth', label: 'Cable neck width' },
        { path: 'charger.reliefHeight', label: 'Cable neck length' },
        { path: 'charger.cordWidth', label: 'Cable thickness' },
        { path: 'look.cable', label: 'Cable color' },
        { path: 'look.cableShade', label: 'Cable shading', hint: 'Edges of the cable and plug' },
        { path: 'look.plug', label: 'Plug color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        {
          path: 'timing.wipeStart',
          label: 'Wipe to end card at',
          hint: 'Frame number; the comparison clears from the center outward',
        },
        MOTION.speed,
      ],
      more: [
        { path: 'timing.wipeFrames', label: 'Wipe length', hint: 'In frames' },
        { path: 'timing.wipeCenterY', label: 'Wipe center', hint: 'Pixels from the top' },
        { path: 'timing.wipeStretch', label: 'Wipe stretch', hint: 'Higher makes the wipe taller' },
        {
          path: 'timing.popFrames',
          label: 'Pop-in length',
          hint: 'In frames; batteries, badge and end card fade in over this',
        },
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exit,
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: ['motion.float'],
});
