// Libraries
import { Link } from 'react-router-dom';

// Components
import { Avatar } from '@/components';

// Svg
import notifyIcon from '@public/images/notificationIcon.svg';
import helpIcon from '@public/images/helpIcon.svg';

// Constants
import { ROUTE } from '@/constants';

/**
 * Navbar components
 *
 * @returns {JSX.Element} The Navbar component.
 */
export const Navbar = (): JSX.Element => {
  return (
    <nav className='bg-light w-full border'>
      <div className='flex flex-wrap items-center justify-between p-4'>
        <Link to={ROUTE.PROJECT} className='text-2xl font-semibold text-gray-900'>
          Projects
        </Link>
        <div className='flex items-center gap-6'>
          <img src={notifyIcon} className='cursor-not-allowed' alt='Notification' />
          <img src={helpIcon} className='cursor-not-allowed' alt='Help' />
          <Avatar customClass='rounded-full cursor-not-allowed' name='HienDuong' />
        </div>
      </div>
    </nav>
  );
};
