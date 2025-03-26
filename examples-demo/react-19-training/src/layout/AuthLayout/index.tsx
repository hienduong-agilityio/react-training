// Libraries
import { Outlet } from 'react-router-dom';

// Layouts
import { JSX } from 'react';

/**
 * AuthLayout component
 *
 * @returns {JSX.Element} The main layout structure with navigation components and content area.
 */
export const AuthLayout = (): JSX.Element => {
  return (
    <main className='flex flex-col justify-center items-center h-dvh bg-gray-400'>
      <Outlet />
    </main>
  );
};
