import { afterAll, describe, expect, it } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { z } from 'zod';
import { type ControlDescriptor, describeSchema, readHistory, readProps, writeProps } from '@/core';
import { CLIP_DEFAULTS, CLIP_SCHEMAS, zColor, zMultiline, zSlider } from '@/schemas';

const byPath = (controls: ControlDescriptor[], key: string): ControlDescriptor => {
  const found = controls.find((control) => control.path[0] === key);
  if (found === undefined) {
    throw new Error(`no control for ${key}`);
  }
  return found;
};

describe('describeSchema', () => {
  const schema = z.object({
    title: z.string(),
    bg: zColor(),
    notes: zMultiline(),
    speed: zSlider({ min: 0, max: 2, step: 0.1 }),
    flag: z.boolean(),
    mode: z.enum(['a', 'b']),
    items: z
      .array(z.object({ t: z.string(), c: zColor() }))
      .min(1)
      .max(3),
    fixed: z.array(z.string()).length(8),
  });
  const controls = describeSchema(schema);

  it('maps each zod kind to the right control', () => {
    expect(byPath(controls, 'title').kind).toBe('text');
    expect(byPath(controls, 'bg').kind).toBe('color');
    const notes = byPath(controls, 'notes');
    expect(notes.kind === 'text' && notes.multiline).toBe(true);
    const speed = byPath(controls, 'speed');
    expect(speed).toMatchObject({ kind: 'number', min: 0, max: 2, step: 0.1 });
    expect(byPath(controls, 'flag').kind).toBe('boolean');
    expect(byPath(controls, 'mode')).toMatchObject({ kind: 'enum', options: ['a', 'b'] });
  });

  it('describes arrays with bounds and item fields', () => {
    const items = byPath(controls, 'items');
    expect(items).toMatchObject({ kind: 'array', min: 1, max: 3 });
    if (items.kind === 'array') {
      expect(items.item.map((field) => field.kind)).toEqual(['text', 'color']);
    }
    expect(byPath(controls, 'fixed')).toMatchObject({ kind: 'array', min: 8, max: 8 });
  });

  it('covers every top-level field of every real clip schema', () => {
    for (const schemaForClip of Object.values(CLIP_SCHEMAS)) {
      const described = describeSchema(schemaForClip);
      expect(described.length).toBeGreaterThan(0);
    }
  });
});

describe('props store', () => {
  const roots: string[] = [];
  const makeRoot = async (): Promise<string> => {
    const root = await mkdtemp(join(tmpdir(), 'cliplib-'));
    roots.push(root);
    return root;
  };

  afterAll(async () => {
    await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
  });

  it('round-trips props and records a version', async () => {
    const root = await makeRoot();
    const written = await writeProps(
      root,
      'phone-spin-in',
      CLIP_DEFAULTS['phone-spin-in'],
      'first',
    );
    expect(written.values).toEqual(CLIP_DEFAULTS['phone-spin-in']);
    const read = await readProps(root, 'phone-spin-in');
    expect(read.currentVersionId).toBe(written.currentVersionId);
    const history = await readHistory(root, 'phone-spin-in');
    expect(history).toHaveLength(1);
    expect(history[0]?.label).toBe('first');
  });

  it('seeds defaults when no file exists', async () => {
    const root = await makeRoot();
    const read = await readProps(root, 'brand-reveal');
    expect(read.currentVersionId).toBe('defaults');
    expect(read.values).toEqual(CLIP_DEFAULTS['brand-reveal']);
  });

  it('rejects invalid props', async () => {
    const root = await makeRoot();
    const bad = { ...CLIP_DEFAULTS['brand-reveal'], markColor: 'nope' };
    await expect(writeProps(root, 'brand-reveal', bad)).rejects.toThrow();
  });
});
