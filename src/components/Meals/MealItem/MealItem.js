import { useContext } from 'react';
import CartContext from '../../../store/Cart-Contex';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addCartItemHandler = (quantity) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            quantity: quantity,
            price: props.price
        })
    }

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>Rs. {props.price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addCartItemHandler}/>
            </div>
        </li>
    );
}

export default MealItem;