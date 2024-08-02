// Library
import { memo } from 'react';

// Component
import Tag from '@/components/common/Tag';

// Types
import type { ITagProps } from '@/components/common/Tag';

// Enum
import { COLORS } from '@/enums/theme';

interface IStatusLabelProps extends ITagProps {
  // showDot: Show dot for the StatusLabel.
  showDot?: boolean;
}

const getIconFillColorClass = (color: COLORS): string => {
  switch (color) {
    case COLORS.PRIMARY:
      return 'fill-primary';
    case COLORS.SUCCESS:
      return 'fill-success';
    case COLORS.WARNING:
      return 'fill-warning';
    case COLORS.DANGER:
      return 'fill-danger';
    default:
      return 'fill-default';
  }
};

/**
 * StatusLabel component
 *
 * @returns {JSX.Element} - StatusLabel element.
 */

const StatusLabel = ({
  children,
  color = COLORS.SUCCESS,
  showDot = true,
  customClasses = 'items-center',
  onClick = () => {}
}: IStatusLabelProps): JSX.Element => {
  return (
    <div className='w-full'>
      <Tag color={color} customClasses={customClasses} onClick={onClick}>
        {showDot && (
          <svg
            className={`inline-flex ${getIconFillColorClass(color)}`}
            width='6'
            height='6'
            viewBox='0 0 6 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='6' height='6' rx='2' />
          </svg>
        )}
        {children}
      </Tag>
    </div>
  );
};

export default memo(StatusLabel);
