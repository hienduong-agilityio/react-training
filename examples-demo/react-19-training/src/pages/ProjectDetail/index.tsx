// Libraries
import { Navigate, useParams } from 'react-router-dom';

// Components
import { ProjectDetailInfo } from '../../pages/ProjectDetail/ProjectDetailInfo';

// Hooks
import { useProject } from '../../hooks';

// Interfaces
import { IProjectItemProps } from '../../interfaces';
import { JSX } from 'react';

/**
 * Component to render detailed information for a single project.
 *
 * @returns {JSX.Element} The rendered project details.
 */
const ProjectDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  // Get project detail by useProject hook
  const project = useProject({ id: id || '' });
  const { data: projectDetail, isQueryProjectDetailPending, error: projectDetailsError } = project;

  // Render loading spinner if data is being fetched
  if (isQueryProjectDetailPending) {
    // return <ProjectDetailSkeleton />;
    return <p>Loading...</p>;
  }

  // If the project is not found, redirect to a 404 page
  if (!projectDetail) {
    return <Navigate to='/404' replace />;
  }

  // Render error message if there is an error in data fetching
  if (projectDetailsError) {
    return <div>Error loading projects: {projectDetailsError.message}</div>;
  }

  const { manager: { managerName = 'Unknown', managerImage = '' } = {} } = projectDetail as IProjectItemProps;

  return <ProjectDetailInfo managerName={managerName} managerAvatar={managerImage} {...projectDetail} />;
};

export default ProjectDetail;
