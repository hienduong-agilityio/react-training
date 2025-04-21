import { useCallback, Suspense, useDeferredValue, useState } from 'react';
import { useNavigate, useLocation, useSearchParams, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components
import { ProjectSearch, Button, Spinner, ProjectTableManager } from '@/components';

// Constants
import { ROUTE, ROWS_PER_PAGE_OPTIONS } from '@/constants';

// Hooks
import { useProject, useSearchProject } from '@/hooks';

// Services
import { getProjects } from '@/services';

// Types
import type { IProjectsQueryResult } from '@/interfaces';

const ProjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isChildRoute = location.state?.from;

  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const rowsPerPage = parseInt(searchParams.get('rowsPerPage') ?? '10');

  const initialField = searchParams.get('searchField') ?? 'projectName';
  const initialKeyword = searchParams.get(initialField) ?? '';

  const { searchField, searchKeyword, updateSearchTerm, updateSearchField } = useSearchProject(
    initialField,
    initialKeyword
  );

  const deferredKeyword = useDeferredValue(searchKeyword);

  const {
    data: projectData,
    isQueryProjectsPending,
    error
  } = useProject({
    page: currentPage,
    rowsPerPage,
    filter: { [searchField]: deferredKeyword }
  });

  const allProjectsQuery: IProjectsQueryResult = useQuery({
    queryKey: ['projects', searchField, deferredKeyword],
    queryFn: () => getProjects({ filter: { [searchField]: deferredKeyword } })
  });

  const totalPages = Math.ceil((allProjectsQuery.data?.length ?? 1) / rowsPerPage);

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set('rowsPerPage', newRowsPerPage.toString());
      newParams.set('page', '1');

      navigate(`?${newParams.toString()}`);
    },
    [navigate, searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set('page', newPage.toString());
      navigate(`?${newParams.toString()}`);
    },
    [navigate, searchParams]
  );

  const handleOpenDeleteProjectModal = useCallback((id: string) => {
    setSelectedProjectId(id);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const rowPerPageOption = ROWS_PER_PAGE_OPTIONS.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  // Handle navigation to create project form
  const handleNewProjectClick = useCallback(() => {
    navigate(ROUTE.ADD_PROJECT, { state: { from: location.pathname + location.search } });
  }, [navigate, location]);

  if (error ?? allProjectsQuery.error) return <div>Error loading projects</div>;

  const isPending = isQueryProjectsPending ?? allProjectsQuery.isFetching;

  return (
    <div className='h-full'>
      {!isChildRoute ? (
        <>
          <div className='flex justify-between pt-5 pb-7 px-3'>
            <ProjectSearch
              searchField={searchField}
              updateSearchField={updateSearchField}
              updateSearchTerm={updateSearchTerm}
              initialKeyword={initialKeyword}
            />
            <Button
              onClick={handleNewProjectClick}
              className='border-0 px-3 py-1 text-sm bg-primary-500 hover:bg-primary-600 focus:bg-primary-500 text-white flex gap-2 items-center focus:ring-4 focus:ring-primary-100 rounded-md cursor-pointer'
            >
              New Project
            </Button>
          </div>
          <Suspense fallback={<Spinner />}>
            <ProjectTableManager
              isPending={isPending}
              allProjectsQuery={allProjectsQuery}
              projectData={Array.isArray(projectData) ? projectData : []}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              currentPage={currentPage}
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
