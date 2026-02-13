import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <p>Application by Kossivi Professional Bar Academy</p>
        <p className={styles.copyright}>© 2026 Kossivi. All rights reserved.</p>
      </div>
    </footer>
  );
}
