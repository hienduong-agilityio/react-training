// Component
import ProjectTableColumn from '@/components/ProjectTable/ProjectTableColumn';
import ProjectTableBody from '@/components/ProjectTable/ProjectTableBody';

// Types
import type { IProjectItemProps } from '@/interfaces';

export interface IProjectTableProps {
  // dataTable: The project item data list
  dataTable?: IProjectItemProps[];
  // onDeleteProject: The function to open delete modal
  onDeleteProject: (projectId: string) => void;
}

/**
 * ProjectTable Component
 *
 * @returns {JSX.Element} The project table element.
 */
export const ProjectTable = ({ dataTable = [], onDeleteProject = () => {} }: IProjectTableProps): JSX.Element => {
  return (
    <div className='w-full shadow-md sm:rounded-lg'>
      <div className='overflow-y-auto h-[900px]'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <ProjectTableColumn />
          <ProjectTableBody tableData={dataTable} onDeleteProject={onDeleteProject} />
        </table>
      </div>
    </div>
  );
};
