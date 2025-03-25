// Libraries
import { InputHTMLAttributes, ReactNode } from 'react';

export interface IFormState {
  errors: Record<string, string>;
}

export interface IBaseComponentProps {
  customClass?: Partial<
    Record<
      'container' | 'inputContainer' | 'input' | 'button' | 'overlay' | 'confirmButton' | 'cancelButton' | 'wrapper',
      string
    >
  >;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement>, IBaseComponentProps {
  errorMessage?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export interface IInputGroupProps extends IBaseComponentProps {
  placeholder?: string;
  value?: string;
  buttonText?: string;
  inputName?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  startIcon?: ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface IModalProps extends IBaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IFormFieldProps extends Omit<IInputProps, 'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave'> {
  id: string;
  name: string;
  handleInputEvent: (field: string, eventType: 'focus' | 'blur' | 'mouseenter' | 'mouseleave', value?: string) => void;
  getContainerClass: (field: string, hasError: boolean) => string;
  handleFieldChange?: (value: string) => void;
}

import { SVGProps } from 'react';

export interface IIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  itemCount?: number;
  isStarred?: boolean;
  rating?: number;
}
