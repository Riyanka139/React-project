import validator from 'validator';
import useInput from '../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameIsInvalid, 
    valueChangeHandler: firstNameChangeHandler, 
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameIsInvalid, 
    valueChangeHandler: lastNameChangeHandler, 
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailIsInvalid, 
    valueChangeHandler: emailChangeHandler, 
    inputBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput(value => validator.isEmail(value));

  let formIsValid = false;

  if(enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid){
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    // if(!formIsValid){
    //   return;
    // }
  
    firstNameReset();
    lastNameReset();
    emailReset();
  };

  const firstNameClass = firstNameIsInvalid ? 'form-control invalid' : 'form-control';
  const lastNameClass = lastNameIsInvalid ? 'form-control invalid' : 'form-control';
  const emailClass = emailIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClass}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name'
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameIsInvalid ? <p className='error-text'>Please Enter First Name.</p> : ''}
        </div>
        <div className={lastNameClass}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName} 
          />
          {lastNameIsInvalid ? <p className='error-text'>Please Enter Last Name.</p> : ''}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text' 
          id='name'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail} 
        />
        {emailIsInvalid ? <p className='error-text'>Please Enter a Valid E-Mail.</p> : ''}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
