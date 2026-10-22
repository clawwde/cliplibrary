import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { NeonSignFlickerProps } from './neon-sign-flicker';

export const neonSignFlickerControls = defineControls<NeonSignFlickerProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'copy.word', label: 'Neon word', hint: 'Each letter is drawn as a glowing tube' },
        { path: 'copy.subtitle', label: 'Subtitle' },
        { path: 'subtitle.show', label: 'Show subtitle' },
        { path: 'neon.size', label: 'Neon word size', hint: 'In pixels' },
        {
          link: ['subtitle.color', 'brand.color'],
          label: 'Text color',
          hint: 'Subtitle, brand name and tagline',
        },
      ],
      more: [
        { path: 'subtitle.size', label: 'Subtitle size', hint: 'In pixels' },
        {
          link: ['neon.centerX', 'subtitle.centerX'],
          label: 'Horizontal center',
          hint: 'Moves the neon word and subtitle together, in pixels from the left edge',
        },
        { path: 'neon.top', label: 'Neon word top', hint: 'Pixels from the top' },
        { path: 'subtitle.top', label: 'Subtitle top', hint: 'Pixels from the top' },
        { path: 'neon.tracking', label: 'Neon letter spacing', hint: 'In em' },
        { path: 'subtitle.weight', label: 'Subtitle weight' },
        { path: 'subtitle.lineHeight', label: 'Subtitle line height' },
        { path: 'subtitle.tracking', label: 'Subtitle letter spacing', hint: 'In em' },
        {
          path: 'subtitle.shadow',
          label: 'Subtitle shadow',
          hint: 'Darkness of the drop shadow under the subtitle',
        },
        { path: 'subtitle.color', label: 'Subtitle color' },
        {
          path: 'neon.centerX',
          label: 'Neon word center',
          hint: 'Pixels from the left edge',
        },
        {
          path: 'subtitle.centerX',
          label: 'Subtitle center',
          hint: 'Pixels from the left edge',
        },
      ],
    },
    {
      title: 'Flicker',
      fields: [
        {
          path: 'flicker.letter',
          label: 'Flickering letter',
          hint: 'Position in the word, counting from 0 for the first letter. Past the last letter, only the lamp flickers',
        },
        {
          path: 'flicker.holdFrames',
          label: 'Steady glow before flicker',
          hint: 'In frames',
        },
        { path: 'flicker.bursts', label: 'Flicker bursts', hint: 'Number of stutters' },
        {
          path: 'flicker.staysDead',
          label: 'Burns out at the end',
          hint: 'On leaves the letter and lamp dark after the last burst. Off relights them for good',
        },
      ],
      more: [
        { path: 'flicker.firstBurst', label: 'First burst length', hint: 'In frames' },
        {
          path: 'flicker.burstShrink',
          label: 'Burst shortening',
          hint: 'Frames each later burst loses, so the stutters get quicker',
        },
        { path: 'flicker.gap', label: 'Dark pause between bursts', hint: 'In frames' },
        {
          path: 'flicker.gapShrink',
          label: 'Pause shortening',
          hint: 'Frames each pause loses after the first three',
        },
        {
          path: 'flicker.period',
          label: 'Flash length',
          hint: 'Frames per off and on flash inside a burst; lower flickers faster',
        },
      ],
    },
    {
      title: 'Neon',
      fields: [
        {
          link: ['neon.glow', 'brand.accent'],
          label: 'Neon color',
          hint: 'Tube glow and the brand logo ring',
        },
        { path: 'neon.core', label: 'Tube core color', hint: 'The hot center of each tube' },
        { path: 'neon.haze', label: 'Haze color', hint: 'Soft bloom around the word' },
        { path: 'neon.hazeStrength', label: 'Haze strength' },
      ],
      more: [
        { path: 'neon.glow', label: 'Tube glow color' },
        { path: 'neon.tubeWidth', label: 'Tube thickness' },
        { path: 'neon.glowWidth', label: 'Glow width', hint: 'Also widens the haze' },
        { path: 'neon.glowBlur', label: 'Glow softness' },
        { path: 'neon.hazeBlur', label: 'Haze softness' },
        {
          path: 'neon.deadTube',
          label: 'Unlit tube color',
          hint: 'The glass while the flickering letter is dark',
        },
        {
          path: 'neon.deadHighlight',
          label: 'Unlit tube highlight',
          hint: 'Thin edge highlight on the dark glass',
        },
      ],
    },
    {
      title: 'Lamp',
      fields: [
        { path: 'pendant.show', label: 'Show lamp' },
        { path: 'pendant.light', label: 'Light color' },
        {
          path: 'pendant.brightness',
          label: 'Light brightness',
          hint: 'The lamp flickers along with the letter',
        },
        {
          path: 'pendant.sway',
          label: 'Sway angle',
          hint: 'Degrees each way. 0 keeps the lamp still',
        },
      ],
      more: [
        {
          path: 'pendant.idle',
          label: 'Light between bursts',
          hint: 'Lamp level while the letter rests dark, as a share of full brightness',
        },
        { path: 'pendant.x', label: 'Lamp position', hint: 'Pixels from the left edge' },
        {
          path: 'pendant.cordLength',
          label: 'Cord length',
          hint: 'How far the lamp hangs down, in pixels',
        },
        { path: 'pendant.swayPeriod', label: 'Sway cycle', hint: 'Frames per full swing' },
        { path: 'pendant.coneLength', label: 'Light beam length' },
        {
          path: 'pendant.coneSpread',
          label: 'Light beam spread',
          hint: 'Higher widens and softens the beam',
        },
        { path: 'pendant.shade', label: 'Shade color' },
        { path: 'pendant.shadeRim', label: 'Shade highlight' },
        { path: 'pendant.shadeWidth', label: 'Shade width' },
        { path: 'pendant.shadeHeight', label: 'Shade height' },
        { path: 'pendant.cord', label: 'Cord color' },
      ],
    },
    {
      title: 'Brand',
      fields: [
        { path: 'copy.brand', label: 'Brand name' },
        { path: 'copy.brandLine', label: 'Brand tagline' },
        { path: 'copy.website', label: 'Website' },
        {
          link: ['brand.show', 'website.show'],
          label: 'Show brand footer',
          hint: 'Brand lockup and website',
        },
      ],
      more: [
        { path: 'brand.show', label: 'Show brand' },
        { path: 'brand.showMark', label: 'Show logo ring' },
        { path: 'brand.size', label: 'Brand size', hint: 'Scales the name, tagline and logo ring' },
        {
          path: 'brand.color',
          label: 'Brand name color',
          hint: 'Also the tagline, slightly dimmed',
        },
        { path: 'brand.accent', label: 'Logo ring color' },
        { path: 'brand.bottom', label: 'Brand distance from bottom', hint: 'In pixels' },
        { path: 'website.show', label: 'Show website' },
        { path: 'website.color', label: 'Website color' },
        { path: 'website.size', label: 'Website size', hint: 'In pixels' },
        { path: 'website.tracking', label: 'Website letter spacing', hint: 'In em' },
        { path: 'website.bottom', label: 'Website distance from bottom', hint: 'In pixels' },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        LOOK.background,
        {
          path: 'look.ambient',
          label: 'Ambient glow color',
          hint: 'Colored glow behind the sign, blended into the background',
        },
      ],
      more: [
        { path: 'look.ambientStrength', label: 'Ambient glow strength', hint: '0 hides the glow' },
        { path: 'look.ambientWidth', label: 'Ambient glow width', hint: 'In pixels' },
        { path: 'look.ambientHeight', label: 'Ambient glow height', hint: 'In pixels' },
        {
          path: 'look.ambientX',
          label: 'Ambient glow center X',
          hint: 'Pixels from the left edge',
        },
        { path: 'look.ambientY', label: 'Ambient glow center Y', hint: 'Pixels from the top' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        {
          ...MOTION.speed,
          label: 'Animation speed',
          hint: 'Scales the flicker and lamp sway timing. Entrance and exit keep their length',
        },
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['motion.float'],
});
