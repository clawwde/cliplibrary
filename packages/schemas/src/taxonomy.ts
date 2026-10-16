export const CLIP_CATEGORIES = [
  { id: 'typography', label: 'Typography' },
  { id: 'devices', label: '3D Devices' },
  { id: 'overlays', label: 'UI Overlays' },
  { id: 'brand', label: 'Brand & CTA' },
  { id: 'backgrounds', label: 'Backgrounds' },
  { id: 'transitions', label: 'Transitions' },
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
  'logo',
  'cta',
  'list',
  'grid',
  'scroll',
  'notification',
  'gradient',
  'reveal',
  'wipe',
  'minimal',
  'doodle',
  'sketch',
  'kinetic',
  'film',
] as const;

export type ClipTag = (typeof CLIP_TAGS)[number];

export const CLIP_THEMES = ['light', 'dark'] as const;

export type ClipTheme = (typeof CLIP_THEMES)[number];

export const categoryLabel = (id: ClipCategory): string =>
  CLIP_CATEGORIES.find((category) => category.id === id)?.label ?? id;
