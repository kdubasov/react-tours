import styles from './App.module.css';
import MenuFeedback from './widgets/menu-feedback';
import Navbar from './widgets/navbar';
import TestBlocks from './widgets/test-blocks';
import { tips } from './widgets/test-blocks/tips.ts';
import Provider from '@/app/providers';
import { useRef } from 'react';

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <main className={styles.wrapper} ref={ref}>
      <MenuFeedback />
      <Navbar />
      <Provider tips={tips} theme={'dark'} primaryColor={'#0dcaf0'} tooltipBorderColor={'#dc3545'}>
        <TestBlocks />
      </Provider>
    </main>
  );
};

export default App;
