import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <p>{t('footerBy')}</p>
        <p className={styles.copyright}>{t('footerCopyright')}</p>
      </div>
    </footer>
  );
}
