// Services
import { apiRequest } from './api';

// Types
import type { IProjectItemProps } from '@/interfaces';

// Constants
import { API_URL, HTTP_METHODS } from '@/constants';

/**
 * Get project data with optional search term and sort by lastUpdate.
 * @param page - The page number for pagination.
 * @param rowsPerPage - Number of items per page.
 * @param searchField - The field to search by.
 * @param searchTerm - The term to search for in the specified field.
 */
export const getProjects = async ({
  page = 0,
  rowsPerPage = 10,
  filter = {}
}: {
  page?: number;
  rowsPerPage?: number;
  filter?: { [key: string]: string };
}): Promise<IProjectItemProps[]> => {
  let apiUrl = API_URL.PROJECT;

  // Add filters to the URL if provided
  Object.keys(filter).forEach((filterKey) => {
    const filterValue = filter[filterKey];

    apiUrl += `?${filterKey}_like=${encodeURIComponent(filterValue)}`;
  });

  if (page > 0) {
    apiUrl += `&_page=${page}&_limit=${rowsPerPage}`;
  }

  try {
    const projects = await apiRequest<IProjectItemProps[]>({
      url: apiUrl,
      method: HTTP_METHODS.GET
    });
    // Ensure the lastUpdate field is in ISO format and sort the results
    return projects.sort((projectA: { lastUpdate: string }, projectB: { lastUpdate: string }) => {
      const dateA = new Date(projectA.lastUpdate);
      const dateB = new Date(projectB.lastUpdate);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    throw new Error(`Error fetching projects: ${(error as Error).message}`);
  }
};

/**
 * Get a project by Id.
 * @param id - The project ID.
 */
export const getProjectById = async (id: string): Promise<IProjectItemProps> => {
  try {
    return await apiRequest<IProjectItemProps>({
      url: `${API_URL.PROJECT}/${id}`,
      method: HTTP_METHODS.GET
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Create a new project.
 * @param projectData - The project data to create.
 */
export const createProject = async (projectData: IProjectItemProps) => {
  try {
    return await apiRequest({
      url: API_URL.PROJECT,
      method: HTTP_METHODS.POST,
      data: projectData
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Update an existing project.
 * @param id - The project ID.
 * @param projectData - The updated project data.
 */
export const updateProject = async (id: string, projectData: IProjectItemProps) => {
  try {
    return await apiRequest({
      url: `${API_URL.PROJECT}/${id}`,
      method: HTTP_METHODS.PUT,
      data: projectData
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Delete a project.
 * @param id - The project ID.
 */
export const deleteProject = async (id: string) => {
  try {
    return await apiRequest({
      url: `${API_URL.PROJECT}/${id}`,
      method: HTTP_METHODS.DELETE
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
