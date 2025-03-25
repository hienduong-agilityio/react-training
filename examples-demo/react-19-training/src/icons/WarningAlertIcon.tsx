import { JSX } from 'react';
import type { IIconProps } from '../interfaces';

export const WarningAlertIcon = ({
  size = 24,
  color = '#FB7181',
  strokeWidth = 2,
  ...props
}: IIconProps & { strokeWidth?: number }): JSX.Element => {
  return (
    <svg {...props} width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='system icon/24px/Alert'>
        <g id='Group'>
          <path
            id='Vector'
            d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Vector_2'
            d='M12 6.375V13.125'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Vector_3'
            d='M12 16.5V17.625'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
    </svg>
  );
};
