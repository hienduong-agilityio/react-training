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
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  customClasses?: string;
}

const colorClass: { [key in TEXT_COLOR]: string } = {
  default: 'text-black',
  white: 'text-white'
};

const sizeClass: { [key in TEXT_SIZE]: string } = {
  small: 'font-normal text-sm',
  normal: 'font-normal text-base',
  medium: 'font-normal text-xl',
  large: 'font-normal text-5xl'
};

/**
 * Typography Component
 * @param color - The color of the text.
 * @param size - The size of the text's font values: 'xl', 'lg', 'md'.
 * @param variant - The variant of the text values: 'solid', 'soft', 'outlined', 'plain'.
 * @param level - The level of the heading (1 to 6), or 0 for a paragraph.
 * @param className - Additional custom CSS classes to be applied to the Typography component.
 * @param children - The content to be displayed inside the Typography component.
 * @returns {JSX.Element} - The Typography component.
 */
const Typography = ({
  children,
  color = 'default',
  size = TEXT_SIZE.NORMAL,
  variant = 'p',
  customClasses = '',
  ...restProps
}: ITypographyProps): JSX.Element => {
  const typographyClasses = classNames([colorClass[color], sizeClass[size], customClasses]);

  const TypographyType = variant;

  return (
    <TypographyType className={typographyClasses} {...restProps}>
      {children}
    </TypographyType>
  );
};

export default Typography;
