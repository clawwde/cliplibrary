import { expect, test } from '@playwright/test';

test('lists animations and opens the editor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Animations' })).toBeVisible();
  await expect(page.getByText('Orbit Cards')).toBeVisible();

  await page.getByText('Orbit Cards').click();
  await expect(page).toHaveURL(/\/clips\/orbit-cards/);
  await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
});

test('shows a tile for every seeded clip', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Split Flap')).toBeVisible();
  await expect(page.getByText('Odometer Ledger')).toBeVisible();
});
