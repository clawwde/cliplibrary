import { buildLibraryProject, type LibraryClipId, type Project } from '@cliplibrary/project';

export const seedProjectForClip = (id: LibraryClipId): Project => buildLibraryProject(id);
