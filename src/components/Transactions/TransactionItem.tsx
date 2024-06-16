'use client';

import { FC } from "react";
import classes from "./TransactionItem.module.css";
import redX from "../../assets/unpaid-x.svg";
import greenCheck from "../../assets/paid-checkmark.svg";
import dateTable from "../Expenses/DateTable";
import DateElement from "../Expenses/Date";
import Image from "next/image";

type Props = {
  id: string;
  date: Date;
  amount: number;
  isPaid: boolean;
  merchant: string;
  onShowEdit: () => void;
};

const TransactionItem: FC<Props> = ({
  id,
  date,
  amount,
  isPaid,
  merchant,
  onShowEdit,
}) => {
  
  const dateObject = new Date(date);

  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const formattedMonth = dateTable(month);

  const year = dateObject.getFullYear();

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
    <li className={classes.item} onClick={onShowEdit} key={id}>
      <div className={classes["list-item-content"]}>
        <DateElement
          month={formattedMonth}
          day={day.toString()}
          year={year.toString()}
        />
        <span className={classes.merchant}>{merchant}</span>
        <div className={classes["money-container"]}>
          <span className={classes.price}>{formattedTotal}</span>
          <div className={classes['paid-off']}>
            <div className={classes["image-container"]}>
              <Image src={isPaidImage} alt={isPaidImageAltText} fill />{" "}
            </div>
            <span>{isPaidLabel}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
