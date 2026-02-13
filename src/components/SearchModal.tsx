import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Cocktail } from '../types';
import { lockBodyScroll, unlockBodyScroll } from '../lib/bodyScrollLock';
import { useLanguage } from '../context/LanguageContext';
import { getSpiritLabel } from '../i18n/translations';
import { getTranslatedCocktail } from '../i18n/cocktailTranslations';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cocktails: Cocktail[];
  onCocktailClick: (cocktail: Cocktail) => void;
}

export function SearchModal({ isOpen, onClose, cocktails, onCocktailClick }: SearchModalProps) {
  const { locale, t } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search in both original (EN) and translated (TH) names
  const filteredCocktails = useMemo(() => {
    return cocktails.filter(cocktail => {
      const searchLower = query.toLowerCase();
      const translated = getTranslatedCocktail(cocktail, locale);
      
      return (
      // Search in original English name
      cocktail.name.toLowerCase().includes(searchLower) ||
      // Search in translated name
      translated.name.toLowerCase().includes(searchLower) ||
      // Search in spirit (using translated label)
      getSpiritLabel(locale, cocktail.baseSpirit).toLowerCase().includes(searchLower) ||
      cocktail.baseSpirit.toLowerCase().includes(searchLower) ||
      // Search in tags
      cocktail.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      // Search in ingredients (both original and translated)
      cocktail.ingredients.some(i => i.name.toLowerCase().includes(searchLower)) ||
      translated.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
      );
    });
  }, [cocktails, query, locale]);

  const handleSelect = (cocktail: Cocktail) => {
    onCocktailClick(cocktail);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                placeholder={t('searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
              />
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {query && (
              <div className={styles.results}>
                {filteredCocktails.length > 0 ? (
                  <>
                    <div className={styles.resultHeader}>
                      <span>{t('cocktailsFound', { n: filteredCocktails.length })}</span>
                    </div>
                    <ul className={styles.resultList}>
                      {filteredCocktails.map((cocktail) => {
                        const translated = getTranslatedCocktail(cocktail, locale);
                        return (
                          <motion.li
                            key={cocktail.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              className={styles.resultItem}
                              onClick={() => handleSelect(cocktail)}
                            >
                              <img src={translated.image} alt={translated.name} />
                              <div className={styles.resultInfo}>
                                <span className={styles.resultName}>{translated.name}</span>
                                <span className={styles.resultMeta}>
                                  {getSpiritLabel(locale, cocktail.baseSpirit)} • {cocktail.tags[0]}
                                </span>
                              </div>
                            </button>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <p>{t('noCocktailsFor', { q: query })}</p>
                    <span>{t('tryDifferentSearch')}</span>
                  </div>
                )}
              </div>
            )}

            {!query && (
              <div className={styles.suggestions}>
                <p>{t('popularSearches')}</p>
                <div className={styles.suggestionTags}>
                  {['Mojito', 'Whiskey', 'Tropical', 'Classic', 'Vodka'].map(tag => (
                    <button
                      key={tag}
                      className={styles.suggestionTag}
                      onClick={() => setQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
