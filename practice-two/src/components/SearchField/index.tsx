// SVG
import iconSearch from '@assets/images/mingcute_search-line.svg';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

// Types && Hook
import { RefObject, useRef } from 'react';
import { usePokemonDispatch } from '@stores/PokemonProvider';

/**
 * Component for a search field to search for Pokémon
 * @param onSearch - Function triggered when search is performed
 *
 * @returns {JSX.Element} - JSX element representing the search field
 */

const SearchField = (): JSX.Element => {
  const { handleSearch } = usePokemonDispatch();

  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  // Function to handle button submit to get input value
  const handleBtnClick = () => {
    if (inputRef.current) {
      handleSearch(inputRef.current.value);
    }
  };

  return (
    <section className="relative h-14 ">
      <img src={iconSearch} alt="search-icon" className="pl-4 p-2 top-2 left-0 absolute" />
      <div className="right-5 top-2 absolute text-center w-32">
        <Button
          variant="text"
          color="secondary"
          customClasses="border-none rounded-xl capitalize w-full font-bold text-primary flex-col "
          size="medium"
          onClick={handleBtnClick}
        >
          search
        </Button>
      </div>
      <InputField
        inputRef={inputRef}
        placeholder="Pokemon name, number or type"
        customClasses="text-primary font-bold placeholder-primary h-full w-full pl-12 border-white focus:border-primary focus:outline-none rounded-2xl shadow-2xl "
      />
    </section>
  );
};

export default SearchField;
