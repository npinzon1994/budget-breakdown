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
import IconGrid from "src/components/UI/Icons/IconGrid";
import { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/JPEG",
  "image/jpg",
  "image/JPG",
  "image/png",
  "image/PNG",
  "image/webp",
  "image/WEBP",
  "image/heic",
  "image/HEIC",
];

const schema = z.object({
  accountType: z
    .string()
    .refine(
      (string) => string !== "Choose Account Type",
      "Please choose an account type"
    ),
  accountNickname: z.string().optional(),
  bank: z.string().optional(),
  accountNumber: z.preprocess(
    (val) => Number(val),
    z.number().positive("Account number must be a positive number.")
  ),
  routingNumber: z.preprocess(
    (val) => Number(val),
    z.number().positive("Routing number must be a positive number.")
  ),
  startingBalance: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Starting balance must be at least 0.")
  ),
  icon: z
    .any()
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .webp, and .heic formats are supported."
    )
    .optional()
    .or(z.literal(".jpg")),
});

const accountOptions: Option[] = [
  new Option("Choose Account Type", "Choose Account Type"),
  new Option("Checking", "Checking"),
  new Option("Savings", "Savings"),
  new Option("Loan", "Loan"),
  new Option("Credit Card", "Credit Card"),
  new Option("SNAP", "SNAP"),
  new Option("Other", "Other"),
];

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
  const [state, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      await validateClient(prevState, formData);
    },
    defaultFormState
  );

  const [hasDebit, setHasDebit] = useState(false);
  const [errors, setErrors] = useState<ZodIssue[] | null>();

  const debitCheckboxHandler = () => {
    setHasDebit((prev) => !prev);
  };

  async function validateClient(prevState: any, formData: FormData) {
    const newAccount = {
      accountType: formData.get("accountType"),
      accountNickname: formData.get("accountNickname"),
      bank: formData.get("bank"),
      accountNumber: formData.get("accountNumber"),
      routingNumber: formData.get("routingNumber"),
      startingBalance: formData.get("startingBalance"),
      icon: formData.get("icon"),
    };

    const result = schema.safeParse(newAccount);
    if (!result.success) {
      console.log("ERROR - ", result.error.issues);
      setErrors(result.error.issues);
      return;
    }

    await createNewAccount(prevState, formData);
    setErrors(null);
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
            <label htmlFor="account-type">Account Type</label>
            <Select
              options={accountOptions}
              defaultValue={accountOptions[0]}
              id="account-type"
              name="accountType"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="account-nickname">Account Nickname</label>
            <input
              type="text"
              className={classes.input}
              id="account-nickname"
              name="accountNickname"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="bank">Bank</label>
            <input
              type="text"
              className={classes.input}
              id="bank"
              name="bank"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="account-number">Account #</label>
            <input
              type="number"
              className={classes.input}
              id="account-number"
              name="accountNumber"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="routing-number">Routing #</label>
            <input
              type="number"
              className={classes.input}
              id="routing-number"
              name="routingNumber"
            />
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="starting-balance">Starting Balance</label>
            <input
              type="number"
              className={classes.input}
              id="starting-balance"
              name="startingBalance"
            />
          </div>
          <div className={classes["checkbox-container"]}>
            <input
              type="checkbox"
              id="add-debit"
              name="addDebit"
              value="add-debit"
              onClick={debitCheckboxHandler}
            />
            <label htmlFor="add-debit">
              I want to associate a debit card with this account
            </label>
          </div>
          <IconGrid icons={icons} label="Icon" name="icon" />
        </div>
        {hasDebit ? (
          <ul className={classes["debit-card-list"]}>
            <li className={classes["debit-card"]}>Debit 1</li>
            <li className={classes["debit-card"]}>Debit 2</li>
            <li className={classes["debit-card"]}>Debit 3</li>
            <li className={`${classes["debit-card"]} ${classes.add}`}>+</li>
          </ul>
        ) : undefined}
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
