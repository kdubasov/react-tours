import styles from './App.module.css';
import MenuFeedback from './widgets/menu-feedback';
import Navbar from './widgets/navbar';
import TestBlocks from './widgets/test-blocks';
import { tips } from './widgets/test-blocks/tips.ts';
import { TipsProvider } from '@/app/main.ts';
import { useRef } from 'react';

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <main className={styles.wrapper} ref={ref}>
      <MenuFeedback />
      <Navbar />
      <TipsProvider theme="dark" tips={tips} escapeToClose primaryColor={'#0dcaf0'} tooltipBorderColor={'#dc3545'}>
        <TestBlocks />
      </TipsProvider>
    </main>
  );
};

export default App;
