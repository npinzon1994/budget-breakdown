import classes from "./Accounts.module.css";

export default function Dashboard_AccountsPage() {
  return (
    <>
      <button type="button" className={classes["new-account-button"]}>
        New Account
      </button>
      <ul className={classes.list}>
        <li>Checking</li>
        <li>Savings</li>
        <li>BOA Cash Rewards Credit Card</li>
        <li>Amazon Chase VISA</li>
        <li>Verizon VISA</li>
      </ul>
    </>
  );
}
