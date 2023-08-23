import CartContext from "../../store/cart-content";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setisCheckout] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);
  const cartCxt = useContext(CartContext);

  const totalamount = `Rs ${cartCxt.totalamount.toFixed(2)}`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeitem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCxt.additem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setisCheckout(true);
  };

  const submitorderHandler = async (userData) => {
    setisSubmitting(true);
    await fetch(
      "https://food-order-app-e9704-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orders: cartCxt.items,
        }),
      }
    );
    setisSubmitting(false);
    setdidSubmit(true);
    cartCxt.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalamount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitorderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  const isSubmittingModal = <p>SENDING YOU ORDERS DATA</p>;
  const didsubmitModal = (
    <React.Fragment>
      <p>ORDERS DATA SENT SUCCESFULLY</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModal}
      {!isSubmitting && didSubmit && didsubmitModal}
    </Modal>
  );
};

export default Cart;
