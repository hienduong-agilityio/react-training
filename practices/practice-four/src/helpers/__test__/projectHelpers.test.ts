// Libraries
import { z } from 'zod';

// Helpers
import { getNamePlaceholder, validateFormValues, getColorFromStatus, getFirstChar } from '@/helpers/projectHelpers';

// Enums
import { STATUS } from '@/enums/status';
import { COLORS } from '@/enums/theme';

describe('getColorFromStatus', () => {
  it('should return SUCCESS color for ON_TRACK status', () => {
    const color = getColorFromStatus(STATUS.ON_TRACK);
    expect(color).toEqual(COLORS.SUCCESS);
  });

  it('should return DEFAULT color for unknown status', () => {
    const color = getColorFromStatus('unknown');
    expect(color).toEqual(COLORS.DEFAULT);
  });
});

describe('validateFormValues', () => {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.number().min(18, 'Age must be at least 18')
  });

  it('should return no errors for valid values', () => {
    const result = validateFormValues(schema, { name: 'John', age: 25 });
    expect(result).toEqual({});
  });

  it('should return errors for invalid values', () => {
    const result = validateFormValues(schema, { name: '', age: 15 });
    expect(result).toEqual({
      name: 'Name is required',
      age: 'Age must be at least 18'
    });
  });
});

describe('getNamePlaceholder', () => {
  it('should return "N/A" for empty string', () => {
    expect(getNamePlaceholder()).toEqual('N/A');
  });

  it('should return initials from a full name', () => {
    expect(getNamePlaceholder('John Doe')).toEqual('JD');
  });

  it('should return single initial for a one-word name', () => {
    expect(getNamePlaceholder('John')).toEqual('J');
  });
});
describe('getFirstChar', () => {
  it('should return an empty string when the input is an empty string', () => {
    const result = getFirstChar();
    expect(result).toBe('');
  });

  it('should handle leading spaces and return the first non-space character in lowercase', () => {
    const result = getFirstChar('  hello', false);
    expect(result).toBe('h');
  });
});
