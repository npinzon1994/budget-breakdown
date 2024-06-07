"use client";

import Modal from "src/components/UI/Modal";
import { FC, useState } from "react";
import { createNewAccount } from "src/lib/actions";
import classes from "./NewAccountForm.module.css";
import Select from "react-select";
import Option from "src/models/option";
import FormHeader from "src/components/Layout/FormHeader";
import { useFormState } from "react-dom";
import AccountsFormSubmit from "./AccountsFormSubmit";
import { useAppDispatch } from "src/lib/store/hooks";

type NewAccountFormProps = {
  onClose: () => void;
};

const accountOptions: Option[] = [
  new Option("Choose Account Type", "Choose Account Type"),
  new Option("Checking", "Checking"),
  new Option("Savings", "Savings"),
  new Option("Loan", "Loan"),
  new Option("Credit Card", "Credit Card"),
  new Option("SNAP", "SNAP"),
  new Option("Other", "Other"),
];

type FormState = {
  status: number | null;
  message: string | null;
};

const defaultFormState: FormState = {
  status: null,
  message: null,
};

const NewAccountForm: FC<NewAccountFormProps> = ({ onClose }) => {
  const [state, formAction] = useFormState(createNewAccount, defaultFormState);
  const [hasDebit, setHasDebit] = useState(false);
  const dispatch = useAppDispatch();

  const debitCheckboxHandler = () => {
    setHasDebit((prev) => !prev);
  };

  

  return (
    <Modal
      onClose={onClose}
      className={classes.modal}
      backdropClassName={classes.backdrop}
    >
      <FormHeader
        title="New Account"
        onClose={onClose}
        headerClasses={classes["form-header"]}
        titleClasses={classes["form-title"]}
      />
      <form action={formAction} className={classes.form}>
        <div className={classes["input-container"]}>
          <label htmlFor="account-type">Account Type</label>
          <Select
            options={accountOptions}
            defaultValue={accountOptions[0]}
            id="account-type"
            name="account-type"
          />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="account-nickname">Account Nickname</label>
          <input
            type="text"
            className={classes.input}
            id="account-nickname"
            name="account-nickname"
          />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="bank">Bank</label>
          <input type="text" className={classes.input} id="bank" name="bank" />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="account-number">Account #</label>
          <input
            type="number"
            className={classes.input}
            id="account-number"
            name="account-number"
          />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="routing-number">Routing #</label>
          <input
            type="number"
            className={classes.input}
            id="routing-number"
            name="routing-number"
          />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="starting-balance">Starting Balance</label>
          <input
            type="number"
            className={classes.input}
            id="starting-balance"
            name="starting-balance"
          />
        </div>
        <div className={classes["checkbox-container"]}>
          <input
            type="checkbox"
            id="add-debit"
            name="add-debit"
            value="add-debit"
            onClick={debitCheckboxHandler}
          />
          <label htmlFor="add-debit">
            I want to associate a debit card with this account
          </label>
        </div>
        {hasDebit ? (
          <ul className={classes["debit-card-list"]}>
            <li className={classes["debit-card"]}>Debit 1</li>
            <li className={classes["debit-card"]}>Debit 2</li>
            <li className={classes["debit-card"]}>Debit 3</li>
            <li className={`${classes["debit-card"]} ${classes.add}`}>+</li>
          </ul>
        ) : undefined}
        <div className={classes["button-container"]}>
          <AccountsFormSubmit className={classes["submit-button"]} formState={state} />
        </div>
      </form>
    </Modal>
  );
};

export default NewAccountForm;
