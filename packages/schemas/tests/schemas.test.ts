import { describe, expect, it } from 'bun:test';
import { z } from 'zod';
import {
  APP_PROMO_SEQUENCE,
  barChartGrowSchema,
  CLIP_CATEGORY_IDS,
  CLIP_DEFAULTS,
  CLIP_IDS,
  CLIP_MODULES,
  CLIP_REGISTRY,
  CLIP_SCHEMAS,
  CLIP_TAGS,
  CLIP_THEMES,
  type ClipId,
  categoryLabel,
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

const CATEGORIES: readonly string[] = CLIP_CATEGORY_IDS;

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
    expect(categoryOf('typewriter')).toBe('typography');
    expect(categoryOf('count-up')).toBe('data');
    expect(categoryOf('image-showcase')).toBe('media');
    expect(categoryOf('phone-spin-in')).toBe('devices');
    expect(categoryOf('app-promo')).toBe('sequences');
  });
});

describe('expanded clip library', () => {
  it('ships at least fifteen clips', () => {
    expect(CLIP_IDS.length).toBeGreaterThanOrEqual(15);
  });

  it('files the latest batch of clips in the right categories', () => {
    const categoryOf = (id: ClipId) => getClipMeta(id).category;
    expect(categoryOf('word-reveal')).toBe('typography');
    expect(categoryOf('kinetic-type')).toBe('typography');
    expect(categoryOf('gradient-sweep-text')).toBe('typography');
    expect(categoryOf('bar-chart-grow')).toBe('data');
    expect(categoryOf('line-draw')).toBe('data');
    expect(categoryOf('donut-progress')).toBe('data');
    expect(categoryOf('ken-burns')).toBe('media');
    expect(categoryOf('image-grid-reveal')).toBe('media');
    expect(categoryOf('mosaic-reveal')).toBe('transitions');
    expect(categoryOf('notification-stack')).toBe('overlays');
    expect(categoryOf('product-demo')).toBe('sequences');
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

describe('promo clips', () => {
  const PROMO_IDS: ClipId[] = [
    'app-promo',
    'phone-spin-in',
    'phone-turnaround',
    'phone-fan',
    'phone-swap',
    'phone-scroll',
    'phone-wall',
    'phone-pair',
    'floating-cards',
    'headline-reveal',
    'feature-callouts',
    'detail-list',
    'brand-reveal',
    'cta-end-card',
    'studio-backdrop',
    'scene-transition',
  ];

  it('validates every promo default against its schema', () => {
    for (const id of PROMO_IDS) {
      expect(getClipSchema(id).safeParse(getClipDefaults(id)).success).toBe(true);
    }
  });

  it('rejects an unknown phone screen and finish', () => {
    const defaults = getClipDefaults('phone-spin-in');
    const schema = getClipSchema('phone-spin-in');
    expect(
      schema.safeParse({ ...defaults, phone: { ...defaults.phone, screen: 'nope' } }).success,
    ).toBe(false);
    expect(
      schema.safeParse({ ...defaults, phone: { ...defaults.phone, finish: 'gold' } }).success,
    ).toBe(false);
  });

  it('caps the detail list at six entries', () => {
    const defaults = getClipDefaults('detail-list');
    const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    expect(getClipSchema('detail-list').safeParse({ ...defaults, items }).success).toBe(false);
  });

  it('builds every app promo layer from props its clip schema accepts', () => {
    for (const entry of APP_PROMO_SEQUENCE.entries) {
      const result = getClipSchema(entry.clipId).safeParse(entry.props);
      expect(result.success).toBe(true);
    }
  });

  it('keeps phone swap and its feature callouts on the same beats', () => {
    const swap = APP_PROMO_SEQUENCE.entries.find((entry) => entry.clipId === 'phone-swap');
    const callouts = APP_PROMO_SEQUENCE.entries.find(
      (entry) => entry.clipId === 'feature-callouts',
    );
    expect(swap).toBeDefined();
    expect(callouts).toBeDefined();
    const end = (item: { from: number; durationInFrames: number } | undefined) =>
      (item?.from ?? 0) + (item?.durationInFrames ?? 0);
    expect(end(swap)).toBe(end(callouts));
  });
});

describe('clip taxonomy', () => {
  it('tags every clip from the shared vocabulary without duplicates', () => {
    const vocabulary: readonly string[] = CLIP_TAGS;
    for (const meta of CLIP_REGISTRY) {
      expect(meta.tags.length).toBeGreaterThan(0);
      expect(new Set(meta.tags).size).toBe(meta.tags.length);
      for (const tag of meta.tags) {
        expect(vocabulary).toContain(tag);
      }
    }
  });

  it('gives every clip a known theme', () => {
    const themes: readonly string[] = CLIP_THEMES;
    for (const meta of CLIP_REGISTRY) {
      expect(themes).toContain(meta.theme);
    }
  });

  it('labels categories for display', () => {
    expect(categoryLabel('devices')).toBe('3D Devices');
    expect(categoryLabel('data')).toBe('Data & Charts');
  });
});
