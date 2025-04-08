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
import { STATUS_TYPES, TOAST_MESSAGES } from '../constants';
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

// Enums
import { STATUS, COLORS } from '../enums';

/**
 * Returns a color associated with the given project status.
 *
 * @returns {COLORS} The color representing the status.
 */
const getColorFromStatus = (status: STATUS | string): COLORS => {
  const statusColorMap: Record<string, COLORS> = {
    [STATUS.ON_TRACK]: COLORS.SUCCESS,
    [STATUS.POTENTIAL_RISK]: COLORS.WARNING,
    [STATUS.AT_RISK]: COLORS.DANGER
  };

  return statusColorMap[status] || COLORS.DEFAULT;
};

/**
 * Create an abbreviation from the given name.
 *
 * @param {string} name - The full name from which to generate the abbreviation.
 * @return {string} - The abbreviation of name or 'N/A' if the name is null or undefined.
 */

const getNamePlaceholder = (name = '') => {
  if (!name || !name.trim()) {
    return 'N/A';
  }

  const arr = name.trim().split(' ');
  const lastChar = getFirstChar(arr.pop());

  if (arr.length > 0) {
    const secondChar = getFirstChar(arr.pop());

    return `${secondChar}${lastChar}`;
  }

  return lastChar;
};

/**
 * Get the first character of a string.
 *
 * @param {string} str - The string from which to extract the first character.
 * @param {boolean} isUpperCase - Whether to convert the character to uppercase.
 * @return {string} - The first character of the string
 */

const getFirstChar = (str = '', isUpperCase = true) => {
  if (!str || !str.trim()) return '';

  const character = str.trim()[0];

  return isUpperCase ? character.toUpperCase() : character;
};

export { getNamePlaceholder, getColorFromStatus, getFirstChar };

// Constants
import { COLORS_CLASS } from '../constants';

/**
 * Returns the class names associated with the given color.
 *
 * @param {COLORS} color - The color enum to get the associated class names.
 * @returns {string} The CSS class names.
 */
export const getColorClasses = (color: COLORS = COLORS.DEFAULT): string => {
  const colorClassesMap: Partial<{ [key in COLORS]: string }> = {
    [COLORS.PRIMARY]: COLORS_CLASS.PRIMARY,
    [COLORS.SUCCESS]: COLORS_CLASS.SUCCESS,
    [COLORS.WARNING]: COLORS_CLASS.WARNING,
    [COLORS.DANGER]: COLORS_CLASS.DANGER
  };

  return colorClassesMap[color] || COLORS_CLASS.DEFAULT;
};

/**
 * Formats a date to 'DD MMM YYYY' format.
 *
 * @param date The date to format, either as a Date object or a string.
 * @returns The formatted date string or an empty string if the date is invalid.
 */
const formatDate = (date: Date | string): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const year = dateObj.toLocaleDateString('en-US', { year: 'numeric' });

  return `${day} ${month} ${year}`;
};

/**
 * Formats a date to 'HH:MM AM/PM' format.
 *
 * @param date The date to format, either as a Date object or a string.
 * @returns The formatted time string or an empty string if the date is invalid.
 */
const formatTime = (date: Date | string): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Formats a date to 'DD MMM YYYY, HH:MM AM/PM' format.
 *
 * @param date The date to format, either as a Date object or a string.
 * @returns The formatted date and time string or an empty string if the date is invalid.
 */
const formatDateTime = (date: Date | string): string => {
  if (!date) return '';

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  if (!formattedDate || !formattedTime) {
    return '';
  }

  return `${formattedDate}, ${formattedTime}`;
};

/**
 * Formats a date input value to 'YYYY-MM-DD' format suitable for HTML date input fields.
 *
 * @param dateInput The date input value to be formatted.
 * @returns A date input in 'YYYY-MM-DD' format, adjusted for the local timezone.
 */
const formatDateForInput = (dateInput: string): string => {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return '';
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export { formatDate, formatTime, formatDateTime, formatDateForInput };
