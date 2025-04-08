import type { IIconProps } from '../interfaces';

export const LogoIcon = ({ size = 44, ...props }: IIconProps) => {
  const scale = size / 44;

  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      aria-label='logo'
      width={size}
      height={size * (44.217 / 44)}
      viewBox='0 0 44 44.217'
    >
      <rect width={44} height={44.217} fill='#40BFFF' rx={16 * scale} transform={`scale(${scale})`} />
      <path
        fill='#fff'
        fillRule='evenodd'
        clipRule='evenodd'
        d={`M${31.062 * scale} ${20.372 * scale}c${0.954 * scale} ${
          0.959 * scale
        } ${0.954 * scale} ${2.514 * scale} 0 ${3.474 * scale}l-${7.334 * scale} ${
          7.37 * scale
        }c-${0.954 * scale} ${0.959 * scale}-${2.502 * scale} ${
          0.959 * scale
        }-${3.456 * scale} 0l-${7.334 * scale}-${7.37 * scale}a${2.465 * scale} ${
          2.465 * scale
        } 0 0 1 0-${3.474 * scale}l${7.334 * scale}-${7.37 * scale}a${2.436 * scale} ${
          2.436 * scale
        } 0 0 1 ${3.457 * scale} 0l${7.333 * scale} ${7.37 * scale}ZM${22 * scale} ${
          18.213 * scale
        }l-${3.876 * scale} ${3.896 * scale}L${22 * scale} ${26.004 * scale}l${3.876 * scale}-${3.895 * scale}L${22 * scale} ${18.213 * scale}Z`}
      />
    </svg>
  );
};
