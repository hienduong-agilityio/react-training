// Libraries
// import { generateBreadcrumbItems } from '@/helpers/breadcrumb';
// import { useMemo } from 'react';
// import { useLocation, useParams } from 'react-router-dom';

import { JSX } from 'react';
import { ROUTE } from '../../constants';
import { Link } from 'react-router-dom';

// Components
// import { Breadcrumbs } from '@/components';

/**
 * TabLayout component
 *
 * @returns {JSX.Element} - The TabLayout element
 */
export const TabLayout = (): JSX.Element => {
  // const location = useLocation();
  // const { id: projectId } = useParams();

  // const breadcrumbItems = useMemo(
  //   () => generateBreadcrumbItems(location.pathname, projectId),
  //   [location.pathname, projectId]
  // );

  return (
    <div className='flex flex-col px-4 py-2'>
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      This breadcrumbs component
      <Link className='p-2 bg-primary-300' to={ROUTE.LOGIN}>
        Login
      </Link>
    </div>
  );
};
