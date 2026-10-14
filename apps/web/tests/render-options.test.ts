import { describe, expect, it } from 'bun:test';
import { DEFAULT_RENDER_OPTIONS, sanitizeRenderOptions } from '../src/lib/render-options';

describe('sanitizeRenderOptions', () => {
  it('falls back to defaults for missing or invalid input', () => {
    expect(sanitizeRenderOptions(null)).toEqual(DEFAULT_RENDER_OPTIONS);
    expect(sanitizeRenderOptions({ codec: 'nope', crf: 'x', scale: 'y' })).toEqual(
      DEFAULT_RENDER_OPTIONS,
    );
  });

  it('keeps a supported codec and clamps crf and scale', () => {
    const result = sanitizeRenderOptions({ codec: 'vp9', crf: 99, scale: 10 });
    expect(result.codec).toBe('vp9');
    expect(result.crf).toBe(51);
    expect(result.scale).toBe(4);
  });

  it('accepts in-range values', () => {
    const result = sanitizeRenderOptions({ codec: 'h265', crf: 20, scale: 0.5 });
    expect(result).toMatchObject({ codec: 'h265', crf: 20, scale: 0.5 });
  });
});
