import { describe, expect, it } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { VirtualGrid } from '@/components/gallery/virtual-grid';

interface Row {
  id: string;
}

const rows: Row[] = Array.from({ length: 2000 }, (_, index) => ({ id: `item-${index}` }));

const Tile = ({ id }: Row) => <article>{id}</article>;

describe('VirtualGrid', () => {
  it('server-renders the first screen of tiles as a plain grid', () => {
    const html = renderToString(<VirtualGrid items={rows} itemKey={(row) => row.id} Tile={Tile} />);
    expect(html.match(/<article>/g)).toHaveLength(12);
    expect(html).toContain('item-0');
  });

  it('keeps the mounted tiles bounded however long the list grows', () => {
    render(<VirtualGrid items={rows} itemKey={(row) => row.id} Tile={Tile} />);
    const mounted = screen.getAllByRole('article');
    expect(mounted[0]).toHaveTextContent('item-0');
    expect(mounted.length).toBeLessThan(50);
  });
});
