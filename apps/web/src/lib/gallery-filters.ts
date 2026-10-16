import {
  CLIP_CATEGORY_IDS,
  CLIP_TAGS,
  CLIP_THEMES,
  type ClipCategory,
  type ClipId,
  type ClipMeta,
  type ClipTag,
  type ClipTheme,
  categoryKeywords,
  categoryLabel,
} from '@cliplibrary/schemas';
import MiniSearch from 'minisearch';

export const SORT_OPTIONS = [
  { id: 'relevance', label: 'Best match' },
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
  sort: 'relevance',
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

interface SearchDocument {
  id: ClipId;
  title: string;
  tags: string;
  category: string;
  keywords: string;
  theme: string;
  description: string;
}

const toSearchDocument = (meta: ClipMeta): SearchDocument => ({
  id: meta.id,
  title: meta.title,
  tags: meta.tags.join(' '),
  category: categoryLabel(meta.category),
  keywords: [meta.category, ...categoryKeywords(meta.category)].join(' '),
  theme: meta.theme,
  description: meta.description,
});

const SEARCH_FIELDS = ['title', 'tags', 'category', 'keywords', 'theme', 'description'];

const FUZZY_MIN_LENGTH = 6;

const indexes = new WeakMap<readonly { meta: ClipMeta }[], MiniSearch<SearchDocument>>();

const indexFor = (items: readonly { meta: ClipMeta }[]): MiniSearch<SearchDocument> => {
  const cached = indexes.get(items);
  if (cached !== undefined) {
    return cached;
  }
  const index = new MiniSearch<SearchDocument>({
    fields: SEARCH_FIELDS,
    searchOptions: {
      boost: { title: 4, tags: 2.5, category: 2, keywords: 1.5, theme: 1, description: 1 },
      prefix: true,
      fuzzy: (term) => (term.length >= FUZZY_MIN_LENGTH ? 0.2 : false),
      combineWith: 'AND',
    },
  });
  index.addAll(items.map((item) => toSearchDocument(item.meta)));
  indexes.set(items, index);
  return index;
};

type SearchScores = ReadonlyMap<ClipId, number> | null;

const searchScores = (items: readonly { meta: ClipMeta }[], query: string): SearchScores => {
  if (query.trim().length === 0) {
    return null;
  }
  return new Map(
    indexFor(items)
      .search(query)
      .map((result) => [result.id as ClipId, result.score]),
  );
};

type Facet = 'category' | 'tags' | 'theme';

const matches = (
  meta: ClipMeta,
  filters: GalleryFilters,
  scores: SearchScores,
  ignore?: Facet,
): boolean =>
  (scores === null || scores.has(meta.id)) &&
  (ignore === 'category' || filters.category === 'all' || meta.category === filters.category) &&
  (ignore === 'tags' || filters.tags.every((tag) => meta.tags.includes(tag))) &&
  (ignore === 'theme' || filters.theme === 'all' || meta.theme === filters.theme);

type Comparator = (left: ClipMeta, right: ClipMeta) => number;

const byCategory: Comparator = (left, right) =>
  CATEGORY_IDS.indexOf(left.category) - CATEGORY_IDS.indexOf(right.category);

const COMPARATORS: Record<Exclude<SortId, 'relevance'>, Comparator> = {
  'name-asc': (left, right) => left.title.localeCompare(right.title),
  'name-desc': (left, right) => right.title.localeCompare(left.title),
  shortest: (left, right) => left.durationInFrames / left.fps - right.durationInFrames / right.fps,
  longest: (left, right) => right.durationInFrames / right.fps - left.durationInFrames / left.fps,
};

const comparator = (sort: SortId, scores: SearchScores): Comparator => {
  if (sort !== 'relevance') {
    return COMPARATORS[sort];
  }
  if (scores === null) {
    return byCategory;
  }
  return (left, right) => (scores.get(right.id) ?? 0) - (scores.get(left.id) ?? 0);
};

export const filterClips = <Item extends { meta: ClipMeta }>(
  items: readonly Item[],
  filters: GalleryFilters,
): Item[] => {
  const scores = searchScores(items, filters.query);
  const compare = comparator(filters.sort, scores);
  return items
    .filter((item) => matches(item.meta, filters, scores))
    .sort((left, right) => compare(left.meta, right.meta));
};

export const facetCounts = <Key extends string>(
  items: readonly { meta: ClipMeta }[],
  filters: GalleryFilters,
  facet: Facet,
  keysOf: (meta: ClipMeta) => readonly Key[],
): Map<Key, number> => {
  const scores = searchScores(items, filters.query);
  const counts = new Map<Key, number>();
  for (const item of items) {
    if (matches(item.meta, filters, scores, facet)) {
      for (const key of keysOf(item.meta)) {
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }
  return counts;
};

export const formatDuration = (meta: ClipMeta): string => {
  const seconds = meta.durationInFrames / meta.fps;
  return Number.isInteger(seconds) ? `${seconds}s` : `${seconds.toFixed(1)}s`;
};
