import styles from './App.module.css';
import MenuFeedback from './widgets/menu-feedback';
import TestBlocks from './widgets/test-blocks';
import { tips } from './widgets/test-blocks/tips.ts';
import { TipsProvider } from '@/app/main.ts';

const App = () => {
  return (
    <main className={styles.wrapper}>
      <MenuFeedback />
      <TipsProvider
        highlightPadding={10}
        theme="light"
        tips={tips}
        escapeToClose
        customColors={{
          dark: {
            primary: '#0dcaf0',
            highlightBorder: '#dc3545',
          },
          light: {
            primary: 'rgb(21,194,30)',
            highlightBorder: 'rgba(158,113,255,0.42)',
          },
        }}
      >
        <TestBlocks />
      </TipsProvider>
    </main>
  );
};

export default App;
