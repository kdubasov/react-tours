import { useTips } from '@/shared/hooks/useTips.tsx';
import { useEffect } from 'react';

export const usePropsColors = (element: React.MutableRefObject<HTMLElement | null>) => {
  const { primaryColor, tooltipBorderColor } = useTips();

  useEffect(() => {
    if (!primaryColor && !tooltipBorderColor) return;
    if (primaryColor) {
      element?.current?.style.setProperty('--primary', primaryColor);
    }
    if (tooltipBorderColor) {
      element?.current?.style.setProperty('--tooltip-border', tooltipBorderColor);
    }
  }, [primaryColor, tooltipBorderColor, element]);
};
