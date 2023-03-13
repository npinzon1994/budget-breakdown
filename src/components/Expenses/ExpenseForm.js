import React, { useRef, useContext, useState } from "react";
import classes from "./ExpenseForm.module.css";
import ExpensesContext from "../../store/expenses-context";
import useInput from "../../hooks/use-input";
import FormHeader from "../UI/FormHeader";
import Card from "../UI/Card";
import ToggleSwitch from "../UI/ToggleSwitch";
import CSSTransition from "react-transition-group/CSSTransition";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

let uniqueId = 0;

//VALIDATION FUNCTIONS
const checkInput = (value) => value !== "";
const validateAmount = (amount) => amount > 0 && amount < 1000000;

const ExpenseForm = (props) => {
  const [amountValidityState, setAmountValidityState] = useState(null);

  const isNewFormVisible = useSelector((state) => state.showHide.showNewForm);
  const expensesContext = useContext(ExpensesContext);
  const currentExpenseItem = expensesContext.items.find(
    (item) => item.id === props.id
  );

  const { register, handleSubmit, watch, getValues } = useForm({
    // defaultValues: {
    //   amount: currentExpenseItem.amount,
    //   date: currentExpenseItem.date,
    //   isPaid: currentExpenseItem.isPaid,
    //   merchant: currentExpenseItem.merchant,
    // }
  });

  const inputChangeMonitors = {
    watchAmount: watch("amount"),
    watchDate: watch("date"),
    watchIsPaid: watch("is-paid"),
    watchMerchant: watch("merchant"),
  };

  const { watchAmount, watchDate, watchIsPaid, watchMerchant } =
    inputChangeMonitors;

  const currentValues = {
    currentAmount: getValues("amount"),
    currentDate: getValues("date"),
    currentMerchant: getValues("merchant"),
  };
  const { currentAmount, currentDate, currentMerchant } = currentValues;

  //object to be added -- contains all values captured from the form
  // const newExpenseObject = {
  //   id: "E" + uniqueId++,
  //   date: new Date(enteredDate),
  //   amount: enteredAmount,
  //   isPaid: isPaidValue,
  //   merchant: enteredMerchant,
  // };

  const validateAmountOnBlur = () => {
    if(watchAmount === "") {
      setAmountValidityState(false);
    }
    if(parseInt(watchAmount) > 0 || parseInt(watchAmount) < 1000000) {
      setAmountValidityState(true);
    }
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // if (formIsValid) {
    //   expensesContext.onAddExpense(newExpenseObject);
    // }
  };

  console.log("Watch Amount", watchAmount);

  return (
    <CSSTransition
      in={isNewFormVisible}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 500, exit: 500 }}
      classNames={{
        enter: "",
        enterActive: `${classes["card-open"]}`,
        exit: "",
        exitActive: `${classes["card-closed"]}`,
      }}
    >
      <Card className={classes.card}>
        <FormHeader title={props.title} onClose={props.onClose} />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={classes["add-expense-form"]}
        >
          <p>Watch Amount: {watchAmount}</p>
          {amountValidityState ? (
            <span className={classes["error-text"]}>
              *Please enter an amount between $0 and $1,000,000
            </span>
          ) : (
            ""
          )}

          <div className={classes["top-container"]}>
            <CSSTransition
              in={isNewFormVisible}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 300, exit: 500 }}
              classNames={{
                enter: "",
                enterActive: `${classes["input-open"]}`,
                exit: "",
                exitActive: `${classes["input-closed"]}`,
              }}
            >
              <input
                {...register("amount", { required: true })}
                id="amountField"
                type="number"
                onBlur={validateAmountOnBlur}
                placeholder="Enter Amount"
                className={classes.input}
              />
            </CSSTransition>
            <CSSTransition
              in={isNewFormVisible}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 300, exit: 500 }}
              classNames={{
                enter: "",
                enterActive: `${classes["input-open"]}`,
                exit: "",
                exitActive: `${classes["input-closed"]}`,
              }}
            >
              <input
                {...register("date", { required: true })}
                id="datePicker"
                type="date"
                max="9999-12-31"
                className={classes.input}
              />
            </CSSTransition>
            <CSSTransition
              in={isNewFormVisible}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 500, exit: 500 }}
              classNames={{
                enter: "",
                enterActive: `${classes["toggle-switch-container-open"]}`,
                exit: "",
                exitActive: `${classes["toggle-switch-container-closed"]}`,
              }}
            >
              <div className={classes["toggle-switch-container"]}>
                <label className={classes["paid-off-label"]}>Paid off?</label>
                <ToggleSwitch id="switch" />
              </div>
            </CSSTransition>
          </div>

          <CSSTransition
            in={isNewFormVisible}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 300, exit: 500 }}
            classNames={{
              enter: "",
              enterActive: `${classes["input-open"]}`,
              exit: "",
              exitActive: `${classes["input-closed"]}`,
            }}
          >
            <textarea
              {...register("merchant", { required: true })}
              id="merchantField"
              type="text"
              placeholder="Merchant"
              maxLength="100"
              className={`${classes.input} ${classes.textarea}`}
            />
          </CSSTransition>

          <div className={classes["button-div"]}>
            <CSSTransition
              in={isNewFormVisible}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 300, exit: 500 }}
              classNames={{
                enter: "",
                enterActive: `${classes["add-expense-button-open"]}`,
                exit: "",
                exitActive: `${classes["add-expense-button-closed"]}`,
              }}
            >
              <button type="submit" className={classes["add-expense-button"]}>
                {props.buttonText}
              </button>
            </CSSTransition>

            {props.mode === "edit" && (
              <button className={classes["remove-button"]} type="button">
                Delete
              </button>
            )}
          </div>
        </form>
      </Card>
    </CSSTransition>
  );
};

export default ExpenseForm;
