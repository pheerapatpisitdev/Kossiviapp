import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CocktailGrid } from './components/CocktailGrid';
import { CocktailModal } from './components/CocktailModal';
import { FilterSidebar } from './components/FilterSidebar';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { DailyRecommendations } from './components/DailyRecommendations';
import { cocktails } from './data/cocktails';
import { Cocktail, BaseSpirit, Strength, CocktailType } from './types';
import { useLanguage } from './context/LanguageContext';
import { getSpiritLabel, getTypeLabel, getStrengthLabel } from './i18n/translations';

function App() {
  const { locale, t } = useLanguage();
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter states
  const [selectedSpirit, setSelectedSpirit] = useState<BaseSpirit | null>(null);
  const [selectedStrength, setSelectedStrength] = useState<Strength | null>(null);
  const [selectedType, setSelectedType] = useState<CocktailType | null>(null);

  const filteredCocktails = useMemo(() => {
    return cocktails.filter(cocktail => {
      if (selectedSpirit && cocktail.baseSpirit !== selectedSpirit) return false;
      if (selectedStrength && cocktail.strength !== selectedStrength) return false;
      if (selectedType) {
        // Special handling for some categories
        if (selectedType === 'classic') {
          // Classic: filter by tag instead of type
          if (!cocktail.tags.includes('Classic')) return false;
        } else if (selectedType === 'healthy') {
          // Healthy: show all explicitly healthy/non-alcoholic cocktails
          if (!cocktail.tags.includes('Non-alcoholic')) return false;
        } else if (cocktail.type !== selectedType) {
          return false;
        }
      }
      return true;
    });
  }, [selectedSpirit, selectedStrength, selectedType]);

  const hasActiveFilters = selectedSpirit || selectedStrength || selectedType;

  const clearFilters = () => {
    setSelectedSpirit(null);
    setSelectedStrength(null);
    setSelectedType(null);
  };

  const getTitle = () => {
    if (selectedSpirit) return `${getSpiritLabel(locale, selectedSpirit)} ${t('cocktails')}`;
    if (selectedType) return `${getTypeLabel(locale, selectedType)} ${t('cocktails')}`;
    if (selectedStrength) return `${getStrengthLabel(locale, selectedStrength)} ${t('cocktails')}`;
    return t('cocktails');
  };

  return (
    <div className="app">
      <Header
        onFilterClick={() => setIsFilterOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <main>
        <DailyRecommendations
          cocktails={cocktails}
          onCocktailClick={setSelectedCocktail}
        />

        <CocktailGrid
          cocktails={filteredCocktails}
          title={getTitle()}
          subtitle={hasActiveFilters ? t('filteredResults') : t('popular')}
          onCocktailClick={setSelectedCocktail}
        />
      </main>

      <CocktailModal
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
      />

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedSpirit={selectedSpirit}
        selectedStrength={selectedStrength}
        selectedType={selectedType}
        onSpiritChange={setSelectedSpirit}
        onStrengthChange={setSelectedStrength}
        onTypeChange={setSelectedType}
        onClear={clearFilters}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        cocktails={cocktails}
        onCocktailClick={setSelectedCocktail}
      />

      <Footer />
    </div>
  );
}

export default App;
