// Helpers
import { generateBreadcrumbItems } from '@/helpers/breadcrumb';

// Constants
import { ROUTE } from '@/constants/route';

describe('generateBreadcrumbItems', () => {
  it('should return the base breadcrumb when on the Projects page', () => {
    const pathname = ROUTE.PROJECT;
    const result = generateBreadcrumbItems(pathname);
    expect(result).toEqual([
      { id: 1, label: 'Home', href: ROUTE.ROOT },
      { id: 2, label: 'Projects', href: ROUTE.PROJECT }
    ]);
  });

  it('should return the breadcrumb for Project Details when a projectId is provided', () => {
    const pathname = `${ROUTE.PROJECT_DETAILS.replace(':id', '1')}`;
    const projectId = '1';
    const result = generateBreadcrumbItems(pathname, projectId);
    expect(result).toEqual([
      { id: 1, label: 'Home', href: ROUTE.ROOT },
      { id: 2, label: 'Projects', href: ROUTE.PROJECT },
      { id: 3, label: '1', href: `${ROUTE.PROJECT_DETAILS.replace(':id', '1')}` }
    ]);
  });

  it('should return the breadcrumb for Add Project', () => {
    const pathname = ROUTE.ADD_PROJECT;
    const result = generateBreadcrumbItems(pathname);
    expect(result).toEqual([
      { id: 1, label: 'Home', href: ROUTE.ROOT },
      { id: 2, label: 'Projects', href: ROUTE.PROJECT },
      { id: 3, label: 'Add Project', href: ROUTE.ADD_PROJECT }
    ]);
  });

  it('should return the breadcrumb for Edit Project when a projectId is provided', () => {
    const pathname = `${ROUTE.EDIT_PROJECT.replace(':id', '1')}`;
    const projectId = '1';
    const result = generateBreadcrumbItems(pathname, projectId);
    expect(result).toEqual([
      { id: 1, label: 'Home', href: ROUTE.ROOT },
      { id: 2, label: 'Projects', href: ROUTE.PROJECT },
      { id: 3, label: 'Edit', href: `${ROUTE.EDIT_PROJECT.replace(':id', '1')}` },
      { id: 4, label: '1', href: `${ROUTE.PROJECT_DETAILS.replace(':id', '1')}` }
    ]);
  });

  it('should return a Not Found breadcrumb for unknown paths', () => {
    const pathname = '/unknown-path';
    const result = generateBreadcrumbItems(pathname);
    expect(result).toEqual([
      { id: 1, label: 'Home', href: ROUTE.ROOT },
      { id: 2, label: 'Projects', href: ROUTE.PROJECT },
      { id: 3, label: 'Not Found', href: '#' }
    ]);
  });
});
