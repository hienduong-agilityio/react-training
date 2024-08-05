// Component
import ProjectItem from '@/components/common/ProjectItem';

// Type
import { IProjectItemProps } from '@/components/common/ProjectItem';

export interface IProjectTableBodyProps {
  // tableData: The data for each project to be rendered.
  tableData: IProjectItemProps[];
}

/**
 * ProjectTableBody Component
 *
 * @returns {JSX.Element} The table body containing the project items.
 */
const ProjectTableBody = ({ tableData }: IProjectTableBodyProps) => {
  return (
    <tbody>
      {tableData.map((project: IProjectItemProps) => (
        <ProjectItem key={project.id} {...project} />
      ))}
    </tbody>
  );
};

export default ProjectTableBody;
