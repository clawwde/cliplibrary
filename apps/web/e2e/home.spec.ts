import { expect, test } from '@playwright/test';

test('lists animations and opens the editor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Animations' })).toBeVisible();
  await expect(page.getByText('Phone Spin In')).toBeVisible();

  await page.getByText('Phone Spin In').click();
  await expect(page).toHaveURL(/\/clips\/phone-spin-in/);
  await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
});

test('shows a tile for every seeded clip', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Phone Wall')).toBeVisible();
  await expect(page.getByText('Headline Reveal')).toBeVisible();
});
