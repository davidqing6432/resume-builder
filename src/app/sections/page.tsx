import styles from "./page.module.css";

export default function Sections() {
  return (
    <div className={styles.container}>
      <h1>Section Builder</h1>
      <div className={styles.builder}>
        <div className={styles.sidebar}>
          <div className={styles.field}>
            <h4>Field Name</h4>
          </div>
          <div className={styles.field}>
            <h4>Field Name</h4>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.visualizer}>
            <h4>Visualizer</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
