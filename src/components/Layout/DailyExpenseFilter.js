import React from "react";
import classes from "./DailyExpenseFilter.module.css";
import { useContext } from "react";
import ExpensesContext from "../../context/expenses-context";
import Card from "../UI/Card";
import DailyExpenseButton from "../UI/NewExpenseButton";
import Select from "react-select";
import filterIconImg from "../../assets/filter-icon.svg";
import useWindowHeight from "../../hooks/use-window-height";

const filterIcon = (
  <div>
    <img
      src={filterIconImg}
      alt="filter icon"
      className={classes["filter-icon"]}
    />
  </div>
);

const dropdownStyles = {
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    background: "transparent",
    width: '100%',
    border: "none",
    outline: "none",
    borderRadius: "12px",
    padding: "6px 0",
    cursor: "pointer",
    boxShadow: "none",
    transition: "200ms",
    fontFamily: '"Golos Text", sans-serif',
    fontSize: "clamp(0.75rem, 1.75vw, 1rem)",
    // paddingLeft: '8px',
    "&:hover": {
      background: "#3477b1",
    },
  }),
  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: "#fff",
    textOverflow: 'none',
    width: '100%',
    paddingLeft: '8px',
    paddingRight: '8px',
  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    padding: '0'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (defaultStyles) => ({
    // ...defaultStyles,
    // padding: '0',
    // color: "#fff",
    display: 'none',
    "&:hover": {
      color: "#fff",
    },
  }),
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    transition: "280ms",
    cursor: "pointer",
    fontWeight: "500",
    background: state.isSelected && "#1167b1",
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
  const screenHeight = useWindowHeight();
  const bannerHeight = screenHeight * 0.115;

  const options = [
    { value: "Show All", label: "Show All" },
    { value: "Paid Expenses", label: "Paid" },
    { value: "Unpaid Expenses", label: "Unpaid" },
  ];

  const expensesContext = useContext(ExpensesContext);
  const totalBalance = currencyFormatter.format(expensesContext.totalBalance);

  const filterExpensesHandler = (selectedOption) => {
    props.onFilter(selectedOption.value);
  };

  return (
    <Card className={classes.container} style={{minHeight: `${bannerHeight}px`}}>
      <div className={classes["filter-container"]}>
        <div className={classes["select-wrapper"]}>
          <Select
            options={options}
            defaultValue={{value: 'filter-icon', label: "Filter"}}
            onChange={filterExpensesHandler}
            isSearchable={false}
            styles={dropdownStyles}
          />
        </div>
      </div>
      <div className={classes["remaining-balance"]}>
        <span className={classes["total-label"]}>Total</span>
        <span className={classes["total-balance"]}>{totalBalance}</span>
      </div>
      <div className={classes["button-container"]}>
        <DailyExpenseButton onClick={props.onShow}>+</DailyExpenseButton>
      </div>
    </Card>
  );
};

export default DailyExpenseFilter;
