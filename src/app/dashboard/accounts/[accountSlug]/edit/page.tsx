import EditAccountForm from "src/components/Dashboard/Accounts/Form/EditAccountForm";
import classes from "./page.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";
import { FC } from "react";

type Props = {
  params: { accountSlug: string };
}

const EditAccountPage: FC<Props> = ({params}) => {
  return (
    <main className={classes.page}>
      <div className={classes["back-button-container"]}>
        <BackButton />
      </div>
      <EditAccountForm params={params}/>
    </main>
  );
}


export default EditAccountPage;