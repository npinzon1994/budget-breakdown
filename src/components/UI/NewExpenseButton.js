import React from "react";
import classes from "./NewExpenseButton.module.css";

const NewExpenseButton = (props) => {
  return (
    // <div className={`${classes["button-container"]} ${props.divClassName}`}>
      <button
        type={props.type}
        className={`${classes["new-expense-button"]} ${props.buttonClassName}`}
        onClick={props.onShowNew}
      >
        {props.children}
      </button>
    // </div>
  );
};

export default NewExpenseButton;
