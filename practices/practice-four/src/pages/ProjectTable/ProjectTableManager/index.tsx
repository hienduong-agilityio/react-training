// Libraries
import { ChangeEvent, RefObject } from 'react';

// Interfaces
import { IProjectItemProps, IProjectsQueryResult } from '@/interfaces';

// Components
import {
  ProjectFilterDropdown,
  SearchBox,
  Button,
  Spinner,
  ProjectTable,
  SelectField,
  Pagination,
  DeleteProjectModal
} from '@/components';

// Enums
import { BUTTON_VARIANTS, BUTTON_SIZES } from '@/enums';

// Constants
import { SEARCH_OPTION } from '@/constants';

export interface IProjectTableManagerProps {
  //searchField: The current search field being used for filtering (e.g., projectName, status)
  searchField: string;
  //searchKeyword: The current search keyword typed by the user
  searchKeyword: string;
  //searchBoxRef: Reference to the search input field
  searchBoxRef: RefObject<HTMLInputElement | null>;
  //isPending: Indicates whether the project data is loading
  isPending: boolean;
  //allProjectsQuery: Contains the result of the project data query
  allProjectsQuery: IProjectsQueryResult;
  //projectData: The list of project data being displayed in the table
  projectData: IProjectItemProps[];
  //rowsPerPage: The number of rows to display per page
  rowsPerPage: number;
  //totalPages: The total number of pages based on the project data
  totalPages: number;
  //currentPage: The current page being viewed
  currentPage: number;
  //selectedProjectId: The ID of the project selected for deletion
  selectedProjectId: string;
  //isDeleteModalOpen: Whether the delete confirmation modal is open
  isDeleteModalOpen: boolean;
  //rowPerPageOption: The row per page options to display in the dropdown
  rowPerPageOption: JSX.Element[];
  //handleNewProjectClick: Function to handle when the "New Project" button is clicked
  handleNewProjectClick: () => void;
  //handleButtonSearch: Function to trigger the search when the search button is clicked
  handleButtonSearch: () => void;
  //handleDropDownChange: Function to handle changes in the project filter dropdown
  handleDropDownChange: (event: string) => void;
  //handleRowsPerPageChange: Function to handle changes in the rows per page dropdown
  handleRowsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  //handlePageChange: Function to handle page changes for pagination
  handlePageChange: (newPage: number) => void;
  //handleOpenDeleteProjectModal: Function to open the delete confirmation modal for a specific project
  handleOpenDeleteProjectModal: (projectId: string) => void;
  //handleDeleteModalClose: Function to close the delete confirmation modal
  handleDeleteModalClose: () => void;
}

const ProjectTableManager = ({
  searchField,
  searchKeyword,
  searchBoxRef,
  isPending,
  allProjectsQuery,
  projectData,
  rowsPerPage,
  totalPages,
  currentPage,
  selectedProjectId,
  isDeleteModalOpen,
  rowPerPageOption,
  handleNewProjectClick,
  handleButtonSearch,
  handleDropDownChange,
  handleRowsPerPageChange,
  handlePageChange,
  handleOpenDeleteProjectModal,
  handleDeleteModalClose
}: IProjectTableManagerProps) => {
  return (
    <div>
      <div className='flex justify-between pt-5 pb-7 px-3'>
        <div className='flex h-auto'>
          <ProjectFilterDropdown options={SEARCH_OPTION} onChange={handleDropDownChange} searchField={searchField} />
          <div className='flex gap-2'>
            <SearchBox ref={searchBoxRef} value={searchKeyword} />
            <Button onClick={handleButtonSearch} variant={BUTTON_VARIANTS.OUTLINED} size={BUTTON_SIZES.SMALL}>
              Search
            </Button>
          </div>
        </div>
        <Button
          onClick={handleNewProjectClick}
          className='border-0 px-3 py-1 text-sm bg-primary-500 hover:bg-primary-600 focus:bg-primary-500 text-white flex gap-2 items-center focus:ring-4 focus:ring-primary-100 rounded-md cursor-pointer'
        >
          New Project
        </Button>
      </div>

      {isPending ? (
        <div className='absolute inset-0 flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        allProjectsQuery.isFetched && (
          <div>
            <ProjectTable dataTable={projectData || []} onDeleteProject={handleOpenDeleteProjectModal} />
            <div className='mt-4 flex items-center justify-between px-5'>
              <span className='text-sm text-gray-600'>
                <strong>{`${projectData.length > 0 ? 1 : 0} - ${projectData.length}`}</strong> of
                <strong>{` ${allProjectsQuery.data?.length}`}</strong>
              </span>
              <div className='flex items-center justify-end'>
                <label htmlFor='rowsPerPageSelect' className='mr-2'>
                  Rows per page:
                </label>
                <SelectField
                  id='row-per-page-selection'
                  name='rowsPerPageSelect'
                  value={rowsPerPage.toString()}
                  defaultValue={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  customClasses='rounded-md'
                >
                  {rowPerPageOption}
                </SelectField>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                <DeleteProjectModal
                  projectId={selectedProjectId}
                  isModalOpen={isDeleteModalOpen}
                  onCloseModal={handleDeleteModalClose}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectTableManager;
