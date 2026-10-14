import { describe, expect, it } from 'bun:test';
import { z } from 'zod';
import {
  CLIP_DEFAULTS,
  CLIP_IDS,
  CLIP_REGISTRY,
  CLIP_SCHEMAS,
  type ClipId,
  getClipDefaults,
  getClipMeta,
  getClipSchema,
  HEX_COLOR,
  isClipId,
  notificationStackSchema,
  orbitCardsSchema,
  readControlMeta,
  SPLIT_FLAP_COLUMNS,
  splitFlapSchema,
  zColor,
  zMultiline,
  zSlider,
} from '../src/index';

describe('clip registry completeness', () => {
  it('has a schema, defaults and registry entry for every clip id', () => {
    for (const id of CLIP_IDS) {
      expect(CLIP_SCHEMAS[id]).toBeDefined();
      expect(CLIP_DEFAULTS[id]).toBeDefined();
      expect(getClipMeta(id).id).toBe(id);
    }
  });

  it('keeps the registry and the id union in exact sync', () => {
    const registryIds = CLIP_REGISTRY.map((meta) => meta.id).sort();
    expect(registryIds).toEqual([...CLIP_IDS].sort());
    expect(CLIP_REGISTRY).toHaveLength(CLIP_IDS.length);
  });

  it('exposes coherent, positive timing and dimension metadata', () => {
    for (const meta of CLIP_REGISTRY) {
      expect(meta.title.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(0);
      expect(meta.source).toBe(`packages/compositions/src/scenes/${meta.id}.tsx`);
      expect(meta.fps).toBeGreaterThan(0);
      expect(meta.width).toBeGreaterThan(0);
      expect(meta.height).toBeGreaterThan(0);
      expect(meta.durationInFrames).toBeGreaterThan(0);
      expect(meta.posterFrame).toBeGreaterThanOrEqual(0);
      expect(meta.posterFrame).toBeLessThan(meta.durationInFrames);
    }
  });

  it('resolves schemas and defaults through the accessor helpers', () => {
    for (const id of CLIP_IDS) {
      expect(getClipSchema(id)).toBe(CLIP_SCHEMAS[id]);
      expect(getClipDefaults(id)).toBe(CLIP_DEFAULTS[id]);
    }
  });
});

describe('isClipId', () => {
  it('accepts known ids and rejects unknown strings', () => {
    for (const id of CLIP_IDS) {
      expect(isClipId(id)).toBe(true);
    }
    expect(isClipId('not-a-clip')).toBe(false);
    expect(isClipId('')).toBe(false);
  });
});

describe('clip defaults round-trip', () => {
  it('parses every clip default cleanly and returns an equal value', () => {
    for (const id of CLIP_IDS) {
      const result = CLIP_SCHEMAS[id as ClipId].safeParse(CLIP_DEFAULTS[id]);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(CLIP_DEFAULTS[id]);
      }
    }
  });
});

describe('clip schema constraints', () => {
  it('rejects a malformed color on orbit-cards', () => {
    const bad = { ...CLIP_DEFAULTS['orbit-cards'], background: 'not-a-color' };
    expect(orbitCardsSchema.safeParse(bad).success).toBe(false);
  });

  it('enforces the orbit-cards fixed length of eight cards', () => {
    const base = CLIP_DEFAULTS['orbit-cards'];
    expect(orbitCardsSchema.safeParse({ ...base, cards: base.cards.slice(0, 7) }).success).toBe(
      false,
    );
    expect(
      orbitCardsSchema.safeParse({ ...base, cards: [...base.cards, base.cards[0]] }).success,
    ).toBe(false);
  });

  it('enforces the notification-stack note count bounds', () => {
    const base = CLIP_DEFAULTS['notification-stack'];
    expect(notificationStackSchema.safeParse({ ...base, notes: [] }).success).toBe(false);
    const sevenNotes = Array.from({ length: 7 }, () => base.notes[0]);
    expect(notificationStackSchema.safeParse({ ...base, notes: sevenNotes }).success).toBe(false);
    expect(notificationStackSchema.safeParse({ ...base, notes: [base.notes[0]] }).success).toBe(
      true,
    );
  });

  it('caps split-flap row text at the column width', () => {
    const base = CLIP_DEFAULTS['split-flap'];
    const tooLong = 'X'.repeat(SPLIT_FLAP_COLUMNS + 1);
    const withLongRow = { ...base, rows: [{ text: tooLong, color: '#ffffff' }] };
    expect(splitFlapSchema.safeParse(withLongRow).success).toBe(false);
    const exact = 'Y'.repeat(SPLIT_FLAP_COLUMNS);
    expect(
      splitFlapSchema.safeParse({ ...base, rows: [{ text: exact, color: '#ffffff' }] }).success,
    ).toBe(true);
  });

  it('strips unknown properties from a parsed clip object', () => {
    const base = CLIP_DEFAULTS['product-demo'];
    const result = CLIP_SCHEMAS['product-demo'].safeParse({ ...base, surprise: true });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty('surprise');
      expect(result.data).toEqual(base);
    }
  });
});

describe('control metadata', () => {
  it('accepts six and eight digit hex colors and rejects others', () => {
    expect(HEX_COLOR.test('#abcdef')).toBe(true);
    expect(HEX_COLOR.test('#ABCDEF12')).toBe(true);
    expect(HEX_COLOR.test('#fff')).toBe(false);
    expect(HEX_COLOR.test('abcdef')).toBe(false);
    expect(zColor().safeParse('#112233').success).toBe(true);
    expect(zColor().safeParse('red').success).toBe(false);
  });

  it('reads color, textarea and slider hints back from a schema', () => {
    expect(readControlMeta(zColor())).toEqual({ control: 'color' });
    expect(readControlMeta(zMultiline())).toEqual({ control: 'textarea' });
    expect(readControlMeta(zSlider({ min: 0, max: 10, step: 2 }))).toEqual({
      control: 'slider',
      step: 2,
    });
  });

  it('defaults the slider step to one when omitted', () => {
    expect(readControlMeta(zSlider({ min: 0, max: 4 }))).toEqual({ control: 'slider', step: 1 });
  });

  it('returns undefined for a schema without control metadata', () => {
    expect(readControlMeta(z.string())).toBeUndefined();
    expect(readControlMeta(z.number())).toBeUndefined();
  });

  it('keeps slider bounds enforced on the underlying number', () => {
    const slider = zSlider({ min: 1, max: 3 });
    expect(slider.safeParse(2).success).toBe(true);
    expect(slider.safeParse(0).success).toBe(false);
    expect(slider.safeParse(4).success).toBe(false);
  });
});
