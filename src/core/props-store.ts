import { CLIP_DEFAULTS, CLIP_SCHEMAS, type ClipId } from '@/schemas';
import { propsPath } from './fs-paths';
import { appendSnapshot, findSnapshot } from './history-store';
import { readJsonFile, writeJsonFile } from './json-file';
import type { PropsFile, VersionSnapshot } from './types';

export const readProps = async (root: string, id: ClipId): Promise<PropsFile> => {
  const existing = await readJsonFile<PropsFile>(propsPath(root, id));
  if (existing !== null) {
    return existing;
  }
  return {
    clipId: id,
    currentVersionId: 'defaults',
    values: CLIP_DEFAULTS[id],
    updatedAt: new Date(0).toISOString(),
  };
};

export const writeProps = async (
  root: string,
  id: ClipId,
  values: unknown,
  label: string | null = null,
): Promise<PropsFile> => {
  const parsed: unknown = CLIP_SCHEMAS[id].parse(values);
  const versionId = crypto.randomUUID();
  const now = new Date().toISOString();
  const file: PropsFile = {
    clipId: id,
    currentVersionId: versionId,
    values: parsed,
    updatedAt: now,
  };
  const snapshot: VersionSnapshot = { versionId, createdAt: now, label, values: parsed };
  await writeJsonFile(propsPath(root, id), file);
  await appendSnapshot(root, id, snapshot);
  return file;
};

export const revertToVersion = async (
  root: string,
  id: ClipId,
  versionId: string,
): Promise<PropsFile | null> => {
  const snapshot = await findSnapshot(root, id, versionId);
  if (snapshot === null) {
    return null;
  }
  return writeProps(root, id, snapshot.values, `revert of ${versionId}`);
};
