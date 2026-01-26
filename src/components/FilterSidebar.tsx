import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine, Beer, Martini, GlassWater, Grape, Sparkles, FlaskConical, Citrus } from 'lucide-react';
import { BaseSpirit, Strength, CocktailType } from '../types';
import { lockBodyScroll, unlockBodyScroll } from '../lib/bodyScrollLock';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSpirit: BaseSpirit | null;
  selectedStrength: Strength | null;
  selectedType: CocktailType | null;
  onSpiritChange: (spirit: BaseSpirit | null) => void;
  onStrengthChange: (strength: Strength | null) => void;
  onTypeChange: (type: CocktailType | null) => void;
  onClear: () => void;
}

const baseSpirits: { value: BaseSpirit; label: string; color: string; icon: React.ReactNode }[] = [
  { value: 'vodka', label: 'Vodka', color: '#a5f3fc', icon: <GlassWater size={20} /> },
  { value: 'rum', label: 'Rum', color: '#fcd34d', icon: <Beer size={20} /> },
  { value: 'gin', label: 'Gin', color: '#86efac', icon: <Martini size={20} /> },
  { value: 'tequila', label: 'Tequila', color: '#fca5a5', icon: <Citrus size={20} /> },
  { value: 'whiskey', label: 'Whiskey', color: '#fdba74', icon: <FlaskConical size={20} /> },
  { value: 'brandy', label: 'Brandy', color: '#c4b5fd', icon: <Wine size={20} /> },
  { value: 'wine', label: 'Wine', color: '#fda4af', icon: <Grape size={20} /> },
  { value: 'champagne', label: 'Champagne', color: '#fef08a', icon: <Sparkles size={20} /> },
  { value: 'liqueur', label: 'Liqueur', color: '#f0abfc', icon: <FlaskConical size={20} /> },
  { value: 'cachaca', label: 'Cachaça', color: '#a3e635', icon: <Citrus size={20} /> },
];

const strengths: { value: Strength; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
  { value: 'extreme-strong', label: 'Extreme Strong' },
];

const types: { value: CocktailType; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'tropical', label: 'Tropical' },
  { value: 'martini', label: 'Martini' },
  { value: 'longdrink', label: 'Longdrink' },
  { value: 'short', label: 'Short' },
  { value: 'sparkling', label: 'Sparkling' },
  { value: 'frozen', label: 'Frozen' },
];

export function FilterSidebar({
  isOpen,
  onClose,
  selectedSpirit,
  selectedStrength,
  selectedType,
  onSpiritChange,
  onStrengthChange,
  onTypeChange,
  onClear,
}: FilterSidebarProps) {
  const hasFilters = selectedSpirit || selectedStrength || selectedType;
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [isOpen]);

  const variants = {
    initial: isDesktop ? { y: '-100%', x: 0 } : { x: '-100%', y: 0 },
    animate: { x: 0, y: 0 },
    exit: isDesktop ? { y: '-100%', x: 0 } : { x: '-100%', y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.sidebar}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2>Filter</h2>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <h3>Browse by Category</h3>
                <div className={styles.options}>
                  {types.map(({ value, label }) => (
                    <button
                      key={value}
                      className={`${styles.option} ${selectedType === value ? styles.active : ''}`}
                      onClick={() => onTypeChange(selectedType === value ? null : value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3><Wine size={18} /> Base Spirit</h3>
                <div className={styles.spiritOptions}>
                  {baseSpirits.map(({ value, label, color, icon }) => (
                    <button
                      key={value}
                      className={`${styles.spiritOption} ${selectedSpirit === value ? styles.active : ''}`}
                      onClick={() => onSpiritChange(selectedSpirit === value ? null : value)}
                    >
                      <span 
                        className={styles.spiritIcon}
                        style={{ color: color }}
                      >
                        {icon}
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>Strength</h3>
                <div className={styles.options}>
                  {strengths.map(({ value, label }) => (
                    <button
                      key={value}
                      className={`${styles.option} ${selectedStrength === value ? styles.active : ''}`}
                      onClick={() => onStrengthChange(selectedStrength === value ? null : value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className={styles.footer}>
                <button className={styles.clearBtn} onClick={onClear}>
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
