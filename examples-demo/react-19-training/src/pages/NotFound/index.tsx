// Libraries
import { Link } from 'react-router-dom';

// Constants
import { ROUTE } from '../../constants';
import { JSX } from 'react';

/**
 * NotFoundPage
 *
 * @returns {JSX.Element} - The NotFound element
 */
const NotFoundPage = (): JSX.Element => {
  return (
    <div className='flex flex-col h-screen justify-center items-center bg-gray-300'>
      <p className='text-[120px] font-extrabold text-gray-700'>404</p>
      <p className='text-2xl font-medium text-gray-600 mb-6'>Not Found</p>
      <Link
        to={ROUTE.ROOT}
        className='px-4 py-2 font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-all duration-200 ease-in-out'
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
