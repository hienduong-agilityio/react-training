// Libraries
import { Navigate, useRoutes, useParams } from 'react-router-dom';
import { lazy } from 'react';

// Layouts
import { MainLayout, ProjectLayout } from '@/layout';

// Components
import { ErrorBoundary, ErrorDisplay, SuspenseLoader } from '@/components';

// Constants
import { ROUTE } from '@/constants';

// Pages
const ProjectPage = SuspenseLoader(lazy(() => import('@/pages/ProjectTable')));
const NotFoundPage = SuspenseLoader(lazy(() => import('@/pages/NotFound')));
const ProjectDetail = SuspenseLoader(lazy(() => import('@/pages/ProjectDetail')));
const ProjectForm = SuspenseLoader(lazy(() => import('@/pages/ProjectForm')));

/**
 * Fetches 'id' from URL params.
 */
const ProjectRoutesWrapper = () => {
  const { id } = useParams();

  if (id) {
    return (
      <ErrorBoundary fallback={<ErrorDisplay errorMessage='Something went wrong with Project Detail!' />}>
        <ProjectDetail />
      </ErrorBoundary>
    );
  } else {
    return <Navigate to={ROUTE.PROJECT} />;
  }
};

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: ROUTE.ROOT,
      element: <MainLayout />,
      children: [
        {
          path: ROUTE.ROOT,
          element: <Navigate to={ROUTE.PROJECT} />
        },
        {
          path: ROUTE.PROJECT,
          element: (
            <ErrorBoundary fallback={<ErrorDisplay errorMessage='Something went wrong with Project Page!' />}>
              <ProjectPage />
            </ErrorBoundary>
          )
        },
        {
          element: <ProjectLayout />,
          children: [
            {
              path: `${ROUTE.PROJECT_DETAILS}`,
              element: <ProjectRoutesWrapper />
            },
            {
              path: ROUTE.ADD_PROJECT,
              element: (
                <ErrorBoundary fallback={<ErrorDisplay errorMessage='Something went wrong with Adding Project!' />}>
                  <ProjectForm title='Add Project' />
                </ErrorBoundary>
              )
            },
            {
              path: ROUTE.EDIT_PROJECT,
              element: (
                <ErrorBoundary fallback={<ErrorDisplay errorMessage='Something went wrong with Editing Project!' />}>
                  <ProjectForm title='Edit Project' />
                </ErrorBoundary>
              )
            }
          ]
        },
        {
          path: ROUTE.NOT_FOUND,
          element: <NotFoundPage />
        }
      ]
    }
  ]);

  return routes;
};
