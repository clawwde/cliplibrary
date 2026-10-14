import { describe, expect, it } from 'bun:test';
import {
  buildLibraryProject,
  getLibraryClip,
  getLibraryClipMeta,
  isLibraryClipId,
  LIBRARY_CLIP_IDS,
  LIBRARY_CLIP_META,
  LIBRARY_CLIPS,
  listElements,
  parseProject,
  safeParseProject,
} from '../src/index';

describe('library clip registry', () => {
  it('ships at least ten multi-element clips', () => {
    expect(LIBRARY_CLIPS.length).toBeGreaterThanOrEqual(10);
    expect(LIBRARY_CLIP_META).toHaveLength(LIBRARY_CLIPS.length);
    expect(LIBRARY_CLIP_IDS.length).toBe(LIBRARY_CLIPS.length);
  });

  it('keeps ids, metadata and lookup helpers in sync', () => {
    for (const id of LIBRARY_CLIP_IDS) {
      expect(isLibraryClipId(id)).toBe(true);
      expect(getLibraryClipMeta(id).id).toBe(id);
      expect(getLibraryClip(id).meta.id).toBe(id);
      expect(getLibraryClipMeta(id).title.length).toBeGreaterThan(0);
      expect(getLibraryClipMeta(id).description.length).toBeGreaterThan(0);
    }
    expect(isLibraryClipId('not-a-clip')).toBe(false);
  });

  it('validates every clip project and uses more than one element', () => {
    for (const id of LIBRARY_CLIP_IDS) {
      const project = buildLibraryProject(id);
      expect(() => parseProject(project)).not.toThrow();
      expect(safeParseProject(project)).not.toBeNull();
      expect(listElements(project).length).toBeGreaterThan(1);
      expect(project.tracks.length).toBeGreaterThan(1);
    }
  });

  it('keeps every element inside the clip timeline bounds', () => {
    for (const id of LIBRARY_CLIP_IDS) {
      const project = buildLibraryProject(id);
      for (const element of listElements(project)) {
        expect(element.from).toBeGreaterThanOrEqual(0);
        expect(element.durationInFrames).toBeGreaterThanOrEqual(1);
        expect(element.from + element.durationInFrames).toBeLessThanOrEqual(project.durationInFrames);
      }
    }
  });

  it('gives every element a unique id', () => {
    for (const id of LIBRARY_CLIP_IDS) {
      const ids = listElements(buildLibraryProject(id)).map((element) => element.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
