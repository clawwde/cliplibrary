import type { Design, Page } from './design';
import type { DesignElement } from './element';
import { createDesignId } from './factories';
import type { Fill } from './fill';
import type { Offsets } from './geometry';

export const findPage = (design: Design, pageId: string): Page | undefined =>
  design.pages.find((page) => page.id === pageId);

export const updatePage = (
  design: Design,
  pageId: string,
  update: (page: Page) => Page,
): Design => ({
  ...design,
  pages: design.pages.map((page) => (page.id === pageId ? update(page) : page)),
});

export const addElements = (page: Page, elements: readonly DesignElement[]): Page => ({
  ...page,
  elements: [...page.elements, ...elements],
});

export const updateElements = (
  page: Page,
  ids: readonly string[],
  update: (element: DesignElement) => DesignElement,
): Page => ({
  ...page,
  elements: page.elements.map((element) => (ids.includes(element.id) ? update(element) : element)),
});

export const patchElement = <T extends DesignElement>(element: T, patch: Partial<T>): T => ({
  ...element,
  ...patch,
});

export const removeElements = (page: Page, ids: readonly string[]): Page => ({
  ...page,
  elements: page.elements.filter((element) => !ids.includes(element.id)),
});

const remapGroup = (groupIds: Map<string, string>, groupId: string): string => {
  const existing = groupIds.get(groupId);
  if (existing !== undefined) {
    return existing;
  }
  const next = createDesignId('group');
  groupIds.set(groupId, next);
  return next;
};

const cloneWithNewIds = (elements: readonly DesignElement[], offset: number): DesignElement[] => {
  const groupIds = new Map<string, string>();
  return elements.map((element) => ({
    ...element,
    ...(element.groupId === undefined ? {} : { groupId: remapGroup(groupIds, element.groupId) }),
    id: createDesignId(element.type),
    x: element.x + offset,
    y: element.y + offset,
  }));
};

const withoutGroup = (element: DesignElement): DesignElement => {
  const { groupId: _ignored, ...rest } = element;
  return rest;
};

export const duplicateElements = (
  page: Page,
  ids: readonly string[],
  offset = 24,
): { page: Page; ids: string[] } => {
  const copies = cloneWithNewIds(
    page.elements.filter((element) => ids.includes(element.id)),
    offset,
  );
  return { page: addElements(page, copies), ids: copies.map((element) => element.id) };
};

export const pasteElements = (
  page: Page,
  elements: readonly DesignElement[],
  offset = 24,
): { page: Page; ids: string[] } => {
  const copies = cloneWithNewIds(elements, offset);
  return { page: addElements(page, copies), ids: copies.map((element) => element.id) };
};

export const LAYER_MOVES = ['forward', 'backward', 'front', 'back'] as const;

export type LayerMove = (typeof LAYER_MOVES)[number];

export const reorderElements = (page: Page, ids: readonly string[], move: LayerMove): Page => {
  const selected = page.elements.filter((element) => ids.includes(element.id));
  const rest = page.elements.filter((element) => !ids.includes(element.id));
  if (selected.length === 0) {
    return page;
  }
  if (move === 'front') {
    return { ...page, elements: [...rest, ...selected] };
  }
  if (move === 'back') {
    return { ...page, elements: [...selected, ...rest] };
  }
  const elements = [...page.elements];
  const indexes = elements
    .map((element, index) => (ids.includes(element.id) ? index : -1))
    .filter((index) => index >= 0);
  const ordered = move === 'forward' ? [...indexes].reverse() : indexes;
  const step = move === 'forward' ? 1 : -1;
  for (const index of ordered) {
    const target = index + step;
    const neighbour = elements[target];
    const current = elements[index];
    if (neighbour === undefined || current === undefined || ids.includes(neighbour.id)) {
      continue;
    }
    elements[target] = current;
    elements[index] = neighbour;
  }
  return { ...page, elements };
};

export const moveElementTo = (page: Page, id: string, index: number): Page => {
  const element = page.elements.find((item) => item.id === id);
  if (element === undefined) {
    return page;
  }
  const rest = page.elements.filter((item) => item.id !== id);
  const clamped = Math.max(0, Math.min(rest.length, index));
  return { ...page, elements: [...rest.slice(0, clamped), element, ...rest.slice(clamped)] };
};

