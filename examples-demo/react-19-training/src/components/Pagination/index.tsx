// Libraries
import { JSX, memo } from 'react';

// Components
import { Button } from '../../components';

interface IPaginationProps {
  // currentPage: The current active page number being displayed.
  currentPage?: number;
  // totalPages: The total number of pages available for pagination.
  totalPages?: number;
  // onPageChange: Function to handle page change events, triggered when the user navigates to a different page.
  onPageChange?: (page: number) => void;
}

/**
 * Pagination component
 *
 * @returns {JSX.Element} - Pagination element
 */
const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange = () => {} }: IPaginationProps): JSX.Element => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (totalPages && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-between items-center p-4'>
      <div className='flex items-center space-x-2'>
        <Button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className='px-2 py-2 rounded-xl bg-gray-200 disabled:opacity-50'
        >
          <img className='w-5 h-5' alt='Arrow Left' />
        </Button>
        <span className='px-3'>
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className='px-2 py-2 rounded-xl bg-gray-200 disabled:opacity-50'
        >
          <img src={'arrowRight'} className='w-5 h-5' alt='Arrow Right' />
        </Button>
      </div>
    </div>
  );
};

export default memo(Pagination);
