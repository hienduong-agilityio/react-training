// Libraries
import { useState } from 'react';

interface InputStatus {
  focused: boolean;
  valid: boolean;
  hovered: boolean;
}

type InputStatusState = Record<string, InputStatus>;

export const useInputStatus = (fields: string[]) => {
  const [inputStatus, setInputStatus] = useState<InputStatusState>(
    fields.reduce((acc, field) => {
      acc[field] = { focused: false, valid: true, hovered: false };
      return acc;
    }, {} as InputStatusState)
  );

  const handleInputEvent = (
    field: string,
    eventType: 'focus' | 'blur' | 'mouseenter' | 'mouseleave',
    value?: string
  ) => {
    setInputStatus((prev) => {
      const currentField = prev[field];

      if (!currentField) return prev;

      switch (eventType) {
        case 'focus':
          return { ...prev, [field]: { ...currentField, focused: true } };
        case 'blur':
          return {
            ...prev,
            [field]: {
              ...currentField,
              focused: false,
              valid: value?.trim() !== ''
            }
          };
        case 'mouseenter':
          return { ...prev, [field]: { ...currentField, hovered: true } };
        case 'mouseleave':
          return { ...prev, [field]: { ...currentField, hovered: false } };
        default:
          return prev;
      }
    });
  };

  const getIconColor = (field: string, hasError: boolean): string => {
    const status = inputStatus[field];
    if (!status) return '#9098B1';

    const { focused, hovered } = status;
    if (hovered) return '#03A9F4';
    if (focused) return '#03A9F4';

    return hasError ? '#FB7181' : '#9098B1';
  };

  const getContainerClass = (field: string, hasError: boolean): string => {
    const status = inputStatus[field];
    if (!status) return 'border-secondary-600';

    if (hasError) return 'border-danger-50';
    if (status.focused) return 'border-primary-200';

    return 'border-secondary-600';
  };

  return { inputStatus, handleInputEvent, getIconColor, getContainerClass };
};
