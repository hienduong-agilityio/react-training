import classNames from 'classnames';
import { TEXT_SIZE } from '../../../types/common';
import styles from './index.module.css';

export interface ITypographyProps {
  children: string;
  color?: 'default' | 'primary' | 'secondary' | 'white';
  size?: TEXT_SIZE;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  customClasses?: string;
}
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
}: ITypographyProps) => {
  const typographyClasses = classNames([styles[color], styles[size], customClasses]);

  const TypographyType = variant;

  return (
    <TypographyType className={typographyClasses} {...restProps}>
      {children}
    </TypographyType>
  );
};

export default Typography;
