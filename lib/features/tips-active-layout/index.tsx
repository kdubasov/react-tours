import styles from '@/features/tips-active-layout/TipsActiveLayout.module.css';
import Tooltip from '@/features/tooltip';
import { useEscapeListener } from '@/shared/hooks/useEscapeListener.ts';
import { usePropsColors } from '@/shared/hooks/usePropsColors.ts';
import { useTips } from '@/shared/hooks/useTips.tsx';
import type { TipDataItemWithNode } from '@/shared/types';
import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  data: TipDataItemWithNode[];
};

// Имя CSS-якоря, к которому нативно привязывается подсветка (CSS Anchor Positioning)
const ANCHOR_NAME = '--rct-anchor';

const TipsActiveLayout = ({ data }: Props) => {
  const { setIsShow, theme, escapeToClose, highlightPadding, customColors } = useTips();
  const [activeItem, setActiveItem] = useState<TipDataItemWithNode>(data[0]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItemRect, setActiveItemRect] = useState<DOMRect>(() => new DOMRect());

  const nextItem = data[data.indexOf(activeItem) + 1];
  const prevItem = data[data.indexOf(activeItem) - 1];

  // Общий раннер для пользовательских обработчиков кнопок: показывает лоадер,
  // пока промис не зарезолвится. Убирает дублирование в onNext/onPrev/onClose.
  const runWithLoading = async (handler?: () => void | Promise<void>) => {
    if (!handler) return;
    setIsLoading(true);
    await handler();
    setIsLoading(false);
  };

  const onNext = async () => {
    await runWithLoading(activeItem?.onClick?.nextButton);
    setActiveItem(nextItem);
  };

  const onPrev = async () => {
    await runWithLoading(activeItem?.onClick?.prevButton);
    setActiveItem(prevItem);
  };

  const onClose = async () => {
    await runWithLoading(activeItem?.onClick?.closeButton);
    setIsShow(false);
  };

  useEscapeListener(Boolean(escapeToClose), () => setIsShow(false));

  usePropsColors(ref, customColors, theme);

  // Привязываем подсветку к активному узлу нативно через anchor-name.
  // Браузер сам держит .block на месте при любом скролле (включая вложенные
  // контейнеры) и ресайзе — JS-трекинг координат больше не нужен.
  // useLayoutEffect — чтобы выставить якорь до отрисовки и избежать мигания.
  useLayoutEffect(() => {
    const node = activeItem?.node;
    if (!node) return;
    node.style.setProperty('anchor-name', ANCHOR_NAME);
    return () => {
      node.style.removeProperty('anchor-name');
    };
  }, [activeItem]);

  useEffect(() => {
    const node = activeItem?.node;
    if (!node) return;
    // Высоту берём прямой разовой меркой (не трекинг) — только чтобы выбрать
    // режим прокрутки к элементу. Позиционирование подсветки/тултипа на это не завязано.
    const height = node.getBoundingClientRect().height;
    node.scrollIntoView({
      behavior: 'smooth',
      block: height > window.innerHeight - 200 ? 'start' : 'center',
      inline: 'nearest',
    });
  }, [activeItem]);

  // Тултип позиционируется относительно .block, но сторону (над/под/поверх,
  // лево/право) считает сам по rect элемента и своей высоте. Обновляем rect на
  // scroll (capture — для вложенных контейнеров) и resize; state меняем только
  // при реальном изменении геометрии, поэтому лишних ре-рендеров нет.
  useEffect(() => {
    const node = activeItem?.node;
    if (!node) return;
    const update = () => {
      const r = node.getBoundingClientRect();
      setActiveItemRect((prev) =>
        prev.top === r.top && prev.left === r.left && prev.width === r.width && prev.height === r.height ? prev : r,
      );
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [activeItem]);

  useEffect(() => {
    setActiveItem(data[0]);
  }, [data]);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    element.addEventListener('mousedown', stopPropagation);

    return () => {
      element.removeEventListener('mousedown', stopPropagation);
    };
  }, []);

  return createPortal(
    <div
      className={`${styles.wrapper} ${theme === 'dark' ? styles.dark : ''}`}
      ref={ref}
      data-testid="tips-active-layout"
    >
      <div
        className={styles.block}
        data-testid="tips-highlight"
        style={
          {
            // Размер/позицию короба вычисляет CSS через anchor() и anchor-size().
            // Сюда отдаём только динамический паддинг подсветки и радиус.
            '--rct-highlight-padding': `${highlightPadding || 0}px`,
            borderRadius: activeItem?.node?.style.borderRadius || undefined,
          } as CSSProperties
        }
      >
        <Tooltip
          isLoading={isLoading}
          itemRect={activeItemRect}
          countItems={data.length}
          itemIdx={data.indexOf(activeItem)}
          item={activeItem}
          nextItem={nextItem}
          prevItem={prevItem}
          onNext={onNext}
          onPrev={onPrev}
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
};

export default TipsActiveLayout;
