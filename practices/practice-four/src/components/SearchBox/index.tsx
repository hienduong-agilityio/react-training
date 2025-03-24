import { memo, forwardRef } from 'react';

// Components
import { InputField } from '@/components';

// SVG
import iconSearch from '@public/images/searchIcon.svg';

// Define the props type for SearchBox
interface SearchBoxProps {
  // value: The value for search box.
  value: string;
}

/**
 * SearchBox component
 *
 * @returns {JSX.Element} - SearchBox element.
 */
const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(({ value }, ref): JSX.Element => {
  return (
    <div className='relative'>
      <img src={iconSearch} alt='Search' className='pl-4 p-2 absolute' />
      <InputField
        id='searchInput'
        defaultValue={value}
        placeholder='Search'
        ref={ref}
        customClasses='h-full w-full pl-9 rounded-none rounded-e-lg'
      />
    </div>
  );
});

export default memo(SearchBox);
