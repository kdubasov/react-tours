import { tips } from '../src/widgets/test-blocks/tips';
import { expect, test, type Page } from '@playwright/test';

const PAD = 10; // highlightPadding из App.tsx
const TOL = 4; // допуск на сабпиксели/округление (webkit заметнее округляет)

// Снимаем геометрию подсветки (.block), цели и тултипа прямо из DOM.
async function measure(page: Page, nodeId: string) {
  return page.evaluate(
    ({ nodeId }) => {
      const block = document.querySelector('[data-testid="tips-highlight"]')!;
      const tip = document.querySelector('[data-testid="tips-tooltip"]')!;

      const r = (el: Element) => {
        const b = el.getBoundingClientRect();
        return { left: b.left, top: b.top, right: b.right, bottom: b.bottom, width: b.width, height: b.height };
      };
      return {
        block: r(block),
        target: r(document.getElementById(nodeId)!),
        tooltip: r(tip!),
        vw: window.innerWidth,
        vh: window.innerHeight,
      };
    },
    { nodeId },
  );
}

function assertTooltipInViewport(m: Awaited<ReturnType<typeof measure>>, label: string) {
  expect(m.tooltip.left, `${label}: tooltip left edge`).toBeGreaterThanOrEqual(-TOL);
  expect(m.tooltip.top, `${label}: tooltip top edge`).toBeGreaterThanOrEqual(-TOL);
  expect(m.tooltip.right, `${label}: tooltip right edge`).toBeLessThanOrEqual(m.vw + TOL);
  expect(m.tooltip.bottom, `${label}: tooltip bottom edge`).toBeLessThanOrEqual(m.vh + TOL);
}

function assertHighlightOnTarget(m: Awaited<ReturnType<typeof measure>>, label: string) {
  // .block = цель, расширенная на highlightPadding (offset -PAD/2, размер +PAD)
  expect(Math.abs(m.block.left - (m.target.left - PAD / 2)), `${label}: highlight left`).toBeLessThanOrEqual(TOL);
  expect(Math.abs(m.block.top - (m.target.top - PAD / 2)), `${label}: highlight top`).toBeLessThanOrEqual(TOL);
  expect(Math.abs(m.block.width - (m.target.width + PAD)), `${label}: highlight width`).toBeLessThanOrEqual(TOL);
  expect(Math.abs(m.block.height - (m.target.height + PAD)), `${label}: highlight height`).toBeLessThanOrEqual(TOL);
}

test('native anchor: подсказка всегда видна и подсветка совпадает с целью на всех шагах', async ({ page }) => {
  await page.goto('/');

  // на браузерах без CSS Anchor Positioning (старый webkit и т.п.) проверка
  // нерелевантна — пропускаем
  const supported = await page.evaluate(
    () => CSS.supports('position-area: block-end') && CSS.supports('top: anchor(top)'),
  );
  test.skip(!supported, 'браузер не поддерживает CSS Anchor Positioning');

  await page.locator('button:has-text("Show tips")').click();
  await expect(page.getByTestId('tips-active-layout')).toBeVisible();

  for (let i = 0; i < tips.length; i++) {
    await expect(page.getByTestId('tooltip-title')).toHaveText(tips[i].title);
    // дать smooth-скроллу/анимации устаканиться
    await page.waitForTimeout(500);

    const m = await measure(page, tips[i].nodeId);
    assertTooltipInViewport(m, `шаг ${i} (${tips[i].nodeId})`);
    assertHighlightOnTarget(m, `шаг ${i} (${tips[i].nodeId})`);

    if (i < tips.length - 1) {
      await page.getByTestId('tooltip-next').click();
    }
  }
});

test('native anchor: при ручном скролле вложенного контейнера подсветка едет за элементом', async ({ page }) => {
  await page.goto('/');
  const supported = await page.evaluate(
    () => CSS.supports('position-area: block-end') && CSS.supports('top: anchor(top)'),
  );
  test.skip(!supported, 'браузер не поддерживает CSS Anchor Positioning');

  await page.locator('button:has-text("Show tips")').click();

  // дойти до шага с целью внутри вертикального скролл-контейнера (#test-7)
  const targetIdx = tips.findIndex((t) => t.nodeId === 'test-7');
  for (let i = 0; i < targetIdx; i++) {
    await page.getByTestId('tooltip-next').click();
    await expect(page.getByTestId('tooltip-title')).toHaveText(tips[i + 1].title);
  }
  await page.waitForTimeout(500);

  const before = await measure(page, 'test-7');
  assertHighlightOnTarget(before, 'до скролла контейнера');

  // прокрутить именно вложенный контейнер (не окно)
  await page.evaluate(() => {
    const el = document.getElementById('test-7')!;
    (el.parentElement as HTMLElement).scrollBy({ top: 120 });
  });
  await page.waitForTimeout(300);

  const after = await measure(page, 'test-7');
  // подсветка должна по-прежнему совпадать с уехавшим элементом
  assertHighlightOnTarget(after, 'после скролла контейнера');
  // и элемент действительно сдвинулся (контейнер проскроллился)
  expect(Math.abs(after.target.top - before.target.top), 'элемент сместился при скролле').toBeGreaterThan(20);
});

test('native anchor: на узком экране тултип не вылезает за края', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  const supported = await page.evaluate(
    () => CSS.supports('position-area: block-end') && CSS.supports('top: anchor(top)'),
  );
  test.skip(!supported, 'браузер не поддерживает CSS Anchor Positioning');

  await page.locator('button:has-text("Show tips")').click();
  await expect(page.getByTestId('tips-active-layout')).toBeVisible();

  for (let i = 0; i < tips.length; i++) {
    await expect(page.getByTestId('tooltip-title')).toHaveText(tips[i].title);
    await page.waitForTimeout(450);
    const m = await measure(page, tips[i].nodeId);
    assertTooltipInViewport(m, `узкий экран, шаг ${i} (${tips[i].nodeId})`);
    if (i < tips.length - 1) await page.getByTestId('tooltip-next').click();
  }
});
