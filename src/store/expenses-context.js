import React from "react";

const ExpensesContext = React.createContext({
    items: [],
    totalBalance: 0,
    changed: false,
    onAddExpense: () => {},
    onRemoveExpense: () => {},
    onEditExpense: () => {},
    setExpenses: (expenses) => {},
});

export default ExpensesContext;