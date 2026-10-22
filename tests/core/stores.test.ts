import { afterAll, describe, expect, it } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { appendExport, type ExportRecord, readExports, updateExport } from '@/core';

const roots: string[] = [];

const makeRoot = async (): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), 'cliplib-stores-'));
  roots.push(root);
  return root;
};

afterAll(async () => {
  await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
});

const exportRecord = (overrides: Partial<ExportRecord> = {}): ExportRecord => ({
  exportId: crypto.randomUUID(),
  clipId: 'phone-spin-in',
  mp4: 'exports/a.mp4',
  poster: 'exports/a.png',
  createdAt: new Date().toISOString(),
  status: 'rendering',
  progress: 0,
  propsVersionId: 'defaults',
  error: null,
  ...overrides,
});

describe('exports store', () => {
  it('returns an empty manifest when none exists', async () => {
    const root = await makeRoot();
    expect(await readExports(root)).toEqual([]);
  });

  it('prepends appended records so the newest is first', async () => {
    const root = await makeRoot();
    const first = exportRecord({ exportId: 'one' });
    const second = exportRecord({ exportId: 'two' });
    await appendExport(root, first);
    const manifest = await appendExport(root, second);
    expect(manifest.map((record) => record.exportId)).toEqual(['two', 'one']);
    expect((await readExports(root)).map((record) => record.exportId)).toEqual(['two', 'one']);
  });

  it('drives a record through rendering, progress and done transitions', async () => {
    const root = await makeRoot();
    const record = exportRecord({ exportId: 'render', status: 'rendering', progress: 0 });
    await appendExport(root, record);

    const midway = await updateExport(root, 'render', { progress: 0.5 });
    expect(midway).toMatchObject({ status: 'rendering', progress: 0.5 });

    const finished = await updateExport(root, 'render', { status: 'done', progress: 1 });
    expect(finished).toMatchObject({ status: 'done', progress: 1 });

    const persisted = await readExports(root);
    expect(persisted[0]).toMatchObject({ status: 'done', progress: 1 });
  });

  it('records an error transition', async () => {
    const root = await makeRoot();
    await appendExport(root, exportRecord({ exportId: 'boom' }));
    const failed = await updateExport(root, 'boom', { status: 'error', error: 'render crashed' });
    expect(failed).toMatchObject({ status: 'error', error: 'render crashed' });
  });

  it('returns null and writes nothing when the id is unknown', async () => {
    const root = await makeRoot();
    await appendExport(root, exportRecord({ exportId: 'present' }));
    expect(await updateExport(root, 'absent', { progress: 1 })).toBeNull();
    const manifest = await readExports(root);
    expect(manifest).toHaveLength(1);
    expect(manifest[0]?.progress).toBe(0);
  });

  it('only patches the targeted record', async () => {
    const root = await makeRoot();
    await appendExport(root, exportRecord({ exportId: 'keep', progress: 0.1 }));
    await appendExport(root, exportRecord({ exportId: 'change', progress: 0.1 }));
    await updateExport(root, 'change', { progress: 0.9 });
    const byId = Object.fromEntries((await readExports(root)).map((r) => [r.exportId, r.progress]));
    expect(byId).toEqual({ keep: 0.1, change: 0.9 });
  });
});
