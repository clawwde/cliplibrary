import { describe, expect, it } from 'bun:test';
import { getAtPath, setAtPath } from '../src/lib/value-path';

describe('value-path', () => {
  it('reads nested object and array values', () => {
    expect(getAtPath({ a: { b: [{ c: 1 }] } }, ['a', 'b', '0', 'c'])).toBe(1);
    expect(getAtPath({ a: 1 }, ['missing'])).toBeUndefined();
  });

  it('sets values immutably', () => {
    const root = { a: { b: 1 } };
    const next = setAtPath(root, ['a', 'b'], 2);
    expect(next).toEqual({ a: { b: 2 } });
    expect(root.a.b).toBe(1);
  });

  it('sets array items by index without mutating the source', () => {
    const root = { items: [{ x: 1 }, { x: 2 }] };
    const next = setAtPath(root, ['items', '1', 'x'], 9);
    expect(next).toEqual({ items: [{ x: 1 }, { x: 9 }] });
    expect(root.items[1]?.x).toBe(2);
  });
});
