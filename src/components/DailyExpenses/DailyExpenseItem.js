import React, { Fragment } from "react";
import classes from "./DailyExpenseItem.module.css";
import PropTypes from "prop-types";
import Date from "./Date";
import redX from '../../assets/red-x-circle.png';
import greenCheck from '../../assets/checkmark-circle.png';

/**
 * This component creates a Daily Expense item
 *
 * @visibleName Daily Expense Item
 *
 */
const DailyExpenseItem = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "short" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const formattedTotal = `$${(+props.amount).toFixed(2)}`;

  let isPaidLabel = "Not paid off";
  let isPaidImage = redX;
  let isPaidImageAltText = 'Red checkmark';
  if (props.isPaid === "Y") {
    isPaidLabel = "Paid off";
    isPaidImage = greenCheck;
    isPaidImageAltText = 'Green checkmark';
  }

  return (
    <Fragment>
      <li className={classes["daily-expense"]}>
        <div className={classes["list-item-content"]}>
          <Date month={month} day={day} year={year} />
          <div className={classes["money-container"]}>
            <span className={classes.price}>{formattedTotal}</span>
            <span className={classes['paid-off']}>{isPaidLabel} <img src={isPaidImage} alt={isPaidImageAltText}/></span>
          </div>
          <span className={classes.merchant}>{props.merchant}</span>
          <button
            onClick={props.onRemove}
            className={classes["remove-button"]}
          ></button>
        </div>
      </li>
      <hr />
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
