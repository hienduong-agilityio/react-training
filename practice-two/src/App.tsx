// Components
import SearchBar from '@components/layouts/SearchBar';
import Pokedex from '@components/layouts/Pokedex';

// Logo
import logo from '@assets/images/Pokedex-logo.svg';

// Styles
import './index.css';

// Hook
import { useEffect } from 'react';

// Store
import { usePokemonContext } from '@stores/PokemonProvider';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  const { dispatch } = usePokemonContext();

  useEffect(() => {
    dispatch({
      type: 'FETCH_API_REQUEST',
      url: 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon'
    });
  }, [dispatch]);

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
