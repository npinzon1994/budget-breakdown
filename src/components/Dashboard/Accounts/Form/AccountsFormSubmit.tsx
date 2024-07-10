"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import classes from "../../../UI/Buttons/Button.module.css";

type ButtonProps = {
  className?: string;
  formState: any;
  mode?: "new" | "edit";
};

const AccountsFormSubmit: FC<ButtonProps> = ({
  className,
  formState,
  mode = "new",
}) => {
  const status = useFormStatus();

  let message = status.pending
    ? "Creating new account..."
    : "Create New Account";
  if (mode === "edit") {
    message = status.pending ? "Saving..." : "Save Changes";
  }
  return (
    <button
      disabled={status.pending}
      className={`${classes.button} ${className}`}
    >
      {message}
    </button>
  );
};
export default AccountsFormSubmit;
