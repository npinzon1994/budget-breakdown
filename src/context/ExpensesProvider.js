import React, { useReducer } from "react";
import ExpensesContext from "./expenses-context";

const defaultExpensesState = {
  items: [],
  totalBalance: 0,
};

const expensesReducer = (state, action) => {
    if(action.type === "ADD"){
        const updatedTotalBalance = +state.totalBalance + +action.item.amount;
        const updatedItems = state.items.concat(action.item);
        return {items: updatedItems, totalBalance: updatedTotalBalance};
    }

    return defaultExpensesState;
};

const ExpensesProvider = (props) => {
  const [expenses, dispatchExpensesAction] = useReducer(
    expensesReducer,
    defaultExpensesState
  );

  const addExpenseItem = (item) => {
    dispatchExpensesAction({type: 'ADD', item: item});
  } 

  const removeExpenseItem = (id) => {
    dispatchExpensesAction({type: 'REMOVE', id: id});
  }

  const expensesContext = {
    items: expenses.items,
    totalBalance: expenses.totalBalance,
    onAddExpense: addExpenseItem,
    onRemoveExpense: removeExpenseItem
  };

  return (
    <ExpensesContext.Provider value={expensesContext}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
