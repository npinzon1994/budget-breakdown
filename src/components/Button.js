import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes["new-expense-button"]}>{props.label}</button>
  );
};

export default Button;
