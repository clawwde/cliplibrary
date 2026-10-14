import { describe, expect, it } from 'bun:test';
import { z } from 'zod';
import {
  CLIP_DEFAULTS,
  CLIP_IDS,
  CLIP_SCHEMAS,
  getClipMeta,
  orbitCardsSchema,
  readControlMeta,
  zColor,
  zMultiline,
  zSlider,
} from '../src/index';

describe('clip schemas', () => {
  it('every clip id has a schema, defaults, and registry entry', () => {
    for (const id of CLIP_IDS) {
      expect(CLIP_SCHEMAS[id]).toBeDefined();
      expect(CLIP_DEFAULTS[id]).toBeDefined();
      expect(getClipMeta(id).id).toBe(id);
    }
  });

  it('defaults parse against their own schema', () => {
    for (const id of CLIP_IDS) {
      const result = CLIP_SCHEMAS[id].safeParse(CLIP_DEFAULTS[id]);
      expect(result.success).toBe(true);
    }
  });

  it('rejects an invalid color', () => {
    const bad = { ...CLIP_DEFAULTS['orbit-cards'], background: 'not-a-color' };
    expect(orbitCardsSchema.safeParse(bad).success).toBe(false);
  });

  it('enforces the orbit-cards fixed length of eight', () => {
    const base = CLIP_DEFAULTS['orbit-cards'];
    const tooFew = { ...base, cards: base.cards.slice(0, 7) };
    expect(orbitCardsSchema.safeParse(tooFew).success).toBe(false);
  });
});

describe('control metadata', () => {
  it('reads color, textarea and slider control hints back from a schema', () => {
    expect(readControlMeta(zColor())).toEqual({ control: 'color' });
    expect(readControlMeta(zMultiline())).toEqual({ control: 'textarea' });
    expect(readControlMeta(zSlider({ min: 0, max: 10, step: 2 }))).toEqual({
      control: 'slider',
      step: 2,
    });
  });

  it('returns undefined for a plain string', () => {
    expect(readControlMeta(z.string())).toBeUndefined();
  });
});
