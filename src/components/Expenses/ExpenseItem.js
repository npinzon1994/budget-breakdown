import React, { Fragment } from "react";
import classes from "./ExpenseItem.module.css";
import redX from "../../assets/unpaid-x.svg";
import greenCheck from "../../assets/paid-checkmark.svg";
import dateTable from "./DateTable";
import Date from "./Date";
// import useWindowWidth from "../../hooks/use-window-width";

const ExpenseItem = ({date, amount, isPaid, merchant, onShowEdit}) => {
  // const screenWidth = useWindowWidth();

  const day = date.getDate();
  const month = date.getMonth();
  const formattedMonth = dateTable(month);

  const year = date.getFullYear();

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedTotal = currencyFormatter.format(amount);

  let isPaidLabel = "Unpaid";
  let isPaidImage = redX;
  let isPaidImageAltText = "Red checkmark";
  if (isPaid === true) {
    isPaidLabel = "Paid";
    isPaidImage = greenCheck;
    isPaidImageAltText = "Green checkmark";
  }

  return (
    <Fragment>
      <li className={classes["daily-expense"]} onClick={onShowEdit}>
        <div className={classes["list-item-content"]}>
          <Date month={formattedMonth} day={day} year={year} />
          <span className={classes.merchant}>{merchant}</span>
          <div className={classes["money-container"]}>
            <span className={classes.price}>{formattedTotal}</span>
            <span className={classes["paid-off"]}>
              <img src={isPaidImage} alt={isPaidImageAltText} /> {isPaidLabel}
            </span>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default ExpenseItem;
