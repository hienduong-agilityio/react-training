// Libraries
import { renderHook, act } from '@testing-library/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '@/services';

// Hooks
import { useProject } from '@/hooks';

// Types
import type { IProjectItemProps } from '@/interfaces';

// Mocks
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn()
}));

jest.mock('@/services/projects', () => ({
  getProjects: jest.fn(),
  getProjectById: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn()
}));

/**
 useProject hook
  √ should fetch project list correctly
  √ should fetch project detail when id is provided
  √ should handle project creation
  √ should handle project editing
  √ should handle project deletion
 */
describe('useProject hook', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };
  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  test('should fetch project list correctly', async () => {
    const mockProjectsData: IProjectItemProps[] = [
      {
        id: '1',
        projectName: 'Project 1',
        status: 'active',
        lastUpdate: '2024-10-10T12:00:00Z'
      }
    ];
    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
      queryFn();
      return {
        isPending: false,
        data: { pages: [{ data: mockProjectsData }] }
      };
    });

    const { result } = renderHook(() => useProject({ page: 1, rowsPerPage: 5, filter: { status: 'active' } }));

    expect(getProjects).toHaveBeenCalledWith({
      page: 1,
      rowsPerPage: 5,
      filter: { status: 'active' }
    });
    expect(result.current.isQueryProjectsPending).toBe(false);
    expect(result.current.data).toEqual({ pages: [{ data: mockProjectsData }] });
  });

  test('should fetch project detail when id is provided', async () => {
    const mockProjectDetail: IProjectItemProps = {
      id: '1',
      projectName: 'Project 1',
      status: 'active',
      lastUpdate: '2024-10-10T12:00:00Z'
    };
    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
      queryFn();
      return {
        isPending: false,
        data: mockProjectDetail
      };
    });

    const { result } = renderHook(() => useProject({ id: '1' }));

    expect(getProjectById).toHaveBeenCalledWith('1');
    expect(result.current.isQueryProjectDetailPending).toBe(false);
    expect(result.current.data).toEqual(mockProjectDetail);
  });

  test('should handle project creation', async () => {
    const newProject: IProjectItemProps = {
      id: '2',
      projectName: 'New Project',
      status: 'active',
      lastUpdate: '2024-10-10T12:00:00Z'
    };
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => ({
      mutateAsync: async (newProject: IProjectItemProps) => {
        await mutationFn(newProject);
        onSuccess();
      }
    }));

    const { result } = renderHook(() => useProject({}));

    await act(async () => {
      await result.current.mutate.addProject(newProject);
    });

    expect(createProject).toHaveBeenCalledWith(newProject);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['projects'] });
  });

  test('should handle project editing', async () => {
    const updatedProject: IProjectItemProps = {
      id: '1',
      projectName: 'Updated Project',
      status: 'active',
      lastUpdate: '2024-10-10T12:00:00Z'
    };
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => ({
      mutateAsync: async ({ projectId, updatedProject }: { projectId: string; updatedProject: IProjectItemProps }) => {
        await mutationFn({ projectId, updatedProject });
        onSuccess();
      }
    }));

    const { result } = renderHook(() => useProject({}));

    await act(async () => {
      await result.current.mutate.editProject({ projectId: '1', updatedProject });
    });

    expect(updateProject).toHaveBeenCalledWith('1', updatedProject);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['projects'] });
  });

  test('should handle project deletion', async () => {
    const projectId = '1';
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => ({
      mutateAsync: async (projectId: string) => {
        await mutationFn(projectId);
        onSuccess();
      }
    }));

    const { result } = renderHook(() => useProject({}));

    await act(async () => {
      await result.current.mutate.deleteProject(projectId);
    });

    expect(deleteProject).toHaveBeenCalledWith(projectId);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['projects'] });
  });
});
