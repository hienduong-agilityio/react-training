import type { IIconProps } from '../interfaces';

export const LockIcon = ({ size = 60, color = '#9098B1', ...props }: IIconProps) => {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 9.75C2 9.19772 2.44772 8.75 3 8.75H21C21.5523 8.75 22 9.19772 22 9.75V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V9.75ZM4 10.75V20H20V10.75H4Z'
      />
      <path
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 4C9.48134 4 7.375 6.13206 7.375 8.841C7.375 9.39328 6.92728 9.841 6.375 9.841C5.82272 9.841 5.375 9.39328 5.375 8.841C5.375 5.09919 8.30641 2 12 2C15.6936 2 18.625 5.09919 18.625 8.841C18.625 9.39328 18.1773 9.841 17.625 9.841C17.0727 9.841 16.625 9.39328 16.625 8.841C16.625 6.13206 14.5187 4 12 4Z'
      />
      <path
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 13.7257C12.5523 13.7257 13 14.1734 13 14.7257V15.8507C13 16.403 12.5523 16.8507 12 16.8507C11.4477 16.8507 11 16.403 11 15.8507V14.7257C11 14.1734 11.4477 13.7257 12 13.7257Z'
      />
    </svg>
  );
};
