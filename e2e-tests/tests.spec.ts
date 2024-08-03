import { tips } from '../src/widgets/test-blocks/tips';
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/react-custom-tours/);
});

test('show tour', async ({ page }) => {
  await page.goto('/');
  const showBtn = page.locator('button:has-text("Show tips")');

  expect(showBtn).not.toBeNull();
  await showBtn.click();
  await expect(page.getByTestId('tips-active-layout')).toBeVisible();
  await expect(page.getByTestId('tooltip-count')).toHaveText(`1 / ${tips.length}`);
  await expect(page.getByTestId('tooltip-title')).toHaveText(tips[0].title);
  await expect(page.getByTestId('tooltip-text')).toHaveText(tips[0].text);
  await expect(page.getByTestId('tooltip-prev')).toBeDisabled();
  await expect(page.getByTestId('tooltip-next')).not.toBeDisabled();
  await page.getByTestId('tooltip-next').click();
  await expect(page.getByTestId('tooltip-title')).toHaveText(tips[1].title);
  await expect(page.getByTestId('tooltip-text')).toHaveText(tips[1].text);
  await expect(page.getByTestId('tooltip-prev')).not.toBeDisabled();
  await page.getByTestId('tooltip-prev').click();
  await expect(page.getByTestId('tooltip-title')).toHaveText(tips[0].title);
  await expect(page.getByTestId('tooltip-text')).toHaveText(tips[0].text);
  await expect(page.getByTestId('tooltip-close')).toBeVisible();
  await page.getByTestId('tooltip-close').click();
  await expect(page.getByTestId('tips-active-layout')).not.toBeVisible();
});
