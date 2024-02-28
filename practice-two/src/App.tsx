// Components
import SearchBar from './components/layouts/SearchBar';
import Pokedex from '@components/layouts/Pokedex';

// Logo
import logo from './assets/images/Pokedex-logo.svg';

// Styles
import './index.css';

// Context
import { usePokemonContext } from './context/PokemonProvider';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
  const { filteredData, loading, error, handleSearch } = usePokemonContext();

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
