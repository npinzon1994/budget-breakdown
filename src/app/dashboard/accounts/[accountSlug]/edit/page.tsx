import classes from "./page.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";

export default function EditAccountPage() {
  return (
    <main className={classes.page}>
      <div className={classes["back-button-container"]}>
        <BackButton />
      </div>
      <h1>EDIT PAGE</h1>
    </main>
  );
}
