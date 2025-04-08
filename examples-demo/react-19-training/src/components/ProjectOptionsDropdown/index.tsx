// Libraries
import { useState, useRef, JSX, RefObject } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import { Button } from '../../components';

// Hooks
import { useClickOutside } from '../../hooks';

// Constants
import { ROUTE } from '../../constants';

export interface IProjectOptionsDropdown {
  // projectID: The ID of the project to be managed
  projectId: string;
  // onDeleteProject: The function to open delete modal
  onDeleteProject: (projectId: string) => void;
}

/**
 * The custom ProjectOptionsDropdown component
 *
 * @returns {JSX.Element} - The ProjectOptionsDropdown element
 */
export const ProjectOptionsDropdown = ({
  projectId = '',
  onDeleteProject = () => {}
}: IProjectOptionsDropdown): JSX.Element => {
  const location = useLocation();

  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef as RefObject<HTMLElement>, () => setIsOptionOpen(false));

  const toggleDropdown = () => setIsOptionOpen(!isOptionOpen);

  const handleDeleteClick = () => {
    onDeleteProject(projectId);
    setIsOptionOpen(false);
  };

  return (
    <div className='relative inline-block text-left group' ref={dropdownRef}>
      <Button onClick={toggleDropdown} customClass={'hover:border-none hover:bg-gray-100'}>
        <img alt='Menu' />
      </Button>

      {isOptionOpen && (
        <div className='absolute right-0 z-10 mt-2 bg-white border w-max border-gray-300 rounded-md shadow-lg'>
          <ul>
            <Link to={`${ROUTE.PROJECT}/edit/${projectId}`} state={{ from: location.pathname + location.search }}>
              <li className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>Edit</li>
            </Link>
            <li className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-not-allowed'>Send mail</li>
            <li className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-not-allowed'>Details</li>
            <li className='px-4 py-2 text-sm hover:bg-gray-100 cursor-not-allowed text-warning-400'>Archive</li>
            <li
              className='px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-danger-400'
              onClick={handleDeleteClick}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
