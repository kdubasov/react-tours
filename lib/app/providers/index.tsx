import { TipsProvider } from '@/app/context/tips.tsx';
import { TipDataItem } from '@/shared/types';

type Props = {
  children: React.ReactNode;
  tips: TipDataItem[];
  theme?: 'dark' | 'light';
  primaryColor?: string;
  tooltipBorderColor?: string;
  escapeToClose?: boolean;
  isHiddenClose?: boolean;
};

const Provider = (props: Props) => {
  const { children, tips, primaryColor, tooltipBorderColor, theme, escapeToClose, isHiddenClose } = props;

  return (
    <TipsProvider
      tips={tips}
      theme={theme}
      primaryColor={primaryColor}
      tooltipBorderColor={tooltipBorderColor}
      escapeToClose={escapeToClose}
      isHiddenClose={isHiddenClose}
    >
      {children}
    </TipsProvider>
  );
};

export default Provider;
