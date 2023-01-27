import React, { Fragment, useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import DailyExpenseItem from "./DailyExpenseItem";
import classes from "./DailyExpenses.module.css";
import ExpensesContext from "../../context/expenses-context";
import DailyExpenseFilter from "../Layout/DailyExpenseFilter";
import NotificationBanner from "../UI/NotificationBanner";
import DeleteModal from "../UI/DeleteModal";

let isInitial = true;

let deleteModal;

const DailyExpenses = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const [filteredState, setFilteredState] = useState("Show All");

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState();

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
    setShowDeleteModal(false);
  };

  const showDeleteModalHandler = (id) => {
    setShowDeleteModal(true);

    deleteModal = (
      <DeleteModal
        onRemove={removeItemHandler.bind(null, id)}
        onClose={hideDeleteModalHandler}
      />
    );
  };

  const hideDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  //gets all expenses on startup
  useEffect(() => {
    console.log("EFFECT RUNNING -- GET");
    const getExpenseData = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      //data is good EXCEPT for the dates
      //need to convert to JS Date objects
      const data = await response.json();

      let loadedExpenses = [];
      if (data.items) {
        for (let i = 0; i < data.items.length; i++) {
          loadedExpenses.push({
            id: data.items[i].id,
            date: new Date(data.items[i].date.substring(0, 10)),
            amount: data.items[i].amount,
            isPaid: data.items[i].isPaid,
            merchant: data.items[i].merchant,
          });
        }
      }

      expensesContext.setExpenses(loadedExpenses);

      setIsLoading(false);
    };

    getExpenseData().catch((error) => {
      setIsLoading(false);
      setLoadError(error.message);
    });
  }, []);

  //sends cart data to the server
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    console.log("EFFECT RUNNING -- PUT");
    const sendExpenseData = async () => {
      setIsSending(true);
      const response = await fetch(
        "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: expensesContext.items,
            totalBalance: expensesContext.totalBalance,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setIsSending(false);
    };
    if (expensesContext.changed) {
      sendExpenseData().catch((error) => {
        setIsSending(false);
        setSendError(error.message);
      });
    }
  }, [expensesContext]);

  let filteredExpenses = [...expensesContext.items];
  if (filteredState === "Paid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === "Y"
    );
  }
  if (filteredState === "Unpaid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === "N"
    );
  }

  //creates a new array of DailyExpenseItem(s)
  const expenses = filteredExpenses.map((expense) => (
    <DailyExpenseItem
      key={expense.id}
      amount={expense.amount}
      date={expense.date}
      isPaid={expense.isPaid}
      merchant={expense.merchant}
      onRemove={showDeleteModalHandler.bind(null, expense.id)} //binding expense.id so the actual expense.id can also be used
      //need to bind in order to be able to pass down to ExpenseItem.js
    />
  ));

  const filterExpenses = (state) => {
    setFilteredState(state);
  };

  const transitionText = classes["transition-text"];
  const expenseListIsEmpty = expensesContext.items.length === 0;
  const filteredListIsEmpty = expenses.length === 0;

  return (
    <Fragment>
      {showDeleteModal && deleteModal}
      {/* {(isSending && !sendError) && <NotificationBanner status={''} title={'Sending'} message={'Sending...'}/>} */}
      <DailyExpenseFilter onFilter={filterExpenses} />
      <Card>
        {((expenseListIsEmpty || filteredListIsEmpty) && !isLoading) && (
          <p className={transitionText}>No expenses found.</p>
        )}
        {loadError && <p className={transitionText}>{loadError}</p>}
        {sendError && <p className={transitionText}>{sendError}</p>}
        {isLoading && !loadError && (
          <p className={transitionText}>Loading expenses...</p>
        )}
        {!isLoading && (
          <ul className={classes["daily-expenses"]}>{expenses}</ul>
        )}
      </Card>
    </Fragment>
  );
};

export default DailyExpenses;
