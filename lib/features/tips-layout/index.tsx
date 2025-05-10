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

const errEmptyBlocks =
  'You are trying to show a tour, but the DOM nodes for this tour are not found in the DOM Tree, please check it!';

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
  if (!isShow || !data) return null;

  const dataWithNodesSorted = data.filter((elem) => elem?.node).sort((a, b) => a.idx - b.idx);
  if (dataWithNodesSorted.length === 0) {
    console.warn(errEmptyBlocks);
    return null;
  }

  return <TipsActiveLayout data={dataWithNodesSorted} />;
};
