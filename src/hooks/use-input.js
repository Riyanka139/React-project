import {useState} from 'react';

const useInput = (validate) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    const enteredValueIsValid = validate(enteredValue);
    const hasError = !enteredValueIsValid && isEdited;

    const valueChangeHandler = (event) => {
      setEnteredValue(event.target.value);
    };

    const inputBlurHandler = () => {
      setIsEdited(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsEdited(false);
    }

    return{
        value: enteredValue,
        isValid: enteredValueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
}

export default useInput;