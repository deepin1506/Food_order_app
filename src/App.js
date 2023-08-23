import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
const App = () => {
  const [cartisShown, setcartisShown] = useState(false);

  const showcartHandler = () => {
    setcartisShown(true);
  };
  const hidecartHandler = () => {
    setcartisShown(false);
  };
  return (
    <CartProvider>
      {cartisShown && <Cart onClose={hidecartHandler} />}
      <Header onShowCart={showcartHandler} />
      <Meals />
    </CartProvider>
  );
};

export default App;
