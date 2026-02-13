import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

interface HeaderProps {
  onFilterClick: () => void;
  onSearchClick: () => void;
}

export function Header({ onFilterClick, onSearchClick }: HeaderProps) {
  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button className={styles.filterBtn} onClick={onFilterClick}>
        <SlidersHorizontal size={18} />
        <span>Filter</span>
      </button>

      <a href="/" className={styles.logo}>
        <img src="/logo.png" alt="Kossivi Bar Academy" className={styles.logoIcon} />
      </a>

      <button className={styles.searchBtn} onClick={onSearchClick}>
        <Search size={22} />
      </button>
    </motion.header>
  );
}
