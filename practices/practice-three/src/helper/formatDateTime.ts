/**
 * Formats a Date object to 'Day Month Year, Hour:Minute AM/PM' format.
 *
 * @param date The Date object to format.
 * @returns The formatted date and time string.
 */
export const formatDateTime = (date: Date): string => {
  /**
   * Formats the date part of the Date object to 'Day Month Year' format.
   *
   * @returns The formatted date string.
   */
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  /**
   * Formats the time part of the Date object to 'Hour:Minute AM/PM' format.
   *
   * @returns The formatted time string.
   */
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return `${formattedDate}, ${formattedTime}`;
};
