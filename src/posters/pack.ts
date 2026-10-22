import type { Design, Page } from '@/design';
import type { ClipTheme, PosterCategory, PosterTag } from '@/schemas';

export interface PosterPackMeta {
  id: string;
  title: string;
  description: string;
  category: PosterCategory;
  tags: readonly PosterTag[];
  theme: ClipTheme;
  width: number;
  height: number;
  pageCount: number;
}

export interface PosterPack {
  meta: PosterPackMeta;
  build: () => Design;
}

export interface PosterPackSpec extends Omit<PosterPackMeta, 'pageCount'> {
  pages: readonly (() => Page)[];
}

export const definePack = ({ pages, ...meta }: PosterPackSpec): PosterPack => ({
  meta: { ...meta, pageCount: pages.length },
  build: () => ({
    id: meta.id,
    title: meta.title,
    width: meta.width,
    height: meta.height,
    pages: pages.map((page) => page()),
  }),
});

export const SQUARE = { width: 1080, height: 1080 } as const;
export const LANDSCAPE = { width: 1600, height: 1200 } as const;
