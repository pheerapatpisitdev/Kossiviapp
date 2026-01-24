import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Cocktail } from '../types';
import { lockBodyScroll, unlockBodyScroll } from '../lib/bodyScrollLock';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cocktails: Cocktail[];
  onCocktailClick: (cocktail: Cocktail) => void;
}

export function SearchModal({ isOpen, onClose, cocktails, onCocktailClick }: SearchModalProps) {
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

  const filteredCocktails = cocktails.filter(cocktail => {
    const searchLower = query.toLowerCase();
    return (
      cocktail.name.toLowerCase().includes(searchLower) ||
      cocktail.baseSpirit.toLowerCase().includes(searchLower) ||
      cocktail.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      cocktail.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
    );
  });

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
                placeholder="Search cocktails, ingredients, spirits..."
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
                      <span>{filteredCocktails.length} cocktails found</span>
                    </div>
                    <ul className={styles.resultList}>
                      {filteredCocktails.map((cocktail) => (
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
                            <img src={cocktail.image} alt={cocktail.name} />
                            <div className={styles.resultInfo}>
                              <span className={styles.resultName}>{cocktail.name}</span>
                              <span className={styles.resultMeta}>
                                {cocktail.baseSpirit} • {cocktail.tags[0]}
                              </span>
                            </div>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <p>No cocktails found for "{query}"</p>
                    <span>Try searching for a different cocktail, ingredient, or spirit</span>
                  </div>
                )}
              </div>
            )}

            {!query && (
              <div className={styles.suggestions}>
                <p>Popular searches</p>
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
