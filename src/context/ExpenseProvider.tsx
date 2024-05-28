import { useReducer, FC, ReactNode } from "react";
import ExpenseContext from "./expense-context";
import { Expense } from "../models/expense";

type ExpenseState = {
  items: Expense[];
  filteredItems: Expense[];
  totalBalance: number;
  changed: boolean;
};

type Add = {
  type: "ADD";
  item: Expense;
};

type Remove = {
  type: "REMOVE";
  id: string;
};

type Edit = {
  type: "EDIT";
  search: { item: Expense; id: string };
};

type SetExpenses = {
  type: "SET_EXPENSES";
  items: Expense[];
};

type Action = Add | Remove | Edit | SetExpenses;
type ExpenseProviderProps = { children: ReactNode };

const defaultExpenseState: ExpenseState = {
  items: [],
  filteredItems: [],
  totalBalance: 0,
  changed: false,
};

const expenseReducer = (state: ExpenseState, action: Action): ExpenseState => {
  if (action.type === "ADD") {
    const updatedTotalBalance = +state.totalBalance + +action.item.amount;
    const updatedItems = state.items.concat(action.item);
    updatedItems.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
    updatedItems.reverse();
    return {
      items: updatedItems,
      filteredItems: state.filteredItems,
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
      filteredItems: state.filteredItems,
      totalBalance: updatedTotalBalance,
      changed: true,
    };
  }

  if (action.type === "EDIT") {
    const arrayWithoutItem = state.items.filter(
      (item) => item.id !== action.search.id
    );
    const updatedItems = arrayWithoutItem.concat(action.search.item);

    const priceArray = updatedItems.map((item) => item.amount);
    let updatedTotalBalance = 0;
    for (let i = 0; i < priceArray.length; i++) {
      updatedTotalBalance += +priceArray[i];
      console.log("current amount:", priceArray[i]);
    }
    console.log("Updated total balance:", updatedTotalBalance);

    updatedItems.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
    updatedItems.reverse();

    return {
      items: updatedItems,
      filteredItems: state.filteredItems,
      totalBalance: updatedTotalBalance,
      changed: true,
    };
  }

  if (action.type === "SET_EXPENSES") {
    //compute balance here
    let currentBalance = 0;
    const expenses = [...action.items];
    for (const key in expenses) {
      const expenseAmount = +expenses[key].amount;
      currentBalance = currentBalance + expenseAmount;
    }
    return {
      items: expenses,
      filteredItems: state.filteredItems,
      totalBalance: currentBalance,
      changed: false,
    };
  }

  return defaultExpenseState;
};

const ExpenseProvider: FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, dispatchExpensesAction] = useReducer(
    expenseReducer,
    defaultExpenseState
  );

  const addExpenseItemHandler = (item: Expense) => {
    dispatchExpensesAction({ type: "ADD", item });
  };

  const removeExpenseItemHandler = (id: string) => {
    dispatchExpensesAction({ type: "REMOVE", id });
  };

  const editExpenseItemHandler = (search: { item: Expense; id: string }) => {
    dispatchExpensesAction({ type: "EDIT", search: { item: search.item, id: search.id } });
  };

  const setExpenses = (items: Expense[]) => {
    dispatchExpensesAction({ type: "SET_EXPENSES", items });
  };

  const expenseContext = {
    items: expenses.items,
    totalBalance: expenses.totalBalance,
    changed: expenses.changed,
    onAddExpense: addExpenseItemHandler,
    onRemoveExpense: removeExpenseItemHandler,
    onEditExpense: editExpenseItemHandler,
    setExpenses,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
