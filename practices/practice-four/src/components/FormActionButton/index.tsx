// Libraries
import { useFormStatus } from 'react-dom';

// Components
import { Button, Spinner } from '@/components';

// Enums
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums';

interface IFormActionButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  color?: BUTTON_COLORS;
  variant?: BUTTON_VARIANTS;
  size?: BUTTON_SIZES;
  disabledOnPending?: boolean;
  showSpinner?: boolean;
  onClick?: () => void;
  customClass?: string;
}

export const FormActionButton = ({
  children,
  type = 'submit',
  variant = BUTTON_VARIANTS.CONTAINED,
  size = BUTTON_SIZES.LARGE,
  color = BUTTON_COLORS.PRIMARY,
  disabledOnPending = true,
  showSpinner = true,
  customClass = '',
  onClick
}: IFormActionButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type}
      disabled={disabledOnPending && pending}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      customClasses={customClass}
    >
      {pending && showSpinner ? <Spinner /> : children}
    </Button>
  );
};
