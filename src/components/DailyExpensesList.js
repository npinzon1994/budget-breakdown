import React from "react";
import DailyExpense from "./DailyExpense";
import DailyExpenseHeader from "./Layout/DailyExpenseHeader";
import classes from './DailyExpensesList.module.css';

const DailyExpensesList = (props) => {
  //PROPS are still DUMMY_EXPENSES originating from App.js

  //remember DailyExpense's props are just what goes inside the list item

  //Daily Expense takes KEY, AMOUNT, DATE, ISPAID, MERCHANT as Props
  
  return (
    <div className={classes.dailyExpensesList}>
    <ul>
      <DailyExpense
        key={props.items[0].id}
        amount={props.items[0].amount}
        date={props.items[0].date}
        isPaid={props.items[0].isPaid}
        merchant={props.items[0].merchant}
      />
      <DailyExpense
        key={props.items[1].id}
        amount={props.items[1].amount}
        date={props.items[1].date}
        isPaid={props.items[1].isPaid}
        merchant={props.items[1].merchant}
      />
      <DailyExpense
        key={props.items[2].id}
        amount={props.items[2].amount}
        date={props.items[2].date}
        isPaid={props.items[2].isPaid}
        merchant={props.items[2].merchant}
      />
    </ul>
    </div>
  );
};

export default DailyExpensesList;
