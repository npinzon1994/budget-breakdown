"use client";

import "react-datepicker/dist/react-datepicker.css";
import { FC, useEffect, useRef, useState } from "react";
import classes from "./NewTransaction.module.css";
import FormHeader from "../Layout/FormHeader";
import DatePicker from "react-datepicker";
import Button from "../UI/Buttons/Button";
import { useFormState } from "react-dom";
import { createNewExpense } from "src/lib/actions";
import { useAppSelector } from "src/lib/store/hooks";

type Props = {
  id?: string;
  mode?: string;
  title?: string;
  onClose: () => void;
  onDelete: () => void;
};

const NewTransaction: FC<Props> = ({ id, mode, title, onClose, onDelete }) => {
  const currentAccount_ID = useAppSelector(
    (state) => state.account.currentAccount?._id
  );

  const defaultFormState = {
    status: null,
    message: null,
    currentAccount_ID,
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    console.log("SELECTED DATE: ", selectedDate?.toISOString().split("T")[0]);
  }, [selectedDate]);

  const [state, formAction] = useFormState(createNewExpense, defaultFormState);

  if (formRef.current && state.status === 200) {
    console.log("RESETTING TRANSACTION FORM...");
    formRef.current.reset();
  }

  return (
    <form
      className={classes.form}
      name="submit-form"
      action={formAction}
      ref={formRef}
    >
      <FormHeader title="New Expense" onClose={onClose} />

      {state.status === 400 ? (
        <p className={classes.error}>{state.message}</p>
      ) : undefined}
      <div className={classes["top-container"]}>
        <div className={classes["input-container"]}>
          <input
            id="amountField"
            name="amount"
            type="number"
            step=".01"
            className={classes.input}
          />
          <label htmlFor="amountField" className={classes["input-placeholder"]}>
            Amount
          </label>
        </div>

        <div className={classes["datepicker-container"]}>
          <DatePicker
            name="datePicker"
            id="datePicker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            // onBlur={onBlur}
            placeholderText="MM/DD/YYYY"
            className={classes.datepicker}
            shouldCloseOnSelect
          />
          <label
            htmlFor="datePicker"
            className={classes["datepicker-placeholder"]}
          >
            Date
          </label>
        </div>
      </div>

      <div className={classes["bottom-container"]}>
        <div className={classes["input-container"]}>
          <input
            name="merchant"
            id="merchantField"
            maxLength={100}
            className={`${classes.input} ${classes.textarea}`}
            data-testid="merchant-input-field"
          />
          <label
            htmlFor="merchantField"
            className={`${classes["input-placeholder"]} ${classes["textarea-placeholder"]}`}
          >
            Merchant
          </label>
        </div>
      </div>

      <div className={classes["button-container"]}>
        <Button
          type="submit"
          className={`${classes.button} ${classes.create}`}
          data-testid="submit-button"
        >
          Add
        </Button>

        <Button
          className={`${classes.button} ${classes.cancel}`}
          type="button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewTransaction;
