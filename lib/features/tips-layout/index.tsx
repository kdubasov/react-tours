import styles from './TipsLayout.module.css';
import { useTips } from '@/app/main.ts';
import { TipDataItemWithNode } from '@/shared/types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

type ActiveProps = {
  data: TipDataItemWithNode[];
};

const TipsLayout = ({ children }: Props) => {
  const { data, isShow } = useTips();
  return (
    <>
      {isShow && data && <TipsActiveLayout data={data.filter((elem) => elem.node).sort((a, b) => a.idx - b.idx)} />}
      {children}
    </>
  );
};

export default TipsLayout;

const TipsActiveLayout = ({ data }: ActiveProps) => {
  const { setIsShow } = useTips();
  const [activeItem, setActiveItem] = useState<TipDataItemWithNode>(data[0]);
  const [activeItemRect, setActiveItemRect] = useState<DOMRect>(activeItem.node!.getBoundingClientRect());

  const nextItem = data[data.indexOf(activeItem) + 1];
  const prevItem = data[data.indexOf(activeItem) - 1];

  const onNext = () => {
    setActiveItem(nextItem);
    setActiveItemRect(nextItem.node!.getBoundingClientRect());
  };
  const onPrev = () => {
    setActiveItem(prevItem);
    setActiveItemRect(prevItem.node!.getBoundingClientRect());
  };
  const onClose = () => {
    setActiveItemRect(data[0].node!.getBoundingClientRect());
    setIsShow(false);
  };

  // TODO: add resize window listener

  useEffect(() => {
    const onScroll = () => {
      setActiveItemRect(activeItem.node!.getBoundingClientRect());
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeItem]);

  useEffect(() => {
    activeItem.node?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }, [activeItem]);

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.relative}>
        {/*TODO: move the block with the tooltip into a separate component*/}
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
          {activeItem.idx}
          <button disabled={!prevItem} onClick={onPrev}>
            prev
          </button>
          <button disabled={!nextItem} onClick={onNext}>
            next
          </button>
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
