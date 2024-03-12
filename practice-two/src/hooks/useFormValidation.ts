import { usePokemonContext } from '@stores/PokemonProvider';
import { useEffect, useState } from 'react';

const useFormValidation = () => {
  const { state } = usePokemonContext();
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

      if (!state.formSubmitValue) {
        return;
      }

      // Name validation: Should not contain numbers and must be filled
      if (!state.formSubmitValue.name.trim() || !/^[A-Za-z\s]+$/.test(state.formSubmitValue.name)) {
        errors.name = 'Name should be filled and contain only letters and spaces.';
      }

      // Number validation: Should not contain numbers and must be filled
      if (
        !state.formSubmitValue.number ||
        isNaN(Number(state.formSubmitValue.number)) ||
        Number(state.formSubmitValue.number) <= 0
      ) {
        errors.number = 'Price should be filled and be a valid number greater than 0.';
      }

      // Type validation: Should not contain numbers and must be filled
      if (!state.formSubmitValue.type1.trim() || !/^[A-Za-z\s]+$/.test(state.formSubmitValue.type1)) {
        errors.type1 = 'Type should be filled and contain only letters and spaces.';
      }

      // Description validation: Should be at least 50 characters long
      if (state.formSubmitValue.description.length < 30) {
        errors.description = 'Description should be at least 50 characters long.';
      }

      setValidationMessages(errors);

      setIsValid(Object.values(errors).every((error) => !error));
    };

    validateForm();
  }, [state.formSubmitValue]);

  return { validationMessages, isValid };
};

export default useFormValidation;
