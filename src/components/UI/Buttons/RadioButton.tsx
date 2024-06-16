'use client';

import { useEffect, useState, FC } from "react";
import classes from "./RadioButton.module.css";
import thumbsUpIcon from "../../../assets/thumbs-up-icon.svg";
import { Expense } from "../../../models/transaction";
import Image from "next/image";

type RadioButtonProps = {
  mode?: string;
  isPaid: (value: boolean) => void;
  currentExpenseItem?: Expense;
};

const RadioButton: FC<RadioButtonProps> = ({
  mode,
  isPaid,
  currentExpenseItem,
}) => {
  const editMode = mode === "edit";
  const defaultIsPaid =
    editMode && currentExpenseItem ? currentExpenseItem.isPaid : false;

  const [topButtonSelected, setTopButtonSelected] =
    useState<boolean>(defaultIsPaid);
  const [bottomButtonSelected, setBottomButtonSelected] = useState<boolean>(
    !defaultIsPaid
  );

  const topButtonClickHandler = () => {
    if (!topButtonSelected) {
      setTopButtonSelected(true);
      setBottomButtonSelected(false);
    }
  };

  const bottomButtonClickHandler = () => {
    if (!bottomButtonSelected) {
      setBottomButtonSelected(true);
      setTopButtonSelected(false);
    }
  };

  useEffect(() => {
    //lift state up whenever it changes
    if (topButtonSelected === true) {
      isPaid(true);
    } else {
      isPaid(false);
    }
  }, [isPaid, topButtonSelected]);

  return (
    <div className={classes["radio-button-container"]}>
      <div
        className={`${classes["radio-button"]} ${
          topButtonSelected ? classes.selected : ""
        }`}
        onClick={topButtonClickHandler}
      >
        <span className={classes.label}>Paid</span>
        {/* <ThumbsUpIcon className={classes["thumbs-up"]} /> */}
        <Image src={thumbsUpIcon} alt="thumbs up icon" className={classes['thumbs-up']}/>
      </div>
      <div
        className={`${classes["radio-button"]} ${
          bottomButtonSelected ? classes.selected : ""
        }`}
        onClick={bottomButtonClickHandler}
      >
        <span className={classes.label}>Unpaid</span>
        {/* <ThumbsDownIcon className={classes["thumbs-down"]} /> */}
        <Image src={thumbsUpIcon} alt="thumbs down icon" className={classes['thumbs-down']}/>
      </div>
    </div>
  );
};

export default RadioButton;
