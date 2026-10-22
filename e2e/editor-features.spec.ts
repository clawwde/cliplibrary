import { expect, type Page, test } from '@playwright/test';

const openPoster = async (page: Page) => {
  await page.goto('/posters/court-kings?page=4');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByTestId('design-canvas').locator('canvas').first()).toBeVisible();
};

const MOD = 'ControlOrMeta';

const layerCount = (page: Page) =>
  page.getByRole('list', { name: 'Layers' }).getByRole('listitem').count();

test('undo and redo work after editing a panel field', async ({ page }) => {
  await openPoster(page);
  await page.getByRole('button', { name: 'Layers', exact: true }).click();
  const before = await layerCount(page);
  await page.keyboard.press('r');
  const fill = page.getByLabel('Fill', { exact: true });
  await fill.fill('#ff0000');
  await fill.press('Tab');
  await page.keyboard.press(`${MOD}+z`);
  await page.keyboard.press(`${MOD}+z`);
  await expect.poll(() => layerCount(page)).toBe(before);
  await page.keyboard.press(`${MOD}+Shift+z`);
  await expect.poll(() => layerCount(page)).toBe(before + 1);
});

test('right-click menu, shortcut sheet and floating toolbar', async ({ page }) => {
  await openPoster(page);
  await page.keyboard.press('r');
  await expect(page.getByRole('toolbar', { name: 'Selection actions' })).toBeVisible();
  const canvas = page.getByTestId('design-canvas');
  const box = await canvas.boundingBox();
  if (box === null) {
    throw new Error('canvas has no box');
  }
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: 'right' });
  await expect(page.getByRole('menu', { name: 'Element actions' })).toBeVisible();
  await page.getByRole('menuitem', { name: /Duplicate/ }).click();
  await expect(page.getByRole('menu', { name: 'Element actions' })).toBeHidden();
  await page.keyboard.press('Shift+?');
  await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible();
});

test('templates panel inserts a page from another pack', async ({ page }) => {
  await openPoster(page);
  const pages = page.getByRole('button', { name: /^Page \d+$/ });
  const before = await pages.count();
  await page.getByRole('button', { name: 'Templates', exact: true }).click();
  await page.getByLabel('Search templates').fill('hiring');
  await page.getByRole('button', { name: /Insert Hiring Spotlight page 2/ }).click();
  await expect(pages).toHaveCount(before + 1);
});
