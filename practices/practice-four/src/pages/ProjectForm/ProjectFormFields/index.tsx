// Libraries
import { FormEvent, useEffect, useState } from 'react';

// Components
import { InputField, SelectField, Button, Spinner } from '@/components';

// Enums
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS, STATUS } from '@/enums';

// SVG
import arrowRight from '@public/images/arrowRightIcon.svg';

// Types
import type { IProjectItemProps } from '@/interfaces';

/**
* TODO:
  - The form needs to include:
  - Dirty handler: To track and handle changes in the form.
  - Rollback handler: To revert to the previous state if necessary.
  - Temporary save change (draft): To temporarily save changes so users can continue later.
 */

export interface IProjectFormFieldsProps {
  // initialFormValues: The object for form value
  initialFormValues: IProjectItemProps;
  // formErrorsMessages: Error message for form input
  formErrorsMessages: Record<string, string>;
  // isMutating: Mutation pending when edit and add project
  isMutating: boolean;
  // isQueryProjectDetailPending: The pending when get project details
  isQueryProjectDetailPending: boolean;
  // title: The form title
  title: string;
  // handleCancelForm: Handle cancel form button
  handleCancelForm: () => void;
  // handleSubmitForm: Handle submit form button
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * ProjectFormFields component
 *
 * @returns {JSX.Element} - ProjectFormFields element.
 */
export const ProjectFormFields = ({
  initialFormValues,
  formErrorsMessages,
  isMutating,
  isQueryProjectDetailPending,
  title,
  handleCancelForm,
  handleSubmitForm
}: IProjectFormFieldsProps): JSX.Element => {
  const [status, setStatus] = useState<string | undefined>(undefined); // Initialize as undefined

  // Set the status when the component mounts or when initialFormValues changes
  useEffect(() => {
    if (initialFormValues.status) {
      setStatus(initialFormValues.status); // Set status from initialFormValues
    }
  }, [initialFormValues.status]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value); // Update the local state
  };

  return (
    <form className='relative space-y-4' onSubmit={handleSubmitForm}>
      {isQueryProjectDetailPending && title !== 'Add Project' && (
        <div className='absolute inset-0 flex flex-col gap-5 justify-center items-center bg-opacity-30 bg-white z-10'>
          <Spinner size='large' />
          <p>Please waiting ...</p>
        </div>
      )}
      <div className='flex rounded-t-xl items-center bg-white justify-between p-4'>
        <p className='text-xl font-semibold text-gray-900'>{title}</p>
      </div>
      <div className='flex flex-col gap-7 px-4'>
        <InputField
          id='projectName'
          label='Project Name *'
          errorMessage={formErrorsMessages.projectName}
          customClasses='h-12'
          name='projectName'
          placeholder='Enter project name'
          required
          pattern='[a-zA-Z0-9 ]*'
          defaultValue={initialFormValues.projectName}
        />
        <InputField
          id='managerName'
          label='Project Manager (PM)'
          customClasses='h-12'
          errorMessage={formErrorsMessages['manager.managerName']}
          name='managerName'
          placeholder='Enter project manager'
          required
          pattern='[a-zA-Z ]*'
          defaultValue={initialFormValues.manager?.managerName}
        />
        <InputField
          id='managerImage'
          label='Manager Image URL'
          customClasses='text-sm h-12'
          errorMessage={formErrorsMessages['manager.managerImage']}
          name='managerImage'
          pattern='^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$'
          placeholder='Enter image URL'
          type='url'
          defaultValue={initialFormValues.manager?.managerImage}
        />
        <SelectField
          id='status'
          label='Status'
          errorMessage={formErrorsMessages.status}
          customClasses='text-sm h-12'
          name='status'
          value={status}
          onChange={handleStatusChange}
        >
          <option value={STATUS.ON_TRACK}>{STATUS.ON_TRACK}</option>
          <option value={STATUS.POTENTIAL_RISK}>{STATUS.POTENTIAL_RISK}</option>
          <option value={STATUS.AT_RISK}>{STATUS.AT_RISK}</option>
          <option value={STATUS.ON_HOLD}>{STATUS.ON_HOLD}</option>
        </SelectField>
        <InputField
          id='resources'
          label='Resources'
          customClasses='h-12'
          errorMessage={formErrorsMessages.resources}
          name='resources'
          type='number'
          placeholder='Enter resources'
          defaultValue={initialFormValues.resources}
        />
        <div className='flex flex-col gap-4 w-1/2'>
          <h4 className='text-lg font-medium text-gray-700'>Project Timeline</h4>
          <div className='flex justify-between items-center gap-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='timeStart' className='mb-2 text-font-medium text-gray-700'>
                From
              </label>
              <InputField
                id='timeStart'
                name='timeStart'
                type='date'
                customClasses='text-sm h-12'
                defaultValue={initialFormValues.timeline?.timeStart}
              />
            </div>
            <img src={arrowRight} className='w-5 h-5 mt-6' alt='Arrow Right' />
            <div className='flex flex-col w-full'>
              <label htmlFor='timeEnd' className='mb-2 text-font-medium text-gray-700'>
                To
              </label>
              <InputField
                id='timeEnd'
                name='timeEnd'
                type='date'
                customClasses='text-sm h-12'
                defaultValue={initialFormValues.timeline?.timeEnd}
              />
            </div>
          </div>
          {formErrorsMessages['timeline.timeEnd'] && (
            <span className='mt-1 text-sm text-red-600'>{formErrorsMessages['timeline.timeEnd']}</span>
          )}
        </div>
        <InputField
          id='budget'
          label='Budget'
          name='budget'
          errorMessage={formErrorsMessages.budget}
          type='number'
          placeholder='US$ 00.00'
          customClasses='text-sm h-12'
          min={0}
          max={1000000}
          required
          defaultValue={initialFormValues.budget}
        />
      </div>
      <div className='flex items-center rounded-b-xl bg-white gap-5 py-5 px-4 justify-end border-gray-200'>
        <Button
          type='button'
          onClick={handleCancelForm}
          variant={BUTTON_VARIANTS.OUTLINED}
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.DANGER}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          disabled={isMutating}
          variant={BUTTON_VARIANTS.CONTAINED}
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
        >
          {isMutating ? <Spinner /> : title}
        </Button>
      </div>
    </form>
  );
};
