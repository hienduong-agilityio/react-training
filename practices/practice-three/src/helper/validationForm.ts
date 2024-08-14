import { ZodSchema } from 'zod';

/**
 * Function to validate form values using a given schema.
 *
 * @param schema - The Zod schema used for validation.
 * @param formValues - The values to be validated.
 * @returns An object with error messages.
 */
export const validateFormValues = <T, Y>(schema: ZodSchema<T>, formValues: Y) => {
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
