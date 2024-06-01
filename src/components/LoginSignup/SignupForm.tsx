"use client";

import classes from "./SignupForm.module.css";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createNewUser } from "src/lib/actions";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const response = await createNewUser(prevState, formData);
      if (response?.message === "User created successfully!") {
        console.log("user created successfully!");
        router.push("/overview");
      }
    },
    { message: null }
  );

  return (
    <>
      <h3>Sign up</h3>
      <form className={classes.form} action={formAction}>
        <div className={classes["input-container"]}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" id="email" required />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password" required />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            name="confirm-password"
            type="password"
            id="confirm-password"
            required
          />
        </div>
        {state?.message ? <p>{state.message}</p> : undefined}
        <div className={classes["button-container"]}>
          <button className={classes["signup-button"]}>Sign up</button>
          <Link href="/" className={classes["login-button"]}>
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
