import { anim, ellipse, layer, rect, scene, SERIF, text } from './build';
import type { LibraryClip } from './types';

export const titleCardClip: LibraryClip = {
  meta: {
    id: 'title-card',
    title: 'Title Card',
    description: 'Eyebrow, headline, underline and subtitle, each staggered onto its own layer.',
    category: 'text',
  },
  build: () =>
    scene({
      durationInFrames: 150,
      background: '#0a0a0a',
      tracks: [
        layer('tc-track-subtitle', 'Subtitle', [
          text('tc-subtitle', 'A product studio shipping in public', {
            fontSize: 48,
            color: '#a1a1aa',
            from: 34,
            durationInFrames: 116,
            transform: { x: 0, y: 150, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('fade', 22),
          }),
        ]),
        layer('tc-track-underline', 'Underline', [
          rect('tc-underline', {
            color: '#6366f1',
            width: 320,
            height: 10,
            radius: 5,
            from: 26,
            durationInFrames: 124,
            transform: { x: 0, y: 66, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 18, 'easeInOut'),
          }),
        ]),
        layer('tc-track-title', 'Headline', [
          text('tc-title', 'Build in Public', {
            fontSize: 156,
            color: '#f5f5f5',
            from: 12,
            durationInFrames: 138,
            transform: { x: 0, y: -40, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 22),
          }),
        ]),
        layer('tc-track-eyebrow', 'Eyebrow', [
          text('tc-eyebrow', 'INTRODUCING', {
            fontSize: 40,
            color: '#6366f1',
            from: 6,
            durationInFrames: 144,
            transform: { x: 0, y: -230, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 18),
          }),
        ]),
        layer('tc-track-panel', 'Panel', [
          rect('tc-panel', {
            color: '#111827',
            width: 1680,
            height: 880,
            radius: 48,
            from: 0,
            durationInFrames: 150,
            transform: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 16, 'easeOut'),
          }),
        ]),
      ],
    }),
};

export const lowerThirdClip: LibraryClip = {
  meta: {
    id: 'lower-third',
    title: 'Lower Third',
    description: 'Broadcast name strip: accent block, name, role and a sliding backing bar.',
    category: 'text',
  },
  build: () =>
    scene({
      durationInFrames: 150,
      background: '#0a0a0a',
      tracks: [
        layer('lt-track-role', 'Role', [
          text('lt-role', 'Head of Design', {
            fontSize: 46,
            color: '#a1a1aa',
            from: 24,
            durationInFrames: 126,
            transform: { x: -210, y: 330, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 18),
          }),
        ]),
        layer('lt-track-name', 'Name', [
          text('lt-name', 'Riley Carter', {
            fontSize: 92,
            color: '#f5f5f5',
            from: 16,
            durationInFrames: 134,
            transform: { x: -230, y: 250, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 18),
          }),
        ]),
        layer('lt-track-accent', 'Accent', [
          rect('lt-accent', {
            color: '#6366f1',
            width: 18,
            height: 170,
            radius: 9,
            from: 8,
            durationInFrames: 142,
            transform: { x: -560, y: 290, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 14, 'easeOut'),
          }),
        ]),
        layer('lt-track-bar', 'Backing bar', [
          rect('lt-bar', {
            color: '#111827',
            width: 1120,
            height: 230,
            radius: 24,
            from: 0,
            durationInFrames: 150,
            transform: { x: -60, y: 290, scale: 1, rotation: 0, opacity: 0.95 },
            animation: anim('slide', 16, 'easeOut'),
          }),
        ]),
      ],
    }),
};

