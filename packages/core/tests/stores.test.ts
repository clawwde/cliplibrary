import { afterAll, describe, expect, it } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CLIP_DEFAULTS } from '@cliplibrary/schemas';
import {
  appendExport,
  appendSnapshot,
  type ExportRecord,
  findSnapshot,
  readExports,
  readHistory,
  readProps,
  revertToVersion,
  updateExport,
  type VersionSnapshot,
  writeProps,
} from '../src/index';

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

describe('history store', () => {
  const snapshot = (overrides: Partial<VersionSnapshot> = {}): VersionSnapshot => ({
    versionId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    label: null,
    values: { a: 1 },
    ...overrides,
  });

  it('returns empty history when none exists', async () => {
    const root = await makeRoot();
    expect(await readHistory(root, 'brand-reveal')).toEqual([]);
  });

  it('prepends snapshots so the newest is first', async () => {
    const root = await makeRoot();
    await appendSnapshot(root, 'brand-reveal', snapshot({ versionId: 'v1' }));
    const history = await appendSnapshot(root, 'brand-reveal', snapshot({ versionId: 'v2' }));
    expect(history.map((entry) => entry.versionId)).toEqual(['v2', 'v1']);
  });

  it('finds a snapshot by id and returns null for a miss', async () => {
    const root = await makeRoot();
    await appendSnapshot(root, 'brand-reveal', snapshot({ versionId: 'target', label: 'hit' }));
    const found = await findSnapshot(root, 'brand-reveal', 'target');
    expect(found?.label).toBe('hit');
    expect(await findSnapshot(root, 'brand-reveal', 'nope')).toBeNull();
  });

  it('keeps history per clip id separate', async () => {
    const root = await makeRoot();
    await appendSnapshot(root, 'brand-reveal', snapshot({ versionId: 'flap' }));
    await appendSnapshot(root, 'phone-spin-in', snapshot({ versionId: 'orbit' }));
    expect((await readHistory(root, 'brand-reveal')).map((e) => e.versionId)).toEqual(['flap']);
    expect((await readHistory(root, 'phone-spin-in')).map((e) => e.versionId)).toEqual(['orbit']);
  });
});

describe('props store history and revert', () => {
  it('appends a snapshot per write with unique version ids', async () => {
    const root = await makeRoot();
    const first = await writeProps(root, 'brand-reveal', CLIP_DEFAULTS['brand-reveal'], 'first');
    const second = await writeProps(root, 'brand-reveal', CLIP_DEFAULTS['brand-reveal'], 'second');
    expect(first.currentVersionId).not.toBe(second.currentVersionId);
    const history = await readHistory(root, 'brand-reveal');
    expect(history.map((entry) => entry.label)).toEqual(['second', 'first']);
  });

  it('reverts to an earlier version and records the revert as a new snapshot', async () => {
    const root = await makeRoot();
    const original = CLIP_DEFAULTS['brand-reveal'];
    const firstWrite = await writeProps(root, 'brand-reveal', original, 'original');
    const edited = { ...original, header: 'ARRIVALS' };
    await writeProps(root, 'brand-reveal', edited, 'edited');

    const reverted = await revertToVersion(root, 'brand-reveal', firstWrite.currentVersionId);
    expect(reverted?.values).toEqual(original);

    const current = await readProps(root, 'brand-reveal');
    expect(current.values).toEqual(original);
    const history = await readHistory(root, 'brand-reveal');
    expect(history).toHaveLength(3);
    expect(history[0]?.label).toBe(`revert of ${firstWrite.currentVersionId}`);
  });

  it('returns null when reverting to an unknown version', async () => {
    const root = await makeRoot();
    await writeProps(root, 'brand-reveal', CLIP_DEFAULTS['brand-reveal'], 'only');
    expect(await revertToVersion(root, 'brand-reveal', 'missing')).toBeNull();
  });

  it('seeds defaults with a stable sentinel version id and epoch timestamp', async () => {
    const root = await makeRoot();
    const seeded = await readProps(root, 'phone-fan');
    expect(seeded.currentVersionId).toBe('defaults');
    expect(seeded.updatedAt).toBe(new Date(0).toISOString());
    expect(seeded.values).toEqual(CLIP_DEFAULTS['phone-fan']);
  });

  it('rejects props that violate the schema', async () => {
    const root = await makeRoot();
    const bad = { ...CLIP_DEFAULTS['brand-reveal'], markColor: 'not-a-color' };
    await expect(writeProps(root, 'brand-reveal', bad)).rejects.toThrow();
  });
});
