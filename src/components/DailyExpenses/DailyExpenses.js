import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
  };

  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch("https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      //now we have the JSON object (data) which contains expense objects
      //need to convert object to array first so we can add it to our context
      let loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          date: new Date(data[key].date),
          amount: data[key].amount,
          isPaid: data[key].isPaid,
          merchant: data[key].merchant,
        });
      }
      expensesContext.setExpenses(loadedExpenses);

      setIsLoading(false);
    };

    fetchDataFromServer().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  //creates a new array of DailyExpenseItem(s)
  const expenses = expensesContext.items.map((expense) => (
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

  const transitionText = classes['transition-text'];
  const expenseListIsEmpty = expensesContext.items.length === 0;

  return (
    <Card>
      {expenseListIsEmpty && !isLoading && <p className={transitionText}>So much empty :0</p>}
      {error && <p className={transitionText}>{error}</p>}
      {isLoading && !error && <p className={transitionText}>Loading expenses...</p>}
      {!isLoading && <ul className={classes["daily-expenses"]}>{expenses}</ul>}
    </Card>
  );
};

export default DailyExpenses;
