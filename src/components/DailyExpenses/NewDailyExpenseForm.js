import React, { useRef, useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./NewDailyExpenseForm.module.css";
import ExpensesContext from "../../context/expenses-context";
import useInput from "../../hooks/use-input";

let uniqueId = 0;

//USEINPUT VALIDATION FUNCTIONS
const isNotEmpty = (value) => value !== "";
const isValidAmount = (value) => value !== "" && value > 0;
const selectionIsPicked = (value) => value === "Y" || value === "N";

const NewDailyExpenseForm = (props) => {
  const expensesContext = useContext(ExpensesContext);

  //USEINPUTS
  const {
    enteredValue: enteredAmount,
    inputIsValid: amountInputIsValid,
    hasError: amountHasError,
    inputChangeHandler: amountInputChangeHandler,
    inputOnBlurHandler: amountOnBlurHandler,
    reset: resetAmount,
  } = useInput(isValidAmount);

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
    <Modal onClose={props.onClose}>
      {console.log(enteredDate)}
      <form onSubmit={submitHandler} className={classes["add-expense-form"]}>
        <h3>New Daily Expense</h3>
        <input
          ref={amountInputRef}
          id="amountField"
          type="number"
          placeholder="Enter Amount"
          onChange={amountInputChangeHandler}
          onBlur={amountOnBlurHandler}
          value={enteredAmount}
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
          value={enteredDate}
          className={`${classes.input} ${dateHasError ? classes.invalid : ""}`}
        />
        <select
          ref={isPaidInputRef}
          id="isPaidDropdown"
          name="isPaidDropdown"
          onChange={isPaidInputChangeHandler}
          onBlur={isPaidOnBlurHandler}
          value={isPaidValue}
          className={`${classes.input} ${
            isPaidHasError ? classes.invalid : ""
          }`}
        >
          <option value="default">Paid Off?</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>

        <input
          ref={merchantInputRef}
          id="merchantField"
          type="text"
          placeholder="Merchant"
          onChange={merchantInputChangeHandler}
          onBlur={merchantOnBlurHandler}
          value={enteredMerchant}
          className={`${classes.input} ${
            merchantHasError ? classes.invalid : ""
          }`}
        />

        <div className={classes["button-div"]}>
          <button
            type="button"
            className={classes["close-button"]}
            onClick={props.onClose}
          >
            Close
          </button>
          <button type="submit" className={classes["add-expense-button"]}>
            Add Expense
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewDailyExpenseForm;
