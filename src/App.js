import {useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meal";
import CartContexProvider  from "./store/cart-provider";

function App() {
  const [cartIsvisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  }

  const hideCartHandler = () => {
    setCartIsVisible(false);
  }

  return (
    <CartContexProvider>
      {cartIsvisible? <Cart onClose={hideCartHandler}/> : ''}
      <Header onShow={showCartHandler}/>
      <main>
        <Meal/>
      </main>
    </CartContexProvider>
  );
}

export default App;
