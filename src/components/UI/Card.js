import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
  <div className={classes.card}>
    {console.log("BEFORE CARD RENDER")}
    <div className={classes.card}>{props.children}</div>
    {console.log("AFTER CARD RENDER")}
  </div>
  );
};

export default Card;
