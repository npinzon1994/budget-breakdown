import classes from "./SignupForm.module.css";
import Link from "next/link";
import { createNewUser } from "src/lib/actions";

export default function SignupForm() {
  return (
    <>
    <h3>Sign up</h3>
      <form className={classes.form} action={createNewUser}>
        <div className={classes["input-container"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="password">Comfirm Password</label>
          <input type="password" id="password" />
        </div>
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
