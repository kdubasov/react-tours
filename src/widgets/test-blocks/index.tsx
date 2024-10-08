import styles from './TestBlocks.module.css';
import { useTips } from '@/app/main.ts';

const TestBlocks = () => {
  const { setIsShow } = useTips();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button id="test-0" onClick={() => setIsShow(true)}>
          Show tips
        </button>
      </header>

      <div id="test-1" className={styles.test1}>
        <h3>Test block #1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore dolorum eius ipsa possimus rerum
          saepe sapiente sit temporibus?
        </p>
      </div>

      <div className={styles.test2}>
        <h3 id="test-2">Test block #2</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore dolorum eius ipsa possimus rerum
          saepe sapiente sit temporibus?
        </p>
      </div>

      <div className={styles.test3}>
        <h3>Test block #3</h3>
        <p id="test-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore dolorum eius ipsa possimus rerum
          saepe sapiente sit temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore
          dolorum eius ipsa possimus rerum saepe sapiente sit temporibus?
        </p>
      </div>

      <div id="test-4" className={styles.test4}>
        <h3>Test block #4</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore dolorum eius ipsa possimus rerum
          saepe sapiente sit temporibus?
        </p>
      </div>

      <div id="test-5" className={styles.test5}>
        <h3>Test block #5</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore dolorum eius ipsa possimus rerum
          saepe sapiente sit temporibus?
        </p>
      </div>

      <div id="test-6" className={styles.test6}>
        <h3>Test block #6</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum dolore dolorum eius ipsa possimus rerum
          saepe sapiente sit temporibus?
        </p>
      </div>
    </div>
  );
};

export default TestBlocks;
