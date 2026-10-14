import {
  CLIP_CATEGORIES,
  CLIP_CATEGORY_IDS,
  CLIP_TAGS,
  CLIP_THEMES,
  type ClipCategory,
  type ClipMeta,
  type ClipTag,
  type ClipTheme,
  categoryLabel,
} from '@cliplibrary/schemas';

export const SORT_OPTIONS = [
  { id: 'category', label: 'Category' },
  { id: 'name-asc', label: 'Name, A to Z' },
  { id: 'name-desc', label: 'Name, Z to A' },
  { id: 'shortest', label: 'Shortest first' },
  { id: 'longest', label: 'Longest first' },
] as const;

export type SortId = (typeof SORT_OPTIONS)[number]['id'];

export interface GalleryFilters {
  query: string;
  category: ClipCategory | 'all';
  tags: ClipTag[];
  theme: ClipTheme | 'all';
  sort: SortId;
}

export const DEFAULT_FILTERS: GalleryFilters = {
  query: '',
  category: 'all',
  tags: [],
  theme: 'all',
  sort: 'category',
};

const SORT_IDS: readonly string[] = SORT_OPTIONS.map((option) => option.id);
const CATEGORY_IDS: readonly string[] = CLIP_CATEGORY_IDS;
const TAGS: readonly string[] = CLIP_TAGS;
const THEMES: readonly string[] = CLIP_THEMES;

const isCategory = (value: string): value is ClipCategory => CATEGORY_IDS.includes(value);
const isTag = (value: string): value is ClipTag => TAGS.includes(value);
const isTheme = (value: string): value is ClipTheme => THEMES.includes(value);
const isSort = (value: string): value is SortId => SORT_IDS.includes(value);

export const parseFilters = (params: URLSearchParams): GalleryFilters => {
  const category = params.get('category') ?? '';
  const theme = params.get('theme') ?? '';
  const sort = params.get('sort') ?? '';
  const tags = (params.get('tags') ?? '').split(',').filter(isTag);
  return {
    query: params.get('q') ?? '',
    category: isCategory(category) ? category : 'all',
    tags: [...new Set(tags)],
    theme: isTheme(theme) ? theme : 'all',
    sort: isSort(sort) ? sort : DEFAULT_FILTERS.sort,
  };
};

export const serializeFilters = (filters: GalleryFilters): string => {
  const params = new URLSearchParams();
  if (filters.query.trim().length > 0) {
    params.set('q', filters.query.trim());
  }
  if (filters.category !== 'all') {
    params.set('category', filters.category);
  }
  if (filters.tags.length > 0) {
    params.set('tags', filters.tags.join(','));
  }
  if (filters.theme !== 'all') {
    params.set('theme', filters.theme);
  }
  if (filters.sort !== DEFAULT_FILTERS.sort) {
    params.set('sort', filters.sort);
  }
  const text = params.toString();
  return text.length > 0 ? `?${text}` : '';
};

export const hasActiveFilters = (filters: GalleryFilters): boolean =>
  filters.query.trim().length > 0 ||
  filters.category !== 'all' ||
  filters.tags.length > 0 ||
  filters.theme !== 'all';

const haystack = (meta: ClipMeta): string =>
  [meta.title, meta.description, meta.id, categoryLabel(meta.category), ...meta.tags]
    .join(' ')
    .toLowerCase();

export const matchesQuery = (meta: ClipMeta, query: string): boolean => {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0);
  const text = haystack(meta);
  return tokens.every((token) => text.includes(token));
};

type Facet = 'category' | 'tags' | 'theme';

const matches = (meta: ClipMeta, filters: GalleryFilters, ignore?: Facet): boolean =>
  matchesQuery(meta, filters.query) &&
  (ignore === 'category' || filters.category === 'all' || meta.category === filters.category) &&
  (ignore === 'tags' || filters.tags.every((tag) => meta.tags.includes(tag))) &&
  (ignore === 'theme' || filters.theme === 'all' || meta.theme === filters.theme);

const COMPARATORS: Record<SortId, (left: ClipMeta, right: ClipMeta) => number> = {
  category: (left, right) =>
    CATEGORY_IDS.indexOf(left.category) - CATEGORY_IDS.indexOf(right.category),
  'name-asc': (left, right) => left.title.localeCompare(right.title),
  'name-desc': (left, right) => right.title.localeCompare(left.title),
  shortest: (left, right) => left.durationInFrames / left.fps - right.durationInFrames / right.fps,
  longest: (left, right) => right.durationInFrames / right.fps - left.durationInFrames / left.fps,
};

export const filterClips = <Item extends { meta: ClipMeta }>(
  items: readonly Item[],
  filters: GalleryFilters,
): Item[] =>
  items
    .filter((item) => matches(item.meta, filters))
    .sort((left, right) => COMPARATORS[filters.sort](left.meta, right.meta));

export const facetCounts = <Key extends string>(
  items: readonly { meta: ClipMeta }[],
  filters: GalleryFilters,
  facet: Facet,
  keysOf: (meta: ClipMeta) => readonly Key[],
): Map<Key, number> => {
  const counts = new Map<Key, number>();
  for (const item of items) {
    if (matches(item.meta, filters, facet)) {
      for (const key of keysOf(item.meta)) {
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }
  return counts;
};

export interface CategoryGroup<Item> {
  category: ClipCategory;
  label: string;
  items: Item[];
}

export const groupByCategory = <Item extends { meta: ClipMeta }>(
  items: readonly Item[],
): CategoryGroup<Item>[] =>
  CLIP_CATEGORIES.map((category) => ({
    category: category.id,
    label: category.label,
    items: items.filter((item) => item.meta.category === category.id),
  })).filter((group) => group.items.length > 0);

export const formatDuration = (meta: ClipMeta): string => {
  const seconds = meta.durationInFrames / meta.fps;
  return Number.isInteger(seconds) ? `${seconds}s` : `${seconds.toFixed(1)}s`;
};
