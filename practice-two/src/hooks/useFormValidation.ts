import { IFormValue } from '@components/PokemonForm';
import { useEffect, useState } from 'react';

const useFormValidation = (formData: IFormValue) => {
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    number: '',
    description: '',
    type1: ''
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const errors = { name: '', number: '', description: '', type1: '' };

      if (!formData) {
        return;
      }

      // Name validation: Should not contain numbers and must be filled
      if (!formData.name.trim() || !/^[A-Za-z\s]+$/.test(formData.name)) {
        errors.name = 'Name should be filled and contain only letters and spaces.';
      }

      // Number validation: Should not contain numbers and must be filled
      if (!formData.number.trim() || !/^[A-Za-z\s]+$/.test(formData.number)) {
        errors.number = 'Number should be filled and contain only letters and spaces.';
      }

      // Type validation: Should not contain numbers and must be filled
      if (!formData.type1.trim() || !/^[A-Za-z\s]+$/.test(formData.type1)) {
        errors.type1 = 'Type should be filled and contain only letters and spaces.';
      }

      // Description validation: Should be at least 50 characters long
      if (formData.description.length < 30) {
        errors.description = 'Description should be at least 50 characters long.';
      }

      setValidationMessages(errors);

      setIsValid(Object.values(errors).every((error) => !error));
    };

    validateForm();
  }, [formData]);

  return { validationMessages, isValid };
};

export default useFormValidation;
