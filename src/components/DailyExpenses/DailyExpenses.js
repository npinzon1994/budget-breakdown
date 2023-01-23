import React, { Fragment, useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";
import useHttp from "../../hooks/use-http";
import DailyExpenseFilter from "../Layout/DailyExpenseFilter";

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const { isLoading, error, sendRequest: fetchExpenses } = useHttp();
  const [filteredState, setFilteredState] = useState("Show All");

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
  };

  useEffect(() => {
    const transformExpenses = (expenseObject) => {
      let loadedExpenses = [];
      for (const key in expenseObject) {
        loadedExpenses.push({
          id: key,
          date: new Date(expenseObject[key].date),
          amount: expenseObject[key].amount,
          isPaid: expenseObject[key].isPaid,
          merchant: expenseObject[key].merchant,
        });

        loadedExpenses.sort(function (a, b) {
          return a.date.valueOf() - b.date.valueOf();
        });

        loadedExpenses.reverse();
      }
      expensesContext.setExpenses(loadedExpenses);
    };

    fetchExpenses(
      {
        url: "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json",
      },
      transformExpenses
    );
  }, [fetchExpenses]);

  let filteredExpenses = [...expensesContext.items];
  if (filteredState === "Paid Expenses") {
    filteredExpenses = filteredExpenses.filter((expense) => expense.isPaid === "Y");
  }
  if (filteredState === "Unpaid Expenses") {
    filteredExpenses = filteredExpenses.filter((expense) => expense.isPaid === "N");
  }

  //creates a new array of DailyExpenseItem(s)
  const expenses = filteredExpenses.map((expense) => (
    <DailyExpenseItem
      key={expense.id}
      amount={expense.amount}
      date={expense.date}
      isPaid={expense.isPaid}
      merchant={expense.merchant}
      onRemove={removeItemHandler.bind(null, expense.id)} //binding expense.id so the actual expense.id can also be used
      //need to bind in order to be able to pass down to ExpenseItem.js
    />
  ));

  

  const filterExpenses = (state) => {
    setFilteredState(state);
  };

  const transitionText = classes["transition-text"];
  const expenseListIsEmpty = expensesContext.items.length === 0;

  return (
    <Fragment>
      {console.log(filteredState)}
      <DailyExpenseFilter onFilter={filterExpenses} />
      <Card>
        {expenseListIsEmpty && !isLoading && (
          <p className={transitionText}>So much empty :0</p>
        )}
        {error && <p className={transitionText}>{error}</p>}
        {isLoading && !error && (
          <p className={transitionText}>Loading expenses...</p>
        )}
        {!isLoading && (
          <ul className={classes["daily-expenses"]}>{expenses}</ul>
        )}
      </Card>
    </Fragment>
  );
};

export default DailyExpenses;
