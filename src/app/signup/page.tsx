import classes from "./page.module.css";
import SignupForm from "src/components/LoginSignup/SignupForm";

export default function Signup() {
  return (
    <main className={classes.page}>
      <div className={classes["page-content"]}>
        <div className={classes["title-container"]}>
          <h1>Budget Breakdown</h1>
          <h2>Take control of your finances.</h2>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
