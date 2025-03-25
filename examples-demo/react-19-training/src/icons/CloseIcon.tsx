import { JSX } from 'react';
import type { IIconProps } from '../interfaces';

export const CloseIcon = ({ size = 16, ...props }: IIconProps): JSX.Element => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      aria-label='close-icon'
      width={size}
      height={size}
      viewBox='0 0 14 14'
      role='img'
      fill='none'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
      />
    </svg>
  );
};
