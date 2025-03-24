// Libraries
import { useCallback, useState, useMemo, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components
import ProjectTableManager from '@/pages/ProjectTable/ProjectTableManager';

// Constants
import { ROWS_PER_PAGE_OPTIONS, ROUTE } from '@/constants';

// Hooks
import { useProject, useSearchProject } from '@/hooks';

// Services
import { getProjects } from '@/services';

// Types
import type { IProjectItemProps, IProjectsQueryResult } from '@/interfaces';

const ProjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const searchBoxRef = useRef<HTMLInputElement>(null);

  const isChildRoute = location.state?.from;

  // Get pagination values from URL params or set defaults
  const currentPage = parseInt(searchParams.get('page') || '1');
  const rowsPerPage = parseInt(searchParams.get('rowsPerPage') || '10');
  const initialField = searchParams.get('searchField') || 'projectName';
  const initialKeyword = searchParams.get(initialField) || '';

  // Use the generalized useSearchProject hook with the passed parameters
  const { searchField, searchKeyword, updateSearchTerm, updateSearchField } = useSearchProject(
    initialField,
    initialKeyword
  );

  // Fetch projects data and loading/error state using custom hook
  const projects = useProject({
    page: currentPage,
    rowsPerPage,
    filter: {
      [searchField]: searchKeyword
    }
  });

  const allProjectsQuery: IProjectsQueryResult = useQuery({
    queryKey: ['projects', searchField, searchKeyword],
    queryFn: () =>
      getProjects({
        filter: {
          [searchField]: searchKeyword
        }
      })
  });

  const { data: projectData, isQueryProjectsPending, error } = projects;

  const totalPages = useMemo(
    () => Math.ceil((allProjectsQuery.data?.length as number) / rowsPerPage),
    [allProjectsQuery.data, rowsPerPage]
  );

  /**
   * Handle changes in rows per page selection
   */
  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newRowsPerPage = parseInt(event.target.value, 10);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('rowsPerPage', newRowsPerPage.toString());
      newSearchParams.set('page', '1');

      navigate(`?${newSearchParams.toString()}`);
    },
    [navigate, searchParams]
  );

  /**
   * Handle pagination page change
   */
  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      newSearchParams.set('page', newPage.toString());

      navigate(`?${newSearchParams.toString()}`);
    },
    [navigate, searchParams]
  );

  const handleOpenDeleteProjectModal = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  // Memoized row per page select option
  const rowPerPageOption = useMemo(
    () =>
      ROWS_PER_PAGE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    []
  );

  // Handle navigation to create project form
  const handleNewProjectClick = useCallback(() => {
    navigate(ROUTE.ADD_PROJECT, { state: { from: location.pathname + location.search } });
  }, [navigate, location]);

  // Handle dropdown change
  const handleDropDownChange = useCallback(
    (event: string) => {
      updateSearchField(event);
    },
    [updateSearchField]
  );

  /**
   * Trigger search by updating URL parameters
   */
  const handleButtonSearch = useCallback(() => {
    updateSearchTerm(searchBoxRef.current?.value || '');
  }, [updateSearchTerm]);

  // Render error message if there is an error in data fetching

  if (allProjectsQuery.error || error) {
    return <div>Error loading projects.</div>;
  }

  const isPending = allProjectsQuery.isFetching || isQueryProjectsPending;

  return (
    <div className='h-full'>
      {!isChildRoute ? (
        <ProjectTableManager
          searchField={searchField}
          searchKeyword={searchKeyword}
          searchBoxRef={searchBoxRef}
          isPending={isPending}
          allProjectsQuery={allProjectsQuery}
          projectData={projectData as IProjectItemProps[]}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          selectedProjectId={selectedProjectId}
          isDeleteModalOpen={isDeleteModalOpen}
          rowPerPageOption={rowPerPageOption}
          handleNewProjectClick={handleNewProjectClick}
          handleButtonSearch={handleButtonSearch}
          handleDropDownChange={handleDropDownChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          handlePageChange={handlePageChange}
          handleOpenDeleteProjectModal={handleOpenDeleteProjectModal}
          handleDeleteModalClose={handleDeleteModalClose}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ProjectPage;
