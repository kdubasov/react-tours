import { useTips } from '@/app/main.ts';

const ShowTipsButton = () => {
  const { setIsShow } = useTips();
  return <button onClick={() => setIsShow(true)}>Показать тур</button>;
};

export default ShowTipsButton;
