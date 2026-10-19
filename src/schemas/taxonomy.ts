const PHONE_KEYWORDS = ['device', 'iphone', 'mobile', 'smartphone', 'mockup', 'app'] as const;

export const CLIP_CATEGORIES = [
  {
    id: 'kinetic-type',
    label: 'Kinetic Type',
    keywords: ['typography', 'type', 'words', 'title', 'motion text', 'big text'],
  },
  {
    id: 'text-reveals',
    label: 'Text Reveals',
    keywords: ['typography', 'type', 'title', 'letters', 'characters', 'numbers', 'stats'],
  },
  {
    id: 'hand-drawn',
    label: 'Hand-drawn',
    keywords: ['handwritten', 'marker', 'ink', 'scribble', 'drawn', 'pen', 'annotation'],
  },
  {
    id: 'phone-reveals',
    label: 'Phone Reveals',
    keywords: [...PHONE_KEYWORDS, 'entrance', 'intro', 'hero'],
  },
  {
    id: 'phone-layouts',
    label: 'Multi-phone Layouts',
    keywords: [...PHONE_KEYWORDS, 'phones', 'multiple', 'arrangement', 'composition'],
  },
  {
    id: 'screen-demos',
    label: 'Screen Demos',
    keywords: [...PHONE_KEYWORDS, 'ui', 'walkthrough', 'demo', 'screens', 'feed'],
  },
  {
    id: 'desk-scenes',
    label: 'Desk & Laptop',
    keywords: ['laptop', 'computer', 'notebook', 'desk', 'workspace', 'hands', 'live action'],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    keywords: ['layer', 'effect', 'ui', 'popup', 'vintage'],
  },
  {
    id: 'brand',
    label: 'Logo & End Cards',
    keywords: ['brand', 'branding', 'intro', 'outro', 'ending', 'call to action', 'wordmark'],
  },
  {
    id: 'backgrounds',
    label: 'Backgrounds',
    keywords: ['background', 'bg', 'scene', 'set', 'clay', 'wall'],
  },
  {
    id: 'ad-reveals',
    label: 'Ad Reveals',
    keywords: [
      'billboard',
      'poster',
      'hoarding',
      'outdoor',
      'advertising',
      'unveil',
      'launch',
      'helicopter',
      'banner',
    ],
  },
  {
    id: 'transitions',
    label: 'Transitions',
    keywords: ['transition', 'cut', 'bridge', 'cover', 'between'],
  },
] as const;

export type ClipCategory = (typeof CLIP_CATEGORIES)[number]['id'];

export const CLIP_CATEGORY_IDS: readonly ClipCategory[] = CLIP_CATEGORIES.map(
  (category) => category.id,
);

export const CLIP_TAGS = [
  'kinetic',
  'headline',
  'text',
  'typing',
  'caret',
  'counter',
  'marquee',
  'outline',
  'repeat',
  'stack',
  'zoom',
  'flip',
  'glow',
  'reveal',
  'handwriting',
  'doodle',
  'sketch',
  'arrows',
  'draw',
  '3d',
  'phone',
  'laptop',
  'hand',
  'multi-phone',
  'screen',
  'spin',
  'float',
  'drop',
  'slide',
  'orbit',
  'grid',
  'scroll',
  'crossfade',
  'top-down',
  'camera-move',
  'cards',
  'notification',
  'overlay',
  'film',
  'grain',
  'texture',
  'logo',
  'icon',
  'cta',
  'end-card',
  'backdrop',
  'wipe',
  'cover',
  'minimal',
  'paper',
  'billboard',
  'cloth',
] as const;

export type ClipTag = (typeof CLIP_TAGS)[number];

export const CLIP_THEMES = ['light', 'dark'] as const;

export type ClipTheme = (typeof CLIP_THEMES)[number];

const categoryById = (id: ClipCategory) => CLIP_CATEGORIES.find((category) => category.id === id);

export const categoryLabel = (id: ClipCategory): string => categoryById(id)?.label ?? id;

export const categoryKeywords = (id: ClipCategory): readonly string[] =>
  categoryById(id)?.keywords ?? [];
