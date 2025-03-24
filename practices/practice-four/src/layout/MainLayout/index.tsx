// Libraries
import { Outlet } from 'react-router-dom';

// Layouts
import { Sidebar, Navbar, TabLayout } from '@/layout';

/**
 * MainLayout component
 *
 * @returns {JSX.Element} The main layout structure with navigation components and content area.
 */
export const MainLayout = (): JSX.Element => {
  return (
    <main className='flex'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        <TabLayout />
        <Outlet />
      </div>
    </main>
  );
};
