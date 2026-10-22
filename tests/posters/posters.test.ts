import { describe, expect, it } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { designSchema, isDesignIcon, isKnownFont } from '@/design';
import {
  findPosterPack,
  POSTER_PACK_META,
  POSTER_PACKS,
  POSTER_PHOTOS,
  POSTER_UPDATED_AT,
  posterPreviewPath,
} from '@/posters';
import { publicDir } from '@/render/paths';
import { CLIP_TAGS, POSTER_CATEGORIES, POSTER_TAGS } from '@/schemas';

const designs = POSTER_PACKS.map((pack) => ({ meta: pack.meta, design: pack.build() }));
const elements = designs.flatMap(({ meta, design }) =>
  design.pages.flatMap((page) => page.elements.map((element) => ({ pack: meta.id, element }))),
);

describe('poster packs', () => {
  it('have unique ids and known categories and tags', () => {
    const ids = POSTER_PACK_META.map((meta) => meta.id);
    expect(new Set(ids).size).toBe(ids.length);
    const categories: readonly string[] = POSTER_CATEGORIES.map((category) => category.id);
    const tags: readonly string[] = [...POSTER_TAGS, ...CLIP_TAGS];
    for (const meta of POSTER_PACK_META) {
      expect(categories).toContain(meta.category);
      expect(meta.tags.length).toBeGreaterThan(0);
      for (const tag of meta.tags) {
        expect(tags).toContain(tag);
      }
    }
  });

  it('build valid multi-page designs that match their metadata', () => {
    for (const { meta, design } of designs) {
      expect(designSchema.safeParse(design).success).toBe(true);
      expect(design.pages).toHaveLength(meta.pageCount);
      expect({ width: design.width, height: design.height }).toEqual({
        width: meta.width,
        height: meta.height,
      });
      expect(findPosterPack(meta.id)?.meta).toBe(meta);
    }
  });

  it('only use bundled fonts, icons and photos', () => {
    const photoSources = new Set<string>(Object.values(POSTER_PHOTOS).map((photo) => photo.src));
    const problems = elements.flatMap(({ pack, element }) => {
      if (element.type === 'text' && !isKnownFont(element.fontFamily)) {
        return [`${pack}: font ${element.fontFamily}`];
      }
      if (element.type === 'icon' && !isDesignIcon(element.icon)) {
        return [`${pack}: icon ${element.icon}`];
      }
      if (element.type === 'image' && element.src !== '' && !photoSources.has(element.src)) {
        return [`${pack}: photo ${element.src}`];
      }
      return [];
    });
    expect(problems).toEqual([]);
  });

  it('records exactly one updated-at timestamp per pack', () => {
    expect(Object.keys(POSTER_UPDATED_AT).sort()).toEqual(
      POSTER_PACK_META.map((meta) => meta.id).sort(),
    );
  });

  it('ships every bundled photo and a preview for every page', () => {
    const missing = [
      ...Object.values(POSTER_PHOTOS).map((photo) => photo.src),
      ...POSTER_PACK_META.flatMap((meta) =>
        Array.from({ length: meta.pageCount }, (_, index) => posterPreviewPath(meta.id, index)),
      ),
    ].filter((path) => !existsSync(join(publicDir, path)));
    expect(missing).toEqual([]);
  });
});
