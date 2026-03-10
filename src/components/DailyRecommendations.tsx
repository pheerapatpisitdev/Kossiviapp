import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cocktail } from '../types';
import { useLanguage } from '../context/LanguageContext';
import styles from './DailyRecommendations.module.css';

interface DailyRecommendationsProps {
  cocktails: Cocktail[];
  onCocktailClick: (cocktail: Cocktail) => void;
}

export function DailyRecommendations({
  cocktails,
  onCocktailClick,
}: DailyRecommendationsProps) {
  const { t } = useLanguage();

  const recommended = useMemo(() => {
    const MAX_PER_DAY = 5;
    if (cocktails.length <= MAX_PER_DAY) return cocktails;

    const used = new Set<number>();
    while (used.size < MAX_PER_DAY) {
      used.add(Math.floor(Math.random() * cocktails.length));
    }

    return Array.from(used).map((index) => cocktails[index]);
  }, [cocktails]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (recommended.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % recommended.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [recommended.length]);

  if (!recommended.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{t('dailyRecommendationsSubtitle')}</span>
          <h2 className={styles.title}>{t('dailyRecommendationsTitle')}</h2>
        </div>

        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={recommended[activeIndex].id}
              className={styles.slide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
            >
              <button
                type="button"
                className={styles.card}
                onClick={() => onCocktailClick(recommended[activeIndex])}
              >
                <div
                  className={styles.accent}
                  style={{ backgroundColor: recommended[activeIndex].color }}
                />

                <div className={styles.imageWrapper}>
                  <img
                    src={recommended[activeIndex].image}
                    alt={recommended[activeIndex].name}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.name}>{recommended[activeIndex].name}</h3>
                    <p className={styles.description}>
                      {recommended[activeIndex].description}
                    </p>
                  </div>

                  <div className={styles.meta}>
                    <span className={styles.pill}>
                      {recommended[activeIndex].baseSpirit.toUpperCase()}
                    </span>
                    <span className={styles.pill}>
                      {recommended[activeIndex].strength}
                    </span>
                    <span className={styles.pill}>
                      {recommended[activeIndex].type}
                    </span>
                  </div>

                  <div className={styles.recipe}>
                    <div className={styles.recipeColumn}>
                      <h4>{t('ingredients')}</h4>
                      <ul>
                        {recommended[activeIndex].ingredients.slice(0, 3).map((ing) => (
                          <li key={ing.name}>
                            <span>{ing.name}</span>
                            <span className={styles.amount}>{ing.amount}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.recipeColumn}>
                      <h4>{t('preparation')}</h4>
                      <ol>
                        {recommended[activeIndex].preparation.slice(0, 2).map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          </AnimatePresence>

          {recommended.length > 1 && (
            <div className={styles.dots}>
              {recommended.map((cocktail, index) => (
                <button
                  key={cocktail.id}
                  type="button"
                  className={
                    index === activeIndex ? styles.dotActive : styles.dot
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${index + 1} / ${recommended.length}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

