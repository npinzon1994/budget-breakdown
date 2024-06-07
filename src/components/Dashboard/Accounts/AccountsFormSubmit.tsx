"use client";

import { FC, useEffect } from "react";
import { useFormStatus } from "react-dom";
import classes from "../../UI/Button.module.css";
import { useAppDispatch } from "src/lib/store/hooks";
import { showHideActions } from "src/lib/store/show-hide-slice";

type ButtonProps = {
  className?: string;
  formState: any;
};

const AccountsFormSubmit: FC<ButtonProps> = ({ className, formState }) => {
  const status = useFormStatus();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('EFFECT RUNNING')
    if (formState.status === 200 && !status.pending) {
      console.log('closing modal...')
      dispatch(showHideActions.setShowNewAccountModal(false));
    }
  }, [formState.status]);

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
