import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { AuthButtons } from './AuthButtons';
import styles from './Header.module.css';

interface HeaderProps {
  onFilterClick: () => void;
  onSearchClick: () => void;
}

export function Header({ onFilterClick, onSearchClick }: HeaderProps) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button className={styles.filterBtn} onClick={onFilterClick}>
        <SlidersHorizontal size={18} />
        <span>{t('filter')}</span>
      </button>

      <a href="/" className={styles.logo}>
        <img src="/logo.png" alt={t('logoAlt')} className={styles.logoIcon} />
      </a>

      <div className={styles.headerRight}>
        <div className={styles.langToggle} role="group" aria-label="Language">
          <button
            type="button"
            className={locale === 'en' ? styles.langActive : styles.langBtn}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={locale === 'fr' ? styles.langActive : styles.langBtn}
            onClick={() => setLocale('fr')}
          >
            FR
          </button>
        </div>
        <AuthButtons />
        <button className={styles.searchBtn} onClick={onSearchClick}>
          <Search size={22} />
        </button>
      </div>
    </motion.header>
  );
}
