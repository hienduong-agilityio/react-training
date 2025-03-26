'use client';

import { useFormState } from 'react-dom';

// Components
import { Checkbox, CommonFormField, SubmitButton } from '../../components';

// Hooks
import { useInputStatus } from '../../hooks';

// Constants
import { REGISTER_FIELDS, ROUTE } from '../../constants';

// Types
import type { IFormState } from '../../interfaces';

// Helpers
import { handleFormSubmit, initialState } from '../../helpers';
import FormLayout from '../../components/FormLayout';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const { handleInputEvent, getIconColor, getContainerClass } = useInputStatus(
    REGISTER_FIELDS.map((field) => field.id)
  );

  const [formState, setFormState] = useFormState(
    (prevState: IFormState, formData: FormData) => handleFormSubmit('register', prevState, formData),
    initialState
  );

  return (
    <FormLayout title='Let’s Get Started' subtitle='Create your account'>
      <form
        aria-label=''
        action={setFormState}
        className='flex flex-col gap-5 w-full sm:w-[90%] md:w-[80%] lg:w-[343px]'
      >
        {REGISTER_FIELDS.map(({ id, type, placeholder, icon }) => (
          <CommonFormField
            key={id}
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            icon={icon}
            errorMessages={formState.errors}
            handleInputEvent={handleInputEvent}
            getIconColor={getIconColor}
            getContainerClass={getContainerClass}
            autoComplete={type === 'password' ? 'new-password' : 'off'}
          />
        ))}

        <Checkbox id='agree_to_terms' required label='I agree to the terms and conditions.' />

        <SubmitButton text='Sign Up' />

        <p className='text-center text-secondary-500 text-xs sm:text-sm lg:text-base'>
          Have an account?{' '}
          <Link to={ROUTE.LOGIN} className='text-primary-200 font-bold'>
            Sign In
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default RegisterForm;
