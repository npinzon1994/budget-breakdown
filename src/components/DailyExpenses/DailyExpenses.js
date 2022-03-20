import React, { Fragment } from "react";
import Card from "../UI/Card";
import DailyExpense from "../DailyExpenses/DailyExpense";
import DailyExpenseHeader from "../Layout/DailyExpenseHeader";
import classes from "./DailyExpenses.module.css";
import RemainingBalanceHeader from "../Layout/RemainingBalanceHeader";

const DailyExpenses = (props) => {
  const DUMMY_EXPENSES = [
    {
      id: "a1",
      amount: 36.16,
      date: new Date(2022, 2, 18),
      isPaid: false,
      merchant: "Wawa",
    },
    {
      id: "a2",
      amount: 19.55,
      date: new Date(2022, 2, 12),
      isPaid: false,
      merchant: "Mobil",
    },
    {
      id: "a3",
      amount: 5.82,
      date: new Date(2022, 1, 28),
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

  const totalBalance = `$${(
    DUMMY_EXPENSES[0].amount +
    DUMMY_EXPENSES[1].amount +
    DUMMY_EXPENSES[2].amount
  ).toFixed(2)}`;

  return (
    <Fragment>
      <RemainingBalanceHeader total={totalBalance} />
      <Card>
        <DailyExpenseHeader />
        <ul className={classes["daily-expenses"]}>{expenses}</ul>
      </Card>
    </Fragment>
  );
};

export default DailyExpenses;
