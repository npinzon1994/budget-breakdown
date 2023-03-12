import React, { useReducer } from "react";
import ExpensesContext from "./expenses-context";

const defaultExpensesState = {
  items: [],
  filteredItems: [],
  totalBalance: 0,
  changed: false,
};

const expensesReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalBalance = +state.totalBalance + +action.item.amount;
    const updatedItems = state.items.concat(action.item);
    updatedItems.sort(function (a, b) {
      return a.date - b.date;
    });
    updatedItems.reverse();
    return {
      items: updatedItems,
      totalBalance: updatedTotalBalance,
      changed: true,
    };
  }

  if (action.type === "REMOVE") {
    const expenseItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); //index of item we want to remove

    const existingExpenseItem = state.items[expenseItemIndex];

    const updatedTotalBalance =
      +state.totalBalance - +existingExpenseItem.amount;
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
      totalBalance: updatedTotalBalance,
      changed: true,
    };
  }

  if (action.type === "EDIT") {
    const expenseItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); //index of item we want to edit

    //current item we want to edit
    const existingExpenseItem = state.items[expenseItemIndex];
    console.log(existingExpenseItem);

    /*
    Now we want to pull up the ExpenseItemForm
    */
  }

  if (action.type === "SET_EXPENSES") {
    //compute balance here
    let currentBalance = 0;
    const expenses = [...action.items];
    for (const key in expenses) {
      const expenseAmount = +expenses[key].amount;
      currentBalance = currentBalance + expenseAmount;
    }
    return { items: expenses, totalBalance: currentBalance, changed: false };
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
    dispatchExpensesAction({ type: "EDIT", id: id });
  };

  const setExpenses = (items) => {
    dispatchExpensesAction({ type: "SET_EXPENSES", items: items });
  };

  const expensesContext = {
    items: expenses.items,
    totalBalance: expenses.totalBalance,
    changed: expenses.changed,
    onAddExpense: addExpenseItemHandler,
    onRemoveExpense: removeExpenseItemHandler,
    onEditExpense: editExpenseItemHandler,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={expensesContext}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;