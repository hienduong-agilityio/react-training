// Libraries
import { Navigate, useParams } from 'react-router-dom';

// Components
import { ProjectDetailSkeleton } from '@/components';
import { ProjectDetailInfo } from '@/pages/ProjectDetail/ProjectDetailInfo';

// Hooks
import { usePageSeo, useProject } from '@/hooks';

// Interfaces
import { IProjectItemProps } from '@/interfaces';

const ProjectDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const project = useProject({ id: id ?? '' });
  const { data: projectDetail, isQueryProjectDetailPending, error: projectDetailsError } = project;

  // Extract SEO data if projectDetail is valid
  const seoData =
    !isQueryProjectDetailPending && projectDetail && !Array.isArray(projectDetail)
      ? {
          title: `${projectDetail.projectName}`,
          description: projectDetail.projectName || `Details about project ${projectDetail.projectName}`,
          ogTitle: `${projectDetail.projectName}`,
          ogDescription: projectDetail.projectName || ''
        }
      : null;

  // Always call usePageSeo
  usePageSeo(
    seoData || {
      title: 'Project Details',
      description: 'A powerful tool for managing and tracking projects efficiently.'
    }
  );

  // Handle loading
  if (isQueryProjectDetailPending) return <ProjectDetailSkeleton />;

  // Handle not found
  if (!projectDetail) return <Navigate to='/404' replace />;

  // Handle error
  if (projectDetailsError) {
    return <div>Error loading project: {projectDetailsError.message}</div>;
  }

  const { manager: { managerName = 'Unknown', managerImage = '' } = {} } = projectDetail as IProjectItemProps;

  return <ProjectDetailInfo managerName={managerName} managerAvatar={managerImage} {...projectDetail} />;
};

export default ProjectDetail;
