import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cocktail } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedCocktail } from '../i18n/cocktailTranslations';
import styles from './CocktailCard.module.css';

interface CocktailCardProps {
  cocktail: Cocktail;
  onClick: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function CocktailCard({ cocktail, onClick }: CocktailCardProps) {
  const { locale } = useLanguage();
  
  const translatedCocktail = useMemo(() => {
    return getTranslatedCocktail(cocktail, locale);
  }, [cocktail, locale]);

  const preloadImage = () => {
    const img = new Image();
    img.src = translatedCocktail.image;
  };

  return (
    <motion.article
      className={styles.card}
      onClick={onClick}
      onMouseEnter={preloadImage}
      onFocus={preloadImage}
      onTouchStart={preloadImage}
      variants={itemVariants}
      whileHover={{ y: -8 }}
      layout
    >
      <div className={styles.imageWrapper}>
        <img
          src={translatedCocktail.image}
          alt={translatedCocktail.name}
          loading="lazy"
        />
        <div
          className={styles.colorAccent}
          style={{ backgroundColor: translatedCocktail.color }}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{translatedCocktail.name}</h3>
        <div className={styles.tags}>
          {translatedCocktail.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
