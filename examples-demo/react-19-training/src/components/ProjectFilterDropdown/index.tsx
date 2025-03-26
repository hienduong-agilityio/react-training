// Libraries
import { JSX, memo } from 'react';

export interface IProjectFilterDropdownProps {
  // searchField: The field used for searching
  searchField: string;
  // options: Array of option objects to display in the dropdown menu.
  options: { label: string; value: string }[];
  // onChange: Callback function to be called when an option is selected.
  onChange: (event: string) => void;
}

/**
 * ProjectFilterDropdown component using native select and option list
 *
 * @returns {JSX.Element} - ProjectFilterDropdown element
 */
const ProjectFilterDropdown = ({
  options = [],
  searchField = '',
  onChange = () => {}
}: IProjectFilterDropdownProps): JSX.Element => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    onChange(selectedValue);
  };

  return (
    <div className='relative inline-block text-left'>
      <select
        role='combobox'
        value={searchField}
        onChange={handleSelectChange}
        className='inline-flex items-center py-0 h-[33px] text-sm font-medium text-center border-0 rounded-none rounded-s-lg bg-white hover:border-none focus:ring-4 focus:outline-none focus:ring-primary-100 text-gray-700 shadow'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(ProjectFilterDropdown);
