import { TipsProvider } from '@/app/context/tips.tsx';
import { TipDataItem } from '@/shared/types';

type Props = {
  children: React.ReactNode;
  tips: TipDataItem[];
  parentNode?: HTMLElement;
  theme?: 'dark' | 'light';
  primaryColor?: string;
  tooltipBorderColor?: string;
  escapeToClose?: boolean;
};

const Provider = (props: Props) => {
  // TODO: add tests
  const { children, tips, primaryColor, tooltipBorderColor, theme, escapeToClose, parentNode } = props;

  return (
    <TipsProvider
      tips={tips}
      theme={theme}
      primaryColor={primaryColor}
      tooltipBorderColor={tooltipBorderColor}
      escapeToClose={escapeToClose}
      parentNode={parentNode}
    >
      {children}
    </TipsProvider>
  );
};

export default Provider;
