import { memo } from 'react';

// Components
import { IFormFieldProps } from '../../interfaces';
import FormField from '../FormField';

export interface ICommonFormFieldProps extends Omit<IFormFieldProps, 'startIcon' | 'endIcon' | 'errorMessage'> {
  icon: React.ComponentType<{
    color: string;
    size: number;
    className?: string;
  }>;
  errorMessages: Record<string, string>;
  getIconColor: (id: string, hasError: boolean) => string;
}

const CommonFormField = ({
  id,
  type,
  placeholder,
  icon: Icon,
  errorMessages,
  handleInputEvent,
  getIconColor,
  getContainerClass,
  autoComplete
}: ICommonFormFieldProps) => (
  <FormField
    id={id}
    name={id}
    type={type}
    autoComplete={autoComplete}
    startIcon={<Icon className='mr-2' color={getIconColor(id, Boolean(errorMessages[id]))} size={24} />}
    placeholder={placeholder}
    errorMessage={errorMessages[id]}
    handleInputEvent={handleInputEvent}
    getContainerClass={getContainerClass}
  />
);

export default memo(CommonFormField);
