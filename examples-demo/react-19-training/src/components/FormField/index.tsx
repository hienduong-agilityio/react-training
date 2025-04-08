'use client';

// Libraries
import { useState, useCallback, memo } from 'react';

// Icons

// Components
import { Button, InputField } from '../../components/index';
import { IFormFieldProps } from '../../interfaces';
import { EyeIcon, WarningAlertIcon } from '../../icons';

const PasswordField = ({ isVisible, toggleVisibility }: { isVisible: boolean; toggleVisibility: () => void }) => (
  <Button tabIndex={-1} onClick={toggleVisibility} className='focus:outline-none mr-2 flex'>
    <EyeIcon tabIndex={0} size={20} isOpen={isVisible} />
  </Button>
);

const FormField = ({
  id,
  name,
  type,
  placeholder,
  startIcon,
  endIcon,
  errorMessage,
  handleInputEvent,
  getContainerClass,
  handleFieldChange
}: IFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleFocusBlurEvent = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      handleInputEvent(name, event.type as 'focus' | 'blur', event.target.value || '');
    },
    [name, handleInputEvent]
  );

  const handleChangeEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFieldChange?.(event.target.value || '');
    },
    [handleFieldChange]
  );

  const handleMouseEvent = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      handleInputEvent(name, event.type as 'mouseenter' | 'mouseleave', '');
    },
    [name, handleInputEvent]
  );

  return (
    <div className='flex flex-col gap-2'>
      <InputField
        id={id}
        name={name}
        type={isPasswordField && !showPassword ? 'password' : 'text'}
        autoComplete={name}
        startIcon={startIcon}
        endIcon={
          isPasswordField ? <PasswordField isVisible={showPassword} toggleVisibility={toggleShowPassword} /> : endIcon
        }
        placeholder={placeholder}
        customClass={{
          container: `${getContainerClass(name, Boolean(errorMessage))} border-2 pr-0 hover:border-primary-200 focus-within:ring-0 focus-within:border-primary-200`,
          input: 'h-14 text-secondary-500 appearance-none px-1 w-full'
        }}
        onFocus={handleFocusBlurEvent}
        onBlur={handleFocusBlurEvent}
        onChange={handleChangeEvent}
        onMouseEnter={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
      />
      {errorMessage && (
        <div className='flex gap-2 items-center'>
          <WarningAlertIcon size={20} />
          <span className='text-danger-50 text-xs font-bold leading-6 tracking-wider'>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default memo(FormField);
