import "./App.css";
import React, { useState } from "react";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import Header from "./components/Layout/Header";
import NewDailyExpenseForm from "./components/DailyExpenses/NewDailyExpenseForm";

import ExpensesProvider from "./context/ExpensesProvider";
import DailyExpenseHeader from "./components/Layout/DailyExpenseHeader";

/**
 * Budget Breakdown is a simple expense tracker application which allows users
 * to enter expenses and view in a list.
 * 
 * @author Nikki Pinzon
 * @version 1.0
 */

const App = () => {
  /**
   * State that sets whether or not the new expense form should be shown to the user.
   * 
   * @typedef {Object} state
   */

  /**
   * State update function that changes the state.
   * 
   * @typedef {function} setExpenseFormIsVisible
   * @param {boolean} expenseFormIsVisible - true/false value to indicate whether or not the new expense form should be shown to the user.
   * @returns {boolean} - value that indicates whether or not to show form to the user.
   */
  const [expenseFormIsVisible, setExpenseFormIsVisible] = useState(false);

  /**
   * This function shows the new expense form.
   * @typedef {function}
   */
  const showExpenseFormHandler = () => {
    setExpenseFormIsVisible(true);
  };

   /**
   * This function hides the new expense form.
   * @typedef {function}
   */
  const hideExpenseFormHandler = () => {
    setExpenseFormIsVisible(false);
  };

  return (
    <ExpensesProvider>
      {expenseFormIsVisible && (
        <NewDailyExpenseForm onClose={hideExpenseFormHandler} />
      )}
      <Header onShow={showExpenseFormHandler} />
      <DailyExpenses />
    </ExpensesProvider>
  );
};

export default App;
