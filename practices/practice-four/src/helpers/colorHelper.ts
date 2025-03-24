// Enums
import { COLORS } from '@/enums';

// Constants
import { COLORS_CLASS } from '@/constants';

/**
 * Returns the class names associated with the given color.
 *
 * @param {COLORS} color - The color enum to get the associated class names.
 * @returns {string} The CSS class names.
 */
export const getColorClasses = (color: COLORS = COLORS.DEFAULT): string => {
  const colorClassesMap: Partial<{ [key in COLORS]: string }> = {
    [COLORS.PRIMARY]: COLORS_CLASS.PRIMARY,
    [COLORS.SUCCESS]: COLORS_CLASS.SUCCESS,
    [COLORS.WARNING]: COLORS_CLASS.WARNING,
    [COLORS.DANGER]: COLORS_CLASS.DANGER
  };

  return colorClassesMap[color] || COLORS_CLASS.DEFAULT;
};
