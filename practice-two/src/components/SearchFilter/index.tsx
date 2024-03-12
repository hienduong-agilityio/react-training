// SVG
import iconFilter from '@assets/images/octicon_filter-16.svg';
import closeIconFilter from '@assets/images/vector_filter.svg';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import Typography, { TEXT_SIZE } from '@components/common/Typography';
import SideBar from '@components/SlideBar';

// Hook
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

// Types
import { POKEMON_TYPES } from '@constants/index';

// Hook
import { usePokemonContext } from '@stores/PokemonProvider';

const SearchFilter = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { dispatch } = usePokemonContext();

  const formRef = useRef<HTMLFormElement>(null);

  let selectedTypes: string[] = [];

  const handleClickSideBar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    // Stop app reload
    event.preventDefault();

    dispatch({
      type: 'FILTER_TYPE',
      checkedValue: selectedTypes
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    if (event.target.checked) {
      // Add type to the array
      selectedTypes = [...selectedTypes, type];
    } else {
      // Remove type from the array
      selectedTypes = selectedTypes.filter((selectedType) => selectedType !== type);
    }
  };

  const handleResetFilters = () => {
    // Reset the form using the ref
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section className="pt-10">
      <div className="relative">
        <img src={iconFilter} alt="icon-filter" className="pl-4 p-2 top-1 left-0 absolute" />

        <Button
          onClick={handleClickSideBar}
          customClasses="border-4 border-gray-400 rounded-3xl w-25 pl-10"
          variant="outline"
        >
          Filter
        </Button>
      </div>

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onCloseSideBar={handleClickSideBar}>
        {/* Title */}
        <div className="flex items-center gap-4 justify-between border-b-2 p-6">
          <Typography size={TEXT_SIZE.MEDIUM}>Filter</Typography>

          <Button onClick={handleClickSideBar} variant="filled">
            <img src={closeIconFilter} alt="Icon closes filter" />
          </Button>
        </div>

        {/* Filter */}
        <form ref={formRef} className="flex flex-col h-full" onSubmit={formSubmitHandler}>
          <div className="h-full">
            <div className="flex flex-col justify-between overflow-hidden p-6 pb-10">
              <Typography customClasses="text-gray-500">Type</Typography>

              <ul className="grid grid-cols-2 py-4">
                {POKEMON_TYPES.map((pokemonType) => (
                  <li className="flex gap-4" key={pokemonType.type}>
                    <InputField
                      type="checkbox"
                      id={pokemonType.type}
                      onChange={(event) => handleCheckboxChange(event, pokemonType.type)}
                    />
                    <label className="capitalize" htmlFor={pokemonType.type}>
                      {pokemonType.type}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Button */}
          <div className="flex gap-5 p-6 font-bold">
            <Button onClick={handleResetFilters} variant="outline" customClasses="w-1/2">
              Reset filters
            </Button>

            <Button variant="text" customClasses="w-1/2 bg-gray-200">
              Apply filters
            </Button>
          </div>
        </form>
      </SideBar>
    </section>
  );
};

export default SearchFilter;
