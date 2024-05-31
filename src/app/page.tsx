import classes from "./page.module.css";
import LoginForm from "src/components/LoginSignup/LoginForm";

export default function Login() {
  return (
    <main className={classes.page}>
      <div className={classes["page-content"]}>
        <div className={classes["title-container"]}>
          <h1>Budget Breakdown</h1>
          <h2>Take control of your finances.</h2>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
