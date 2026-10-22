import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { BatteryChargeSuccessProps } from './battery-charge-success';

const frameNumber = 'Frame number';

export const batteryChargeSuccessControls = defineControls<BatteryChargeSuccessProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'copy.title', label: 'Headline' },
        { path: 'title.size', label: 'Headline size' },
        {
          path: 'battery.showPercent',
          label: 'Show percentage',
          hint: 'The number that counts up inside the battery',
        },
        {
          path: 'copy.suffix',
          label: 'After the number',
          hint: 'Shown right after the percentage',
        },
      ],
      more: [
        { path: 'title.uppercase', label: 'All caps' },
        { path: 'title.tracking', label: 'Letter spacing' },
        {
          path: 'title.y',
          label: 'Headline position',
          hint: 'Distance from the top to the headline center, in pixels',
        },
        {
          path: 'title.warm',
          label: 'Headline color at start',
          hint: 'Blends to the charged color during the color shift',
        },
        { path: 'title.warmLight', label: 'Headline light tone at start' },
        { path: 'title.cool', label: 'Headline color when charged' },
        { path: 'title.coolLight', label: 'Headline light tone when charged' },
        { path: 'title.highlight', label: 'Shine color' },
        {
          path: 'title.sweeps',
          label: 'Shine sweeps',
          hint: 'How many times the shine crosses the headline over the clip',
        },
        { path: 'title.glow', label: 'Headline glow' },
        { path: 'battery.percentSize', label: 'Percentage size' },
        {
          path: 'battery.percentY',
          label: 'Percentage position',
          hint: 'Share of the battery height from the top',
        },
        {
          ...LOOK.ink,
          label: 'Number and label color',
          hint: 'Percentage, cable labels, level ticks and a touch of the bolt',
        },
      ],
    },
    {
      title: 'Cables',
      fields: [
        { path: 'cables.leftTop.label', label: 'Upper left label' },
        { path: 'cables.leftBottom.label', label: 'Lower left label' },
        { path: 'cables.rightTop.label', label: 'Upper right label' },
        { path: 'cables.rightBottom.label', label: 'Lower right label' },
        { path: 'cables.bottom.label', label: 'Bottom label' },
      ],
      more: [
        { path: 'cables.leftTop.show', label: 'Show upper left cable' },
        { path: 'cables.leftBottom.show', label: 'Show lower left cable' },
        { path: 'cables.rightTop.show', label: 'Show upper right cable' },
        { path: 'cables.rightBottom.show', label: 'Show lower right cable' },
        { path: 'cables.bottom.show', label: 'Show bottom cable' },
        { path: 'labels.size', label: 'Label size' },
        { path: 'labels.offset', label: 'Label distance from cable' },
        { path: 'look.labelGlow', label: 'Label glow' },
        { path: 'look.cable', label: 'Cable color', hint: 'Also the plug necks' },
        { path: 'cableShape.width', label: 'Cable thickness' },
        { path: 'cableShape.wave', label: 'Cable ripple' },
        {
          path: 'cableShape.sway',
          label: 'Loose cable sway',
          hint: 'Drift while the cables dangle before plugging in and after unplugging',
        },
        { path: 'look.plug', label: 'Plug color' },
        { path: 'look.plugEdge', label: 'Plug outline color' },
        { path: 'look.plugGlow', label: 'Plug glow', hint: 'Also the soft glow around the cables' },
      ],
    },
    {
      title: 'Sparks',
      fields: [
        {
          link: [
            'cables.leftTop.spark',
            'cables.leftBottom.spark',
            'cables.rightTop.spark',
            'cables.rightBottom.spark',
            'cables.bottom.spark',
          ],
          label: 'Spark color',
          hint: 'Sets every cable at once; also tints the plug bands and label dots after the color shift',
        },
        { path: 'sparks.count', label: 'Sparks per cable', hint: '0 turns the sparks off' },
      ],
      more: [
        { path: 'sparks.size', label: 'Spark size' },
        { path: 'sparks.speed', label: 'Spark speed' },
        { path: 'cables.leftTop.spark', label: 'Upper left spark color' },
        { path: 'cables.leftBottom.spark', label: 'Lower left spark color' },
        { path: 'cables.rightTop.spark', label: 'Upper right spark color' },
        { path: 'cables.rightBottom.spark', label: 'Lower right spark color' },
        { path: 'cables.bottom.spark', label: 'Bottom spark color' },
      ],
    },
    {
      title: 'Charge glow',
      fields: [
        {
          path: 'charge.empty',
          label: 'Glow color at start',
          hint: 'Battery glow, bolt, halo and plug bands before the color shift',
        },
        {
          path: 'charge.mid',
          label: 'Glow color mid shift',
          hint: 'Passed through halfway during the color shift',
        },
        {
          path: 'charge.charged',
          label: 'Glow color when charged',
          hint: 'Also colors the completion ring',
        },
      ],
      more: [
        { path: 'charge.halo', label: 'Halo glow', hint: 'Soft glow behind the battery' },
        {
          path: 'charge.baseGlow',
          label: 'Bottom glow',
          hint: 'Glow rising from the battery floor',
        },
        { path: 'charge.ring', label: 'Completion ring strength', hint: '0 turns the ring off' },
        { path: 'charge.ringFrames', label: 'Completion ring length', hint: 'In frames' },
      ],
    },
    {
      title: 'Liquid',
      fields: [
        {
          path: 'charge.liquidTopFull',
          label: 'Top color when full',
          hint: 'The liquid blends from its low colors to these as it fills',
        },
        { path: 'charge.liquidBottomFull', label: 'Bottom color when full' },
      ],
      more: [
        { path: 'charge.liquidTopLow', label: 'Top color when low' },
        { path: 'charge.liquidBottomLow', label: 'Bottom color when low' },
        {
          path: 'charge.percentInLiquid',
          label: 'Number color under the liquid',
          hint: 'The part of the percentage and bolt covered by the liquid',
        },
        { path: 'liquid.waveHeight', label: 'Wave height' },
        { path: 'liquid.waveLength', label: 'Wave length' },
        { path: 'liquid.waveSpeed', label: 'Wave speed' },
        { path: 'liquid.backWave', label: 'Back wave strength', hint: '0 hides the back wave' },
        { path: 'liquid.backTint', label: 'Back wave tint' },
        {
          path: 'liquid.bubbles',
          label: 'Bubble count',
          hint: 'Rise under the surface from shortly before full charge until it drains; 0 turns them off',
        },
        {
          path: 'liquid.headroom',
          label: 'Space above full liquid',
          hint: 'Share of the battery left empty at 100%',
        },
      ],
    },
    {
      title: 'Battery',
      fields: [
        { path: 'battery.width', label: 'Width' },
        { path: 'battery.height', label: 'Height' },
        {
          path: 'battery.top',
          label: 'Top position',
          hint: 'Distance from the top to the battery body, in pixels',
        },
      ],
      more: [
        { path: 'battery.radius', label: 'Corner roundness' },
        { path: 'look.outline', label: 'Outline color' },
        { path: 'battery.stroke', label: 'Outline thickness' },
        { path: 'look.outlineGlow', label: 'Outline glow' },
        { path: 'look.interior', label: 'Inside color', hint: 'Also fills the plug tips' },
        {
          path: 'battery.inset',
          label: 'Liquid inset',
          hint: 'Gap between the outline and the liquid',
        },
        { path: 'battery.cap', label: 'Cap color' },
        { path: 'battery.capWidth', label: 'Cap width' },
        { path: 'battery.capHeight', label: 'Cap height' },
        { path: 'battery.boltSize', label: 'Bolt size', hint: '0 hides the bolt' },
        {
          path: 'battery.boltY',
          label: 'Bolt position',
          hint: 'Share of the battery height from the top',
        },
        { path: 'battery.ticks', label: 'Level ticks', hint: '0 hides them' },
        { path: 'battery.tickWidth', label: 'Tick width' },
        {
          path: 'battery.upperRow',
          label: 'Upper sockets position',
          hint: 'Where the upper side cables plug in, as a share of the height from the top',
        },
        {
          path: 'battery.lowerRow',
          label: 'Lower sockets position',
          hint: 'Where the lower side cables plug in, as a share of the height from the top',
        },
      ],
    },
    {
      title: 'Timing',
      fields: [
        { path: 'timing.plugFrame', label: 'Side cables plug in', hint: frameNumber },
        {
          path: 'timing.fullFrame',
          label: 'Fully charged at',
          hint: 'Frame the count reaches 100',
        },
        { path: 'timing.unplugFrame', label: 'Cables unplug at', hint: frameNumber },
      ],
      more: [
        { path: 'timing.riseStart', label: 'Cables start rising', hint: frameNumber },
        { path: 'timing.bottomPlugFrame', label: 'Bottom cable plugs in', hint: frameNumber },
        { path: 'timing.colorShiftStart', label: 'Color shift starts', hint: frameNumber },
        { path: 'timing.colorShiftFrames', label: 'Color shift length', hint: 'In frames' },
        { path: 'timing.chargeStart', label: 'Charging starts', hint: frameNumber },
        { path: 'timing.drainFrames', label: 'Drain length', hint: 'In frames' },
      ],
    },
    {
      title: 'Background',
      fields: [LOOK.showBackdrop, LOOK.background],
      more: [
        LOOK.backgroundEdge,
        {
          path: 'look.ambientTint',
          label: 'Glow tint',
          hint: 'How much the charge glow color tints the background',
        },
      ],
    },
    {
      title: 'Motion',
      fields: [MOTION.enter, MOTION.exit, MOTION.speed],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['motion.float'],
});
