// Components
import SearchBar from './components/layouts/SearchBar';

// Logo
import logo from './assets/images/Pokedex-logo.svg';

// Styles
import './index.css';
import Pokedex from '@components/layouts/Pokedex';

const containerClasses: string = 'p-5 pt-10 m-auto w-full max-w-screen-xl';

const App = () => {
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
