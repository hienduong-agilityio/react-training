// Libraries
import { ChangeEvent, memo } from 'react';

// Components
import { ProjectTable, SelectField, Pagination, DeleteProjectModal, Spinner } from '@/components';

// Interfaces
import { IProjectItemProps, IProjectsQueryResult } from '@/interfaces';

export interface IProjectTableManagerProps {
  isPending: boolean;
  allProjectsQuery: IProjectsQueryResult;
  projectData: IProjectItemProps[];
  rowsPerPage: number;
  totalPages: number;
  currentPage: number;
  selectedProjectId: string;
  isDeleteModalOpen: boolean;
  rowPerPageOption: JSX.Element[];
  handleRowsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handlePageChange: (newPage: number) => void;
  handleOpenDeleteProjectModal: (projectId: string) => void;
  handleDeleteModalClose: () => void;
}

const ProjectTableManager = ({
  isPending,
  allProjectsQuery,
  projectData,
  rowsPerPage,
  totalPages,
  currentPage,
  selectedProjectId,
  isDeleteModalOpen,
  rowPerPageOption,
  handleRowsPerPageChange,
  handlePageChange,
  handleOpenDeleteProjectModal,
  handleDeleteModalClose
}: IProjectTableManagerProps) => {
  return (
    <div className='relative'>
      {isPending && (
        <div className='absolute inset-0 z-10 flex justify-center items-center bg-white/20 backdrop-blur-[1px] pointer-events-auto'>
          <Spinner />
        </div>
      )}

      <div className={isPending ? 'pointer-events-none select-none' : ''}>
        <ProjectTable dataTable={projectData} onDeleteProject={handleOpenDeleteProjectModal} />

        <div className='mt-4 flex items-center justify-between px-5'>
          <span className='text-sm text-gray-600'>
            <strong>{projectData.length ? `1 - ${projectData.length}` : '0'}</strong> of{' '}
            <strong>{allProjectsQuery.data?.length || 0}</strong>
          </span>

          <div className='flex items-center gap-3'>
            <label htmlFor='rowsPerPageSelect'>Rows per page:</label>
            <SelectField
              id='rowsPerPageSelect'
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
    </div>
  );
};

export default memo(ProjectTableManager);
