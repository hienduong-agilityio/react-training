// Libraries
import { Link } from 'react-router-dom';
import { memo } from 'react';

// SVG
import homeIcon from '@public/images/homeIcon.svg';
import arrowRight from '@public/images/arrowRightIcon.svg';

// Constants
import { ROUTE } from '@/constants';

export type BreadcrumbItem = {
  // id: The breadcrumb Items id
  id?: number;
  // label: The label to display for the breadcrumb item
  label?: string;
  // href: Optional URL for the breadcrumb item
  href?: string;
};

interface IBreadcrumbsProps {
  // items: Array of breadcrumb items
  items?: BreadcrumbItem[];
}

/**
 * Breadcrumbs component
 *
 * @returns {JSX.Element} Breadcrumbs element
 */
const Breadcrumbs = ({ items = [{ label: 'Home', href: ROUTE.ROOT }] }: IBreadcrumbsProps): JSX.Element => {
  return (
    <nav aria-label='breadcrumb'>
      <ul className='flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        <li className='inline-flex items-center'>
          <Link to={ROUTE.ROOT} className='flex items-center text-sm font-medium text-gray-400 hover:text-primary-500'>
            <img src={homeIcon} alt='home' className='w-4 h-4 me-2.5 p-0' />
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label || item.id} className='inline-flex items-center'>
            <img src={arrowRight} alt='Arrow Right' className='rtl:rotate-180 w-6 h-6 text-gray-400 mx-1' />
            {item.href ? (
              <Link to={item.href} className='ms-1 text-sm font-medium text-gray-400 hover:text-primary-500 md:ms-2'>
                {item.label}
              </Link>
            ) : (
              <span className='ms-1 text-sm font-medium text-gray-400 md:ms-2'>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(Breadcrumbs);
