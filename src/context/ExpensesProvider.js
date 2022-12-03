import React, { useReducer } from "react";
import ExpensesContext from "./expenses-context";

const defaultExpensesState = {
  items: [],
  totalBalance: 0,
};

const expensesReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalBalance = +state.totalBalance + +action.item.amount;
    const updatedItems = state.items.concat(action.item);
    return { items: updatedItems, totalBalance: updatedTotalBalance };
  }

  if (action.type === "REMOVE") {
    const expenseItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); //index of item we want to remove

    const existingExpenseItem = state.items[expenseItemIndex];

    const updatedTotalBalance =
      +state.totalBalance - +existingExpenseItem.amount;
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    return { items: updatedItems, totalBalance: updatedTotalBalance };
  }

  if(action.type === "EDIT"){
    const expenseItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); //index of item we want to edit

    //current item we want to edit
    const existingExpenseItem = state.items[expenseItemIndex];

    /*
    Now we want to pull up the ExpenseItemForm
    */
  }

  return defaultExpensesState;
};

const ExpensesProvider = (props) => {
  const [expenses, dispatchExpensesAction] = useReducer(
    expensesReducer,
    defaultExpensesState
  );

  const addExpenseItemHandler = (item) => {
    dispatchExpensesAction({ type: "ADD", item: item });
  };

  const removeExpenseItemHandler = (id) => {
    dispatchExpensesAction({ type: "REMOVE", id: id });
  };

  const editExpenseItemHandler = (id) => {
    dispatchExpensesAction({type: "EDIT", id: id});
  }


  const expensesContext = {
    items: expenses.items,
    totalBalance: expenses.totalBalance,
    onAddExpense: addExpenseItemHandler,
    onRemoveExpense: removeExpenseItemHandler,
    onEditExpense: editExpenseItemHandler,
  };

  return (
    <ExpensesContext.Provider value={expensesContext}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
