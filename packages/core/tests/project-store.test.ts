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
} from '../src/index';

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

describe('sequence seed', () => {
  it('opens the kinetic promo as editable blocks with the recap placed in quadrants', () => {
    const project = seedProjectForClip('kinetic-promo');
    expect(project.durationInFrames).toBe(2595);
    expect(project.tracks.map((track) => track.name)).toEqual([
      'Overlays',
      'Captions',
      'Text',
      'Backdrop',
    ]);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements.length).toBeGreaterThan(30);
    const placed = elements.filter((element) => element.transform.scale === 0.5);
    expect(placed.length).toBeGreaterThanOrEqual(20);
    expect(
      new Set(placed.map((element) => `${element.transform.x}:${element.transform.y}`)).size,
    ).toBe(4);
    expect(elements.filter((element) => element.transform.scale === 1).length).toBeGreaterThan(10);
  });

  it('lays the app promo out as layered tracks of atomic clips', () => {
    const project = seedProjectForClip('app-promo');
    expect(project.tracks.map((track) => track.name)).toEqual([
      'Captions',
      'Text',
      'Overlays',
      'Devices',
      'Backdrop',
    ]);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements.length).toBeGreaterThan(15);
    expect(elements.every((element) => element.type === 'composition')).toBe(true);
    const ends = elements.map((element) => element.from + element.durationInFrames);
    expect(Math.max(...ends)).toBe(project.durationInFrames);
  });

  it('opens the scooter promo as editable blocks on its named tracks', () => {
    const project = seedProjectForClip('scooter-promo');
    expect(project.tracks.map((track) => track.name)).toEqual([
      'Text',
      'Scenes',
      'Devices',
      'Set',
      'Backdrop',
    ]);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements).toHaveLength(9);
    expect(elements.every((element) => element.type === 'composition')).toBe(true);
    const ends = elements.map((element) => element.from + element.durationInFrames);
    expect(Math.max(...ends)).toBe(project.durationInFrames);
    expect(project.durationInFrames).toBe(851);
  });

  it('keeps a backdrop under every frame of the film', () => {
    const project = seedProjectForClip('app-promo');
    const backdrop = project.tracks.find((track) => track.name === 'Backdrop');
    const covered = (frame: number) =>
      backdrop?.elements.some(
        (element) => frame >= element.from && frame < element.from + element.durationInFrames,
      ) ?? false;
    for (let frame = 0; frame < project.durationInFrames; frame += 10) {
      expect(covered(frame)).toBe(true);
    }
  });

  it('lays the doodle promo out as editable notebook tracks', () => {
    const project = seedProjectForClip('doodle-promo');
    expect(project.tracks.map((track) => track.name)).toEqual([
      'Transitions',
      'Doodles',
      'Notes',
      'Devices',
      'Paper',
    ]);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements.length).toBeGreaterThan(15);
    expect(elements.every((element) => element.type === 'composition')).toBe(true);
    const ends = elements.map((element) => element.from + element.durationInFrames);
    expect(Math.max(...ends)).toBe(project.durationInFrames);
  });

  it('gives every seeded scene its own copy of the defaults', () => {
    const first = seedProjectForClip('app-promo').tracks[0]?.elements[0];
    const second = seedProjectForClip('app-promo').tracks[0]?.elements[0];
    expect(first?.type === 'composition' && second?.type === 'composition').toBe(true);
    if (first?.type === 'composition' && second?.type === 'composition') {
      expect(first.props).toEqual(second.props);
      expect(first.props).not.toBe(second.props);
    }
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
