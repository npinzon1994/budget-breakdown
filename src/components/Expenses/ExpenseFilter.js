import React from "react";
import classes from "./ExpenseFilter.module.css";
import Select from "react-select";

const dropdownStyles = {
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    background: "transparent",
    width: "100%",
    border: "none",
    outline: "none",
    borderRadius: "12px",
    padding: "6px 0",
    cursor: "pointer",
    boxShadow: "none",
    transition: "200ms",
    fontFamily: '"Golos Text", sans-serif',
    fontSize: "clamp(0.75rem, 1.75vw, 1rem)",
    "&:hover": {
      background: "#3477b1",
    },
  }),
  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: "#fff",
    textOverflow: "none",
    width: "100%",
    paddingLeft: "8px",
    paddingRight: "8px",
  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    padding: "0",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (defaultStyles) => ({
    display: "none",
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

const options = [
  { value: "Show All", label: "Show All" },
  { value: "Paid Expenses", label: "Paid" },
  { value: "Unpaid Expenses", label: "Unpaid" },
];

const ExpenseFilter = (props) => {
  const filterExpensesHandler = (selectedOption) => {
    props.onFilter(selectedOption.value);
  };

  return (
    <div className={classes["filter-container"]}>
      <div className={classes["select-wrapper"]}>
        <Select
          options={options}
          defaultValue={{ value: "filter-icon", label: "Filter" }}
          onChange={filterExpensesHandler}
          isSearchable={false}
          styles={dropdownStyles}
        />
      </div>
    </div>
  );
};

export default ExpenseFilter;
