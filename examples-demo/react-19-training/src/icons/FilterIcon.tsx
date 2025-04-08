import type { IIconProps } from '../interfaces';

export const FilterIcon = ({ size = 48, ...props }: IIconProps) => {
  const scale = size / 48;
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' width={size} height={size} viewBox='0 0 48 48'>
      <path
        stroke='#40BFFF'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={2 * scale}
        d={`M${27.906 * scale} ${34.516 * scale}V${23.5 * scale}L${41.125 * scale} ${5.875 * scale}H${5.875 * scale}L${19.094 * scale} ${23.5 * scale}v${17.625 * scale}`}
      />
    </svg>
  );
};
