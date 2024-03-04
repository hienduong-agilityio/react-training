// Components
import SearchBar from '@components/layouts/SearchBar';
import Pokedex from '@components/layouts/Pokedex';

// Logo
import logo from '@assets/images/Pokedex-logo.svg';

// Styles
import './index.css';

// Hook
import { useMemo } from 'react';

// Stores
import { usePokemonContext } from '@stores/PokemonProvider';

// Types
import usePokemonData, { IPokemonDataState } from '@hooks/usePokemonData';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  const { filterTerm, searchTerm, dispatch } = usePokemonContext();

  // Base url API
  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';

  // Construct URL with search parameters
  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    // Append search term to the URL
    if (searchTerm) {
      url.searchParams.append('name', searchTerm);
    }

    // Append filter terms to the URL
    if (filterTerm.length > 0) {
      filterTerm.forEach((term: string) => {
        url.searchParams.append('type', term);
      });
    }

    return url.toString();
  }, [searchTerm, filterTerm]);

  // Fetch Pokemon data using custom hook
  const { data, loading, error }: IPokemonDataState = usePokemonData(urlWithSearchParams);

  dispatch({
    type: 'getData',
    data: data,
    loading: loading,
    error: error,
    inputValue: '',
    checkedValue: []
  });

  return (
    <>
      <header className={containerClasses}>
        <img src={logo} alt="pokedex-logo" />
      </header>
      <main className={`${containerClasses} pt-5`}>
        <SearchBar />
        <Pokedex />
      </main>
    </>
  );
};

export default App;
