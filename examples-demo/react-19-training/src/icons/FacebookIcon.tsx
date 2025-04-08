import type { IIconProps } from '../interfaces';

export const FacebookIcon = ({ size = 24, color = '#03A9F4', ...props }: IIconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='-4 0 17 17' fill='none' {...props}>
    <path
      fill={color}
      d='M9.197 16v-6.77h2.273l.34-2.646H9.197V5.437c0-.765.213-1.286 1.311-1.286h1.398V1.814A18.844 18.844 0 0 0 9.896 1.6c-1.738 0-2.93 1.06-2.93 3.006v1.678H4.723v2.646h2.243V16h2.231Z'
    />
  </svg>
);
