import { describe, expect, it } from 'bun:test';
import { z } from 'zod';
import {
  barChartGrowSchema,
  CLIP_DEFAULTS,
  CLIP_IDS,
  CLIP_MODULES,
  CLIP_REGISTRY,
  CLIP_SCHEMAS,
  type ClipId,
  donutProgressSchema,
  EASING_IDS,
  getClipDefaults,
  getClipMeta,
  getClipSchema,
  HEX_COLOR,
  imageShowcaseSchema,
  isClipId,
  lineDrawSchema,
  mosaicRevealSchema,
  notificationStackSchema,
  orbitCardsSchema,
  readControlMeta,
  SPLIT_FLAP_COLUMNS,
  splitFlapSchema,
  zColor,
  zImage,
  zMultiline,
  zSlider,
  zVideo,
} from '../src/index';

const CATEGORIES = ['text', 'data', 'media', 'complex'];

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
      expect(CATEGORIES).toContain(meta.category);
      expect(meta.source).toBe(`packages/compositions/src/scenes/${meta.category}/${meta.id}.tsx`);
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

describe('pluggable module architecture', () => {
  it('registers every module in a seeded category', () => {
    for (const module of CLIP_MODULES) {
      expect(CATEGORIES).toContain(module.meta.category);
      expect(module.id).toBe(module.meta.id);
      expect(CLIP_SCHEMAS[module.id]).toBe(module.schema);
      expect(CLIP_DEFAULTS[module.id]).toBe(module.defaults);
    }
  });

  it('exposes at least one clip in each seeded category', () => {
    const present = new Set(CLIP_REGISTRY.map((meta) => meta.category));
    for (const category of CATEGORIES) {
      expect(present.has(category)).toBe(true);
    }
  });

  it('places the new clips in their intended categories', () => {
    const categoryOf = (id: ClipId) => getClipMeta(id).category;
    expect(categoryOf('typewriter')).toBe('text');
    expect(categoryOf('count-up')).toBe('data');
    expect(categoryOf('image-showcase')).toBe('media');
  });
});

describe('expanded clip library', () => {
  it('ships at least fifteen clips', () => {
    expect(CLIP_IDS.length).toBeGreaterThanOrEqual(15);
  });

  it('files the latest batch of clips in the right categories', () => {
    const categoryOf = (id: ClipId) => getClipMeta(id).category;
    expect(categoryOf('word-reveal')).toBe('text');
    expect(categoryOf('kinetic-type')).toBe('text');
    expect(categoryOf('gradient-sweep-text')).toBe('text');
    expect(categoryOf('bar-chart-grow')).toBe('data');
    expect(categoryOf('line-draw')).toBe('data');
    expect(categoryOf('donut-progress')).toBe('data');
    expect(categoryOf('ken-burns')).toBe('media');
    expect(categoryOf('image-grid-reveal')).toBe('media');
    expect(categoryOf('mosaic-reveal')).toBe('complex');
  });

  it('enforces the bar-chart-grow bar count bounds', () => {
    const base = CLIP_DEFAULTS['bar-chart-grow'];
    const one = base.bars.slice(0, 1);
    expect(barChartGrowSchema.safeParse({ ...base, bars: one }).success).toBe(false);
    const nine = Array.from({ length: 9 }, () => base.bars[0]);
    expect(barChartGrowSchema.safeParse({ ...base, bars: nine }).success).toBe(false);
  });

  it('enforces the line-draw point count bounds', () => {
    const base = CLIP_DEFAULTS['line-draw'];
    expect(lineDrawSchema.safeParse({ ...base, points: [10] }).success).toBe(false);
    const thirteen = Array.from({ length: 13 }, () => 50);
    expect(lineDrawSchema.safeParse({ ...base, points: thirteen }).success).toBe(false);
  });

  it('clamps the donut-progress percentage to a zero to one hundred range', () => {
    const base = CLIP_DEFAULTS['donut-progress'];
    expect(donutProgressSchema.safeParse({ ...base, percent: 120 }).success).toBe(false);
    expect(donutProgressSchema.safeParse({ ...base, percent: 64 }).success).toBe(true);
  });

  it('accepts every easing id on the complex clips', () => {
    for (const id of EASING_IDS) {
      expect(
        mosaicRevealSchema.safeParse({ ...CLIP_DEFAULTS['mosaic-reveal'], easing: id }).success,
      ).toBe(true);
    }
  });
});

describe('easing enum control', () => {
  it('accepts every easing id and rejects unknown curves', () => {
    const base = CLIP_DEFAULTS['mosaic-reveal'];
    for (const id of EASING_IDS) {
      expect(mosaicRevealSchema.safeParse({ ...base, easing: id }).success).toBe(true);
    }
    expect(mosaicRevealSchema.safeParse({ ...base, easing: 'bounce' }).success).toBe(false);
  });
});

describe('image media control', () => {
  it('tags an image field with image control metadata', () => {
    expect(readControlMeta(zImage())).toEqual({ control: 'image' });
  });

  it('accepts empty, url and data-uri strings but rejects non-strings', () => {
    expect(zImage().safeParse('').success).toBe(true);
    expect(zImage().safeParse('https://example.com/a.png').success).toBe(true);
    expect(zImage().safeParse('data:image/png;base64,AAAA').success).toBe(true);
    expect(zImage().safeParse(42).success).toBe(false);
  });

  it('round-trips the image showcase defaults and populated images', () => {
    const base = CLIP_DEFAULTS['image-showcase'];
    expect(imageShowcaseSchema.safeParse(base).success).toBe(true);
    const populated = { ...base, image1: 'https://example.com/one.jpg' };
    const result = imageShowcaseSchema.safeParse(populated);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image1).toBe('https://example.com/one.jpg');
    }
  });
});

describe('video media control', () => {
  it('tags a video field with video control metadata', () => {
    expect(readControlMeta(zVideo())).toEqual({ control: 'video' });
  });

  it('accepts empty, url and data-uri strings but rejects non-strings', () => {
    expect(zVideo().safeParse('').success).toBe(true);
    expect(zVideo().safeParse('https://example.com/a.mp4').success).toBe(true);
    expect(zVideo().safeParse('data:video/mp4;base64,AAAA').success).toBe(true);
    expect(zVideo().safeParse(42).success).toBe(false);
  });
});
