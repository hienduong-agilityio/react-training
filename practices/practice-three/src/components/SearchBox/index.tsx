// Components
import InputField from '@/components/common/InputField';
import ProjectFilterDropdown from '@/components/ProjectFilterDropdown';

// SVG
import iconSearch from '@public/images/searchIcon.svg';

// Types
import type { IInputProps } from '@/components/common/InputField';

// Constants
import { SEARCH_OPTION } from '@/constants/filerSearchOption';

// Hooks
import { useProjectContext } from '@/stores/ProjectProvider';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

export interface ISearchBox extends IInputProps {
  // onChange event handler for the input field
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * SearchBox component
 *
 * @returns {JSX.Element} - SearchBox element.
 */
const SearchBox = ({ disabled }: ISearchBox): JSX.Element => {
  const { dispatch } = useProjectContext();

  // Handle input change and dispatch the input value to the context
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = event.target.value;

    dispatch({
      // TODO: Continue search by other criteria
      type: DISPATCH_ACTION.SEARCH_PROJECT_BY_FIELD,
      inputValue: searchValue,
      selectField: 'projectName'
    });
  };

  return (
    <div className='flex h-auto'>
      <ProjectFilterDropdown options={SEARCH_OPTION} onChange={() => {}} />
      <div className='relative'>
        <img src={iconSearch} alt='Search' className='pl-4 p-2 absolute' />
        <InputField
          placeholder='Search'
          disabled={disabled}
          onChange={handleInputChange}
          customClasses='h-full w-full pl-9 rounded-none rounded-e-lg'
        />
      </div>
    </div>
  );
};

export default SearchBox;
