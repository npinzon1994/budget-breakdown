import React, { useEffect, useContext, useState } from "react";
import classes from "./ExpenseForm.module.css";
import ExpensesContext from "../../store/expenses-context";
import FormHeader from "../Layout/FormHeader";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { uniqueIdActions } from "../../store/redux/generate-unique-id-slice";
import { sendingActions } from "../../store/redux/sending-slice";
import { showHideActions } from "../../store/redux/show-hide-slice";
import RadioButton from "../UI/RadioButton";
import { useId } from "react";

const checkIsValidAmount = (amount) => +amount >= 0 && +amount < 1_000_000;
const dateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" });

const ExpenseForm = (props) => {
  const uniqueId = useId();

  const expensesContext = useContext(ExpensesContext);
  const currentExpenseItem = expensesContext.items.find(
    (item) => item.id === props.id
  );

  const [isPaid, setIsPaid] = useState(
    currentExpenseItem ? currentExpenseItem.isPaid : false
  );
  const [isDateFocused, setIsDateFocused] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: currentExpenseItem ? currentExpenseItem.amount : "",
      date: currentExpenseItem ? currentExpenseItem.date : null,
      merchant: currentExpenseItem ? currentExpenseItem.merchant : "",
    },
  });

  useEffect(() => {
    setFocus("amount");
  }, [setFocus]);

  const inputChangeMonitors = {
    watchAmount: watch("amount"),
    watchDate: watch("date"),
    watchMerchant: watch("merchant"),
  };

  const { watchAmount, watchDate, watchMerchant } = inputChangeMonitors;

  const currentValues = {
    currentAmount: getValues("amount"),
    currentDate: getValues("date"),
    currentMerchant: getValues("merchant"),
  };
  const { currentAmount, currentDate, currentMerchant } = currentValues;

  const submitHandler = () => {
    //object to be added -- contains all values captured from the form
    console.log("submitting...");
    let newExpenseObject = {};
    dispatch(sendingActions.setIsSending(true));
    console.log("Date:", currentDate);
    if (props.mode === "edit") {
      //find current item and overwrite
      newExpenseObject = {
        id: currentExpenseItem.id,
        date: new Date(currentDate),
        amount: currentAmount,
        isPaid,
        merchant: currentMerchant,
      };

      expensesContext.onEditExpense(newExpenseObject, currentExpenseItem.id);
      dispatch(showHideActions.setShowEditForm(false));
    } else {
      newExpenseObject = {
        id: uniqueId,
        date: new Date(currentDate),
        amount: currentAmount,
        isPaid,
        merchant: currentMerchant,
      };
      expensesContext.onAddExpense(newExpenseObject);
      dispatch(uniqueIdActions.incrementIdCounter());
      dispatch(showHideActions.setShowNewForm(false));
    }
    console.log("Expense Object Date:", newExpenseObject.date);
    dispatch(sendingActions.setIsSending(false));
  };

  const dateInputFocusHandler = () => setIsDateFocused(true);
  const dateInputBlurHandler = () => setIsDateFocused(false);


  return (
    <Modal
      onClose={props.onClose}
      className={classes.modal}
      backdropClassName={classes.backdrop}
    >
      <FormHeader title={props.title} onClose={props.onClose} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes["add-expense-form"]}
        name="submit-form"
      >
        {checkIsValidAmount(watchAmount) === false && (
          <span className={classes["error-text"]}>
            *Please enter an amount between $0 and $1,000,000
          </span>
        )}
        <div className={classes["top-container"]}>
          <div className={classes["input-container"]}>
            <input
              {...register("amount", {
                required: true,
                min: 0.01,
                max: 999_999.99,
              })}
              id="amountField"
              type="number"
              step=".01"
              className={classes.input}
            />
            <label
              htmlFor="amountField"
              className={classes["input-placeholder"]}
            >
              Amount
            </label>
          </div>

          <Controller
            control={control}
            name="date"
            rules={{ required: "Date cannot be empty" }}
            defaultValue={currentExpenseItem ? currentExpenseItem.date : null}
            render={({ field: { onChange, onBlur, value, ref, name } }) => (
              <div className={classes["datepicker-container"]}>
                <DatePicker
                  ref={(elem) => elem && ref(elem.input)}
                  name={name}
                  id="datePicker"
                  selected={value}
                  onChange={onChange}
                  // onBlur={onBlur}
                  placeholderText="MM/DD/YYYY"
                  className={classes.datepicker}
                  isClearable
                  shouldCloseOnSelect
                  onFocus={dateInputFocusHandler}
                  onBlur={dateInputBlurHandler}
                />
                <label
                  htmlFor="datePicker"
                  className={`${classes["datepicker-placeholder"]} ${isDateFocused ? classes.focused : ""}`}
                >
                  Date
                </label>
              </div>
            )}
          />
        </div>

        <div className={classes["bottom-container"]}>
          <div className={classes["input-container"]}>
            <textarea
              {...register("merchant")}
              id="merchantField"
              type="text"
              maxLength="100"
              rows="3"
              className={`${classes.input} ${classes.textarea}`}
              data-testid="merchant-input-field"
            />
            <label
              htmlFor="merchantField"
              className={`${classes["input-placeholder"]} ${classes["textarea-placeholder"]}`}
            >
              Merchant
            </label>
          </div>

          <RadioButton
            names={{ firstOption: "Paid", secondOption: "Unpaid" }}
            defaultValue={
              currentExpenseItem ? currentExpenseItem.isPaid : isPaid
            }
            isPaid={(value) => {
              setIsPaid(value);
            }}
            mode={props.mode}
            currentExpenseItem={currentExpenseItem}
          />
        </div>

        <div className={classes["button-div"]}>
          <button
            type="submit"
            className={classes["add-expense-button"]}
            data-testid="submit-button"
          >
            {props.buttonText}
          </button>

          {props.mode === "edit" && (
            <button
              className={classes["remove-button"]}
              type="button"
              onClick={props.onDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseForm;
