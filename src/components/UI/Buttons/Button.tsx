'use client';

import classes from "./Button.module.css";
import { FC, ReactNode } from "react";

type Props = {
  className?: string;
  tooltip?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
};

const Button: FC<Props> = ({ className, tooltip, onClick, type, children }) => {
  return (
    <button
      className={`${classes.button} ${className}`}
      data-tooltip={tooltip}
      onClick={onClick}
      type={type ? type : "submit"}
    >
      {children}
    </button>
  );
};

export default Button;
