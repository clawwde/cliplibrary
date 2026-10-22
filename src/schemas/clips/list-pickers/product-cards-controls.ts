import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { ProductCardsProps } from './product-cards';

export const productCardsControls = defineControls<ProductCardsProps>({
  sections: [
    {
      title: 'Products',
      fields: [
        {
          path: 'cards',
          label: 'Products',
          items: {
            title: 'Name',
            description: 'Description',
            icon: 'Icon',
            tint: 'Icon fill color',
            image: 'Photo, replaces the icon',
          },
        },
        { path: 'font', label: 'Font' },
        { path: 'type.title', label: 'Name size' },
        { path: 'type.description', label: 'Description size' },
        {
          link: ['type.ink', 'type.descriptionInk'],
          label: 'Text color',
          hint: 'Colors the product names and descriptions together',
        },
      ],
      more: [
        { path: 'type.titleWeight', label: 'Name weight' },
        { path: 'type.descriptionWeight', label: 'Description weight' },
        { path: 'type.ink', label: 'Name color' },
        {
          path: 'type.descriptionInk',
          label: 'Description color',
          hint: 'Drawn slightly see-through',
        },
      ],
    },
    {
      title: 'Carousel',
      fields: [
        {
          path: 'timing.interval',
          label: 'Time on each card',
          hint: 'In frames, counting the scroll to the next card',
        },
        {
          path: 'timing.moveFrames',
          label: 'Scroll duration',
          hint: 'In frames, never longer than the time on each card',
        },
        {
          path: 'layout.sideScale',
          label: 'Side card size',
          hint: 'Scale of the cards above and below the centered one',
        },
        {
          path: 'layout.loop',
          label: 'Loop the list',
          hint: 'After the last card, keep scrolling into the first one again',
        },
      ],
      more: [
        {
          path: 'layout.sideOpacity',
          label: 'Side card opacity',
          hint: 'Lower fades the cards above and below the centered one',
        },
        {
          path: 'timing.delay',
          label: 'Start delay',
          hint: 'Frames before the first scroll',
        },
        {
          path: 'timing.start',
          label: 'First centered card',
          hint: 'Card number centered at the start, counting from 0; cards appear outward from it',
        },
      ],
    },
    {
      title: 'Glass',
      fields: [
        {
          link: ['card.fill', 'card.border'],
          label: 'Glass color',
          hint: 'Tints the card body and its rim together',
        },
        {
          path: 'card.fillOpacity',
          label: 'Glass opacity',
          hint: 'Higher makes the cards more solid, a little stronger at the top',
        },
        {
          path: 'card.blur',
          label: 'Frosted blur',
          hint: 'Blurs what shows through each card. Browser exports may skip it',
        },
        { path: 'card.radius', label: 'Corner radius' },
      ],
      more: [
        { path: 'card.fill', label: 'Card body color' },
        { path: 'card.border', label: 'Rim color', hint: 'Also colors the rim glow' },
        { path: 'card.borderWidth', label: 'Rim width', hint: 'In pixels, 0 removes the rim line' },
        {
          path: 'card.glow',
          label: 'Rim glow',
          hint: 'Soft glow around and inside the rim, 0 turns it off',
        },
        { path: 'card.shadow', label: 'Drop shadow' },
        { path: 'card.shadowColor', label: 'Drop shadow color' },
      ],
    },
    {
      title: 'Icons',
      fields: [
        {
          path: 'tile.size',
          label: 'Icon tile size',
          hint: 'Also sets the space around the tile inside the card',
        },
        { path: 'tile.color', label: 'Tile color' },
        {
          path: 'tile.ink',
          label: 'Icon line color',
          hint: 'Outlines and dark parts of the drawn icons',
        },
      ],
      more: [
        { path: 'tile.radius', label: 'Tile corner radius' },
        {
          path: 'tile.iconScale',
          label: 'Icon size in tile',
          hint: 'Share of the tile the drawn icon fills. Photos always fill the tile',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { path: 'card.width', label: 'Card width' },
        { path: 'card.height', label: 'Card height' },
        {
          path: 'layout.pitch',
          label: 'Card spacing',
          hint: 'Distance between card centers, in pixels',
        },
      ],
      more: [
        {
          path: 'layout.x',
          label: 'Horizontal position',
          hint: 'Offset of the centered card from the middle, in pixels',
        },
        {
          path: 'layout.y',
          label: 'Vertical position',
          hint: 'Offset of the centered card from the middle, in pixels',
        },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        LOOK.background,
        {
          path: 'aura.blobs',
          label: 'Color glows',
          items: {
            color: 'Color',
            x: 'Horizontal position',
            y: 'Vertical position',
            size: 'Size',
            strength: 'Strength',
          },
        },
      ],
      more: [
        LOOK.backgroundEdge,
        { path: 'aura.drift', label: 'Glow drift', hint: 'How much the color glows wander' },
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        {
          path: 'entrance.stagger',
          label: 'Card stagger',
          hint: 'Frames between cards appearing, spreading out from the first centered card',
        },
        MOTION.exit,
        {
          ...MOTION.speed,
          hint: 'Scales the card intro and scrolling. Entrance, exit and glow drift keep their pace',
        },
      ],
      more: [
        { path: 'entrance.frames', label: 'Card intro length', hint: 'In frames' },
        {
          path: 'entrance.rise',
          label: 'Card rise',
          hint: 'How far each card slides up as it appears, in pixels',
        },
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float'],
});
