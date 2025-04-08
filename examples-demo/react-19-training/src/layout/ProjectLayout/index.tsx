// Libraries
import { Outlet, useNavigate } from 'react-router-dom';

// SVG
// import backArrow from '@public/images/backArrow.svg';

// Constants
import { ROUTE } from '../../constants';
import { JSX } from 'react';

/**
 * Project layout component
 *
 * @returns {JSX.Element} - The Project layout element
 */
export const ProjectLayout = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate(ROUTE.PROJECT);
  };

  return (
    <div className='flex flex-col h-full bg-gray-300 p-6'>
      <button
        role='button'
        onClick={handleGoBack}
        className='mb-6 w-24 p-2 bg-white border-2 text-black flex gap-2 items-center justify-center focus:ring-4 focus:ring-primary-100 rounded-md cursor-pointer'
      >
        {/* <img src={backArrow} alt='Back Arrow' className='w-5 h-5 pr-2' /> */}
        Back
      </button>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w h-auto'>
        <Outlet />
      </div>
    </div>
  );
};