export const quoteCardClip: LibraryClip = {
  meta: {
    id: 'quote-card',
    title: 'Quote Card',
    description: 'Large serif quotation mark, the quote itself and an attribution line.',
    category: 'text',
  },
  build: () =>
    scene({
      durationInFrames: 160,
      background: '#0a0a0a',
      tracks: [
        layer('qc-track-attr', 'Attribution', [
          text('qc-attr', 'ADA LOVELACE', {
            fontSize: 42,
            color: '#6366f1',
            from: 40,
            durationInFrames: 120,
            transform: { x: 0, y: 230, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('fade', 24),
          }),
        ]),
        layer('qc-track-quote', 'Quote', [
          text('qc-quote', 'The science of operations\nis a science of itself.', {
            fontSize: 86,
            color: '#f5f5f5',
            fontFamily: SERIF,
            from: 18,
            durationInFrames: 142,
            transform: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 24, 'easeInOut'),
          }),
        ]),
        layer('qc-track-mark', 'Quote mark', [
          text('qc-mark', '“', {
            fontSize: 360,
            color: '#1f2937',
            fontFamily: SERIF,
            from: 0,
            durationInFrames: 160,
            transform: { x: 0, y: -210, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 20, 'easeOut'),
          }),
        ]),
        layer('qc-track-ring', 'Ring', [
          ellipse('qc-ring', {
            color: '#111827',
            width: 1300,
            height: 1300,
            from: 0,
            durationInFrames: 160,
            transform: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0.6 },
            animation: anim('scale', 24, 'easeInOut'),
          }),
        ]),
      ],
    }),
};

export const kineticHeadlineClip: LibraryClip = {
  meta: {
    id: 'kinetic-headline',
    title: 'Kinetic Headline',
    description: 'Four words as separate text layers that punch in one after another.',
    category: 'text',
  },
  build: () => {
    const words = ['Move', 'Every', 'Single', 'Word'];
    const offsets = [-660, -220, 220, 660];
    return scene({
      durationInFrames: 150,
      background: '#0a0a0a',
      tracks: words.map((word, index) =>
        layer(`kh-track-${index}`, `Word ${index + 1}`, [
          text(`kh-word-${index}`, word, {
            fontSize: 132,
            color: index % 2 === 0 ? '#f5f5f5' : '#6366f1',
            from: 8 + index * 10,
            durationInFrames: 142 - index * 10,
            transform: { x: offsets[index] ?? 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 14, 'easeOut'),
          }),
        ]),
      ),
    });
  },
};

export const bulletListClip: LibraryClip = {
  meta: {
    id: 'bullet-list',
    title: 'Bullet List',
    description: 'A title plus three bullet rows, each bullet and label on its own layer.',
    category: 'text',
  },
  build: () => {
    const items = ['Faster renders', 'Deeper editing', 'Shareable clips'];
    const rows = items.flatMap((label, index) => {
      const y = -20 + index * 150;
      return [
        layer(`bl-track-dot-${index}`, `Bullet ${index + 1}`, [
          ellipse(`bl-dot-${index}`, {
            color: '#6366f1',
            width: 48,
            height: 48,
            from: 30 + index * 14,
            durationInFrames: 120 - index * 14,
            transform: { x: -560, y, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 12, 'easeOut'),
          }),
        ]),
        layer(`bl-track-label-${index}`, `Item ${index + 1}`, [
          text(`bl-label-${index}`, label, {
            fontSize: 72,
            color: '#e5e5e5',
            from: 34 + index * 14,
            durationInFrames: 116 - index * 14,
            transform: { x: 60, y, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 16),
          }),
        ]),
      ];
    });
    return scene({
      durationInFrames: 170,
      background: '#0a0a0a',
      tracks: [
        ...rows,
        layer('bl-track-title', 'Title', [
          text('bl-title', "What's new", {
            fontSize: 96,
            color: '#f5f5f5',
            from: 6,
            durationInFrames: 164,
            transform: { x: -300, y: -320, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 18),
          }),
        ]),
      ],
    });
  },
};

export const textClips: LibraryClip[] = [
  titleCardClip,
  lowerThirdClip,
  quoteCardClip,
  kineticHeadlineClip,
  bulletListClip,
];
