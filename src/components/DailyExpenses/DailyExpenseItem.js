import React, { Fragment, useContext } from "react";
import ExpensesContext from "../../context/expenses-context";
import EditButton from "../UI/EditButton";
import RemoveButton from "../UI/RemoveButton";
import classes from "./DailyExpenseItem.module.css";

const DailyExpenseItem = (props) => {
  //Daily Expense (most likely a food purchase)
  //expense has amount, date, isPaid, and merchant
  const expensesContext = useContext(ExpensesContext);

  const month = props.date.toLocaleString("en-US", { month: "2-digit" }) + "/";
  const day = props.date.toLocaleString("en-US", { day: "2-digit" }) + "/";
  const year = props.date.getFullYear();
  const formattedTotal = `$${(+props.amount).toFixed(2)}`;

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id);
  }

  return (
    <Fragment>
      <li className={classes["daily-expense"]}>
        <div className={classes["list-item-content"]}>
          <span>{formattedTotal}</span>
          <span>{month + day + year}</span>
          <span>{props.isPaid}</span>
          <span>{props.merchant}</span>
        </div>
        <div className={classes.buttons}>
          <RemoveButton button={{
            onClick: removeItemHandler
          }}/>
          <EditButton />
        </div>
      </li>
    </Fragment>
  );
};

export default DailyExpenseItem;
