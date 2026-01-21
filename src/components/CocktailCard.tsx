import { motion } from 'framer-motion';
import { Cocktail } from '../types';
import styles from './CocktailCard.module.css';

interface CocktailCardProps {
  cocktail: Cocktail;
  onClick: () => void;
  index: number;
}

export function CocktailCard({ cocktail, onClick, index }: CocktailCardProps) {
  return (
    <motion.article
      className={styles.card}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8 }}
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
