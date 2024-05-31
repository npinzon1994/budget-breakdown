import classes from "./LoginForm.module.css";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <h3>Login</h3>
      <form className={classes.form}>
        <div className={classes["input-container"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className={classes["input-container"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={classes["button-container"]}>
          <button className={classes["login-button"]}>Login</button>
          <Link href="/signup" className={classes["signup-button"]}>
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
