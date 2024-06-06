import classes from "./page.module.css";
import { FC } from "react";
import Accounts from "src/components/Dashboard/Accounts/Accounts";
import { getAccounts } from "src/lib/accounts";
import { currentUser } from "@clerk/nextjs/server";

type PageProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Dashboard_AccountsPage: FC<PageProps> = async ({ params }) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not signed in.");
  }

  const accounts = await getAccounts(user.id);

  return (
    <main className={classes.page}>
      <h1>Accounts</h1>
      <Accounts params={params} accounts={accounts} />
    </main>
  );
};

export default Dashboard_AccountsPage;
