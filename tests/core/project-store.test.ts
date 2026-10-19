import { afterAll, describe, expect, it } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  readProject,
  readProjectHistory,
  revertProjectToVersion,
  seedProjectForClip,
  writeProject,
} from '@/core';

const roots: string[] = [];

const makeRoot = async (): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), 'cliplib-project-'));
  roots.push(root);
  return root;
};

afterAll(async () => {
  await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
});

describe('project seed', () => {
  it('seeds a real clip as a single composition element on one track', () => {
    const project = seedProjectForClip('phone-spin-in');
    expect(project.tracks).toHaveLength(1);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements).toHaveLength(1);
    expect(elements[0]?.type).toBe('composition');
    expect(elements.every((element) => element.durationInFrames >= 1)).toBe(true);
  });
});

describe('project store', () => {
  it('seeds from the clip registry when no file exists', async () => {
    const root = await makeRoot();
    const file = await readProject(root, 'phone-spin-in');
    expect(file.currentVersionId).toBe('seed');
    expect(file.updatedAt).toBe(new Date(0).toISOString());
    expect(file.project.tracks.length).toBeGreaterThanOrEqual(1);
  });

  it('persists and reloads an edited project with history', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'phone-spin-in');
    const edited = { ...seeded.project, background: '#111111' };
    const first = await writeProject(root, 'phone-spin-in', edited, 'first');
    const second = await writeProject(root, 'phone-spin-in', first.project, 'second');
    expect(first.currentVersionId).not.toBe(second.currentVersionId);

    const reloaded = await readProject(root, 'phone-spin-in');
    expect(reloaded.project.background).toBe('#111111');
    const history = await readProjectHistory(root, 'phone-spin-in');
    expect(history.map((entry) => entry.label)).toEqual(['second', 'first']);
  });

  it('reverts to an earlier version and appends a revert snapshot', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'phone-spin-in');
    const firstWrite = await writeProject(root, 'phone-spin-in', seeded.project, 'original');
    await writeProject(
      root,
      'phone-spin-in',
      { ...seeded.project, background: '#222222' },
      'edited',
    );

    const reverted = await revertProjectToVersion(
      root,
      'phone-spin-in',
      firstWrite.currentVersionId,
    );
    expect(reverted?.project.background).toBe(seeded.project.background);
    const history = await readProjectHistory(root, 'phone-spin-in');
    expect(history[0]?.label).toBe(`revert of ${firstWrite.currentVersionId}`);
    expect(await revertProjectToVersion(root, 'phone-spin-in', 'missing')).toBeNull();
  });

  it('rejects a malformed project', async () => {
    const root = await makeRoot();
    await expect(writeProject(root, 'phone-spin-in', { fps: 0 })).rejects.toThrow();
  });
});
