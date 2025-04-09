// Libraries
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useActionState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const initialState = {
  errors: {},
  message: ''
};
export interface IFormState {
  errors: Record<string, string>;
  message: string;
}

const ProjectFormPage = ({ title = '' }: { title: string }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = ToastStore();

  const project = useProject({ id });
  const {
    data: projectDetail,
    isQueryProjectDetailPending,
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

  // Define action handler for form
  const formAction = async (prevState: IFormState, formData: FormData): Promise<IFormState> => {
    console.log('prevState:', prevState);

    const formValues: IProjectItemProps = {
      ...initialFormValues,
      id: title === 'Add Project' ? uuidv4() : id || '',
      lastUpdate: formatDateTime(new Date().toISOString()),
      projectName: formData.get('projectName') as string,
      manager: {
        managerName: formData.get('managerName') as string,
        managerImage: formData.get('managerImage') as string
      },
      resources: formData.get('resources') as string,
      timeline: {
        timeStart: formatDate(formData.get('timeStart') as string),
        timeEnd: formatDate(formData.get('timeEnd') as string)
      },
      budget: Number(formData.get('budget')),
      status: formData.get('status') as STATUS
    };

    const errorMessages = validateFormValues(projectSchema, formValues);

    if (Object.keys(errorMessages).length > 0) {
      return { errors: errorMessages, message: 'Validation failed' };
    }

    try {
      if (title === 'Add Project') {
        await addProject(formValues);
        showToast('Project added successfully', 'success');
      } else {
        await editProject({ projectId: id!, updatedProject: formValues });
        showToast('Project updated successfully', 'success');
      }
      navigate(ROUTE.PROJECT);
      return { errors: {}, message: 'Success' };
    } catch (error) {
      return {
        errors: {},
        message: title === 'Add Project' ? 'Failed to add project' : 'Failed to update project'
      };
    }
  };

  const [formState, actionDispatch] = useActionState(formAction, initialState);

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
      formErrorsMessages={formState.errors}
      isQueryProjectDetailPending={isQueryProjectDetailPending}
      title={title}
      handleCancelForm={handleCancelForm}
      formAction={actionDispatch}
    />
  );
};

export default ProjectFormPage;
