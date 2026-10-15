import { describe, expect, it } from 'bun:test';
import { landing, launch, MIN_TEXT_SPEED } from '../src/promo/timing';

const steps = (sample: (frame: number) => number, from: number, to: number): number[] =>
  Array.from({ length: to - from }, (_, index) =>
    Math.abs(sample(from + index + 1) - sample(from + index)),
  );

describe('text travel', () => {
  it('lands without creeping below the minimum speed', () => {
    for (const distance of [8, 18, 47, 90]) {
      const offset = (frame: number) => landing(frame, [10, 42], distance);
      expect(offset(10)).toBe(distance);
      expect(offset(200)).toBe(0);
      for (const step of steps(offset, 10, 200)) {
        expect(step === 0 || step >= MIN_TEXT_SPEED - 1e-9).toBe(true);
      }
      const moving = steps(offset, 10, 200).map((step) => step > 0);
      expect(moving.indexOf(false)).toBe(moving.lastIndexOf(true) + 1);
    }
  });

  it('launches at the minimum speed or faster until it reaches the distance', () => {
    for (const distance of [6, 21, 40]) {
      const offset = (frame: number) => launch(frame, [100, 114], distance);
      expect(offset(100)).toBe(0);
      expect(offset(114)).toBe(distance);
      for (const step of steps(offset, 100, 114).filter((moved) => moved > 0)) {
        expect(step).toBeGreaterThanOrEqual(MIN_TEXT_SPEED - 1e-9);
      }
    }
  });
});