export const translateElements = (page: Page, offsets: Offsets): Page => ({
  ...page,
  elements: page.elements.map((element) => {
    const offset = offsets[element.id];
    return offset === undefined
      ? element
      : { ...element, x: element.x + offset.x, y: element.y + offset.y };
  }),
});

export const groupElements = (page: Page, ids: readonly string[]): Page => {
  if (ids.length < 2) {
    return page;
  }
  const groupId = createDesignId('group');
  return updateElements(page, ids, (element) => ({ ...element, groupId }));
};

export const ungroupElements = (page: Page, ids: readonly string[]): Page =>
  updateElements(page, ids, withoutGroup);

export const expandToGroups = (page: Page, ids: readonly string[]): string[] => {
  const groups = new Set(
    page.elements
      .filter((element) => ids.includes(element.id) && element.groupId !== undefined)
      .map((element) => element.groupId),
  );
  return page.elements
    .filter(
      (element) =>
        ids.includes(element.id) || (element.groupId !== undefined && groups.has(element.groupId)),
    )
    .map((element) => element.id);
};

export const setBackground = (page: Page, background: Fill): Page => ({ ...page, background });

const clonePage = (page: Page): Page => ({
  id: createDesignId('page'),
  background: page.background,
  elements: cloneWithNewIds(page.elements, 0),
});

export const addPage = (design: Design, page: Page, afterIndex: number): Design => ({
  ...design,
  pages: [...design.pages.slice(0, afterIndex + 1), page, ...design.pages.slice(afterIndex + 1)],
});

export const duplicatePage = (design: Design, pageId: string): { design: Design; id: string } => {
  const index = design.pages.findIndex((page) => page.id === pageId);
  const source = design.pages[index];
  if (source === undefined) {
    return { design, id: pageId };
  }
  const copy = clonePage(source);
  return { design: addPage(design, copy, index), id: copy.id };
};

export const removePage = (design: Design, pageId: string): Design =>
  design.pages.length <= 1
    ? design
    : { ...design, pages: design.pages.filter((page) => page.id !== pageId) };

export const movePage = (design: Design, pageId: string, toIndex: number): Design => {
  const page = findPage(design, pageId);
  if (page === undefined) {
    return design;
  }
  const rest = design.pages.filter((item) => item.id !== pageId);
  const clamped = Math.max(0, Math.min(rest.length, toIndex));
  return { ...design, pages: [...rest.slice(0, clamped), page, ...rest.slice(clamped)] };
};

export const scaleElement = (
  element: DesignElement,
  factor: number,
  shiftX: number,
  shiftY: number,
): DesignElement => {
  const shadow =
    element.shadow === undefined
      ? {}
      : {
          shadow: {
            ...element.shadow,
            blur: element.shadow.blur * factor,
            offsetX: element.shadow.offsetX * factor,
            offsetY: element.shadow.offsetY * factor,
          },
        };
  const moved = {
    ...element,
    ...shadow,
    x: element.x * factor + shiftX,
    y: element.y * factor + shiftY,
    width: element.width * factor,
  };
  switch (moved.type) {
    case 'text':
      return {
        ...moved,
        fontSize: moved.fontSize * factor,
        letterSpacing: moved.letterSpacing * factor,
        strokeWidth: moved.strokeWidth * factor,
      };
    case 'line':
      return { ...moved, strokeWidth: moved.strokeWidth * factor };
    case 'rect':
      return {
        ...moved,
        height: moved.height * factor,
        cornerRadius: moved.cornerRadius * factor,
        strokeWidth: moved.strokeWidth * factor,
      };
    case 'image':
      return {
        ...moved,
        height: moved.height * factor,
        cornerRadius: moved.cornerRadius * factor,
        strokeWidth: moved.strokeWidth * factor,
      };
    case 'icon':
      return { ...moved, height: moved.height * factor };
    default:
      return { ...moved, height: moved.height * factor, strokeWidth: moved.strokeWidth * factor };
  }
};

export const resizeDesign = (design: Design, width: number, height: number): Design => {
  const factor = Math.min(width / design.width, height / design.height);
  const shiftX = (width - design.width * factor) / 2;
  const shiftY = (height - design.height * factor) / 2;
  return {
    ...design,
    width,
    height,
    pages: design.pages.map((page) => ({
      ...page,
      elements: page.elements.map((element) => scaleElement(element, factor, shiftX, shiftY)),
    })),
  };
};
