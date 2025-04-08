// Types
import { JSX } from 'react';
import type { IIconProps } from '../interfaces';

export const CheckMarkIcon = ({
  size = 12,
  color = '#A9EBCA',
  type = 'default',
  ...props
}: IIconProps & { type?: 'default' | 'alternate' }): JSX.Element => {
  return type === 'default' ? (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 12 12' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.0022 12C9.31591 12 12.0022 9.31371 12.0022 6C12.0022 2.68629 9.31591 0 6.0022 0C2.68849 0 0.00219727 2.68629 0.00219727 6C0.00219727 9.31371 2.68849 12 6.0022 12ZM7.94379 3.91404C8.17067 3.67328 8.59119 3.71853 8.82444 3.91404C9.08494 4.13238 9.03673 4.49289 8.82444 4.71814L5.65234 8.08426C5.44861 8.30045 4.97439 8.30998 4.77167 8.08426L3.17782 6.30949C2.95656 6.06311 2.9311 5.75078 3.17782 5.50538C3.39002 5.29432 3.85106 5.27441 4.05848 5.50538L5.22261 6.80165L7.94379 3.91404Z'
        fill={color}
      />
    </svg>
  ) : (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 88 88' fill='none'>
      <path
        opacity='0.2'
        d='M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z'
        fill={color}
      />
      <path
        d='M59.125 35.75L38.9469 55L28.875 45.375'
        stroke={color}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z'
        stroke={color}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
