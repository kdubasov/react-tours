import { useEffect, useRef } from 'react';

/**
 * Вызывает onEscape по нажатию Escape, пока isListen=true.
 * Колбэк держим в ref, чтобы не переподписывать слушатель на каждый рендер.
 */
export const useEscapeListener = (isListen: boolean, onEscape: () => void) => {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!isListen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onEscapeRef.current();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isListen]);
};
