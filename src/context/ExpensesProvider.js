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

  return defaultExpensesState;
};

const ExpensesProvider = (props) => {
  const [expenses, dispatchExpensesAction] = useReducer(
    expensesReducer,
    defaultExpensesState
  );

  const addExpenseItem = (item) => {
    dispatchExpensesAction({ type: "ADD", item: item });
  };

  const removeExpenseItem = (id) => {
    dispatchExpensesAction({ type: "REMOVE", id: id });
  };

  const editExpenseItem = (id) => {
    dispatchExpensesAction({type: "EDIT", id: id});
  }

  const expensesContext = {
    items: expenses.items,
    totalBalance: expenses.totalBalance,
    onAddExpense: addExpenseItem,
    onRemoveExpense: removeExpenseItem,
    onEditExpense: editExpenseItem
  };

  return (
    <ExpensesContext.Provider value={expensesContext}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
