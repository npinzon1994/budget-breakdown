import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import Button from "../Layout/HeaderButton";
import classes from "./NewDailyExpenseForm.module.css";
import ExpensesContext from "../../context/expenses-context";

const NewDailyExpenseForm = (props) => {
  const expensesContext = useContext(ExpensesContext);
  
  //need to manage states for AMOUNT, DATE, isPaid, and MERCHANT
  const [enteredAmount, setEnteredAmount] = useState("");
  const [isEnteredAmountValid, setIsEnteredAmountValid] = useState(true);

  const [pickedDate, setPickedDate] = useState("");
  const [isPickedDateValid, setIsPickedDateValid] = useState(true);

  const [isPaid, setIsPaid] = useState("");
  const [isPaidValid, setisPaidValid] = useState(true);

  const [enteredMerchant, setEnteredMerchant] = useState("");
  const [isEnteredMerchantValid, setIsEnteredMerchantValid] = useState(true);

  //Gathering info from form

  //checking if amount > 0 OR if Entered Amount contains a value
  const amountChangeHandler = (event) => {
    if (+event.target.value > 0 && event.target.value.trim().length > 0) {
      setIsEnteredAmountValid(true);
      
    }
    
    setEnteredAmount(event.target.value);
  };

  //checking if Picked Date contains a value
  const dateChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsPickedDateValid(true);
      
    }
    
    setPickedDate(event.target.value);
  };

  const isPaidChangeHandler = (event) => {
    setIsPaid(event.target.value);
  };

  const merchantChangeHandler = (event) => {
    setEnteredMerchant(event.target.value);
  };

  //now we have the current state snapshots
  const addNewDailyExpenseHandler = (event) => {
    event.preventDefault(); //preventing re-rendering of DOM

    //checking if entered amount is <= 0 OR if field is empty
    if (+enteredAmount <= 0 || enteredAmount.trim().length === 0) {
      setIsEnteredAmountValid(false);
      console.log('Is Entered Amount Valid? - ' + isEnteredAmountValid);
      return;
    }

    console.log('Is Entered Amount Valid? - ' + isEnteredAmountValid);

    //checking if picked date is empty
    if (pickedDate.trim().length === 0) {
      setIsPickedDateValid(false);
      console.log('Is Date Valid? - ' + isPickedDateValid);
      return;
    }

    console.log('Is Date Valid? - ' + isPickedDateValid);

    expensesContext.onAddExpense({
      id: 'E-' + Math.random(),
      date: new Date(pickedDate),
      amount: enteredAmount,
      isPaid: isPaid,
      merchant: enteredMerchant
    });
    
    //current state snapshots
    console.log("AMOUNT: " + enteredAmount);
    setEnteredAmount("");

    console.log('Is Picked Date Valid? - ' + isPickedDateValid);

    console.log("DATE: " + pickedDate);
    setPickedDate("");

    console.log("PAID OFF?: " + isPaid);
    setIsPaid(false);

    console.log("MERCHANT: " + enteredMerchant);
    setEnteredMerchant("");
  };

  return (
    <Modal onClose={props.onClose}>
      <h3>New Daily Expense</h3>
      <form
        onSubmit={addNewDailyExpenseHandler}
        className={`${classes["add-expense-form"]} ${
          !isEnteredAmountValid && classes.invalid
        } ${!isPickedDateValid && classes.invalid}`}
      >
        <input
          id="amountField"
          type="number"
          placeholder="Enter Amount"
          onChange={amountChangeHandler}
          value={enteredAmount}
          
        ></input>
        <br />
        <input
          id="datePicker"
          type="date"
          placeholder="Date"
          onChange={dateChangeHandler}
          value={pickedDate}
        ></input>
        <br />
        <select
          id="isPaidDropdown"
          name="isPaidDropdown"
          onChange={isPaidChangeHandler}
          value={isPaid}
        >
          <option value="">Paid Off?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <input
          id="merchantField"
          type="text"
          placeholder="Merchant"
          onChange={merchantChangeHandler}
          value={enteredMerchant}
        ></input>
        <br />

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
