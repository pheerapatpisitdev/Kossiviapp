import { motion } from 'framer-motion';
import { Cocktail } from '../types';
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
  const preloadImage = () => {
    const img = new Image();
    img.src = cocktail.image;
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
          src={cocktail.image}
          alt={cocktail.name}
          loading="lazy"
        />
        <div
          className={styles.colorAccent}
          style={{ backgroundColor: cocktail.color }}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{cocktail.name}</h3>
        <div className={styles.tags}>
          {cocktail.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
