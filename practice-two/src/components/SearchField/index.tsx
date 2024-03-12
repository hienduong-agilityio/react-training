// SVG
import iconSearch from '@assets/images/mingcute_search-line.svg';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

// Types && Hook
import { RefObject, useRef } from 'react';
import { usePokemonContext } from '@stores/PokemonProvider';

/**
 * Component for a search field to search for Pokémon
 * @param onSearch - Function triggered when search is performed
 *
 * @returns {JSX.Element} - JSX element representing the search field
 */

const SearchField = (): JSX.Element => {
  // The dispatcher function sends an action to the reducer function
  const { dispatch } = usePokemonContext();

  // Uncontrolled Input on Button click
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  // Function to handle button submit to get input value
  const handleBtnClick = () => {
    if (inputRef.current) {
      const searchTerm = inputRef.current.value;

      // Send inputValue into search action
      dispatch({
        type: 'SEARCH_INPUT',
        inputValue: searchTerm
      });
    }
  };

  return (
    <section className="relative h-14 ">
      <img src={iconSearch} alt="search-icon" className="pl-4 p-2 top-2 left-0 absolute" />
      <div className="right-5 top-2 absolute text-center w-32">
        <Button
          variant="text"
          color="secondary"
          customClasses="border-none capitalize w-full font-bold text-primary flex-col "
          rounded="normal"
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
