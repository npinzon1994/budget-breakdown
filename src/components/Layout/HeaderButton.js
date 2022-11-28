import React from "react";
import classes from "./HeaderButton.module.css";

const HeaderButton = (props) => {
  return (
    <button
      type={props.type}
      className={classes["new-expense-button"]}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default HeaderButton;
