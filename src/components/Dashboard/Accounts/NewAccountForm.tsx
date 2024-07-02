"use client";

import { FC, useState } from "react";
import { createNewAccount } from "src/lib/actions";
import classes from "./NewAccountForm.module.css";
import Select from "react-select";
import Option from "src/models/option";
import { useFormState } from "react-dom";
import AccountsFormSubmit from "./AccountsFormSubmit";
import { ZodIssue, z } from "zod";
import ImagePicker from "src/components/UI/ImagePicker";
import accountPlaceholder from "../../../assets/account-placeholder.png";
import Image from "next/image";
import checkingIcon from "../../../assets/account-type-icons/checking.svg";
import savingsIcon from "../../../assets/account-type-icons/savings.svg";
import loanIcon from "../../../assets/account-type-icons/loan.svg";
import creditCardIcon from "../../../assets/account-type-icons/credit.svg";
import debitCardIcon from "../../../assets/account-type-icons/debit.svg";
import cashIcon from "../../../assets/account-type-icons/money-icon.svg";
import snapIcon from "../../../assets/account-type-icons/snap.png";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5000000;

const schema = z.object({
  accountType: z.string(),
  accountNickname: z.string().min(1, { message: "Name is required" }),
  // accountNumber: z.preprocess(
  //   (val) => Number(val),
  //   z.number().min(1, { message: "Account Number required" })
  // ),
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

const accountOptions: Option[] = [
  // new Option("Choose Account Type", "Choose Account Type"),
  new Option("Cash", "Cash", cashIcon),
  new Option("Debit", "Debit", checkingIcon),
  new Option("Savings", "Savings", savingsIcon),
  // new Option("Loan", "Loan", loanIcon),
  // new Option("Credit Card", "Credit Card", creditCardIcon),
  // new Option("SNAP", "SNAP", snapIcon),
];

const formatAccountOptionLabel = (option: Option) => (
  <div className={classes["option-container"]}>
    <div className={classes["icon-container"]}>
      <Image
        src={option.image || accountPlaceholder}
        alt={`${option.label} icon`}
        fill
      />
    </div>
    <span>{option.label}</span>
  </div>
);

type Props = {
  icons: string[];
};

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

const NewAccountForm: FC<Props> = ({ icons }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      await validateClient(prevState, formData);
    },
    defaultFormState
  );

  const [hasDebit, setHasDebit] = useState(false);
  const [errors, setErrors] = useState<ZodIssue[] | null>();
  const [activeIcon, setActiveIcon] = useState<string | undefined>("");

  const imageSources = icons.map(
    (icon) =>
      `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}`
  );

  const debitCheckboxHandler = () => {
    setHasDebit((prev) => !prev);
  };

  async function validateClient(prevState: any, formData: FormData) {
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

    await createNewAccount(prevState, formData);
    setErrors(null);
    router.push("/dashboard/accounts");
  }

  return (
    <>
      <h1 className={classes.title}>New Account</h1>
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
            <label htmlFor="account-type">Type</label>
            <Select
              options={accountOptions}
              defaultValue={accountOptions[0]}
              isSearchable={false}
              formatOptionLabel={formatAccountOptionLabel}
              id="account-type"
              name="accountType"
              onChange={(option) => setActiveIcon(option?.value)}
            />
          </div>
          <div className={classes["input-container"]}>
            <ImagePicker label="Icon" name="icon" activeIcon={activeIcon} />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="account-nickname">Name</label>
            <input
              type="text"
              className={classes.input}
              id="account-nickname"
              name="accountNickname"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="starting-balance">Balance</label>
            <input
              type="number"
              className={classes.input}
              id="starting-balance"
              name="startingBalance"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="note">Note</label>
            <input
              type="text"
              className={classes.input}
              id="note"
              name="note"
            />
          </div>
          {activeIcon === "Credit Card" ? (
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
        <div className={classes["button-container"]}>
          <AccountsFormSubmit
            className={classes["submit-button"]}
            formState={state}
          />
        </div>
      </form>
    </>
  );
};

export default NewAccountForm;
