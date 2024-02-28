// Components
import SearchBar from './components/layouts/SearchBar';
import Pokedex, { IPokemonData } from '@components/layouts/Pokedex';

// Logo
import logo from './assets/images/Pokedex-logo.svg';

// Styles
import './index.css';

// Hook
import { useEffect, useState } from 'react';
import usePokemonData from '@hooks/usePokemonData/useReducerPokemonData';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  // Management input value state to search
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Management list value to filter search
  const [filteredData, setFilteredData] = useState<IPokemonData[]>([]);

  // FetchAPI
  const URL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';
  const { data, loading, error } = usePokemonData(URL);

  // Update Pokemon filter results by search value or data
  useEffect(() => {
    if (data) {
      const filtered: IPokemonData[] = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  /**
   * Function handle get value to  search
   * @param value - Value string from input search
   */
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <header className={containerClasses}>
        <img src={logo} alt="pokedex-logo" />
      </header>
      <main className={`${containerClasses} pt-5`}>
        <SearchBar onSearch={handleSearch} />
        <Pokedex pokedexData={filteredData} pokedexLoading={loading} pokedexError={error} />
      </main>
    </>
  );
};

export default App;
