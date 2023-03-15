import React from "react";
import classes from "./MainHeader.module.css";
import { useContext } from "react";
import ExpensesContext from "../../store/expenses-context";
import Card from "../UI/Card";
import NewExpenseButton from "../UI/NewExpenseButton";
import filterIconImg from "../../assets/filter-icon.svg";
import useWindowHeight from "../../hooks/use-window-height";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../store/redux/filter-slice";
import ExpenseFilter from "../Expenses/ExpenseFilter";

const filterIcon = (
  <div>
    <img
      src={filterIconImg}
      alt="filter icon"
      className={classes["filter-icon"]}
    />
  </div>
);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MainHeader = (props) => {
  const screenHeight = useWindowHeight();
  const bannerHeight = screenHeight * 0.115;

  const expensesContext = useContext(ExpensesContext);
  const totalBalance = currencyFormatter.format(expensesContext.totalBalance);

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

  return (
    <div className={classes['invisible-wrapper']}>
      <Card
        className={classes.container}
        style={{ minHeight: `${bannerHeight}px` }}
      >
        <ExpenseFilter onFilter={filterExpenses} />
        <div className={classes["remaining-balance"]}>
          <span className={classes["total-label"]}>Total</span>
          <span className={classes["total-balance"]}>{totalBalance}</span>
        </div>

        {/* <NewExpenseButton onShowNew={props.onShowNew}>+</NewExpenseButton> */}
      </Card>
    </div>
  );
};

export default MainHeader;
