import React, { Fragment, useContext } from "react";
import ExpensesContext from "../../context/expenses-context";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const totalBalance = `$${(+expensesContext.totalBalance).toFixed(2)}`;

  return (
    <Fragment>
      <div className={classes["header-bar"]}>
        <h3>
          Budget Breakdown
          <br /> Expense Tracker
        </h3>
        <HeaderButton onClick={props.onShow}>New Expense</HeaderButton>
      </div>

      <div className={classes["remaining-balance"]}>
        <span>{"Total"}</span>
        <span>{totalBalance}</span>
      </div>
    </Fragment>
  );
};

export default Header;
