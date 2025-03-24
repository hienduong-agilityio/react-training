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
