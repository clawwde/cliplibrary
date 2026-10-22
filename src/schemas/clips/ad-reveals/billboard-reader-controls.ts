import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { BillboardReaderProps } from './billboard-reader';

export const billboardReaderControls = defineControls<BillboardReaderProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        {
          path: 'board.headline',
          label: 'Headline',
          hint: 'Each line is a row; with two or more rows the last one can use the highlight color',
        },
        { path: 'board.tagline', label: 'Tagline' },
        { path: 'board.brand', label: 'Brand name', hint: 'Shown beside the star in the corner' },
        {
          path: 'board.headlineSize',
          label: 'Headline size',
          hint: 'Three or more rows are set smaller automatically',
        },
      ],
      more: [
        {
          path: 'board.textWidth',
          label: 'Headline width limit',
          hint: 'Share of the board the headline may span before it shrinks to fit',
        },
        {
          path: 'board.highlightLastLine',
          label: 'Highlight the last headline line',
        },
      ],
    },
    {
      title: 'Colors',
      fields: [
        { path: 'board.paper', label: 'Board background' },
        {
          link: ['board.headlineColor', 'board.brandColor'],
          label: 'Text color',
          hint: 'Headline and brand name',
        },
        {
          link: ['board.accentColor', 'board.markColor', 'hero.emblem'],
          label: 'Accent color',
          hint: "Headline highlight, corner brackets, tagline rule, logo star and the hero's chest emblem",
        },
      ],
      more: [
        { path: 'board.headlineColor', label: 'Headline color' },
        {
          path: 'board.accentColor',
          label: 'Highlight color',
          hint: 'Last headline line, corner brackets and the rule above the tagline',
        },
        { path: 'board.taglineColor', label: 'Tagline color' },
        { path: 'board.brandColor', label: 'Brand name color' },
        { path: 'board.markColor', label: 'Logo star color' },
      ],
    },
    {
      title: 'Billboard',
      fields: [
        { path: 'board.lamps', label: 'Billboard lamps' },
        { path: 'board.lampColor', label: 'Lamp light color' },
        {
          path: 'timing.lampsStart',
          label: 'Lamps switch on at',
          hint: 'Frame number of the first lamp',
        },
      ],
      more: [
        { path: 'board.lampGlow', label: 'Lamp brightness' },
        { path: 'timing.lampsFrames', label: 'Lamp warm-up', hint: 'In frames per lamp' },
        {
          path: 'timing.lampsStagger',
          label: 'Delay between lamps',
          hint: 'In frames; lamps light from left to right',
        },
        {
          link: ['board.frame', 'board.pole'],
          label: 'Steel color',
          hint: 'Frame, catwalk, lamp housings and pole',
        },
        {
          path: 'board.frame',
          label: 'Frame color',
          hint: 'Frame, catwalk, back truss and lamp housings',
        },
        { path: 'board.pole', label: 'Pole color' },
        {
          path: 'board.yaw',
          label: 'Board angle',
          hint: 'Turns the billboard and the hero toward the left or right',
        },
      ],
    },
    {
      title: 'Hero',
      fields: [
        { path: 'hero.suit', label: 'Suit color' },
        { path: 'hero.cape', label: 'Cape color' },
        { path: 'hero.scale', label: 'Hero size' },
      ],
      more: [
        { path: 'hero.trim', label: 'Boots, gloves and belt color' },
        { path: 'hero.visor', label: 'Visor color' },
        { path: 'hero.emblem', label: 'Chest emblem color' },
        {
          path: 'hero.seatX',
          label: 'Seat position',
          hint: 'Where the hero sits along the top edge, left to right',
        },
        { path: 'hero.capeSway', label: 'Cape flutter' },
        {
          path: 'timing.breathe',
          label: 'Breathing and page rustle',
          hint: 'Higher moves the chest and paper more',
        },
      ],
    },
    {
      title: 'Newspaper',
      fields: [
        { path: 'hero.masthead', label: 'Newspaper name' },
        {
          path: 'hero.frontHeadline',
          label: 'Newspaper headline',
          hint: 'Front page, first two lines',
        },
      ],
      more: [
        { path: 'hero.newsprint', label: 'Paper color' },
        { path: 'hero.newsInk', label: 'Ink color' },
        { path: 'timing.turnStart', label: 'Page turn starts at', hint: 'Frame number' },
        { path: 'timing.turnFrames', label: 'Page turn length', hint: 'In frames' },
        {
          path: 'timing.lowerStart',
          label: 'Newspaper lowers at',
          hint: 'Frame number; the hero drops the paper to his lap and tilts his head down',
        },
        { path: 'timing.lowerFrames', label: 'Newspaper lowering length', hint: 'In frames' },
      ],
    },
    {
      title: 'Camera',
      fields: [
        {
          path: 'camera.startDistance',
          label: 'Start distance',
          hint: 'How far the drone starts from the board',
        },
        {
          path: 'camera.endDistance',
          label: 'End distance',
          hint: 'How close the drone ends; lower is closer',
        },
        { path: 'camera.handheld', label: 'Handheld shake' },
      ],
      more: [
        { path: 'camera.fieldOfView', label: 'Field of view', hint: 'In degrees' },
        {
          path: 'camera.startHeight',
          label: 'Start height',
          hint: 'Above or below the board center',
        },
        { path: 'camera.endHeight', label: 'End height', hint: 'Above or below the board center' },
        {
          path: 'camera.startSide',
          label: 'Start side offset',
          hint: 'Negative starts left of the board',
        },
        {
          path: 'camera.endSide',
          label: 'End side offset',
          hint: 'Negative ends left of the board',
        },
        {
          path: 'camera.startAim',
          label: 'Start aim',
          hint: 'Where the camera looks, above or below the board center',
        },
        { path: 'camera.endAim', label: 'End aim', hint: 'Where the camera looks at the end' },
        {
          path: 'camera.ease',
          label: 'Ease in and out',
          hint: '0 glides at a constant speed, 1 starts and settles gently',
        },
      ],
    },
    {
      title: 'Scenery',
      fields: [
        { ...LOOK.showBackdrop, label: 'Show coastline and sky' },
        { path: 'world.skyTop', label: 'Sky top color' },
        { path: 'world.skyHorizon', label: 'Sky horizon color' },
        { path: 'world.sea', label: 'Sea color' },
      ],
      more: [
        { path: 'world.sunGlow', label: 'Sun glow color', hint: 'In the sky and on the sea' },
        {
          path: 'world.sunHeight',
          label: 'Sun height',
          hint: 'Moves the sun glow in the sky and its reflection on the sea',
        },
        {
          path: 'world.sunAzimuth',
          label: 'Sun direction',
          hint: 'Moves the sun glow left or right across the horizon',
        },
        {
          path: 'world.haze',
          label: 'Haze color',
          hint: 'Fog over the distance and the color behind the horizon',
        },
        { path: 'world.hazeDensity', label: 'Haze density' },
        { path: 'world.foam', label: 'Surf foam color' },
        { path: 'world.waveSpeed', label: 'Wave speed' },
        { path: 'world.sand', label: 'Beach color' },
        {
          path: 'world.road',
          label: 'Road color',
          hint: 'Also tints light bouncing up from the ground',
        },
        { path: 'world.land', label: 'Inland ground color' },
        {
          path: 'world.walls',
          label: 'Building wall color',
          hint: 'Also tints the promenade and some city blocks',
        },
        { path: 'world.roofs', label: 'Roof color' },
        { path: 'world.foliage', label: 'Trees and parks color' },
        { path: 'world.windows', label: 'Lit window color' },
        { path: 'world.traffic', label: 'Moving traffic' },
        {
          path: 'world.coastAngle',
          label: 'Coastline angle',
          hint: 'Turns the shore, city and road around the billboard',
        },
      ],
    },
    {
      title: 'Lighting and grade',
      fields: [
        { path: 'light.sun', label: 'Sunlight strength' },
        {
          path: 'light.exposure',
          label: 'Exposure',
          hint: 'Scales the sunlight and sky fill light together',
        },
      ],
      more: [
        { path: 'light.sunColor', label: 'Sunlight color' },
        { path: 'light.fill', label: 'Sky fill light' },
        { path: 'light.fillColor', label: 'Sky fill color' },
        {
          path: 'look.vignette',
          label: 'Vignette',
          hint: 'Darkens the corners; only with the coastline shown',
        },
        { path: 'look.vignetteColor', label: 'Vignette color' },
        {
          path: 'look.grade',
          label: 'Color grade',
          hint: 'Soft top to bottom tint; only with the coastline shown',
        },
        { path: 'look.gradeTop', label: 'Grade top color' },
        { path: 'look.gradeBottom', label: 'Grade bottom color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        MOTION.enter,
        MOTION.exit,
        { ...MOTION.exitFrames, hint: 'In frames; starts at 0, so raise it for the exit to play' },
        MOTION.speed,
      ],
      more: [MOTION.enterFrames],
    },
  ],
  hidden: ['motion.float'],
});
