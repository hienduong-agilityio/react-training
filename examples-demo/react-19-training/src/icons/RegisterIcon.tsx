import * as React from 'react';
import type { IIconProps } from '../interfaces';

export const RegisterIcon = ({
  size = 44,
  color = '#40BFFF',
  innerColor = 'white',
  ...props
}: IIconProps & { innerColor?: string }): React.JSX.Element => {
  return (
    <svg {...props} width={size} height={size} viewBox='0 0 70 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='1' width='70' height='70' rx='16' fill={color} />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M50.8284 33.1716C52.3905 34.7337 52.3905 37.2663 50.8284 38.8284L38.8284 50.8284C37.2663 52.3905 34.7337 52.3905 33.1716 50.8284L21.1716 38.8284C19.6095 37.2663 19.6095 34.7337 21.1716 33.1716L33.1716 21.1716C34.7337 19.6095 37.2663 19.6095 38.8284 21.1716L50.8284 33.1716ZM36 29.6569L29.6569 36L36 42.3431L42.3431 36L36 29.6569Z'
        fill={innerColor}
      />
    </svg>
  );
};
