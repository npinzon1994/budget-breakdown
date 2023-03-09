import React from "react";
import classes from "./DailyExpenseFilter.module.css";
import { useContext } from "react";
import ExpensesContext from "../../context/expenses-context";
import Card from "../UI/Card";
import DailyExpenseButton from "../UI/NewExpenseButton";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const DailyExpenseFilter = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const totalBalance = currencyFormatter.format(expensesContext.totalBalance);

  const filterExpensesHandler = (event) => {
    props.onFilter(event.target.value);
  };

  return (
    <Card className={classes.container}>
      <div className={classes["filter-container"]}>
        {/* <label>Filter Expenses</label> */}
        <select onChange={filterExpensesHandler}>
          <option value="Show All">Show All</option>
          <option value="Paid Expenses">Paid Expenses</option>
          <option value="Unpaid Expenses">Unpaid Expenses</option>
        </select>
      </div>
      <div className={classes["remaining-balance"]}>
        <span>{"Total"}</span>
        <span className={classes["total-balance"]}>{totalBalance}</span>
      </div>
      <div className={classes['button-container']}>
        <DailyExpenseButton onClick={props.onShow}>+</DailyExpenseButton>
      </div>
    </Card>
  );
};

export default DailyExpenseFilter;
