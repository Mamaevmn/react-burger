import {useState, useCallback} from 'react';

export function useFormAndValidation(props) {
  const [ values, setValues ] = useState({...props});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});

    if (value.length) {
      setIsValid(e.target.closest('form').checkValidity());
    } else setIsValid(null);
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = null) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}