// SVG
import iconFilter from '@assets/images/octicon_filter-16.svg';
import closeIconFilter from '@assets/images/vector_filter.svg';

// Components
import Button from '@components/common/Button';
import Typography, { TEXT_SIZE } from '@components/common/Typography';
import SideBar from '@components/SlideBar';

// Hook
import { useState } from 'react';

const SearchFilter = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
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
        <div className="w-full h-full">
          <div className="flex h-full w-full flex-col justify-between overflow-hidden p-1 pb-10">
            <ul className="flex-grow overflow-auto py-4"></ul>
          </div>
        </div>

        {/* Button */}
        <div className="flex gap-5 p-6">
          <Button variant="outline" customClasses="rounded-xl w-1/2 justify-center font-semibold ">
            Reset filters
          </Button>
          <Button variant="text" customClasses="rounded-2xl w-1/2 justify-center font-semibold bg-gray-200">
            Apply filters
          </Button>
        </div>
      </SideBar>
    </section>
  );
};

export default SearchFilter;
