import React from "react";
import Tablemeal from "../../assets/DeepCraving.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1 className={classes.bump}>DEEP CRAVINGS</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div>
        <img
          className={classes["main-image"]}
          src={Tablemeal}
          alt="A table empty for you to fill with your cravings!"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
