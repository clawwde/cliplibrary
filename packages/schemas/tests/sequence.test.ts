import { describe, expect, it } from 'bun:test';
import {
  CLIP_DEFAULTS,
  CLIP_SEQUENCES,
  headlineRevealSchema,
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
