import type { IIconProps } from '../interfaces';

export const MessageIcon = ({ size = 60, color = '#9098B1', ...props }: IIconProps) => {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' width={size} height={size} viewBox='0 0 86 86'>
      <path
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.333 19.25A3.667 3.667 0 0 1 11 15.583h66a3.667 3.667 0 0 1 3.667 3.667v49.5A3.667 3.667 0 0 1 77 72.417H11a3.667 3.667 0 0 1-3.667-3.667v-49.5Zm7.334 3.667v42.166h58.666V22.917H14.668Z'
      />
      <path
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.216 16.864a3.667 3.667 0 0 1 5.17-.398L44 42.706l30.614-26.24a3.667 3.667 0 0 1 4.772 5.568l-33 28.285a3.667 3.667 0 0 1-4.772 0l-33-28.285a3.667 3.667 0 0 1-.398-5.17Z'
      />
    </svg>
  );
};
