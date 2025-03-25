'use client';

// Hooks
import { useInputStatus } from './hooks';

// Components
import { Button, CommonFormField, SubmitButton } from './components';

// UI

// Constants
import { AUTH_PROVIDERS, LOGIN_FIELDS, ROUTE } from './constants';
import { handleFormSubmit, initialState } from './helpers';
import { IFormState } from './interfaces';
import FormLayout from './components/FormLayout';
import { useActionState } from 'react';

// Helpers

const LoginForm = () => {
  const { handleInputEvent, getIconColor, getContainerClass } = useInputStatus(LOGIN_FIELDS.map((field) => field.id));

  const [formState, setFormState] = useActionState(
    async (prevState: IFormState, formData: FormData) => await handleFormSubmit('login', prevState, formData),
    initialState
  );

  return (
    <FormLayout title='Welcome to E-com' subtitle='Sign in to continue'>
      <form
        aria-label='Login form'
        action={setFormState}
        className='flex flex-col gap-5 w-full sm:w-[90%] md:w-[80%] lg:w-[343px]'
      >
        {LOGIN_FIELDS.map(({ id, type, placeholder, icon }) => (
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
          />
        ))}

        <SubmitButton text='Sign In' />

        <div className='flex items-center justify-center my-2'>
          <div className='border-t border-gray-300 flex-grow' />
          <span className='mx-2 text-secondary-500 text-sm font-bold'>OR</span>
          <div className='border-t border-gray-300 flex-grow' />
        </div>

        <div className='flex flex-col gap-5'>
          {AUTH_PROVIDERS.map(({ provider, Icon, iconColor }) => (
            <Button
              key={provider}
              disabled
              startIcon={<Icon size={20} className='w-8' color={iconColor} />}
              aria-label={`Login with ${provider}`}
              customClass='flex justify-evenly text-sm py-4 px-2 text-secondary-500 font-bold bg-white shadow-none border border-2 border-secondary-600'
            >
              Login with {provider}
            </Button>
          ))}
        </div>
      </form>

      <div className='flex flex-col gap-2 mt-4 text-xs sm:text-sm lg:text-base text-center text-secondary-500'>
        <a href='/auth?action=update-password' className='text-primary-200 font-bold no-underline'>
          Forgot Password?
        </a>
        <p>
          Don’t have an account?
          <a href='#' className='text-primary-200 ml-1 font-bold no-underline'>
            Register
          </a>
        </p>
      </div>
    </FormLayout>
  );
};

export default LoginForm;
