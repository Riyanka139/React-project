import { useRef } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const quantityRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredQuantity = +quantityRef.current.value;

        if(enteredQuantity < 1 || enteredQuantity > 5){
            return;
        }

        props.onAddToCart(enteredQuantity);
    }
    
    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref = {quantityRef}
                label="Quantity"
                input={{
                    id: 'Quantity_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    defaultValue: '1'
                }}
            />
            <button type="submit">+ Add</button>
        </form>
    );
}

export default MealItemForm;