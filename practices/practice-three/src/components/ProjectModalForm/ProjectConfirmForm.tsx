// Components
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

// Enums
import { BUTTON_COLORS, BUTTON_VARIANTS } from '@/enums/theme';

// Hooks
import { useProjectContext } from '@/stores/ProjectProvider';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

// Types
import type { IProjectItemProps } from '@/components/ProjectItem';

interface DeleteConfirmationModalProps {
  // isOpen: A boolean indicating whether the modal is open.
  isOpen: boolean;
  // onClose: A function to be called when the modal is requested to be closed.
  onClose: () => void;
  // projectID: The ID of the project to be managed
  projectId: string;
}

/**
 * The custom DeleteConfirmationModal component
 *
 * @returns {JSX.Element} - The DeleteConfirmationModal element
 */
const DeleteConfirmationModal = ({ isOpen, onClose, projectId }: DeleteConfirmationModalProps) => {
  const { state, dispatch } = useProjectContext();

  const projectItem = state.data.find((project: IProjectItemProps) => project.id === state.selectedProjectId);

  const projectItemName = projectItem ? projectItem.projectName : 'This project';

  const handleDelete = () => {
    dispatch({
      type: DISPATCH_ACTION.DELETE_PROJECT_ITEM,
      payload: projectId
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-light rounded-t-xl p-4 w-[440px]'>
        <p className='text-lg font-semibold text-gray-900 mb-3'>Delete Project</p>
        <p className='leading-6 text-gray-600'>
          Are you sure you want to delete <strong>{projectItemName}</strong>? If you delete, it will be permanently
          lost.
        </p>
      </div>
      <div className='bg-light rounded-b-xl flex justify-end gap-4 border-t-2 py-3'>
        <Button onClick={onClose} variant={BUTTON_VARIANTS.OUTLINED}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant={BUTTON_VARIANTS.CONTAINED}
          color={BUTTON_COLORS.DANGER}
          customClasses='mr-5'
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
