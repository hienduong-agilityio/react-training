// Components
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';

// Enums
import { BUTTON_COLORS, BUTTON_VARIANTS } from '@/enums/theme';

// Hooks
import { useProject } from '@/hooks/useProject';

// Store
import { ToastStore } from '@/stores/toastStore';

// Types
import type { IProjectItemProps } from '@/interfaces';

export interface IDeleteProjectModalProps {
  // projectId: The project id.
  projectId: string;
  // isModalOpen: A boolean indicating whether the modal is open.
  isModalOpen: boolean;
  // onCloseModal: A function to be called when the modal is requested to be closed.
  onCloseModal: () => void;
}

/**
 * The custom DeleteProjectModal component
 *
 * @returns {JSX.Element} - The DeleteProjectModal element
 */
export const DeleteProjectModal = ({
  projectId,
  isModalOpen = false,
  onCloseModal = () => {}
}: IDeleteProjectModalProps): JSX.Element => {
  const project = useProject({ id: projectId || '' });
  const { showToast } = ToastStore();

  const {
    mutate: { deleteProject },
    data: projectDetail,
    isMutating
  } = project;

  const projectName = (projectDetail as IProjectItemProps)?.projectName || 'this project';

  const handleDeleteProjectSuccess = () => {
    showToast('Project Deleted successfully', 'success');
    onCloseModal();
  };

  const handleDeleteProjectError = () => {
    showToast('Failed to deleted project', 'error');
    onCloseModal();
  };

  const handleDelete = () => {
    if (projectId) {
      deleteProject(projectId, {
        onSuccess: handleDeleteProjectSuccess,
        onError: handleDeleteProjectError
      });
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <div className='bg-light rounded-t-xl p-4 w-[440px]'>
        <p className='text-lg font-semibold text-gray-900 mb-3'>Delete Project</p>
        <p className='leading-6 text-gray-600'>
          Are you sure you want to delete <strong>{projectName}</strong>? If you delete, it will be permanently lost.
        </p>
      </div>
      <div className='bg-light rounded-b-xl flex justify-end gap-4 border-t-2 py-3'>
        <Button onClick={onCloseModal} variant={BUTTON_VARIANTS.OUTLINED}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          disabled={isMutating}
          variant={BUTTON_VARIANTS.CONTAINED}
          color={BUTTON_COLORS.DANGER}
          customClasses='mr-5'
        >
          {isMutating ? <Spinner /> : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};
