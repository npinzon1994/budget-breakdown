import BackButton from "src/components/UI/Buttons/BackButton";
import classes from "./page.module.css";
import NewAccountForm from "src/components/Dashboard/Accounts/NewAccountForm";

const NewAccountPage = () => {
  return (
    <main className={classes.page}>
      <BackButton />
      <NewAccountForm />
    </main>
  );
};

export default NewAccountPage;
