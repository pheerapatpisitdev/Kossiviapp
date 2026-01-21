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
        <svg viewBox="0 0 100 100" className={styles.logoIcon}>
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff9800" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#feca57" />
            </linearGradient>
          </defs>
          <polygon 
            points="25,20 75,20 60,65 40,65" 
            fill="none" 
            stroke="url(#glassGrad)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <polygon points="30,35 70,35 60,65 40,65" fill="url(#liquidGrad)" opacity="0.8"/>
          <line x1="50" y1="65" x2="50" y2="90" stroke="url(#glassGrad)" strokeWidth="3" strokeLinecap="round"/>
          <ellipse cx="50" cy="90" rx="15" ry="4" fill="none" stroke="url(#glassGrad)" strokeWidth="3"/>
          <circle cx="35" cy="28" r="4" fill="#4ade80"/>
          <circle cx="60" cy="25" r="3" fill="#fb923c"/>
        </svg>
      </a>

      <button className={styles.searchBtn} onClick={onSearchClick}>
        <Search size={22} />
      </button>
    </motion.header>
  );
}
