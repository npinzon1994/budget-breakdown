"use client";

import { FC, useState, useReducer } from "react";
import { editAccount } from "src/lib/actions";
import classes from "./EditAccountForm.module.css";
import { useFormState } from "react-dom";
import AccountsFormSubmit from "./AccountsFormSubmit";
import { ZodIssue, z } from "zod";
import ImagePicker from "src/components/UI/ImagePicker";
import { useRouter } from "next/navigation";
import { useAppSelector } from "src/lib/store/hooks";

const MAX_FILE_SIZE = 5000000;

const schema = z.object({
  accountNickname: z.string().min(1, { message: "Name is required" }),
  startingBalance: z.preprocess((val) => Number(val), z.number()),
  icon: z
    .any()
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    )
    .optional(),
  note: z.string().optional(),
  creditLimit: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .positive({ message: "Credit limit must be above $0" })
      .optional()
      .or(z.literal(0))
  ),
  billingDate: z.string().date().nullable().or(z.literal("")),
  dueDate: z.string().date().nullable().or(z.literal("")),
});

type FormState = {
  status: number | null;
  message: string | null;
  errors?: Record<string, string>;
};

const defaultFormState: FormState = {
  status: null,
  message: null,
  errors: {},
};

type ReducerState = {
  iconChanged: boolean;
  nameChanged: boolean;
  balanceChanged: boolean;
  noteChanged: boolean;
};

type ReducerAction = {
  type: "ICON" | "NAME" | "BALANCE" | "NOTE";
};

const defaultReducerState: ReducerState = {
  iconChanged: false,
  nameChanged: false,
  balanceChanged: false,
  noteChanged: false,
};

const formChangeReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "ICON":
      return {
        iconChanged: true,
        nameChanged: state.nameChanged,
        balanceChanged: state.balanceChanged,
        noteChanged: state.noteChanged,
      };
    case "NAME":
      return {
        iconChanged: state.iconChanged,
        nameChanged: true,
        balanceChanged: state.balanceChanged,
        noteChanged: state.noteChanged,
      };
    case "BALANCE":
      return {
        iconChanged: state.iconChanged,
        nameChanged: state.nameChanged,
        balanceChanged: true,
        noteChanged: state.noteChanged,
      };
    case "NOTE":
      return {
        iconChanged: state.iconChanged,
        nameChanged: state.nameChanged,
        balanceChanged: state.balanceChanged,
        noteChanged: true,
      };
    default:
      return state;
  }
};

type Props = {
  params: { accountSlug: string };
};

const EditAccountForm: FC<Props> = ({ params }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      if (currentAccount) {
        await validateClient(currentAccount?._id, params.accountSlug, prevState, formData);
      }
    },
    defaultFormState
  );

  const [errors, setErrors] = useState<ZodIssue[] | null>();
  const [activeAccountType] = useState<string | undefined>("");

  const [formChangeState, dispatchChange] = useReducer(
    formChangeReducer,
    defaultReducerState
  );

  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );

  const formWasEdited =
    formChangeState.iconChanged ||
    formChangeState.nameChanged ||
    formChangeState.balanceChanged ||
    formChangeState.noteChanged;

  async function validateClient(
    id: string,
    accountSlug: string,
    prevState: any,
    formData: FormData
  ) {
    const newAccount = {
      accountType: formData.get("accountType"),
      accountNickname: formData.get("accountNickname"),
      // accountNumber: formData.get("accountNumber"),
      startingBalance: formData.get("startingBalance"),
      icon: formData.get("icon"),
      note: formData.get("note"),
      creditLimit: formData.get("creditLimit"),
      billingDate: formData.get("billingDate"),
      dueDate: formData.get("dueDate"),
    };

    const result = schema.safeParse(newAccount);
    if (!result.success) {
      console.log("ERROR - ", result.error.issues);
      setErrors(result.error.issues);
      return;
    }

    if (formWasEdited) {
      await editAccount(accountSlug, prevState, formData);
    }

    setErrors(null);
    router.push("/dashboard/accounts");
  }

  const fetchedBalance = String(Number(currentAccount?.balance).toFixed(2));

  return (
    <>
      <h1 className={classes.title}>Edit Account</h1>
      {errors
        ? errors.map((error) => (
            <li key={error.message} className={classes.error}>
              {error.message}
            </li>
          ))
        : undefined}
      <form action={formAction} className={classes.form}>
        <div className={classes["input-grid"]}>
          <div className={classes["input-container"]}>
            <ImagePicker
              label="Icon"
              name="icon"
              userIcon={currentAccount?.icon}
              iconChanged={formChangeState.iconChanged}
              onIconChange={() => dispatchChange({ type: "ICON" })}
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="account-nickname">Name</label>
            <input
              type="text"
              className={classes.input}
              id="account-nickname"
              name="accountNickname"
              defaultValue={currentAccount?.nickName}
              onChange={() => dispatchChange({ type: "NAME" })}
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="starting-balance">Balance</label>
            <input
              type="number"
              className={classes.input}
              id="starting-balance"
              name="startingBalance"
              defaultValue={fetchedBalance}
              onChange={() => dispatchChange({ type: "BALANCE" })}
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="note">Note</label>
            <input
              type="text"
              className={classes.input}
              id="note"
              name="note"
              defaultValue={currentAccount?.note}
              onChange={() => dispatchChange({ type: "NOTE" })}
            />
          </div>
          {activeAccountType === "Credit Card" ? (
            <>
              <div className={classes["input-container"]}>
                <label htmlFor="credit-limit">Credit Limit</label>
                <input
                  type="number"
                  className={classes.input}
                  id="credit-limit"
                  name="creditLimit"
                />
              </div>
              <div className={classes["input-container"]}>
                <label htmlFor="starting-balance">Billing Date</label>
                <input
                  type="date"
                  className={classes.input}
                  id="billing-date"
                  name="billingDate"
                />
              </div>
              <div className={classes["input-container"]}>
                <label htmlFor="starting-balance">Due Date</label>
                <input
                  type="date"
                  className={classes.input}
                  id="due-date"
                  name="dueDate"
                />
              </div>
            </>
          ) : undefined}
        </div>
        <ul>
          <li>{`ICON CHANGED? -- ${formChangeState.iconChanged}`}</li>
          <li>{`NAME CHANGED? -- ${formChangeState.nameChanged}`}</li>
          <li>{`BALANCE CHANGED? -- ${formChangeState.balanceChanged}`}</li>
          <li>{`NOTE CHANGED? -- ${formChangeState.noteChanged}`}</li>
        </ul>
        <div className={classes["button-container"]}>
          <AccountsFormSubmit
            className={classes["submit-button"]}
            formState={state}
            mode="edit"
          />
        </div>
      </form>
    </>
  );
};

export default EditAccountForm;
