import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-content";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `Rs ${props.price.toFixed(2)}`;

  const addItemtoCartHandler = (amount) => {
    cartCtx.additem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3> {props.name} </h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}> {price} </div>
      </div>

      <div>
        <MealItemForm id={props.id} onAddtoCart={addItemtoCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
