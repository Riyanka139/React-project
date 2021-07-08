import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const isSixChar = value => value.trim().length === 6;

const Checkout = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsvalid,
        hasError: nameHasError,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
        reset: nameRset
    } = useInput(isNotEmpty);

    const {
        value: enteredStreet,
        isValid: enteredStreetIsvalid,
        hasError: StreetHasError,
        inputBlurHandler: streetBlurHandler,
        valueChangeHandler: streetChangeHandler,
        reset: streetRset
    } = useInput(isNotEmpty);

    const {
        value: enteredPostal,
        isValid: enteredPostalIsvalid,
        hasError: postalHasError,
        inputBlurHandler:   postalBlurHandler,
        valueChangeHandler: postalChangeHandler,
        reset: postalRset
    } = useInput(isSixChar);

    const {
        value: enteredCity,
        isValid: enteredCityIsvalid,
        hasError: cityHasError,
        inputBlurHandler:   cityBlurHandler,
        valueChangeHandler: cityChangeHandler,
        reset: cityRset
    } = useInput(isNotEmpty);


    let formIsValid = false;

    if(enteredNameIsvalid && enteredStreetIsvalid && enteredPostalIsvalid && enteredCityIsvalid){
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });

        nameRset();
        streetRset();
        postalRset();
        cityRset();
    }

    const nameclass = `${classes.control} ${nameHasError ? classes.invalid : ''}`;
    const streetclass = `${classes.control} ${StreetHasError ? classes.invalid : ''}`;
    const postalclass = `${classes.control} ${postalHasError ? classes.invalid : ''}`;
    const cityclass = `${classes.control} ${cityHasError ? classes.invalid : ''}`;

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={nameclass}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    value={enteredName}
                    id="name"
                    type="text"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {nameHasError && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetclass}>
                <label htmlFor='street'>Street</label>
                <input 
                    id="street"
                    type="text"
                    value={enteredStreet}
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                />
                {StreetHasError && <p>Please enter a valid street name!</p>}
            </div>
            <div className={postalclass}>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    id="postal"
                    type="text"
                    value={enteredPostal}
                    onChange={postalChangeHandler}
                    onBlur={postalBlurHandler}
                />
                {postalHasError && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityclass}>
                <label htmlFor='city'>City</label>
                <input 
                    id="city"
                    type="text"
                    value={enteredCity}
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                />
                {cityHasError && <p>Please enter a valid city name!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;