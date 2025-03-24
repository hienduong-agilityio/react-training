// Libraries
import { memo } from 'react';
import classNames from 'classnames';

// Enum
import { COLORS } from '@/enums';

// Helpers
import { getColorClasses } from '@/helpers';

export interface ITagProps {
  // children: The children of the Tag.
  children: React.ReactNode;
  // color: Color of the Tag. Can be one of COLORS enums.
  color?: COLORS;
  // customClasses: Custom variant class for the Tag.
  customClasses?: string;
}

const defaultClasses: string =
  'inline-flex gap-[6px] rounded font-medium leading-[18px] tracking-[0.36px] flex items-center justify-center';

/**
 * Tag component
 *
 * @returns {JSX.Element} - Tag element.
 */
const Tag = ({ children, color = COLORS.DEFAULT, customClasses = '' }: ITagProps): JSX.Element => {
  const colorClasses = getColorClasses(color);

  const tagClasses: string = classNames(customClasses, defaultClasses, colorClasses);

  return <span className={tagClasses}>{children}</span>;
};

export default memo(Tag);
