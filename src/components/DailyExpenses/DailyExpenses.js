import React, { useContext } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import DailyExpenseHeader from "../Layout/DailyExpenseHeader";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);

  //creates a new array of DailyExpenseItem(s)

  const expenses = expensesContext.items.map((expense) => (
    <DailyExpenseItem
      key={expense.id}
      amount={expense.amount}
      date={expense.date}
      isPaid={expense.isPaid}
      merchant={expense.merchant}
    />
  ));

  return (
    <Card>
      
      <DailyExpenseHeader />
      <ul className={classes["daily-expenses"]}>
        {expenses.length > 0 ? (
          expenses
        ) : (
          <p className={classes["empty-message"]}>WOW! So much empty :0</p>
        )}
      </ul>
    </Card>
  );
};

export default DailyExpenses;
