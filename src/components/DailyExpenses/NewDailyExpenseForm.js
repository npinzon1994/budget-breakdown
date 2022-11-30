import React, { useContext, useReducer} from "react";
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

  //reducers
  const [amountState, dispatchAmount] = useReducer(amountReducer, defaultAmountState);
  const [dateState, dispatchDate] = useReducer(dateReducer, defaultDateState);
  const [isPaidState, dispatchIsPaid] = useReducer(isPaidReducer, defaultIsPaidState);
  const [merchantState, dispatchMerchant] = useReducer(merchantReducer, defaultMerchantState);

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
    dispatchMerchant({type: "USER_INPUT", val: event.target.value});
  };

  //now we have the current state snapshots
  const submitHandler = (event) => {
    event.preventDefault(); //preventing re-rendering of DOM

    expensesContext.onAddExpense({
      id: "E-" + Math.random() * 10,
      date: new Date(dateState.value),
      amount: amountState.value,
      isPaid: isPaidState.value,
      merchant: merchantState.value,
    });

    amountState.value = "";
    dateState.value = "mm/dd/yyyy";
    isPaidState.value = "Paid Off?";
    merchantState.value = "";
  };

  return (
    <Modal onClose={props.onClose}>
      {console.log('Amount State Validity: ' + amountState.isValid)}
      <form onSubmit={submitHandler} className={`${classes["add-expense-form"]} ${!amountState.isValid ? classes.invalid : ''}`}>
        <h3>New Daily Expense</h3>
        <input
          id="amountField"
          type="number"
          placeholder="Enter Amount"
          onChange={amountChangeHandler}
          value={amountState.value}
          
          
        />
        <input
          id="datePicker"
          type="date"
          onChange={dateChangeHandler}
          value={dateState.value}
        />
        <select
          id="isPaidDropdown"
          name="isPaidDropdown"
          onChange={isPaidChangeHandler}
          value={isPaidState.value}
        >
          <option value="Paid Off?">Paid Off?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <input
          id="merchantField"
          type="text"
          placeholder="Merchant"
          onChange={merchantChangeHandler}
          value={merchantState.value}
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
