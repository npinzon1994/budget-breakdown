import BackButton from "src/components/UI/Buttons/BackButton";
import classes from "./page.module.css";
import NewAccountForm from "src/components/Dashboard/Accounts/Form/NewAccountForm";
import { currentUser } from "@clerk/nextjs/server";
import { getIcons } from "src/lib/icons";

const NewAccountPage = async () => {
  /*
  Need to get all of the uploaded icons associated with
  the current user
  */

  const user = await currentUser();
  if (!user) {
    throw new Error("User not signed in.");
  }

  const icons = await getIcons(user.id);

  return (
    <main className={classes.page}>
      <BackButton />
      <NewAccountForm userID={user?.id} uploadedIcons={icons}/>
    </main>
  );
};

export default NewAccountPage;
