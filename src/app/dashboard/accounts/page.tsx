import classes from "./page.module.css";
import Accounts from "../../../components/Dashboard/Accounts/Accounts";

export default function Dashboard_AccountsPage() {
  return (
    <main className={classes.page}>
      <h1>Accounts</h1>
      <Accounts />
    </main>
  );
}
