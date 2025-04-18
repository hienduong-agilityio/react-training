'use client';

// Enums
import { BUTTON_COLORS, BUTTON_VARIANTS, STATUS } from '@/enums';

// Interfaces
import type { IProjectItemProps } from '@/interfaces';

// Components
import { InputField, SelectField, Spinner, FormActionButton } from '@/components';

// Svg
import arrowRight from '@public/images/arrowRightIcon.svg';

export interface IProjectFormFieldsProps {
  initialFormValues: IProjectItemProps;
  formErrorsMessages: Record<string, string>;
  isQueryProjectDetailPending: boolean;
  title: string;
  handleCancelForm: () => void;
  formAction: (formData: FormData) => void;
}

export const ProjectFormFields = ({
  initialFormValues,
  formErrorsMessages,
  isQueryProjectDetailPending,
  title,
  handleCancelForm,
  formAction
}: IProjectFormFieldsProps): JSX.Element => {
  return (
    <form key={initialFormValues.id} className='relative space-y-4' action={formAction}>
      {isQueryProjectDetailPending && title !== 'Add Project' && (
        <div className='absolute inset-0 flex flex-col gap-5 justify-center items-center bg-opacity-30 bg-white z-10'>
          <Spinner size='large' />
          <p>Loading project details...</p>
        </div>
      )}

      <div className='flex flex-col gap-7 px-4'>
        <InputField
          id='projectName'
          label='Project Name *'
          name='projectName'
          required
          pattern='[a-zA-Z0-9 ]*'
          defaultValue={initialFormValues.projectName}
          errorMessage={formErrorsMessages.projectName}
          customClasses='h-12'
        />

        <InputField
          id='managerName'
          label='Project Manager (PM)'
          name='managerName'
          required
          pattern='[a-zA-Z ]*'
          defaultValue={initialFormValues.manager?.managerName}
          errorMessage={formErrorsMessages['manager.managerName']}
          customClasses='h-12'
        />

        <InputField
          id='managerImage'
          label='Manager Image URL'
          name='managerImage'
          type='url'
          pattern='^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$'
          defaultValue={initialFormValues.manager?.managerImage}
          errorMessage={formErrorsMessages['manager.managerImage']}
          customClasses='h-12'
        />

        <SelectField
          id='status'
          label='Status'
          name='status'
          customClasses='text-sm h-12'
          defaultValue={initialFormValues.status}
          errorMessage={formErrorsMessages.status}
          required
        >
          {Object.values(STATUS).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectField>

        <InputField
          id='resources'
          label='Resources'
          name='resources'
          type='number'
          defaultValue={initialFormValues.resources}
          errorMessage={formErrorsMessages.resources}
          customClasses='h-12'
        />

        <div className='flex flex-col gap-4 w-1/2'>
          <h4 className='text-lg font-medium text-gray-700'>Project Timeline</h4>
          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='timeStart'>From</label>
              <InputField
                id='timeStart'
                name='timeStart'
                type='date'
                defaultValue={initialFormValues.timeline?.timeStart}
                customClasses='h-12'
              />
            </div>
            <img src={arrowRight} className='w-5 h-5 mt-6' alt='Arrow Right' />
            <div className='flex flex-col w-full'>
              <label htmlFor='timeEnd'>To</label>
              <InputField
                id='timeEnd'
                name='timeEnd'
                type='date'
                defaultValue={initialFormValues.timeline?.timeEnd}
                customClasses='h-12'
              />
            </div>
          </div>
          {formErrorsMessages['timeline.timeEnd'] && (
            <span className='text-sm text-red-600'>{formErrorsMessages['timeline.timeEnd']}</span>
          )}
        </div>

        <InputField
          id='budget'
          label='Budget'
          name='budget'
          type='number'
          min={0}
          max={1000000}
          required
          defaultValue={initialFormValues.budget}
          errorMessage={formErrorsMessages.budget}
          customClasses='h-12'
        />
      </div>

      <div className='flex justify-end gap-4 bg-white py-5 px-4 rounded-b-xl border-t'>
        <FormActionButton
          type='button'
          color={BUTTON_COLORS.DANGER}
          variant={BUTTON_VARIANTS.OUTLINED}
          onClick={handleCancelForm}
          showSpinner={false}
        >
          Cancel
        </FormActionButton>
        <FormActionButton>{title}</FormActionButton>
      </div>
    </form>
  );
};
