'use client';

import "react-datepicker/dist/react-datepicker.css";
import { FC, useState } from "react";
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
  const currentAccount = useAppSelector(state => state.account.currentAccount);
  const defaultState = {
    status: null,
    message: null,
    currentAccount,
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const [state, formAction] = useFormState(createNewExpense, defaultState);
  
  return (
    <form className={classes.form} name="submit-form" action={formAction}>
      <FormHeader title="New Expense" onClose={onClose} />
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
            isClearable
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
