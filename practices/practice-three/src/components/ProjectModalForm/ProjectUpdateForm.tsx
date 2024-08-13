// Libraries
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';

// Enums
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums/theme';
import { STATUS } from '@/enums/status';

// SVG
import arrowRight from '@public/images/arrowRightIcon.svg';

// Hooks
import { useProjectContext } from '@/stores/ProjectProvider';

// Types
import type { IProjectItemProps } from '@/components/ProjectItem';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

// Helper
import { formatDate, formatDateForInput, formatDateTime } from '@/helper/formatDateTime';

interface IProjectModalForm {
  // title: A title for Form modal.
  title: string;
  // isOpen: A boolean indicating whether the modal is open.
  isOpen: boolean;
  // onClose: A function to be called when the modal is requested to be closed.
  onClose?: () => void;
}

interface IProjectFormData extends IProjectItemProps {}

/**
 * ProjectModalForm component
 *
 * @returns {JSX.Element} - ProjectModalForm element.
 */
const ProjectModalForm = ({ title, isOpen, onClose = () => {} }: IProjectModalForm): JSX.Element => {
  const { state, dispatch } = useProjectContext();
  const [formErrorsMessages, setFormErrorsMessages] = useState<string>('');

  // Determine the current project item being edited
  const projectItem = state.data.find((project: IProjectItemProps) => project.id === state.selectedProjectId);

  const isEditingProject = !!projectItem;

  // Set initial form state with project item values if editing
  const initialFormValues = {
    id: projectItem?.id || uuidv4(),
    projectName: projectItem?.projectName || '',
    managerName: projectItem?.managerName || '',
    resources: projectItem?.resources || '',
    timeStart: formatDateForInput(projectItem?.timeline?.timeStart || '') || '',
    timeEnd: formatDateForInput(projectItem?.timeline?.timeEnd || '') || '',
    managerImage: projectItem?.managerImage || '',
    estimation: projectItem?.estimation || '',
    status: projectItem?.status || STATUS.ON_HOLD
  };

  // Handle close action and clear error messages for the modal
  const handleClose = () => {
    setFormErrorsMessages('');
    onClose();
  };

  /**
   * Function to handle form submit
   *
   * @param event - Form event
   */
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Create an object for form values
    const formValues: IProjectFormData = {
      ...initialFormValues,
      lastUpdate: formatDateTime(new Date().toISOString()),
      projectName: formData.get('projectName') as string,
      managerName: formData.get('managerName') as string,
      resources: formData.get('resources') as string,
      timeline: {
        timeStart: formatDate(formData.get('timeStart') as string),
        timeEnd: formatDate(formData.get('timeEnd') as string)
      },
      estimation: formData.get('estimation') as string
    };

    if (isEditingProject) {
      handleEditProject(formValues);
    } else {
      handleCreateProject(formValues);
    }

    handleClose();
  };

  /**
   * Function to handle project creation
   *
   * @returns Object containing project form values
   */
  const handleCreateProject = (formValues: IProjectFormData) => {
    dispatch({
      type: DISPATCH_ACTION.ADD_PROJECT_ITEM,
      payload: formValues
    });
  };

  /**
   * Function to handle project editing
   *
   * @returns Object containing project form values
   */
  const handleEditProject = (formValues: IProjectFormData) => {
    dispatch({
      type: DISPATCH_ACTION.UPDATE_PROJECT_ITEM,
      payload: formValues
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className='bg-gray-50 space-y-4 rounded-xl'>
        <form className='space-y-4 w-[440px]' onSubmit={handleSubmitForm}>
          <div className='flex rounded-t-xl items-center bg-white justify-between p-4 border-b'>
            <p className='text-xl font-semibold text-gray-900'>{title}</p>
          </div>
          <div className='flex flex-col gap-3 px-4'>
            <InputField
              id='projectName'
              label='project name *'
              errorMessage={formErrorsMessages}
              name='projectName'
              placeholder='Enter project name'
              required
              defaultValue={initialFormValues.projectName}
            />
            <InputField
              id='managerName'
              label='project manager (PM)'
              name='managerName'
              placeholder='Enter project manager'
              defaultValue={initialFormValues.managerName}
            />
            <InputField
              id='resources'
              label='resources'
              name='resources'
              type='number'
              placeholder='Enter resources'
              defaultValue={initialFormValues.resources}
            />
            <div className='flex flex-col gap-4'>
              <h4 className='text-sm font-medium text-gray-700'>Project timeline</h4>
              <div className='flex justify-between items-center gap-4'>
                <div className='flex flex-col w-full'>
                  <label htmlFor='timeStart' className='mb-2 text-xs font-medium text-gray-700'>
                    From
                  </label>
                  <InputField
                    id='timeStart'
                    name='timeStart'
                    type='date'
                    customClasses='text-sm'
                    defaultValue={initialFormValues.timeStart}
                  />
                </div>
                <img src={arrowRight} className='w-5 h-5 mt-6' alt='Arrow Right' />
                <div className='flex flex-col w-full'>
                  <label htmlFor='timeEnd' className='mb-2 text-xs font-medium text-gray-700'>
                    To
                  </label>
                  <InputField
                    id='timeEnd'
                    name='timeEnd'
                    type='date'
                    customClasses='text-sm'
                    defaultValue={initialFormValues.timeEnd}
                  />
                </div>
              </div>
            </div>
            <InputField
              id='estimation'
              label='estimation'
              name='estimation'
              type='number'
              placeholder='US$ 00.00'
              customClasses='text-sm'
              min='0'
              defaultValue={initialFormValues.estimation}
            />
          </div>
          <div className='flex items-center rounded-b-xl bg-white gap-5 py-5 px-4 justify-end border-t border-gray-200'>
            <Button
              onClick={handleClose}
              variant={BUTTON_VARIANTS.OUTLINED}
              size={BUTTON_SIZES.SMALL}
              color={BUTTON_COLORS.DANGER}
              customClasses='h-7'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant={BUTTON_VARIANTS.CONTAINED}
              size={BUTTON_SIZES.SMALL}
              color={BUTTON_COLORS.PRIMARY}
            >
              {isEditingProject ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProjectModalForm;
