// Components
import Avatar from '@/components/common/Avatar';

/**
 * Navbar components
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = (): JSX.Element => {
  return (
    <nav className='bg-light w-full border'>
      <div className='flex flex-wrap items-center justify-between p-4'>
        <a href='#' className='text-2xl font-semibold text-gray-900'>
          Projects
        </a>
        <div className='flex items-center gap-6'>
          <img src='/src/assets/images/NotificationIcon.svg' className='cursor-not-allowed' alt='Notification' />
          <img src='/src/assets/images/HelpIcon.svg' className='cursor-not-allowed' alt='Help' />
          <Avatar customClass='rounded-full cursor-not-allowed' name='HienDuong' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
