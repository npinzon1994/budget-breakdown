import React, {Fragment} from "react";
import Card from "./UI/Card";
import DailyExpense from "./DailyExpense";
import DailyExpenseHeader from "./Layout/DailyExpenseHeader";
import classes from './DailyExpenses.module.css';

const DailyExpenses = (props) => {
  const DUMMY_EXPENSES = [
    {
      id: "a1",
      amount: 36.16,
      date: new Date(2022, 3, 18),
      isPaid: false,
      merchant: "Wawa",
    },
    {
      id: "a2",
      amount: 19.55,
      date: new Date(2022, 3, 12),
      isPaid: false,
      merchant: "Mobil",
    },
    {
      id: "a3",
      amount: 5.82,
      date: new Date(2022, 2, 28),
      isPaid: false,
      merchant: "Taco Bell",
    },
  ];

  //creates a new array of DailyExpense
  //needed to map DUMMY_EXPENSES to this array in order to create the DummyExpense list items
  const expenses = DUMMY_EXPENSES.map((expense) => (
    <DailyExpense
      key={expense.id}
      amount={expense.amount}
      date={expense.date}
      isPaid={expense.isPaid}
      merchant={expense.merchant}
    />
  ));

  return (
    <Fragment>
      <Card>
        <DailyExpenseHeader />
        <ul className={classes['daily-expenses']}>{expenses}</ul>
      </Card>
    </Fragment>
  );
};

export default DailyExpenses;
