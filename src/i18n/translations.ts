import type { BaseSpirit, Strength, CocktailType } from '../types';

export type Locale = 'en' | 'th';

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

    // Strengths
    strength_light: 'Light',
    strength_medium: 'Medium',
    strength_strong: 'Strong',
    strength_extremeStrong: 'Extreme Strong',

    // Spirits (same as value for EN, can override for TH)
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
  th: {
    filter: 'ตัวกรอง',
    logoAlt: 'Kossivi Bar Academy',

    filterTitle: 'ตัวกรอง',
    browseByCategory: 'เลือกตามหมวดหมู่',
    baseSpirit: 'เหล้าฐาน',
    strength: 'ความแรง',
    clearAllFilters: 'ล้างตัวกรองทั้งหมด',

    type_classic: 'คลาสสิก',
    type_tropical: 'ทรอปิคอล',
    type_martini: 'มาร์ตินี',
    type_longdrink: 'ลองดริ้งค์',
    type_short: 'ชอร์ต',
    type_sparkling: 'มีฟองซ่า',
    type_frozen: 'โฟรสเซน',

    strength_light: 'อ่อน',
    strength_medium: 'ปานกลาง',
    strength_strong: 'แรง',
    strength_extremeStrong: 'แรงมาก',

    spirit_vodka: 'วอดก้า',
    spirit_rum: 'รัม',
    spirit_gin: 'จิน',
    spirit_tequila: 'เทกิลา',
    spirit_whiskey: 'วิสกี้',
    spirit_brandy: 'แบรนดี',
    spirit_wine: 'ไวน์',
    spirit_champagne: 'แชมเปญ',
    spirit_liqueur: 'ลิเคอร์',
    spirit_beer: 'เบียร์',
    spirit_cachaca: 'คาชาซา',

    cocktails: 'ค็อกเทล',
    popular: 'ยอดนิยม',
    filteredResults: 'ผลการกรอง',

    searchPlaceholder: 'ค้นหาค็อกเทล ส่วนผสม เหล้า...',
    cocktailsFound: (n: number) => `พบ ${n} รายการ`,
    noCocktailsFor: (q: string) => `ไม่พบค็อกเทลสำหรับ "${q}"`,
    tryDifferentSearch: 'ลองค้นหาค็อกเทล ส่วนผสม หรือเหล้าอื่น',
    popularSearches: 'คำค้นหายอดนิยม',

    ingredients: 'ส่วนผสม',
    garnish: 'ของตกแต่ง',
    preparation: 'วิธีทำ',

    footerBy: 'แอปโดย Kossivi Professional Bar Academy',
    footerCopyright: '© 2026 Kossivi สงวนลิขสิทธิ์',

    pageTitle: 'Kossivi - สารานุกรมค็อกเทล',
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
