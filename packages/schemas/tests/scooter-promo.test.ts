import { describe, expect, it } from 'bun:test';
import {
  getClipMeta,
  getClipSchema,
  type PhonePairProps,
  type PhoneTurnaroundProps,
  SCOOTER_PROMO_SEQUENCE,
} from '../src';

describe('scooter promo', () => {
  it('builds every scooter promo layer from props its clip schema accepts', () => {
    for (const entry of SCOOTER_PROMO_SEQUENCE.entries) {
      const result = getClipSchema(entry.clipId).safeParse(entry.props);
      expect(result.success).toBe(true);
    }
  });

  it('runs the scooter promo for the 28.4 second length of its reference', () => {
    expect(getClipMeta('scooter-promo').durationInFrames).toBe(851);
  });

  it('hands the scooter turnaround to the phone pair on the same pose', () => {
    const turn = SCOOTER_PROMO_SEQUENCE.entries.find((item) => item.clipId === 'phone-turnaround');
    const pair = SCOOTER_PROMO_SEQUENCE.entries.find((item) => item.clipId === 'phone-pair');
    const turnProps = getClipSchema('phone-turnaround').parse(turn?.props) as PhoneTurnaroundProps;
    const pairProps = getClipSchema('phone-pair').parse(pair?.props) as PhonePairProps;
    expect(pairProps.entrance).toBe('from-behind');
    expect(pairProps.position.x).toBeCloseTo(turnProps.position.x + turnProps.travelX);
    expect(turnProps.entry).toBe('turn-in');
    expect(pairProps.scale).toBeCloseTo(turnProps.scale);
    expect(pairProps.angle).toBeCloseTo(turnProps.endYaw);
    expect(pairProps.phones[0]?.screen).toBe(turnProps.secondScreen);
    expect(pairProps.stage).toEqual(turnProps.stage);
    const turnFrom = turn?.from ?? 0;
    expect(turnFrom + turnProps.secondTurnAt + turnProps.secondTurnFrames).toBeLessThanOrEqual(
      pair?.from ?? 0,
    );
    expect(turnFrom + (turn?.durationInFrames ?? 0)).toBe(pair?.from ?? 0);
  });
});
