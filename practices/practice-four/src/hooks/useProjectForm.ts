'use client';

// Libraries
import { useOptimistic } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

// Helpers
import { formatDateForInput, formatDateTime, validateFormValues } from '@/helpers';

// Validations
import { projectSchema } from '@/validations';

// Constants
import { ROUTE } from '@/constants';

// Stores
import { ToastStore } from '@/stores';

// Hooks
import { useProject } from '@/hooks';

// Types
import type { IProjectItemProps } from '@/interfaces';
import { STATUS } from '@/enums';

export const initialProjectFormState = {
  errors: {},
  message: ''
};

const placeholderValues: IProjectItemProps = {
  id: '',
  lastUpdate: formatDateTime(new Date().toISOString()),
  projectName: 'Loading...',
  manager: {
    managerName: 'Loading...',
    managerImage: ''
  },
  resources: '0',
  timeline: {
    timeStart: formatDateForInput(new Date().toISOString()),
    timeEnd: formatDateForInput(new Date().toISOString())
  },
  budget: 0,
  status: STATUS.ON_HOLD
};

const emptyProjectValues: IProjectItemProps = {
  id: '',
  lastUpdate: formatDateTime(new Date().toISOString()),
  projectName: '',
  manager: {
    managerName: '',
    managerImage: ''
  },
  resources: '',
  timeline: {
    timeStart: '',
    timeEnd: ''
  },
  budget: 0,
  status: STATUS.ON_HOLD
};

/**
 * Custom hook to manage project form state and actions
 *
 * @param title - Title of the form (Add Project or Edit Project)
 * @returns {Object} - Contains form action, initial form values, loading state, and error state
 */
export const useProjectForm = (title: string) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Toast store to show messages
  const { showToast } = ToastStore();

  // Fetch project details if editing an existing project
  const { data: projectDetail, isQueryProjectDetailPending, error, mutate } = useProject({ id });

  let initialData: IProjectItemProps;

  // If adding a new project, set initial data to empty values
  if (title === 'Add Project') {
    initialData = emptyProjectValues;
  } else if (isQueryProjectDetailPending) {
    initialData = placeholderValues;
  } else {
    const rawDetail = projectDetail as IProjectItemProps;

    initialData = {
      ...rawDetail,
      timeline: {
        timeStart: formatDateForInput(rawDetail.timeline?.timeStart ?? ''),
        timeEnd: formatDateForInput(rawDetail.timeline?.timeEnd ?? '')
      }
    };
  }

  const [optimisticValue, setOptimisticValue] = useOptimistic<IProjectItemProps, Partial<IProjectItemProps>>(
    initialData,
    (current, updates) => ({
      ...current,
      ...updates,
      manager: {
        ...current.manager,
        ...(updates.manager ?? {}),
        managerName: updates.manager?.managerName ?? current.manager?.managerName ?? ''
      },
      timeline: {
        ...current.timeline,
        ...(updates.timeline ?? {})
      }
    })
  );

  const formAction = async (_prevState: typeof initialProjectFormState, formData: FormData) => {
    const formValues: IProjectItemProps = {
      ...initialData,
      id: title === 'Add Project' ? uuidv4() : (id ?? ''),
      lastUpdate: formatDateTime(new Date().toISOString()),
      projectName: formData.get('projectName') as string,
      manager: {
        managerName: formData.get('managerName') as string,
        managerImage: formData.get('managerImage') as string
      },
      resources: formData.get('resources') as string,
      timeline: {
        timeStart: formatDateForInput(formData.get('timeStart') as string),
        timeEnd: formatDateForInput(formData.get('timeEnd') as string)
      },
      budget: Number(formData.get('budget')),
      status: formData.get('status') as STATUS
    };

    const isDraft = formData.get('_draft') === 'true';
    const errors = validateFormValues(projectSchema, formValues);
    if (!isDraft && Object.keys(errors).length > 0) {
      return { errors, message: 'Validation failed' };
    }

    setOptimisticValue(formValues);

    try {
      if (title === 'Add Project') {
        await mutate.addProject(formValues);
        showToast('Project added successfully', 'success');
      } else {
        await mutate.editProject({ projectId: id!, updatedProject: formValues });
        showToast('Project updated successfully', 'success');
      }

      if (!isDraft) navigate(ROUTE.PROJECT);
      return { errors: {}, message: isDraft ? 'Draft saved' : 'Success' };
    } catch (err) {
      console.error(err);
      showToast('Something went wrong. Please try again.', 'error');
      return { errors: {}, message: 'Error occurred' };
    }
  };

  return {
    formAction,
    initialFormValues: optimisticValue,
    isQueryProjectDetailPending: title === 'Add Project' ? false : isQueryProjectDetailPending,
    projectDetailsError: title === 'Add Project' ? null : error
  };
};
