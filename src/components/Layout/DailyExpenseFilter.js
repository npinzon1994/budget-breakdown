import React from "react";
import classes from "./DailyExpenseFilter.module.css";
import { useContext } from "react";
import ExpensesContext from "../../context/expenses-context";

const DailyExpenseFilter = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const totalBalance = `$${(+expensesContext.totalBalance).toFixed(2)}`;

  const filterExpensesHandler = (event) => {
    props.onFilter(event.target.value);
  }

  return (
    <div className={classes.container}>
      <div className={classes.invisible}>empty</div>
      <div className={classes["remaining-balance"]}>
        <span>{"Total"}</span>
        <span className={classes['total-balance']}>{totalBalance}</span>
      </div>

      <div className={classes["filter-container"]}>
        <label>Filter Expenses</label>
        <select onChange={filterExpensesHandler}>
          <option value="Show All">Show All</option>
          <option value="Paid Expenses">Paid Expenses</option>
          <option value="Unpaid Expenses">Unpaid Expenses</option>
        </select>
      </div>
    </div>
  );
};

export default DailyExpenseFilter;
