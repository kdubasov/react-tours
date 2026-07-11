import type { CSSProperties } from 'react';

/**
 * Есть ли нативный CSS Anchor Positioning (anchor()/anchor-size()).
 * Нет на iOS Safari < 18.2 и Firefox < 132 — там подсветка позиционируется
 * JS-фолбэком (см. anchorFallbackStyle). typeof-guard — для SSR (Next и т.п.).
 */
export const hasNativeAnchor = (): boolean => typeof CSS !== 'undefined' && CSS.supports('anchor-name', '--x');

/**
 * Инлайновая геометрия коробки подсветки для движков без anchor(): кладёт её на
 * rect цели (+паддинг), перебивая невалидные CSS-декларации anchor(). rect уже
 * трекается в TipsActiveLayout на scroll/resize — фолбэк ничего не подписывает.
 * transition убираем, иначе коробка лагает за скроллом (в т.ч. smooth scrollIntoView).
 */
export const anchorFallbackStyle = (rect: DOMRect, padding: number): CSSProperties => {
  const half = padding / 2;
  return {
    top: rect.top - half,
    left: rect.left - half,
    width: rect.width + padding,
    height: rect.height + padding,
    transition: 'none',
  };
};
