import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChar = value => value.trim().length === 6;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNameIsvalid = !isEmpty(nameInputRef.current.value);
        const enteredStreetIsvalid = !isEmpty(streetInputRef.current.value);
        const enteredPostalIsvalid = isSixChar(postalInputRef.current.value);
        const enteredCityIsvalid = !isEmpty(cityInputRef.current.value);

        setFormInputValidity({
            name: enteredNameIsvalid,
            street: enteredStreetIsvalid,
            postal: enteredPostalIsvalid,
            city: enteredCityIsvalid
        })

        const formIsValid = 
            enteredNameIsvalid &&
            enteredStreetIsvalid &&
            enteredPostalIsvalid &&
            enteredCityIsvalid;

        if(!formIsValid){

        }
    }

    const nameclass = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetclass = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const postalclass = `${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`;
    const cityclass = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={nameclass}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    id="name"
                    type="text"
                    ref={nameInputRef}
                />
                {!formInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetclass}>
                <label htmlFor='street'>Street</label>
                <input 
                    id="street"
                    type="text"
                    ref={streetInputRef}
                />
                {!formInputValidity.street && <p>Please enter a valid street name!</p>}
            </div>
            <div className={postalclass}>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    id="postal"
                    type="text"
                    ref={postalInputRef}
                />
                {!formInputValidity.postal && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityclass}>
                <label htmlFor='city'>City</label>
                <input 
                    id="city"
                    type="text"
                    ref={cityInputRef}
                />
                {!formInputValidity.city && <p>Please enter a valid city name!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;