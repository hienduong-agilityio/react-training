import { Suspense, useDeferredValue, useOptimistic, startTransition, useActionState, useState } from 'react';
import { useNavigate, useLocation, useSearchParams, Outlet } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useScan, Options } from 'react-scan';

// Components
import { ProjectSearch, Button, Spinner, ProjectTableManager } from '@/components';

// Constants
import { ROUTE, ROWS_PER_PAGE_OPTIONS } from '@/constants';

// Hooks
import { usePageSeo, useProject, useSearchProject } from '@/hooks';

// Services
import { getProjects } from '@/services';

// Types
import type { IProjectsQueryResult } from '@/interfaces';

const ProjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  usePageSeo({
    title: 'Project Management',
    description: '"A powerful tool for managing and tracking projects efficiently.',
    keywords: 'project, management, tool',
    ogTitle: 'Project Management',
    ogDescription: '"A powerful tool for managing and tracking projects efficiently.',
    ogImage: 'https://example.com/og-image.jpg',
    ogUrl: 'https://project-managerment-table.netlify.app/'
  });

  const isChildRoute = location.state?.from;

  // Get values from URL
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const rowsPerPage = parseInt(searchParams.get('rowsPerPage') ?? '10');
  const initialField = searchParams.get('searchField') ?? 'projectName';
  const initialKeyword = searchParams.get(initialField) ?? '';

  // Search state hook
  const { searchField, searchKeyword, updateSearchTerm, updateSearchField } = useSearchProject(
    initialField,
    initialKeyword
  );

  const searchAction = async (_prevState: { searchValue: string }, formData: FormData) => {
    const keyword = formData.get('search') as string;

    updateSearchTerm(keyword);

    return { searchValue: keyword };
  };

  const searchFormStateTuple = useActionState(searchAction, {
    searchValue: initialKeyword
  });

  const formActionDispatcher = searchFormStateTuple[1];

  const [optimisticState, updateOptimistic] = useOptimistic({ currentPage, rowsPerPage }, (prev, next) => ({
    ...(prev ?? {}),
    ...(next ?? {})
  }));

  const deferredKeyword = useDeferredValue(searchKeyword);

  const {
    data: projectData,
    isQueryProjectsPending,
    error
  } = useProject({
    page: optimisticState.currentPage,
    rowsPerPage: optimisticState.rowsPerPage,
    filter: { [searchField]: deferredKeyword }
  });

  const allProjectsQuery: IProjectsQueryResult = useQuery({
    queryKey: ['projects', searchField, deferredKeyword],
    queryFn: () => getProjects({ filter: { [searchField]: deferredKeyword } }),
    placeholderData: keepPreviousData
  });

  const totalPages = Math.ceil((allProjectsQuery.data?.length ?? 1) / optimisticState.rowsPerPage);

  useScan({
    enabled: import.meta.env.DEV,
    name: 'ProjectPage',
    logProps: true,
    includeComponents: ['ProjectSearch', 'ProjectTableManager', 'Button'],
    rowsPerPage: optimisticState.rowsPerPage
  } as Options & { rowsPerPage: number });

  // Pagination handlers
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);

    startTransition(() => {
      updateOptimistic({ rowsPerPage: newRowsPerPage, currentPage: 1 });
    });

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('rowsPerPage', newRowsPerPage.toString());
    newParams.set('page', '1');

    navigate(`?${newParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      updateOptimistic({ currentPage: newPage });
    });

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());

    navigate(`?${newParams.toString()}`);
  };

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const handleOpenDeleteProjectModal = (id: string) => {
    startTransition(() => {
      setSelectedProjectId(id);
      setIsDeleteModalOpen(true);
    });
  };

  const handleDeleteModalClose = () => {
    startTransition(() => {
      setIsDeleteModalOpen(false);
    });
  };

  // Option builder
  const rowPerPageOption = ROWS_PER_PAGE_OPTIONS.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  const handleNewProjectClick = () => {
    navigate(ROUTE.ADD_PROJECT, { state: { from: location.pathname + location.search } });
  };

  const isPending = isQueryProjectsPending || allProjectsQuery.isFetching;

  if (error ?? allProjectsQuery.error) return <div>Error loading projects</div>;

  return (
    <div className='h-full'>
      {!isChildRoute ? (
        <>
          <div className='flex justify-between pt-5 pb-7 px-3'>
            <ProjectSearch
              searchField={searchField}
              updateSearchField={updateSearchField}
              initialKeyword={initialKeyword}
              formAction={formActionDispatcher}
            />
            <Button onClick={handleNewProjectClick}>New Project</Button>
          </div>

          <Suspense fallback={<Spinner />}>
            <ProjectTableManager
              isPending={isPending}
              allProjectsQuery={allProjectsQuery}
              projectData={Array.isArray(projectData) ? projectData : []}
              rowsPerPage={optimisticState.rowsPerPage}
              totalPages={totalPages}
              currentPage={optimisticState.currentPage}
              selectedProjectId={selectedProjectId}
              isDeleteModalOpen={isDeleteModalOpen}
              rowPerPageOption={rowPerPageOption}
              handleRowsPerPageChange={handleRowsPerPageChange}
              handlePageChange={handlePageChange}
              handleOpenDeleteProjectModal={handleOpenDeleteProjectModal}
              handleDeleteModalClose={handleDeleteModalClose}
            />
          </Suspense>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ProjectPage;
