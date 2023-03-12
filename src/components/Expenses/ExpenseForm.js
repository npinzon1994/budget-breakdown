import React, { useRef, useContext, useState } from "react";
import classes from "./ExpenseForm.module.css";
import ExpensesContext from "../../store/expenses-context";
import useInput from "../../hooks/use-input";
import FormHeader from "../UI/FormHeader";
import Card from "../UI/Card";
import ToggleSwitch from "../UI/ToggleSwitch";

let uniqueId = 0;

//USEINPUT VALIDATION FUNCTIONS
const isNotEmpty = (value) => value !== "";
const isValidNumber = (value) => value > 0 && value < 1000000;
const selectionIsPicked = (value) => value === "Y" || value === "N";

const ExpenseForm = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const currentExpenseItem = expensesContext.items.find(
    (item) => item.id === props.id
  );

  const [checked, setChecked] = useState(true);

  //USEINPUTS
  const {
    enteredValue: enteredAmount,
    inputIsValid: amountInputIsValid,
    hasError: amountHasError,
    inputChangeHandler: amountInputChangeHandler,
    inputOnBlurHandler: amountOnBlurHandler,
    reset: resetAmount,
  } = useInput(isNotEmpty && isValidNumber);

  const {
    enteredValue: enteredDate,
    inputIsValid: dateInputIsValid,
    hasError: dateHasError,
    inputChangeHandler: dateInputChangeHandler,
    inputOnBlurHandler: dateOnBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);

  const {
    enteredValue: isPaidValue,
    inputIsValid: isIsPaidValid,
    hasError: isPaidHasError,
    inputChangeHandler: isPaidInputChangeHandler,
    inputOnBlurHandler: isPaidOnBlurHandler,
    reset: resetIsPaid,
  } = useInput(selectionIsPicked);

  const {
    enteredValue: enteredMerchant,
    inputIsValid: merchantInputIsValid,
    hasError: merchantHasError,
    inputChangeHandler: merchantInputChangeHandler,
    inputOnBlurHandler: merchantOnBlurHandler,
    reset: resetMerchant,
  } = useInput(isNotEmpty);

  //INPUT REFS
  const amountInputRef = useRef();
  const dateInputRef = useRef();
  const isPaidInputRef = useRef();
  const merchantInputRef = useRef();

  //object to be added -- contains all values captured from the form
  const newExpenseObject = {
    id: "E" + uniqueId++,
    date: new Date(enteredDate),
    amount: enteredAmount,
    isPaid: isPaidValue,
    merchant: enteredMerchant,
  };

  const formIsValid =
    amountInputIsValid &&
    dateInputIsValid &&
    isIsPaidValid &&
    merchantInputIsValid;

  const resetInputs = () => {
    resetAmount();
    resetDate();
    resetIsPaid();
    resetMerchant();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      expensesContext.onAddExpense(newExpenseObject);
      resetInputs();
    } else {
      if (!amountInputIsValid) {
        amountInputRef.current.focus();
      } else if (!dateInputIsValid) {
        dateInputRef.current.focus();
      } else if (!isIsPaidValid) {
        isPaidInputRef.current.focus();
      } else if (!merchantInputIsValid) {
        merchantInputRef.current.focus();
      }
    }
  };

  return (
    <Card className={classes.card}>
      <FormHeader title={props.title} onClose={props.onClose} />
      <form onSubmit={submitHandler} className={classes["add-expense-form"]}>
        {amountHasError && (
          <span className={classes["error-text"]}>
            *Please enter an amount between $0 and $1,000,000
          </span>
        )}
        <div className={classes["top-container"]}>
          <input
            ref={amountInputRef}
            id="amountField"
            type="number"
            placeholder="Enter Amount"
            onChange={amountInputChangeHandler}
            onBlur={amountOnBlurHandler}
            value={
              props.mode === "edit" ? currentExpenseItem.amount : enteredAmount
            }
            className={`${classes.input} ${
              amountHasError ? classes.invalid : ""
            }`}
          />
          <input
            ref={dateInputRef}
            id="datePicker"
            type="date"
            onChange={dateInputChangeHandler}
            onBlur={dateOnBlurHandler}
            value={
              props.mode === "edit"
                ? currentExpenseItem.date.toISOString().substring(0, 10)
                : enteredDate
            }
            max="9999-12-13"
            className={`${classes.input} ${
              dateHasError ? classes.invalid : ""
            }`}
          />

          <div className={classes['toggle-switch-container']}>
            <label className={classes['paid-off-label']}>Paid off?</label>
            <ToggleSwitch
              id="switch"
              checked={checked}
              onChange={(checked) => setChecked(checked)}
            />
          </div>

          {/* <select
            ref={isPaidInputRef}
            id="isPaidDropdown"
            name="isPaidDropdown"
            onChange={isPaidInputChangeHandler}
            onBlur={isPaidOnBlurHandler}
            value={
              props.mode === "edit" ? currentExpenseItem.isPaid : isPaidValue
            }
            className={`${classes.input} ${
              isPaidHasError ? classes.invalid : ""
            }`}
          >
            <option value="default">Paid Off?</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select> */}
        </div>

        <textarea
          ref={merchantInputRef}
          id="merchantField"
          type="text"
          placeholder="Merchant"
          onChange={merchantInputChangeHandler}
          onBlur={merchantOnBlurHandler}
          maxLength="100"
          value={
            props.mode === "edit"
              ? currentExpenseItem.merchant
              : enteredMerchant
          }
          className={`${classes.input} ${classes.textarea} ${
            merchantHasError ? classes.invalid : ""
          }`}
        />

        <div className={classes["button-div"]}>
          <button type="submit" className={classes["add-expense-button"]}>
            {props.buttonText}
          </button>

          {props.mode === "edit" && (
            <button className={classes["remove-button"]} type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default ExpenseForm;
