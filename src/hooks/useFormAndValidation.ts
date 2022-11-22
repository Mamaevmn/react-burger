import {useState, useCallback} from 'react';

interface IFormValidation {
  [key: string]: string;
}

export const useFormAndValidation = (props: IFormValidation) => {
  const [ values, setValues ] = useState<IFormValidation>({...props});
  const [ errors, setErrors ] = useState<IFormValidation>({});
  const [ isValid, setIsValid ] = useState<boolean>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});

    if (value.length) {
      setIsValid(e.target.closest('form').checkValidity());
    } else setIsValid(null);
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid: boolean = null) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}