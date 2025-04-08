// Libraries
import { Link } from 'react-router-dom';

// Constants
import { ROUTE } from '../../constants';

// Svg
// import logoIcon from '@public/images/logoIcon.svg';
// import projectsIcon from '@public/images/projectsIcon.svg';
// import settingIcon from '@public/images/settingIcon.svg';
import { JSX } from 'react';

/**
 * Sidebar components
 *
 * @returns {JSX.Element} The rendered Sidebar menu item.
 */
export const Sidebar = (): JSX.Element => {
  return (
    <div className='flex bg-primary-700'>
      <div className='w-[74px] bg-primary-700 h-screen p-4 relative duration-300'>
        <div className='flex items-center'>
          <Link to={ROUTE.PROJECT}>
            {/* <img src={logoIcon} className='cursor-pointer duration-500' alt='Logo' /> */}
          </Link>
        </div>
        <ul className='pt-10 flex flex-col items-center justify-center gap-5'>
          <li className='rounded-md items-center mt-2 focus:bg-primary-900 cursor-pointer hover:border-primary-100 hover:bg-primary-600'>
            <Link to={ROUTE.PROJECT}>
              {/* <img className='p-2' src={projectsIcon} alt='Projects' /> */}
            </Link>
          </li>
          <li className='rounded-md items-center mt-2 focus:bg-primary-900 cursor-pointer hover:border-primary-100 hover:bg-primary-600'>
            <Link to={ROUTE.ROOT}>
              {/* <img className='p-2' src={settingIcon} alt='Setting' /> */}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
