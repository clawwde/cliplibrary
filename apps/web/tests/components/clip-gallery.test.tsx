import { describe, expect, it } from 'bun:test';
import { CLIP_REGISTRY } from '@cliplibrary/schemas';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { ClipGallery, type GalleryItem } from '../../src/components/gallery/clip-gallery';
import { DEFAULT_FILTERS, type GalleryFilters } from '../../src/lib/gallery-filters';

const items: GalleryItem[] = CLIP_REGISTRY.map((meta) => ({
  meta,
  video: null,
  firstFrame: null,
}));

const StubTile = ({ meta }: GalleryItem) => <article>{meta.title}</article>;

const Harness = ({ initial = DEFAULT_FILTERS }: { initial?: GalleryFilters }) => {
  const [filters, setFilters] = useState(initial);
  const [query, setQuery] = useState(initial.query);
  return (
    <ClipGallery
      items={items}
      Tile={StubTile}
      filters={filters}
      query={query}
      onQueryChange={setQuery}
      onChange={setFilters}
    />
  );
};

describe('ClipGallery', () => {
  it('shows every clip in one flat grid without category headings', () => {
    render(<Harness />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(items.length);
  });

  it('narrows the grid as you type a search', () => {
    render(<Harness />);
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search clips' }), {
      target: { value: 'phone wall' },
    });
    expect(screen.getAllByRole('article').map((node) => node.textContent)).toEqual(['Phone Wall']);
    expect(screen.getByText(`1 of ${items.length} clips`)).toBeInTheDocument();
  });

  it('shows removable chips for active filters and an empty state', () => {
    render(<Harness initial={{ ...DEFAULT_FILTERS, category: 'transitions', tags: ['phone'] }} />);
    expect(screen.getByText('No clips match these filters.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove filter #phone' }));
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(screen.getAllByRole('article')).toHaveLength(items.length);
  });

  it('orders the grid by name when sorted by name', () => {
    render(<Harness initial={{ ...DEFAULT_FILTERS, sort: 'name-asc' }} />);
    const titles = screen.getAllByRole('article').map((node) => node.textContent ?? '');
    expect(titles).toEqual([...titles].sort((left, right) => left.localeCompare(right)));
  });
});
