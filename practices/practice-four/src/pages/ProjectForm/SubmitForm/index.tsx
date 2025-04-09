// Library
import { useFormStatus } from 'react-dom';

// Components
import { Button, Spinner } from '@/components';

// Enums
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums';

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      variant={BUTTON_VARIANTS.CONTAINED}
      size={BUTTON_SIZES.LARGE}
      color={BUTTON_COLORS.PRIMARY}
    >
      {pending ? <Spinner /> : children}
    </Button>
  );
};
