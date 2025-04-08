import type { IIconProps } from '../interfaces';
export const AlertIcon = ({ size = 40, ...props }: IIconProps) => (
  <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' width={size} height={size} viewBox='0 0 72 72'>
    <g filter='url(#a)'>
      <rect width={72} height={72} x={0} y={0} fill='#FB7181' rx={36} />
    </g>
    <path stroke='#fff' strokeLinecap='round' strokeWidth={size / 12} d='M36 26v17M36 47v1' />
    <defs>
      <filter
        id='a'
        width={132}
        height={132}
        x={-30}
        y={-30}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
        <feOffset dy={10} />
        <feGaussianBlur stdDeviation={15} />
        <feColorMatrix values='0 0 0 0 0.984314 0 0 0 0 0.443137 0 0 0 0 0.505882 0 0 0 0.24 0' />
        <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
        <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
      </filter>
    </defs>
  </svg>
);
