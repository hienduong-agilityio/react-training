// Component
import ProjectItem from '@/components/ProjectItem';

// Type
import { IProjectItemProps } from '@/components/ProjectItem';

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
      {tableData.map((project: IProjectItemProps, index: number) => (
        <ProjectItem key={project.id} {...project} index={index + 1} />
      ))}
    </tbody>
  );
};

export default ProjectTableBody;
