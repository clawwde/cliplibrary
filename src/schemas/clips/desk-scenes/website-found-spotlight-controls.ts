import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { WebsiteFoundSpotlightProps } from './website-found-spotlight';

export const websiteFoundSpotlightControls = defineControls<WebsiteFoundSpotlightProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'copy.headline', label: 'Headline' },
        {
          path: 'copy.highlight',
          label: 'Highlight word',
          hint: 'Large serif word under the headline',
        },
        { path: 'copy.body', label: 'Body text' },
        {
          link: ['copy.website', 'endCard.website'],
          label: 'Website',
          hint: 'Shown in the top corner and on the end card',
        },
        {
          link: ['copy.email', 'endCard.email'],
          label: 'Email',
          hint: 'Shown in the top corner and on the end card',
        },
      ],
      more: [
        {
          path: 'copy.markLetter',
          label: 'Logo letter',
          hint: 'Shown inside the ring logo on the poster and the end card',
        },
        { path: 'copy.website', label: 'Top corner website' },
        { path: 'copy.email', label: 'Top corner email' },
        { path: 'type.headlineSize', label: 'Headline size' },
        { path: 'type.highlightSize', label: 'Highlight word size' },
        { path: 'type.bodySize', label: 'Body text size' },
        { path: 'type.contactSize', label: 'Top corner contact size' },
        { path: 'type.markSize', label: 'Logo size' },
        { path: 'type.insetX', label: 'Side margin' },
        { path: 'type.headlineTop', label: 'Headline top position', hint: 'Pixels from the top' },
        { path: 'type.markTop', label: 'Logo top position', hint: 'Pixels from the top' },
      ],
    },
    {
      title: 'End card',
      fields: [
        {
          path: 'endCard.show',
          label: 'Show end card',
          hint: 'Irises open from the gold ball into a contact card',
        },
        { path: 'endCard.headline', label: 'End card headline' },
        { path: 'endCard.subline', label: 'End card tagline' },
        { path: 'endCard.brand', label: 'Brand name' },
        { path: 'endCard.phone', label: 'Phone number' },
      ],
      more: [
        {
          path: 'endCard.brandAccent',
          label: 'Brand name second word',
          hint: 'Drawn in the accent color after the brand name',
        },
        { path: 'endCard.website', label: 'End card website' },
        { path: 'endCard.email', label: 'End card email' },
        { path: 'endCard.headlineSize', label: 'Headline size' },
        { path: 'endCard.sublineSize', label: 'Tagline size' },
        {
          path: 'endCard.showCode',
          label: 'Show code tile',
          hint: 'Decorative QR-style tile; it cannot be scanned',
        },
        { path: 'endCard.codeSeed', label: 'Code tile pattern', hint: 'Picks a different pattern' },
        { path: 'endCard.ink', label: 'Headline and logo letter color' },
        {
          path: 'endCard.accent',
          label: 'Accent color',
          hint: 'Tagline, logo ring, code tile frame, brand second word and contact dot',
        },
        { path: 'endCard.brandInk', label: 'Brand name color' },
        { path: 'endCard.contactInk', label: 'Contact text color' },
        { path: 'endCard.backdrop', label: 'Background' },
        {
          path: 'endCard.backdropEdge',
          label: 'Background edge',
          hint: 'Color the background fades to at the top and bottom',
        },
        { path: 'endCard.band', label: 'Contact band color' },
        {
          path: 'endCard.beam',
          label: 'Light beam color',
          hint: 'Also colors the glow around the iris',
        },
        { path: 'endCard.beamOpacity', label: 'Light beam strength' },
        { path: 'endCard.irisFrames', label: 'Iris open length', hint: 'In frames' },
        {
          path: 'endCard.irisX',
          label: 'Iris center across',
          hint: '0 is the left edge, 1 the right',
        },
        { path: 'endCard.irisY', label: 'Iris center down', hint: '0 is the top, 1 the bottom' },
        {
          path: 'endCard.stagger',
          label: 'Delay between items',
          hint: 'In frames, as each line rises in',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        {
          link: ['palette.highlight', 'palette.contact', 'endCard.accent'],
          label: 'Gold accent',
          hint: 'Highlight word, logo ring, top corner website and end card accents',
        },
        { path: 'palette.headline', label: 'Headline color' },
        {
          link: ['palette.body', 'palette.mark'],
          label: 'Text color',
          hint: 'Body text, top corner email and logo letter',
        },
        { path: 'palette.heroPaper', label: 'Gold ball color' },
        { path: 'palette.floor', label: 'Floor color' },
        {
          path: 'palette.sky',
          label: 'Sky color',
          hint: 'Also the haze the far floor fades into',
        },
      ],
      more: [
        {
          path: 'palette.highlight',
          label: 'Highlight word and logo ring color',
          hint: 'Also the line beside the body text',
        },
        { path: 'palette.contact', label: 'Top corner website color' },
        { path: 'palette.body', label: 'Body text and email color' },
        { path: 'palette.mark', label: 'Logo letter color' },
        { path: 'palette.skyEdge', label: 'Sky top color' },
        {
          path: 'palette.paper',
          label: 'Paper balls color',
          hint: 'Every ball except the gold one',
        },
        { path: 'palette.lamp', label: 'Lamp color', hint: 'Also tints the ambient light' },
        { path: 'palette.bulb', label: 'Bulb glow color' },
        {
          path: 'palette.beam',
          label: 'Light beam color',
          hint: 'Also colors the pool of light on the floor',
        },
        { path: 'palette.glow', label: 'Gold ball glow color' },
        { path: 'palette.question', label: 'Question mark color' },
        {
          ...LOOK.showBackdrop,
          hint: 'Off drops the sky, floor color, fog and lens effects, leaving only shadows',
        },
      ],
    },
    {
      title: 'Spotlight',
      fields: [
        {
          path: 'lamp.intensity',
          label: 'Light brightness',
          hint: 'How strongly the lamp lights the floor',
        },
        { path: 'lamp.coneAngle', label: 'Beam width' },
        { path: 'lamp.showQuestion', label: 'Show question mark' },
      ],
      more: [
        { path: 'lamp.beamOpacity', label: 'Visible beam strength' },
        {
          path: 'lamp.beamSoftness',
          label: 'Beam edge fade',
          hint: 'Higher fades the sides of the beam more',
        },
        {
          path: 'lamp.penumbra',
          label: 'Light pool softness',
          hint: 'Higher blurs the edge of the light on the floor',
        },
        { path: 'lamp.floorGlow', label: 'Gold ball glow' },
        { path: 'lamp.questionSize', label: 'Question mark size' },
        {
          path: 'lamp.questionAt',
          label: 'Question mark position',
          hint: 'Along the beam: 0 at the lamp, 1 at the floor',
        },
        { path: 'lamp.targetX', label: 'Aim left or right' },
        {
          path: 'lamp.targetZ',
          label: 'Aim near or far',
          hint: 'Higher aims closer to the camera',
        },
      ],
    },
    {
      title: 'Timing',
      fields: [
        {
          path: 'timing.offStart1',
          label: 'Flicker starts at',
          hint: 'Frame number of the first blackout',
        },
        {
          path: 'timing.onStart3',
          label: 'Light settles on at',
          hint: 'Frame number of the final switch-on',
        },
        { path: 'timing.endCardStart', label: 'End card starts at', hint: 'Frame number' },
      ],
      more: [
        { path: 'timing.onStart1', label: 'First relight at', hint: 'Frame number' },
        { path: 'timing.offStart2', label: 'Second blackout at', hint: 'Frame number' },
        { path: 'timing.onStart2', label: 'Second relight at', hint: 'Frame number' },
        { path: 'timing.offStart3', label: 'Third blackout at', hint: 'Frame number' },
        { path: 'timing.onFrames', label: 'Switch-on length', hint: 'In frames' },
        { path: 'timing.offFrames', label: 'Blackout fade length', hint: 'In frames' },
        {
          path: 'timing.snap',
          label: 'Switch-on snap',
          hint: 'How much of the light pops on at once before easing up',
        },
        {
          path: 'timing.questionFrames',
          label: 'Question mark grow length',
          hint: 'In frames, after each switch-on',
        },
        MOTION.speed,
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exit,
        MOTION.exitFrames,
      ],
    },
    {
      title: 'Scene',
      fields: [
        { path: 'paper.spread', label: 'Paper spread', hint: 'How far apart the paper balls sit' },
        { path: 'paper.size', label: 'Paper ball size', hint: 'Includes the gold ball' },
      ],
      more: [
        { path: 'lamp.scale', label: 'Lamp size' },
        { path: 'lamp.x', label: 'Lamp left or right' },
        { path: 'lamp.z', label: 'Lamp near or far', hint: 'Higher is closer to the camera' },
        { path: 'paper.heroX', label: 'Gold ball left or right' },
        {
          path: 'paper.heroZ',
          label: 'Gold ball near or far',
          hint: 'Higher is closer to the camera',
        },
        { path: 'paper.crumple', label: 'Crumple depth' },
        { path: 'paper.facets', label: 'Surface detail' },
        { path: 'paper.roughness', label: 'Paper roughness', hint: 'Higher is more matte' },
        { path: 'paper.seed', label: 'Crumple pattern', hint: 'Picks a different crumple' },
      ],
    },
    {
      title: 'Camera',
      fields: [
        { path: 'camera.height', label: 'Camera height' },
        { path: 'camera.distance', label: 'Camera distance' },
      ],
      more: [
        { path: 'camera.fieldOfView', label: 'Field of view' },
        {
          path: 'camera.targetZ',
          label: 'Look-at point',
          hint: 'Higher looks closer to the camera',
        },
        {
          path: 'camera.drift',
          label: 'Camera drift',
          hint: 'Slow push-in and sideways drift over the clip',
        },
        {
          path: 'camera.ambient',
          label: 'Ambient light',
          hint: 'Even light everywhere, tinted by the lamp color. Stays on during the flicker',
        },
        {
          path: 'camera.fill',
          label: 'Fill light',
          hint: 'Soft light from the upper left. Stays on during the flicker',
        },
        { path: 'camera.fillColor', label: 'Fill light color' },
        { path: 'camera.fog', label: 'Fog', hint: 'Higher fades the distance into the sky color' },
        { path: 'camera.vignette', label: 'Vignette' },
        { path: 'camera.grain', label: 'Film grain' },
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
