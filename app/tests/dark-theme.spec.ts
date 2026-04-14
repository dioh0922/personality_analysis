import { test, expect } from '@playwright/test';

test('verify dark theme switching', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // メニューを開く
  await page.getByRole('button', { name: 'テーマ切替' }).click();
  
  // メニュー項目がDOMに現れるまで待機
  const darkMenu = page.getByRole('menuitem', { name: 'ダーク' });
  await expect(darkMenu).toBeVisible();
  await darkMenu.click();

  // bodyのクラスが更新されるまで待機
  await expect(page.locator('body')).toHaveClass(/dark-theme/, { timeout: 10000 });
});
