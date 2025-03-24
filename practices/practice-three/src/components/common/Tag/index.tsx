// Libraries
import { memo } from 'react';
import classNames from 'classnames';

// Enum
import { COLORS } from '@/enums/theme';

export interface ITagProps {
  // children: The children of the Tag.
  children: React.ReactNode;
  // color: Color of the Tag. Can be one of COLORS enums.
  color?: COLORS;
  // customClasses: Custom variant class for the Tag.
  customClasses?: string;
  // onClick: The function to call when the Tag is clicked.
  onClick?: () => void;
}

const defaultClasses: string =
  'py-[1px] px-2 inline-flex gap-[6px] rounded font-medium text-xs leading-[18px] tracking-[0.36px] flex items-center justify-center';
const colorClasses: { [key in COLORS]: string } = {
  [COLORS.DEFAULT]: 'bg-gray-50 text-gray-700',
  [COLORS.PRIMARY]: 'bg-primary-100 text-primary-500',
  [COLORS.SUCCESS]: 'bg-success-100 text-success-500',
  [COLORS.WARNING]: 'bg-warning-0 text-warning-500',
  [COLORS.DANGER]: 'bg-danger-0 text-danger-500'
};

/**
 * Tag component
 *
 * @returns {JSX.Element} - Tag element.
 */
const Tag = ({ children, color = COLORS.DEFAULT, customClasses = '', onClick }: ITagProps): JSX.Element => {
  const tagClasses: string = classNames(defaultClasses, colorClasses[color], customClasses);

  return (
    <span className={tagClasses} onClick={onClick}>
      {children}
    </span>
  );
};

export default memo(Tag);
