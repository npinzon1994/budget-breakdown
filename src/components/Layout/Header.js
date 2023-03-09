import React, { Fragment } from "react";
import classes from "./Header.module.css";
import NewExpenseButton from "../UI/NewExpenseButton";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes["header-bar"]}>
        <h3>
          Budget Breakdown
          <br /> Expense Tracker
        </h3>
        <NewExpenseButton onClick={props.onShow}>New Expense</NewExpenseButton>
      </div>
    </Fragment>
  );
};

export default Header;
