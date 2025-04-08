import type { IIconProps } from '../interfaces';
import { JSX } from 'react';

export const Spinner = ({ size = 24, color = '#33A0FF', ...props }: IIconProps): JSX.Element => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      role='progressbar'
      className='animate-spin'
    >
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke={color} strokeWidth='4' />
      <path
        className='opacity-75'
        fill={color}
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
};
