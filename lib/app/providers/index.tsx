import { TipsProvider } from '@/app/context/tips.tsx';
import { TipDataItem } from '@/shared/types';

type Props = {
  children: React.ReactNode;
  tips: TipDataItem[];
};

const Provider = ({ children, tips }: Props) => {
  return <TipsProvider tips={tips}>{children}</TipsProvider>;
};

export default Provider;
