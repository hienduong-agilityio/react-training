// Services
import { getProjects, getProjectById, createProject, updateProject, deleteProject, apiRequest } from '@/services';

// Types
import type { IProjectItemProps } from '@/interfaces';

// Mock apiRequest
jest.mock('@/services/api');

// Mock data based on IProjectItemProps
const mockProject: IProjectItemProps = {
  id: '1',
  projectName: 'Project A',
  status: 'active',
  lastUpdate: '2024-01-01T12:00:00Z',
  manager: { managerName: 'John Doe' }
};

const mockProjectUpdated: IProjectItemProps = {
  id: '1',
  projectName: 'Updated Project A',
  status: 'active',
  lastUpdate: '2024-01-02T12:00:00Z',
  manager: { managerName: 'Jane Smith' }
};

type DeleteResponse = { success: boolean };

describe('ProjectService', () => {
  const mockApiRequest = apiRequest as jest.Mock;
  let requestOptions: { url: string; method: string; data?: IProjectItemProps };

  beforeEach(() => {
    jest.clearAllMocks();
    requestOptions = {
      url: '',
      method: '',
      data: undefined
    };
  });

  const mockSuccess = (response: IProjectItemProps | IProjectItemProps[] | DeleteResponse) =>
    mockApiRequest.mockResolvedValue(response);
  const mockFailure = (error: string) => mockApiRequest.mockRejectedValue(new Error(error));

  it('should fetch and return sorted projects by lastUpdate', async () => {
    requestOptions.url = expect.stringContaining('?projectName_like=test&_page=1&_limit=10');
    requestOptions.method = 'GET';

    const mockProjects: IProjectItemProps[] = [
      { ...mockProject },
      {
        id: '2',
        projectName: 'Project B',
        status: 'completed',
        lastUpdate: '2024-01-02T12:00:00Z',
        manager: { managerName: 'Jane Smith' }
      }
    ];

    mockSuccess(mockProjects);

    const result = await getProjects({ page: 1, rowsPerPage: 10, filter: { projectName: 'test' } });

    expect(mockApiRequest).toHaveBeenCalledWith({
      url: requestOptions.url,
      method: requestOptions.method
    });
    expect(result).toEqual([
      {
        id: '2',
        projectName: 'Project B',
        status: 'completed',
        lastUpdate: '2024-01-02T12:00:00Z',
        manager: { managerName: 'Jane Smith' }
      },
      { ...mockProject }
    ]);
  });

  it('should throw an error if getProjects fails', async () => {
    mockFailure('Network Error');
    await expect(getProjects({})).rejects.toThrow('Error fetching projects: Network Error');
  });

  it('should fetch and return a project by id', async () => {
    requestOptions.url = `${process.env.API_URL}/projects/1`;
    requestOptions.method = 'GET';

    mockSuccess(mockProject);

    const result = await getProjectById('1');

    expect(mockApiRequest).toHaveBeenCalledWith({
      url: requestOptions.url,
      method: requestOptions.method
    });
    expect(result).toEqual(mockProject);
  });

  it('should throw an error if getProjectById fails', async () => {
    mockFailure('Network Error');
    await expect(getProjectById('1')).rejects.toThrow('Network Error');
  });

  it('should create a project and return the result', async () => {
    requestOptions.url = `${process.env.API_URL}/projects`;
    requestOptions.method = 'POST';
    requestOptions.data = mockProject;

    mockSuccess(mockProject);

    const result = await createProject(mockProject);

    expect(mockApiRequest).toHaveBeenCalledWith({
      url: requestOptions.url,
      method: requestOptions.method,
      data: requestOptions.data
    });
    expect(result).toEqual(mockProject);
  });

  it('should throw an error if createProject fails', async () => {
    mockFailure('Network Error');
    await expect(createProject(mockProject)).rejects.toThrow('Network Error');
  });

  it('should update a project by id and return the result', async () => {
    requestOptions.url = `${process.env.API_URL}/projects/1`;
    requestOptions.method = 'PUT';
    requestOptions.data = mockProjectUpdated;

    mockSuccess(mockProjectUpdated);

    const result = await updateProject('1', mockProjectUpdated);

    expect(mockApiRequest).toHaveBeenCalledWith({
      url: requestOptions.url,
      method: requestOptions.method,
      data: requestOptions.data
    });
    expect(result).toEqual(mockProjectUpdated);
  });

  it('should throw an error if updateProject fails', async () => {
    mockFailure('Network Error');
    await expect(updateProject('1', mockProjectUpdated)).rejects.toThrow('Network Error');
  });

  it('should delete a project by id and return success', async () => {
    requestOptions.url = `${process.env.API_URL}/projects/1`;
    requestOptions.method = 'DELETE';

    mockSuccess({ success: true });

    const result = await deleteProject('1');

    expect(mockApiRequest).toHaveBeenCalledWith({
      url: requestOptions.url,
      method: requestOptions.method
    });
    expect(result).toEqual({ success: true });
  });

  it('should throw an error if deleteProject fails', async () => {
    mockFailure('Network Error');
    await expect(deleteProject('1')).rejects.toThrow('Network Error');
  });
});
