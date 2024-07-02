import NewAccountForm from "src/components/Dashboard/Accounts/NewAccountForm";
import classes from "./page.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";

export default function EditAccountPage() {
  return (
    <main className={classes.page}>
      <div className={classes["back-button-container"]}>
        <BackButton />
      </div>
      <NewAccountForm mode="edit" />
    </main>
  );
}
