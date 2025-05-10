import styles from '@/features/tips-active-layout/TipsActiveLayout.module.css';
import Tooltip from '@/features/tooltip';
import { useEscapeListener } from '@/shared/hooks/useEscapeListener.ts';
import { usePropsColors } from '@/shared/hooks/usePropsColors.ts';
import { useTips } from '@/shared/hooks/useTips.tsx';
import type { TipDataItemWithNode } from '@/shared/types';
import { getRectById } from '@/shared/utils/getRectById.ts';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  data: TipDataItemWithNode[];
};

const TipsActiveLayout = ({ data }: Props) => {
  const { setIsShow, theme, escapeToClose, highlightPadding } = useTips();
  const [activeItem, setActiveItem] = useState<TipDataItemWithNode>(data[0]);
  const [activeItemRect, setActiveItemRect] = useState<DOMRect>(getRectById(activeItem.nodeId));
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const nextItem = data[data.indexOf(activeItem) + 1];
  const prevItem = data[data.indexOf(activeItem) - 1];

  const onNext = async () => {
    if (activeItem?.onClick?.nextButton) {
      setIsLoading(true);
      await activeItem?.onClick?.nextButton();
      setIsLoading(false);
    }
    setActiveItem(nextItem);
    setActiveItemRect(getRectById(nextItem.nodeId));
  };

  const onPrev = async () => {
    if (activeItem?.onClick?.prevButton) {
      setIsLoading(true);
      await activeItem?.onClick?.prevButton();
      setIsLoading(false);
    }
    setActiveItem(prevItem);
    setActiveItemRect(getRectById(prevItem.nodeId));
  };

  const onClose = async () => {
    if (activeItem?.onClick?.closeButton) {
      setIsLoading(true);
      await activeItem?.onClick?.closeButton();
      setIsLoading(false);
    }
    setIsShow(false);
  };

  useEscapeListener(Boolean(escapeToClose));

  usePropsColors(ref);

  useEffect(() => {
    const onWindowSizeUpdate = () => {
      setActiveItemRect(getRectById(activeItem.nodeId));
    };
    window.addEventListener('resize', onWindowSizeUpdate);
    window.addEventListener('scroll', onWindowSizeUpdate);
    return () => {
      window.removeEventListener('resize', onWindowSizeUpdate);
      window.removeEventListener('scroll', onWindowSizeUpdate);
    };
  }, [activeItem]);

  useEffect(() => {
    activeItem?.node?.scrollIntoView({
      behavior: 'smooth',
      block: activeItemRect.height > window.innerHeight - 200 ? 'start' : 'center',
      inline: 'nearest',
    });
  }, [activeItem]);

  useEffect(() => {
    setActiveItem(data[0]);
    setActiveItemRect(getRectById(data[0]?.nodeId));
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
  }, [ref?.current]);

  return createPortal(
    <div
      className={`${styles.wrapper} ${theme === 'dark' ? styles.dark : ''}`}
      ref={ref}
      data-testid="tips-active-layout"
    >
      <div className={styles.relative}>
        <div
          className={styles.block}
          style={{
            width: activeItemRect.width + (highlightPadding || 0),
            height: activeItemRect.height + (highlightPadding || 0),
            left: activeItemRect.left - (highlightPadding ? highlightPadding / 2 : 0),
            top: activeItemRect.top - (highlightPadding ? highlightPadding / 2 : 0),
            borderRadius: activeItem?.node?.style.borderRadius,
          }}
        >
          <Tooltip
            isLoading={isLoading}
            countItems={data.length}
            itemIdx={data.indexOf(activeItem)}
            item={activeItem}
            itemRect={activeItemRect}
            nextItem={nextItem}
            prevItem={prevItem}
            onNext={onNext}
            onPrev={onPrev}
            onClose={onClose}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TipsActiveLayout;
