import React, { Fragment } from "react";
import classes from './DailyExpense.module.css'

const DailyExpense = (props) => {
  //Daily Expense (most likely a food purchase)
  //expense has amount, date, isPaid, and merchant
  
  const month = props.date.toLocaleString("en-US", {month: "2-digit"}) + '/';
  const day = props.date.toLocaleString("en-US", {day: '2-digit'}) + '/';
  const year = props.date.getFullYear();

  return (
    <li className={classes.dailyExpense}>
        <span>{props.amount}</span>
        <span>{month + day + year}</span>
        <span>{props.isPaid === true ? 'Y' : 'N'}</span>
        <span>{props.merchant}</span>
    </li>
  );
};

export default DailyExpense;
