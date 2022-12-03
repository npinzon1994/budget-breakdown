import React, { useContext } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
  };

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
        {expenses.length > 0 ? (
          expenses
        ) : (
          <li className={classes["empty-message"]}>WOW! So much empty :0</li>
        )}
      </ul>
    </Card>
  );
};

export default DailyExpenses;
