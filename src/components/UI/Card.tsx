import { CSSProperties, FC, ReactNode } from "react";
import classes from "./Card.module.css";

type CardProps = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

const Card: FC<CardProps> = ({ style, className, children }) => {
  return (
    <div className={`${classes.card} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
