import { CustomColors } from '@/shared/types';
import { useEffect } from 'react';

function camelToKebabCaseWithPrefix(input: string): string {
  return '--rct-' + input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Прокидывает пользовательские цвета темы в CSS-переменные --rct-* на элементе.
 * Цвета и тему получает аргументами (без доступа к контексту), чтобы оставаться
 * презентационным shared-хуком.
 */
export const usePropsColors = (
  element: React.MutableRefObject<HTMLElement | null>,
  customColors: CustomColors | undefined,
  theme: 'dark' | 'light' | undefined,
) => {
  useEffect(() => {
    if (!customColors) return;
    Object.entries(customColors[theme || 'light']).forEach(([key, value]) => {
      element?.current?.style.setProperty(camelToKebabCaseWithPrefix(key), value);
    });
  }, [customColors, element, theme]);
};
