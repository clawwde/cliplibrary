import { expect, test } from '@playwright/test';

test('creates a blank design, adds a shape and exports a png', async ({ page }) => {
  await page.goto('/designs/new?format=story');
  const canvas = page.getByTestId('design-canvas');
  await expect(canvas.locator('canvas').first()).toBeVisible();
  await expect(page.getByLabel('Design title')).toHaveValue('Untitled story / reel');

  await page.keyboard.press('r');
  const properties = page.getByRole('complementary', { name: 'Properties' });
  await expect(properties.getByText('Rectangle', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(properties.getByText('Background', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Download', exact: true }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('menuitem', { name: 'PNG', exact: true }).click(),
  ]);
  expect(download.suggestedFilename()).toBe('untitled-story-reel.png');
});
