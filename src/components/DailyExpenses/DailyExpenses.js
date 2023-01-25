import React, { Fragment, useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";
import useHttp from "../../hooks/use-http";
import DailyExpenseFilter from "../Layout/DailyExpenseFilter";

let isInitial = true;

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const [filteredState, setFilteredState] = useState("Show All");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
  };

  //gets all expenses on startup
  useEffect(() => {
    const getExpenseData = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      //data is good EXCEPT for the date
      //need to convert to JS Date objects
      const data = await response.json();

      let loadedExpenses = [];
      for (let i = 0; i < data.items.length; i++) {
        loadedExpenses.push({
          id: data.items[i].id,
          date: new Date(data.items[i].date.substring(0, 10)),
          amount: data.items[i].amount,
          isPaid: data.items[i].isPaid,
          merchant: data.items[i].merchant,
        });
      }

      expensesContext.setExpenses(loadedExpenses);

      setIsLoading(false);
    };

    getExpenseData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  //sends cart data to the server
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const sendExpenseData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: expensesContext.items,
            totalBalance: expensesContext.totalBalance,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setIsLoading(false);
    };

    sendExpenseData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [expensesContext]);

  let filteredExpenses = [...expensesContext.items];
  if (filteredState === "Paid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === "Y"
    );
  }
  if (filteredState === "Unpaid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === "N"
    );
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
