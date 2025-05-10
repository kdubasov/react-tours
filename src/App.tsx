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
        theme="dark"
        tips={tips}
        escapeToClose
        customColors={{
          dark: {
            primary: '#6e0ed3',
          },
          light: {
            primary: '#792502',
          },
        }}
      >
        <TestBlocks />
      </TipsProvider>
    </main>
  );
};

export default App;
