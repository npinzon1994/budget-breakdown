import { useEffect, useContext, useState, useRef, FC } from "react";
import classes from "./ExpenseForm.module.css";
import ExpenseContext from "../../context/expense-context";
import FormHeader from "../Layout/FormHeader";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../UI/Modal";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import { uniqueIdActions } from "../../lib/store/generate-unique-id-slice";
import { sendingActions } from "../../lib/store/sending-slice";
import { showHideActions } from "../../lib/store/show-hide-slice";
import RadioButton from "../UI/Buttons/RadioButton";
import Button from "../UI/Buttons/Button";
import { Expense } from "../../models/expense";
import { ExpenseFormProps } from "../../models/expense-form";

const checkIsValidAmount = (amount: number) =>
  +amount >= 0 && +amount < 1_000_000;

const ExpenseForm: FC<ExpenseFormProps> = ({
  id,
  mode,
  title,
  onClose,
  onDelete,
}) => {
  const uniqueId = useAppSelector((state) => state.uniqueId.uniqueId);

  const expenseContext = useContext(ExpenseContext);
  const currentExpenseItem = expenseContext.items.find(
    (item) => item.id === id
  );

  const [isPaid, setIsPaid] = useState(
    currentExpenseItem ? currentExpenseItem.isPaid : false
  );
  const [isDateFocused, setIsDateFocused] = useState<boolean>(false);
  const datePickerRef = useRef(null);

  const dispatch = useAppDispatch();

  const { register, control, handleSubmit, watch, getValues, setFocus } =
    useForm({
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

  const { watchAmount } = inputChangeMonitors;

  const currentValues = {
    currentAmount: getValues("amount"),
    currentDate: getValues("date"),
    currentMerchant: getValues("merchant"),
  };
  const { currentAmount, currentDate, currentMerchant } = currentValues;

  const submitHandler = () => {
    console.log("submitting...");

    let newExpenseObject: Expense;
    dispatch(sendingActions.setIsSending(true));
    console.log("Date:", currentDate);
    if (mode === "edit") {
      //find current item and overwrite
      if (currentExpenseItem) {
        newExpenseObject = {
          id: currentExpenseItem.id ?? `E${uniqueId}`, //if id is undefined (for whatever reason), create a new one.
          date: currentDate || new Date(),
          amount: Number(currentAmount),
          isPaid,
          merchant: currentMerchant,
        };

        expenseContext.onEditExpense({
          item: newExpenseObject,
          id: currentExpenseItem.id ?? "",
        }); //fallback in case id is still somehow undefined
        dispatch(showHideActions.setShowEditForm(false));
      } else {
        console.error("Error: currentExpenseItem is undefined");
        return;
      }
    } else {
      newExpenseObject = {
        id: `E${uniqueId}`,
        date: currentDate || new Date(),
        amount: Number(currentAmount),
        isPaid,
        merchant: currentMerchant,
      };
      expenseContext.onAddExpense(newExpenseObject);
      dispatch(uniqueIdActions.incrementIdCounter());
      dispatch(showHideActions.setShowNewForm(false));
    }
    console.log("Expense Object Date:", newExpenseObject.date);
    dispatch(sendingActions.setIsSending(false));
  };

  const dateInputFocusHandler = () => setIsDateFocused(true);
  const dateInputBlurHandler = () => setIsDateFocused(false);

  const isEditing = mode === "edit";

  return (
    <Modal
      onClose={onClose}
      className={classes.modal}
      backdropClassName={classes.backdrop}
    >
      <FormHeader
        title={title}
        onClose={onClose}
        headerClasses={classes["form-header"]}
        titleClasses={classes["form-title"]}
      />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes["add-expense-form"]}
        name="submit-form"
      >
        {checkIsValidAmount(Number(watchAmount)) === false && (
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
                  ref={datePickerRef}
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
                  className={`${classes["datepicker-placeholder"]} ${
                    isDateFocused ? classes.focused : ""
                  }`}
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
              maxLength={100}
              rows={3}
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
            isPaid={(value) => {
              setIsPaid(value);
            }}
            mode={mode}
            currentExpenseItem={currentExpenseItem}
          />
        </div>

        <div className={classes["button-div"]}>
          <Button
            type="submit"
            className={classes["add-expense-button"]}
            data-testid="submit-button"
          >
            {isEditing ? "Save" : "Create Expense"}
          </Button>

          {isEditing && (
            <Button
              className={classes["remove-button"]}
              type="button"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseForm;
