"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import classes from "../../UI/Buttons/Button.module.css";

type ButtonProps = {
  className?: string;
  formState: any;
};

const AccountsFormSubmit: FC<ButtonProps> = ({ className, formState }) => {
  const status = useFormStatus();

  return (
    <button
      disabled={status.pending}
      className={`${classes.button} ${className}`}
    >
      {status.pending ? "Creating new account..." : "Create Account"}
    </button>
  );
};

export default AccountsFormSubmit;
