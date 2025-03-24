// Libraries
import { matchPath } from 'react-router-dom';

// Constants
import { ROUTE } from '@/constants';

// Types
import type { BreadcrumbItem } from '@/components/Breadcrumbs';

/**
 * Generates an array of breadcrumb items.
 *
 * @param pathname - The current URL pathname.
 * @param projectId - The optional ID of the project.
 * @returns An array of breadcrumb items to be displayed in the breadcrumb component.
 */
export const generateBreadcrumbItems = (pathname: string, projectId?: string): BreadcrumbItem[] => {
  const baseBreadcrumb: BreadcrumbItem[] = [
    { id: 1, label: 'Home', href: ROUTE.ROOT },
    { id: 2, label: 'Projects', href: ROUTE.PROJECT }
  ];

  if (matchPath(ROUTE.PROJECT_DETAILS, pathname) && projectId) {
    return [
      ...baseBreadcrumb,
      { id: 3, label: `${projectId}`, href: `${ROUTE.PROJECT_DETAILS.replace(':id', projectId)}` }
    ];
  }

  if (pathname === ROUTE.PROJECT) {
    return baseBreadcrumb;
  }

  if (pathname === ROUTE.ADD_PROJECT) {
    return [...baseBreadcrumb, { id: 3, label: 'Add Project', href: ROUTE.ADD_PROJECT }];
  }

  if (matchPath(ROUTE.EDIT_PROJECT, pathname) && projectId) {
    return [
      ...baseBreadcrumb,
      { id: 3, label: 'Edit', href: `${ROUTE.EDIT_PROJECT.replace(':id', projectId)}` },
      { id: 4, label: `${projectId}`, href: `${ROUTE.PROJECT_DETAILS.replace(':id', projectId)}` }
    ];
  }

  return [...baseBreadcrumb, { id: 3, label: 'Not Found', href: '#' }];
};
