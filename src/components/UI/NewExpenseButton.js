import React from "react";
import classes from "./NewExpenseButton.module.css";

const NewExpenseButton = (props) => {
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

export default NewExpenseButton;
