import BackButton from "src/components/UI/Buttons/BackButton";
import classes from "./page.module.css";
import NewAccountForm from "src/components/Dashboard/Accounts/NewAccountForm";
import { getIcons } from "src/lib/icons";

const NewAccountPage = async () => {
  //get account icons
  const icons = await getIcons(); 

  return (
    <main className={classes.page}>
      <BackButton />
      <NewAccountForm icons={icons}/>
    </main>
  );
};

export default NewAccountPage;
