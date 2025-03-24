// Svg
import logoIcon from '@public/images/logoIcon.svg';
import projectsIcon from '@public/images/projectsIcon.svg';
import settingIcon from '@public/images/settingIcon.svg';

/**
 * Sidebar components
 *
 * @returns {JSX.Element} The rendered Sidebar menu item.
 */
const Sidebar = () => {
  return (
    <div className='flex'>
      <div className={'w-[74px] bg-primary-700 h-full p-4 relative duration-300'}>
        <div className='flex items-center'>
          <img src={logoIcon} className={'cursor-pointer duration-500'} alt='Logo' />
        </div>
        <ul className='pt-10 flex flex-col items-center justify-center gap-5'>
          <li
            className={
              'rounded-md items-center mt-2 focus:bg-primary-900 cursor-pointer hover:border-primary-100 hover:bg-primary-600'
            }
          >
            <a href='#'>
              <img className='p-2' src={projectsIcon} alt='Projects' />
            </a>
          </li>
          <li
            className={
              'rounded-md items-center mt-2 focus:bg-primary-900 cursor-pointer hover:border-primary-100 hover:bg-primary-600'
            }
          >
            <a href='#'>
              <img className='p-2' src={settingIcon} alt='Setting' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
