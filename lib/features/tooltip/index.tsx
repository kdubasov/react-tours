import styles from './Tooltip.module.css';
import { useTips } from '@/shared/hooks/useTips.tsx';
import { TipDataItemWithNode } from '@/shared/types';
import Spinner from '@/shared/ui/spinner';
import { CSSProperties, useMemo } from 'react';

type Props = {
  item: TipDataItemWithNode;
  itemRect: DOMRect;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  prevItem: undefined | TipDataItemWithNode;
  nextItem: undefined | TipDataItemWithNode;
  countItems: number;
  itemIdx: number;
  isLoading: boolean;
};

const Tooltip = (props: Props) => {
  const { item, prevItem, nextItem, onPrev, onNext, onClose, itemRect, countItems, itemIdx, isLoading } = props;
  const { isHiddenClose } = useTips();
  const margin = 10;
  const style: CSSProperties = {};

  const isShowClose = useMemo(() => {
    if (!isHiddenClose) return true;
    return countItems - 1 === itemIdx;
  }, [itemIdx, countItems, isHiddenClose]);

  const xMargin = itemRect.left + itemRect.width / 2 > window.innerWidth / 2 ? 'right' : 'left';
  style.maxWidth = itemRect.right;
  if (itemRect.height > window.innerHeight - 200) {
    style.top = margin;
    style[xMargin] = margin;
  } else {
    if (itemRect.top + itemRect.height / 2 > window.innerHeight / 2) {
      style.bottom = itemRect.height + margin;
    } else {
      style.top = itemRect.height + margin;
    }
    style[xMargin] = 0;
  }

  return (
    <div style={style} className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.leftHeader}>
          <span className={styles.count}>
            {itemIdx + 1} / {countItems}
          </span>
          <div className={styles.loader}>{isLoading && <Spinner />}</div>
        </div>

        {isShowClose && (
          <button className={styles.close} onClick={onClose} type="button">
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M7.8228 0.183264C7.76667 0.127012 7.69999 0.0823841 7.62658 0.0519343C7.55318 0.0214845 7.47448 0.00581086 7.39501 0.00581086C7.31554 0.00581086 7.23685 0.0214845 7.16345 0.0519343C7.09004 0.0823841 7.02336 0.127012 6.96722 0.183264L4 3.14442L1.03278 0.177196C0.976598 0.121018 0.909905 0.0764551 0.836505 0.0460517C0.763104 0.0156483 0.684434 5.91933e-10 0.604986 0C0.525539 -5.91934e-10 0.446868 0.0156483 0.373468 0.0460517C0.300068 0.0764551 0.233374 0.121018 0.177196 0.177196C0.121018 0.233374 0.0764551 0.300068 0.0460517 0.373468C0.0156483 0.446868 -5.91933e-10 0.525539 0 0.604986C5.91934e-10 0.684434 0.0156483 0.763104 0.0460517 0.836505C0.0764551 0.909905 0.121018 0.976598 0.177196 1.03278L3.14442 4L0.177196 6.96722C0.121018 7.0234 0.0764551 7.0901 0.0460517 7.1635C0.0156483 7.2369 0 7.31557 0 7.39501C0 7.47446 0.0156483 7.55313 0.0460517 7.62653C0.0764551 7.69993 0.121018 7.76663 0.177196 7.8228C0.233374 7.87898 0.300068 7.92355 0.373468 7.95395C0.446868 7.98435 0.525539 8 0.604986 8C0.684434 8 0.763104 7.98435 0.836505 7.95395C0.909905 7.92355 0.976598 7.87898 1.03278 7.8228L4 4.85558L6.96722 7.8228C7.0234 7.87898 7.0901 7.92355 7.1635 7.95395C7.2369 7.98435 7.31557 8 7.39501 8C7.47446 8 7.55313 7.98435 7.62653 7.95395C7.69993 7.92355 7.76663 7.87898 7.8228 7.8228C7.87898 7.76663 7.92355 7.69993 7.95395 7.62653C7.98435 7.55313 8 7.47446 8 7.39501C8 7.31557 7.98435 7.2369 7.95395 7.1635C7.92355 7.0901 7.87898 7.0234 7.8228 6.96722L4.85558 4L7.8228 1.03278C8.05339 0.802195 8.05339 0.413846 7.8228 0.183264Z" />
            </svg>
          </button>
        )}
      </header>

      <div className={styles.textWrapper}>
        {item?.title && <h4>{item.title}</h4>}
        <p>{item.text}</p>
      </div>

      <footer className={styles.footer}>
        <button disabled={!prevItem || isLoading} onClick={onPrev} type="button">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.42358 3.63123H0.923584M0.923584 3.63123L3.92358 0.631226M0.923584 3.63123L3.92358 6.63123"
              stroke="var(--dark)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button disabled={isLoading} onClick={nextItem ? onNext : onClose} type="button">
          {nextItem ? (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.0271 3.63123H8.5271M8.5271 3.63123L5.5271 0.631226M8.5271 3.63123L5.5271 6.63123"
                stroke="white"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.9413 3.63123L7.9413 6.63123L13.9413 0.631226M1.40576 3.63123L4.40576 6.63123M8.12328 2.93456L10.4058 0.631226"
                stroke="white"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </footer>
    </div>
  );
};

export default Tooltip;
