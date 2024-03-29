import React from "react";
import classes from "./ExpenseFilter.module.css";
import Select, { components } from "react-select";
import { ReactComponent as FilterIcon } from "../../assets/filter-icon.svg";

const { SingleValue } = components;
const IconSingleValue = (props) => {
  return (
    <SingleValue {...props}>
      <FilterIcon className={classes["filter-icon"]} />
    </SingleValue>
  );
};

const dropdownStyles = {
  control: (defaultStyles) => ({
    ...defaultStyles,
    background: "transparent",
    width: "100%",
    border: "1px #d3d3d3 solid",
    outline: "none",
    borderRadius: "50%",
    paddingBlock: "10px",
    cursor: "pointer",
    boxShadow: "none",
    transition: "200ms",
    fontFamily: '"Golos Text", sans-serif',
    fontSize: "clamp(0.75rem, 1.75vw, 1rem)",
    "&:hover": {
      background: "#eeeeee",
      borderColor: "#eeeeee",
    },
    "&:active": {
      background: "#f4f4f4",
      borderColor: "#f4f4f4",
      transition: "none",
    },
  }),
  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: "rgb(34, 34, 34)",
    textOverflow: "none",
    width: "100%",
    paddingLeft: "8px",
    paddingRight: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    padding: "0",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: () => ({
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
    fontFamily: '"Golos Text", sans-serif',
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    background: "#f3f3f3",
    borderRadius: "12px",
    padding: "6px 0",
    width: "max-content",
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
    <div className={classes["filter-container"]} datatooltip="Filter">
      {/* <FilterIcon className={classes['filter-icon']}/> */}
      <Select
        options={options}
        defaultValue={{ value: "Show All" }}
        onChange={filterExpensesHandler}
        isSearchable={false}
        styles={{
          ...dropdownStyles,
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        components={{ SingleValue: IconSingleValue }}
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default ExpenseFilter;
