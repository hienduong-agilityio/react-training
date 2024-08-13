// Component
import ProjectItem from '@/components/ProjectItem';

// Type
import type { IProjectItemProps } from '@/components/ProjectItem';

export interface IProjectTableBodyProps {
  // tableData: The data for each project to be rendered.
  tableData: IProjectItemProps[];
  // onOpenEdit: The function to open edit modal
  onOpenEdit: (id: string) => void;
}

/**
 * ProjectTableBody Component
 *
 * @returns {JSX.Element} The table body containing the project items.
 */
const ProjectTableBody = ({ tableData, onOpenEdit }: IProjectTableBodyProps) => {
  return (
    <tbody>
      {tableData.map((project: IProjectItemProps, index: number) => (
        <ProjectItem key={project.id} {...project} index={index + 1} onOpenEdit={onOpenEdit} />
      ))}
    </tbody>
  );
};

export default ProjectTableBody;
