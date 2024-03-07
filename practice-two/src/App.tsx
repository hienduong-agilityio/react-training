// Components
import SearchBar from '@components/layouts/SearchBar';
import Pokedex from '@components/layouts/Pokedex';

// Logo
import logo from '@assets/images/Pokedex-logo.svg';

// Styles
import './index.css';

// Store
import usePokemonData from '@hooks/fetchData';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  usePokemonData();

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
