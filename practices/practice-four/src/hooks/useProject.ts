// Libraries
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '@/services';

// Types
import type { IProjectItemProps } from '@/interfaces';

interface IUseProjectParams {
  id?: string;
  page?: number;
  rowsPerPage?: number;
  filter?: { [key: string]: string };
}

/**
 * Hook to handle project queries and mutations
 * @param id - Optional project ID for fetching project details
 * @param page - Optional page number for paginated queries
 * @param rowsPerPage - Optional number of rows per page for paginated queries
 * @param filter - Optional filter object for queries
 */
export const useProject = ({ id = '', page, rowsPerPage, filter = {} }: IUseProjectParams) => {
  const queryClient = useQueryClient();

  // Query for fetching project details by ID
  const getProjectDetailQuery = useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProjectById(id || ''),
    enabled: id !== ''
  });

  // Query for fetching paginated project data based on current page and rows per page
  const getProjectsQuery = useQuery({
    queryKey: ['projects', page, rowsPerPage, filter],
    queryFn: () => getProjects({ page: page, rowsPerPage: rowsPerPage, filter: filter }),
    placeholderData: keepPreviousData,
    enabled: id === ''
  });

  const projectData = id ? getProjectDetailQuery.data : getProjectsQuery.data;
  const queryProjectError = getProjectDetailQuery.error || getProjectsQuery.error;

  // Mutation for adding a new project
  const addProjectMutation = useMutation({
    mutationFn: (newProject: IProjectItemProps) => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects']
      });
    }
  });

  // Mutation for editing project
  const editProjectMutation = useMutation({
    mutationFn: ({ projectId, updatedProject }: { projectId: string; updatedProject: IProjectItemProps }) =>
      updateProject(projectId, updatedProject),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects']
      });
    }
  });

  // Mutation for deleting a project
  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects']
      });
    }
  });

  // Combine all mutation states into a single mutating state
  const isMutating =
    addProjectMutation?.isPending || editProjectMutation?.isPending || deleteProjectMutation?.isPending;

  return {
    data: projectData,
    isQueryProjectsPending: getProjectsQuery.isPending,
    isQueryProjectDetailPending: getProjectDetailQuery.isPending,
    isMutating,
    error: queryProjectError,
    mutate: {
      addProject: addProjectMutation?.mutateAsync,
      editProject: editProjectMutation?.mutateAsync,
      deleteProject: deleteProjectMutation?.mutateAsync
    }
  };
};
