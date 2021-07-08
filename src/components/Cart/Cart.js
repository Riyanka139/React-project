import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/Cart-Contex';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';
import Checkout from './checkout-order';

const Cart = (props) => {
    const [isCheckout, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [error, setError] = useState('');

    const cartCtx = useContext(CartContext);

    const cartAddItemHandler = (item) => {
        cartCtx.addItem(item);
    }

    const cartRemoveItemHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderedHandler = () => {
        setIsCheckOut(true);
    }

    const submitOrderedHandler = async(userData) => {
        setIsSubmitting(true);

        const respose = await fetch('https://react-http-4a6b5-default-rtdb.firebaseio.com/order.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });

        if(!respose.ok){
            setError('Somethig went to wrong. Please try again');
        }else{
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
        }
    }

    const cartItems = cartCtx.items.map((item) => (
        <CartItem 
            key={item.id} 
            name={item.name} 
            price={item.price} 
            quantity={item.quantity}
            onAdd={cartAddItemHandler.bind(null,item)}
            onRemove={cartRemoveItemHandler.bind(null,item.id)}
        />
        ));

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const hasItems = cartCtx.items.length > 0;

    let content = <p>Nothing ...</p>

    if(!isSubmitting && !didSubmit && error.trim() === ''){
        content = (
            <Fragment>
                <ul className={classes['cart-items']}>
                    {cartItems}
                </ul>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>RS. {totalAmount}</span>
                </div>
                {isCheckout ? <Checkout onCancel={props.onClose} onConfirm={submitOrderedHandler}/> :
                    <div className={classes.actions}>
                        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                        {hasItems ? <button className={classes['button-order']} onClick={orderedHandler}>Order</button> : ''}
                    </div>
                }
            </Fragment>
        );
    }

    if(error.trim() !== ''){
        content = (
            <Fragment>
                <p>{error}</p>
                <div className={classes.actions}>
                    <button className={classes.button} onClick={props.onClose}>
                     Close
                    </button>
                </div>
            </Fragment>
        );
    }

    if(isSubmitting && error.trim() === ''){
        content = (
            <p>Sending order data ...</p>
        );
    }

    if(!isSubmitting && didSubmit && error.trim() === ''){
        content = (
            <Fragment>
                <p>Sucessfully sent the order!</p>
                <div className={classes.actions}>
                    <button className={classes.button} onClick={props.onClose}>
                     Close
                    </button>
                </div>
            </Fragment>
        );
    }

    return(
        
        <Modal onClose={props.onClose}>
            {/* {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent} */}
      {content}
        </Modal>
    );
}

export default Cart;