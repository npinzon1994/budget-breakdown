import classes from "./Button.module.css";
import { FC, ReactNode } from "react";

type Props = {
  className: string;
  tooltip: string;
  onClick: () => void;
  children: ReactNode;
};

const Button: FC<Props> = ({ className, tooltip, onClick, children }) => {
  return (
    <button
      className={`${classes.button} ${className}`}
      data-tooltip={tooltip ? tooltip : null}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
