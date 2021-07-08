import { useReducer } from 'react';

import CartContext from './Cart-Contex';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;

    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex]

    let updatedItems
    
    if(existingItem){
        const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + action.item.quantity
        };
        
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
    }else{
        updatedItems = state.items.concat(action.item);
    }
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }else if(action.type === 'REMOVE'){
    const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingItemIndex]

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if(existingItem.quantity === 1){
        updatedItems = state.items.filter((item) => item.id !== action.id);
    }else{
        const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1
        };
        
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
    }
    
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
  }else if(action.type === 'CLEAR'){
    return defaultCartState;
  }else{
    return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;