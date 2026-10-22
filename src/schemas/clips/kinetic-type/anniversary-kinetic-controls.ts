import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { AnniversaryKineticProps } from './anniversary-kinetic';

export const anniversaryKineticControls = defineControls<AnniversaryKineticProps>({
  sections: [
    {
      title: 'Words',
      fields: [
        {
          path: 'beats',
          label: 'Words',
          hint: 'Each word holds from its start frame until the next word starts. Delays and lengths count frames from the word start. Effect timing is frames per letter for typing, sweeps and track-ins, and the frame a flash cut or drop lands. Triple stack words take the chrome colors instead of the word color',
          items: {
            text: 'Word',
            start: 'Starts at frame',
            effect: 'Animation',
            backdrop: 'Background',
            color: 'Word color',
            size: 'Text size',
            weight: 'Font weight',
            tracking: 'Letter spacing',
            spread: 'Opening spread',
            zoom: 'Zoom amount',
            rate: 'Effect timing',
            ghost: 'Untyped letter opacity',
            glitch: 'Glitch length',
            glitchAt: 'Glitch delay',
            pulseAt: 'Blur pulse delay',
            pulseBlur: 'Blur pulse strength',
            decor: 'Giant outline letters',
            decorText: 'Outline text',
            decorSize: 'Outline size',
            decorX: 'Outline horizontal offset',
            decorY: 'Outline vertical offset',
            decorFillAt: 'Outline fill flash delay',
            decorFill: 'Outline fill flash length',
          },
        },
      ],
    },
    {
      title: 'Logo',
      fields: [
        {
          path: 'logo.number',
          label: 'Anniversary number',
          hint: 'The seal number. The matching words in the sequence are edited under Words',
        },
        { path: 'logo.ordinal', label: 'Number suffix', hint: 'For example th, st or nd' },
        { path: 'logo.name', label: 'Brand name' },
        { path: 'logo.since', label: 'Founded line' },
        { path: 'logo.tagline', label: 'Tagline' },
        {
          link: ['logo.numberColor', 'logo.initialColor'],
          label: 'Logo accent color',
          hint: 'Seal number, dashed ring, divider lines and the first letter of the name',
        },
      ],
      more: [
        { path: 'logo.caption', label: 'Seal caption' },
        {
          path: 'logo.start',
          label: 'Logo appears at',
          hint: 'Frame number. Words starting after it never show',
        },
        { path: 'logo.size', label: 'Logo size' },
        { path: 'logo.blur', label: 'Blur-in strength', hint: 'In pixels' },
        { path: 'logo.blurFrames', label: 'Blur-in length', hint: 'In frames' },
        {
          path: 'logo.numberColor',
          label: 'Seal number color',
          hint: 'Also the dashed ring and divider lines',
        },
        { path: 'logo.initialColor', label: 'Name first letter color' },
        { path: 'logo.ringColor', label: 'Seal ring, suffix and caption color' },
        { path: 'logo.nameColor', label: 'Name and founded line color' },
        { path: 'logo.taglineColor', label: 'Tagline color' },
      ],
    },
    {
      title: 'Background',
      fields: [
        { ...LOOK.showBackdrop, label: 'Show backgrounds' },
        {
          path: 'look.ink',
          label: 'Ink background',
          hint: 'Also around the band, after a flash cut, and the sparkles on paper',
        },
        {
          link: ['look.paper', 'logo.background'],
          label: 'Paper background',
          hint: 'Paper words and the logo ending',
        },
        { path: 'look.night', label: 'Night background' },
        { path: 'look.dusk', label: 'Dusk background' },
      ],
      more: [
        { path: 'look.paper', label: 'Paper background for words' },
        { path: 'logo.background', label: 'Logo background' },
      ],
    },
    {
      title: 'Word colors',
      fields: [
        {
          path: 'look.gradientFrom',
          label: 'Gradient start',
          hint: 'Also the band top edge and every third sparkle',
        },
        { path: 'look.gradientMid', label: 'Gradient middle' },
        { path: 'look.gradientTo', label: 'Gradient end', hint: 'Also the band bottom edge' },
        {
          path: 'look.muted',
          label: 'Unlit letter color',
          hint: 'Letters fade from this color as they type, sweep or fill in',
        },
      ],
      more: [
        {
          path: 'look.stroke',
          label: 'Giant outline color',
          hint: 'On paper backgrounds the outline uses the word color instead',
        },
        { path: 'look.strokeWidth', label: 'Giant outline width', hint: 'In pixels' },
        { path: 'look.shape', label: 'Giant outline fill flash color' },
        { path: 'look.slant', label: 'Slanted repeat color' },
        {
          path: 'look.flash',
          label: 'Flash cut color',
          hint: 'Fills the first frame of a flash cut word',
        },
        { path: 'look.dim', label: 'Word color before the cut' },
        { path: 'chrome.topStart', label: 'Chrome top line, upper color' },
        { path: 'chrome.topEnd', label: 'Chrome top line, lower color' },
        { path: 'chrome.middleStart', label: 'Chrome middle line, upper color' },
        { path: 'chrome.middleEnd', label: 'Chrome middle line, lower color' },
        { path: 'chrome.bottomStart', label: 'Chrome bottom line, upper color' },
        { path: 'chrome.bottomEnd', label: 'Chrome bottom line, lower color' },
      ],
    },
    {
      title: 'Texture and band',
      fields: [
        { path: 'look.texture', label: 'Texture highlight' },
        { path: 'look.textureShade', label: 'Texture shadow' },
        {
          path: 'look.bandHeight',
          label: 'Band height',
          hint: 'Share of the frame height covered by the slanted band',
        },
        { path: 'band.tilt', label: 'Band tilt', hint: 'In degrees' },
      ],
      more: [
        { path: 'look.textureContrast', label: 'Texture contrast' },
        {
          path: 'look.textureDrift',
          label: 'Texture drift speed',
          hint: 'How fast the grain slides across the frame',
        },
        { path: 'band.edge', label: 'Band edge thickness', hint: 'In pixels' },
      ],
    },
    {
      title: 'Effects',
      fields: [
        {
          path: 'look.glitchAmount',
          label: 'Glitch strength',
          hint: 'Scales every word glitch; 0 turns glitches off',
        },
        { path: 'look.dustCount', label: 'Sparkle count' },
        {
          path: 'look.dust',
          label: 'Sparkle color',
          hint: 'Every third sparkle uses the gradient start, and all of them turn ink on paper',
        },
      ],
      more: [
        {
          path: 'sparkles.size',
          label: 'Sparkle size',
          hint: 'Smallest sparkle in pixels; the largest are twice this',
        },
        { path: 'sparkles.opacity', label: 'Sparkle opacity' },
        {
          path: 'sparkles.speed',
          label: 'Sparkle float speed',
          hint: 'How fast the sparkles rise and sway. 0 holds them still',
        },
        {
          path: 'look.drift',
          label: 'Word drift',
          hint: 'How much each word and its giant outline slowly shrink while on screen',
        },
        {
          path: 'look.glitchSeed',
          label: 'Random seed',
          hint: 'Reshuffles the glitch pattern, texture grain and sparkle positions',
        },
      ],
    },
    {
      title: 'Motion',
      fields: [
        {
          ...MOTION.speed,
          hint: 'Higher plays the words and logo faster; the clip length, entrance and exit stay the same',
        },
        MOTION.enter,
        MOTION.exit,
      ],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['motion.float'],
});
