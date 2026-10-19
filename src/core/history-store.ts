import type { ClipId } from '@/schemas';
import { historyPath } from './fs-paths';
import { readJsonFile, writeJsonFile } from './json-file';
import type { VersionSnapshot } from './types';

export const readHistory = async (root: string, id: ClipId): Promise<VersionSnapshot[]> => {
  const history = await readJsonFile<VersionSnapshot[]>(historyPath(root, id));
  return history ?? [];
};

export const appendSnapshot = async (
  root: string,
  id: ClipId,
  snapshot: VersionSnapshot,
): Promise<VersionSnapshot[]> => {
  const history = await readHistory(root, id);
  const next = [snapshot, ...history];
  await writeJsonFile(historyPath(root, id), next);
  return next;
};

export const findSnapshot = async (
  root: string,
  id: ClipId,
  versionId: string,
): Promise<VersionSnapshot | null> => {
  const history = await readHistory(root, id);
  return history.find((snapshot) => snapshot.versionId === versionId) ?? null;
};
