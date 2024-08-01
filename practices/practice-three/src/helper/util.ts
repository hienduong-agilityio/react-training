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

export { getNamePlaceholder };
