import TipsLayout from '@/features/tips-layout';
import { TipDataItem, TipDataItemWithNode, TipsConfig } from '@/shared/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';

type TipsContextValue = TipsConfig & {
  data: null | TipDataItemWithNode[];
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

type Props = TipsConfig & {
  children: ReactNode;
  tips: TipDataItem[];
};

export const TipsContext = createContext<TipsContextValue>({} as TipsContextValue);

export const TipsProvider = (props: Props) => {
  const { children, tips, theme, customColors, escapeToClose, isHiddenClose, highlightPadding } = props;
  const [data, setData] = useState<null | TipDataItemWithNode[]>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!isShow) return;
    setData(
      tips.map((elem) => ({
        ...elem,
        node: document.getElementById(elem.nodeId),
      })),
    );
  }, [tips, isShow]);

  const memoValue = useMemo(
    () => ({
      data,
      isShow,
      theme,
      escapeToClose,
      customColors,
      isHiddenClose,
      highlightPadding,
      setIsShow,
    }),
    [data, isShow, theme, escapeToClose, setIsShow, customColors, isHiddenClose, highlightPadding],
  );

  return (
    <TipsContext.Provider value={memoValue}>
      <TipsLayout>{children}</TipsLayout>
    </TipsContext.Provider>
  );
};
