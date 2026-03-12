import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine, Droplets, GlassWater, Martini } from 'lucide-react';
import { Cocktail } from '../types';
import { lockBodyScroll, unlockBodyScroll } from '../lib/bodyScrollLock';
import { useLanguage } from '../context/LanguageContext';
import { getSpiritLabel, getStrengthLabel } from '../i18n/translations';
import { getTranslatedCocktail } from '../i18n/cocktailTranslations';
import styles from './CocktailModal.module.css';

interface CocktailModalProps {
  cocktail: Cocktail | null;
  onClose: () => void;
}

export function CocktailModal({ cocktail, onClose }: CocktailModalProps) {
  const { locale, t } = useLanguage();
  
  const translatedCocktail = useMemo(() => {
    return cocktail ? getTranslatedCocktail(cocktail, locale) : null;
  }, [cocktail, locale]);

  useEffect(() => {
    if (!cocktail) return;

    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [cocktail]);

  return (
    <AnimatePresence>
      {translatedCocktail && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ willChange: 'opacity' }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{ willChange: 'transform, opacity' }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.content}>
              <div className={styles.imageSection}>
                <div className={styles.imageWrapper}>
                  <img
                    src={translatedCocktail.image}
                    alt={translatedCocktail.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <div 
                    className={styles.imageGlow}
                    style={{ backgroundColor: translatedCocktail.color }}
                  />
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.header}>
                  <div className={styles.tags}>
                    {translatedCocktail.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <h2 className={styles.name}>{translatedCocktail.name}</h2>
                  <p className={styles.description}>{translatedCocktail.description}</p>
                </div>

                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <Wine size={18} />
                    <span>{getSpiritLabel(locale, translatedCocktail.baseSpirit)}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Droplets size={18} />
                    <span>{getStrengthLabel(locale, translatedCocktail.strength)}</span>
                  </div>
                  {translatedCocktail.glassware && (
                    <div className={styles.metaItem}>
                      <GlassWater size={18} />
                      <span>{translatedCocktail.glassware}</span>
                    </div>
                  )}
                  {translatedCocktail.method && (
                    <div className={styles.metaItem}>
                      <Martini size={18} />
                      <span>{translatedCocktail.method}</span>
                    </div>
                  )}
                </div>

                <div className={styles.section}>
                  <h3>{t('ingredients')}</h3>
                  <ul className={styles.ingredients}>
                    {translatedCocktail.ingredients.map((ingredient, i) => (
                      <li key={i}>
                        <span className={styles.amount}>{ingredient.amount}</span>
                        <span className={styles.ingredientName}>{ingredient.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {translatedCocktail.garnish && (
                  <div className={styles.section}>
                    <h3>{t('garnish')}</h3>
                    <p className={styles.garnish}>{translatedCocktail.garnish}</p>
                  </div>
                )}

                <div className={styles.section}>
                  <h3>{t('preparation')}</h3>
                  <ol className={styles.steps}>
                    {translatedCocktail.preparation.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
