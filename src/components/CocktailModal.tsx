import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine, Droplets, Clock } from 'lucide-react';
import { Cocktail } from '../types';
import { lockBodyScroll, unlockBodyScroll } from '../lib/bodyScrollLock';
import styles from './CocktailModal.module.css';

interface CocktailModalProps {
  cocktail: Cocktail | null;
  onClose: () => void;
}

export function CocktailModal({ cocktail, onClose }: CocktailModalProps) {
  const [enableBackdropBlur, setEnableBackdropBlur] = useState(false);

  useEffect(() => {
    if (!cocktail) return;

    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [cocktail]);

  useEffect(() => {
    if (!cocktail) {
      setEnableBackdropBlur(false);
      return;
    }

    const id = window.setTimeout(() => setEnableBackdropBlur(true), 120);
    return () => {
      window.clearTimeout(id);
      setEnableBackdropBlur(false);
    };
  }, [cocktail]);

  const strengthLabels = {
    'light': 'Light',
    'medium': 'Medium',
    'strong': 'Strong',
    'extreme-strong': 'Extreme Strong',
  };

  return (
    <AnimatePresence>
      {cocktail && (
        <motion.div
          className={`${styles.overlay} ${enableBackdropBlur ? styles.blur : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.content}>
              <div className={styles.imageSection}>
                <div className={styles.imageWrapper}>
                  <img src={cocktail.image} alt={cocktail.name} />
                  <div 
                    className={styles.imageGlow}
                    style={{ backgroundColor: cocktail.color }}
                  />
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.header}>
                  <div className={styles.tags}>
                    {cocktail.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <h2 className={styles.name}>{cocktail.name}</h2>
                  <p className={styles.description}>{cocktail.description}</p>
                </div>

                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <Wine size={18} />
                    <span>{cocktail.baseSpirit}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Droplets size={18} />
                    <span>{strengthLabels[cocktail.strength]}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={18} />
                    <span>5 min</span>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Ingredients</h3>
                  <ul className={styles.ingredients}>
                    {cocktail.ingredients.map((ingredient, i) => (
                      <li key={i}>
                        <span className={styles.amount}>{ingredient.amount}</span>
                        <span className={styles.ingredientName}>{ingredient.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.section}>
                  <h3>Preparation</h3>
                  <ol className={styles.steps}>
                    {cocktail.preparation.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                {cocktail.garnish && (
                  <div className={styles.garnish}>
                    <span>Garnish:</span> {cocktail.garnish}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
