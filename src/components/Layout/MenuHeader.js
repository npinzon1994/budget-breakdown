import React from "react";
import classes from "./MenuHeader.module.css";
import Button from "../Button";

const MenuHeader = (props) => {
  return (
    <div className={classes["header-bar"]}>
      <h3>
        Budget Breakdown
        <br /> Expense Tracker
      </h3>
      
        <Button label={"+ Add New Expense"} />
    </div>
  );
};

export default MenuHeader;
