// Validations
import { projectSchema } from '@/validations';

// Constants
import { VALIDATION_MESSAGES } from '@/constants';

// Enums
import { STATUS } from '@/enums';

describe('projectSchema', () => {
  const validProjectData = {
    projectName: 'Project Alpha',
    manager: {
      managerName: 'John Doe',
      managerImage: 'https://example.com/image.png'
    },
    resources: '1',
    timeline: {
      timeStart: '2024-01-01',
      timeEnd: '2024-01-10'
    },
    budget: 100,
    status: STATUS.AT_RISK
  };

  it('should validate correctly with valid data', () => {
    const result = projectSchema.safeParse(validProjectData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validProjectData);
  });

  it('should fail if projectName is less than 6 characters', () => {
    const invalidData = { ...validProjectData, projectName: 'Short' };
    const result = projectSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(VALIDATION_MESSAGES.NAME_MIN_LENGTH_MESSAGE);
  });

  it('should fail if managerName does not match regex', () => {
    const invalidData = {
      ...validProjectData,
      manager: { managerName: 'John123', managerImage: 'https://example.com/image.png' }
    };
    const result = projectSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(VALIDATION_MESSAGES.INVALID_NAME_MESSAGE);
  });

  it('should fail if managerImage is not a valid URL', () => {
    const invalidData = { ...validProjectData, manager: { managerName: 'John Doe', managerImage: 'invalid-url' } };
    const result = projectSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(VALIDATION_MESSAGES.INVALID_NAME_MESSAGE);
  });

  it('should fail if timeEnd is before timeStart', () => {
    const invalidData = { ...validProjectData, timeline: { timeStart: '2024-01-10', timeEnd: '2024-01-01' } };
    const result = projectSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(VALIDATION_MESSAGES.TIMELINE_DATE_MESSAGE);
  });

  it('should fail if budget is not positive', () => {
    const invalidData = { ...validProjectData, budget: -10 };
    const result = projectSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(VALIDATION_MESSAGES.BUDGET_POSITIVE_NUMBER_MESSAGE);
  });

  it('should set default status to ON_HOLD if invalid status is provided', () => {
    const invalidData = { ...validProjectData, status: 'INVALID_STATUS' };
    const result = projectSchema.safeParse(invalidData);
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe(STATUS.ON_HOLD);
  });

  it('should allow optional fields to be undefined', () => {
    const partialData = {
      projectName: 'Project Beta',
      manager: {
        managerName: 'Jane Doe',
        managerImage: 'https://example.com/image.png'
      },
      budget: 200,
      status: STATUS.ON_TRACK
    };
    const result = projectSchema.safeParse(partialData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ ...partialData, resources: undefined, timeline: undefined });
  });
});
