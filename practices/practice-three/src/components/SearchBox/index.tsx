// Components
import InputField from '@/components/common/InputField';
import Dropdown from '@/components/common/Dropdown';

// SVG
import iconSearch from '@/assets/images/search-line.svg';

// Types
import type { IInputProps } from '@/components/common/InputField';

// Constants
import { SEARCH_OPTION } from '@/constants/filerSearchOption';

export interface ISearchBox extends IInputProps {
  // onChange event handler for the input field
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * SearchBox component
 *
 * @returns {JSX.Element} - SearchBox element.
 */
const SearchBox = ({ disabled, onChange }: ISearchBox): JSX.Element => {
  return (
    <div className='flex h-auto'>
      <Dropdown options={SEARCH_OPTION} onChange={() => {}} />
      <div className='relative'>
        <img src={iconSearch} alt='Search' className='pl-4 p-2 absolute' />
        <InputField
          placeholder='Search'
          disabled={disabled}
          onChange={onChange}
          customClasses='h-full w-full pl-9 rounded-none rounded-e-lg'
        />
      </div>
    </div>
  );
};

export default SearchBox;
