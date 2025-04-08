import * as React from 'react';
import type { IIconProps } from '../interfaces';

export const WarningIcon = ({
  size = 32,
  color = '#D72828',
  secondaryColor = '#E6E6E6',
  ...props
}: IIconProps & { secondaryColor?: string }): React.JSX.Element => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={size}
      height={size}
      viewBox='0 0 32 32'
      style={{ overflow: 'visible' }}
      xmlSpace='preserve'
    >
      <g>
        <circle cx='16' cy='16' r='16' fill={color} />
        <path d='M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z' fill={secondaryColor} />
      </g>
    </svg>
  );
};
