'use client';

// Libraries
import { useFormState } from 'react-dom';
import { Navigate, useNavigate } from 'react-router-dom';

// Hooks
import { initialProjectFormState, useProjectForm } from '@/hooks';

// Components
import { FormLayout, ProjectFormFields } from '@/components';

const ProjectFormPage = ({ title = '' }: { title: string }) => {
  const navigate = useNavigate();

  const { formAction, initialFormValues, isQueryProjectDetailPending, projectDetailsError } = useProjectForm(title);

  /**
   * useFormState is a hook that allows you to manage the state of a form.
   */
  const [formState, formActionDispatcher] = useFormState(formAction, initialProjectFormState);

  if (projectDetailsError) return <Navigate to='/404' replace />;

  const handleCancelForm = () => {
    if (window.history.length > 1) {
      navigate(-1);
    }
  };
  return (
    <FormLayout title={title}>
      <ProjectFormFields
        initialFormValues={initialFormValues}
        formErrorsMessages={formState.errors}
        isQueryProjectDetailPending={isQueryProjectDetailPending}
        title={title}
        handleCancelForm={handleCancelForm}
        formAction={formActionDispatcher}
      />
    </FormLayout>
  );
};

export default ProjectFormPage;
