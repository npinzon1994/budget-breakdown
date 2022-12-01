import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import Modal from "../UI/Modal";
import classes from "./NewDailyExpenseForm.module.css";
import ExpensesContext from "../../context/expenses-context";
import ExpenseFormReducers from "./ExpenseFormReducers";

//default states for reducers
const defaultAmountState = ExpenseFormReducers.defaultAmountState;
const defaultDateState = ExpenseFormReducers.defaultDateState;
const defaultIsPaidState = ExpenseFormReducers.defaultIsPaidState;
const defaultMerchantState = ExpenseFormReducers.defaultMerchantState;

//reducer functions
const amountReducer = ExpenseFormReducers.amountReducer;
const dateReducer = ExpenseFormReducers.dateReducer;
const isPaidReducer = ExpenseFormReducers.isPaidReducer;
const merchantReducer = ExpenseFormReducers.merchantReducer;

const NewDailyExpenseForm = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const [formIsValid, setFormIsValid] = useState(false); //FALSE before 1st render --> NULL after 1st render (and before user input)

  //input refs
  const amountInputRef = useRef();
  const dateInputRef = useRef();
  const isPaidInputRef = useRef();
  const merchantInputRef = useRef();

  //reducers
  const [amountState, dispatchAmount] = useReducer(
    //HERE (before render) <-- formIsValid = false
    amountReducer,
    defaultAmountState
  );
  const [dateState, dispatchDate] = useReducer(dateReducer, defaultDateState);
  const [isPaidState, dispatchIsPaid] = useReducer(
    isPaidReducer,
    defaultIsPaidState
  );
  const [merchantState, dispatchMerchant] = useReducer(
    merchantReducer,
    defaultMerchantState
  );

  const { isValid: amountIsValid } = amountState;
  const { isValid: dateIsValid } = dateState;
  const { isValid: isPaidIsValid } = isPaidState;
  const { isValid: merchantIsValid } = merchantState;

  //need useEffect to only update formValidity when validity changes
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(amountIsValid && dateIsValid && isPaidIsValid && merchantIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(timer);
    };
  }, [amountIsValid, dateIsValid, isPaidIsValid, merchantIsValid]);

  //Gathering info from inputs
  const amountChangeHandler = (event) => {
    dispatchAmount({ type: "USER_INPUT", val: event.target.value });
  };

  const dateChangeHandler = (event) => {
    dispatchDate({ type: "USER_INPUT", val: event.target.value });
  };

  const isPaidChangeHandler = (event) => {
    dispatchIsPaid({ type: "USER_INPUT", val: event.target.value });
  };

  const merchantChangeHandler = (event) => {
    dispatchMerchant({ type: "USER_INPUT", val: event.target.value });
  };

  //Determining validation on blur
  const validateAmountHandler = () => {
    dispatchAmount({ type: "INPUT_BLUR" });
  };

  const validateDateHandler = () => {
    dispatchDate({ type: "INPUT_BLUR" });
  };

  const validateIsPaidHandler = () => {
    dispatchIsPaid({ type: "INPUT_BLUR" });
  };

  const validateMerchantHandler = () => {
    dispatchMerchant({ type: "INPUT_BLUR" });
  };

  //now we have the current state snapshots
  const submitHandler = (event) => {
    //HERE (before render) <-- formisValid = false // ALL reducers are {value: '', isValid: null}
    event.preventDefault();

    console.log("Is form valid??? - " + formIsValid);
    if (formIsValid) {
      expensesContext.onAddExpense({
        id: "E-" + Math.random() * 10,
        date: new Date(dateState.value),
        amount: amountState.value,
        isPaid: isPaidState.value,
        merchant: merchantState.value,
      });
    } else {
      if (!amountIsValid) {
        amountInputRef.current.focus();
      } else if (!dateIsValid) {
        dateInputRef.current.focus();
      } else if (!isPaidIsValid) {
        isPaidInputRef.current.focus();
      } else if (!merchantIsValid) {
        merchantInputRef.current.focus();
      }
    }

    // amountState.value = "";
    // dateState.value = "mm/dd/yyyy";
    // isPaidState.value = "Paid Off?";
    // merchantState.value = "";
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler} className={classes["add-expense-form"]}>
        <h3>New Daily Expense</h3>
        <input
          ref={amountInputRef}
          id="amountField"
          type="number"
          placeholder="Enter Amount"
          onChange={amountChangeHandler}
          onBlur={validateAmountHandler}
          value={amountState.value}
          className={`${classes.input} ${
            amountIsValid === false ? classes.invalid : ""
          }`}
        />
        <input
          ref={dateInputRef}
          id="datePicker"
          type="date"
          onChange={dateChangeHandler}
          onBlur={validateDateHandler}
          value={dateState.value}
          className={`${classes.input} ${
            dateIsValid === false ? classes.invalid : ""
          }`}
        />
        <select
          ref={isPaidInputRef}
          id="isPaidDropdown"
          name="isPaidDropdown"
          onChange={isPaidChangeHandler}
          onBlur={validateIsPaidHandler}
          value={isPaidState.value}
          defaultValue="default"
          className={`${classes.input} ${
            isPaidIsValid === false ? classes.invalid : ""
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
          onChange={merchantChangeHandler}
          onBlur={validateMerchantHandler}
          value={merchantState.value}
          className={`${classes.input} ${
            merchantIsValid === false ? classes.invalid : ""
          }`}
        />

        <div className={classes["button-div"]}>
          <button type="submit" className={classes["add-expense-button"]}>
            Add Expense
          </button>
          <button
            type="button"
            className={classes["close-button"]}
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewDailyExpenseForm;
