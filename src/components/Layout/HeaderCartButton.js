import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/Cart-Contex';
import CartIcon from '../Cart/CartIcon';
import './HeaderCartButton.css';

const CartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfItems = items.reduce((currNumber, item) => {
        return (currNumber + item.quantity);
    },0);

    const btnclass = `${'button'} ${btnIsHighlighted ? 'bump' : ''}`;

    useEffect(()=> {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return(
        <button className={btnclass} onClick={props.onClick}>
            <span className='icon'>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className='badge'>{numberOfItems}</span>
        </button>
    );
}

export default CartButton;