import { useContext, useState, useRef, FC } from "react";
import classes from "./NewTransaction.module.css";
import ExpenseContext from "../../context/expense-context";
import FormHeader from "../Layout/FormHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../UI/Modal";
import { useAppDispatch } from "../../lib/store/hooks";
import { uniqueIdActions } from "../../lib/store/generate-unique-id-slice";
import { sendingActions } from "../../lib/store/sending-slice";
import { showHideActions } from "../../lib/store/show-hide-slice";
import RadioButton from "../UI/Buttons/RadioButton";
import Button from "../UI/Buttons/Button";
import Transaction from "src/models/transaction";

type Props = {
  id?: string;
  mode?: string;
  title?: string;
  onClose: () => void;
  onDelete: () => void;
};

const checkIsValidAmount = (amount: number) =>
  +amount >= 0 && +amount < 1_000_000;

const NewTransaction: FC<Props> = ({ id, mode, title, onClose, onDelete }) => {
  return (
    <form className={classes.form} name="submit-form">
      <FormHeader title="New Transaction" onClose={onClose} />
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
            onChange={() => {}}
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
