// SVG
import iconFilter from '@assets/images/octicon_filter-16.svg';
import SideBar from '@components/SlideBar';

// Components
import Button from '@components/common/Button';
import Typography from '@components/common/Typography';
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
        <div className="text-center ">
          <div className="flex gap-4 justify-between">
            <Typography>Filter</Typography>
            <Button onClick={handleClick} variant="filled" color="danger">
              X
            </Button>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex h-full w-full flex-col justify-between overflow-hidden p-1 pb-10">
            <ul className="flex-grow overflow-auto py-4"></ul>
            <div className="flex justify-between">
              <Button
                variant="filled"
                customClasses="inline-block bg-secondary hover:bg-blue-800 focus:bg-blue-800 py-2 px-4 rounded-3xl text-lg text-white font-semibold flex justify-center"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="filled"
                customClasses="inline-block bg-secondary hover:bg-blue-800 focus:bg-blue-800 py-2 px-4 rounded-3xl text-lg text-white font-semibold flex justify-center"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </SideBar>
    </section>
  );
};

export default SearchFilter;
