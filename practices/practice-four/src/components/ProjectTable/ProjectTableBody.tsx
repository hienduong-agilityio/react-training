// Component
import ProjectItem from '@/components/ProjectItem';

// Type
import type { IProjectItemProps } from '@/interfaces';
import { Spinner } from '@/components';

export interface IProjectTableBodyProps {
  // tableData: The data for each project to be rendered.
  tableData: IProjectItemProps[];
  // onDeleteProject: The function to open delete modal
  onDeleteProject: (projectId: string) => void;
  isPending?: boolean;
}

/**
 * ProjectTableBody Component
 *
 * @returns {JSX.Element} The table body containing the project items or a "No results found" message.
 */
const ProjectTableBody = ({ tableData = [], onDeleteProject = () => {}, isPending }: IProjectTableBodyProps) => {
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
    <tbody className={isPending ? 'pointer-events-none select-none relative' : ''}>
      {isPending && (
        <div className='absolute inset-0 z-10 flex justify-center items-center bg-white/20 backdrop-blur-[1px] pointer-events-auto'>
          <Spinner />
        </div>
      )}
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
