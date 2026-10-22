import { describe, expect, it } from 'bun:test';
import {
  addPage,
  createDesign,
  createEllipse,
  createImage,
  createPage,
  createRect,
  createText,
  designSchema,
  duplicateElements,
  duplicatePage,
  expandToGroups,
  findDesignFormat,
  firstFillColor,
  flattenStops,
  groupElements,
  linear,
  moveElementTo,
  movePage,
  pasteElements,
  patchElement,
  radial,
  removeElements,
  removePage,
  reorderElements,
  resizeDesign,
  setBackground,
  translateElements,
  ungroupElements,
  updatePage,
} from '@/design';

const pageWith = (count: number) =>
  createPage(
    '#fff',
    Array.from({ length: count }, (_, index) => createRect({ id: `r${index}`, x: index * 10 })),
  );

const ids = (page: { elements: { id: string }[] }) => page.elements.map((element) => element.id);

describe('element mutations', () => {
  it('reorders forward, backward, front and back', () => {
    const page = pageWith(4);
    expect(ids(reorderElements(page, ['r1'], 'forward'))).toEqual(['r0', 'r2', 'r1', 'r3']);
    expect(ids(reorderElements(page, ['r1'], 'backward'))).toEqual(['r1', 'r0', 'r2', 'r3']);
    expect(ids(reorderElements(page, ['r0', 'r1'], 'front'))).toEqual(['r2', 'r3', 'r0', 'r1']);
    expect(ids(reorderElements(page, ['r3'], 'back'))).toEqual(['r3', 'r0', 'r1', 'r2']);
    expect(ids(reorderElements(page, ['r3'], 'forward'))).toEqual(['r0', 'r1', 'r2', 'r3']);
    expect(reorderElements(page, ['missing'], 'front')).toBe(page);
  });

  it('moves an element to an index', () => {
    expect(ids(moveElementTo(pageWith(3), 'r0', 2))).toEqual(['r1', 'r2', 'r0']);
    const page = pageWith(2);
    expect(moveElementTo(page, 'nope', 0)).toBe(page);
  });

  it('duplicates and pastes with fresh ids and an offset', () => {
    const { page, ids: copies } = duplicateElements(pageWith(2), ['r1']);
    expect(page.elements).toHaveLength(3);
    expect(copies[0]).not.toBe('r1');
    expect(page.elements[2]?.x).toBe(10 + 24);
    const pasted = pasteElements(createPage(), [createText()], 0);
    expect(pasted.page.elements).toHaveLength(1);
  });

  it('duplicating a group keeps the copies grouped under a new id', () => {
    const grouped = groupElements(pageWith(3), ['r0', 'r1']);
    const groupId = grouped.elements[0]?.groupId;
    const { page } = duplicateElements(grouped, ['r0', 'r1']);
    const copyGroups = new Set(page.elements.slice(3).map((element) => element.groupId));
    expect(copyGroups.size).toBe(1);
    expect(copyGroups.has(groupId)).toBe(false);
  });

  it('groups, expands selection to the group and ungroups', () => {
    const page = groupElements(pageWith(3), ['r0', 'r2']);
    expect(expandToGroups(page, ['r0'])).toEqual(['r0', 'r2']);
    expect(groupElements(page, ['r1'])).toBe(page);
    const ungrouped = ungroupElements(page, ['r0', 'r2']);
    expect(ungrouped.elements.every((element) => element.groupId === undefined)).toBe(true);
  });

  it('removes, translates and patches elements', () => {
    expect(ids(removeElements(pageWith(3), ['r1']))).toEqual(['r0', 'r2']);
    const moved = translateElements(pageWith(2), { r1: { x: 5, y: 7 } });
    expect(moved.elements[1]).toMatchObject({ x: 15, y: 7 });
    expect(patchElement(createEllipse(), { fill: '#000' }).fill).toBe('#000');
    expect(setBackground(createPage(), linear(90, '#000', '#fff')).background).toMatchObject({
      type: 'linear',
    });
  });
});

describe('page mutations', () => {
  const design = createDesign({ pages: [createPage('#111'), createPage('#222')] });
  const [first, second] = design.pages;
  if (first === undefined || second === undefined) {
    throw new Error('expected two pages');
  }

  it('adds, duplicates, removes and moves pages', () => {
    expect(addPage(design, createPage(), 0).pages[2]?.id).toBe(second.id);
    const duplicated = duplicatePage(design, first.id);
    expect(duplicated.design.pages).toHaveLength(3);
    expect(duplicated.design.pages[1]?.id).toBe(duplicated.id);
    expect(duplicatePage(design, 'missing').design).toBe(design);
    expect(removePage(design, first.id).pages).toHaveLength(1);
    const single = createDesign();
    expect(removePage(single, single.pages[0]?.id ?? '')).toBe(single);
    expect(movePage(design, first.id, 1).pages[1]?.id).toBe(first.id);
    expect(movePage(design, 'missing', 0)).toBe(design);
    expect(
      updatePage(design, second.id, (page) => setBackground(page, '#333')).pages[1]?.background,
    ).toBe('#333');
  });

  it('resize scales content uniformly and centres it', () => {
    const square = createDesign({
      width: 1000,
      height: 1000,
      pages: [
        createPage('#fff', [
          createRect({ x: 0, y: 0, width: 1000, height: 1000, cornerRadius: 20 }),
          createText({
            fontSize: 100,
            shadow: { color: '#000', blur: 10, offsetX: 2, offsetY: 4 },
          }),
          createImage({ width: 100, height: 100 }),
        ]),
      ],
    });
    const story = resizeDesign(square, 500, 1000);
    const [rect, text, image] = story.pages[0]?.elements ?? [];
    expect(rect).toMatchObject({ x: 0, y: 250, width: 500, height: 500, cornerRadius: 10 });
    expect(text).toMatchObject({ fontSize: 50, shadow: { blur: 5, offsetY: 2 } });
    expect(image).toMatchObject({ width: 50, height: 50 });
    expect(designSchema.safeParse(story).success).toBe(true);
  });
});

describe('fills and formats', () => {
  it('builds evenly spaced gradient stops', () => {
    expect(radial('#000', '#111', '#222').stops.map((stop) => stop.offset)).toEqual([0, 0.5, 1]);
    expect(firstFillColor(linear(0, '#abc', '#def'))).toBe('#abc');
    expect(firstFillColor('#123')).toBe('#123');
    expect(
      flattenStops([
        { offset: 1, color: 'b' },
        { offset: 0, color: 'a' },
      ]),
    ).toEqual([0, 'a', 1, 'b']);
  });

  it('looks up design formats', () => {
    expect(findDesignFormat('story')).toMatchObject({ width: 1080, height: 1920 });
    expect(findDesignFormat('nope')).toBeUndefined();
  });
});
