import { renderHook, act } from '@testing-library/react';
import { useProjectForm, initialProjectFormState } from '@/hooks/useProjectForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastStore } from '@/stores';
import { useProject } from '@/hooks/useProject';
import { STATUS } from '@/enums';
import { validateFormValues } from '@/helpers';
import { v4 as uuidv4 } from 'uuid';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('@/stores', () => ({
  ToastStore: jest.fn()
}));

jest.mock('@/hooks/useProject', () => ({
  useProject: jest.fn()
}));

jest.mock('@/helpers', () => ({
  ...jest.requireActual('@/helpers'),
  validateFormValues: jest.fn()
}));

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

describe('useProjectForm', () => {
  const mockNavigate = jest.fn();
  const mockShowToast = jest.fn();
  const mockMutate = {
    addProject: jest.fn(),
    editProject: jest.fn()
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (ToastStore as unknown as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (uuidv4 as jest.Mock).mockReturnValue('test-uuid');
  });

  afterEach(jest.clearAllMocks);

  it('should handle Add Project and navigate on success', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    (useProject as jest.Mock).mockReturnValue({
      data: null,
      isQueryProjectDetailPending: false,
      error: null,
      mutate: mockMutate
    });

    const { result } = renderHook(() => useProjectForm('Add Project'));

    const formData = new FormData();
    formData.append('projectName', 'New Project');
    formData.append('managerName', 'Manager');
    formData.append('managerImage', 'image.jpg');
    formData.append('resources', '5');
    formData.append('timeStart', '2024-01-01');
    formData.append('timeEnd', '2024-12-31');
    formData.append('budget', '1000');
    formData.append('status', STATUS.ON_HOLD);

    (validateFormValues as jest.Mock).mockReturnValue({});

    await act(async () => {
      const res = await result.current.formAction(initialProjectFormState, formData);
      expect(res).toEqual({ errors: {}, message: 'Success' });
    });

    expect(mockMutate.addProject).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'test-uuid',
        projectName: 'New Project'
      })
    );

    expect(mockShowToast).toHaveBeenCalledWith('Project added successfully', 'success');
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should handle Edit Project success and navigate', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'project-123' });
    (useProject as jest.Mock).mockReturnValue({
      data: { id: 'project-123', projectName: 'Old Project', timeline: {} },
      isQueryProjectDetailPending: false,
      error: null,
      mutate: mockMutate
    });

    const { result } = renderHook(() => useProjectForm('Edit Project'));

    const formData = new FormData();
    formData.append('projectName', 'Updated Project');
    formData.append('managerName', 'Manager');
    formData.append('managerImage', 'image.jpg');
    formData.append('resources', '10');
    formData.append('timeStart', '2024-01-01');
    formData.append('timeEnd', '2024-12-31');
    formData.append('budget', '1500');
    formData.append('status', STATUS.ON_HOLD);

    (validateFormValues as jest.Mock).mockReturnValue({});

    await act(async () => {
      const res = await result.current.formAction(initialProjectFormState, formData);
      expect(res).toEqual({ errors: {}, message: 'Success' });
    });

    expect(mockMutate.editProject).toHaveBeenCalledWith({
      projectId: 'project-123',
      updatedProject: expect.objectContaining({ projectName: 'Updated Project' })
    });

    expect(mockShowToast).toHaveBeenCalledWith('Project updated successfully', 'success');
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should handle Edit Project with validation errors correctly', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'project-123' });
    (useProject as jest.Mock).mockReturnValue({
      data: { id: 'project-123', projectName: 'Existing Project' },
      isQueryProjectDetailPending: false,
      error: null,
      mutate: mockMutate
    });

    const { result } = renderHook(() => useProjectForm('Edit Project'));

    const formData = new FormData();
    formData.append('projectName', ''); // invalid input
    formData.append('_draft', 'false');

    (validateFormValues as jest.Mock).mockReturnValue({ projectName: 'Required' });

    await act(async () => {
      const res = await result.current.formAction(initialProjectFormState, formData);
      expect(res).toEqual({ errors: { projectName: 'Required' }, message: 'Validation failed' });
    });

    expect(mockMutate.editProject).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handles errors during mutation', async () => {
    (useProject as jest.Mock).mockReturnValue({
      data: null,
      isQueryProjectDetailPending: false,
      error: null,
      mutate: mockMutate
    });

    mockMutate.addProject.mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useProjectForm('Add Project'));

    const formData = new FormData();
    formData.append('projectName', 'New Project');
    formData.append('managerName', 'Manager');
    formData.append('managerImage', 'image.jpg');
    formData.append('resources', '5');
    formData.append('timeStart', '2024-01-01');
    formData.append('timeEnd', '2024-12-31');
    formData.append('budget', '1000');
    formData.append('status', STATUS.ON_HOLD);

    (validateFormValues as jest.Mock).mockReturnValue({});

    await act(async () => {
      const res = await result.current.formAction(initialProjectFormState, formData);
      expect(res).toEqual({ errors: {}, message: 'Error occurred' });
    });

    expect(mockShowToast).toHaveBeenCalledWith('Something went wrong. Please try again.', 'error');
  });
});
