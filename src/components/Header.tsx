import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './Header.module.css';

interface HeaderProps {
  onFilterClick: () => void;
  onSearchClick: () => void;
}

export function Header({ onFilterClick, onSearchClick }: HeaderProps) {
  const { t } = useLanguage();

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
        <button className={styles.searchBtn} onClick={onSearchClick}>
          <Search size={28} />
        </button>
      </div>
    </motion.header>
  );
}
