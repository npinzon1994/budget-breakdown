import React, { Fragment } from "react";
import classes from "./DailyExpenseItem.module.css";
import redX from "../../assets/unpaid-x.svg";
import greenCheck from "../../assets/paid-checkmark.svg";
import dateTable from "./DateTable";
import Date from "./Date";

const DailyExpenseItem = (props) => {
  const day = props.date.getUTCDate();
  const month = props.date.getUTCMonth();
  const formattedMonth = dateTable(month);

  const year = props.date.getUTCFullYear();

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // const formattedTotal = `$${(+props.amount).toFixed(2)}`;
  const formattedTotal = currencyFormatter.format(props.amount);

  let isPaidLabel = "Not paid off";
  let isPaidImage = redX;
  let isPaidImageAltText = "Red checkmark";
  if (props.isPaid === "Y") {
    isPaidLabel = "Paid off";
    isPaidImage = greenCheck;
    isPaidImageAltText = "Green checkmark";
  }

  return (
    <Fragment>
      <li className={classes["daily-expense"]}>
        <div className={classes["list-item-content"]}>
          <div className={classes["date-outer-container"]}>
            <Date month={formattedMonth} day={day} year={year} />
          </div>
          <div className={classes["money-container"]}>
            <span className={classes.price}>{formattedTotal}</span>
            <span className={classes["paid-off"]}>
              <img src={isPaidImage} alt={isPaidImageAltText} /> {isPaidLabel}
            </span>
          </div>
          <div className={classes["merchant-container"]}>
            <span className={classes.merchant}>{props.merchant}</span>
          </div>
          <div className={classes['button-container']}>
            <button
              onClick={props.onRemove}
              className={classes["remove-button"]}
            ></button>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default DailyExpenseItem;
