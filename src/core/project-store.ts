import { type Project, parseProject } from '@/project';
import type { ClipId } from '@/schemas';
import { projectHistoryPath, projectPath } from './fs-paths';
import { readJsonFile, writeJsonFile } from './json-file';
import { seedProjectForClip } from './project-seed';
import type { VersionSnapshot } from './types';

export interface ProjectFile {
  clipId: ClipId;
  currentVersionId: string;
  project: Project;
  updatedAt: string;
}

export const readProjectHistory = async (root: string, id: ClipId): Promise<VersionSnapshot[]> => {
  const history = await readJsonFile<VersionSnapshot[]>(projectHistoryPath(root, id));
  return history ?? [];
};

export const readProject = async (root: string, id: ClipId): Promise<ProjectFile> => {
  const existing = await readJsonFile<ProjectFile>(projectPath(root, id));
  if (existing !== null) {
    return existing;
  }
  return {
    clipId: id,
    currentVersionId: 'seed',
    project: seedProjectForClip(id),
    updatedAt: new Date(0).toISOString(),
  };
};

export const writeProject = async (
  root: string,
  id: ClipId,
  project: unknown,
  label: string | null = null,
): Promise<ProjectFile> => {
  const parsed = parseProject(project);
  const versionId = crypto.randomUUID();
  const now = new Date().toISOString();
  const file: ProjectFile = {
    clipId: id,
    currentVersionId: versionId,
    project: parsed,
    updatedAt: now,
  };
  const snapshot: VersionSnapshot = { versionId, createdAt: now, label, values: parsed };
  const history = await readProjectHistory(root, id);
  await writeJsonFile(projectPath(root, id), file);
  await writeJsonFile(projectHistoryPath(root, id), [snapshot, ...history]);
  return file;
};

export const revertProjectToVersion = async (
  root: string,
  id: ClipId,
  versionId: string,
): Promise<ProjectFile | null> => {
  const history = await readProjectHistory(root, id);
  const snapshot = history.find((entry) => entry.versionId === versionId);
  if (snapshot === undefined) {
    return null;
  }
  return writeProject(root, id, snapshot.values, `revert of ${versionId}`);
};
