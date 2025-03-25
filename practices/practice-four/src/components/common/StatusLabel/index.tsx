// Library
import { memo } from 'react';

// Component
import { Tag } from '@/components';

// Types
import type { ITagProps } from '@/components/common/Tag';

// Enum
import { COLORS } from '@/enums';

// Helpers
import { getColorClasses } from '@/helpers';

export interface IStatusLabelProps extends ITagProps {
  // showDot: Show dot for the StatusLabel.
  showDot?: boolean;
}

/**
 * StatusLabel component
 *
 * @returns {JSX.Element} - StatusLabel element.
 */

const StatusLabel = ({
  children,
  color = COLORS.SUCCESS,
  showDot = true,
  customClasses = ''
}: IStatusLabelProps): JSX.Element => {
  const colorClasses = getColorClasses(color);

  return (
    <div className='w-max'>
      <Tag color={color} customClasses={customClasses}>
        {showDot && (
          <svg
            role='img'
            className={`inline-flex ${colorClasses}`}
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
