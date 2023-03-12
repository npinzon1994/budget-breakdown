import React from "react";
import classes from "./NewExpenseButton.module.css";

const NewExpenseButton = (props) => {
  return (
    <div className={classes["button-container"]}>
      <button
        type={props.type}
        className={classes["new-expense-button"]}
        onClick={props.onShowNew}
      >
        {props.children}
      </button>
    </div>
  );
};

export default NewExpenseButton;
