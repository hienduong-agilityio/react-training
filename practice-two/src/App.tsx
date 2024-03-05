// Components
import SearchBar from '@components/layouts/SearchBar';
import Pokedex from '@components/layouts/Pokedex';

// Logo
import logo from '@assets/images/Pokedex-logo.svg';

// Styles
import './index.css';
import { useEffect } from 'react';
import { usePokemonContext } from '@stores/PokemonProvider';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  const { searchTerm, dispatch } = usePokemonContext();

  const generateUrl = (searchTerm: string): string => {
    const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';
    const url = new URL(baseURL);

    if (searchTerm) {
      url.searchParams.append('name', searchTerm);
    }

    return url.toString();
  };

  const urlWithSearchParams = generateUrl(searchTerm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlWithSearchParams);
        if (!response.ok) {
          throw new Error('Error encountered while fetching');
        } else {
          const data = await response.json();
          dispatch({ type: 'FETCH_API_SUCCESS', payload: data });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_API_ERROR', payload: (error as Error).message });
      }
    };

    fetchData();
  }, [dispatch, urlWithSearchParams]);

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
