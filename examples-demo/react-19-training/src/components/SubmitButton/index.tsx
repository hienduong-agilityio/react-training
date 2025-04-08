'use client';

// Libraries
import { useFormStatus } from 'react-dom';

// Components

// Enums
import Button, { BUTTON_COLORS } from '../Button';

export const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      color={BUTTON_COLORS.PRIMARY}
      isLoading={pending}
      loadingText={text + '...'}
      customClass='w-full py-3 md:py-4 text-sm md:text-lg font-bold shadow-lg shadow-primary-50'
    >
      {text}
    </Button>
  );
};
