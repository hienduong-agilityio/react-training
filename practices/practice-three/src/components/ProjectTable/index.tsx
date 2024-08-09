// Component
import ProjectTableColumn from './ProjectTableColumn';
import ProjectTableBody from './ProjectTableBody';

// Types
import { IProjectItemProps } from '@/components/ProjectItem';

export interface IProjectTableProps {
  // dataTable: Optional array of project data to populate the table body.
  dataTable?: IProjectItemProps[];
}

/**
 * ProjectTable Component
 *
 * @returns {JSX.Element} The project table element.
 */
const ProjectTable = ({ dataTable = [] }: IProjectTableProps): JSX.Element => {
  return (
    <div className='w-full overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <ProjectTableColumn />
        <ProjectTableBody tableData={dataTable} />
      </table>
    </div>
  );
};

export default ProjectTable;
