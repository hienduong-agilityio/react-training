// Libraries
import { ZodSchema } from 'zod';

// Enums
import { STATUS, COLORS } from '@/enums';

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
 * Function to validate form values using a given schema.
 *
 * @param schema - The Zod schema used for validation.
 * @param formValues - The values to be validated.
 * @returns An object with error messages.
 */
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

export { getNamePlaceholder, validateFormValues, getColorFromStatus, getFirstChar };
