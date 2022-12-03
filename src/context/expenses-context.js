import React from "react";

const ExpensesContext = React.createContext({
    items: [],
    totalBalance: 0,
    onAddExpense: () => {},
    onRemoveExpense: () => {},
    onEditExpense: () => {},

});

export default ExpensesContext;