import React from "react";
import classes from "./RemainingBalanceHeader.module.css";

const RemainingBalanceHeader = (props) => {
  return (
    <div>
      <h3>{'Total: ' + props.total}</h3>
    </div>
  );
};

export default RemainingBalanceHeader;
