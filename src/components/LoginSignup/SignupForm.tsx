"use client";

import classes from "./SignupForm.module.css";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createNewUser } from "src/lib/actions";
import { useRouter } from "next/navigation";
import { ZodErrors } from "./ZodErrors";

export default function SignupForm() {
  const router = useRouter();
  const initialState = {
    formData: null,
    zodErrors: null,
    message: null,
  };

  const [state, formAction] = useFormState(createNewUser, initialState);

  console.log(state, "client");

  return (
    <>
      <h3 className={classes.heading}>Sign up</h3>
      <ZodErrors error={state?.zodErrors?.email} />
      <ZodErrors error={state?.zodErrors?.password} />
      <ZodErrors error={state?.zodErrors?.confirmPassword} />
      <form className={classes.form} action={formAction}>
        <div className={classes["input-container"]}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" aria-required />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" aria-required />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            aria-required
          />
        </div>
        {state?.message ? <p>{state.message}</p> : undefined}
        <button className={classes["signup-button"]}>Sign up</button>
        <div className={classes["login-container"]}>
          <p>Already have an account? Log in here:</p>
          <Link href="/" className={classes["login-button"]}>
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
