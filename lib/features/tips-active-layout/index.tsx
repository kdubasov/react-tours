import styles from '@/features/tips-active-layout/TipsActiveLayout.module.css';
import Tooltip from '@/features/tooltip';
import { useEscapeListener } from '@/shared/hooks/useEscapeListener.ts';
import { useTips } from '@/shared/hooks/useTips.tsx';
import { TipDataItemWithNode } from '@/shared/types';
import { useEffect, useRef, useState, useTransition } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  data: TipDataItemWithNode[];
};

const TipsActiveLayout = ({ data }: Props) => {
  const { setIsShow, theme, escapeToClose } = useTips();
  const [isLoading, startTransition] = useTransition();
  const [activeItem, setActiveItem] = useState<TipDataItemWithNode>(data[0]);
  const [activeItemRect, setActiveItemRect] = useState<DOMRect>(activeItem.node!.getBoundingClientRect());
  const ref = useRef<HTMLDivElement | null>(null);

  const nextItem = data[data.indexOf(activeItem) + 1];
  const prevItem = data[data.indexOf(activeItem) - 1];

  const onNext = () => {
    startTransition(() => {
      setActiveItem(nextItem);
      setActiveItemRect(nextItem.node!.getBoundingClientRect());
    });
  };
  const onPrev = () => {
    startTransition(() => {
      setActiveItem(prevItem);
      setActiveItemRect(prevItem.node!.getBoundingClientRect());
    });
  };
  const onClose = () => {
    setActiveItemRect(data[0].node!.getBoundingClientRect());
    setIsShow(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setActiveItemRect(activeItem.node!.getBoundingClientRect());
    };
    window.addEventListener('resize', onScroll);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [activeItem]);

  useEffect(() => {
    activeItem.node?.scrollIntoView({
      behavior: 'smooth',
      block: activeItemRect.height > window.innerHeight - 200 ? 'start' : 'center',
      inline: 'nearest',
    });
  }, [activeItem]);

  useEscapeListener(!!escapeToClose);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;
    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };
    element.addEventListener('click', stopPropagation);
    return () => {
      element.removeEventListener('click', stopPropagation);
    };
  }, [ref?.current]);

  return createPortal(
    <div className={`${styles.wrapper} ${theme === 'dark' ? styles.dark : ''}`} id="tips-active-wrapper" ref={ref}>
      <div className={styles.relative}>
        <div
          className={styles.block}
          style={{
            width: activeItemRect.width,
            height: activeItemRect.height,
            left: activeItemRect.left,
            top: activeItemRect.top,
            borderRadius: activeItem.node?.style.borderRadius,
          }}
        >
          <Tooltip
            countItems={data.length}
            itemIdx={data.indexOf(activeItem)}
            item={activeItem}
            itemRect={activeItemRect}
            nextItem={nextItem}
            prevItem={prevItem}
            onNext={onNext}
            onPrev={onPrev}
            onClose={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TipsActiveLayout;
