import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters.' })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.'
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.'
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[\W_]/, {
    message: 'Password must contain at least one special character.'
  });

export const schema = {
  login: z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  }),
  register: z
    .object({
      username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters.' })
        .regex(/^[a-zA-Z\s]+$/, {
          message: 'Username can only contain letters and spaces.'
        }),
      email: z.string().email({ message: 'Invalid email address.' }),
      password: passwordSchema,
      password_again: z.string()
    })
    .superRefine(({ password, password_again }, ctx) => {
      if (password !== password_again) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords do not match.',
          path: ['password_again']
        });
      }
    })
};

import { IFormState } from '../interfaces';

import { ZodSchema } from 'zod';
import { ROUTE, STATUS_TYPES, TOAST_MESSAGES } from '../constants';
import { ToastStore } from '../stores';

const validateFormValues = <T, Y>(schema: ZodSchema<T>, formValues: Y) => {
  const validation = schema.safeParse(formValues);

  if (!validation.success) {
    const errorMessages = validation.error.errors.reduce((acc, error) => {
      const key = error.path.join('.');

      return { ...acc, [key]: error.message };
    }, {});

    return errorMessages;
  }

  return {};
};

export { validateFormValues };
import { useRoutes } from 'react-router-dom';

export const initialState: IFormState = {
  errors: {}
};

type AuthAction = 'login' | 'register';

export const handleLogin = async (formValues: Record<string, string>): Promise<IFormState> => {
  try {
    const response = await fetch(`https://json-server-render-nia7.onrender.com/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password
      })
    });

    console.log(`https://json-server-render-nia7.onrender.com`);

    if (!response.ok) {
      ToastStore.getState().showToast(TOAST_MESSAGES.LOGIN_FAILED, STATUS_TYPES.ERROR);
      return {
        errors: {
          email: TOAST_MESSAGES.INVALID_EMAIL,
          password: TOAST_MESSAGES.INVALID_PASSWORD
        }
      };
    }

    ToastStore.getState().showToast(TOAST_MESSAGES.LOGIN_SUCCESS, STATUS_TYPES.SUCCESS);

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return initialState;
  } catch (error) {
    ToastStore.getState().showToast(TOAST_MESSAGES.API_ERROR, STATUS_TYPES.ERROR);
    return {
      errors: {
        general: TOAST_MESSAGES.API_ERROR
      }
    };
  }
};

export const handleRegister = async (formValues: Record<string, string>): Promise<IFormState> => {
  try {
    const response = await fetch(`https://json-server-render-nia7.onrender.com/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    });

    const data = await response.json();

    if (!response.ok) {
      return { errors: { email: data.message } };
    }

    ToastStore.getState().showToast(TOAST_MESSAGES.REGISTER_SUCCESS, STATUS_TYPES.SUCCESS);

    return initialState;
  } catch (error) {
    ToastStore.getState().showToast(TOAST_MESSAGES.API_ERROR, STATUS_TYPES.ERROR);
    return {
      errors: {
        general: TOAST_MESSAGES.API_ERROR
      }
    };
  }
};

export const handleFormSubmit = async (
  action: AuthAction,
  prevState: IFormState,
  formData: FormData
): Promise<IFormState> => {
  const formValues = Object.fromEntries(formData.entries()) as Record<string, string>;
  const errorMessages = validateFormValues(schema[action], formValues);

  if (Object.keys(errorMessages).length > 0) {
    return { ...prevState, errors: errorMessages };
  }

  try {
    return action === 'login' ? await handleLogin(formValues) : await handleRegister(formValues);
  } catch {
    ToastStore.getState().showToast(TOAST_MESSAGES.API_ERROR, STATUS_TYPES.ERROR);
    return prevState;
  }
};
