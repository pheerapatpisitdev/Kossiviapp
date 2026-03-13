import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';

export function Footer() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <div>
            <p>{t('footerBy')}</p>
            <p className={styles.copyright}>{t('footerCopyright')}</p>
          </div>
          <div className={styles.langContainer}>
            <label className={styles.langLabel} htmlFor="language-select">
              Language
            </label>
            <div className={styles.langSelectWrapper}>
              <select
                id="language-select"
                className={styles.langSelect}
                value={locale}
                onChange={(e) => setLocale(e.target.value as 'en' | 'fr')}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
              <span className={styles.langSelectIcon}>▾</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
