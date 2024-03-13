// Components
import SearchBar from '@components/layouts/SearchBar';
import Pokedex from '@components/layouts/Pokedex';

// Logo
import logo from '@assets/images/Pokedex-logo.svg';

// Styles
import './index.css';

// Store
import { usePokemonContext } from '@stores/PokemonProvider';

// Hooks
import usePokemonData from '@hooks/usePokemonData';
import { useEffect } from 'react';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  const { dispatch } = usePokemonContext();
  const { data, error } = usePokemonData();

  useEffect(() => {
    dispatch({
      type: 'FETCH_POKEMON_REQUEST'
    });

    if (data) {
      dispatch({ type: 'FETCH_POKEMON_SUCCESS', payload: data });
    }
    if (error) {
      dispatch({ type: 'FETCH_POKEMON_ERROR', payload: error });
    }
  }, [data, error, dispatch]);

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
