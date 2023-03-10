import React from "react";
import classes from "./DailyExpenseFilter.module.css";
import { useContext } from "react";
import ExpensesContext from "../../context/expenses-context";
import Card from "../UI/Card";
import DailyExpenseButton from "../UI/NewExpenseButton";
import Select from "react-select";

const options = [
  { value: "Show All", label: "Show All" },
  { value: "Paid Expenses", label: "Paid" },
  { value: "Unpaid Expenses", label: "Unpaid" },
];

const dropdownStyles = {
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    background: "transparent",
    width: "124px",
    border: "none",
    outline: "none",
    borderRadius: "12px",
    padding: "6px 0",
    cursor: "pointer",
    boxShadow: "none",
    transition: "200ms",
    fontFamily: '"Golos Text", sans-serif',
    "&:hover": {
      background: "#3477b1",
    },
  }),
  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: "#fff",
  }),
  indicatorSeparator: () => null,
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  }),
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    transition: "280ms",
    cursor: "pointer",
    fontWeight: "500",
    background: state.isSelected && '#1167b1'
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    background: "#f3f3f3",
    borderRadius: "12px",
    padding: "6px 0",
  }),
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const DailyExpenseFilter = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const totalBalance = currencyFormatter.format(expensesContext.totalBalance);

  const filterExpensesHandler = (selectedOption) => {
    props.onFilter(selectedOption.value);
  };

  return (
    <Card className={classes.container}>
      <div className={classes["filter-container"]}>
        {/* <div className={classes['select-div']}>
          <select onChange={filterExpensesHandler}>
            <option value="Show All">Show All</option>
            <option value="Paid Expenses">Paid</option>
            <option value="Unpaid Expenses">Unpaid</option>
          </select>
        </div> */}
        <Select
          options={options}
          defaultValue={{ value: "Show All", label: "Show All" }}
          onChange={filterExpensesHandler}
          isSearchable={false}
          styles={dropdownStyles}
        />
      </div>
      <div className={classes["remaining-balance"]}>
        <span>{"Total"}</span>
        <span className={classes["total-balance"]}>{totalBalance}</span>
      </div>
      <div className={classes["button-container"]}>
        <DailyExpenseButton onClick={props.onShow}>+</DailyExpenseButton>
      </div>
    </Card>
  );
};

export default DailyExpenseFilter;
