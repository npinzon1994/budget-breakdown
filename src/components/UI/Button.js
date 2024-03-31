import React from "react";
import classes from "./Button.module.css";

const Button = ({className, tooltip, children, ...props}) => {
  return (
      <button
        className={`${classes.button} ${className}`}
        datatooltip={tooltip ? tooltip : null}
        {...props}
      >
        {children}
      </button>
  );
};

export default Button;
