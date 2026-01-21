export interface Cocktail {
  id: string;
  name: string;
  image: string;
  baseSpirit: BaseSpirit;
  tags: string[];
  strength: Strength;
  type: CocktailType;
  color: string;
  description: string;
  ingredients: Ingredient[];
  preparation: string[];
  garnish?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  image: string;
  cocktails: string[];
}

export type BaseSpirit = 
  | 'vodka' 
  | 'rum' 
  | 'gin' 
  | 'tequila' 
  | 'whiskey' 
  | 'brandy' 
  | 'wine' 
  | 'champagne' 
  | 'liqueur' 
  | 'beer'
  | 'cachaca';

export type Strength = 'light' | 'medium' | 'strong' | 'extreme-strong';

export type CocktailType = 
  | 'classic' 
  | 'tropical' 
  | 'martini' 
  | 'longdrink' 
  | 'short' 
  | 'sparkling' 
  | 'frozen';

export interface FilterState {
  baseSpirit: BaseSpirit | null;
  strength: Strength | null;
  type: CocktailType | null;
  search: string;
}
