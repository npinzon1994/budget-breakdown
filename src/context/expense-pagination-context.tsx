import { createContext, useState, useContext, FC, ReactNode } from "react";
import { useAppSelector } from "../lib/store/hooks";
import { filterItems } from "../util/filter";
import ExpenseContext from "./expense-context";
import { Expense } from "../models/transaction";

type ContextType = {
  firstRecordIndex: number;
  lastRecordIndex: number;
  numItems: number;
  numPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentRecords: Expense[];
}

type Props = {
  children: ReactNode;
}

const RECORDS_PER_PAGE: number = 10;

export const ExpensePaginationContext = createContext<ContextType>({
  firstRecordIndex: 0,
  lastRecordIndex: 0,
  numItems: 0,
  numPages: 0,
  currentPage: 0,
  setCurrentPage: () => {},
  currentRecords: [],
});

export const ExpensePaginationProvider: FC<Props> = ({ children }) => {
  const expenseContext = useContext(ExpenseContext);
  const [currentPage, setCurrentPage] = useState(1);

  const filterState = useAppSelector((state) => state.filter.filterState);
  const filteredItems = filterItems(expenseContext.items, filterState);

  const numItems = filteredItems.length;
  const numPages = Math.ceil(numItems / RECORDS_PER_PAGE);

  //set upper bound to total unless it's not the last page
  const lastRecordIndex = currentPage * RECORDS_PER_PAGE;
  const firstRecordIndex = lastRecordIndex - RECORDS_PER_PAGE;

  const currentRecords = filteredItems.slice(firstRecordIndex, lastRecordIndex);

  function setCurrentPageHandler(page: number) {
    setCurrentPage(page);
  }

  const contextValue = {
    firstRecordIndex,
    lastRecordIndex,
    numItems,
    numPages,
    currentPage,
    setCurrentPage: setCurrentPageHandler,
    currentRecords,
  };

  return (
    <ExpensePaginationContext.Provider value={contextValue}>
      {children}
    </ExpensePaginationContext.Provider>
  );
};
