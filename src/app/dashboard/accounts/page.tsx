import classes from "./page.module.css";
import { FC } from "react";
import Accounts from "src/components/Dashboard/Accounts/Accounts";

type PageProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Dashboard_AccountsPage: FC<PageProps> = ({ params }) => {
  return (
    <main className={classes.page}>
      <h1>Accounts</h1>
      <Accounts params={params} />
    </main>
  );
};

export default Dashboard_AccountsPage;
