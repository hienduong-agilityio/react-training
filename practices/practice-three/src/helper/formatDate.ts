/**
 * Formats a Date object to 'Day Month Year' format.
 *
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
