// Components
import { InputField } from '@/components';

// Svg
import iconSearch from '@public/images/searchIcon.svg';

interface SearchBoxProps {
  name: string;
  defaultValue?: string;
}

const SearchBox = ({ name, defaultValue = '' }: SearchBoxProps): JSX.Element => {
  return (
    <div className='relative'>
      <img src={iconSearch} alt='Search' className='pl-4 p-2 absolute' />
      <InputField
        id='searchInput'
        name={name}
        type='search'
        defaultValue={defaultValue}
        placeholder='Search'
        customClasses='h-full w-full pl-9 rounded-none rounded-e-lg'
      />
    </div>
  );
};

export default SearchBox;
