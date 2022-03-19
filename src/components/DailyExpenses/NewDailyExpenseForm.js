import React, { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import classes from "./NewDailyExpenseForm.module.css";



const NewDailyExpenseForm = (props) => {

  //need to manage states for AMOUNT, DATE, isPaidOff, and MERCHANT
//useReducer might be better option than useState

const addNewDailyExpenseHandler = (event) => {
    event.preventDefault();
  };
  
  const closeModalHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Modal onClose={props.onClose}>
      <h3>New Daily Expense</h3>
      <form
        onSubmit={addNewDailyExpenseHandler}
        className={classes["add-expense-form"]}
      >
        <input id="amountField" type="text" placeholder="Enter Amount"></input>
        <br />
        <input id="datePicker" type="date" placeholder="Date"></input>
        <br />
        <select id="isPaidDropdown" name="isPaidDropdown">
          <option value="">Paid Off?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input id="merchantField" type="text" placeholder="Merchant"></input>
        <br />

        <div className={classes["button-div"]}>
          <button type="submit" className={classes["add-expense-button"]}>
            Add Expense
          </button>
          <button type="button" className={classes["close-button"]} onClick={props.onClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewDailyExpenseForm;
