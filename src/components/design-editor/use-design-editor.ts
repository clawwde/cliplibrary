'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import {
  type Alignment,
  type Axis,
  addElements,
  addPage,
  alignOffsets,
  type Box,
  createPage,
  type Design,
  type DesignElement,
  distributeOffsets,
  duplicateElements,
  duplicatePage,
  elementBounds,
  expandToGroups,
  type Fill,
  findPage,
  groupElements,
  type LayerMove,
  moveElementTo,
  movePage,
  type Page,
  pasteElements,
  removeElements,
  removePage,
  reorderElements,
  resizeDesign,
  setBackground,
  translateElements,
  ungroupElements,
  unionBox,
  updateElements,
  updatePage,
} from '@/design';
import { useUndoable } from '@/lib/use-undoable';

export type HeightMeasure = (id: string) => number | undefined;

export type AlignTarget = 'page' | 'selection';

const centred = (element: DesignElement, design: Design, measure: HeightMeasure): DesignElement => {
  const box = elementBounds(element, measure(element.id));
  return {
    ...element,
    x: (design.width - box.width) / 2,
    y: (design.height - box.height) / 2,
  };
};

export const useDesignEditor = (initial: Design, initialPageIndex = 0) => {
  const history = useUndoable<Design>(initial);
  const design = history.value;
  const [currentPageId, setCurrentPageId] = useState(
    initial.pages[initialPageIndex]?.id ?? initial.pages[0]?.id ?? '',
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const clipboard = useRef<DesignElement[]>([]);
  const measureRef = useRef<HeightMeasure>(() => undefined);

  const page: Page = findPage(design, currentPageId) ?? design.pages[0] ?? createPage();
  const pageId = page.id;

  const selectedElements = useMemo(
    () => page.elements.filter((element) => selectedIds.includes(element.id)),
    [page, selectedIds],
  );

  const commit = useCallback(
    (next: Design, live = false) => (live ? history.setLive(next) : history.set(next)),
    [history.set, history.setLive],
  );

  const editPage = useCallback(
    (update: (current: Page) => Page, live = false) =>
      commit(updatePage(design, pageId, update), live),
    [commit, design, pageId],
  );

  const select = useCallback(
    (ids: readonly string[], additive = false) => {
      const expanded = expandToGroups(page, ids);
      setSelectedIds((current) =>
        additive
          ? expanded.every((id) => current.includes(id))
            ? current.filter((id) => !expanded.includes(id))
            : [...new Set([...current, ...expanded])]
          : expanded,
      );
      setEditingId(null);
    },
    [page],
  );

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setEditingId(null);
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(page.elements.filter((element) => !element.locked).map((element) => element.id));
  }, [page]);

  const addElement = useCallback(
    (element: DesignElement, options: { centre?: boolean } = {}) => {
      const placed =
        options.centre === false ? element : centred(element, design, measureRef.current);
      editPage((current) => addElements(current, [placed]));
      setSelectedIds([placed.id]);
    },
    [design, editPage],
  );

  const addMany = useCallback(
    (elements: readonly DesignElement[]) => {
      if (elements.length === 0) {
        return;
      }
      editPage((current) => addElements(current, elements));
      setSelectedIds(elements.map((element) => element.id));
    },
    [editPage],
  );

  const replaceElement = useCallback(
    (next: DesignElement, live = false) => {
      editPage((current) => updateElements(current, [next.id], () => next), live);
    },
    [editPage],
  );

  const updateSelected = useCallback(
    (update: (element: DesignElement) => DesignElement, live = false) => {
      editPage((current) => updateElements(current, selectedIds, update), live);
    },
    [editPage, selectedIds],
  );

  const updateMany = useCallback(
    (updates: ReadonlyMap<string, DesignElement>, live = false) => {
      editPage(
        (current) => ({
          ...current,
          elements: current.elements.map((element) => updates.get(element.id) ?? element),
        }),
        live,
      );
    },
    [editPage],
  );

  const removeSelected = useCallback(() => {
    const removable = selectedElements.filter((element) => !element.locked).map((el) => el.id);
    if (removable.length === 0) {
      return;
    }
    editPage((current) => removeElements(current, removable));
    setSelectedIds([]);
  }, [editPage, selectedElements]);

  const removeElement = useCallback(
    (id: string) => {
      editPage((current) => removeElements(current, [id]));
      setSelectedIds((current) => current.filter((item) => item !== id));
    },
    [editPage],
  );

  const duplicateSelected = useCallback(() => {
    if (selectedIds.length === 0) {
      return;
    }
    const result = duplicateElements(page, selectedIds);
    commit(updatePage(design, pageId, () => result.page));
    setSelectedIds(result.ids);
  }, [commit, design, page, pageId, selectedIds]);

  const copySelected = useCallback(() => {
    clipboard.current = selectedElements;
  }, [selectedElements]);

  const cutSelected = useCallback(() => {
    clipboard.current = selectedElements;
    removeSelected();
  }, [removeSelected, selectedElements]);

  const paste = useCallback(() => {
    if (clipboard.current.length === 0) {
      return;
    }
    const result = pasteElements(page, clipboard.current);
    commit(updatePage(design, pageId, () => result.page));
    setSelectedIds(result.ids);
  }, [commit, design, page, pageId]);

  const reorderSelected = useCallback(
    (move: LayerMove) => editPage((current) => reorderElements(current, selectedIds, move)),
    [editPage, selectedIds],
  );

  const moveLayer = useCallback(
    (id: string, index: number) => editPage((current) => moveElementTo(current, id, index)),
    [editPage],
  );

  const nudgeSelected = useCallback(
    (dx: number, dy: number) => {
      const offsets = Object.fromEntries(
        selectedElements.filter((el) => !el.locked).map((el) => [el.id, { x: dx, y: dy }]),
      );
      editPage((current) => translateElements(current, offsets));
    },
    [editPage, selectedElements],
  );

  const selectionBoxes = useCallback(
    (): Record<string, Box> =>
      Object.fromEntries(
        selectedElements.map((element) => [
          element.id,
          elementBounds(element, measureRef.current(element.id)),
        ]),
      ),
    [selectedElements],
  );

  const alignSelected = useCallback(
    (alignment: Alignment, target: AlignTarget = selectedIds.length > 1 ? 'selection' : 'page') => {
      const boxes = selectionBoxes();
      const pageBox = { x: 0, y: 0, width: design.width, height: design.height };
      const targetBox = target === 'page' ? pageBox : (unionBox(Object.values(boxes)) ?? pageBox);
      editPage((current) => translateElements(current, alignOffsets(boxes, targetBox, alignment)));
    },
    [design.height, design.width, editPage, selectedIds.length, selectionBoxes],
  );

  const distributeSelected = useCallback(
    (axis: Axis) => {
      editPage((current) => translateElements(current, distributeOffsets(selectionBoxes(), axis)));
    },
    [editPage, selectionBoxes],
  );

  const groupSelected = useCallback(
    () => editPage((current) => groupElements(current, selectedIds)),
    [editPage, selectedIds],
  );

  const ungroupSelected = useCallback(
    () => editPage((current) => ungroupElements(current, selectedIds)),
    [editPage, selectedIds],
  );

  const toggleLockSelected = useCallback(() => {
    const lock = !selectedElements.every((element) => element.locked);
    updateSelected((element) => ({ ...element, locked: lock }));
  }, [selectedElements, updateSelected]);

  const setPageBackground = useCallback(
    (fill: Fill, live = false) => editPage((current) => setBackground(current, fill), live),
    [editPage],
  );

  const selectPage = useCallback((id: string) => {
    setCurrentPageId(id);
    setSelectedIds([]);
    setEditingId(null);
  }, []);

  const insertPage = useCallback(
    (next: Page = createPage(page.background)) => {
      const index = design.pages.findIndex((item) => item.id === pageId);
      commit(addPage(design, next, index));
      selectPage(next.id);
    },
    [commit, design, page.background, pageId, selectPage],
  );

  const insertPages = useCallback(
    (source: Design) => {
      const scaled = resizeDesign(source, design.width, design.height);
      const index = design.pages.findIndex((item) => item.id === pageId);
      const replaceBlank = page.elements.length === 0 && design.pages.length === 1;
      const pages = replaceBlank
        ? scaled.pages
        : [...design.pages.slice(0, index + 1), ...scaled.pages, ...design.pages.slice(index + 1)];
      commit({ ...design, pages });
      const first = scaled.pages[0];
      if (first !== undefined) {
        selectPage(first.id);
      }
    },
    [commit, design, page.elements.length, pageId, selectPage],
  );

  const duplicateCurrentPage = useCallback(() => {
    const result = duplicatePage(design, pageId);
    commit(result.design);
    selectPage(result.id);
  }, [commit, design, pageId, selectPage]);

  const removeCurrentPage = useCallback(() => {
    if (design.pages.length <= 1) {
      return;
    }
    const index = design.pages.findIndex((item) => item.id === pageId);
    const next = removePage(design, pageId);
    commit(next);
    const fallback = next.pages[Math.max(0, index - 1)];
    if (fallback !== undefined) {
      selectPage(fallback.id);
    }
  }, [commit, design, pageId, selectPage]);

  const movePageTo = useCallback(
    (id: string, index: number) => commit(movePage(design, id, index)),
    [commit, design],
  );

  const resize = useCallback(
    (width: number, height: number) => commit(resizeDesign(design, width, height)),
    [commit, design],
  );

  const rename = useCallback((title: string) => commit({ ...design, title }), [commit, design]);

  const load = useCallback(
    (next: Design, pageIndex = 0) => {
      history.reset(next);
      setCurrentPageId(next.pages[pageIndex]?.id ?? next.pages[0]?.id ?? '');
      setSelectedIds([]);
      setEditingId(null);
    },
    [history.reset],
  );

  return {
    design,
    page,
    pageId,
    selectedIds,
    selectedElements,
    editingId,
    measureRef,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
    undo: history.undo,
    redo: history.redo,
    seal: history.seal,
    select,
    clearSelection,
    selectAll,
    setEditingId,
    transformPage: editPage,
    addElement,
    addMany,
    replaceElement,
    updateSelected,
    updateMany,
    removeSelected,
    removeElement,
    duplicateSelected,
    copySelected,
    cutSelected,
    paste,
    reorderSelected,
    moveLayer,
    nudgeSelected,
    alignSelected,
    distributeSelected,
    groupSelected,
    ungroupSelected,
    toggleLockSelected,
    setPageBackground,
    selectPage,
    insertPage,
    insertPages,
    duplicateCurrentPage,
    removeCurrentPage,
    movePageTo,
    resize,
    rename,
    load,
  };
};

export type DesignEditorState = ReturnType<typeof useDesignEditor>;
