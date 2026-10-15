import { describe, expect, it } from 'bun:test';
import {
  CLIP_DEFAULTS,
  CLIP_SEQUENCES,
  type ClipId,
  getClipDefaults,
  getClipMeta,
  getClipSchema,
  headlineRevealSchema,
  KINETIC_PROMO_SEQUENCE,
  KINETIC_PROMO_TRACKS,
  kineticLook,
  quadrantTransform,
  sequenceLength,
} from '../src';

describe('sequence helpers', () => {
  it('places quadrants at half scale around the frame center', () => {
    expect(quadrantTransform('top-left')).toEqual({ x: -480, y: -270, scale: 0.5 });
    expect(quadrantTransform('bottom-right')).toEqual({ x: 480, y: 270, scale: 0.5 });
  });

  it('measures every registered sequence and gives the kinetic look one accent', () => {
    for (const sequence of Object.values(CLIP_SEQUENCES)) {
      expect(sequenceLength(sequence)).toBeGreaterThan(0);
    }
    expect(kineticLook('#123456').accent).toBe('#123456');
    expect(
      headlineRevealSchema.safeParse({ ...CLIP_DEFAULTS['headline-reveal'], leadWeight: 300 })
        .success,
    ).toBe(true);
  });
});

describe('kinetic type clips', () => {
  const KINETIC_IDS: ClipId[] = [
    'number-counter',
    'typewriter',
    'word-build',
    'word-punch',
    'scribble-caption',
    'echo-stack',
    'outline-marquee',
    'letter-flip',
    'glow-reveal',
  ];

  it('ships every kinetic clip as dark typography with a backdrop toggle and live grain', () => {
    for (const id of KINETIC_IDS) {
      const meta = getClipMeta(id);
      expect(meta.category).toBe('typography');
      expect(meta.theme).toBe('dark');
      expect(meta.tags).toContain('kinetic');
      const defaults = getClipDefaults(id) as {
        look: { showBackdrop: boolean; liveGrain: boolean };
      };
      expect(defaults.look.showBackdrop).toBe(true);
      expect(defaults.look.liveGrain).toBe(true);
    }
  });

  it('rejects unknown entries, intros and outros', () => {
    const build = getClipDefaults('word-build');
    expect(getClipSchema('word-build').safeParse({ ...build, entry: 'spin' }).success).toBe(false);
    const writer = getClipDefaults('typewriter');
    expect(getClipSchema('typewriter').safeParse({ ...writer, outro: 'explode' }).success).toBe(
      false,
    );
    expect(getClipSchema('typewriter').safeParse({ ...writer, intro: 'typed' }).success).toBe(true);
  });
});

describe('kinetic effect clips', () => {
  it('validates the grid and film overlays and bounds their controls', () => {
    for (const id of ['split-grid', 'film-dust'] as ClipId[]) {
      expect(getClipSchema(id).safeParse(getClipDefaults(id)).success).toBe(true);
      expect(getClipMeta(id).category).toBe('overlays');
    }
    const grid = getClipDefaults('split-grid');
    expect(getClipSchema('split-grid').safeParse({ ...grid, columns: 5 }).success).toBe(false);
    const film = getClipDefaults('film-dust');
    expect(getClipSchema('film-dust').safeParse({ ...film, dust: 2 }).success).toBe(false);
  });
});

describe('kinetic promo sequence', () => {
  const entries = KINETIC_PROMO_SEQUENCE.entries;
  const OPENING_END = 1298;

  it('runs the reference length of about 86 seconds on named tracks', () => {
    expect(sequenceLength(KINETIC_PROMO_SEQUENCE)).toBe(2595);
    expect(getClipMeta('kinetic-promo').durationInFrames).toBe(2595);
    for (const item of entries) {
      expect(KINETIC_PROMO_TRACKS).toContain(item.track as (typeof KINETIC_PROMO_TRACKS)[number]);
      expect(getClipSchema(item.clipId).safeParse(item.props).success).toBe(true);
    }
  });

  it('keeps layered entries off their own backdrop except the one studio backdrop', () => {
    const withBackdrop = entries.filter(
      (item) => (item.props as { look?: { showBackdrop?: boolean } }).look?.showBackdrop,
    );
    expect(withBackdrop.map((item) => item.clipId)).toEqual(['studio-backdrop']);
  });

  it('uses only typography and film clips, with no devices', () => {
    expect(entries.some((item) => item.clipId.startsWith('phone-'))).toBe(false);
  });

  it('never leaves the opening empty between beats', () => {
    const beats = entries
      .filter((item) => item.transform === undefined && ['Text', 'Captions'].includes(item.track))
      .filter((item) => item.from < OPENING_END)
      .toSorted((a, b) => a.from - b.from);
    let covered = 0;
    for (const item of beats) {
      expect(item.from).toBeLessThanOrEqual(covered);
      covered = Math.max(covered, item.from + item.durationInFrames);
    }
    expect(covered).toBeGreaterThanOrEqual(OPENING_END - 1);
  });

  it('replays the beats in a two by two grid that fills all four quadrants', () => {
    const quadrants = entries.filter((item) => item.transform !== undefined);
    const corners = new Set(quadrants.map((item) => `${item.transform?.x}:${item.transform?.y}`));
    expect(corners.size).toBe(4);
    expect(Math.min(...quadrants.map((item) => item.from))).toBe(OPENING_END);
  });
});
