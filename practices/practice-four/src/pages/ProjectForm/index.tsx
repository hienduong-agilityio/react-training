// Libraries
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams, Navigate } from 'react-router-dom';

// Components
import { ProjectFormFields } from './ProjectFormFields';

// Enums
import { STATUS } from '@/enums';

// Types
import type { IProjectItemProps } from '@/interfaces';

// Helper
import { formatDate, formatDateForInput, formatDateTime, validateFormValues } from '@/helpers';

// Schemas
import { projectSchema } from '@/validations';

// Hook
import { useProject } from '@/hooks';

// Constants
import { ROUTE } from '@/constants';

// Store
import { ToastStore } from '@/stores';

interface IProjectForm {
  // title: The title for project form page
  title: string;
}

interface IProjectFormData extends IProjectItemProps {}

/**
 * ProjectFormPage component
 *
 * @returns {JSX.Element} - ProjectFormPage element.
 */
const ProjectFormPage = ({ title = '' }: IProjectForm): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [formErrorsMessages, setFormErrorsMessages] = useState<Record<string, string>>({});

  const project = useProject({ id: id });
  const { showToast } = ToastStore();

  const {
    data: projectDetail,
    isQueryProjectDetailPending,
    isMutating,
    error: projectDetailsError,
    mutate: { addProject, editProject }
  } = project;

  const {
    lastUpdate = formatDateTime(new Date().toISOString()),
    projectName = '',
    manager: { managerName = '', managerImage = '' } = {},
    resources,
    timeline: { timeStart = '', timeEnd = '' } = {},
    budget,
    status
  } = (projectDetail as IProjectItemProps) || {};

  const initialFormValues: IProjectItemProps = {
    id: id || '',
    lastUpdate,
    projectName,
    manager: {
      managerName,
      managerImage
    },
    resources,
    timeline: {
      timeStart: formatDateForInput(timeStart),
      timeEnd: formatDateForInput(timeEnd)
    },
    budget,
    status
  };

  const handleAddProjectSuccess = () => {
    showToast('Project added successfully', 'success');
    navigate(ROUTE.PROJECT);
  };

  const handleAddProjectError = () => {
    showToast('Failed to add project', 'error');
  };

  const handleEditProjectSuccess = () => {
    showToast('Project updated successfully', 'success');
    navigate(ROUTE.PROJECT);
  };

  const handleEditProjectError = () => {
    showToast('Failed to update project', 'error');
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Create an object for form values
    const formValues: IProjectFormData = {
      ...initialFormValues,
      id: uuidv4(),
      lastUpdate: formatDateTime(new Date().toISOString()),
      projectName: formData.get('projectName') as string,
      manager: {
        managerName: formData.get('managerName') as string,
        managerImage: formData.get('managerImage') as string
      },
      resources: (formData.get('resources') as string) || '',
      timeline: {
        timeStart: formatDate(formData.get('timeStart') as string),
        timeEnd: formatDate(formData.get('timeEnd') as string)
      },
      budget: Number(formData.get('budget')),
      status: formData.get('status') as STATUS
    };

    const errorMessages = validateFormValues(projectSchema, formValues);

    if (Object.keys(errorMessages).length > 0) {
      setFormErrorsMessages(errorMessages);
      return;
    }

    if (title === 'Add Project') {
      addProject(formValues, {
        onSuccess: handleAddProjectSuccess,
        onError: handleAddProjectError
      });
    } else {
      editProject(
        { projectId: id || '', updatedProject: formValues },
        {
          onSuccess: handleEditProjectSuccess,
          onError: handleEditProjectError
        }
      );
    }
  };

  const handleCancelForm = () => {
    if (window.history.length > 1) {
      navigate(-1);
    }
  };

  // If the project is not found, redirect to a 404 page
  if (projectDetailsError) {
    return <Navigate to='/404' replace />;
  }

  return (
    <ProjectFormFields
      initialFormValues={initialFormValues}
      formErrorsMessages={formErrorsMessages}
      isMutating={isMutating}
      isQueryProjectDetailPending={isQueryProjectDetailPending}
      title={title}
      handleCancelForm={handleCancelForm}
      handleSubmitForm={handleSubmitForm}
    />
  );
};

export default ProjectFormPage;
