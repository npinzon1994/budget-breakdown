import classes from "./page.module.css";
import { FC } from "react";
import Accounts from "src/components/Dashboard/Accounts/Accounts";
import { getAccounts } from "src/lib/accounts";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

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
      <header className={classes.header}>
        <div className={classes["total-balance-info"]}>
          <span className={classes.label}>Total Equity</span>
          <span className={classes.balance}>???</span>
          <Link
            href="/dashboard/accounts/new-account"
            className={classes["new-account"]}
          >
            New Account
          </Link>
        </div>
      </header>
      <Accounts params={params} accounts={accounts} />
    </main>
  );
};

export default Dashboard_AccountsPage;
