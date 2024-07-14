import { useTips } from '@/app/main.ts';
import TipsActiveLayout from '@/features/tips-active-layout';
import { TipDataItemWithNode } from '@/shared/types';

type Props = {
  children: React.ReactNode;
};
type ActiveProps = {
  data: TipDataItemWithNode[] | null;
  isShow: boolean;
};

const TipsLayout = ({ children }: Props) => {
  const { data, isShow } = useTips();
  return (
    <>
      <TipsActiveLayoutRender data={data} isShow={isShow} />
      {children}
    </>
  );
};

export default TipsLayout;

const TipsActiveLayoutRender = ({ isShow, data }: ActiveProps) => {
  if (!isShow || !data) return;
  const dataWithNodes = data.filter((elem) => elem?.node);
  if (dataWithNodes.length === 0) {
    throw new Error(
      'You are trying to show a tour, but the DOM nodes for this tour are not found in the DOM Tree, please check it!',
    );
  }

  return <TipsActiveLayout data={dataWithNodes.sort((a, b) => a.idx - b.idx)} />;
};
