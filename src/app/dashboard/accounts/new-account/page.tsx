import BackButton from "src/components/UI/Buttons/BackButton";
import classes from "./page.module.css";
import NewAccountForm from "src/components/Dashboard/Accounts/Form/NewAccountForm";

const NewAccountPage = async () => {
  /*
  Need to get all of the uploaded icons associated with
  the current user
  */


  return (
    <main className={classes.page}>
      <BackButton />
      <NewAccountForm />
    </main>
  );
};

export default NewAccountPage;
