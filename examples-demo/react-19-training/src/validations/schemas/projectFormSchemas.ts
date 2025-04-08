import { z } from 'zod';

// Constants
import { VALIDATION_MESSAGES } from '../../constants';

// Enums
import { STATUS } from '../../enums';

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(6, VALIDATION_MESSAGES.NAME_MIN_LENGTH_MESSAGE)
    .max(50, VALIDATION_MESSAGES.NAME_MAX_LENGTH_MESSAGE),
  manager: z.object({
    managerName: z
      .string()
      .regex(/^[A-Za-z\s]+$/, VALIDATION_MESSAGES.INVALID_NAME_MESSAGE)
      .min(6, VALIDATION_MESSAGES.NAME_MIN_LENGTH_MESSAGE)
      .max(50, VALIDATION_MESSAGES.NAME_MAX_LENGTH_MESSAGE),
    managerImage: z.preprocess((val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        return trimmed === '' ? undefined : trimmed;
      }
      return val;
    }, z.string().url(VALIDATION_MESSAGES.INVALID_NAME_MESSAGE).optional())
  }),
  resources: z
    .string()
    .min(0, VALIDATION_MESSAGES.RESOURCES_MIN_VALUE_MESSAGE)
    .max(2, VALIDATION_MESSAGES.RESOURCES_MAX_VALUE_MESSAGE)
    .optional(),
  timeline: z
    .object({
      timeStart: z.string(),
      timeEnd: z.string()
    })
    .partial()
    .refine((data) => (data.timeStart && data.timeEnd ? new Date(data.timeEnd) > new Date(data.timeStart) : true), {
      message: VALIDATION_MESSAGES.TIMELINE_DATE_MESSAGE,
      path: ['timeEnd']
    })
    .optional(),
  budget: z.coerce.number().positive(VALIDATION_MESSAGES.BUDGET_POSITIVE_NUMBER_MESSAGE),
  status: z.preprocess((val) => {
    if (typeof val === 'string' && Object.values(STATUS).includes(val as STATUS)) {
      return val;
    }
    return STATUS.ON_HOLD;
  }, z.nativeEnum(STATUS))
});
