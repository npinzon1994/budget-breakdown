import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes["header-bar"]}>
        <h3>
          Budget Breakdown
          <br /> Expense Tracker
        </h3>
        <HeaderButton onClick={props.onShow}>New Expense</HeaderButton>
      </div>
    </Fragment>
  );
};

export default Header;
