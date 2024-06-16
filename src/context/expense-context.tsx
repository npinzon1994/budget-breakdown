import {createContext} from "react";
import { Expense } from "../models/transaction";

type ContextType = {
    items: Expense[];
    totalBalance: number;
    changed: boolean;
    onAddExpense: (item: Expense) => void;
    onRemoveExpense: (id: string) => void;
    onEditExpense: (search: {item: Expense, id: string}) => void;
    setExpenses: (expenses: Expense[]) => void;
}

const ExpenseContext = createContext<ContextType>({
    items: [],
    totalBalance: 0,
    changed: false,
    onAddExpense: () => {},
    onRemoveExpense: () => {},
    onEditExpense: () => {},
    setExpenses: () => {},
});

export default ExpenseContext;