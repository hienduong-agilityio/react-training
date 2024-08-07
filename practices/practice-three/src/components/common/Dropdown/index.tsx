// Libraries
import { useState, useRef, ReactNode } from 'react';

// Hooks
import useClickOutside from '@/hooks/useClickOutside';

// SVG
import arrowDown from '@/assets/images/arrowDown.svg';

export interface IDropdownProps {
  // options: Array of option strings to display in the dropdown menu.
  options: string[];

  // onChange: Callback function to be called when an option is selected.
  onChange: (selectedOption: string) => void;
}

/**
 * Dropdown component
 *
 * @returns {JSX.Element} - Dropdown element
 */
const Dropdown = ({ options, onChange }: IDropdownProps): JSX.Element => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | ReactNode | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOptionOpen(false));

  const toggleDropdown = () => setIsOptionOpen(!isOptionOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOptionOpen(false);
  };

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='inline-flex items-center py-0 h-[33px] px-3 text-sm font-medium text-center border-0 rounded-none rounded-s-lg bg-white hover:border-none focus:ring-4 focus:outline-none focus:ring-primary-100 text-gray-700 shadow'
      >
        {selectedOption || 'Sort By'}
        <img src={arrowDown} className='w-2 h-2 ms-2.5' alt='arrow down' />
      </button>

      {isOptionOpen && (
        <div className='absolute z-10 mt-2 bg-white border w-max border-gray-300 rounded-md shadow-lg'>
          {options.map((option) => (
            <div onClick={() => handleOptionClick(option)} className='cursor-pointer px-4 py-2 hover:bg-gray-200'>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
