// Libraries
import { memo } from 'react';
import classNames from 'classnames';

// Enum
import { COLORS } from '@/enums/theme';

export interface ITagProps {
  children: React.ReactNode;
  color?: COLORS;
  customClasses?: string;
  onClick?: () => void;
}

const defaultClasses: string =
  'py-[1px] px-2 inline-flex gap-[6px] rounded font-medium text-xs leading-[18px] tracking-[0.36px]';
const colorClasses: { [key in COLORS]: string } = {
  [COLORS.DEFAULT]: 'bg-gray-100 text-gray-700',
  [COLORS.PRIMARY]: 'bg-primary-100 text-primary-500',
  [COLORS.SUCCESS]: 'bg-success-100 text-success-500',
  [COLORS.WARNING]: 'bg-warning-0 text-warning-500',
  [COLORS.DANGER]: 'bg-danger-0 text-danger-500'
};

/**
 * Tag component
 * @param children The children of the Tag.
 * @param color Color of the Tag. Can be one of COLORS enums.
 * @param onClick The function to call when the Tag is clicked.
 * @param customClasses Custom variant class for the Tag.
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
