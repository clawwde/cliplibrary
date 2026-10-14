export const CLIP_CATEGORIES = [
  { id: 'typography', label: 'Typography' },
  { id: 'data', label: 'Data & Charts' },
  { id: 'media', label: 'Media' },
  { id: 'devices', label: '3D Devices' },
  { id: 'overlays', label: 'UI Overlays' },
  { id: 'brand', label: 'Brand & CTA' },
  { id: 'backgrounds', label: 'Backgrounds' },
  { id: 'transitions', label: 'Transitions' },
  { id: 'sequences', label: 'Sequences' },
] as const;

export type ClipCategory = (typeof CLIP_CATEGORIES)[number]['id'];

export const CLIP_CATEGORY_IDS: readonly ClipCategory[] = CLIP_CATEGORIES.map(
  (category) => category.id,
);

export const CLIP_TAGS = [
  '3d',
  'phone',
  'cards',
  'headline',
  'text',
  'numbers',
  'chart',
  'dashboard',
  'image',
  'gallery',
  'logo',
  'cta',
  'list',
  'grid',
  'scroll',
  'notification',
  'gradient',
  'kinetic',
  'reveal',
  'wipe',
  'minimal',
  'retro',
] as const;

export type ClipTag = (typeof CLIP_TAGS)[number];

export const CLIP_THEMES = ['light', 'dark'] as const;

export type ClipTheme = (typeof CLIP_THEMES)[number];

export const categoryLabel = (id: ClipCategory): string =>
  CLIP_CATEGORIES.find((category) => category.id === id)?.label ?? id;
