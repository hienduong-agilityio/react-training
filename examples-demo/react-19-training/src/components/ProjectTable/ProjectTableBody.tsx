// Component

// Type
import type { IProjectItemProps } from '../../interfaces';
import ProjectItem from '../ProjectItem';

export interface IProjectTableBodyProps {
  // tableData: The data for each project to be rendered.
  tableData: IProjectItemProps[];
  // onDeleteProject: The function to open delete modal
  onDeleteProject: (projectId: string) => void;
}

/**
 * ProjectTableBody Component
 *
 * @returns {JSX.Element} The table body containing the project items or a "No results found" message.
 */
const ProjectTableBody = ({ tableData = [], onDeleteProject = () => {} }: IProjectTableBodyProps) => {
  const flattenedData = tableData.map((project) => {
    const { id, projectName, status, manager, timeline, lastUpdate, resources, budget } = project;

    return {
      id: id,
      projectName: projectName,
      status: status,
      managerName: manager?.managerName,
      managerImage: manager?.managerImage,
      lastUpdate: lastUpdate,
      resources: resources,
      timeStart: timeline?.timeStart,
      timeEnd: timeline?.timeEnd,
      budget: budget
    };
  });

  return (
    <tbody>
      {tableData.length > 0 ? (
        flattenedData.map((project: IProjectItemProps) => {
          return <ProjectItem key={project.id} {...project} onDeleteProject={onDeleteProject} />;
        })
      ) : (
        <tr>
          <td colSpan={8} className='text-center py-4'>
            No results found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default ProjectTableBody;
