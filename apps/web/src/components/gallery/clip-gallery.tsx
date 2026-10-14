'use client';

import type { Project } from '@cliplibrary/project';
import type { ClipMeta } from '@cliplibrary/schemas';
import { SearchX } from 'lucide-react';
import type { ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import {
  DEFAULT_FILTERS,
  facetCounts,
  filterClips,
  type GalleryFilters,
  groupByCategory,
} from '@/lib/gallery-filters';
import { FilterBar } from './filter-bar';

export interface GalleryItem {
  meta: ClipMeta;
  project: Project;
  hasVideo: boolean;
}

type GalleryTile = ComponentType<GalleryItem>;

const Grid = ({ items, Tile }: { items: GalleryItem[]; Tile: GalleryTile }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    {items.map((item) => (
      <Tile key={item.meta.id} {...item} />
    ))}
  </div>
);

interface ClipGalleryProps {
  items: GalleryItem[];
  Tile: GalleryTile;
  filters: GalleryFilters;
  query: string;
  onQueryChange: (query: string) => void;
  onChange: (next: GalleryFilters) => void;
}

export const ClipGallery = ({
  items,
  Tile,
  filters,
  query,
  onQueryChange,
  onChange,
}: ClipGalleryProps) => {
  const effective = { ...filters, query };
  const visible = filterClips(items, effective);
  const counts = {
    categories: facetCounts(items, effective, 'category', (meta) => [meta.category]),
    tags: facetCounts(items, effective, 'tags', (meta) => meta.tags),
    themes: facetCounts(items, effective, 'theme', (meta) => [meta.theme]),
  };

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        filters={filters}
        query={query}
        counts={counts}
        total={items.length}
        shown={visible.length}
        onQueryChange={onQueryChange}
        onChange={onChange}
      />
      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-muted/40 px-6 py-16 text-center">
          <SearchX className="size-6 text-muted-foreground" />
          <p className="font-medium text-sm">No clips match these filters.</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onQueryChange('');
              onChange({ ...DEFAULT_FILTERS, sort: filters.sort });
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : filters.sort === 'category' ? (
        groupByCategory(visible).map((group) => (
          <section key={group.category} aria-labelledby={`category-${group.category}`}>
            <h2
              id={`category-${group.category}`}
              className="mb-3 flex items-baseline gap-2 font-semibold text-base tracking-tight"
            >
              {group.label}
              <span className="font-normal text-muted-foreground text-sm">
                {group.items.length}
              </span>
            </h2>
            <Grid items={group.items} Tile={Tile} />
          </section>
        ))
      ) : (
        <Grid items={visible} Tile={Tile} />
      )}
    </div>
  );
};
