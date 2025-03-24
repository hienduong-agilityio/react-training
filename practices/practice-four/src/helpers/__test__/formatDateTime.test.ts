// Helpers
import { formatDate, formatTime, formatDateTime, formatDateForInput } from '@/helpers/formatDateTime';

describe('Date and Time Helpers', () => {
  describe('formatDate', () => {
    it('should return an empty string for an invalid date', () => {
      expect(formatDate('')).toEqual('');
      expect(formatDate('invalid-date')).toEqual('');
      expect(formatTime('Och 10 2024')).toEqual('');
    });

    it('should format a valid date string to "DD MMM YYYY" format', () => {
      const result = formatDate('2024-10-14');
      expect(result).toEqual('14 Oct 2024');
    });

    it('should format a Date object to "DD MMM YYYY" format', () => {
      const result = formatDate(new Date('2024-10-14T00:00:00'));
      expect(result).toEqual('14 Oct 2024');
    });
  });

  describe('formatTime', () => {
    it('should return an empty string for an invalid date', () => {
      expect(formatTime('')).toEqual('');
      expect(formatTime('invalid-date')).toEqual('');
    });

    it('should format a valid date string to "HH:MM AM/PM" format', () => {
      const result = formatTime('2024-10-14T13:45:00');
      expect(result).toEqual('01:45 PM');
    });

    it('should format a Date object to "HH:MM AM/PM" format', () => {
      const result = formatTime(new Date('2024-10-14T13:45:00'));
      expect(result).toEqual('01:45 PM');
    });
  });

  describe('formatDateTime', () => {
    it('should return an empty string for an invalid date', () => {
      expect(formatDateTime('')).toEqual('');
      expect(formatDateTime('invalid-date')).toEqual('');
    });

    it('should format a valid date string to "DD MMM YYYY, HH:MM AM/PM" format', () => {
      const result = formatDateTime('2024-10-14T13:45:00');
      expect(result).toEqual('14 Oct 2024, 01:45 PM');
    });

    it('should format a Date object to "DD MMM YYYY, HH:MM AM/PM" format', () => {
      const result = formatDateTime(new Date('2024-10-14T13:45:00'));
      expect(result).toEqual('14 Oct 2024, 01:45 PM');
    });
  });

  describe('formatDateForInput', () => {
    it('should return an empty string for an invalid date', () => {
      expect(formatDateForInput('')).toEqual('');
      expect(formatDateForInput('invalid-date')).toEqual('');
    });

    it('should format a valid date string to "YYYY-MM-DD" format', () => {
      const result = formatDateForInput('2024-10-14T00:00:00');
      expect(result).toEqual('2024-10-14');
    });

    it('should handle a date with time and timezone correctly', () => {
      const result = formatDateForInput('2024-10-14T12:30:00+02:00');
      expect(result).toEqual('2024-10-14');
    });
  });
});
