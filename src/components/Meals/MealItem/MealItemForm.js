import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [AmountisValid, setAmountisValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredamount = amountInputRef.current.value;
    const enteredamountnumber = +enteredamount;

    if (
      enteredamount.trim().length === 0 ||
      enteredamountnumber < 1 ||
      enteredamountnumber > 5
    ) {
      setAmountisValid(false);
      return;
    }
    props.onAddtoCart(enteredamountnumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add </button>
      {!AmountisValid && <p>Please enter a valid amount(1 - 5)</p>}
    </form>
  );
};

export default MealItemForm;
