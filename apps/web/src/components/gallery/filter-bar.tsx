'use client';

import {
  CLIP_CATEGORIES,
  CLIP_TAGS,
  type ClipCategory,
  type ClipTag,
  type ClipTheme,
  categoryLabel,
} from '@cliplibrary/schemas';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DEFAULT_FILTERS,
  type GalleryFilters,
  hasActiveFilters,
  SORT_OPTIONS,
  type SortId,
} from '@/lib/gallery-filters';

interface FacetCounts {
  categories: Map<ClipCategory, number>;
  tags: Map<ClipTag, number>;
  themes: Map<ClipTheme, number>;
}

interface FilterBarProps {
  filters: GalleryFilters;
  query: string;
  counts: FacetCounts;
  total: number;
  shown: number;
  onQueryChange: (query: string) => void;
  onChange: (next: GalleryFilters) => void;
}

const isTypingTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

const ActiveChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <button
    type="button"
    onClick={onRemove}
    className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent"
    aria-label={`Remove filter ${label}`}
  >
    {label}
    <X className="size-3" />
  </button>
);

export const FilterBar = ({
  filters,
  query,
  counts,
  total,
  shown,
  onQueryChange,
  onChange,
}: FilterBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTag = (tag: ClipTag, checked: boolean) =>
    onChange({
      ...filters,
      tags: checked ? [...filters.tags, tag] : filters.tags.filter((item) => item !== tag),
    });

  const availableTags = CLIP_TAGS.filter(
    (tag) => (counts.tags.get(tag) ?? 0) > 0 || filters.tags.includes(tag),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[16rem] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by name, motion or tag: phone, typing, logo"
            aria-label="Search clips"
            className="h-9 pr-16 pl-9 [&::-webkit-search-cancel-button]:hidden"
          />
          {query.length > 0 ? (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded border px-1.5 font-mono text-[10px] text-muted-foreground">
              /
            </kbd>
          )}
        </div>

        <Select
          value={filters.category}
          onValueChange={(value) =>
            onChange({ ...filters, category: value as GalleryFilters['category'] })
          }
        >
          <SelectTrigger aria-label="Category" className="min-w-[11rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CLIP_CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.label}
                <span className="ml-auto pl-3 text-muted-foreground text-xs">
                  {counts.categories.get(category.id) ?? 0}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-9 gap-2" aria-label="Tags">
              <SlidersHorizontal className="size-4" />
              Tags
              {filters.tags.length > 0 ? (
                <span className="rounded-full bg-foreground px-1.5 text-[11px] text-background">
                  {filters.tags.length}
                </span>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Match every selected tag</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={filters.tags.includes(tag)}
                onSelect={(event) => event.preventDefault()}
                onCheckedChange={(checked) => toggleTag(tag, checked === true)}
              >
                {tag}
                <span className="ml-auto pl-3 text-muted-foreground text-xs">
                  {counts.tags.get(tag) ?? 0}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
            {filters.tags.length > 0 ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => onChange({ ...filters, tags: [] })}>
                  Clear tags
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

        <Select
          value={filters.theme}
          onValueChange={(value) =>
            onChange({ ...filters, theme: value as GalleryFilters['theme'] })
          }
        >
          <SelectTrigger aria-label="Theme" className="min-w-[8.5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any theme</SelectItem>
            <SelectItem value="light">
              Light
              <span className="ml-auto pl-3 text-muted-foreground text-xs">
                {counts.themes.get('light') ?? 0}
              </span>
            </SelectItem>
            <SelectItem value="dark">
              Dark
              <span className="ml-auto pl-3 text-muted-foreground text-xs">
                {counts.themes.get('dark') ?? 0}
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(value) => onChange({ ...filters, sort: value as SortId })}
        >
          <SelectTrigger aria-label="Sort" className="min-w-[10rem]">
            <span className="text-muted-foreground">Sort</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-h-7 flex-wrap items-center gap-2 text-muted-foreground text-sm">
        <span>{shown === total ? `${total} clips` : `${shown} of ${total} clips`}</span>
        {filters.category === 'all' ? null : (
          <ActiveChip
            label={categoryLabel(filters.category)}
            onRemove={() => onChange({ ...filters, category: 'all' })}
          />
        )}
        {filters.tags.map((tag) => (
          <ActiveChip key={tag} label={`#${tag}`} onRemove={() => toggleTag(tag, false)} />
        ))}
        {filters.theme === 'all' ? null : (
          <ActiveChip
            label={filters.theme === 'light' ? 'Light' : 'Dark'}
            onRemove={() => onChange({ ...filters, theme: 'all' })}
          />
        )}
        {hasActiveFilters({ ...filters, query }) ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => {
              onQueryChange('');
              onChange({ ...DEFAULT_FILTERS, sort: filters.sort });
            }}
          >
            Clear all
          </Button>
        ) : null}
      </div>
    </div>
  );
};
