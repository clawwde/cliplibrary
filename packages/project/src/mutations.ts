import type { Element } from './element';
import type { Project } from './project';
import type { Track } from './track';

export interface ElementLocation {
  trackId: string;
  element: Element;
}

export const findElement = (project: Project, elementId: string): ElementLocation | null => {
  for (const track of project.tracks) {
    const element = track.elements.find((candidate) => candidate.id === elementId);
    if (element !== undefined) {
      return { trackId: track.id, element };
    }
  }
  return null;
};

export const listElements = (project: Project): Element[] =>
  project.tracks.flatMap((track) => track.elements);

const mapTrackElements = (
  project: Project,
  trackId: string,
  map: (elements: Element[]) => Element[],
): Project => ({
  ...project,
  tracks: project.tracks.map((track) =>
    track.id === trackId ? { ...track, elements: map(track.elements) } : track,
  ),
});

export const addElement = (project: Project, trackId: string, element: Element): Project => {
  if (!project.tracks.some((track) => track.id === trackId)) {
    return project;
  }
  return mapTrackElements(project, trackId, (elements) => [...elements, element]);
};

export const removeElement = (project: Project, elementId: string): Project => ({
  ...project,
  tracks: project.tracks.map((track) => ({
    ...track,
    elements: track.elements.filter((element) => element.id !== elementId),
  })),
});

export const replaceElement = (project: Project, next: Element): Project => ({
  ...project,
  tracks: project.tracks.map((track) => ({
    ...track,
    elements: track.elements.map((element) => (element.id === next.id ? next : element)),
  })),
});

export const moveElement = (project: Project, elementId: string, from: number): Project => {
  const found = findElement(project, elementId);
  if (found === null) {
    return project;
  }
  const clamped = Math.max(0, Math.round(from));
  return replaceElement(project, { ...found.element, from: clamped });
};

export const resizeElement = (
  project: Project,
  elementId: string,
  durationInFrames: number,
): Project => {
  const found = findElement(project, elementId);
  if (found === null) {
    return project;
  }
  const clamped = Math.max(1, Math.round(durationInFrames));
  return replaceElement(project, { ...found.element, durationInFrames: clamped });
};

export const addTrack = (project: Project, track: Track): Project => ({
  ...project,
  tracks: [...project.tracks, track],
});

export const removeTrack = (project: Project, trackId: string): Project => {
  if (project.tracks.length <= 1) {
    return {
      ...project,
      tracks: project.tracks.map((track) =>
        track.id === trackId ? { ...track, elements: [] } : track,
      ),
    };
  }
  return { ...project, tracks: project.tracks.filter((track) => track.id !== trackId) };
};

export const projectContentEnd = (project: Project): number =>
  listElements(project).reduce((max, element) => {
    const end = element.from + element.durationInFrames;
    return end > max ? end : max;
  }, 0);
