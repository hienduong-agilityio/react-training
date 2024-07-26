//  Library
import classNames from 'classnames';

export enum TEXT_SIZE {
  NORMAL = 'normal',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum TEXT_COLOR {
  DEFAULT = 'default',
  WHITE = 'white'
}

export interface ITypographyProps {
  children: string;
  color?: 'default' | 'white';
  size?: TEXT_SIZE;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  customClasses?: string;
}

const colorClass: { [key in TEXT_COLOR]: string } = {
  default: 'text-black',
  white: 'text-white'
};

const sizeClass: { [key in TEXT_SIZE]: string } = {
  small: 'text-sm',
  normal: 'text-base',
  medium: 'text-xl',
  large: 'text-5xl'
};

/**
 * Typography Component
 * @param color - The color of the text.
 * @param size - The size of the text's font values: 'xl', 'lg', 'md'.
 * @param tag - The tag of the html tag.
 * @param customClasses - Additional custom CSS classes to be applied to the Typography component.
 *
 * @returns {JSX.Element} - The Typography component.
 */

const Typography = ({
  children,
  color = 'default',
  size = TEXT_SIZE.NORMAL,
  tag = 'p',
  customClasses = '',
  ...restProps
}: ITypographyProps): JSX.Element => {
  const typographyClasses = classNames([colorClass[color], sizeClass[size], customClasses]);

  const TypographyType = tag;

  return (
    <TypographyType className={typographyClasses} {...restProps}>
      {children}
    </TypographyType>
  );
};

export default Typography;
