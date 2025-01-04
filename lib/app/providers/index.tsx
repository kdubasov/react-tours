import { TipsProvider } from '@/app/context/tips.tsx';
import { CustomColors, TipDataItem } from '@/shared/types';

type Props = {
  children: React.ReactNode;
  tips: TipDataItem[];
  theme?: 'dark' | 'light';
  customColors?: CustomColors;
  highlightPadding?: number; // in px
  escapeToClose?: boolean;
  isHiddenClose?: boolean;
};

const Provider = (props: Props) => {
  const { children, tips, customColors, theme, escapeToClose, isHiddenClose, highlightPadding } = props;

  return (
    <TipsProvider
      tips={tips}
      theme={theme}
      customColors={customColors}
      escapeToClose={escapeToClose}
      isHiddenClose={isHiddenClose}
      highlightPadding={highlightPadding}
    >
      {children}
    </TipsProvider>
  );
};

export default Provider;
