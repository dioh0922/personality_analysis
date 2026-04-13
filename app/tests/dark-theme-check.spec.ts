import { test, expect } from '@playwright/test';

test('verify dark theme background color', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // メニューを開いてダークテーマを選択
  await page.getByRole('button', { name: 'テーマ切替' }).click();
  await page.getByRole('menuitem', { name: 'ダーク' }).click();

  // bodyにdark-themeクラスが付与されていることを確認
  const body = page.locator('body');
  await expect(body).toHaveClass(/dark-theme/);

  // コンピュテッドスタイルで背景色が実際に変わっているか取得
  const backgroundColor = await body.evaluate((el) => {
    return getComputedStyle(el).backgroundColor;
  });
  
  console.log('Actual Background Color (Dark):', backgroundColor);

  // デフォルト（白系）とは異なる色（暗い色）になっていることを簡易チェック
  // rgba(0, 0, 0, 0)でないことを期待
  expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  expect(backgroundColor).not.toBe('rgb(255, 255, 255)');
});
