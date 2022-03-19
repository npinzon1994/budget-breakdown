import React from "react";
import classes from "./MenuHeader.module.css";
import Button from "../UI/Button";

const MenuHeader = (props) => {
  return (
    <div className={classes["header-bar"]}>
      <h3>
        Budget Breakdown
        <br /> Expense Tracker
      </h3>
      
        <Button onClick={props.onShow}>+ Add New Expense</Button>
    </div>
  );
};

export default MenuHeader;
