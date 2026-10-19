'use client';

import { SearchX } from 'lucide-react';
import type { ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import {
  DEFAULT_FILTERS,
  facetCounts,
  filterClips,
  type GalleryFilters,
} from '@/lib/gallery-filters';
import type { ClipMeta } from '@/schemas';
import { FilterBar } from './filter-bar';

export interface GalleryItem {
  meta: ClipMeta;
  video: string | null;
  firstFrame: string | null;
}

type GalleryTile = ComponentType<GalleryItem>;

const Grid = ({ items, Tile }: { items: GalleryItem[]; Tile: GalleryTile }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] gap-5">
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
      ) : (
        <Grid items={visible} Tile={Tile} />
      )}
    </div>
  );
};
