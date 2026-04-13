# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/dark-theme-check.spec.ts >> verify dark theme background color
- Location: tests/dark-theme-check.spec.ts:3:5

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "rgba(0, 0, 0, 0)"
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - button "Example icon-button with menu icon" [ref=e4] [cursor=pointer]:
      - img [ref=e5]: menu
    - generic [ref=e8]: 個人分析
    - button "テーマ切替" [active] [ref=e10]:
      - generic [ref=e11]: テーマ切替
    - button "ログイン" [ref=e15]:
      - generic [ref=e16]: ログイン
  - generic [ref=e21]:
    - tablist [ref=e24]:
      - generic [ref=e25]:
        - tab "Summary" [selected] [ref=e26] [cursor=pointer]:
          - generic [ref=e28]: Summary
        - tab "Graph" [ref=e29] [cursor=pointer]:
          - generic [ref=e31]: Graph
        - tab "Rank" [ref=e32] [cursor=pointer]:
          - generic [ref=e34]: Rank
    - generic [ref=e35]:
      - tabpanel "Summary" [ref=e36]:
        - generic [ref=e39]:
          - generic:
            - generic [ref=e43]: "abv:"
            - generic [ref=e45]: "ibu:"
            - generic [ref=e47]: "srm:"
            - generic [ref=e49]: "type:"
            - generic [ref=e52]:
              - heading "好評" [level=3] [ref=e53]
              - list [ref=e54]
            - generic [ref=e57]:
              - heading "条件付き" [level=3] [ref=e58]
              - list [ref=e59]
            - generic [ref=e62]:
              - heading "不評" [level=3] [ref=e63]
              - list [ref=e64]
      - tabpanel [ref=e65]
      - tabpanel [ref=e66]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('verify dark theme background color', async ({ page }) => {
  4  |   await page.goto('http://localhost:4200');
  5  | 
  6  |   // メニューを開いてダークテーマを選択
  7  |   await page.getByRole('button', { name: 'テーマ切替' }).click();
  8  |   await page.getByRole('menuitem', { name: 'ダーク' }).click();
  9  | 
  10 |   // bodyにdark-themeクラスが付与されていることを確認
  11 |   const body = page.locator('body');
  12 |   await expect(body).toHaveClass(/dark-theme/);
  13 | 
  14 |   // コンピュテッドスタイルで背景色が実際に変わっているか取得
  15 |   const backgroundColor = await body.evaluate((el) => {
  16 |     return getComputedStyle(el).backgroundColor;
  17 |   });
  18 |   
  19 |   console.log('Actual Background Color (Dark):', backgroundColor);
  20 | 
  21 |   // デフォルト（白系）とは異なる色（暗い色）になっていることを簡易チェック
  22 |   // rgba(0, 0, 0, 0)でないことを期待
> 23 |   expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
     |                               ^ Error: expect(received).not.toBe(expected) // Object.is equality
  24 |   expect(backgroundColor).not.toBe('rgb(255, 255, 255)');
  25 | });
  26 | 
```