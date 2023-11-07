import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const isEmpty = (value) => value.trim() === "";
const sixChars = (value) => value.trim().length === 6;
const Checkout = (props) => {
  const [formInputValidity, setformInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredname = nameInputRef.current.value;
    const enteredStreet = nameInputRef.current.value;
    const enteredPostalCode = nameInputRef.current.value;
    const enteredCity = nameInputRef.current.value;

    const enterednameisValid = !isEmpty(enteredname);
    const enteredStreetisValid = !isEmpty(enteredStreet);
    const enteredCityisValid = !isEmpty(enteredCity);
    const enteredPostalCodeisValid = !sixChars(enteredPostalCode);

    setformInputValidity({
      name: enterednameisValid,
      street: enteredStreetisValid,
      postalCode: enteredPostalCodeisValid,
      city: enteredCityisValid,
    });

    const formisValid =
      enterednameisValid &&
      enteredStreetisValid &&
      enteredPostalCodeisValid &&
      enteredCityisValid;

    if (!formisValid) {
      return;
    }

    props.onConfirm({
      name: enteredname,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };
  const namecontrolclasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetcontrolclasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalCodecontrolclasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const citycontrolclasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={namecontrolclasses}>
        <label htmlFor="name"> Your Name </label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p> Please Enter the Valid Name</p>}
      </div>
      <div className={streetcontrolclasses}>
        <label htmlFor="street"> Your Street </label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p> Please Enter the Valid street</p>}
      </div>
      <div className={postalCodecontrolclasses}>
        <label htmlFor="Postal"> Your Postal Code </label>
        <input type="text" id="Postal" ref={postalcodeInputRef} />
        {!formInputValidity.postalCode && (
          <p> Please Enter the Valid postalCode</p>
        )}
      </div>
      <div className={citycontrolclasses}>
        <label htmlFor="City"> Your City </label>
        <input type="text" id="City" ref={cityInputRef} />
        {!formInputValidity.city && <p> Please Enter the Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formInputValidity}>
          Confirm Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
