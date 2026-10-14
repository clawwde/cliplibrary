import { anim, ellipse, image, layer, rect, scene, text } from './build';
import type { LibraryClip } from './types';

const logoRevealClip: LibraryClip = {
  meta: {
    id: 'logo-reveal',
    title: 'Logo Reveal',
    description: 'A mark, a ring, the wordmark and a tagline that assemble in sequence.',
    category: 'brand',
  },
  build: () =>
    scene({
      durationInFrames: 140,
      background: '#0a0a0a',
      tracks: [
        layer('lr-track-tagline', 'Tagline', [
          text('lr-tagline', 'motion, made editable', {
            fontSize: 44,
            color: '#a1a1aa',
            from: 44,
            durationInFrames: 96,
            transform: { x: 0, y: 220, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('fade', 24),
          }),
        ]),
        layer('lr-track-wordmark', 'Wordmark', [
          text('lr-wordmark', 'CLIPLIBRARY', {
            fontSize: 110,
            color: '#f5f5f5',
            from: 28,
            durationInFrames: 112,
            transform: { x: 0, y: 90, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 20, 'easeOut'),
          }),
        ]),
        layer('lr-track-mark', 'Mark', [
          rect('lr-mark', {
            color: '#6366f1',
            width: 200,
            height: 200,
            radius: 48,
            from: 10,
            durationInFrames: 130,
            transform: { x: 0, y: -150, scale: 1, rotation: 45, opacity: 1 },
            animation: anim('scale', 18, 'easeInOut'),
          }),
        ]),
        layer('lr-track-ring', 'Ring', [
          ellipse('lr-ring', {
            color: '#1f2937',
            width: 520,
            height: 520,
            from: 0,
            durationInFrames: 140,
            transform: { x: 0, y: -150, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 16, 'easeOut'),
          }),
        ]),
      ],
    }),
};

const imageGalleryClip: LibraryClip = {
  meta: {
    id: 'image-gallery',
    title: 'Image Gallery',
    description: 'Four image tiles that fly into a two by two grid, each on its own layer.',
    category: 'media',
  },
  build: () => {
    const slots = [
      { x: -380, y: -220, from: 8 },
      { x: 380, y: -220, from: 16 },
      { x: -380, y: 220, from: 24 },
      { x: 380, y: 220, from: 32 },
    ];
    return scene({
      durationInFrames: 160,
      background: '#0a0a0a',
      tracks: [
        layer('ig-track-caption', 'Caption', [
          text('ig-caption', 'Field Notes 2025', {
            fontSize: 56,
            color: '#f5f5f5',
            from: 44,
            durationInFrames: 116,
            transform: { x: 0, y: 440, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('fade', 22),
          }),
        ]),
        ...slots.map((slot, index) =>
          layer(`ig-track-tile-${index}`, `Tile ${index + 1}`, [
            image(`ig-tile-${index}`, '', {
              from: slot.from,
              durationInFrames: 160 - slot.from,
              transform: { x: slot.x, y: slot.y, scale: 0.62, rotation: 0, opacity: 1 },
              animation: anim('scale', 16, 'easeOut'),
            }),
          ]),
        ),
      ],
    });
  },
};

const splitFeatureClip: LibraryClip = {
  meta: {
    id: 'split-feature',
    title: 'Split Feature',
    description: 'A text column and an image panel split by a divider, animating in opposition.',
    category: 'layout',
  },
  build: () =>
    scene({
      durationInFrames: 160,
      background: '#0a0a0a',
      tracks: [
        layer('sf-track-body', 'Body copy', [
          text('sf-body', 'Trim, layer and restack\nevery element in the browser.', {
            fontSize: 52,
            color: '#a1a1aa',
            from: 30,
            durationInFrames: 130,
            transform: { x: -470, y: 110, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 20),
          }),
        ]),
        layer('sf-track-title', 'Title', [
          text('sf-title', 'One timeline', {
            fontSize: 104,
            color: '#f5f5f5',
            from: 18,
            durationInFrames: 142,
            transform: { x: -470, y: -120, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 18),
          }),
        ]),
        layer('sf-track-divider', 'Divider', [
          rect('sf-divider', {
            color: '#6366f1',
            width: 10,
            height: 760,
            radius: 5,
            from: 10,
            durationInFrames: 150,
            transform: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 16, 'easeInOut'),
          }),
        ]),
        layer('sf-track-image', 'Image', [
          image('sf-image', '', {
            from: 14,
            durationInFrames: 146,
            transform: { x: 520, y: 0, scale: 0.92, rotation: 0, opacity: 1 },
            animation: anim('slide', 20, 'easeOut'),
          }),
        ]),
      ],
    }),
};

export const showcaseClips: LibraryClip[] = [logoRevealClip, imageGalleryClip, splitFeatureClip];
