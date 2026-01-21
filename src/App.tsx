import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CocktailGrid } from './components/CocktailGrid';
import { CocktailModal } from './components/CocktailModal';
import { FilterSidebar } from './components/FilterSidebar';
import { SearchModal } from './components/SearchModal';
import { cocktails } from './data/cocktails';
import { Cocktail, BaseSpirit, Strength, CocktailType } from './types';

function App() {
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
      if (selectedType && cocktail.type !== selectedType) return false;
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
    if (selectedSpirit) {
      return `${selectedSpirit.charAt(0).toUpperCase() + selectedSpirit.slice(1)} Cocktails`;
    }
    if (selectedType) {
      return `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Cocktails`;
    }
    if (selectedStrength) {
      const labels: Record<Strength, string> = {
        'light': 'Light',
        'medium': 'Medium',
        'strong': 'Strong',
        'extreme-strong': 'Extreme Strong',
      };
      return `${labels[selectedStrength]} Cocktails`;
    }
    return 'Cocktails';
  };

  return (
    <div className="app">
      <Header 
        onFilterClick={() => setIsFilterOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      
      <main>
        <CocktailGrid
          cocktails={filteredCocktails}
          title={getTitle()}
          subtitle={hasActiveFilters ? 'Filtered Results' : 'Popular'}
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
    </div>
  );
}

export default App;
