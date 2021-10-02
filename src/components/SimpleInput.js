
import validator from 'validator';
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameIsInvalid, 
    valueChangeHandler: nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: nameReset
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailIsInvalid, 
    valueChangeHandler: emailChangeHandler, 
    inputBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput(value => validator.isEmail(value));

  let formIsValid = false;

  if(enteredNameIsValid && enteredEmailIsValid){
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
  
    nameReset();

    emailReset();
  };

  
  const nameClass = nameIsInvalid ? 'form-control invalid' : 'form-control';
  const emailClass = emailIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClass}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text' 
          id='name'
          value={enteredName} 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameIsInvalid ? <p className='error-text'>Name must not be empty!</p> : ''}
      </div>
      <div className={emailClass}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email' 
          id='email'
          value={enteredEmail} 
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailIsInvalid ? <p className='error-text'>Please enter a avlid E-mail.</p> : ''}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
