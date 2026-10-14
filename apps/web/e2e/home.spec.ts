import { expect, test } from '@playwright/test';

test('lists clips and opens the editor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Clips' })).toBeVisible();
  await expect(page.getByText('Orbit Cards')).toBeVisible();

  await page.getByText('Orbit Cards').click();
  await expect(page).toHaveURL(/\/clips\/orbit-cards/);
  await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
});

test('shows the exports section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Exports' })).toBeVisible();
});
