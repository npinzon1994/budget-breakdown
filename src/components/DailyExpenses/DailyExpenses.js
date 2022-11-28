import React, { Fragment, useContext } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import DailyExpenseHeader from "../Layout/DailyExpenseHeader";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";

// const DUMMY_EXPENSES = [
//   {
//     id: "a1",
//     amount: 36.16,
//     date: new Date(2022, 2, 18),
//     isPaid: false,
//     merchant: "Wawa",
//   },
//   {
//     id: "a2",
//     amount: 19.55,
//     date: new Date(2022, 2, 12),
//     isPaid: false,
//     merchant: "Mobil",
//   },
//   {
//     id: "a3",
//     amount: 5.82,
//     date: new Date(2022, 1, 28),
//     isPaid: false,
//     merchant: "Taco Bell",
//   },
// ];

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);
  
  //creates a new array of DailyExpense
  //needed to map DUMMY_EXPENSES to this array in order to create the DummyExpense list items
  
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
        <ul className={classes["daily-expenses"]}>{expenses}</ul>
      </Card>
  );
};

export default DailyExpenses;
