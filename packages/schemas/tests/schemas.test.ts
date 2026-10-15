import { describe, expect, it } from 'bun:test';
import { z } from 'zod';
import {
  APP_PROMO_SEQUENCE,
  brandRevealSchema,
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
  DOODLE_PROMO_SEQUENCE,
  EASING_IDS,
  floatingCardsSchema,
  getClipDefaults,
  getClipMeta,
  getClipSchema,
  HEX_COLOR,
  headlineRevealSchema,
  isClipId,
  phoneFanSchema,
  phoneSpinInSchema,
  readControlMeta,
  sceneTransitionSchema,
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
  it('rejects a malformed color on brand-reveal', () => {
    const bad = { ...CLIP_DEFAULTS['brand-reveal'], markColor: 'not-a-color' };
    expect(brandRevealSchema.safeParse(bad).success).toBe(false);
  });

  it('enforces the phone-fan fixed length of three phones', () => {
    const base = CLIP_DEFAULTS['phone-fan'];
    expect(phoneFanSchema.safeParse({ ...base, phones: base.phones.slice(0, 2) }).success).toBe(
      false,
    );
    expect(
      phoneFanSchema.safeParse({ ...base, phones: [...base.phones, base.phones[0]] }).success,
    ).toBe(false);
  });

  it('enforces the floating-cards card count bounds', () => {
    const base = CLIP_DEFAULTS['floating-cards'];
    expect(floatingCardsSchema.safeParse({ ...base, cards: [] }).success).toBe(false);
    const five = Array.from({ length: 5 }, () => base.cards[0]);
    expect(floatingCardsSchema.safeParse({ ...base, cards: five }).success).toBe(false);
    expect(floatingCardsSchema.safeParse({ ...base, cards: [base.cards[0]] }).success).toBe(true);
  });

  it('keeps headline-reveal text sizes inside the slider range', () => {
    const base = CLIP_DEFAULTS['headline-reveal'];
    expect(headlineRevealSchema.safeParse({ ...base, size: 20 }).success).toBe(false);
    expect(headlineRevealSchema.safeParse({ ...base, size: 120 }).success).toBe(true);
  });

  it('strips unknown properties from a parsed clip object', () => {
    const base = CLIP_DEFAULTS['phone-spin-in'];
    const result = CLIP_SCHEMAS['phone-spin-in'].safeParse({ ...base, surprise: true });
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

  it('places the clips in their intended categories', () => {
    const categoryOf = (id: ClipId) => getClipMeta(id).category;
    expect(categoryOf('headline-reveal')).toBe('typography');
    expect(categoryOf('phone-spin-in')).toBe('devices');
    expect(categoryOf('floating-cards')).toBe('overlays');
    expect(categoryOf('brand-reveal')).toBe('brand');
    expect(categoryOf('studio-backdrop')).toBe('backgrounds');
    expect(categoryOf('scene-transition')).toBe('transitions');
    expect(categoryOf('app-promo')).toBe('sequences');
  });
});

describe('easing enum control', () => {
  it('accepts every easing id and rejects unknown curves', () => {
    const base = CLIP_DEFAULTS['scene-transition'];
    for (const id of EASING_IDS) {
      expect(sceneTransitionSchema.safeParse({ ...base, easing: id }).success).toBe(true);
    }
    expect(sceneTransitionSchema.safeParse({ ...base, easing: 'bounce' }).success).toBe(false);
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

  it('round-trips a custom phone screen image', () => {
    const base = CLIP_DEFAULTS['phone-spin-in'];
    const populated = {
      ...base,
      phone: { ...base.phone, customScreen: 'https://example.com/screen.png' },
    };
    const result = phoneSpinInSchema.safeParse(populated);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone.customScreen).toBe('https://example.com/screen.png');
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
    'doodle-arrows',
    'handwritten-note',
    'doodle-promo',
    'relief-backdrop',
    'app-icon-reveal',
    'phone-pedestal',
    'phone-flat-lay',
    'number-counter',
    'typewriter',
    'word-build',
    'word-punch',
    'scribble-caption',
    'echo-stack',
    'outline-marquee',
    'letter-flip',
    'scooter-promo',
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

  it('bounds the doodle arrows and rejects unknown shapes', () => {
    const defaults = getClipDefaults('doodle-arrows');
    const schema = getClipSchema('doodle-arrows');
    const arrow = defaults.arrows[0];
    expect(schema.safeParse({ ...defaults, arrows: [] }).success).toBe(false);
    expect(schema.safeParse({ ...defaults, arrows: new Array(15).fill(arrow) }).success).toBe(
      false,
    );
    expect(schema.safeParse({ ...defaults, arrows: [{ ...arrow, shape: 'star' }] }).success).toBe(
      false,
    );
  });

  it('rejects an unknown handwriting font and paper pattern', () => {
    const defaults = getClipDefaults('handwritten-note');
    const schema = getClipSchema('handwritten-note');
    expect(schema.safeParse({ ...defaults, font: 'comic' }).success).toBe(false);
    expect(
      schema.safeParse({ ...defaults, look: { ...defaults.look, paper: 'dotted' } }).success,
    ).toBe(false);
  });

  it('builds every doodle promo layer from props its clip schema accepts', () => {
    for (const entry of DOODLE_PROMO_SEQUENCE.entries) {
      expect(getClipSchema(entry.clipId).safeParse(entry.props).success).toBe(true);
      expect(DOODLE_PROMO_SEQUENCE.tracks).toContain(entry.track);
    }
  });

  it('overlaps consecutive doodle promo devices so beats crossfade', () => {
    const devices = DOODLE_PROMO_SEQUENCE.entries.filter((entry) => entry.track === 'Devices');
    for (let index = 1; index < devices.length; index++) {
      const previous = devices[index - 1];
      const current = devices[index];
      if (previous && current) {
        const overlap = previous.from + previous.durationInFrames - current.from;
        expect(overlap).toBeGreaterThanOrEqual(12);
        expect(overlap).toBeLessThanOrEqual(24);
      }
    }
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
    expect(categoryLabel('overlays')).toBe('UI Overlays');
  });
});
