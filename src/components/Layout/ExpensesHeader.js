import React, { useContext } from "react";
import classes from "./ExpensesHeader.module.css";
import NewExpenseButton from "../UI/NewExpenseButton";
import { useDispatch, useSelector } from "react-redux";
import { showHideActions } from "../../store/redux/show-hide-slice";
import { filterActions } from "../../store/redux/filter-slice";
import ExpensesContext from "../../store/expenses-context";
import ExpenseFilter from "../Expenses/ExpenseFilter";

const ExpensesHeader = () => {
  const expensesContext = useContext(ExpensesContext);

  const filterState = useSelector((state) => state.filter.filterState);
  const dispatch = useDispatch();

  const filterExpenses = (state) => {
    dispatch(filterActions.setFilterState(state));
  };

  let filteredExpenses = [...expensesContext.items];
  if (filterState === "Paid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === true
    );
  }
  if (filterState === "Unpaid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === false
    );
  }

  const showExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm(true));
  };

  return (
    <div className={classes.header}>
      <ExpenseFilter onFilter={filterExpenses} />
      <NewExpenseButton onShowNew={showExpenseFormHandler}>
        Add
      </NewExpenseButton>
    </div>
  );
};

export default ExpensesHeader;
