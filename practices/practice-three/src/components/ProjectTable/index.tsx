// Component
import ProjectTableColumn from './ProjectTableColumn';
import ProjectTableBody from './ProjectTableBody';

// Types
import type { IProjectItemProps } from '@/components/ProjectItem';

export interface IProjectTableProps {
  // dataTable: The project item data list
  dataTable?: IProjectItemProps[];
  // onOpenEdit: The function to open edit modal
  onOpenEdit: (id: string) => void;
  // onDeleted: The function to open delete modal
  onDelete: () => void;
}

/**
 * ProjectTable Component
 *
 * @returns {JSX.Element} The project table element.
 */
const ProjectTable = ({ dataTable = [], onOpenEdit, onDelete }: IProjectTableProps): JSX.Element => {
  return (
    <div className='min-w-[800px] h-[1200px] overflow-y-scroll shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <ProjectTableColumn />
        <ProjectTableBody tableData={dataTable} onOpenEdit={onOpenEdit} onDelete={onDelete} />
      </table>
    </div>
  );
};

export default ProjectTable;
