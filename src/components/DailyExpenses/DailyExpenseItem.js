import React, { Fragment } from "react";
import RemoveButton from "../UI/RemoveButton";
import classes from "./DailyExpenseItem.module.css";
import PropTypes from "prop-types";

/**
 * This component creates a Daily Expense item
 *
 * @visibleName Daily Expense Item
 *
 */
const DailyExpenseItem = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "2-digit" }) + "/";
  const day = props.date.toLocaleString("en-US", { day: "2-digit" }) + "/";
  const year = props.date.getFullYear();
  const formattedTotal = `$${(+props.amount).toFixed(2)}`;

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
          <RemoveButton
            button={{
              onClick: props.onRemove,
            }}
          />
        </div>
      </li>
    </Fragment>
  );
};

DailyExpenseItem.propTypes = {
  /**
   * Date of expense
   */
  date: PropTypes.string.isRequired,
  /**
   * Amount spent
   */
  amount: PropTypes.number.isRequired,
  /**
   * Was the expense paid off yet?
   */
  isPaid: PropTypes.bool.isRequired,
  /**
   * Merchant with whom transaction took place
   */
  merchant: PropTypes.string.isRequired,
};

DailyExpenseItem.defaultProps = {
  date: "2023-01-01",
  amount: 19.95,
  isPaid: false,
  merchant: "Taco Bell",
};

export default DailyExpenseItem;
