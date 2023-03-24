import React from "react";
import classes from "./FormHeader.module.css";
import CloseButtonX from "../UI/CloseButtonX";

const FormHeader = (props) => {
  return (
    <div className={classes.header}>
      <span className={classes.title}>{props.title}</span>
      <CloseButtonX onClose={props.onClose} />
    </div>
  );
};

export default FormHeader;
