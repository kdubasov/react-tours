import { TipsContext } from '@/app/context/tips.tsx';
import { useContext } from 'react';

export const useTips = () => {
  return useContext(TipsContext);
};
