import { useTips } from '@/shared/hooks/useTips.tsx';
import { useEffect } from 'react';

function camelToKebabCaseWithPrefix(input: string): string {
  return '--rct-' + input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export const usePropsColors = (element: React.MutableRefObject<HTMLElement | null>) => {
  const { customColors, theme } = useTips();

  useEffect(() => {
    if (!customColors) return;
    Object.entries(customColors[theme || 'light']).forEach(([key, value]) => {
      element?.current?.style.setProperty(camelToKebabCaseWithPrefix(key), value);
    });
  }, [customColors, element, theme]);
};
