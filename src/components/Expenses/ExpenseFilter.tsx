import { FC } from "react";
import classes from "./ExpenseFilter.module.css";
import Select, {
  components,
  StylesConfig,
  GroupBase,
  ActionMeta,
  SingleValueProps,
} from "react-select";
import { ReactComponent as FilterIcon } from "../../assets/filter-icon.svg";
import filterIcon from "../../assets/filter-icon.svg";
import Option from "../../models/option";
import Image from "next/image";

//grabbing the type from SingleValue so its prop types are included
type IconSingleValueProps = SingleValueProps<Option, false>;

//type of the "style" prop in the <Select />
type SelectStyleProps = StylesConfig<Option, false, GroupBase<Option>>;
type ExpenseFilterProps = {
  onFilter: (selectedOptionValue: string) => void;
};

const { SingleValue } = components;

const IconSingleValue: FC<IconSingleValueProps> = (props) => {
  return (
    <SingleValue {...props}>
      <Image src={filterIcon} alt="filter icon" className={classes['filter-icon']}/>
      {/* <FilterIcon className={classes["filter-icon"]} /> */}
    </SingleValue>
  );
};

const dropdownStyles: SelectStyleProps = {
  control: (defaultStyles) => ({
    ...defaultStyles,
    background: "transparent",
    width: "100%",
    border: "1px #636363 solid",
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
    background: state.isSelected ? "#1167b1" : undefined,
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

const options: Option[] = [
  new Option("Show All", "Show All"),
  new Option("Paid Expenses", "Paid"),
  new Option("Unpaid Expenses", "Unpaid"),
];

const ExpenseFilter: FC<ExpenseFilterProps> = ({ onFilter }) => {
  const filterExpensesHandler = (
    newValue: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (newValue) {
      onFilter(newValue.value);
    }
  };

  return (
    <div className={classes["filter-container"]} data-tooltip="Filter">
      <Select<Option>
        options={options}
        defaultValue={options[0]}
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
