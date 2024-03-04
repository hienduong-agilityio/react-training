// SVG
import iconFilter from '@assets/images/octicon_filter-16.svg';
import closeIconFilter from '@assets/images/vector_filter.svg';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import Typography, { TEXT_SIZE } from '@components/common/Typography';
import SideBar from '@components/SlideBar';

// Hook
import { useState } from 'react';

// Constant
import POKEMON_TYPES from '../../constants/pokemonTypes';

const SearchFilter = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="pt-10 flex justify-end">
      <div className="relative">
        <img src={iconFilter} alt="icon-filter" className="pl-4 p-2 top-1 left-0 absolute" />
        <Button onClick={handleClick} customClasses="border-4 border-gray-500 rounded-3xl w-25 pl-10" variant="outline">
          Filter
        </Button>
      </div>
      <SideBar isOpen={isSidebarOpen} onCloseSideBar={handleClick}>
        {/* Title */}
        <div className="flex items-center gap-4 justify-between border-b-2 p-6">
          <Typography size={TEXT_SIZE.MEDIUM}>Filter</Typography>
          <Button onClick={handleClick} variant="filled">
            <img src={closeIconFilter} alt="Icon closes filter" />
          </Button>
        </div>

        {/* Filter */}
        <form className="flex flex-col h-full">
          <div className="h-full">
            <div className="flex flex-col justify-between overflow-hidden p-6 pb-10 ">
              <Typography customClasses="text-gray-500">Type</Typography>

              <ul className="grid grid-cols-2 py-4">
                {POKEMON_TYPES.map((pokemonType) => (
                  <li className="flex gap-3" key={pokemonType.type}>
                    <InputField type="checkbox" id={pokemonType.type} defaultChecked={pokemonType.checked} />
                    <label htmlFor={pokemonType.type}>{pokemonType.type}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Button */}
          <div className="flex gap-5 p-6">
            <Button variant="outline" customClasses="rounded-xl w-1/2 justify-center font-semibold ">
              Reset filters
            </Button>
            <Button
              type={'submit'}
              variant="text"
              customClasses="rounded-2xl w-1/2 justify-center font-semibold bg-gray-200"
            >
              Apply filters
            </Button>
          </div>
        </form>
      </SideBar>
    </section>
  );
};

export default SearchFilter;
