import { motion } from 'framer-motion';
import { Cocktail } from '../types';
import { CocktailCard } from './CocktailCard';
import styles from './CocktailGrid.module.css';

interface CocktailGridProps {
  cocktails: Cocktail[];
  title: string;
  subtitle?: string;
  onCocktailClick: (cocktail: Cocktail) => void;
}

export function CocktailGrid({ cocktails, title, subtitle, onCocktailClick }: CocktailGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.divider} />
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {cocktails.map((cocktail, index) => (
            <CocktailCard
              key={cocktail.id}
              cocktail={cocktail}
              onClick={() => onCocktailClick(cocktail)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
