import styles from './TestBlocks.module.css';
import { useTips } from '@/app/main.ts';

const TestBlocks = () => {
  const { setIsShow } = useTips();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Interactive playground</p>
        <h1 className={styles.title}>
          Guide users through <em>anything</em> on the page
        </h1>
        <p className={styles.lead}>
          react-custom-tours attaches a step-by-step tour to any element by id. The spotlight tracks its target through
          scroll, resize and nested containers — natively, with no layout jank.
        </p>
        <button id="test-0" className={styles.cta} onClick={() => setIsShow(true)}>
          Show tips
        </button>
      </section>

      <section className={styles.grid}>
        <article id="test-1" className={`${styles.card} ${styles.colWide}`}>
          <span className={styles.stop}>STOP 01</span>
          <h3>Highlight any element</h3>
          <p>
            Point a step at a DOM id and the spotlight frames it pixel-perfectly while the rest of the page dims away.
          </p>
        </article>

        <article id="test-2" className={`${styles.card} ${styles.colNarrow}`}>
          <span className={styles.stop}>STOP 02</span>
          <h3>Light &amp; dark</h3>
          <p>Theming built in.</p>
        </article>

        <article id="test-3" className={`${styles.card} ${styles.colWide}`}>
          <span className={styles.stop}>STOP 03</span>
          <h3>Async step handlers</h3>
          <p>
            Return a promise from a Next or Back handler — load data, await an animation — and the tour shows a spinner
            until it resolves before moving on.
          </p>
        </article>

        <article id="test-5" className={`${styles.card} ${styles.colNarrow}`}>
          <span className={styles.stop}>STOP 05</span>
          <h3>Keyboard</h3>
          <p>Esc closes the tour.</p>
        </article>

        <article id="test-4" className={`${styles.card} ${styles.colTall}`}>
          <span className={styles.stop}>STOP 04</span>
          <h3>Follows scroll &amp; resize</h3>
          <p>Even a target this tall stays framed. The highlight is recomputed by the browser, so it never drifts.</p>
          <span className={styles.tallHint}>↑ a deliberately tall target to stress-test the spotlight</span>
        </article>

        <article id="test-6" className={`${styles.card} ${styles.colFull}`}>
          <span className={styles.stop}>STOP 06</span>
          <h3>Plays nice with modals</h3>
          <p>mousedown is stopped at the overlay, so dialogs that close on outside-click keep working mid-tour.</p>
        </article>
      </section>

      <section className={styles.scrollDemo}>
        <header className={styles.scrollHead}>
          <h2>Nested scroll — vertical</h2>
          <p>Scroll inside the panel: the spotlight follows the target through the container, not just the window.</p>
        </header>
        <div className={styles.scrollY}>
          <article id="test-7" className={styles.scrollCard}>
            <span className={styles.stop}>STOP 07</span>
            <h3>Target inside a scroll area</h3>
            <p>The overlay re-anchors as this panel scrolls.</p>
          </article>
          <div className={styles.filler}>
            <p>— scroll down —</p>
          </div>
          <div className={styles.filler}>
            <p>— keep going —</p>
          </div>
          <article id="test-8" className={styles.scrollCard}>
            <span className={styles.stop}>STOP 08</span>
            <h3>Further down the panel</h3>
            <p>Still tracked, even far below the fold of the container.</p>
          </article>
          <div className={styles.filler}>
            <p>— end of panel —</p>
          </div>
        </div>
      </section>

      <section className={styles.scrollDemo}>
        <header className={styles.scrollHead}>
          <h2>Nested scroll — horizontal</h2>
          <p>Same story sideways: the highlight rides along with horizontal scroll containers.</p>
        </header>
        <div className={styles.scrollX}>
          <article id="test-9" className={styles.scrollCard}>
            <span className={styles.stop}>STOP 09</span>
            <h3>Scrolls sideways</h3>
            <p>Anchored across the X axis.</p>
          </article>
          <div className={styles.filler}>
            <p>→ scroll right →</p>
          </div>
          <div className={styles.filler}>
            <p>→ almost there →</p>
          </div>
          <article id="test-10" className={styles.scrollCard}>
            <span className={styles.stop}>STOP 10</span>
            <h3>Edge of the track</h3>
            <p>Tracked to the far end.</p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default TestBlocks;
