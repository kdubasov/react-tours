import TipsLayout from '@/features/tips-layout';
import { CustomColors, TipDataItem, TipDataItemWithNode } from '@/shared/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';

type AuthContext = {
  data: null | TipDataItemWithNode[];
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  theme?: 'dark' | 'light';
  escapeToClose?: boolean;
  customColors?: CustomColors;
  isHiddenClose?: boolean;
  highlightPadding?: number;
};

type Props = {
  children: ReactNode;
  tips: TipDataItem[];
  theme?: 'dark' | 'light';
  customColors?: CustomColors;
  escapeToClose?: boolean;
  isHiddenClose?: boolean;
  highlightPadding?: number;
};

export const TipsContext = createContext<AuthContext>({} as AuthContext);

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
