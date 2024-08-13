// Libraries
import { useState, useRef } from 'react';

// Components
import Button from '@/components/common/Button';

// Hooks
import useClickOutside from '@/hooks/useClickOutside';
import { useProjectContext } from '@/stores/ProjectProvider';

// SVG
import addIcon from '/images/menuIcon.svg';

// Contacts
import { DISPATCH_ACTION } from '@/constants/store';

interface IProjectOptionsDropdown {
  // projectID: The ID of the project to be managed
  projectId: string;
  // onOpenEdit: The function to open edit modal
  onOpenEdit: (id: string) => void;
}

/**
 * The custom ProjectOptionsDropdown component
 *
 * @returns {JSX.Element} - The ProjectOptionsDropdown element
 */
const ProjectOptionsDropdown = ({ projectId, onOpenEdit }: IProjectOptionsDropdown): JSX.Element => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const { dispatch } = useProjectContext();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOptionOpen(false));

  const toggleDropdown = () => setIsOptionOpen(!isOptionOpen);

  const handleEditClick = () => {
    dispatch({
      type: DISPATCH_ACTION.SET_SELECTED_PROJECT,
      payload: projectId
    });
    onOpenEdit(projectId);
    setIsOptionOpen(false);
  };

  return (
    <div className='relative inline-block text-left group' ref={dropdownRef}>
      <Button onClick={toggleDropdown} customClasses={'hover:border-none hover:bg-gray-100'}>
        <img src={addIcon} alt='Menu' />
      </Button>

      {isOptionOpen && (
        <div className='absolute right-0 z-10 mt-2 bg-white border w-max border-gray-300 rounded-md shadow-lg'>
          <ul>
            <li className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer' onClick={handleEditClick}>
              Edit
            </li>
            <li className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-not-allowed'>Send mail</li>
            <li className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-not-allowed'>Details</li>
            <li className='px-4 py-2 text-sm hover:bg-gray-100 cursor-not-allowed text-warning-400'>Archive</li>
            <li className='px-4 py-2 text-sm hover:bg-gray-100 cursor-not-allowed text-danger-400'>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectOptionsDropdown;
