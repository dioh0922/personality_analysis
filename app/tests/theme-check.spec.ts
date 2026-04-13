import { test, expect } from '@playwright/test';

test('verify theme styles are applied', async ({ page }) => {
  // アプリが起動していると仮定（URLは環境に合わせてください）
  await page.goto('http://localhost:4200');

  // bodyにlight-themeクラスが初期付与されているか確認
  const body = page.locator('body');
  await expect(body).toHaveClass(/light-theme/);
  
  // スクリーンショットを撮る
  await page.screenshot({ path: 'theme-check-light.png' });
});
