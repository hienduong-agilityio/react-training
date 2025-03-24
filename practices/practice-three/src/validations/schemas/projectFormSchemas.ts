// Libraries
import { z } from 'zod';

// Constants
import { VALIDATION_MESSAGES } from '@/constants/validationMessages';

const projectSchema = z.object({
  projectName: z
    .string()
    .min(6, VALIDATION_MESSAGES.NAME_MIN_LENGTH_MESSAGE)
    .max(50, VALIDATION_MESSAGES.NAME_MAX_LENGTH_MESSAGE),
  managerName: z
    .string()
    .regex(/^[A-Za-z\s]+$/, VALIDATION_MESSAGES.INVALID_NAME_MESSAGE)
    .min(6, VALIDATION_MESSAGES.NAME_MIN_LENGTH_MESSAGE)
    .max(50, VALIDATION_MESSAGES.NAME_MAX_LENGTH_MESSAGE),
  resources: z.coerce.number().min(0, VALIDATION_MESSAGES.RESOURCES_MIN_VALUE_MESSAGE).optional(),
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
  estimation: z.coerce.number().positive(VALIDATION_MESSAGES.ESTIMATION_POSITIVE_NUMBER_MESSAGE)
});

export default projectSchema;
