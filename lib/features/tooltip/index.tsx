import styles from './Tooltip.module.css';
import { useTips } from '@/shared/hooks/useTips.tsx';
import type { TipDataItemWithNode } from '@/shared/types';
import Spinner from '@/shared/ui/spinner';
import { type CSSProperties, useMemo, useRef } from 'react';

type Props = {
  item: TipDataItemWithNode;
  itemRect: DOMRect;
  prevItem: undefined | TipDataItemWithNode;
  nextItem: undefined | TipDataItemWithNode;
  countItems: number;
  itemIdx: number;
  isLoading: boolean;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
};

const Tooltip = (props: Props) => {
  const { item, itemRect, prevItem, nextItem, countItems, itemIdx, isLoading, onPrev, onNext, onClose } = props;
  const { isHiddenClose } = useTips();
  const tooltipIndex = `${itemIdx + 1} / ${countItems}`;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isShowClose = useMemo(() => {
    if (!isHiddenClose) return true;
    return countItems - 1 === itemIdx;
  }, [itemIdx, countItems, isHiddenClose]);

  // Тултип — обычный absolute внутри .block (без anchor(), иначе на webkit
  // ломается хит-тест кнопок; fixed там же ломается). Сторону по вертикали
  // задаём через data-v (CSS), горизонталь — инлайновым offset с клэмпом в
  // пределы вьюпорта. Размеры тултипа берём из своего же ref (на следующий
  // ре-рендер при смене rect значения становятся точными).
  const margin = 10;
  const tooltipHeight = wrapperRef.current?.offsetHeight ?? 220;
  const tooltipWidth = wrapperRef.current?.offsetWidth ?? 320;
  // v: ставим туда, где реально помещается — под (приоритет), иначе над, иначе
  // поверх (overlap) — когда рядом места нет (высокий блок во весь экран)
  const roomBelow = window.innerHeight - itemRect.bottom - margin;
  const roomAbove = itemRect.top - margin;
  const v = roomBelow >= tooltipHeight ? 'bottom' : roomAbove >= tooltipHeight ? 'top' : 'overlap';
  // горизонталь: по умолчанию левый край тултипа = левый край блока; в режиме
  // overlap тултип лежит ВНУТРИ подсветки, поэтому отступаем от её левого края
  // (по вертикали такой отступ уже даёт CSS top: 10px). Затем зажимаем позицию
  // в [8, vw - 8 - width], чтобы тултип не вылезал на узких экранах.
  const blockLeft = itemRect.left;
  const targetLeft = blockLeft + (v === 'overlap' ? margin : 0);
  const clampedLeft = Math.max(8, Math.min(targetLeft, window.innerWidth - 8 - tooltipWidth));
  const style: CSSProperties = { left: Math.round(clampedLeft - blockLeft) };
  if (item?.maxWidth) style.maxWidth = Math.min(item.maxWidth, window.innerWidth - 16);

  return (
    <div ref={wrapperRef} style={style} className={styles.wrapper} data-testid="tips-tooltip" data-v={v}>
      <header className={styles.header}>
        <div className={styles.leftHeader}>
          <span className={styles.count} data-testid="tooltip-count" title={`Номер подсказки - (${tooltipIndex})`}>
            {tooltipIndex}
          </span>
          {isLoading && <Spinner />}
        </div>

        {isShowClose && (
          <button
            className={styles.close}
            onClick={onClose}
            type="button"
            data-testid="tooltip-close"
            title="Закрыть подсказки"
          >
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M7.8228 0.183264C7.76667 0.127012 7.69999 0.0823841 7.62658 0.0519343C7.55318 0.0214845 7.47448 0.00581086 7.39501 0.00581086C7.31554 0.00581086 7.23685 0.0214845 7.16345 0.0519343C7.09004 0.0823841 7.02336 0.127012 6.96722 0.183264L4 3.14442L1.03278 0.177196C0.976598 0.121018 0.909905 0.0764551 0.836505 0.0460517C0.763104 0.0156483 0.684434 5.91933e-10 0.604986 0C0.525539 -5.91934e-10 0.446868 0.0156483 0.373468 0.0460517C0.300068 0.0764551 0.233374 0.121018 0.177196 0.177196C0.121018 0.233374 0.0764551 0.300068 0.0460517 0.373468C0.0156483 0.446868 -5.91933e-10 0.525539 0 0.604986C5.91934e-10 0.684434 0.0156483 0.763104 0.0460517 0.836505C0.0764551 0.909905 0.121018 0.976598 0.177196 1.03278L3.14442 4L0.177196 6.96722C0.121018 7.0234 0.0764551 7.0901 0.0460517 7.1635C0.0156483 7.2369 0 7.31557 0 7.39501C0 7.47446 0.0156483 7.55313 0.0460517 7.62653C0.0764551 7.69993 0.121018 7.76663 0.177196 7.8228C0.233374 7.87898 0.300068 7.92355 0.373468 7.95395C0.446868 7.98435 0.525539 8 0.604986 8C0.684434 8 0.763104 7.98435 0.836505 7.95395C0.909905 7.92355 0.976598 7.87898 1.03278 7.8228L4 4.85558L6.96722 7.8228C7.0234 7.87898 7.0901 7.92355 7.1635 7.95395C7.2369 7.98435 7.31557 8 7.39501 8C7.47446 8 7.55313 7.98435 7.62653 7.95395C7.69993 7.92355 7.76663 7.87898 7.8228 7.8228C7.87898 7.76663 7.92355 7.69993 7.95395 7.62653C7.98435 7.55313 8 7.47446 8 7.39501C8 7.31557 7.98435 7.2369 7.95395 7.1635C7.92355 7.0901 7.87898 7.0234 7.8228 6.96722L4.85558 4L7.8228 1.03278C8.05339 0.802195 8.05339 0.413846 7.8228 0.183264Z" />
            </svg>
          </button>
        )}
      </header>

      <div className={styles.textWrapper}>
        {item?.title && (
          <h4 data-testid="tooltip-title" title={item.title}>
            {item.title}
          </h4>
        )}
        <p data-testid="tooltip-text" title={item.text}>
          {item.text}
        </p>
      </div>

      <footer className={styles.footer}>
        {prevItem && (
          <button
            disabled={!prevItem || isLoading}
            onClick={onPrev}
            type="button"
            data-testid="tooltip-prev"
            title="Предыдущая подсказка"
          >
            Назад
          </button>
        )}

        <button
          disabled={isLoading}
          title={nextItem ? 'Следующая подсказка' : 'Закрыть'}
          onClick={nextItem ? onNext : onClose}
          type="button"
          data-testid="tooltip-next"
        >
          {nextItem ? 'Далее' : 'Все понятно'}
          {nextItem && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.0271 3.63123H8.5271M8.5271 3.63123L5.5271 0.631226M8.5271 3.63123L5.5271 6.63123"
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
