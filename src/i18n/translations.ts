import type { BaseSpirit, Strength, CocktailType } from '../types';

export type Locale = 'en' | 'fr';

export const translations = {
  en: {
    // Header
    filter: 'Filter',
    logoAlt: 'Kossivi Bar Academy',

    // Filter sidebar
    filterTitle: 'Filter',
    browseByCategory: 'Browse by Category',
    baseSpirit: 'Base Spirit',
    strength: 'Strength',
    clearAllFilters: 'Clear All Filters',

    // Types
    type_classic: 'Classic',
    type_tropical: 'Tropical',
    type_martini: 'Martini',
    type_longdrink: 'Longdrink',
    type_short: 'Short',
    type_sparkling: 'Sparkling',
    type_frozen: 'Frozen',
    type_healthy: 'Healthy Drinks',

    // Strengths
    strength_light: 'Light',
    strength_medium: 'Medium',
    strength_strong: 'Strong',
    strength_extremeStrong: 'Extreme Strong',

    // Spirits (same as value for EN, can override for FR)
    spirit_vodka: 'Vodka',
    spirit_rum: 'Rum',
    spirit_gin: 'Gin',
    spirit_tequila: 'Tequila',
    spirit_whiskey: 'Whiskey',
    spirit_brandy: 'Brandy',
    spirit_wine: 'Wine',
    spirit_champagne: 'Champagne',
    spirit_liqueur: 'Liqueur',
    spirit_beer: 'Beer',
    spirit_cachaca: 'Cachaça',

    // Grid
    cocktails: 'Cocktails',
    popular: 'Popular',
    filteredResults: 'Filtered Results',

    // Search
    searchPlaceholder: 'Search cocktails, ingredients, spirits...',
    cocktailsFound: (n: number) => `${n} cocktails found`,
    noCocktailsFor: (q: string) => `No cocktails found for "${q}"`,
    tryDifferentSearch: 'Try searching for a different cocktail, ingredient, or spirit',
    popularSearches: 'Popular searches',

    // Cocktail modal
    ingredients: 'Ingredients',
    garnish: 'Garnish',
    preparation: 'Preparation',

    // Footer
    footerBy: 'Application by Kossivi Professional Bar Academy',
    footerCopyright: '© 2026 Kossivi. All rights reserved.',

    // Page title
    pageTitle: 'Kossivi - Cocktail Encyclopedia',
  },
  fr: {
    filter: 'Filtre',
    logoAlt: 'Kossivi Bar Academy',

    filterTitle: 'Filtre',
    browseByCategory: 'Parcourir par catégorie',
    baseSpirit: 'Spiritueux de base',
    strength: 'Degré d\'alcool',
    clearAllFilters: 'Effacer tous les filtres',

    type_classic: 'Classique',
    type_tropical: 'Tropical',
    type_martini: 'Martini',
    type_longdrink: 'Long drink',
    type_short: 'Court',
    type_sparkling: 'Pétillant',
    type_frozen: 'Congelé',
    type_healthy: 'Healthy Drinks',

    strength_light: 'Léger',
    strength_medium: 'Moyen',
    strength_strong: 'Fort',
    strength_extremeStrong: 'Très fort',

    spirit_vodka: 'Vodka',
    spirit_rum: 'Rhum',
    spirit_gin: 'Gin',
    spirit_tequila: 'Tequila',
    spirit_whiskey: 'Whisky',
    spirit_brandy: 'Brandy',
    spirit_wine: 'Vin',
    spirit_champagne: 'Champagne',
    spirit_liqueur: 'Liqueur',
    spirit_beer: 'Bière',
    spirit_cachaca: 'Cachaça',

    cocktails: 'Cocktails',
    popular: 'Populaire',
    filteredResults: 'Résultats filtrés',

    searchPlaceholder: 'Rechercher cocktails, ingrédients, spiritueux...',
    cocktailsFound: (n: number) => `${n} cocktail${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}`,
    noCocktailsFor: (q: string) => `Aucun cocktail trouvé pour « ${q} »`,
    tryDifferentSearch: 'Essayez un autre cocktail, ingrédient ou spiritueux',
    popularSearches: 'Recherches populaires',

    ingredients: 'Ingrédients',
    garnish: 'Décoration',
    preparation: 'Préparation',

    footerBy: 'Application par Kossivi Professional Bar Academy',
    footerCopyright: '© 2026 Kossivi. Tous droits réservés.',

    pageTitle: 'Kossivi - Encyclopédie des cocktails',
  },
} as const;

const spiritKeys: Record<BaseSpirit, keyof typeof translations.en> = {
  vodka: 'spirit_vodka',
  rum: 'spirit_rum',
  gin: 'spirit_gin',
  tequila: 'spirit_tequila',
  whiskey: 'spirit_whiskey',
  brandy: 'spirit_brandy',
  wine: 'spirit_wine',
  champagne: 'spirit_champagne',
  liqueur: 'spirit_liqueur',
  beer: 'spirit_beer',
  cachaca: 'spirit_cachaca',
};

const typeKeys: Record<CocktailType, keyof typeof translations.en> = {
  classic: 'type_classic',
  tropical: 'type_tropical',
  martini: 'type_martini',
  longdrink: 'type_longdrink',
  short: 'type_short',
  sparkling: 'type_sparkling',
  frozen: 'type_frozen',
  healthy: 'type_healthy',
};

const strengthKeys: Record<Strength, keyof typeof translations.en> = {
  'light': 'strength_light',
  'medium': 'strength_medium',
  'strong': 'strength_strong',
  'extreme-strong': 'strength_extremeStrong',
};

export function getSpiritLabel(locale: Locale, spirit: BaseSpirit): string {
  const key = spiritKeys[spirit];
  return key ? translations[locale][key] as string : spirit;
}

export function getTypeLabel(locale: Locale, type: CocktailType): string {
  const key = typeKeys[type];
  return key ? translations[locale][key] as string : type;
}

export function getStrengthLabel(locale: Locale, strength: Strength): string {
  const key = strengthKeys[strength];
  return key ? translations[locale][key] as string : strength;
}
