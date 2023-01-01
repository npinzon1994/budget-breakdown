import React, { useContext, useEffect } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
  };

  useEffect(() => {
    const fetchDataFromServer = async () => {
      const response = await fetch("https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json");
      const data = await response.json();
  
      //now we have the JSON object (data) which contains expense objects
      //need to convert object to array first so we can add it to our context
      let loadedExpenses = [];
      for(const key in data) {
        loadedExpenses.push({
          id: key,
          date: new Date(data[key].date),
          amount: data[key].amount,
          isPaid: data[key].isPaid,
          merchant: data[key].merchant
        });
      }
      expensesContext.setExpenses(loadedExpenses);
  
    }
    fetchDataFromServer();
  }, [expensesContext]);

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

  return (
    <Card>
      <ul className={classes["daily-expenses"]}>
        {expenses}
      </ul>
    </Card>
  );
};

export default DailyExpenses;
