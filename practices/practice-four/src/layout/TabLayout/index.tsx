// Libraries
import { generateBreadcrumbItems } from '@/helpers/breadcrumb';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Components
import { Breadcrumbs } from '@/components';

/**
 * TabLayout component
 *
 * @returns {JSX.Element} - The TabLayout element
 */
export const TabLayout = (): JSX.Element => {
  const location = useLocation();
  const { id: projectId } = useParams();

  const breadcrumbItems = useMemo(
    () => generateBreadcrumbItems(location.pathname, projectId),
    [location.pathname, projectId]
  );

  return (
    <div className='px-4 py-2'>
      <Breadcrumbs items={breadcrumbItems} />
    </div>
  );
};
