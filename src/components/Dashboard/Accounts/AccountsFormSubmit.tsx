"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import classes from "../../UI/Button.module.css";

type ButtonProps = {
  className?: string;
};

const AccountsFormSubmit: FC<ButtonProps> = ({ className }) => {
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
