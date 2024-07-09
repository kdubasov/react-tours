import ShowTipsButton from './ShowTipsButton.tsx';
import styles from './main.module.css';
import { TipsProvider } from '@/app/main.ts';

const App = () => {
  const tips = [
    {
      idx: 4,
      nodeId: 'test5',
      text: 'test 5',
    },
    {
      idx: 0,
      nodeId: 'test1',
      text: 'test 1',
    },
    {
      idx: 1,
      nodeId: 'test2',
      text: 'test 2',
    },
    {
      idx: 2,
      nodeId: 'test3',
      text: 'test 3',
    },
    {
      idx: 5,
      nodeId: 'test6',
      text: 'test 6',
    },
    {
      idx: 3,
      nodeId: 'test4',
      text: 'test 4',
    },
  ];

  return (
    <TipsProvider tips={tips}>
      <div className={styles.main}>
        <ShowTipsButton />
        <h1 className={styles.title} id={'test1'}>
          Hello world
        </h1>

        <div className={styles.test1} id={'test2'}>
          <h4>Test #1</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam autem eum maiores nisi quisquam
            suscipit voluptates. Dolorem, ipsa, maiores.
          </p>
        </div>

        <div className={styles.test2} id={'test3'}>
          <h4>Test #1</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam autem eum maiores nisi quisquam
            suscipit voluptates. Dolorem, ipsa, maiores.
          </p>
        </div>

        <div className={styles.test3}>
          <h4 id={'test4'}>Test #1</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam autem eum maiores nisi quisquam
            suscipit voluptates. Dolorem, ipsa, maiores.
          </p>
        </div>

        <div className={styles.test4}>
          <h4>Test #1</h4>
          <p id={'test5'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam autem eum maiores nisi quisquam
            suscipit voluptates. Dolorem, ipsa, maiores.
          </p>
        </div>

        <span style={{ border: '1px solid red', fontSize: 30 }} id={'test6'}>
          hello
        </span>
      </div>
    </TipsProvider>
  );
};

export default App;
