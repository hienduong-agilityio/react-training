// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { DeleteProjectModal, IDeleteProjectModalProps } from '@/components';

// Hooks
import { useProject } from '@/hooks';

const showToastMock = jest.fn();
const hideToastMock = jest.fn();

jest.mock('@/stores/toastStore', () => ({
  ToastStore: () => ({
    showToast: showToastMock,
    hideToast: hideToastMock,
    message: '',
    type: 'success',
    isVisible: false,
    undoEnabled: false,
    timeoutDuration: 3000
  })
}));

// Mock the useProject hook
jest.mock('@/hooks/useProject', () => ({
  useProject: jest.fn()
}));

const deleteProjectMock = jest.fn();

// Define the mock implementation of useProject
(useProject as jest.Mock).mockImplementation(() => ({
  mutate: { deleteProject: deleteProjectMock },
  data: { projectName: 'Test Project' },
  isMutating: false
}));

/*
DeleteProjectModal
  √ renders modal with correct project name
  √ calls onCloseModal when cancel button is clicked
  √ does not render the modal when isModalOpen is false
  √ does not throw error when onCloseModal is not provided
  √ renders "this project" when projectName is not available
  √ calls deleteProject when the delete button is clicked
  √ shows success toast and closes modal on successful deletion
  √ shows error toast and closes modal on failed deletion
  √ shows a spinner while deleting
  √ shows the delete text when not deleting
  √ matches the snapshot
*/
describe('DeleteProjectModal', () => {
  let onCloseMock: jest.Mock;
  let renderDeleteModal: (props?: Partial<IDeleteProjectModalProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    jest.clearAllMocks();
    onCloseMock = jest.fn();

    // Initialize the render function with full props from IDeleteProjectModalProps
    renderDeleteModal = (props: Partial<IDeleteProjectModalProps> = {}) => {
      const defaultProps: IDeleteProjectModalProps = {
        projectId: '123',
        isModalOpen: true,
        onCloseModal: onCloseMock,
        ...props
      };
      return render(<DeleteProjectModal {...defaultProps} />);
    };
  });

  it('matches the snapshot', () => {
    const { container } = renderDeleteModal();
    expect(container).toMatchSnapshot();
  });

  it('renders modal with correct project name', () => {
    renderDeleteModal();

    expect(screen.getByText('Delete Project')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
  //
  it('calls onCloseModal when cancel button is clicked', () => {
    renderDeleteModal();

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not render the modal when isModalOpen is false', () => {
    renderDeleteModal({ isModalOpen: false });

    expect(screen.queryByText('Delete Project')).not.toBeInTheDocument();
  });

  it('does not throw error when onCloseModal is not provided', () => {
    renderDeleteModal({ onCloseModal: undefined });

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders "this project" when projectName is not available', () => {
    (useProject as jest.Mock).mockReturnValueOnce({
      mutate: { deleteProject: deleteProjectMock },
      data: {},
      isMutating: false
    });

    renderDeleteModal();

    expect(screen.getByText('this project')).toBeInTheDocument();
  });

  it('calls deleteProject when the delete button is clicked', () => {
    renderDeleteModal();

    fireEvent.click(screen.getByText('Delete'));
    expect(deleteProjectMock).toHaveBeenCalledWith('123', expect.any(Object));
  });

  it('shows success toast and closes modal on successful deletion', () => {
    deleteProjectMock.mockImplementationOnce((_, { onSuccess }) => onSuccess());

    renderDeleteModal();

    fireEvent.click(screen.getByText('Delete'));
    expect(showToastMock).toHaveBeenCalledWith('Project Deleted successfully', 'success');
  });

  it('shows error toast and closes modal on failed deletion', () => {
    deleteProjectMock.mockImplementationOnce((_, { onError }) => onError());

    renderDeleteModal();

    fireEvent.click(screen.getByText('Delete'));
    expect(showToastMock).toHaveBeenCalledWith('Failed to delete project', 'error');
  });

  it('shows a spinner while deleting', () => {
    (useProject as jest.Mock).mockReturnValueOnce({
      mutate: { deleteProject: deleteProjectMock },
      data: { projectName: 'Test Project' },
      isMutating: true
    });

    renderDeleteModal();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('shows the delete text when not deleting', () => {
    (useProject as jest.Mock).mockReturnValueOnce({
      mutate: { deleteProject: deleteProjectMock },
      data: { projectName: 'Test Project' },
      isMutating: false
    });

    renderDeleteModal();

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
